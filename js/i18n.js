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
  navAbout: L("О нас", "Despre noi", "About"),
  navHome: L("← На главную", "← Acasă", "← Home"),
  navBack: L("← Назад", "← Înapoi", "← Back"),
  navAllMenu: L("Всё меню", "Tot meniul", "Full menu"),

  logoSub: L("Грузинский ресторан", "Restaurant georgian", "Georgian restaurant"),
  menuWordmark: L("Меню", "Meniu", "Menu"),

  /* ── SEO: заголовок и описание страницы по языкам.
     Бренд Gamarjoba во всех языках остаётся Gamarjoba. ── */
  seoHomeTitle: L(
    "Gamarjoba — грузинский ресторан в Кишинёве",
    "Gamarjoba — restaurant georgian în Chișinău",
    "Gamarjoba — Georgian restaurant in Chișinău"
  ),
  seoHomeDesc: L(
    "Gamarjoba — ресторан традиционной грузинской кухни в Кишинёве. Хачапури, хинкали, мцвади на углях и вино из квеври. Гость — это подарок от Бога.",
    "Gamarjoba — restaurant de bucătărie georgiană tradițională în Chișinău. Hachapuri, hinkali, mtsvadi pe cărbuni și vin din kvevri. Oaspetele e un dar de la Dumnezeu.",
    "Gamarjoba — traditional Georgian restaurant in Chișinău. Khachapuri, khinkali, charcoal-grilled mtsvadi and qvevri wine. A guest is a gift from God."
  ),
  seoMenuTitle: L(
    "Меню — Gamarjoba",
    "Meniu — Gamarjoba",
    "Menu — Gamarjoba"
  ),
  seoMenuDesc: L(
    "Полное меню ресторана Gamarjoba: хачапури, хинкали, мангал, супы, салаты и десерты. Все цены в леях.",
    "Meniul complet al restaurantului Gamarjoba: hachapuri, hinkali, grătar, supe, salate și deserturi. Toate prețurile în lei.",
    "The full Gamarjoba menu: khachapuri, khinkali, grill, soups, salads and desserts. All prices in lei."
  ),
  /* og:title у меню длиннее <title>: в ленте мессенджера у ссылки нет
     контекста сайта, поэтому в превью нужен и род занятий, и город. */
  seoMenuOgTitle: L(
    "Меню — Gamarjoba, грузинский ресторан в Кишинёве",
    "Meniu — Gamarjoba, restaurant georgian în Chișinău",
    "Menu — Gamarjoba, Georgian restaurant in Chișinău"
  ),
  seoDishTitle: L("Блюдо — Gamarjoba", "Preparat — Gamarjoba", "Dish — Gamarjoba"),
  seoDishDesc: L(
    "Блюдо из меню Gamarjoba — ресторана традиционной грузинской кухни в Кишинёве.",
    "Un preparat din meniul Gamarjoba — restaurant de bucătărie georgiană tradițională în Chișinău.",
    "A dish from the Gamarjoba menu — a traditional Georgian restaurant in Chișinău."
  ),
  seoLocale: L("ru_RU", "ro_RO", "en_US"),
  heroEyebrow: L("Грузинская кухня · Кишинёв", "Bucătărie georgiană · Chișinău", "Georgian cuisine · Chișinău"),
  heroSub: L(
    "По-грузински — <em>«здравствуй»</em>. Буквально — <em>«победа тебе»</em>.<br />Здесь так встречают каждого гостя.",
    "În georgiană — <em>„bună ziua”</em>. Literal — <em>„victorie ție”</em>.<br />Așa întâmpinăm fiecare oaspete.",
    "In Georgian it means <em>“hello”</em>. Literally — <em>“victory to you”</em>.<br />That is how we greet every guest."
  ),
  heroTitle2: L(
    "Откройте для себя Грузию",
    "Descoperă Georgia",
    "Discover Georgia"
  ),
  heroSub2: L(
    "Земля древних гор, гостеприимства и бесконечного вкуса вина",
    "Ținutul munților străvechi, al ospitalității și al gustului nesfârșit de vin",
    "A land of ancient mountains, hospitality and the endless taste of wine"
  ),
  heroCta: L("Смотреть меню", "Vezi meniul", "See the menu"),

  storyLabel: L("Наша история", "Povestea noastră", "Our story"),
  storyTitle: L(
    "Грузия<br /><em>на одном столе</em>",
    "Georgia<br /><em>la o singură masă</em>",
    "Georgia<br /><em>on one table</em>"
  ),
  storyLead: L(
    "Gamarjoba по-грузински значит «здравствуй» — и с этого слова начинается каждый вечер у нас. Мы привезли в Кишинёв дух супры, грузинского застолья: тёплый хлеб из глиняной печи, щедрые порции и вино, которое льётся, пока звучат тосты.",
    "Gamarjoba în georgiană înseamnă „bună ziua” — și cu acest cuvânt începe fiecare seară la noi. Am adus la Chișinău spiritul suprei, ospățul georgian: pâine caldă din cuptor de lut, porții generoase și vin care curge cât se rostesc toasturile.",
    "Gamarjoba means “hello” in Georgian — and every evening here begins with that word. We brought the spirit of the supra, the Georgian feast, to Chișinău: warm bread from a clay oven, generous plates, and wine that keeps flowing as the toasts are made."
  ),
  storyText: L(
    "Каждое блюдо здесь — маленькая история. Аджарули пекут в форме лодочки, чтобы удержать солнце из сыра и яйца. Хинкали лепят вручную и едят руками, сначала выпивая горячий бульон. Мцвади жарят только на живых углях, без спешки. А вино мы наливаем из квеври — глиняных сосудов, что вызревают в земле, как тысячу лет назад. Приходите — и Грузия окажется ближе, чем кажется.",
    "Fiecare fel de mâncare e o mică poveste. Adjaruli se coace în formă de luntre, ca să țină soarele din brânză și ou. Hinkali se modelează manual și se mănâncă cu mâna, sorbind mai întâi zeama fierbinte. Mtsvadi se frige doar pe cărbuni, fără grabă. Iar vinul îl turnăm din kvevri — vase de lut ce se maturează în pământ, ca acum o mie de ani. Veniți — și Georgia va fi mai aproape decât pare.",
    "Every dish here is a small story. Adjaruli is baked boat-shaped to cradle its sun of cheese and egg. Khinkali are folded by hand and eaten with your fingers, the hot broth sipped first. Mtsvadi is grilled over live coals alone, unhurried. And the wine we pour from qvevri — clay vessels that ripen in the earth as they did a thousand years ago. Come, and Georgia will feel closer than you thought."
  ),

  aboutTitle: L("О ресторане", "Despre restaurant", "About the restaurant"),
  aboutText: L(
    "Gamarjoba — это про настоящую Грузию: щедрый стол, живой огонь и рецепты, которые передаются в семьях из поколения в поколение. Мы не имитируем грузинскую кухню — мы её проживаем. Каждое блюдо готовит наш шеф-повар по традиционным рецептам, а гости уходят с ощущением, что побывали в гостях у большой грузинской семьи.",
    "Gamarjoba înseamnă Georgia adevărată: masă îmbelșugată, foc viu și rețete transmise în familii din generație în generație. Nu imităm bucătăria georgiană — o trăim. Fiecare fel de mâncare e gătit de bucătarul nostru după rețete tradiționale, iar oaspeții pleacă cu senzația că au fost în ospeție la o mare familie georgiană.",
    "Gamarjoba is about the real Georgia: a generous table, live fire and recipes passed down in families from generation to generation. We don't imitate Georgian cuisine — we live it. Every dish is cooked by our chef to traditional recipes, and guests leave feeling they've been welcomed into a big Georgian family."
  ),
  sourceTitle: L(
    "Продукты, которым можно доверять",
    "Produse în care poți avea încredere",
    "Ingredients you can trust"
  ),
  sourceText: L(
    "Мы сами ездим за продуктами. Мясо для мцвади и хинкали — с проверенных ферм, зелень и овощи — свежие, специи — привезённые. Прежде чем блюдо попадёт к вам на стол, мы знаем, откуда оно. Именно поэтому вкус получается таким, каким он должен быть.",
    "Mergem noi înșine după produse. Carnea pentru mtsvadi și hinkali — de la ferme verificate, verdeața și legumele — proaspete, mirodeniile — aduse special. Înainte ca un fel de mâncare să ajungă pe masa voastră, știm de unde vine. De aceea gustul iese exact așa cum trebuie.",
    "We go for the ingredients ourselves. The meat for mtsvadi and khinkali comes from trusted farms, the herbs and vegetables are fresh, the spices are brought in. Before a dish reaches your table, we know where it came from. That's why the taste turns out exactly as it should."
  ),
  bookCta: L("Забронировать стол", "Rezervă o masă", "Book a table"),

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

  /* ── бейджи-отличия из печатного меню ── */
  badgePremium: L("Особый выбор", "Premium", "Premium"),
  badgeLegend: L("Легенда Грузии", "Legendar", "Legendary"),
  badgeClassic: L("Вечная классика", "Clasic", "Timeless classic"),
  badgeBestseller: L("Хит продаж", "Best seller", "Best seller"),

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

  /* ── оформление заказа через WhatsApp ── */
  cartOrder: L("Заказать в WhatsApp", "Comandă pe WhatsApp", "Order via WhatsApp"),
  cartOrderNote: L(
    "Заполните имя и телефон — заказ откроется готовым сообщением в WhatsApp, останется нажать «Отправить».",
    "Completați numele și telefonul — comanda se va deschide ca mesaj gata în WhatsApp, rămâne doar să apăsați „Trimite”.",
    "Fill in your name and phone — the order opens as a ready message in WhatsApp, just press Send."
  ),
  cartName: L("Имя", "Nume", "Name"),
  cartPhone: L("Телефон", "Telefon", "Phone"),
  cartComment: L("Комментарий (время, адрес, пожелания)", "Comentariu (oră, adresă, dorințe)", "Note (time, address, wishes)"),
  cartOrEmpty: L("Добавьте блюда, чтобы оформить заказ", "Adăugați bucate pentru a comanda", "Add dishes to place an order"),

  /* текст самого сообщения в WhatsApp */
  waTitle: L("Новый заказ с сайта Gamarjoba", "Comandă nouă de pe site-ul Gamarjoba", "New order from the Gamarjoba website"),
  waOrder: L("Заказ", "Comanda", "Order"),
  waTotal: L("Итого", "Total", "Total"),
  waName: L("Имя", "Nume", "Name"),
  waPhone: L("Телефон", "Telefon", "Phone"),
  waComment: L("Комментарий", "Comentariu", "Note"),
};

