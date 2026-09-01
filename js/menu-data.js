/* Gamarjoba — полное меню (из печатного меню, апрель).
   Все цены в леях (MDL). variants — позиции с выбором мяса/размера.
   link — id блюда, у которого есть своя страница (dish.html).
   Тексты — трёхъязычные через L(ru, ro, en) из i18n.js. */

const MENU = [
  {
    id: "chef",
    title: L("Выбор шеф-повара", "Recomandările șefului", "Chef's choice"),
    ro: "Recomandările șefului",
    items: [
      { img: "assets/menu/shurpa.jpg", slug: "shurpa", name: "Shurpa", badge: "premium", ru: L("Шурпа — густой суп из ягнёнка", "Supă groasă de miel", "Thick lamb soup"), w: "400 g", p: 120 },
      { img: "assets/menu/adjaruli.jpg", name: "Adjaruli", badge: "legend", ru: L("Хачапури-лодочка с яйцом", "Luntre khachapuri cu ou", "Boat khachapuri with egg"), w: "450 g", p: 155, link: "adjaruli" },
      { img: "assets/menu/badrijani.jpg", name: "Badrijani", badge: "classic", ru: L("Рулетики из баклажана с орехом", "Rulouri de vinete cu nuci", "Aubergine rolls with walnuts"), w: "200 g", p: 80, link: "badrijani" },
      { img: "assets/menu/mtsvadi.jpg", name: L("Mtsvadi из телятины", "Mtsvadi Vițel", "Veal mtsvadi"), badge: "bestseller", ru: L("Телятина на углях", "Vițel pe cărbuni", "Charcoal-grilled veal"), w: "250 g", p: 180, link: "mtsvadi" },
    ],
  },
  {
    id: "sets",
    title: L("Мясные сеты для компаний", "Platouri pentru companii", "Family platters"),
    ro: "Platouri pentru companii",
    items: [
      { img: "assets/menu/set-mix.jpg", slug: "set-din-carne-mix", name: L("Мясной сет «Микс»", "Set din carne Mix", "Mixed meat platter"), ru: L("Ягнёнок, телятина, свинина: рёбрышки, кебаб, шашлык, абхазура", "Miel, vițel, porc: costițe, kebab, frigărui, abhazura", "Lamb, veal, pork: ribs, kebab, skewers, abkhazura"), w: "1800 g", p: 1350 },
      { img: "assets/menu/set-miel.jpg", slug: "set-din-carne-de-miel", name: L("Сет из ягнёнка", "Set din carne de miel", "Lamb platter"), badge: "bestseller", ru: L("Пир из ягнёнка: каре, шашлык, люля, вырезка", "Ospăț de miel: cotlete, frigărui, liulea, mușchi", "A lamb feast: rack, skewers, kebab, tenderloin"), w: "1150 g", p: 1400 },
      { img: "assets/menu/set-porc.jpg", slug: "set-din-carne-de-porc", name: L("Сет из свинины", "Set din carne de porc", "Pork platter"), ru: L("Свиной сет: рёбрышки, шашлык, люля-кебаб", "Set de porc: costițe, frigărui, liulea-kebab", "Pork set: ribs, skewers, lula kebab"), w: "1450 g", p: 900 },
      { img: "assets/menu/set-pui.jpg", slug: "set-din-carne-de-pui", name: L("Сет из курицы", "Set din carne de pui", "Chicken platter"), ru: L("Куриный сет: крылышки, голени, бёдра с овощами гриль", "Set de pui: aripioare, pulpe, copane cu legume la grătar", "Chicken set: wings, drumsticks, thighs with grilled vegetables"), w: "1600 g", p: 850 },
    ],
  },
  {
    id: "cold",
    title: L("Холодные закуски", "Gustări reci", "Cold starters"),
    ro: "Gustări reci",
    items: [
      { img: "assets/menu/mtsnili.jpg", slug: "mtsnili", name: "Mtsnili", ru: L("Грузинские соленья: зелёные помидоры, огурцы, чеснок, капуста", "Murături georgiene: roșii verzi, castraveți, usturoi, varză", "Georgian pickles: green tomatoes, cucumbers, garlic, cabbage"), w: "400 g", p: 120 },
      { img: "assets/menu/kveli.jpg", slug: "kveli", name: "Kveli", ru: L("Тарелка крафтовых сыров: сулугуни, имеретинский, копчёный, с орехами", "Selecție de brânzeturi: suluguni, imereti, afumată, cu nuci", "Craft cheese board: sulguni, Imeretian, smoked, with walnuts"), w: "300 g", p: 220 },
      { img: "assets/menu/tevzis.jpg", slug: "tevzis-assorti", name: "Tevzis Assorti", ru: L("Рыбное ассорти: лосось, масляная, скумбрия", "Platou de pește: somon, pește-unt, macrou", "Fish platter: salmon, butterfish, mackerel"), w: "300 g", p: 230 },
      { img: "assets/menu/khortcis.jpg", slug: "khortcis-assorti", name: "Khortcis Assorti", ru: L("Мясная тарелка: сало, колбаска, пастрома, почеревка", "Platou cu carne: slănină, cârnăciori, pastramă, piept de porc", "Meat plate: lard, sausage, pastrami, pork belly"), w: "250 g", p: 190 },
      { img: "assets/menu/mokharshuli.jpg", slug: "mokharshuli-ena", name: "Mokharshuli Ena", ru: L("Отварной говяжий язык с хреном и горчицей", "Limbă de vită fiartă cu hrean și muștar", "Boiled beef tongue with horseradish and mustard"), w: "200 g", p: 160 },
      { img: "assets/menu/bulgaruli.jpg", slug: "bulgaruli", name: "Bulgaruli", ru: L("Запечённый перец с ореховой начинкой", "Ardei copți umpluți cu pastă de nuci", "Roasted peppers stuffed with walnut paste"), w: "250 g", p: 150 },
      { img: "assets/menu/heringi.jpg", slug: "heringi-kartophilit", name: "Heringi Kartophilit", ru: L("Сельдь с золотистым запечённым картофелем", "Hering cu cartofi copți aurii", "Herring with golden roasted potatoes"), w: "250 g", p: 110 },
      { img: "assets/menu/bostneulis.jpg", slug: "bostneulis-assorti", name: "Bostneulis Assorti", ru: L("Свежие садовые овощи и много зелени", "Legume proaspete de grădină și multă verdeață", "Fresh garden vegetables and lots of greens"), w: "400 g", p: 100 },
    ],
  },
  {
    id: "hot-starters",
    title: L("Горячие закуски", "Gustări calde", "Hot starters"),
    ro: "Gustări calde",
    items: [
      { img: "assets/menu/creveti.jpg", slug: "creveti-cu-spanac", name: L("Креветки со шпинатом", "Creveți cu spanac", "Prawns with spinach"), ru: L("Креветки со шпинатом", "Creveți cu spanac", "Prawns with spinach"), w: "300 g", p: 250 },
      { img: "assets/menu/shkmeruli.jpg", name: "Shkmeruli", ru: L("Цыплёнок в чесночно-сливочном соусе", "Pui în sos cremos de usturoi", "Chicken in creamy garlic sauce"), w: "350 g", p: 170, link: "shkmeruli" },
      { img: "assets/menu/djigari.jpg", slug: "djigari", name: "Djigari", ru: L("Джигари — жаркое из печени", "Ficăței sotați cu ceapă", "Sautéed liver with onions"), w: "300 g", p: 160 },
      { img: "assets/menu/kucimaci.jpg", slug: "kucimaci", name: "Kucimaci", ru: L("Кучмачи — потроха с орехами и специями", "Kuchmachi — măruntaie cu nuci și mirodenii", "Kuchmachi — giblets with walnuts and spices"), w: "300 g", p: 150 },
      { name: L("Бараньи семенники", "Semințe de miel", "Lamb fries"), ru: L("Бараньи семенники на углях", "Fudulii de miel pe cărbuni", "Lamb fries over coals"), w: "250 g", p: 145 },
      { img: "assets/menu/dolma.jpg", slug: "dolma", name: "Dolma", ru: L("Долма — виноградные листья с мясом", "Dolma — frunze de viță cu carne", "Dolma — vine leaves stuffed with meat"), w: "300 g", p: 120 },
      { img: "assets/menu/soko.jpg", slug: "soko-ketze", name: "Soko Ketze", ru: L("Грибы под сулугуни на кеци", "Ciuperci cu suluguni la ketsi", "Mushrooms with sulguni on a ketsi pan"), w: "300 g", p: 120 },
      { img: "assets/menu/lobio-nuci.jpg", slug: "lobio-cu-nuci", name: L("Lobio с орехами", "Lobio cu nuci", "Lobio with walnuts"), ru: L("Лобио с орехами", "Lobio cu nuci", "Lobio with walnuts"), w: "300 g", p: 85 },
      { img: "assets/menu/lobio.jpg", slug: "lobio", name: "Lobio", ru: L("Лобио — томлёная фасоль со специями", "Lobio — fasole înăbușită cu mirodenii", "Lobio — slow-cooked beans with spices"), w: "300 g", p: 80 },
      { img: "assets/menu/tsitsila.jpg", slug: "tsitsila-tabaka", name: "Tsitsila Tabaka", ru: L("Цыплёнок табака (цена за 100 г)", "Pui tabaka (preț per 100 g)", "Chicken tabaka (price per 100 g)"), w: "100 g", p: 45 },
    ],
  },
  {
    id: "salads",
    title: L("Салаты", "Salate", "Salads"),
    ro: "Salate",
    items: [
      { img: "assets/menu/sal-gamarjoba.jpg", slug: "salata-gamarjoba", name: L("Салат «Gamarjoba»", "Salată Gamarjoba", "Gamarjoba salad"), ru: L("Фирменный салат", "Salata casei", "Our signature salad"), w: "250 g", p: 210 },
      { img: "assets/menu/sal-limba.jpg", slug: "salata-cu-limba", name: L("Салат с языком", "Salată cu limbă", "Beef tongue salad"), ru: L("Салат с языком", "Salată cu limbă", "Beef tongue salad"), w: "250 g", p: 170 },
      { img: "assets/menu/sal-kahetiana.jpg", slug: "salata-kahetiana", name: L("Кахетинский салат", "Salată Kahetiană", "Kakhetian salad"), ru: L("Кахетинский салат", "Salată kahetiană", "Kakhetian salad"), w: "250 g", p: 100 },
      { img: "assets/menu/atsatsili.jpg", slug: "atsatsili-de-vinete", name: L("Atsatsili из баклажанов", "Atsatsili de vinete", "Atsatsili with aubergine"), ru: L("Ацацили: печёные баклажаны, орех, кинза", "Vinete coapte, nuci, coriandru", "Roasted aubergine, walnuts, coriander"), w: "250 g", p: 90 },
      { img: "assets/menu/sal-guriana.jpg", slug: "salata-guriana", name: L("Гурийский салат", "Salată Guriană", "Gurian salad"), ru: L("Гурийский: с грецким орехом и киндзой", "Guriană: cu nuci și coriandru", "Gurian: with walnuts and coriander"), w: "250 g", p: 85 },
      { img: "assets/menu/sal-georgiana.jpg", slug: "salata-georgiana", name: L("Грузинский салат", "Salată Georgiană", "Georgian salad"), ru: L("Грузинский: помидоры, огурцы, базилик", "Georgiană: roșii, castraveți, busuioc", "Georgian: tomatoes, cucumbers, basil"), w: "250 g", p: 75 },
    ],
  },
  {
    id: "soups",
    title: L("Первые блюда", "Primele feluri", "Soups"),
    ro: "Primele feluri",
    items: [
      { img: "assets/menu/shurpa.jpg", slug: "shurpa", name: "Shurpa", ru: L("Наваристый суп из ягнёнка", "Supă consistentă de miel", "Rich lamb soup"), w: "400 g", p: 120 },
      { img: "assets/menu/bors.jpg", slug: "bors-rosu", name: L("Красный борщ", "Borș roșu", "Red borscht"), ru: L("Красный борщ", "Borș roșu", "Red borscht"), w: "400 g", p: 120 },
      { img: "assets/menu/chikh-hinkali.jpg", slug: "chikhirtma-cu-hinkali", name: L("Chikhirtma с хинкали", "Chikhirtma cu hinkali", "Chikhirtma with khinkali"), ru: L("Белый куриный суп с маленькими хинкали", "Supă albă de pui cu hinkali mici", "White chicken soup with little khinkali"), w: "400 g", p: 105 },
      { img: "assets/menu/solyanka.jpg", slug: "solyanka", name: "Solyanka", ru: L("Солянка: пять видов мяса, солёные огурчики, маслины, лимон", "Solyanka: cinci feluri de carne, castraveciori murați, măsline, lămâie", "Solyanka: five kinds of meat, pickles, olives, lemon"), w: "400 g", p: 100 },
      { img: "assets/menu/chikh-pui.jpg", slug: "chikhirtma-cu-carne-de-pui", name: L("Chikhirtma с курицей", "Chikhirtma cu carne de pui", "Chicken chikhirtma"), ru: L("Чихиртма — бархатный белый куриный суп", "Chikhirtma — supă albă catifelată de pui", "Chikhirtma — velvety white chicken soup"), w: "400 g", p: 100 },
      { img: "assets/menu/kharcho.jpg", slug: "kharcho", name: "Kharcho", ru: L("Харчо — острый суп с говядиной и рисом", "Kharcho — supă picantă cu vită și orez", "Kharcho — spicy beef and rice soup"), w: "400 g", p: 100 },
    ],
  },
  {
    id: "hinkali",
    title: L("Хинкали", "Hinkali", "Khinkali"),
    ro: "Hinkali",
    note: L(
      "Обычные — 3 шт. Любые хинкали можно взять жареными (la tigaie) — +5 лей.",
      "Porția — 3 buc. Orice hinkali pot fi la tigaie — +5 lei.",
      "A portion is 3 pcs. Any khinkali can be pan-fried — +5 lei."
    ),
    items: [
      { img: "assets/menu/mama-hinkali.jpg", name: "Mama Hinkali", badge: "premium", ru: L("Гигантский хинкали на всю компанию", "Hinkali gigant pentru toată compania", "A giant khinkali for the whole table"), w: "800 g", p: 150, link: "mama-hinkali" },
      { img: "assets/menu/hinkali-vita.jpg", slug: "hinkali-cu-carne-de-vita", name: L("Hinkali с говядиной", "Hinkali cu carne de vită", "Khinkali with beef"), ru: L("С говядиной", "Cu carne de vită", "With beef"), w: "270 g · 3 x", variants: [
          { v: L("Отварные", "Fierte", "Boiled"), p: 80 },
          { v: L("Жареные", "La tigaie", "Pan-fried"), p: 85 },
        ] },
      { img: "assets/menu/hinkali-mixt.jpg", slug: "hinkali-mixt-porc-vita", name: L("Hinkali из свинины и говядины", "Hinkali mixt porc-vită", "Khinkali with pork and beef"), ru: L("Свинина-говядина", "Porc-vită", "Pork and beef"), w: "270 g · 3 x", variants: [
          { v: L("Отварные", "Fierte", "Boiled"), p: 80 },
          { v: L("Жареные", "La tigaie", "Pan-fried"), p: 85 },
        ] },
      { img: "assets/menu/hinkali-miel.jpg", slug: "hinkali-cu-carne-de-miel", name: L("Hinkali с ягнёнком", "Hinkali cu carne de miel", "Khinkali with lamb"), ru: L("С ягнёнком", "Cu carne de miel", "With lamb"), w: "270 g · 3 x", variants: [
          { v: L("Отварные", "Fierte", "Boiled"), p: 80 },
          { v: L("Жареные", "La tigaie", "Pan-fried"), p: 85 },
        ] },
      { img: "assets/menu/hinkali-cascaval.jpg", slug: "hinkali-cu-cascaval", name: L("Hinkali с сыром", "Hinkali cu cașcaval", "Khinkali with cheese"), ru: L("С сыром", "Cu cașcaval", "With cheese"), w: "270 g · 3 x", variants: [
          { v: L("Отварные", "Fierte", "Boiled"), p: 80 },
          { v: L("Жареные", "La tigaie", "Pan-fried"), p: 85 },
        ] },
    ],
  },
  {
    id: "khachapuri",
    title: L("Хачапури", "Haceapuri", "Khachapuri"),
    ro: "Haceapuri",
    items: [
      { img: "assets/menu/adjaruli.jpg", name: "Adjaruli", badge: "legend", ru: L("Лодочка с сыром, яйцом и маслом", "Luntre cu brânză, ou și unt", "Boat with cheese, egg and butter"), w: "450 g", p: 155, alt: L("гигант 1700 г — 680", "gigant 1700 g — 680", "giant 1700 g — 680"), link: "adjaruli" },
      { img: "assets/menu/megruli.jpg", slug: "megruli", name: "Megruli", ru: L("Мегрули — с сыром сверху и внутри", "Megruli — cu brânză deasupra și în interior", "Megruli — cheese on top and inside"), w: "450 g", p: 175, alt: L("большой 750 г — 250", "mare 750 g — 250", "large 750 g — 250") },
      { img: "assets/menu/regal.jpg", slug: "regal", name: "Regal", ru: L("Королевское: двойная порция сыра", "Regal: porție dublă de brânză", "Royal: a double portion of cheese"), w: "650 g", p: 240 },
      { img: "assets/menu/kubdari.jpg", slug: "kubdari", name: "Kubdari", ru: L("Кубдари — сванский, с мясом", "Kubdari — din Svaneti, cu carne", "Kubdari — Svanetian, with meat"), w: "550 g", p: 190 },
      { img: "assets/menu/imeruli.jpg", slug: "imeruli", name: "Imeruli", ru: L("Имерули — классический круглый", "Imeruli — clasic, rotund", "Imeruli — the round classic"), w: "650 g", p: 225 },
      { img: "assets/menu/adjaruli-ceashushuli.jpg", slug: "adjaruli-cu-ceashushuli", name: L("Adjaruli с Ceashushuli", "Adjaruli cu ceashushuli", "Adjaruli with Chashushuli"), ru: L("Лодочка с чашушули из телятины или ягнёнка", "Luntre cu ceashushuli de vițel sau miel", "Boat filled with veal or lamb chashushuli"), w: "550 g", p: 200 },
      { img: "assets/menu/phlovani.jpg", slug: "phlovani", name: "Phlovani", ru: L("Пховани — со шпинатом и сыром", "Phlovani — cu spanac și brânză", "Phlovani — with spinach and cheese"), w: "400 g", p: 190 },
      { img: "assets/menu/penovani.jpg", slug: "penovani", name: "Penovani", ru: L("Пеновани — слоёный", "Penovani — din foietaj", "Penovani — flaky puff pastry"), w: "300 g", p: 140 },
    ],
  },
  {
    id: "mangal",
    title: L("Мангал", "Mangal", "Charcoal grill"),
    ro: "Mangal · Charcoal grill",
    items: [
      {
        img: "assets/menu/mtsvadi.jpg", name: "Mtsvadi", ru: L("Шашлык на живых углях", "Frigărui pe cărbuni încinși", "Skewers over live coals"), w: "250 g", link: "mtsvadi",
        variants: [
          { v: L("Курица", "Pui", "Chicken"), p: 140 },
          { v: L("Свинина", "Porc", "Pork"), p: 140 },
          { v: L("Телятина", "Vițel", "Veal"), p: 190 },
          { v: L("Ягнёнок", "Miel", "Lamb"), p: 195 },
        ],
      },
      {
        img: "assets/menu/liulea.jpg", slug: "liulea-kebab", name: "Liulea-kebab", ru: L("Рубленое мясо с травами, на шампуре", "Carne tocată cu ierburi, la frigăruie", "Minced meat with herbs, on a skewer"),
        variants: [
          { v: L("Курица · 250 г", "Pui · 250 g", "Chicken · 250 g"), p: 130 },
          { v: L("Ягнёнок · 250 г", "Miel · 250 g", "Lamb · 250 g"), p: 140 },
          { v: L("Свинина-телятина · 250 г", "Porc-vițel · 250 g", "Pork-veal · 250 g"), p: 140 },
          { v: L("Свинина-телятина с сыром · 250 г", "Porc-vițel cu cașcaval · 250 g", "Pork-veal with cheese · 250 g"), p: 140 },
          { v: L("Курица с сыром · 300 г", "Pui cu cașcaval · 300 g", "Chicken with cheese · 300 g"), p: 190 },
          { v: L("By Chef · 400 г", "By Chef · 400 g", "By Chef · 400 g"), p: 180 },
        ],
      },
    ],
  },
  {
    id: "fish",
    title: L("Рыба на гриле", "Pește la grătar", "Grilled fish"),
    ro: "Pește la grătar",
    items: [
      { img: "assets/menu/sturion.jpg", slug: "steak-sturion", name: L("Стейк из осетра", "Steak Sturion", "Sturgeon steak"), ru: L("Стейк из осетра", "Steak de sturion", "Sturgeon steak"), w: "250/60 g", p: 340 },
      { img: "assets/menu/dorada.jpg", slug: "dorada", name: "Dorada", ru: L("Дорада", "Doradă", "Sea bream"), w: "330/60 g", p: 190 },
      { img: "assets/menu/somon.jpg", slug: "steak-somon", name: L("Стейк из лосося", "Steak Somon", "Salmon steak"), ru: L("Стейк из сёмги", "Steak de somon", "Salmon steak"), w: "150/60 g", p: 240 },
      { img: "assets/menu/pastrav.jpg", slug: "pastrav", name: L("Форель", "Păstrăv", "Trout"), ru: L("Форель", "Păstrăv", "Trout"), w: "250/60 g", p: 225 },
    ],
  },
  {
    id: "grill-special",
    title: L("Особые блюда на гриле", "Specialități la grătar", "Grill specialties"),
    ro: "Specialități la grătar",
    items: [
      { img: "assets/menu/costite-miel.jpg", slug: "costite-de-miel", name: L("Рёбрышки ягнёнка", "Costițe de miel", "Lamb ribs"), ru: L("Каре ягнёнка", "Cotlete de miel", "Rack of lamb"), w: "220 g", p: 385 },
      { img: "assets/menu/pui-gratar.jpg", slug: "pui-la-gratar-cu-legume", name: L("Курица на гриле с овощами", "Pui la grătar cu legume", "Grilled chicken with vegetables"), ru: L("Целый цыплёнок с овощами гриль", "Pui întreg cu legume la grătar", "Whole chicken with grilled vegetables"), w: "650 g", p: 270 },
      { img: "assets/menu/costite-porc.jpg", slug: "costite-de-porc", name: L("Свиные рёбрышки", "Costițe de porc", "Pork ribs"), ru: L("Свиные рёбрышки с хрустящей корочкой", "Costițe de porc cu crustă crocantă", "Crispy pork ribs"), w: "400 g", p: 200 },
      { img: "assets/menu/abhazura.jpg", slug: "abhazura", name: "Abhazura", ru: L("Абхазура — пикантные мясные шарики в жировой сетке", "Abhazura — chiftele picante în prapure", "Abkhazura — spicy meatballs in caul fat"), w: "220 g", p: 160 },
    ],
  },
  {
    id: "mains",
    title: L("Горячие блюда", "Feluri principale", "Main courses"),
    ro: "Feluri principale",
    items: [
      { img: "assets/chakapuli.jpg", name: "Chakapuli", ru: L("Ягнёнок с тархуном и ткемали", "Miel cu tarhon și tkemali", "Lamb with tarragon and tkemali"), w: "300 g", p: 180, link: "chakapuli" },
      {
        img: "assets/menu/odjahuri.jpg", slug: "odjahuri", name: "Odjahuri", ru: L("Оджахури — жаркое «по-домашнему»", "Odjahuri — mâncare „ca acasă”", "Ojakhuri — a homestyle roast"), w: "250 g",
        variants: [
          { v: L("Свинина", "Porc", "Pork"), p: 170 },
          { v: L("Телятина", "Vițel", "Veal"), p: 180 },
          { v: L("Ягнёнок", "Miel", "Lamb"), p: 220 },
          { v: L("Грибы", "Ciuperci", "Mushrooms"), p: 130 },
        ],
      },
      {
        img: "assets/menu/ceashushuli.jpg", slug: "ceashushuli", name: "Ceashushuli", ru: L("Чашушули — острое томлёное мясо", "Ceashushuli — carne înăbușită picantă", "Chashushuli — spicy stewed meat"), w: "250 g",
        variants: [
          { v: L("Телятина", "Vițel", "Veal"), p: 155 },
          { v: L("Ягнёнок", "Miel", "Lamb"), p: 150 },
        ],
      },
      { img: "assets/menu/chakhokhbili.jpg", slug: "chakhokhbili", name: "Chakhokhbili", ru: L("Чахохбили — курица в томатах с зеленью", "Chakhokhbili — pui în roșii cu verdeață", "Chakhokhbili — chicken in tomatoes with herbs"), w: "300 g", p: 150 },
      { img: "assets/menu/tvini.jpg", slug: "tvini", name: "Tvini", ru: L("Твини — мозги, томлённые в масле", "Tvini — creier gătit în unt", "Tvini — brains simmered in butter"), w: "320 g", p: 135 },
    ],
  },
  {
    id: "garnish",
    title: L("Гарниры", "Garnituri", "Side dishes"),
    ro: "Garnituri",
    items: [
      { img: "assets/menu/legume.jpg", slug: "legume-la-gratar", name: L("Овощи на гриле", "Legume la grătar", "Grilled vegetables"), ru: L("Сезонные овощи на открытом огне", "Legume de sezon la foc deschis", "Seasonal vegetables over an open flame"), w: "300 g", p: 150 },
      { img: "assets/menu/gomi.jpg", slug: "gomi", name: "Gomi", ru: L("Гоми — кукурузная каша, символ гостеприимства", "Gomi — terci de porumb, simbol al ospitalității", "Gomi — cornmeal porridge, a symbol of hospitality"), w: "200 g", p: 65 },
      { img: "assets/menu/cartofi-felii.jpg", slug: "felii-de-cartofi-cu-usturoi", name: L("Картофель дольками с чесноком", "Felii de cartofi cu usturoi", "Garlic potato wedges"), ru: L("Дольки картофеля с чесноком и зеленью", "Felii de cartofi cu usturoi și verdeață", "Potato wedges with garlic and herbs"), w: "150 g", p: 55 },
      { img: "assets/menu/cartofi-pai.jpg", slug: "cartofi-pai", name: L("Картофель фри", "Cartofi pai", "French fries"), ru: L("Картофель пай", "Cartofi pai", "Shoestring fries"), w: "150 g", p: 50 },
    ],
  },
  {
    id: "bread",
    title: L("Хлеб и соусы", "Pâine și sosuri", "Bread and sauces"),
    ro: "Pâine și sosuri",
    note: L(
      "Все соусы — 50 г · 25 лей: аджика, сацебели, мацони, ткемали, сметана/кетчуп.",
      "Toate sosurile — 50 g · 25 lei: adjika, satsebeli, matsoni, tkemali, smântână/ketchup.",
      "All sauces — 50 g · 25 lei: adjika, satsebeli, matsoni, tkemali, sour cream/ketchup."
    ),
    items: [
      { name: "Șoti", ru: L("Шоти — хлеб со стен глиняной печи (тандыр)", "Șoti — pâine coaptă pe pereții cuptorului de lut", "Shoti — bread baked on the walls of a clay oven"), w: "100 g", p: 10 },
      { name: "Lavaș", ru: L("Тонкий лаваш для шашлыка", "Lipie subțire pentru frigărui", "Thin flatbread for grilled meat"), w: "20 g", p: 10 },
      { name: "Adjika · Satsebeli · Matsoni · Tkemali", ru: L("Домашние соусы к мясу и хлебу", "Sosuri de casă pentru carne și pâine", "Homemade sauces for meat and bread"), w: "50 g", p: 25 },
    ],
  },
  {
    id: "desserts",
    title: L("Десерты", "Deserturi", "Desserts"),
    ro: "Deserturi",
    items: [
      { img: "assets/menu/napoleon.jpg", slug: "napoleon", name: "Napoleon", ru: L("Многослойный, с нежным ванильным кремом", "Multe straturi, cu cremă fină de vanilie", "Many layers with delicate vanilla cream"), w: "130 g", p: 80 },
      { img: "assets/menu/karakum.jpg", slug: "karakum", name: "Karakum", ru: L("Каракум — шоколад, орехи, вкус детства", "Karakum — ciocolată, nuci, gustul copilăriei", "Karakum — chocolate, nuts, the taste of childhood"), w: "150 g", p: 80 },
      { name: L("Маковый рулет", "Coptură cu mac", "Poppy seed roll"), ru: L("Домашняя выпечка с маковой начинкой", "Prăjitură de casă cu mac", "Homemade poppy-seed cake"), w: "130 g", p: 75 },
      { name: "Înghețată", ru: L("Крафтовое мороженое, сорта в ассортименте", "Înghețată artizanală, sortimente diverse", "Craft ice cream, assorted flavours"), w: "150 g", p: 70 },
      { name: "Matzoni", ru: L("Мацони с мёдом и грецким орехом", "Matsoni cu miere și nuci", "Matsoni with honey and walnuts"), w: "150 g", p: 50 },
    ],
  },
];

