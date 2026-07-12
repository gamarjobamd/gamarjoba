/* Gamarjoba — трёхъязычность (RO / RU / EN).
   Подключается ПЕРВЫМ: даёт L() для файлов данных, T() для рендера,
   tr() для интерфейсных строк и применяет data-i18n к статичной разметке. */

const I18N_LANGS = ["ro", "ru", "en"];
const LANG = (() => {
  const saved = localStorage.getItem("gamarjoba-lang");
  return I18N_LANGS.includes(saved) ? saved : "ru";
})();
document.documentElement.lang = LANG;

/* упаковка и распаковка трёхъязычных строк */
function L(ru, ro, en) {
  return { ru, ro, en };
}
function T(v) {
  if (v == null) return "";
  return typeof v === "string" ? v : (v[LANG] ?? v.ru ?? "");
}

/* ── Интерфейсные строки ── */
const UI = {
  navDishes: L("Блюда", "Bucate", "Dishes"),
  navMenu: L("Меню", "Meniu", "Menu"),
  navBar: L("Бар", "Bar", "Bar"),
  navFind: L("Найти нас", "Unde suntem", "Find us"),
  navHome: L("← На главную", "← Acasă", "← Home"),
  navBack: L("← Назад", "← Înapoi", "← Back"),
  navAllMenu: L("Всё меню", "Tot meniul", "Full menu"),

  heroEyebrow: L("Грузинская кухня · Кишинёв", "Bucătărie georgiană · Chișinău", "Georgian cuisine · Chișinău"),
  heroSub: L(
    "По-грузински — <em>«здравствуй»</em>. Буквально — <em>«победа тебе»</em>.<br />Здесь так встречают каждого гостя.",
    "În georgiană — <em>„bună ziua”</em>. Literal — <em>„victorie ție”</em>.<br />Așa întâmpinăm fiecare oaspete.",
    "In Georgian it means <em>“hello”</em>. Literally — <em>“victory to you”</em>.<br />That is how we greet every guest."
  ),
  heroCta: L("Смотреть блюда", "Vezi bucatele", "See the dishes"),

  introText: L(
    "<strong>Хачапури</strong> из глиняной печи, <strong>хинкали</strong> с горячим бульоном, <strong>мясо на живых углях</strong> и вино из квеври. Мы готовим так, как готовят дома в Грузии, — <em>щедро и без спешки.</em>",
    "<strong>Khachapuri</strong> din cuptor de lut, <strong>hinkali</strong> cu supă fierbinte, <strong>carne pe cărbuni</strong> și vin din kvevri. Gătim ca acasă în Georgia — <em>generos și fără grabă.</em>",
    "<strong>Khachapuri</strong> from a clay oven, <strong>khinkali</strong> full of hot broth, <strong>meat over live coals</strong> and qvevri wine. We cook the way they cook at home in Georgia — <em>generously and unhurried.</em>"
  ),

  dishesLabel: L("01 — Выбор шеф-повара", "01 — Recomandările șefului", "01 — Chef's choice"),
  dishesTitle: L("Знаковые<br /><em>блюда</em>", "Bucate<br /><em>emblematice</em>", "Signature<br /><em>dishes</em>"),
  dishesHint: L(
    "Нажмите на блюдо, чтобы узнать о нём больше",
    "Apăsați pe un fel de mâncare pentru a afla mai multe",
    "Tap a dish to learn more about it"
  ),
  dishesMore: L("Смотреть всё меню", "Vezi tot meniul", "See the full menu"),

  visitLabel: L("02 — Найти нас", "02 — Unde suntem", "02 — Find us"),
  visitTitle: L("Приходите<br /><em>в гости</em>", "Veniți<br /><em>în ospeție</em>", "Come<br /><em>visit us</em>"),
  visitAddress: L("Адрес", "Adresa", "Address"),
  visitAddressVal: L(
    "Aleea Mircea cel Bătrân 6,<br />Кишинёв, Молдова",
    "Aleea Mircea cel Bătrân 6,<br />Chișinău, Moldova",
    "Aleea Mircea cel Bătrân 6,<br />Chișinău, Moldova"
  ),
  visitHours: L("Часы", "Program", "Hours"),
  visitHoursVal: L("Ежедневно<br />11:00 — 23:00", "Zilnic<br />11:00 — 23:00", "Daily<br />11:00 — 23:00"),
  visitBook: L("Бронь стола", "Rezervări", "Book a table"),

  footerCopy: L("© 2026 Gamarjoba · Кишинёв", "© 2026 Gamarjoba · Chișinău", "© 2026 Gamarjoba · Chișinău"),
  footerHome: L("gamarjoba — на главную", "gamarjoba — acasă", "gamarjoba — home"),

  menuEyebrow: L("Все цены — в леях · RO · RU · EN", "Toate prețurile — în lei · RO · RU · EN", "All prices in MDL · RO · RU · EN"),
  menuSub: L(
    "Полное меню — как в ресторане, до последнего соуса.<br /><em>Скажите официанту, если у вас аллергия на какие-либо продукты.</em>",
    "Meniul complet — ca în restaurant, până la ultimul sos.<br /><em>Vă rugăm să informați chelnerul dacă aveți alergii alimentare.</em>",
    "The full menu — just like in the restaurant, down to the last sauce.<br /><em>Please tell your waiter about any food allergies.</em>"
  ),
  tabKitchen: L("Кухня", "Bucătărie", "Kitchen"),
  tabBar: L("Бар", "Bar", "Bar"),
  menuOutro: L(
    "Не можете выбрать? Позвоните — соберём стол под вашу компанию.",
    "Nu vă puteți decide? Sunați-ne — pregătim masa pentru compania voastră.",
    "Can't decide? Call us — we'll set the table for your party."
  ),
  menuOutroCta: L("Забронировать · +373 69 904 304", "Rezervă · +373 69 904 304", "Book · +373 69 904 304"),

  dishWeight: L("Вес", "Gramaj", "Weight"),
  dishPrice: L("Цена", "Preț", "Price"),
  dishAbout: L("О блюде", "Despre", "About"),
  dishHow: L("Как это едят", "Cum se mănâncă", "How to eat it"),
  dishNext: L("Следующее блюдо", "Următorul fel", "Next dish"),
  dishAdd: L("В корзину", "În coș", "Add to cart"),
  dishNoAllergens: L("без аллергенов", "fără alergeni", "no allergens"),
  dishVariants: L("Варианты", "Variante", "Options"),

  cartTitle: L("Корзина", "Coș", "Cart"),
  cartEmpty: L(
    "Пока пусто.<br /><em>Загляните в меню — там хачапури.</em>",
    "Deocamdată e gol.<br /><em>Aruncați o privire în meniu — e khachapuri acolo.</em>",
    "Empty for now.<br /><em>Take a look at the menu — there's khachapuri.</em>"
  ),
  cartTotal: L("Итого", "Total", "Total"),
  cartNote: L(
    "Позвоните нам и продиктуйте заказ — соберём к вашему приходу или к брони стола.",
    "Sunați-ne și dictați comanda — o pregătim pentru sosirea sau rezervarea dvs.",
    "Call us and read out your order — we'll have it ready for your arrival or booking."
  ),
  cartCall: L("Позвонить и заказать · +373 69 904 304", "Sună și comandă · +373 69 904 304", "Call to order · +373 69 904 304"),
  cartClear: L("Очистить корзину", "Golește coșul", "Clear cart"),
};

