/* Gamarjoba — выгрузка всех переводимых строк в content/translations-template.csv.

   Не часть сборки сайта: файл нужен, чтобы отдать тексты на вычитку носителю,
   а правки вернуть обратно в js/i18n.js, js/menu-data.js, js/menu-full.js
   и js/data.js — источник данных остаётся там.

   Запуск:  node scripts/export-translations.js
   Пустой шаблон (колонки ro и en очищены):
            node scripts/export-translations.js --blank */
"use strict";
const { readFileSync, writeFileSync, mkdirSync } = require("node:fs");
const { createContext, runInContext } = require("node:vm");
const { join } = require("node:path");

const ROOT = join(__dirname, "..");
const BLANK = process.argv.includes("--blank");
const read = (rel) => readFileSync(join(ROOT, rel), "utf8");

const noop = () => {};
const emptyList = { forEach: noop, length: 0 };
const el = { lang: "", innerHTML: "", style: {}, addEventListener: noop, dataset: {} };
const sb = {
  console,
  localStorage: { getItem: () => null, setItem: noop },
  document: { documentElement: el, body: { classList: { contains: () => false } }, title: "",
    querySelectorAll: () => emptyList, querySelector: () => null, addEventListener: noop, fonts: null },
  getComputedStyle: () => ({ paddingLeft: "0", paddingRight: "0", fontSize: "16" }),
  matchMedia: () => ({ matches: false }), addEventListener: noop, setTimeout: noop, clearTimeout: noop,
};
sb.window = sb; sb.globalThis = sb;
const ctx = createContext(sb);
for (const f of ["js/i18n.js", "js/menu-data.js", "js/data.js", "js/menu-full.js"]) {
  runInContext(read(f), ctx, { filename: f });
}
const { UI, MENU, BAR, DISHES, MENU_FULL, DISH_FULL } = runInContext(
  "({ UI, MENU, BAR, DISHES, MENU_FULL, DISH_FULL })", ctx);

const rows = [];
const add = (key, v) => {
  if (v == null || v === "") return;
  if (typeof v === "string") rows.push({ key, ru: v, ro: v, en: v, plain: true });
  else rows.push({ key, ru: v.ru || "", ro: v.ro || "", en: v.en || "", plain: false });
};

/* ── интерфейс ── */
for (const [k, v] of Object.entries(UI)) add(`ui.${k}`, v);

/* ── меню и бар ── */
const group = (data, prefix) => {
  for (const sec of data) {
    add(`${prefix}.${sec.id}.title`, sec.title);
    if (sec.note) add(`${prefix}.${sec.id}.note`, sec.note);
    sec.items.forEach((item, i) => {
      const slug = item.slug || item.link || String(i);
      const base = `${prefix}.${sec.id}.${slug}`;
      add(`${base}.name`, item.name);
      add(`${base}.desc`, item.ru);
      if (item.alt) add(`${base}.alt`, item.alt);
      (item.variants || []).forEach((v, j) => add(`${base}.variant.${j}`, v.v));
    });
  }
};
group(MENU, "menu");
group(BAR, "bar");

/* ── фирменные блюда ── */
for (const d of DISHES) {
  add(`dish.${d.id}.tagline`, d.tagline);
  add(`dish.${d.id}.category`, d.category);
  add(`dish.${d.id}.description`, d.description);
  add(`dish.${d.id}.ritual`, d.ritual);
}

/* ── полные описания из печатного меню ── */
for (const [k, v] of Object.entries(MENU_FULL)) add(`full.menu.${k}`, v);
for (const [k, v] of Object.entries(DISH_FULL)) add(`full.dish.${k}`, v);

/* ── CSV (RFC 4180: CRLF, кавычки удваиваются) ── */
const q = (s) => `"${String(s).replace(/"/g, '""')}"`;
const body = rows
  .map((r) => [r.key, r.ru, BLANK ? "" : r.ro, BLANK ? "" : r.en].map(q).join(","))
  .join("\r\n");
mkdirSync(join(ROOT, "content"), { recursive: true });
writeFileSync(join(ROOT, "content/translations-template.csv"), "﻿" + ["key,ru,ro,en", body].join("\r\n") + "\r\n");

const missing = rows.filter((r) => !r.ro || !r.en);
const translatable = rows.filter((r) => !r.plain);
console.log(`всего строк: ${rows.length}`);
console.log(`  из них язык-независимых (имя блюда одинаково во всех трёх): ${rows.length - translatable.length}`);
console.log(`  реально переводимых: ${translatable.length}`);
console.log(`  без перевода на ro или en: ${missing.length}`);
if (missing.length) missing.slice(0, 20).forEach((r) => console.log("    ", r.key));
const bykind = {};
for (const r of rows) { const k = r.key.split(".")[0]; bykind[k] = (bykind[k] || 0) + 1; }
console.log("по разделам:", JSON.stringify(bykind));
const chars = rows.reduce((n, r) => n + r.ru.length, 0);
console.log(`объём русского текста: ${chars} знаков (~${Math.round(chars / 1800)} стандартных страниц)`);
