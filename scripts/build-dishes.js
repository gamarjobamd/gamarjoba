/* Gamarjoba — генератор статических страниц блюд.

   Раньше /dish?item=<slug> отдавал пустой HTML с заголовком «Блюдо — Gamarjoba»,
   а всё содержимое подставлял скрипт: краулеры и мессенджеры видели пустышку.
   Скрипт берёт данные из js/menu-data.js, js/data.js и js/menu-full.js, разметку —
   из js/dish-template.js, каркас страницы — из dish.html, и пишет по странице
   на блюдо в dish/<slug>/index.html. Заодно пересобирает sitemap.xml и разметку
   Schema.org: Restaurant на главной и Menu на /menu — из тех же данных, чтобы
   разметка не разъезжалась с меню.

   Всё это те же файлы, что исполняет браузер: второй копии шаблона не существует.

   Запуск:  node scripts/build-dishes.js
   Проверка без записи:  node scripts/build-dishes.js --check
     (падает с кодом 1, если собранное расходится с тем, что лежит в репозитории)

   У Cloudflare Pages шага сборки нет — результат коммитится в репозиторий.
   Любая неожиданность — исключение и ненулевой код возврата.
   Частичный или пустой результат никогда не записывается. */

"use strict";

const { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync, readdirSync } = require("node:fs");
const { createContext, runInContext } = require("node:vm");
const { join, dirname } = require("node:path");

const ROOT = join(__dirname, "..");
const SITE = "https://gamarjoba.md";
const LANG = "ru"; /* язык статики: у краулера нет localStorage, значит ru */
const VISIBLE = " is-visible"; /* .reveal без него остаётся при opacity: 0 */
const CHECK = process.argv.includes("--check");

/* Данные ресторана для Schema.org. Меняются только здесь. */
const PLACE = {
  name: "Gamarjoba",
  telephone: "+37369904304",
  street: "Aleea Mircea cel Bătrân 6",
  city: "Chișinău",
  country: "MD",
  opens: "11:00",
  closes: "23:00",
  cuisine: "Georgian",
  instagram: "https://instagram.com/gamarjoba.md",
  image: "/assets/hero-georgia.jpg",
};

const read = (rel) => readFileSync(join(ROOT, rel), "utf8");

const fail = (msg) => {
  throw new Error(`сборка страниц блюд: ${msg}`);
};

/* ── Браузерные заглушки: i18n.js трогает DOM, нам нужны только словари ── */
function makeSandbox() {
  const noop = () => {};
  const emptyList = { forEach: noop, length: 0 };
  const el = { lang: "", innerHTML: "", style: {}, addEventListener: noop, dataset: {} };
  const sandbox = {
    console,
    localStorage: { getItem: () => null, setItem: noop },
    document: {
      documentElement: el,
      /* i18n.js определяет страницу по классу body — в сборке это «не блюдо» */
      body: { classList: { contains: () => false } },
      title: "",
      querySelectorAll: () => emptyList,
      querySelector: () => null,
      addEventListener: noop,
      fonts: null,
    },
    getComputedStyle: () => ({ paddingLeft: "0", paddingRight: "0", fontSize: "16" }),
    matchMedia: () => ({ matches: false }),
    addEventListener: noop,
    setTimeout: noop,
    clearTimeout: noop,
  };
  sandbox.window = sandbox;
  sandbox.globalThis = sandbox;
  return createContext(sandbox);
}

function loadData() {
  const ctx = makeSandbox();
  for (const f of [
    "js/i18n.js",
    "js/menu-data.js",
    "js/data.js",
    "js/menu-full.js",
    "js/dish-template.js",
  ]) {
    runInContext(read(f), ctx, { filename: f });
  }
  /* top-level const/let из скрипта живут в лексической области контекста,
     а не как свойства sandbox — забираем их выражением в том же контексте */
  return runInContext(
    "({ MENU, BAR, DISHES, DISH_ORDER, MENU_FULL, DISH_FULL, UI, ALLERGEN_T, createDishTemplate })",
    ctx,
    { filename: "collect-globals" }
  );
}

