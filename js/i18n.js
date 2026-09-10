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
  seoNotFoundTitle: L(
    "Страница не найдена — Gamarjoba",
    "Pagina nu a fost găsită — Gamarjoba",
    "Page not found — Gamarjoba"
  ),
  seoNotFoundDesc: L(
    "Такой страницы на сайте Gamarjoba нет. Вернитесь на главную или откройте меню ресторана.",
    "Această pagină nu există pe site-ul Gamarjoba. Reveniți la pagina principală sau deschideți meniul.",
    "There is no such page on the Gamarjoba site. Go back home or open the restaurant menu."
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
  bookWhatsApp: L("Написать в WhatsApp", "Scrie pe WhatsApp", "Message on WhatsApp"),

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

  /* ── Страница 404 ── */
  notFoundLabel: L("Ошибка 404", "Eroare 404", "Error 404"),
  notFoundTitle: L(
    "Такой страницы<br /><em>у нас нет</em>",
    "Această pagină<br /><em>nu există</em>",
    "This page<br /><em>doesn't exist</em>"
  ),
  notFoundText: L(
    "Возможно, блюдо переехало в другой раздел меню или в ссылке опечатка. Хачапури, впрочем, на месте — загляните в меню.",
    "Poate că preparatul s-a mutat în alt capitol al meniului sau linkul are o greșeală. Khachapuri, oricum, e la locul lui — aruncați o privire în meniu.",
    "The dish may have moved to another part of the menu, or the link has a typo. The khachapuri, however, is right where it was — take a look at the menu."
  ),
  notFoundHome: L("На главную", "Acasă", "Home"),

  /* ── Страница политики cookie ── */
  navCookies: L("Настройки cookie", "Setări cookie", "Cookie settings"),
  footerCookies: L("Cookie и данные", "Cookie și date", "Cookies and data"),

  ckLabel: L("Правовая информация", "Informații juridice", "Legal information"),
  ckTitle: L(
    "Cookie<br /><em>и ваши данные</em>",
    "Cookie<br /><em>și datele dvs.</em>",
    "Cookies<br /><em>and your data</em>"
  ),
  ckIntro: L(
    "Коротко: этот сайт не ставит ни одной cookie, не использует аналитику, счётчики и рекламные пиксели и не передаёт данные посетителей третьим лицам. Ниже — что именно сохраняется в вашем браузере, зачем и как это удалить.",
    "Pe scurt: acest site nu plasează niciun cookie, nu folosește analitică, contoare sau pixeli publicitari și nu transmite datele vizitatorilor către terți. Mai jos — ce anume se păstrează în browserul dvs., de ce și cum se șterge.",
    "In short: this site sets no cookies, uses no analytics, counters or advertising pixels, and shares no visitor data with third parties. Below is exactly what is stored in your browser, why, and how to delete it."
  ),

  ckOperatorH: L("Кто обрабатывает данные", "Cine prelucrează datele", "Who processes the data"),
  ckOperatorText: L(
    "Оператором сайта и оператором персональных данных выступает:",
    "Operatorul site-ului și al datelor cu caracter personal este:",
    "The site and data controller is:"
  ),
  ckOperatorName: L("Наименование", "Denumire", "Company"),
  ckOperatorAddress: L("Адрес", "Adresa", "Address"),
  ckOperatorEmail: L("E-mail для обращений", "E-mail pentru solicitări", "E-mail for requests"),

  ckWhatH: L("Что такое cookie", "Ce sunt cookie-urile", "What cookies are"),
  ckWhatText: L(
    "Cookie — небольшой файл, который сайт сохраняет в браузере, чтобы узнавать устройство при следующем заходе. Рядом с cookie браузеры дают сайтам ещё два хранилища — localStorage и sessionStorage. Закон не делает между ними разницы: любое сохранение информации на вашем устройстве регулируется одинаково, поэтому здесь раскрыты все три.",
    "Un cookie este un fișier mic pe care site-ul îl salvează în browser pentru a recunoaște dispozitivul la următoarea vizită. Alături de cookie-uri, browserele oferă site-urilor încă două spații de stocare — localStorage și sessionStorage. Legea nu face distincție între ele: orice stocare de informații pe dispozitivul dvs. este reglementată la fel, de aceea sunt divulgate toate trei.",
    "A cookie is a small file a site saves in your browser to recognise your device on your next visit. Alongside cookies, browsers give sites two more stores — localStorage and sessionStorage. The law draws no distinction: any storage of information on your device is regulated the same way, so all three are disclosed here."
  ),

  ckCategoriesH: L("Категории", "Categorii", "Categories"),
  ckCatNecessaryT: L("Строго необходимые", "Strict necesare", "Strictly necessary"),
  ckCatNecessary: L(
    "Без них не работают функции, которые вы сами запросили: корзина, выбор языка, возврат в меню на то же место. Согласия не требуют — именно потому, что без них сайт не выполнит вашу же просьбу. Всё, что перечислено в таблице ниже, относится к этой категории.",
    "Fără ele nu funcționează lucrurile pe care le-ați cerut chiar dvs.: coșul, alegerea limbii, revenirea în meniu în același loc. Nu necesită consimțământ — tocmai pentru că fără ele site-ul nu ar îndeplini propria dvs. solicitare. Tot ce este enumerat în tabelul de mai jos ține de această categorie.",
    "Without them the things you asked for yourself do not work: the cart, the language choice, returning to the same spot in the menu. They require no consent — precisely because without them the site cannot do what you asked. Everything listed in the table below falls into this category."
  ),
  ckCatOtherT: L("Аналитика, маркетинг, встраивания", "Analitică, marketing, conținut încorporat", "Analytics, marketing, embeds"),
  ckCatOther: L(
    "Не используются. На сайте нет Google Analytics, Google Tag Manager, Meta Pixel и любых других счётчиков и рекламных систем, нет встроенных карт, видео и виджетов. Шрифты, которыми набран сайт, лежат на нашем же домене, а не подгружаются со стороннего сервиса. Поэтому баннера согласия здесь нет: соглашаться не на что.",
    "Nu sunt utilizate. Site-ul nu are Google Analytics, Google Tag Manager, Meta Pixel sau alte contoare și sisteme publicitare, nu are hărți, video sau widget-uri încorporate. Fonturile cu care este cules site-ul se află pe domeniul nostru, nu sunt încărcate de la un serviciu terț. De aceea aici nu există banner de consimțământ: nu este la ce consimți.",
    "Not used. The site has no Google Analytics, Google Tag Manager, Meta Pixel or any other counters and advertising systems, and no embedded maps, videos or widgets. The fonts the site is set in live on our own domain rather than being loaded from a third-party service. That is why there is no consent banner here: there is nothing to consent to."
  ),

  ckTableH: L("Что сохраняется в вашем браузере", "Ce se păstrează în browserul dvs.", "What is stored in your browser"),
  ckTableNote: L(
    "Cookie в строгом смысле слова сайт не устанавливает ни одной. Ниже — все значения, которые он сохраняет в браузере.",
    "Site-ul nu plasează niciun cookie în sensul strict al cuvântului. Mai jos sunt toate valorile pe care le salvează în browser.",
    "The site sets no cookies in the strict sense. Below are all the values it stores in your browser."
  ),
  ckThName: L("Имя", "Nume", "Name"),
  ckThProvider: L("Поставщик", "Furnizor", "Provider"),
  ckThPurpose: L("Назначение", "Scop", "Purpose"),
  ckThTtl: L("Срок", "Durată", "Duration"),

  ckOrderH: L("Имя и телефон в заказе", "Numele și telefonul din comandă", "Name and phone in an order"),
  ckOrderText: L(
    "Если вы заполняете имя и телефон в корзине, они сохраняются только в вашем браузере и не отправляются на наши серверы — их у сайта попросту нет. Данные покидают устройство лишь в тот момент, когда вы сами нажимаете «Заказать в WhatsApp»: тогда состав заказа, имя, телефон и комментарий передаются в WhatsApp и попадают к нам обычным сообщением. Передача происходит по вашей инициативе и в объёме, который вы видите в тексте сообщения до отправки. Обработка этих данных в WhatsApp регулируется правилами самого сервиса.",
    "Dacă completați numele și telefonul în coș, acestea se păstrează doar în browserul dvs. și nu sunt trimise pe serverele noastre — site-ul nici nu are așa ceva. Datele părăsesc dispozitivul abia în momentul în care apăsați chiar dvs. „Comandă pe WhatsApp”: atunci conținutul comenzii, numele, telefonul și comentariul sunt transmise în WhatsApp și ajung la noi ca mesaj obișnuit. Transmiterea are loc la inițiativa dvs. și în volumul pe care îl vedeți în textul mesajului înainte de trimitere. Prelucrarea acestor date în WhatsApp este guvernată de regulile serviciului respectiv.",
    "If you fill in your name and phone in the cart, they are stored only in your browser and are not sent to our servers — the site has none. The data leaves your device only when you yourself press “Order via WhatsApp”: at that point the order, your name, phone and note are passed to WhatsApp and reach us as an ordinary message. The transfer happens at your initiative and in the volume you can see in the message text before sending. Processing of that data within WhatsApp is governed by that service's own rules."
  ),

  ckBasisH: L("Правовое основание", "Temeiul juridic", "Legal basis"),
  ckBasisText: L(
    "Хранение строго необходимых значений на вашем устройстве не требует согласия: оно нужно для оказания услуги, которую вы запросили сами. Обработка имени и телефона при оформлении заказа основана на вашем обращении к нам и необходима, чтобы принять и подтвердить заказ. Обработка ведётся в соответствии с Legea nr. 195/2024 privind protecția datelor cu caracter personal и Регламентом (ЕС) 2016/679 (GDPR).",
    "Stocarea valorilor strict necesare pe dispozitivul dvs. nu necesită consimțământ: ea este indispensabilă pentru prestarea serviciului pe care l-ați solicitat chiar dvs. Prelucrarea numelui și a telefonului la plasarea comenzii se întemeiază pe solicitarea dvs. și este necesară pentru a primi și confirma comanda. Prelucrarea se face în conformitate cu Legea nr. 195/2024 privind protecția datelor cu caracter personal și Regulamentul (UE) 2016/679 (GDPR).",
    "Storing strictly necessary values on your device requires no consent: it is essential to provide the service you requested yourself. Processing your name and phone when placing an order is based on your own request and is necessary to receive and confirm that order. Processing is carried out in accordance with Legea nr. 195/2024 privind protecția datelor cu caracter personal and Regulation (EU) 2016/679 (GDPR)."
  ),

  ckRightsH: L("Ваши права", "Drepturile dvs.", "Your rights"),
  ckRightsText: L(
    "По Legea nr. 195/2024 и GDPR вы вправе:",
    "Conform Legea nr. 195/2024 și GDPR aveți dreptul:",
    "Under Legea nr. 195/2024 and the GDPR you have the right:"
  ),
  ckRight1: L(
    "знать, обрабатываем ли мы ваши данные, и получить их копию;",
    "să știți dacă vă prelucrăm datele și să primiți o copie a acestora;",
    "to know whether we process your data and to receive a copy of it;"
  ),
  ckRight2: L(
    "потребовать исправить неточные данные;",
    "să cereți rectificarea datelor inexacte;",
    "to have inaccurate data corrected;"
  ),
  ckRight3: L(
    "потребовать удалить данные и ограничить их обработку;",
    "să cereți ștergerea datelor și restricționarea prelucrării;",
    "to have data erased and processing restricted;"
  ),
  ckRight4: L(
    "возразить против обработки;",
    "să vă opuneți prelucrării;",
    "to object to processing;"
  ),
  ckRight5: L(
    "получить данные в машиночитаемом виде и передать их другому оператору;",
    "să primiți datele într-un format prelucrabil automat și să le transferați altui operator;",
    "to receive your data in a machine-readable format and transfer it to another controller;"
  ),
  ckRight6: L(
    "отозвать согласие там, где обработка на нём основана, — отзыв не затрагивает законность обработки до отзыва;",
    "să retrageți consimțământul acolo unde prelucrarea se întemeiază pe el — retragerea nu afectează legalitatea prelucrării de până atunci;",
    "to withdraw consent where processing is based on it — withdrawal does not affect the lawfulness of processing before it;"
  ),
  ckRight7: L(
    "подать жалобу в надзорный орган.",
    "să depuneți o plângere la autoritatea de supraveghere.",
    "to lodge a complaint with the supervisory authority."
  ),
  ckRightsHow: L(
    "Чтобы воспользоваться любым из этих прав, напишите нам на адрес, указанный выше. Мы ответим в срок, установленный законом.",
    "Pentru a exercita oricare dintre aceste drepturi, scrieți-ne la adresa indicată mai sus. Vă vom răspunde în termenul prevăzut de lege.",
    "To exercise any of these rights, write to us at the address above. We will reply within the period set by law."
  ),

  ckClearH: L("Как удалить сохранённое", "Cum ștergeți datele salvate", "How to delete what is stored"),
  ckClearText: L(
    "Согласия сайт не собирает, поэтому отзывать нечего. Но всё, что он сохранил в вашем браузере, вы можете стереть — прямо здесь или средствами самого браузера в разделе настроек сайта.",
    "Site-ul nu colectează consimțământ, deci nu este ce retrage. Dar tot ce a salvat în browserul dvs. poate fi șters — chiar de aici sau din setările browserului pentru acest site.",
    "The site collects no consent, so there is nothing to withdraw. But everything it stored in your browser can be erased — right here, or from your browser's own settings for this site."
  ),
  ckClearBtn: L("Удалить сохранённые данные", "Șterge datele salvate", "Delete stored data"),
  ckClearDone: L("Удалено", "Șters", "Deleted"),
  ckClearEmpty: L("Сохранённых данных не было", "Nu existau date salvate", "There was nothing stored"),
  ckClearAfter: L(
    "Удаление очистит корзину, сохранённые имя и телефон и выбранный язык. Сам сайт продолжит работать.",
    "Ștergerea golește coșul, numele și telefonul salvate și limba aleasă. Site-ul va continua să funcționeze.",
    "Deleting clears the cart, the saved name and phone, and the chosen language. The site itself keeps working."
  ),

  ckLinksH: L("Переходы на сторонние сайты", "Accesarea site-urilor terțe", "Links to third-party sites"),
  ckLinksText: L(
    "На сайте есть ссылки на Instagram, WhatsApp и Google Maps. Пока вы по ним не нажали, никакие запросы туда не уходят. После перехода вы оказываетесь на стороннем сайте, и там действуют его собственные правила обработки данных — мы на них не влияем.",
    "Pe site există linkuri către Instagram, WhatsApp și Google Maps. Până nu le accesați, nu pleacă nicio cerere într-acolo. După accesare ajungeți pe un site terț, unde se aplică propriile lui reguli de prelucrare a datelor — noi nu le influențăm.",
    "The site links to Instagram, WhatsApp and Google Maps. Until you click them, no requests go there. Once you follow a link you are on a third-party site, where its own data rules apply — we have no influence over them."
  ),

  ckComplaintH: L("Жалоба в надзорный орган", "Plângere la autoritatea de supraveghere", "Complaint to the supervisory authority"),
  ckComplaintText: L(
    "Если вы считаете, что мы обрабатываем ваши персональные данные с нарушением закона, вы вправе обратиться к нам напрямую по адресу выше — и в любом случае вправе подать жалобу в надзорный орган Республики Молдова:",
    "Dacă considerați că vă prelucrăm datele cu caracter personal cu încălcarea legii, aveți dreptul să ne contactați direct la adresa de mai sus — și, în orice caz, aveți dreptul să depuneți o plângere la autoritatea de supraveghere din Republica Moldova:",
    "If you believe we process your personal data in breach of the law, you may contact us directly at the address above — and in any case you have the right to lodge a complaint with the supervisory authority of the Republic of Moldova:"
  ),
  ckUpdated: L("Последнее обновление", "Ultima actualizare", "Last updated"),

  seoCookiesTitle: L(
    "Cookie и данные — Gamarjoba",
    "Cookie și date — Gamarjoba",
    "Cookies and data — Gamarjoba"
  ),
  seoCookiesDesc: L(
    "Какие данные сайт Gamarjoba сохраняет в вашем браузере, зачем и как их удалить. Cookie, аналитика и трекеры не используются.",
    "Ce date păstrează site-ul Gamarjoba în browserul dvs., de ce și cum le ștergeți. Nu folosim cookie-uri, analitică sau trackere.",
    "What the Gamarjoba site stores in your browser, why, and how to delete it. No cookies, analytics or trackers are used."
  ),
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
  /* Плашки-отличия печатаются как в макете («PREMIUM / ОСОБЫЙ ВЫБОР») и лежат
     в menu-data.js. Эти ключи остались для страниц блюд и старой барной карты. */
  badgePremium: L("Особый выбор", "Premium", "Premium"),
  badgeLegend: L("Легенда Грузии", "Legendar", "Legendary"),
  badgeClassic: L("Вечная классика", "Clasic", "Timeless classic"),
  badgeBestseller: L("Хит продаж", "Best seller", "Best seller"),

  /* ── Меню: одна строка-подсказка над страницами ── */
  menuHint: L(
    "Нажмите на блюдо, чтобы добавить его в корзину",
    "Apăsați pe un preparat ca să-l adăugați în coș",
    "Tap a dish to add it to your cart"
  ),

  /* ── Меню: подпись к странице бумажного меню ──
     {n} и {total} подставляются номером страницы при применении. */
  menuPageAlt: L(
    "Меню Gamarjoba — страница {n} из {total}",
    "Meniu Gamarjoba — pagina {n} din {total}",
    "Gamarjoba menu — page {n} of {total}"
  ),

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
document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
  const text = tr(el.dataset.i18nPlaceholder);
  el.placeholder = text;
  el.setAttribute("aria-label", text);
});
/* alt с номером страницы: строка одна, номер приходит из разметки */
document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
  el.alt = tr(el.dataset.i18nAlt)
    .replace("{n}", el.dataset.page || "")
    .replace("{total}", el.dataset.pageTotal || "");
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
  const has = (c) => document.body.classList.contains(c);
  const page = has("notfound-page")
    ? "NotFound"
    : has("cookies-page")
      ? "Cookies"
      : has("menu-page")
        ? "Menu"
        : has("dish-page")
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
