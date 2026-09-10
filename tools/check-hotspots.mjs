/* Gamarjoba — проверка разметки областей корзины.

   Области размечаются на глаз, поэтому ошибки бывают тихие: опечатка
   в названии, область за краем страницы, две области внахлёст. Скрипт
   ловит всё три вида и печатает сводку: сколько позиций на странице
   размечено и сколько ещё нет.

   Запуск:  node tools/check-hotspots.mjs
   Код возврата 1, если нашлась хоть одна ошибка. */

import { readFileSync, readdirSync } from "node:fs";
import { createContext, runInContext } from "node:vm";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel) => readFileSync(join(ROOT, rel), "utf8");

/* i18n.js даёт L() для данных бара; DOM ему здесь не нужен */
const sandbox = {
  console,
  localStorage: { getItem: () => null, setItem() {} },
  document: {
    documentElement: {},
    body: { classList: { contains: () => false } },
    querySelectorAll: () => ({ forEach() {}, length: 0 }),
    querySelector: () => null,
    addEventListener() {},
  },
  matchMedia: () => ({ matches: false }),
  addEventListener() {},
  setTimeout() {},
  clearTimeout() {},
  getComputedStyle: () => ({ paddingLeft: "0", paddingRight: "0", fontSize: "16" }),
};
sandbox.window = sandbox;
sandbox.globalThis = sandbox;
const ctx = createContext(sandbox);
for (const f of ["js/i18n.js", "js/menu-data.js", "js/menu-hotspots.js"]) {
  runInContext(read(f), ctx, { filename: f });
}
const { MENU, MENU_HOTSPOTS } = runInContext("({ MENU, MENU_HOTSPOTS })", ctx);

const pages = readdirSync(join(ROOT, "assets/menu-pages"))
  .filter((f) => /^\d+\.webp$/.test(f))
  .map((f) => f.replace(/\.webp$/, ""))
  .sort();

/* Страницы без блюд: обложка, легенда аллергенов и финальная страница */
const NO_DISHES = new Set(["01", "02", "25"]);

const errors = [];
const overlap = (a, b) =>
  a.l < b.l + b.w && b.l < a.l + a.w && a.t < b.t + b.h && b.t < a.t + a.h;

/* сколько тапаемых целей у позиции: по варианту, по подпункту-соусу,
   иначе одна на позицию */
const targets = (item) =>
  item.variants ? item.variants.length : item.children ? item.children.length : item.p != null ? 1 : 0;

const seen = new Map(); /* sec:name:v -> сколько областей */

for (const page of pages) {
  const spots = MENU_HOTSPOTS[page] || [];
  const where = (i) => `страница ${page}, область ${i + 1}`;

  if (NO_DISHES.has(page) && spots.length) {
    errors.push(`страница ${page} — служебная, областей на ней быть не должно`);
  }

  spots.forEach((s, i) => {
    for (const k of ["l", "t", "w", "h"]) {
      if (typeof s[k] !== "number") errors.push(`${where(i)}: нет координаты ${k}`);
    }
    if (s.l < 0 || s.t < 0 || s.l + s.w > 100 || s.t + s.h > 100) {
      errors.push(
        `${where(i)}: вылезает за край (${s.l}%+${s.w}% × ${s.t}%+${s.h}%)`
      );
    }
    if (s.w < 3 || s.h < 2) errors.push(`${where(i)}: слишком мелкая для пальца`);
    /* точка привязки кнопки, если задана, тоже должна быть на странице */
    for (const k of ["ax", "ay"]) {
      if (s[k] == null) continue;
      if (typeof s[k] !== "number" || s[k] < 3 || s[k] > 97) {
        errors.push(`${where(i)}: точка привязки ${k}=${s[k]} у самого края страницы`);
      }
    }

    const sec = MENU.find((x) => x.id === s.sec);
    if (!sec) {
      errors.push(`${where(i)}: нет раздела «${s.sec}»`);
      return;
    }
    const item = sec.items.find((it) => it.name === s.name);
    if (!item) {
      errors.push(`${where(i)}: в разделе «${s.sec}» нет позиции «${s.name}»`);
      return;
    }
    if (s.v == null && s.c == null && item.variants) {
      errors.push(`${where(i)}: «${s.name}» с несколькими ценами — нужна область на вариант`);
    }
    if (s.v != null && !(item.variants || [])[s.v]) {
      errors.push(`${where(i)}: у «${s.name}» нет варианта ${s.v}`);
    }
    if (s.c != null && !(item.children || [])[s.c]) {
      errors.push(`${where(i)}: у «${s.name}» нет подпункта ${s.c}`);
    }
    if (s.v == null && s.c == null && !item.variants && item.p == null) {
      errors.push(`${where(i)}: у «${s.name}» нет цены`);
    }
    if (s.c == null && item.children) {
      errors.push(`${where(i)}: у «${s.name}» есть подпункты — нужна область на каждый`);
    }

    const key = `${s.sec}:${s.name}:${s.v ?? ""}:${s.c ?? ""}`;
    seen.set(key, (seen.get(key) || 0) + 1);
  });

  for (let i = 0; i < spots.length; i++) {
    for (let j = i + 1; j < spots.length; j++) {
      if (overlap(spots[i], spots[j])) {
        errors.push(`страница ${page}: области ${i + 1} и ${j + 1} наезжают друг на друга`);
      }
    }
  }
}

/* ── Сводка: что из меню уже размечено ── */
let total = 0;
let done = 0;
const missing = [];
for (const sec of MENU) {
  for (const item of sec.items) {
    const n = targets(item);
    total += n;
    if (item.variants) {
      item.variants.forEach((_, v) => {
        if (seen.has(`${sec.id}:${item.name}:${v}:`)) done++;
        else missing.push(`${sec.id} · ${item.name} · вариант ${v + 1}`);
      });
    } else if (item.children) {
      item.children.forEach((ch, c) => {
        if (seen.has(`${sec.id}:${item.name}::${c}`)) done++;
        else missing.push(`${sec.id} · ${item.name} · ${ch.name}`);
      });
    } else if (item.p != null) {
      if (seen.has(`${sec.id}:${item.name}::`)) done++;
      else missing.push(`${sec.id} · ${item.name}`);
    }
  }
}

const marked = Object.keys(MENU_HOTSPOTS).sort();
console.log(`Размечено страниц: ${marked.length} (${marked.join(", ")})`);
console.log(`Целей корзины: ${done} из ${total}`);
if (missing.length) {
  console.log(`Ещё не размечено: ${missing.length}`);
  missing.slice(0, 12).forEach((m) => console.log(`  · ${m}`));
  if (missing.length > 12) console.log(`  … и ещё ${missing.length - 12}`);
}

if (errors.length) {
  console.error(`\nОшибки (${errors.length}):`);
  errors.forEach((e) => console.error(`  ✗ ${e}`));
  process.exit(1);
}
console.log("\nОшибок нет: все области на месте, ничего не наезжает и не вылезает.");