function tr(key) {
  return T(UI[key]);
}

/* соответствие badge → ключ подписи */
const BADGE_T = {
  premium: "badgePremium",
  legend: "badgeLegend",
  classic: "badgeClassic",
  bestseller: "badgeBestseller",
};

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

/* ── Вордмарки, разбитые на буквы: переводим текст, разбивку сохраняем.
   Бренд Gamarjoba такой разметкой не помечен и не затрагивается. ── */
document.querySelectorAll("[data-wordmark]").forEach((el) => {
  const text = tr(el.dataset.wordmark);
  if (!text) return;
  el.setAttribute("aria-label", text);
  el.innerHTML = [...text].map((ch) => `<span>${ch}</span>`).join("");
});

/* ── SEO по языку: <title>, description, Open Graph, Twitter.
   Страницу определяем по классу body, который уже есть в разметке.
   На странице блюда dish.js позже подставит название блюда. ── */
(() => {
  const page = document.body.classList.contains("menu-page")
    ? "Menu"
    : document.body.classList.contains("dish-page")
      ? "Dish"
      : "Home";
  const title = tr("seo" + page + "Title");
  const desc = tr("seo" + page + "Desc");
  /* у превью в мессенджерах бывает свой, более развёрнутый заголовок */
  const ogTitle = tr("seo" + page + "OgTitle") || title;
  const set = (sel, value) => {
    const el = document.querySelector(sel);
    if (el && value) el.setAttribute("content", value);
  };
  if (title) {
    document.title = title;
    set('meta[property="og:title"]', ogTitle);
    set('meta[name="twitter:title"]', ogTitle);
  }
  if (desc) {
    set('meta[name="description"]', desc);
    set('meta[property="og:description"]', desc);
    set('meta[name="twitter:description"]', desc);
  }
  set('meta[property="og:locale"]', tr("seoLocale"));
})();

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
