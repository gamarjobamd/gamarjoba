/* Gamarjoba — генератор статического меню для /menu.
   Берёт данные из js/menu-data.js и разметку из js/menu-template.js —
   тех же файлов, что исполняет браузер, — и вставляет русскую «Кухню»
   между маркерами в menu.html. Второй копии шаблона не существует.

   Запуск:  node tools/build-menu.mjs
   Проверка без записи:  node tools/build-menu.mjs --check
     (падает с кодом 1, если menu.html разошёлся с данными)

   Любая неожиданность — исключение и ненулевой код возврата.
   Частичный или пустой результат никогда не записывается. */

import { readFileSync, writeFileSync } from "node:fs";
import { createContext, runInContext } from "node:vm";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const LANG = "ru"; /* язык статики: у краулера нет localStorage, значит ru */
const VISIBLE = " is-visible"; /* .reveal без него остаётся при opacity: 0 */

const read = (rel) => readFileSync(join(ROOT, rel), "utf8");

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

function build() {
  const ctx = makeSandbox();
  for (const f of ["js/i18n.js", "js/menu-data.js", "js/menu-template.js"]) {
    runInContext(read(f), ctx, { filename: f });
  }

  /* top-level const/let из скрипта живут в лексической области контекста,
     а не как свойства sandbox — забираем их выражением в том же контексте */
  const { MENU, I18N_LANGS, UI, BADGE_T, createMenuTemplate } = runInContext(
    "({ MENU, I18N_LANGS, UI, BADGE_T, createMenuTemplate })",
    ctx,
    { filename: "collect-globals" }
  );
  if (!Array.isArray(MENU) || MENU.length === 0) throw new Error("MENU пуст или не массив");
  if (typeof createMenuTemplate !== "function") throw new Error("createMenuTemplate не найден");

  const tpl = createMenuTemplate({ lang: LANG, langs: I18N_LANGS, ui: UI, badges: BADGE_T });
  const nav = tpl.renderNav(MENU, false);
  const sections = tpl.renderSections(MENU, false, VISIBLE);

  /* ── Проверки: лучше упасть, чем записать неполное ── */
  const items = MENU.reduce((n, s) => n + s.items.length, 0);
  const links = [...sections.matchAll(/href="\/dish\?item=([^"]+)"/g)].map((m) => m[1]);
  const expected = MENU.flatMap((s) => s.items.filter((i) => i.slug || i.link));

  const fail = (msg) => {
    throw new Error(`сборка меню: ${msg}`);
  };
  if (MENU.length !== 15) fail(`ожидалось 15 разделов, получено ${MENU.length}`);
  if (items !== 78) fail(`ожидалось 78 позиций, получено ${items}`);
  if (links.length !== expected.length * 2) {
    /* каждая ссылка встречается дважды: data-href карточки и href на названии */
    fail(`ссылок ${links.length}, ожидалось ${expected.length * 2}`);
  }
  if (links.some((s) => !s)) fail("есть пустой slug");
  if (/dish\.html|\?mi=/.test(sections)) fail("в разметке остались dish.html или ?mi=");
  if (/class="[^"]*\breveal\b(?![^"]*\bis-visible\b)/.test(sections)) {
    fail("есть .reveal без is-visible — контент будет скрыт");
  }
  if (!nav.trim() || !sections.trim()) fail("пустой результат рендера");

  return { nav, sections, stats: { sections: MENU.length, items, links: links.length / 2 } };
}

function splice(html, name, body) {
  const open = `<!-- BEGIN:${name} -->`;
  const close = `<!-- END:${name} -->`;
  const a = html.indexOf(open);
  const b = html.indexOf(close);
  if (a === -1 || b === -1 || b < a) throw new Error(`маркеры ${name} не найдены в menu.html`);
  return html.slice(0, a + open.length) + body + html.slice(b);
}

const { nav, sections, stats } = build();
const before = read("menu.html");
const after = splice(splice(before, "menu-nav", nav), "menu-sections", sections);

if (process.argv.includes("--check")) {
  if (before !== after) {
    console.error("menu.html разошёлся с menu-data.js — запустите: node tools/build-menu.mjs");
    process.exit(1);
  }
  console.log("menu.html актуален");
} else {
  writeFileSync(join(ROOT, "menu.html"), after);
  console.log(
    `menu.html собран: ${stats.sections} разделов, ${stats.items} позиций, ${stats.links} ссылок`
  );
}
