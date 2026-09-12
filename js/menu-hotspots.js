/* Gamarjoba — области корзины поверх страниц меню.

   Страница меню — картинка, менять её нельзя. Чтобы блюдо можно было
   положить в корзину, поверх картинки лежат прозрачные кнопки: по одной
   на блок «название + описание + цена». Здесь только их координаты и
   связь с позицией меню — названия, граммовки и цены живут в одном
   месте, в js/menu-data.js, и сюда не копируются.

   Ключ — номер файла страницы (assets/menu-pages/03.webp → "03").

   Поле области:
     l, t, w, h — левый край, верх, ширина, высота в процентах от
                  размеров картинки. Проценты, а не пиксели: страница
                  тянется по ширине экрана, области тянутся вместе с ней.
     sec        — id раздела из MENU (chef, hinkali, mangal, …)
     name       — name позиции внутри этого раздела, символ в символ
     v          — номер строки варианта в variants, если цен несколько:
                  у мцвади, люля, хинкали, аджарули, рыбы, оджахури и
                  чашушули на каждую строку своя область
     c          — номер подпункта в children для соусов: цена у них общая,
                  а заказывают поимённо

   Строки вариантов идут в макете вплотную — по 2 % высоты страницы. Чтобы
   в них попадали пальцем, область каждой строки растянута по горизонтали
   на всю свободную полосу, до фотографии и полей.

   Координаты размечаются служебной страницей tools/hotspots.html —
   руками их не пишут. Она же отдаёт готовый кусок для этого файла. */