/* ── БАР — из барного меню Gamarjoba ── */
const BAR = [
  {
    id: "bar-tea",
    title: L("Чай", "Ceai", "Tea"),
    ro: "Ceai",
    note: L(
      "Авторские чаи — тепло и природные ароматы в каждой чашке.",
      "Ceaiuri de autor — căldură și arome naturale în fiecare cană.",
      "House teas — warmth and natural aromas in every cup."
    ),
    items: [
      { name: "Gamarjoba Tea", ru: L("Секретный сбор горных трав и цветов Сванетии, собранных вручную", "Amestec secret de ierburi și flori de munte din Svaneti, culese manual", "A secret blend of hand-picked Svaneti mountain herbs and flowers"), w: "400 ml", p: 90 },
      { name: "Fresh Berries Tea", ru: L("Витаминный взрыв сочных лесных ягод, кисло-сладкий", "Explozie vitaminizantă de fructe de pădure, dulce-acrișor", "A vitamin burst of forest berries, sweet and tart"), w: "400 ml", p: 90 },
      { name: L("Каркаде с гранатом", "Hibiscus cu rodie", "Hibiscus with pomegranate"), ru: L("Каркаде с гранатом — освежающий, с лёгкой кислинкой", "Hibiscus cu rodie — răcoritor, ușor acrișor", "Hibiscus with pomegranate — refreshing, lightly tart"), w: "400 ml", p: 90 },
      { name: "Winter Tea", ru: L("«Оранжевое золото» зимы: облепиха с пряными специями", "„Aurul portocaliu” al iernii: cătină cu mirodenii", "Winter's “orange gold”: sea buckthorn with warm spices"), w: "400 ml", p: 90 },
      { name: L("Чёрный чай Althaus", "Ceai negru Althaus", "Althaus black tea"), ru: L("Чёрный: Assam · Earl Grey · Mountain Herbs", "Negru: Assam · Earl Grey · Mountain Herbs", "Black: Assam · Earl Grey · Mountain Herbs"), w: "400 ml", p: 60 },
      { name: L("Зелёный чай Althaus", "Ceai verde Althaus", "Althaus green tea"), ru: L("Зелёный: Sencha Senpai · Jasmin Ting Yuan · Milk Oolong", "Verde: Sencha Senpai · Jasmin Ting Yuan · Milk Oolong", "Green: Sencha Senpai · Jasmin Ting Yuan · Milk Oolong"), w: "400 ml", p: 60 },
      { name: L("Травяной чай", "Ceai din plante", "Herbal tea"), ru: L("Травяной: Rooibos Vanilla, без кофеина", "Din plante: Rooibos Vanilla, fără cofeină", "Herbal: Rooibos Vanilla, caffeine-free"), w: "400 ml", p: 60 },
    ],
  },
  {
    id: "bar-coffee",
    title: L("Кофе", "Cafea", "Coffee"),
    ro: "Coffee · Iced Coffee",
    note: L(
      "Свежеобжаренное зерно. Растительное молоко (миндаль/кокос) — +15 лей.",
      "Cafea proaspăt prăjită. Lapte vegetal (migdale/cocos) — +15 lei.",
      "Freshly roasted beans. Plant milk (almond/coconut) — +15 lei."
    ),
    items: [
      { name: "Espresso", w: "30 ml", p: 35 },
      { name: "Doppio", w: "60 ml", p: 45 },
      { name: "Americano", w: "140 ml", p: 45 },
      { name: "Cappuccino", w: "250 ml", p: 45 },
      { name: "Latte", w: "330 ml", p: 50 },
      { name: L("Какао с маршмеллоу", "Cacao cu Marshmallow", "Cocoa with marshmallow"), ru: L("Тёплый сливочный напиток с воздушным маршмэллоу", "Băutură caldă și cremoasă cu bezele pufoase", "A warm creamy drink with fluffy marshmallows"), w: "250 ml", p: 55 },
      { name: "Ice Cappuccino", ru: L("Классика капучино со льдом", "Gustul clasic de cappuccino, cu gheață", "Classic cappuccino over ice"), w: "330 ml", p: 50 },
      { name: "Ice Bumblebee", ru: L("Многослойный микс эспрессо, апельсинового фреша и карамели", "Mix stratificat de espresso, fresh de portocale și caramel", "A layered mix of espresso, fresh orange and caramel"), w: "330 ml", p: 60 },
      { name: "Espresso Tonic", ru: L("Крепкий эспрессо и игристый тоник", "Espresso intens și tonic acidulat", "Bold espresso and sparkling tonic"), w: "330 ml", p: 50 },
    ],
  },
  {
    id: "bar-chacha",
    title: L("Чача", "Chacha", "Chacha"),
    ro: "Chacha Collection",
    items: [
      {
        name: "Chacha Collection",
        ru: L("Домашняя чача — рюмка 50 мл или бутылка 0,5 л", "Chacha de casă — păhărel 50 ml sau sticlă 0,5 l", "House chacha — a 50 ml shot or a 0.5 l bottle"),
        variants: [
          { v: "Muscat · 50 ml", p: 40 }, { v: "Muscat · 0,5 l", p: 360 },
          { v: L("Слива · 50 ml", "Prune · 50 ml", "Plum · 50 ml"), p: 50 }, { v: L("Слива · 0,5 l", "Prune · 0,5 l", "Plum · 0,5 l"), p: 450 },
          { v: L("Черешня · 50 ml", "Cireșe · 50 ml", "Cherry · 50 ml"), p: 50 }, { v: L("Черешня · 0,5 l", "Cireșe · 0,5 l", "Cherry · 0,5 l"), p: 450 },
          { v: L("Перец · 50 ml", "Piper · 50 ml", "Pepper · 50 ml"), p: 50 }, { v: L("Перец · 0,5 l", "Piper · 0,5 l", "Pepper · 0,5 l"), p: 450 },
          { v: L("Айва · 50 ml", "Gutuie · 50 ml", "Quince · 50 ml"), p: 60 }, { v: L("Айва · 0,5 l", "Gutuie · 0,5 l", "Quince · 0,5 l"), p: 540 },
        ],
      },
      { name: L("Сет чачи", "Chacha Set", "Chacha set"), ru: L("Дегустационный сет — 5 рюмок", "Set de degustare — 5 păhărele", "Tasting set — 5 shots"), w: "5 × 50 ml", p: 200 },
    ],
  },
  {
    id: "bar-wine",
    title: L("Вино", "Vin", "Wine"),
    ro: "Vinul casei · Vinuri georgiene",
    note: L(
      "Домашний купаж создан эксклюзивно для Gamarjoba. Вина Грузии — бутылка 750 мл.",
      "Cupajul casei e creat exclusiv pentru Gamarjoba. Vinuri georgiene — sticlă 750 ml.",
      "The house blend is made exclusively for Gamarjoba. Georgian wines — 750 ml bottle."
    ),
    items: [
      {
        name: "Vinul Casei",
        ru: L("Фирменное вино: бокал 150 мл или графин 1 л", "Vinul casei: pahar 150 ml sau carafă 1 l", "House wine: a 150 ml glass or a 1 l carafe"),
        variants: [
          { v: L("Rkatsiteli (белое сухое) · бокал", "Rkatsiteli (alb sec) · pahar", "Rkatsiteli (dry white) · glass"), p: 45 },
          { v: L("Rkatsiteli · графин 1 л", "Rkatsiteli · carafă 1 l", "Rkatsiteli · 1 l carafe"), p: 175 },
          { v: L("Pirosmani (розе сухое) · бокал", "Pirosmani (rose sec) · pahar", "Pirosmani (dry rosé) · glass"), p: 45 },
          { v: L("Pirosmani · графин 1 л", "Pirosmani · carafă 1 l", "Pirosmani · 1 l carafe"), p: 175 },
          { v: L("Saperavi (красное сухое) · бокал", "Saperavi (roșu sec) · pahar", "Saperavi (dry red) · glass"), p: 45 },
          { v: L("Saperavi · графин 1 л", "Saperavi · carafă 1 l", "Saperavi · 1 l carafe"), p: 175 },
          { v: L("Kindzmarauli (красное полусухое) · бокал", "Kindzmarauli (roșu demisec) · pahar", "Kindzmarauli (semi-dry red) · glass"), p: 55 },
          { v: L("Kindzmarauli · графин 1 л", "Kindzmarauli · carafă 1 l", "Kindzmarauli · 1 l carafe"), p: 195 },
        ],
      },
      {
        name: L("Белые вина Грузии", "Vinuri albe georgiene", "Georgian white wines"),
        ru: L("Alb / White · 750 мл", "Alb / White · 750 ml", "White · 750 ml"),
        variants: [
          { v: L("Kakhuri Mtsvane (сухое)", "Kakhuri Mtsvane (sec)", "Kakhuri Mtsvane (dry)"), p: 370 },
          { v: L("Tsinandali (сухое)", "Tsinandali (sec)", "Tsinandali (dry)"), p: 370 },
          { v: L("Tbilisuri (полусухое)", "Tbilisuri (demisec)", "Tbilisuri (semi-dry)"), p: 370 },
          { v: L("Mtsvane (сухое)", "Mtsvane (sec)", "Mtsvane (dry)"), p: 510 },
          { v: L("Tvishi (полусладкое)", "Tvishi (demidulce)", "Tvishi (semi-sweet)"), p: 510 },
        ],
      },
      { name: "Saperavi Rose", ru: L("Розе сухое · 750 мл", "Rose sec · 750 ml", "Dry rosé · 750 ml"), w: "750 ml", p: 370 },
      {
        name: L("Красные вина Грузии", "Vinuri roșii georgiene", "Georgian red wines"),
        ru: L("Roșu / Red · 750 мл", "Roșu / Red · 750 ml", "Red · 750 ml"),
        variants: [
          { v: L("Saperavi (сухое)", "Saperavi (sec)", "Saperavi (dry)"), p: 370 },
          { v: L("Kvareli (сухое)", "Kvareli (sec)", "Kvareli (dry)"), p: 370 },
          { v: L("Kindzmarauli (полусладкое)", "Kindzmarauli (demidulce)", "Kindzmarauli (semi-sweet)"), p: 480 },
          { v: L("Mukuzani (сухое)", "Mukuzani (sec)", "Mukuzani (dry)"), p: 520 },
          { v: L("Khvanchkara (полусладкое)", "Khvanchkara (demidulce)", "Khvanchkara (semi-sweet)"), p: 800 },
        ],
      },
    ],
  },
  {
    id: "bar-cocktails",
    title: L("Коктейли и игристое", "Cocktailuri și spumante", "Cocktails and sparkling"),
    ro: "Cocktails Gamarjoba · Sparkling",
    items: [
      { name: "Chacha Basil Sour", ru: L("Крепость чачи и свежесть базилика с бархатистой текстурой", "Tăria chachei și prospețimea busuiocului, cu textură catifelată", "The strength of chacha and freshness of basil, velvety smooth"), w: "200 ml", p: 90 },
      { name: "Kindzmarauli Spritz", ru: L("Грузинский ответ классике: киндзмараули, апельсин, пузырьки", "Răspunsul georgian la clasic: Kindzmarauli, portocală, bule", "Georgia's answer to the classic: Kindzmarauli, orange, bubbles"), w: "330 ml", p: 90 },
      { name: "Tbilisi Sangria", ru: L("Свежие фрукты и выдержанное красное вино", "Fructe proaspete și vin roșu maturat", "Fresh fruit and aged red wine"), w: "330 ml", p: 90 },
      { name: "Suliko Martini", ru: L("Экзотический микс чачи и гранатового ликёра", "Mix exotic de chacha și lichior de rodie", "An exotic mix of chacha and pomegranate liqueur"), w: "150 ml", p: 90 },
      {
        name: L("Игристые вина", "Vinuri spumante", "Sparkling wines"),
        ru: L("750 мл", "750 ml", "750 ml"),
        variants: [
          { v: "Cricova Crisecco (brut)", p: 320 },
          { v: "Cricova Lacrima Dulce", p: 320 },
          { v: "Serena 1881 Prosecco DOC Treviso", p: 390 },
          { v: "Asti Serena 1881 D.O.C.G.", p: 490 },
          { v: "Cricova Blanc de Noirs", p: 580 },
        ],
      },
    ],
  },
  {
    id: "bar-strong",
    title: L("Крепкие напитки", "Băuturi tari", "Strong drinks"),
    ro: "Băuturi tari · 40 ml",
    items: [
      {
        name: L("Водка", "Vodcă", "Vodka"),
        variants: [
          { v: "Hortitsa Platinum", p: 40 },
          { v: "Absolut", p: 50 },
          { v: "Grey Goose", p: 90 },
        ],
      },
      {
        name: L("Виски", "Whiskey", "Whiskey"),
        variants: [
          { v: "Jameson", p: 60 },
          { v: "Jack Daniel's", p: 60 },
          { v: "Jack Daniel's Honey", p: 60 },
          { v: "Chivas 12 years old", p: 95 },
        ],
      },
      {
        name: L("Ром · Текила · Джин", "Rom · Tequila · Gin", "Rum · Tequila · Gin"),
        variants: [
          { v: "Captain Morgan Spiced Gold/Dark", p: 60 },
          { v: "Jose Cuervo Silver/Reposado", p: 60 },
          { v: "Gordon's London Dry Gin", p: 60 },
        ],
      },
      {
        name: L("Коньяк и дивин", "Cognac & Divin", "Cognac & Divin"),
        variants: [
          { v: L("Cricova 5 лет", "Cricova 5 ani", "Cricova 5 years"), p: 50 },
          { v: L("Cricova 7 лет", "Cricova 7 ani", "Cricova 7 years"), p: 60 },
          { v: L("Bucuria 10 лет", "Bucuria 10 ani", "Bucuria 10 years"), p: 80 },
          { v: "Hennessy VS", p: 140 },
        ],
      },
      { name: "Jagermeister", ru: L("Дижестив", "Digestiv", "Digestif"), w: "40 ml", p: 60 },
    ],
  },
  {
    id: "bar-beer",
    title: L("Пиво", "Bere", "Beer"),
    ro: "Bere la halbă · la sticlă",
    items: [
      {
        name: "Gamarjoba Beer",
        ru: L("Рекомендация дома: лагер с сиропом из граната", "Recomandarea casei: bere lager cu sirop de rodie", "The house special: lager with pomegranate syrup"),
        variants: [
          { v: "330 ml", p: 60 },
          { v: "500 ml", p: 70 },
        ],
      },
      {
        name: L("Разливное", "La halbă (draft)", "On draft"),
        variants: [
          { v: "Efes Pilsener Lager · 500 ml", p: 60 },
          { v: "Hofbrau Original/Weisse · 330 ml", p: 65 },
          { v: "Hofbrau Original/Weisse · 500 ml", p: 85 },
          { v: "Hoegaarden · 330 ml", p: 70 },
          { v: "Hoegaarden · 500 ml", p: 90 },
          { v: "Franziskaner Weissbier · 330 ml", p: 70 },
          { v: "Franziskaner Weissbier · 500 ml", p: 90 },
        ],
      },
      {
        name: L("Бутылочное", "La sticlă", "Bottled"),
        variants: [
          { v: "Corona Extra / N/A · 330 ml", p: 80 },
          { v: "Leffe Blonde / Brune · 330 ml", p: 80 },
          { v: "Hofbrau Original / Weisse · 500 ml", p: 85 },
        ],
      },
    ],
  },
  {
    id: "bar-soft",
    title: L("Лимонады и безалкогольное", "Limonadă și băuturi soft", "Lemonades and soft drinks"),
    ro: "Limonadă · Soft drinks",
    items: [
      {
        name: "Limonadă Georgiană",
        ru: L("Домашние лимонады — натуральная свежесть", "Limonade de casă — prospețime naturală", "Homemade lemonades — natural freshness"),
        variants: [
          { v: L("Kiwi Basil — киви и базилик", "Kiwi Basil — kiwi și busuioc", "Kiwi Basil — kiwi and basil"), p: 70 },
          { v: L("Ruby Georgia — гранат и лесные ягоды", "Ruby Georgia — rodie și fructe de pădure", "Ruby Georgia — pomegranate and forest berries"), p: 70 },
          { v: L("Pear Flower — груша и цветы бузины", "Pear Flower — pară și flori de soc", "Pear Flower — pear and elderflower"), p: 70 },
        ],
      },
      { name: "Zedazeni", ru: L("Грузинский лимонад: тархун, груша, крем-сода, лимон, фейхоа, саперави", "Limonadă georgiană: tarhon, pere, crem-soda, lămâie, feijoa, saperavi", "Georgian lemonade: tarragon, pear, cream soda, lemon, feijoa, saperavi"), w: "500 ml", p: 60 },
      { name: "Compot", ru: L("Домашний компот из отборных фруктов", "Compot de casă din fructe alese", "Homemade fruit compote"), w: "1 l", p: 100 },
      { name: "Mors", ru: L("Морс из лесных ягод", "Mors din fructe de pădure", "Forest berry mors"), w: "1 l", p: 120 },
      {
        name: "Fresh",
        ru: L("Свежевыжатые соки", "Sucuri proaspăt stoarse", "Freshly squeezed juices"),
        variants: [
          { v: L("Апельсин / Грейпфрут · 250 мл", "Portocale / Grapefruit · 250 ml", "Orange / Grapefruit · 250 ml"), p: 70 },
          { v: L("Гранат · 250 мл", "Rodie · 250 ml", "Pomegranate · 250 ml"), p: 120 },
        ],
      },
      { name: "Borjomi", ru: L("Легендарная грузинская минеральная вода", "Legendara apă minerală georgiană", "The legendary Georgian mineral water"), w: "500 ml", p: 75 },
      {
        name: "SNO / KOBI",
        ru: L("Грузинская вода — плоская и минеральная", "Apă georgiană — plată și minerală", "Georgian water — still and mineral"),
        variants: [
          { v: "SNO · 500 ml", p: 50 },
          { v: "SNO · 1 l", p: 80 },
          { v: L("KOBI минеральная · 500 мл", "KOBI minerală · 500 ml", "KOBI mineral · 500 ml"), p: 50 },
        ],
      },
      {
        name: L("Софт-напитки", "Băuturi răcoritoare", "Soft drinks"),
        variants: [
          { v: L("Jaffa (апельсин/мультифрукт/томат/яблоко) · 250 мл", "Jaffa (portocale/multifruct/roșii/mere) · 250 ml", "Jaffa (orange/multifruit/tomato/apple) · 250 ml"), p: 45 },
          { v: "Pepsi / 7UP / Mirinda · 250 ml", p: 40 },
          { v: "Evervess Tonic · 250 ml", p: 40 },
          { v: "Morshynska · 330 ml", p: 40 },
          { v: "Morshynska · 750 ml", p: 70 },
        ],
      },
    ],
  },
];