/* ── Каркас страницы: тот же dish.html, что отдаётся по /dish ── */
function splice(html, name, body) {
  const open = `<!-- BEGIN:${name} -->`;
  const close = `<!-- END:${name} -->`;
  const a = html.indexOf(open);
  const b = html.indexOf(close);
  if (a === -1 || b === -1 || b < a) fail(`маркеры ${name} не найдены`);
  return html.slice(0, a + open.length) + body + html.slice(b);
}

/* Страница лежит на уровень глубже (/dish/<slug>/), поэтому все пути —
   от корня; index.html как цель логотипа тоже становится «/». */
function rootPaths(html) {
  return html
    .replace(/(href|src)="(css|js|assets)\//g, '$1="/$2/')
    .replace(/(href)="index\.html"/g, '$1="/"');
}

const escapeAttr = (s) =>
  String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function headBlock({ title, description, url, image }) {
  const t = escapeAttr(title);
  const d = escapeAttr(description);
  return `
  <title>${t}</title>
  <meta name="description" content="${d}" />
  <link rel="canonical" href="${url}" />

  <!-- Open Graph — превью при отправке ссылки в мессенджеры и соцсети -->
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${t}" />
  <meta property="og:description" content="${d}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:image" content="${image}" />
  <meta property="og:locale" content="ru_RU" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${t}" />
  <meta name="twitter:description" content="${d}" />
  <meta name="twitter:image" content="${image}" />
`;
}

/* ── Schema.org ──
   Ровно те же данные, что и в разметке страниц: цены, граммовки и описания
   берутся из menu-data.js и menu-full.js, а не переписываются руками. */

const WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function jsonLd(data) {
  /* два пробела отступа — как у остальной разметки в index.html */
  const body = JSON.stringify(data, null, 2)
    .split("\n")
    .map((line) => "  " + line)
    .join("\n");
  return `\n  <script type="application/ld+json">\n${body}\n  </script>\n  `;
}

function restaurantLd(priceRange) {
  return jsonLd({
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: PLACE.name,
    url: `${SITE}/`,
    image: SITE + PLACE.image,
    telephone: PLACE.telephone,
    servesCuisine: PLACE.cuisine,
    priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: PLACE.street,
      addressLocality: PLACE.city,
      addressCountry: PLACE.country,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: WEEK,
        opens: PLACE.opens,
        closes: PLACE.closes,
      },
    ],
    hasMenu: `${SITE}/menu`,
    sameAs: [PLACE.instagram],
  });
}

/* Разделы, по которым считается priceRange. Хлеб, соусы и гарниры занижают
   нижнюю границу до 10 лей, сеты на компанию задирают верхнюю до 1400 —
   ни то ни другое не описывает цену обычного заказа. */
const PRICE_RANGE_SKIP = ["sets", "garnish", "bread"];

/* Позиции, у которых цена стоит за 100 г, а не за порцию: в диапазоне
   они выглядят как самое дешёвое блюдо кухни, хотя порция стоит дороже. */
const PRICE_RANGE_SKIP_ITEMS = ["tsitsila-tabaka"];

/* Цены позиции: одна или по вариантам. Пустой массив — цены нет (её и не пишем). */
function pricesOf(item) {
  if (item.variants) return item.variants.filter((v) => v.p != null).map((v) => v.p);
  return item.p != null ? [item.p] : [];
}

function menuLd(sections, tpl, T, menuFull) {
  const offer = (price, name) => ({
    "@type": "Offer",
    ...(name ? { name } : {}),
    price: String(price),
    priceCurrency: "MDL",
  });

  const hasMenuSection = sections.map((sec) => ({
    "@type": "MenuSection",
    name: T(sec.title),
    hasMenuItem: sec.items.map((item) => {
      const slug = tpl.itemSlug(item);
      const full = menuFull[`${sec.id}:${typeof item.name === "string" ? item.name : item.name.ro}`];
      const description = (full && T(full)) || T(item.ru);
      const offers = item.variants
        ? item.variants.filter((v) => v.p != null).map((v) => offer(v.p, T(v.v)))
        : item.p != null
          ? offer(item.p)
          : null;
      return {
        "@type": "MenuItem",
        name: T(item.name),
        ...(description ? { description } : {}),
        ...(slug ? { url: `${SITE}/dish/${slug}/` } : {}),
        ...(item.img ? { image: SITE + tpl.asset(item.img) } : {}),
        ...(item.w ? { nutrition: { "@type": "NutritionInformation", servingSize: item.w } } : {}),
        ...(offers ? { offers } : {}),
      };
    }),
  }));

  return jsonLd({
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": `${SITE}/menu#menu`,
    name: "Меню — Gamarjoba",
    url: `${SITE}/menu`,
    inLanguage: LANG,
    hasMenuSection,
  });
}