const MENU_HOTSPOTS = {
  /* 03 — RECOMANDĂRILE ȘEFULUI */
  "03": [
    { l: 22.0, t: 13.0, w: 34.5, h: 15.6, sec: "chef", name: "SHURPA" },
    { l: 53.5, t: 34.4, w: 34.5, h: 13.6, sec: "chef", name: "ADJARULI" },
    { l: 30.0, t: 55.4, w: 39.0, h: 13.6, sec: "chef", name: "BADRIJANI" },
    { l: 53.0, t: 79.4, w: 35.0, h: 16.6, sec: "chef", name: "MTSVARI VIȚEL" },
  ],

  /* 04 — PLATOURI PENTRU COMPANII */
  "04": [
    { l: 38.0, t: 10.5, w: 42.0, h: 15.5, sec: "sets", name: "SET DIN CARNE MIX / МЯСНОЙ СЕТ МИКС" },
    { l: 8.0, t: 43.0, w: 43.0, h: 14.4, sec: "sets", name: "SET DIN CARNE DE PORC / СВИНОЙ СЕТ" },
    { l: 38.0, t: 57.6, w: 43.0, h: 14.6, sec: "sets", name: "SET DIN CARNE DE PUI / КУРИНЫЙ СЕТ" },
    { l: 43.0, t: 73.6, w: 38.0, h: 17.9, sec: "sets", name: "SET DIN CARNE DE MIEL / СЕТ ИЗ ЯГНЕНКА" },
  ],

  /* 05 — GUSTĂRI RECI */
  "05": [
    { l: 17.0, t: 13.3, w: 34.0, h: 12.2, sec: "cold", name: "MOKHARSHULI ENA" },
    { l: 51.0, t: 39.0, w: 36.0, h: 14.5, sec: "cold", name: "BADRIJANI" },
    { l: 30.0, t: 80.5, w: 36.0, h: 14.5, sec: "cold", name: "BULGARULI" },
  ],

  /* 06 — GUSTĂRI RECI */
  "06": [
    { l: 47.5, t: 12.5, w: 35.5, h: 13.0, sec: "cold", name: "MTSNILI" },
    { l: 9.0, t: 41.0, w: 32.5, h: 15.5, sec: "cold", name: "KVELI" },
    { l: 51.5, t: 74.0, w: 31.5, h: 17.0, sec: "cold", name: "TEVZIS ASSORTI" },
  ],

  /* 07 — GUSTĂRI RECI */
  "07": [
    { l: 17.0, t: 12.5, w: 34.0, h: 15.5, sec: "cold", name: "KHORTCIS ASSORTI" },
    { l: 59.0, t: 43.5, w: 32.0, h: 15.0, sec: "cold", name: "BOSTNEULIS ASSORTI" },
    { l: 17.0, t: 79.0, w: 31.0, h: 15.0, sec: "cold", name: "HERINGI KARTOPHILIT" },
  ],

  /* 08 — GUSTĂRI CALDE */
  "08": [
    { l: 11.0, t: 12.5, w: 35.5, h: 14.0, sec: "hot-starters", name: "TSITSILA TABAKA" },
    { l: 41.0, t: 44.0, w: 34.5, h: 14.5, sec: "hot-starters", name: "DOLMA" },
    { l: 11.0, t: 73.0, w: 35.0, h: 14.0, sec: "hot-starters", name: "SOKO KETZE" },
  ],

  /* 09 — GUSTĂRI CALDE */
  "09": [
    { l: 21.0, t: 11.0, w: 33.0, h: 14.5, sec: "hot-starters", name: "DJIGARI" },
    { l: 57.0, t: 37.0, w: 33.0, h: 14.0, sec: "hot-starters", name: "SHKMERULI" },
    { l: 17.5, t: 66.0, w: 29.5, h: 13.5, sec: "hot-starters", name: "LOBIO" },
    { l: 17.5, t: 81.6, w: 29.5, h: 14.9, sec: "hot-starters", name: "LOBIO CU NUCI" },
  ],

  /* 10 — GUSTĂRI CALDE */
  "10": [
    { l: 48.5, t: 11.0, w: 34.5, h: 14.5, sec: "hot-starters", name: "CREVEȚI CU SPANAC" },
    { l: 12.0, t: 44.0, w: 34.0, h: 14.5, sec: "hot-starters", name: "CUCIMACI" },
    { l: 48.5, t: 73.0, w: 33.5, h: 15.5, sec: "hot-starters", name: "SEMINȚE DE MIEL" },
  ],

  /* 11 — SALATE */
  "11": [
    { l: 17.0, t: 12.5, w: 35.0, h: 15.5, sec: "salads", name: "SALATĂ GEORGIANĂ" },
    { l: 59.0, t: 38.5, w: 32.0, h: 16.0, sec: "salads", name: "SALATĂ GURIANĂ" },
    { l: 17.5, t: 79.6, w: 30.5, h: 15.9, sec: "salads", name: "ATSATSILI DE VINETE" },
  ],

  /* 12 — SALATE */
  "12": [
    { l: 49.0, t: 11.0, w: 33.0, h: 16.0, sec: "salads", name: "SALATĂ KAHETIANĂ" },
    { l: 9.5, t: 44.0, w: 33.5, h: 15.5, sec: "salads", name: "SALATĂ CU LIMBĂ" },
    { l: 48.5, t: 79.0, w: 34.5, h: 15.5, sec: "salads", name: "SALATĂ GAMARJOBA" },
  ],

  /* 13 — PRIMELE FELURI */
  "13": [
    { l: 58.0, t: 15.0, w: 33.0, h: 15.5, sec: "soups", name: "KHARCHO" },
    { l: 18.5, t: 44.5, w: 32.5, h: 16.0, sec: "soups", name: "SHURPA" },
    { l: 54.5, t: 78.0, w: 34.0, h: 15.5, sec: "soups", name: "BORȘ ROȘU" },
  ],

  /* 14 — PRIMELE FELURI */
  "14": [
    { l: 10.0, t: 11.0, w: 31.0, h: 17.5, sec: "soups", name: "SOLYANKA" },
    { l: 50.0, t: 44.0, w: 33.0, h: 16.0, sec: "soups", name: "CHIKHIRTMA CU CARNE DE PUI" },
    { l: 10.0, t: 77.5, w: 33.0, h: 15.0, sec: "soups", name: "CHIKHIRTMA CU HINKALI" },
  ],

  /* 15 — HINKALI. У каждой позиции две цены: «(3 buc)» и «(la tigaie)» —
     на каждую строку своя область, иначе непонятно, что кладём. */
  "15": [
    { l: 61.0, t: 15.5, w: 30.0, h: 19.0, sec: "hinkali", name: "MAMA HINKALI" },
    { l: 56.0, t: 37.6, w: 35.0, h: 11.2, ax: 91.0, sec: "hinkali", name: "HINKALI CU CAȘCAVAL", v: 0 },
    { l: 56.0, t: 48.9, w: 35.0, h: 2.4, ax: 91.0, sec: "hinkali", name: "HINKALI CU CAȘCAVAL", v: 1 },
    { l: 12.0, t: 43.5, w: 42.0, h: 15.3, ax: 47.5, sec: "hinkali", name: "HINKALI MIXT PORC-VITĂ", v: 0 },
    { l: 12.0, t: 59.0, w: 42.0, h: 2.4, ax: 47.5, sec: "hinkali", name: "HINKALI MIXT PORC-VITĂ", v: 1 },
    { l: 12.0, t: 61.6, w: 42.0, h: 13.9, ax: 47.5, sec: "hinkali", name: "HINKALI CU CARNE DE VITĂ", v: 0 },
    { l: 12.0, t: 75.7, w: 42.0, h: 2.6, ax: 47.5, sec: "hinkali", name: "HINKALI CU CARNE DE VITĂ", v: 1 },
    { l: 12.0, t: 79.0, w: 42.0, h: 14.2, ax: 47.5, sec: "hinkali", name: "HINKALI CU CARNE DE MIEL", v: 0 },
    { l: 12.0, t: 93.4, w: 42.0, h: 3.0, ax: 47.5, sec: "hinkali", name: "HINKALI CU CARNE DE MIEL", v: 1 },
  ],

  /* 16 — HACEAPURI */
  "16": [
    { l: 6.0, t: 11.8, w: 82.0, h: 13.2, ax: 47.5, sec: "khachapuri", name: "ADJARULI", v: 0 },
    { l: 6.0, t: 25.2, w: 82.0, h: 2.4, ax: 47.5, sec: "khachapuri", name: "ADJARULI", v: 1 },
    { l: 6.0, t: 32.2, w: 82.0, h: 13.1, ax: 74.5, sec: "khachapuri", name: "MEGRULI", v: 0 },
    { l: 6.0, t: 45.4, w: 82.0, h: 2.6, ax: 74.5, sec: "khachapuri", name: "MEGRULI", v: 1 },
    { l: 12.0, t: 57.5, w: 36.0, h: 14.2, sec: "khachapuri", name: "KUBDARI" },
    { l: 41.5, t: 79.8, w: 34.0, h: 16.2, sec: "khachapuri", name: "PENOVANI" },
  ],

  /* 17 — HACEAPURI */
  "17": [
    { l: 55.0, t: 8.8, w: 35.5, h: 12.7, sec: "khachapuri", name: "REGAL" },
    { l: 20.4, t: 36.8, w: 36.0, h: 12.0, sec: "khachapuri", name: "IMERULI" },
    { l: 50.3, t: 55.6, w: 36.0, h: 13.2, sec: "khachapuri", name: "ADJARULI CU CEASHUSHULI DIN VIȚEL / MIEL" },
    { l: 25.8, t: 80.3, w: 32.5, h: 16.5, sec: "khachapuri", name: "PHLOVANI" },
  ],

  /* 18 — MANGAL. Строки вариантов идут плотно: у первой области под ней
     заголовок и описание, у остальных — только своя строка цены. */
  "18": [
    { l: 6.0, t: 12.5, w: 83.0, h: 11.28, ax: 44.5, sec: "mangal", name: "MTSVADI", v: 0 },
    { l: 6.0, t: 23.8, w: 83.0, h: 2.1, ax: 44.5, sec: "mangal", name: "MTSVADI", v: 1 },
    { l: 6.0, t: 25.92, w: 83.0, h: 2.1, ax: 44.5, sec: "mangal", name: "MTSVADI", v: 2 },
    { l: 6.0, t: 28.04, w: 83.0, h: 4.96, ax: 44.5, sec: "mangal", name: "MTSVADI", v: 3 },
    { l: 6.0, t: 40.0, w: 83.0, h: 12.2, ax: 79.5, sec: "mangal", name: "LIULEA-KEBAB", v: 0 },
    { l: 6.0, t: 52.3, w: 83.0, h: 2.7, ax: 79.5, sec: "mangal", name: "LIULEA-KEBAB", v: 1 },
    { l: 6.0, t: 55.1, w: 83.0, h: 2.7, ax: 79.5, sec: "mangal", name: "LIULEA-KEBAB", v: 2 },
    { l: 6.0, t: 57.9, w: 83.0, h: 4.6, ax: 79.5, sec: "mangal", name: "LIULEA-KEBAB", v: 3 },
    { l: 6.0, t: 62.6, w: 83.0, h: 2.2, ax: 79.5, sec: "mangal", name: "LIULEA-KEBAB", v: 4 },
    { l: 6.0, t: 64.9, w: 83.0, h: 5.0, ax: 79.5, sec: "mangal", name: "LIULEA-KEBAB", v: 5 },
    { l: 6.0, t: 76.0, w: 83.0, h: 12.2, ax: 42.5, sec: "mangal", name: "PEȘTE LA GRĂTAR", v: 0 },
    { l: 6.0, t: 88.3, w: 83.0, h: 3.2, ax: 42.5, sec: "mangal", name: "PEȘTE LA GRĂTAR", v: 1 },
    { l: 6.0, t: 91.6, w: 83.0, h: 3.2, ax: 42.5, sec: "mangal", name: "PEȘTE LA GRĂTAR", v: 2 },
    { l: 6.0, t: 94.9, w: 83.0, h: 3.1, ax: 42.5, sec: "mangal", name: "PEȘTE LA GRĂTAR", v: 3 },
  ],
  /* 19 — SPECIALITĂȚI LA GRĂTAR */
  "19": [
    { l: 56.0, t: 13.0, w: 35.0, h: 12.2, sec: "grill-special", name: "ABHAZURA" },
    { l: 17.3, t: 38.8, w: 33.0, h: 13.5, sec: "grill-special", name: "COSTIȚE DE PORC (Pork ribs / Свиные ребрышки)" },
    { l: 19.5, t: 53.0, w: 30.5, h: 4.5, sec: "grill-special", name: "COSTIȚE DE MIEL (Square of lamb / Каре ягненка)" },
    { l: 60.0, t: 76.5, w: 31.0, h: 13.2, sec: "grill-special", name: "PUI LA GRĂTAR CU LEGUME" },
  ],

  /* 20 — FELURI PRINCIPALE */
  "20": [
    { l: 8.5, t: 16.3, w: 28.5, h: 14.5, sec: "mains", name: "TVINI" },
    { l: 6.0, t: 62.0, w: 85.0, h: 19.3, ax: 79.5, sec: "mains", name: "ODJAHURI", v: 0 },
    { l: 6.0, t: 81.4, w: 85.0, h: 2.2, ax: 79.5, sec: "mains", name: "ODJAHURI", v: 1 },
    { l: 6.0, t: 83.7, w: 85.0, h: 2.2, ax: 79.5, sec: "mains", name: "ODJAHURI", v: 2 },
    { l: 6.0, t: 86.0, w: 85.0, h: 3.5, ax: 79.5, sec: "mains", name: "ODJAHURI", v: 3 },
  ],

  /* 21 — FELURI PRINCIPALE */
  "21": [
    { l: 8.0, t: 7.5, w: 80.0, h: 15.5, ax: 88.5, sec: "mains", name: "CEASHUSHULI", v: 0 },
    { l: 8.0, t: 23.1, w: 80.0, h: 3.4, ax: 88.5, sec: "mains", name: "CEASHUSHULI", v: 1 },
    { l: 21.7, t: 38.8, w: 35.0, h: 15.7, sec: "mains", name: "CHAKAPULI" },
    { l: 55.0, t: 73.8, w: 33.0, h: 15.2, sec: "mains", name: "CHAKHOKHBILI" },
  ],

  /* 22 — GARNITURI */
  "22": [
    { l: 13.5, t: 13.0, w: 34.0, h: 14.2, sec: "garnish", name: "GOMI" },
    { l: 42.4, t: 32.3, w: 33.5, h: 14.9, sec: "garnish", name: "LEGUME LA GRĂTAR" },
    { l: 13.5, t: 61.0, w: 33.0, h: 13.0, sec: "garnish", name: "FELII DE CARTOFI CU USTUROI" },
    { l: 41.5, t: 79.8, w: 33.5, h: 14.5, sec: "garnish", name: "CARTOFI PAI" },
  ],

  /* 23 — PÂINE ȘI SOSURI. У соусов общая цена, но заказывают их поимённо —
     на каждый своя область, номер подпункта в поле c. */
  "23": [
    { l: 22.0, t: 24.5, w: 57.0, h: 7.5, sec: "bread", name: "ȘOTI" },
    { l: 22.0, t: 32.5, w: 57.0, h: 7.0, sec: "bread", name: "LAVAȘ" },
    { l: 22.0, t: 46.0, w: 57.0, h: 6.5, sec: "bread", name: "SOSURI / СОУСЫ / SAUCES", c: 0 },
    { l: 22.0, t: 52.6, w: 57.0, h: 6.4, sec: "bread", name: "SOSURI / СОУСЫ / SAUCES", c: 1 },
    { l: 22.0, t: 59.1, w: 57.0, h: 6.4, sec: "bread", name: "SOSURI / СОУСЫ / SAUCES", c: 2 },
    { l: 22.0, t: 65.6, w: 57.0, h: 6.4, sec: "bread", name: "SOSURI / СОУСЫ / SAUCES", c: 3 },
    { l: 22.0, t: 72.1, w: 57.0, h: 6.9, sec: "bread", name: "SOSURI / СОУСЫ / SAUCES", c: 4 },
  ],

  /* 24 — DESERTURI */
  "24": [
    { l: 17.0, t: 12.5, w: 33.5, h: 12.7, sec: "desserts", name: "NAPOLEON" },
    { l: 56.0, t: 29.8, w: 33.5, h: 13.5, sec: "desserts", name: "COPTURĂ CU MAC" },
    { l: 18.9, t: 48.5, w: 32.5, h: 12.3, sec: "desserts", name: "KARAKUM" },
    { l: 38.4, t: 69.3, w: 33.0, h: 14.7, sec: "desserts", name: "MATZONI" },
    { l: 46.0, t: 85.3, w: 43.0, h: 12.7, sec: "desserts", name: "ÎNGHEȚATĂ" },
  ],
};