function tr(key) {
  return T(UI[key]);
}

/* аллергены (данные хранятся по-русски) */
const ALLERGEN_T = {
  "яйцо": L("яйцо", "ouă", "egg"),
  "лактоза": L("лактоза", "lactoză", "lactose"),
  "глютен": L("глютен", "gluten", "gluten"),
  "орех": L("орех", "nuci", "nuts"),
  "рыба": L("рыба", "pește", "fish"),
};

/* ── Применение к статичной разметке ── */
document.querySelectorAll("[data-i18n]").forEach((el) => {
  el.innerHTML = tr(el.dataset.i18n);
});

/* ── Переключатель языков ── */
document.querySelectorAll(".lang-switch").forEach((sw) => {
  sw.innerHTML = I18N_LANGS.map(
    (l) => `<button type="button" data-lang="${l}" class="${l === LANG ? "is-active" : ""}">${l.toUpperCase()}</button>`
  ).join("");
  sw.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-lang]");
    if (!btn || btn.dataset.lang === LANG) return;
    localStorage.setItem("gamarjoba-lang", btn.dataset.lang);
    location.reload();
  });
});

/* ── Подгонка вордмарок под ширину экрана ──
   data-fit="fill"   — всегда растягивать ровно на доступную ширину (футер)
   data-fit="shrink" — уменьшать, только если не помещается (hero) */
function fitWordmarks() {
  document.querySelectorAll("[data-fit]").forEach((el) => {
    el.style.fontSize = "";
    const ps = getComputedStyle(el.parentElement);
    const avail =
      el.parentElement.clientWidth -
      parseFloat(ps.paddingLeft) -
      parseFloat(ps.paddingRight);
    const w = el.scrollWidth;
    if (!w || avail <= 0) return;
    const fs = parseFloat(getComputedStyle(el).fontSize);
    if (el.dataset.fit === "fill") {
      el.style.fontSize = `${Math.floor(fs * (avail / w) * 100) / 100}px`;
    } else if (w > avail) {
      el.style.fontSize = `${Math.floor(fs * (avail / w) * 0.98 * 100) / 100}px`;
    }
  });
}
fitWordmarks();
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(fitWordmarks);
}
window.addEventListener("resize", () => {
  clearTimeout(window.__fitT);
  window.__fitT = setTimeout(fitWordmarks, 120);
});