function build() {
  const { MENU, BAR, DISHES, DISH_ORDER, MENU_FULL, DISH_FULL, UI, ALLERGEN_T, createDishTemplate } =
    loadData();

  if (!Array.isArray(MENU) || MENU.length === 0) fail("MENU пуст или не массив");
  if (!Array.isArray(DISHES) || DISHES.length === 0) fail("DISHES пуст или не массив");
  if (typeof createDishTemplate !== "function") fail("createDishTemplate не найден");

  const tpl = createDishTemplate({
    lang: LANG,
    ui: UI,
    allergens: ALLERGEN_T,
    dishes: DISHES,
    dishOrder: DISH_ORDER,
    sections: [...MENU, ...BAR],
    menuFull: MENU_FULL,
    dishFull: DISH_FULL,
  });

  /* Слаги в порядке меню, без повторов: Shurpa, Adjaruli и Mtsvadi
     встречаются в двух разделах и намеренно ведут на одну страницу. */
  const slugs = [];
  for (const sec of [...MENU, ...BAR]) {
    for (const item of sec.items) {
      const slug = tpl.itemSlug(item);
      if (slug && !slugs.includes(slug)) slugs.push(slug);
    }
  }
  /* фирменные блюда обязаны иметь страницу, даже если в меню их нет */
  for (const d of DISHES) if (!slugs.includes(d.id)) slugs.push(d.id);

  const shell = read("dish.html");
  const pages = new Map();

  for (const slug of slugs) {
    if (!/^[a-z0-9-]+$/.test(slug)) fail(`недопустимый слаг «${slug}»`);
    const meta = tpl.metaBySlug(slug);
    if (!meta) fail(`не нашлось данных для слага «${slug}»`);

    const rendered = tpl.renderBySlug(slug, { extraClass: VISIBLE });
    if (!rendered || !rendered.html.trim()) fail(`пустая разметка для «${slug}»`);

    const url = `${SITE}/dish/${slug}/`;
    const html = rootPaths(
      splice(
        splice(shell, "dish-head", headBlock({
          title: `${meta.name} — Gamarjoba`,
          description: meta.description,
          url,
          image: meta.image ? SITE + meta.image : `${SITE}/assets/hero-georgia.jpg`,
        })),
        "dish-main",
        rendered.html
      )
    );

    /* ── Проверки: лучше упасть, чем записать неполное ── */
    if (!html.includes(`<h1 class="dish-hero__name`)) fail(`нет заголовка блюда в «${slug}»`);
    if (/class="[^"]*\breveal\b(?![^"]*\bis-visible\b)/.test(html)) {
      fail(`«${slug}»: есть .reveal без is-visible — контент будет скрыт`);
    }
    if (/(href|src)="(css|js|assets)\//.test(html)) fail(`«${slug}»: остался относительный путь`);
    if (/\/dish\?item=|dish\.html/.test(html)) fail(`«${slug}»: остался старый адрес блюда`);
    pages.set(`dish/${slug}/index.html`, html);
  }

  if (pages.size !== slugs.length) fail("часть страниц не собралась");

  /* ── Schema.org ── */
  const dishPrices = MENU.filter((sec) => !PRICE_RANGE_SKIP.includes(sec.id)).flatMap((sec) =>
    sec.items.filter((it) => !PRICE_RANGE_SKIP_ITEMS.includes(tpl.itemSlug(it))).flatMap(pricesOf)
  );
  if (dishPrices.length < 50) fail(`для priceRange нашлось всего ${dishPrices.length} цен`);
  const priceRange = `${Math.min(...dishPrices)}–${Math.max(...dishPrices)} MDL`;

  const home = restaurantLd(priceRange);
  const menu = menuLd([...MENU, ...BAR], tpl, tpl.T, MENU_FULL || {});

  const items = JSON.parse(menu.match(/<script[^>]*>([\s\S]*)<\/script>/)[1]).hasMenuSection.flatMap(
    (s2) => s2.hasMenuItem
  );
  const expected = [...MENU, ...BAR].reduce((n, sec) => n + sec.items.length, 0);
  if (items.length !== expected) fail(`в разметке меню ${items.length} позиций, ожидалось ${expected}`);
  if (items.some((i) => !i.name)) fail("в разметке меню есть позиция без названия");
  if (!JSON.parse(home.match(/<script[^>]*>([\s\S]*)<\/script>/)[1]).address.streetAddress) {
    fail("в разметке ресторана нет адреса");
  }

  return { pages, slugs, home, menu };
}

/* ── sitemap: главная, меню и все страницы блюд ── */
function sitemap(slugs) {
  const today = new Date().toISOString().slice(0, 10);
  const url = (loc, priority, lastmod) =>
    `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n` +
    `    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
  return (
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    [
      url(`${SITE}/`, "1.0", today),
      url(`${SITE}/menu`, "0.9", today),
      ...slugs.map((s) => url(`${SITE}/dish/${s}/`, "0.6", today)),
    ].join("\n") +
    "\n</urlset>\n"
  );
}

/* ── Запись ──
   Каталог dish/ полностью пересобирается: страницы удалённых блюд
   не должны пережить сборку и остаться в индексе. */
const { pages, slugs, home, menu } = build();
/* lastmod меняется каждый день, поэтому в --check сравниваем только адреса */
const sitemapUrls = (xml) => (xml.match(/<loc>[^<]+<\/loc>/g) || []).join("\n");
const nextSitemap = sitemap(slugs);

if (CHECK) {
  const stale = [];
  for (const [rel, html] of pages) {
    const path = join(ROOT, rel);
    if (!existsSync(path) || readFileSync(path, "utf8") !== html) stale.push(rel);
  }
  const dishDir = join(ROOT, "dish");
  if (existsSync(dishDir)) {
    for (const name of readdirSync(dishDir)) {
      if (!pages.has(`dish/${name}/index.html`)) stale.push(`dish/${name}/ (лишний)`);
    }
  }
  if (sitemapUrls(read("sitemap.xml")) !== sitemapUrls(nextSitemap)) stale.push("sitemap.xml");
  if (splice(read("index.html"), "home-jsonld", home) !== read("index.html")) stale.push("index.html (Schema.org)");
  if (splice(read("menu.html"), "menu-jsonld", menu) !== read("menu.html")) stale.push("menu.html (Schema.org)");
  if (stale.length) {
    console.error(
      `страницы блюд разошлись с данными (${stale.length}):\n  ` +
        stale.slice(0, 10).join("\n  ") +
        (stale.length > 10 ? `\n  … и ещё ${stale.length - 10}` : "") +
        "\nзапустите: node scripts/build-dishes.js"
    );
    process.exit(1);
  }
  console.log(`страницы блюд актуальны: ${pages.size}`);
} else {
  rmSync(join(ROOT, "dish"), { recursive: true, force: true });
  for (const [rel, html] of pages) {
    const path = join(ROOT, rel);
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, html);
  }
  writeFileSync(join(ROOT, "sitemap.xml"), nextSitemap);
  writeFileSync(join(ROOT, "index.html"), splice(read("index.html"), "home-jsonld", home));
  writeFileSync(join(ROOT, "menu.html"), splice(read("menu.html"), "menu-jsonld", menu));
  console.log(
    `собрано страниц блюд: ${pages.size}; sitemap.xml: ${slugs.length + 2} адреса; ` +
      "Schema.org: Restaurant + Menu"
  );
}
