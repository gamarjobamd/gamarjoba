/* Gamarjoba — генератор страницы /menu из сканов печатного меню.

   На странице меню нет вёрстки: там лежат страницы бумажного меню
   картинками, одна под другой, в порядке номеров файлов. Этот скрипт
   собирает из содержимого assets/menu-pages/ статическую разметку и
   вставляет её между маркерами в menu.html. Ни строчки через JS:
   картинки должны быть в HTML, как их отдаёт сервер.

   Ожидает пары NN.webp + NN.jpg (WebP — основной, JPG — фолбэк).
   Размеры читаются из самого WebP, поэтому width/height в разметке
   не могут разъехаться с файлами, а вёрстка не прыгает при загрузке.

   Запуск:  node tools/build-menu-pages.mjs
   Проверка без записи:  node tools/build-menu-pages.mjs --check
     (падает с кодом 1, если menu.html разошёлся с картинками)

   Исходники (макет типографии) в репозиторий не кладутся. Пересжатие:
     magick <стр>.jpg -colorspace sRGB -resize 1600x -strip page.png
     cwebp -q 82 -m 6 -sharp_yuv page.png -o NN.webp
     magick page.png -quality 82 -sampling-factor 4:2:0 -strip NN.jpg
   Страницы в CMYK сначала прогоняются через профили:
     -profile "Generic CMYK Profile.icc" -profile "sRGB Profile.icc" */

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIR = "assets/menu-pages";

const read = (rel) => readFileSync(join(ROOT, rel));
const readText = (rel) => readFileSync(join(ROOT, rel), "utf8");

const fail = (msg) => {
  throw new Error(`страницы меню: ${msg}`);
};

/* ── Размер WebP из заголовка файла ──
   Нужны только ширина и высота, тянуть ради них зависимость незачем.
   Поддержаны три формы контейнера: VP8 (lossy), VP8L (lossless), VP8X. */
function webpSize(buf, name) {
  if (buf.toString("ascii", 0, 4) !== "RIFF" || buf.toString("ascii", 8, 12) !== "WEBP") {
    fail(`${name}: это не WebP`);
  }
  const tag = buf.toString("ascii", 12, 16);
  if (tag === "VP8 ") {
    return { w: buf.readUInt16LE(26) & 0x3fff, h: buf.readUInt16LE(28) & 0x3fff };
  }
  if (tag === "VP8L") {
    const b = buf.readUInt32LE(21);
    return { w: (b & 0x3fff) + 1, h: ((b >> 14) & 0x3fff) + 1 };
  }
  if (tag === "VP8X") {
    const at = (i) => buf[i] | (buf[i + 1] << 8) | (buf[i + 2] << 16);
    return { w: at(24) + 1, h: at(27) + 1 };
  }
  return fail(`${name}: неизвестный вид WebP (${tag})`);
}

function build() {
  const files = readdirSync(join(ROOT, DIR));
  const pages = files
    .filter((f) => /^\d+\.webp$/.test(f))
    .sort((a, b) => parseInt(a, 10) - parseInt(b, 10));

  if (pages.length === 0) fail(`в ${DIR} нет ни одной страницы`);

  const total = pages.length;
  const html = pages
    .map((file, i) => {
      const num = file.replace(/\.webp$/, "");
      const jpg = `${num}.jpg`;
      if (!files.includes(jpg)) fail(`у страницы ${num} нет JPG-фолбэка`);

      const { w, h } = webpSize(read(`${DIR}/${file}`), file);
      if (!w || !h) fail(`у страницы ${num} не читается размер`);

      /* первая страница — eager: она и есть первый экран меню */
      const loading = i === 0 ? "eager" : "lazy";
      const priority = i === 0 ? ' fetchpriority="high"' : "";
      const alt = `Меню Gamarjoba — страница ${i + 1} из ${total}`;

      /* обёртка — система координат для кнопок-областей поверх страницы:
         их проставляет menu.js по процентам из js/menu-hotspots.js */
      return `
      <div class="menu-pages__page" data-page="${num}">
        <picture>
          <source srcset="${DIR}/${file}" type="image/webp" />
          <img class="menu-pages__img" src="${DIR}/${jpg}" width="${w}" height="${h}"
               alt="${alt}" data-i18n-alt="menuPageAlt" data-page="${i + 1}" data-page-total="${total}"
               loading="${loading}" decoding="async"${priority} />
        </picture>
      </div>`;
    })
    .join("");

  /* ── Проверки: лучше упасть, чем записать неполное ── */
  const imgs = (html.match(/<img /g) || []).length;
  if (imgs !== total) fail(`картинок ${imgs}, страниц ${total}`);
  if ((html.match(/menu-pages__page/g) || []).length !== total) {
    fail("у каждой страницы должна быть обёртка под области корзины");
  }
  if ((html.match(/loading="eager"/g) || []).length !== 1) {
    fail("eager должна быть ровно одна — первая страница");
  }
  if ((html.match(/loading="lazy"/g) || []).length !== total - 1) {
    fail("остальные страницы должны грузиться лениво");
  }
  if (/width="0"|height="0"/.test(html)) fail("есть картинка с нулевым размером");

  return { html, total };
}

function splice(html, name, body) {
  const open = `<!-- BEGIN:${name} -->`;
  const close = `<!-- END:${name} -->`;
  const a = html.indexOf(open);
  const b = html.indexOf(close);
  if (a === -1 || b === -1 || b < a) throw new Error(`маркеры ${name} не найдены в menu.html`);
  return html.slice(0, a + open.length) + body + "\n      " + html.slice(b);
}

const { html, total } = build();
const before = readText("menu.html");
const after = splice(before, "menu-pages", html);

if (process.argv.includes("--check")) {
  if (before !== after) {
    console.error("menu.html разошёлся с картинками — запустите: node tools/build-menu-pages.mjs");
    process.exit(1);
  }
  console.log(`menu.html актуален: ${total} страниц`);
} else {
  writeFileSync(join(ROOT, "menu.html"), after);
  console.log(`menu.html собран: ${total} страниц меню`);
}
