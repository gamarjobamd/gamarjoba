/* Gamarjoba — меню кухни. Единственный источник содержимого меню.

   Перенесено из печатного меню символ в символ: названия, граммовки, цены,
   бейджи, сноски и описания. Ничего не нормализуется и не переводится заново.
   Повторы намеренны: SHURPA, ADJARULI и BADRIJANI стоят в нескольких разделах,
   как в макете. Порядок разделов и позиций — печатный, сортировать нельзя.

   Поля позиции
     slug     — ЧПУ /dish/<slug>/; null — страницы нет, карточка не кликается
     name     — название как напечатано, одна строка на все языки
     badge    — плашка-отличие, как напечатана
     img      — фото; null — плейсхолдер
     a        — аллергены в порядке из макета: см. ALLERGENS
     w, p     — граммовка и цена строками: «400g» и «45.00» печатаются как есть
     variants — несколько цен у одной позиции; у варианта свои label / w / p /
                slug / img — фото и страница нужны рыбе на гриле: её ЧПУ жили
                до перехода на печатный макет и сохраняются
     children — подпункты с общей ценой (соусы)
     note     — сноска со звёздочкой
     desc     — описание RO / RU / EN

   Барная карта (BAR) внизу файла не менялась. */

const MENU = [
  {
    id: "chef",
    title: {
      ro: "RECOMANDĂRILE ȘEFULUI",
      ru: "ВЫБОР ШЕФ-ПОВАРА",
      en: "CHEF'S CHOICE",
    },
    items: [
    {
      slug: "shurpa",
      name: "SHURPA",
      badge: "PREMIUM / ОСОБЫЙ ВЫБОР",
      img: "assets/menu/shurpa.jpg",
      w: "400g",
      p: "120",
      desc: {
        ro: "Supă georgiană tradițională cu carne de miel, recunoscută pentru gustul său bogat și revigorant.",
        ru: "Традиционный грузинский суп из мяса ягненка, славящийся своим насыщенным и восстанавливающим вкусом.",
        en: "Traditional Georgian soup with lamb meat, known for its rich and restorative flavor.",
      },
    },
    {
      slug: "adjaruli",
      name: "ADJARULI",
      badge: "LEGENDAR / ЛЕГЕНДА ГРУЗИИ",
      img: "assets/menu/adjaruli.jpg",
      a: ["egg", "lactose", "gluten"],
      w: "450g",
      p: "155",
      desc: {
        ro: "Celebra luntre din Adjaria cu brânză topită și ou. Gustul autentic al Georgiei.",
        ru: "Знаменитая аджарская лодочка с тягучим сыром и яйцом. Легендарный вкус Грузии.",
        en: "The famous Adjarian boat with melted cheese and egg. The legendary taste of Georgia.",
      },
    },
    {
      slug: "badrijani",
      name: "BADRIJANI",
      badge: "CLASSIC / ВЕЧНАЯ КЛАССИКА",
      img: "assets/menu/badrijani.jpg",
      a: ["nuts"],
      w: "200g",
      p: "80",
      desc: {
        ro: "Rulouri de vinete prăjite cu pastă bogată de nuci, condimente georgiene și rodie.",
        ru: "Рулетики из баклажанов с ореховой пастой, грузинскими специями и зернами граната.",
        en: "Fried eggplant rolls with rich walnut paste, Georgian spices, and pomegranate.",
      },
    },
    {
      slug: "mtsvadi",
      name: "MTSVARI VIȚEL",
      badge: "BEST SELLER / ХИТ ПРОДАЖ",
      img: "assets/menu/mtsvadi.jpg",
      w: "250g",
      p: "190",
      desc: {
        ro: "Carne de vițel selectă, marinată cu mirodenii și friptă pe cărbuni până la frăgezime.",
        ru: "Отборная телятина, маринованная со специями и обжаренная на углях до идеальной нежности.",
        en: "Select veal, marinated with spices and charcoal-grilled to perfect tenderness.",
      },
    },
    ],
  },
  {
    id: "sets",
    title: {
      ro: "PLATOURI PENTRU COMPANII",
      ru: "МЯСНЫЕ СЕТЫ ДЛЯ КОМПАНИЙ",
      en: "FAMILY PLATTERS",
    },
    items: [
    {
      slug: "set-din-carne-mix",
      name: "SET DIN CARNE MIX / МЯСНОЙ СЕТ МИКС",
      img: "assets/menu/set-mix.jpg",
      w: "1800 g",
      p: "1350",
      desc: {
        ro: "O selecție generoasă: costiță de miel, liulea de miel și porc-vițel, frigărui de vițel, miel și porc, abhazura și felii de cartofi aurii.",
        ru: "Щедрый выбор: ребрышки ягненка, люля-кебаб из ягненка и свинины-телятины, шашлык из телятины, ягненка и свинины, абхазура и золотистые дольки картофеля.",
        en: "A generous selection: lamb ribs, lamb and pork-veal kebab, veal, lamb, and pork shish kebab, abkhazura, and golden potato wedges.",
      },
    },
    {
      slug: "set-din-carne-de-porc",
      name: "SET DIN CARNE DE PORC / СВИНОЙ СЕТ",
      img: "assets/menu/set-porc.jpg",
      w: "1450g",
      p: "900",
      desc: {
        ro: "Mix savuros: costițe de porc, frigărui, liulea-kebab porc-vițel (clasic și cu cașcaval), abhazura și felii de cartofi.",
        ru: "Вкусный микс: свиные ребрышки, шашлык, люля-кебаб свинина-телятина (классический и с сыром), абхазура и дольки картофеля.",
        en: "Savory mix: pork ribs, shish kebab, pork-veal kebab (classic and with cheese), abkhazura, and potato wedges.",
      },
    },
    {
      slug: "set-din-carne-de-pui",
      name: "SET DIN CARNE DE PUI / КУРИНЫЙ СЕТ",
      img: "assets/menu/set-pui.jpg",
      w: "1600g",
      p: "850",
      desc: {
        ro: "Tot ce e mai bun din pui: aripi, pulpe, șold, liulea cu cașcaval și frigărui de pui. Servit cu legume la grătar și felii de cartofi.",
        ru: "Всё лучшее из курицы: крылышки, голени, бедра, люля-кебаб с сыром и шашлык из курицы. Подается с овощами гриль и дольками картофеля.",
        en: "The best of chicken: wings, drumsticks, thighs, chicken kebab with cheese, and shish kebab. Served with grilled vegetables and potato wedges.",
      },
    },
    {
      slug: "set-din-carne-de-miel",
      name: "SET DIN CARNE DE MIEL / СЕТ ИЗ ЯГНЕНКА",
      img: "assets/menu/set-miel.jpg",
      w: "1150g",
      p: "1400",
      desc: {
        ro: "Festin cu miel: costițe de miel, frigărui, liulea kebab, spate de miel și mușchiuleț de miel. Servit cu felii de cartofi și legume la grătar.",
        ru: "Пир из ягненка: каре ягненка, шашлык, люля-кебаб, спинки молодого ягненка и вырезка ягненка. Подается с дольками картофеля и овощами гриль.",
        en: "Lamb feast: lamb ribs, shish kebab, kebab, lamb saddle, and tenderloin. Served with potato wedges and grilled vegetables.",
      },
    },
    ],
  },
  {
    id: "cold",
    title: {
      ro: "GUSTĂRI RECI",
      ru: "ХОЛОДНЫЕ ЗАКУСКИ",
      en: "COLD STARTERS",
    },
    items: [
    {
      slug: "mokharshuli-ena",
      name: "MOKHARSHULI ENA",
      img: "assets/menu/mokharshuli.jpg",
      w: "200g",
      p: "160",
      desc: {
        ro: "Limbă de vită fragedă, fiartă cu mirodenii, servită cu hrean și muștar.",
        ru: "Нежный отварной говяжий язык со специями, подается с хреном и горчицей.",
        en: "Tender boiled beef tongue with spices, served with horseradish and mustard.",
      },
    },
    {
      slug: "badrijani",
      name: "BADRIJANI",
      img: "assets/menu/badrijani.jpg",
      a: ["nuts"],
      w: "200g",
      p: "80",
      desc: {
        ro: "Rulouri de vinete prăjite cu pastă bogată de nuci, usturoi, condimente georgiene și rodie.",
        ru: "Рулетики из баклажанов с ореховой пастой, чесноком, грузинскими специями и гранатом.",
        en: "Fried eggplant rolls with walnut paste, garlic, Georgian spices, and pomegranate.",
      },
    },
    {
      slug: "bulgaruli",
      name: "BULGARULI",
      img: "assets/menu/bulgaruli.jpg",
      a: ["nuts"],
      w: "250g",
      p: "150",
      desc: {
        ro: "Ardei grași copți, umpluți cu o pastă fină de nuci, usturoi și ierburi aromatice.",
        ru: "Запеченный болгарский перец с пикантной начинкой из грецкого ореха, чеснока и зелени.",
        en: "Roasted bell peppers stuffed with a savory walnut paste, garlic, and aromatic herbs.",
      },
    },
    {
      slug: "mtsnili",
      name: "MTSNILI",
      img: "assets/menu/mtsnili.jpg",
      w: "400g",
      p: "120",
      desc: {
        ro: "Sortiment de murături tradiționale georgiene: roșii verzi, castraveți, usturoi și varză.",
        ru: "Ассорти традиционных солений: зеленые помидоры, огурцы, чеснок и гурийская капуста.",
        en: "Traditional Georgian pickled vegetables: green tomatoes, cucumbers, garlic, and cabbage.",
      },
    },
    {
      slug: "kveli",
      name: "KVELI",
      img: "assets/menu/kveli.jpg",
      a: ["nuts", "lactose"],
      w: "300g",
      p: "220",
      desc: {
        ro: "Selecție de brânzeturi artizanale: Suluguni, Imereti și brânză afumată, servite cu nuci.",
        ru: "Тарелка крафтовых сыров: Сулугуни, Имеретинский и копченый сыр, подается с орехами.",
        en: "Selection of craft cheeses: Suluguni, Imereti, and smoked cheese, served with walnuts.",
      },
    },
    {
      slug: "tevzis-assorti",
      name: "TEVZIS ASSORTI",
      img: "assets/menu/tevzis.jpg",
      a: ["fish"],
      w: "300g",
      p: "230",
      desc: {
        ro: "Un platou rafinat cu pește: somon, pește-baton, file de macrou afumat și ușor sărat, servit cu lămâie.",
        ru: "Изысканное рыбное ассорти: лосось, масляная рыба, филе скумбрии копченое и слабосоленое, подается с лимоном.",
        en: "An exquisite fish platter: salmon, butterfish, smoked and lightly salted mackerel fillet, served with lemon.",
      },
    },
    {
      slug: "khortcis-assorti",
      name: "KHORTCIS ASSORTI",
      img: "assets/menu/khortcis.jpg",
      a: ["gluten"],
      w: "250g",
      p: "190",
      desc: {
        ro: "Platou cu carne: untură de casă, cârnați stafide, pastramă de casă și burtă de porc.",
        ru: "Мясная тарелка: домашнее сало, сырокопченая колбаска, домашняя пастрама и почеревка.",
        en: "Meat plate: homemade lard, dry-cured sausage, homemade pastrami and pork belly.",
      },
    },
    {
      slug: "bostneulis-assorti",
      name: "BOSTNEULIS ASSORTI",
      img: "assets/menu/bostneulis.jpg",
      w: "400g",
      p: "100",
      desc: {
        ro: "Legume proaspete de grădină: roșii, castraveți, ardei gras și multă verdeață.",
        ru: "Свежие садовые овощи: помидоры, огурцы, болгарский перец и много зелени.",
        en: "Fresh garden vegetables: tomatoes, cucumbers, bell peppers and lots of greens.",
      },
    },
    {
      slug: "heringi-kartophilit",
      name: "HERINGI KARTOPHILIT",
      img: "assets/menu/heringi.jpg",
      a: ["fish"],
      w: "250g",
      p: "110",
      desc: {
        ro: "File de hering marinat servit cu cartofi copți aurii, ceapă roșie și lămâie.",
        ru: "Филе маринованной сельди с золотистым запеченным картофелем, красным луком и лимоном.",
        en: "Marinated herring fillet served with golden roasted potatoes, red onion, and lemon.",
      },
    },
    ],
  },
  {
    id: "hot-starters",
    title: {
      ro: "GUSTĂRI CALDE",
      ru: "ГОРЯЧИЕ ЗАКУСКИ",
      en: "HOT STARTERS",
    },
    items: [
    {
      slug: "tsitsila-tabaka",
      name: "TSITSILA TABAKA",
      img: "assets/menu/tsitsila.jpg",
      w: "100g",
      p: "45.00",
      note: "*Цена указана за 100г сырого продукта",
      desc: {
        ro: "Pui fraged pregătit sub presă până la o crustă aurie și crocantă.",
        ru: "Молодой цыпленок, обжаренный под прессом до золотистой хрустящей корочки.",
        en: "Tender young chicken fried under pressure until golden and crispy.",
      },
    },
    {
      slug: "dolma",
      name: "DOLMA",
      img: "assets/menu/dolma.jpg",
      a: ["lactose"],
      w: "300g",
      p: "120.00",
      desc: {
        ro: "Frunze de viță de vie umplute cu carne tocată și orez, servite cu sos fin de usturoi.",
        ru: "Листья винограда, фаршированные мясным фаршем и рисом, подаются с нежным чесночным соусом.",
        en: "Grape leaves stuffed with minced meat and rice, served with a smooth garlic sauce.",
      },
    },
    {
      slug: "soko-ketze",
      name: "SOKO KETZE",
      img: "assets/menu/soko.jpg",
      a: ["lactose"],
      w: "300g",
      p: "120.00",
      desc: {
        ro: "Ciuperci champignon coapte în vas cu brânză Suluguni topită.",
        ru: "Шампиньоны, запеченные в кеци под слоем тягучего сыра сулугуни.",
        en: "Button mushrooms baked in a dish with a thick layer of melted Suluguni cheese.",
      },
    },
    {
      slug: "djigari",
      name: "DJIGARI",
      img: "assets/menu/djigari.jpg",
      w: "300g",
      p: "160",
      desc: {
        ro: "Ficat și inimă de vită trase la tigaie cu vin, ceapă și mirodenii georgiene.",
        ru: "Говяжья печень и сердце, обжаренные с вином, луком и грузинскими специями.",
        en: "Beef liver and heart sautéed with wine, onions, and Georgian spices.",
      },
    },
    {
      slug: "shkmeruli",
      name: "SHKMERULI",
      img: "assets/menu/shkmeruli.jpg",
      a: ["lactose"],
      w: "350g",
      p: "170",
      desc: {
        ro: "Pui fraged în sos cremos de usturoi, servit fierbinte într-un vas de lut.",
        ru: "Сочный цыпленок в насыщенном сливочно-чесночном соусе, подается шкворчащим в кеци.",
        en: "Juicy chicken in a rich creamy garlic sauce, served sizzling in a clay dish.",
      },
    },
    {
      slug: "lobio",
      name: "LOBIO",
      img: "assets/menu/lobio.jpg",
      w: "300g",
      p: "80",
      desc: {
        ro: "Fasole roșie tomleată cu ierburi aromatice și condimente tradiționale.",
        ru: "Красная фасоль, томленая в горшочке с ароматной зеленью и традиционными специями.",
        en: "Red beans stewed in a pot with aromatic herbs and traditional spices.",
      },
    },
    {
      slug: "lobio-cu-nuci",
      name: "LOBIO CU NUCI",
      img: "assets/menu/lobio-nuci.jpg",
      a: ["nuts"],
      w: "300g",
      p: "85",
      desc: {
        ro: "Lobio tradițional pregătit cu adaos de nuci măcinate pentru o textură bogată.",
        ru: "Традиционное лобио, приготовленное с добавлением грецкого ореха для насыщенного вкуса.",
        en: "Traditional lobio prepared with ground walnuts for a rich and hearty texture.",
      },
    },
    {
      slug: "creveti-cu-spanac",
      name: "CREVEȚI CU SPANAC",
      img: "assets/menu/creveti.jpg",
      a: ["crustaceans", "lactose"],
      w: "300g",
      p: "250",
      desc: {
        ro: "Reinterpretare modernă: creveți decorticați în faimosul sos cremos de usturoi.",
        ru: "Современная интерпретация: очищенные креветки в легендарном сливочно-чесночном соусе.",
        en: "A modern twist: peeled shrimps in the legendary creamy garlic sauce.",
      },
    },
    {
      slug: "kucimaci",
      name: "CUCIMACI",
      img: "assets/menu/kucimaci.jpg",
      w: "300g",
      p: "150",
      desc: {
        ro: "Măruntaie de pui călite cu semințe de rodie și mirodenii picante.",
        ru: "Куриные потрошки, обжаренные с зернами граната и пикантными специями.",
        en: "Chicken offal sautéed with pomegranate seeds and spicy seasonings.",
      },
    },
    {
      slug: null, /* зарезервирован «seminte-de-miel»: нет фото, страница не заведена */
      name: "SEMINȚE DE MIEL",
      img: null,
      w: "250g",
      p: "145",
      desc: {
        ro: "Bucățele fragede de costiță de miel, prăjite până la o crustă crocantă și aurie, condimentate cu sare de Svaneti.",
        ru: "Мелкие кусочки нежных ребрышек ягненка, обжаренные до золотистой хрустящей корочки с добавлением сванской соли.",
        en: "Tender small pieces of lamb ribs, fried until golden and crispy, seasoned with traditional Svaneti salt.",
      },
    },
    ],
  },
  {
    id: "salads",
    title: {
      ro: "SALATE",
      ru: "САЛАТЫ",
      en: "SALADS",
    },
    items: [
    {
      slug: "salata-georgiana",
      name: "SALATĂ GEORGIANĂ",
      img: "assets/menu/sal-georgiana.jpg",
      w: "250g",
      p: "75",
      desc: {
        ro: "Prospețime tradițională: roșii, castraveți, ceapă roșie, busuioc și pătrunjel cu unt aromat de casă.",
        ru: "Традиционная свежесть: помидоры, огурцы, красный лук, базилик и петрушка с ароматным домашним маслом.",
        en: "Traditional freshness: tomatoes, cucumbers, red onion, basil and parsley with aromatic homemade butter.",
      },
    },
    {
      slug: "salata-guriana",
      name: "SALATĂ GURIANĂ",
      img: "assets/menu/sal-guriana.jpg",
      a: ["nuts"],
      w: "250g",
      p: "85",
      desc: {
        ro: "Roșii, castraveți și ceapă roșie, completate cu nuci, coriandru proaspăt și un strop de oțet.",
        ru: "Помидоры, огурцы и красный лук с добавлением грецкого ореха, кинзы и винного уксуса.",
        en: "Tomatoes, cucumbers, and red onion with walnuts, fresh cilantro, and a touch of vinegar.",
      },
    },
    {
      slug: "atsatsili-de-vinete",
      name: "ATSATSILI DE VINETE",
      img: "assets/menu/atsatsili.jpg",
      a: ["nuts"],
      w: "250g",
      p: "90",
      desc: {
        ro: "Vinete coapte, ceapă roșie, nuci și usturoi, aromatizate cu coriandru și oțet.",
        ru: "Запеченные баклажаны, красный лук, грецкий орех и чеснок с кинзой и уксусом.",
        en: "Roasted eggplant, red onion, walnuts, and garlic, flavored with cilantro and vinegar.",
      },
    },
    {
      slug: "salata-kahetiana",
      name: "SALATĂ KAHETIANĂ",
      img: "assets/menu/sal-kahetiana.jpg",
      a: ["lactose"],
      w: "250 g",
      p: "100",
      desc: {
        ro: "Un mix bogat de vinete, ardei dulce, roșii cherry, castraveți și ceapă, cu dressing de maioneză și usturoi.",
        ru: "Богатый микс из баклажанов, сладкого перца, черри, огурцов и лука с чесноком, укропом и майонезом.",
        en: "A rich mix of eggplant, bell pepper, cherry tomatoes, cucumbers, and onion with garlic, dill, and mayo.",
      },
    },
    {
      slug: "salata-cu-limba",
      name: "SALATĂ CU LIMBĂ",
      img: "assets/menu/sal-limba.jpg",
      w: "250g",
      p: "170",
      desc: {
        ro: "Limbă de vită fragedă, morcov și castraveți murați, asezonate cu usturoi, mărar și maioneză.",
        ru: "Нежный говяжий язык, морковь и маринованные огурчики с чесноком, укропом и майонезом.",
        en: "Tender beef tongue, carrots, and pickles seasoned with garlic, dill, and mayonnaise.",
      },
    },
    {
      slug: "salata-gamarjoba",
      name: "SALATĂ GAMARJOBA",
      img: "assets/menu/sal-gamarjoba.jpg",
      w: "250g",
      p: "210",
      desc: {
        ro: "Salată caldă cu carne de vițel fragedă, verdețuri mixte și sosul special de autor „Gamarjoba\".",
        ru: "Теплый салат с нежной телятиной, миксом свежей зелени и фирменным соусом «Гамарджоба».",
        en: "Warm salad with tender veal, mixed greens, and the signature \"Gamarjoba\" special sauce.",
      },
    },
    ],
  },
  {
    id: "soups",
    title: {
      ro: "PRIMELE FELURI",
      ru: "ПЕРВЫЕ БЛЮДА",
      en: "FIRST COURSES",
    },
    items: [
    {
      slug: "kharcho",
      name: "KHARCHO",
      img: "assets/menu/kharcho.jpg",
      w: "400g",
      p: "100",
      desc: {
        ro: "Supă consistentă din carne de vită cu orez, verdeață proaspătă și condimente georgiene.",
        ru: "Пряный наваристый суп из телятины с рисом, зеленью и традиционными грузинскими специями.",
        en: "Hearty beef soup with rice, fresh herbs, and traditional Georgian spices.",
      },
    },
    {
      slug: "shurpa",
      name: "SHURPA",
      img: "assets/menu/shurpa.jpg",
      w: "400g",
      p: "120",
      desc: {
        ro: "Supă georgiană tradițională cu carne de miel, recunoscută pentru gustul său bogat și revigorant.",
        ru: "Традиционный грузинский суп из мяса ягненка, славящийся своим насыщенным и восстанавливающим вкусом.",
        en: "Traditional Georgian soup with lamb meat, known for its rich and restorative flavor.",
      },
    },
    {
      slug: "bors-rosu",
      name: "BORȘ ROȘU",
      img: "assets/menu/bors.jpg",
      w: "400g",
      p: "120",
      desc: {
        ro: "Borș roșu clasic pregătit cu varză și carne fragedă de vițel, servit după cele mai bune tradiții.",
        ru: "Классический красный борщ со свежей капустой и нежной телятиной, приготовленный в лучших традициях.",
        en: "Classic red borscht with cabbage and tender veal, prepared according to the best traditions.",
      },
    },
    {
      slug: "solyanka",
      name: "SOLYANKA",
      img: "assets/menu/solyanka.jpg",
      w: "400 g",
      p: "100",
      desc: {
        ro: "Supă densă preparată cu 5 feluri de salam și castraveți murați. Se servește cu smântână, măsline și lămâie.",
        ru: "Густой суп с пятью видами мясных изделий и маринованными огурчиками. Подается со сметаной, маслинами и лимоном.",
        en: "Thick soup made with 5 types of meats and pickles. Served with sour cream, olives, and lemon.",
      },
    },
    {
      slug: "chikhirtma-cu-carne-de-pui",
      name: "CHIKHIRTMA CU CARNE DE PUI",
      img: "assets/menu/chikh-pui.jpg",
      a: ["egg"],
      w: "400g",
      p: "100",
      desc: {
        ro: "Supă albă catifelată cu carne de pui, îmbogățită cu verdețuri aromate și condimente georgiene.",
        ru: "Бархатистый белый куриный суп с добавлением ароматной зелени и грузинских специй.",
        en: "Velvety white chicken soup enriched with aromatic herbs and Georgian spices.",
      },
    },
    {
      slug: "chikhirtma-cu-hinkali",
      name: "CHIKHIRTMA CU HINKALI",
      img: "assets/menu/chikh-hinkali.jpg",
      a: ["egg"],
      w: "400g",
      p: "105",
      desc: {
        ro: "O variantă inedită a supei albe de pui, servită cu hinkali delicioși și ierburi proaspete.",
        ru: "Оригинальная вариация белого куриного супа, подается с аппетитными хинкали и свежей зеленью.",
        en: "A unique version of white chicken soup served with delicious hinkali and fresh herbs.",
      },
    },
    ],
  },
  {
    id: "hinkali",
    title: {
      ro: "HINKALI",
      ru: "ХИНКАЛИ",
      en: "HINKALI",
    },
    items: [
    {
      slug: "mama-hinkali",
      name: "MAMA HINKALI",
      badge: "PREMIUM / ОСОБЫЙ ВЫБОР",
      img: "assets/menu/mama-hinkali.jpg",
      a: ["gluten"],
      w: "800 g",
      p: "150",
      desc: {
        ro: "O experiență spectaculoasă: cinci hinkali suculente ascunse într-una gigantice.",
        ru: "Гастрономическое шоу: пять сочных хинкали, спрятанных внутри одной гигантской «Мамы».",
        en: "A spectacular experience: five juicy hinkali hidden inside one giant \"Mother\" hinkali.",
      },
    },
    {
      slug: "hinkali-cu-cascaval",
      name: "HINKALI CU CAȘCAVAL",
      img: "assets/menu/hinkali-cascaval.jpg",
      a: ["lactose", "gluten"],
      w: "270g",
      variants: [
        { label: "(3 buc)", p: "80" },
        { label: "(la tigaie)", p: "85" },
      ],
      desc: {
        ro: "Hinkali delicate umplute cu un mix bogat de brânzeturi georgiene topite.",
        ru: "Нежные хинкали с обильной начинкой из смеси тягучих грузинских сыров.",
        en: "Delicate hinkali filled with a rich mix of melted Georgian cheeses.",
      },
    },
    {
      slug: "hinkali-mixt-porc-vita",
      name: "HINKALI MIXT PORC-VITĂ",
      img: "assets/menu/hinkali-mixt.jpg",
      a: ["gluten"],
      w: "270g",
      variants: [
        { label: "(3 buc)", p: "80" },
        { label: "(la tigaie)", p: "85" },
      ],
      desc: {
        ro: "Rețeta clasică cu carne tocată de porc și vită, condimente montane și mult suculent.",
        ru: "Классический рецепт с фаршем из свинины и телятины, горными травами и обилием горячего бульона.",
        en: "Classic recipe with minced pork and beef, mountain spices, and plenty of broth.",
      },
    },
    {
      slug: "hinkali-cu-carne-de-vita",
      name: "HINKALI CU CARNE DE VITĂ",
      img: "assets/menu/hinkali-vita.jpg",
      a: ["gluten"],
      w: "270g",
      variants: [
        { label: "(3 buc)", p: "80" },
        { label: "(la tigaie)", p: "85" },
      ],
      desc: {
        ro: "Hinkali tradiționale umplute cu carne de vită tocată și condimente georgiene selecte.",
        ru: "Традиционные хинкали с телятиной и отборными грузинскими специями.",
        en: "Traditional hinkali filled exclusively with minced beef and select Georgian spices.",
      },
    },
    {
      slug: "hinkali-cu-carne-de-miel",
      name: "HINKALI CU CARNE DE MIEL",
      img: "assets/menu/hinkali-miel.jpg",
      a: ["gluten"],
      w: "270g",
      variants: [
        { label: "(3 buc)", p: "80" },
        { label: "(la tigaie)", p: "85" },
      ],
      desc: {
        ro: "Gust intens și autentic de carne de miel, completat de coriandru și ierburi aromatice.",
        ru: "Насыщенный аутентичный вкус ягненка, дополненный кинзой и ароматными кавказскими травами.",
        en: "Intense and authentic lamb flavor, complemented by cilantro and aromatic herbs.",
      },
    },
    ],
  },
  {
    id: "khachapuri",
    title: {
      ro: "HACEAPURI",
      ru: "ХАЧАПУРИ",
      en: "KHACHAPURI",
    },
    items: [
    {
      slug: "adjaruli",
      name: "ADJARULI",
      badge: "LEGENDAR / ЛЕГЕНДА ГРУЗИИ",
      img: "assets/menu/adjaruli.jpg",
      a: ["egg", "lactose", "gluten"],
      variants: [
        { label: null, w: "450g", p: "155" },
        { label: null, w: "1700g", p: "680" },
      ],
      desc: {
        ro: "Celebra luntre din Adjaria cu brânză topită și ou. Gustul autentic al Georgiei.",
        ru: "Знаменитая аджарская лодочка с тягучим сыром и яйцом. Легендарный вкус Грузии.",
        en: "The famous Adjarian boat with melted cheese and egg. The legendary taste of Georgia.",
      },
    },
    {
      slug: "megruli",
      name: "MEGRULI",
      img: "assets/menu/megruli.jpg",
      a: ["egg", "lactose", "gluten"],
      variants: [
        { label: null, w: "450g", p: "175" },
        { label: null, w: "750g", p: "250" },
      ],
      desc: {
        ro: "Plăcintă tradițională cu brânză în interior și un strat generos de brânză rumenită deasupra.",
        ru: "Традиционная лепешка с сыром внутри и дополнительным слоем запеченного сыра сверху.",
        en: "Traditional flatbread with cheese inside and a generous layer of browned cheese on top.",
      },
    },
    {
      slug: "kubdari",
      name: "KUBDARI",
      img: "assets/menu/kubdari.jpg",
      a: ["gluten"],
      w: "550g",
      p: "230",
      desc: {
        ro: "Specialitate muntoasă din Svaneti, umplută cu carne tocată mărunt și condimente specifice.",
        ru: "Гордость Сванетии — лепешка с мелко рубленным мясом и особым набором сванских специй.",
        en: "Svanetian mountain specialty, filled with finely chopped meat and specific regional spices.",
      },
    },
    {
      slug: "penovani",
      name: "PENOVANI",
      img: "assets/menu/penovani.jpg",
      a: ["lactose", "gluten"],
      w: "300 g",
      p: "140",
      desc: {
        ro: "Haceapuri din aluat foietaj crocant, umplut cu brânză Suluguni fierbinte.",
        ru: "Хрустящее слоеное хачапури с начинкой из горячего сыра сулугуни.",
        en: "Crispy puff pastry khachapuri filled with hot Suluguni cheese.",
      },
    },
    {
      slug: "regal",
      name: "REGAL",
      img: "assets/menu/regal.jpg",
      a: ["lactose", "gluten"],
      w: "650g",
      p: "240",
      desc: {
        ro: "O creație regală cu o cantitate dublă de brânză și ingrediente premium pentru un gust desăvârșit.",
        ru: "Королевское хачапури с двойной порцией сыра и премиальными ингредиентами.",
        en: "A royal creation with double cheese and premium ingredients for a perfect taste.",
      },
    },
    {
      slug: "imeruli",
      name: "IMERULI",
      img: "assets/menu/imeruli.jpg",
      a: ["lactose", "gluten"],
      w: "650g",
      p: "225",
      desc: {
        ro: "Haceapuri clasic rotund din regiunea Imereti, cu umplutură bogată de brânză tânără.",
        ru: "Классическое круглое хачапури из Имеретии с обильной начинкой из молодого сыра.",
        en: "Classic round khachapuri from the Imereti region with a rich young cheese filling.",
      },
    },
    {
      slug: "adjaruli-cu-ceashushuli",
      name: "ADJARULI CU CEASHUSHULI DIN VIȚEL / MIEL",
      img: "assets/menu/adjaruli-ceashushuli.jpg",
      a: ["lactose", "gluten", "egg"],
      w: "550g",
      p: "200",
      desc: {
        ro: "O luntre inedită umplută cu tocană picantă de vițel sau miel în loc de ou.",
        ru: "Оригинальная лодочка, наполненная пряным чашушули из телятины или ягненка вместо яйца.",
        en: "A unique boat filled with spicy veal or lamb stew instead of an egg.",
      },
    },
    {
      slug: "phlovani",
      name: "PHLOVANI",
      img: "assets/menu/phlovani.jpg",
      a: ["gluten"],
      w: "400 g",
      p: "190",
      desc: {
        ro: "Plăcintă tradițională cu umplutură sănătoasă de spanac proaspăt și brânză.",
        ru: "Традиционная лепешка с полезной начинкой из свежего шпината и сыра.",
        en: "Traditional flatbread with a healthy filling of fresh spinach and cheese.",
      },
    },
    ],
  },
  {
    id: "mangal",
    title: {
      ro: "MANGAL",
      ru: "МАНГАЛ",
      en: "CHARCOAL GRILL",
    },
    items: [
    {
      slug: "mtsvadi",
      name: "MTSVADI",
      img: "assets/menu/mtsvadi.jpg",
      w: "250g",
      variants: [
        { label: "PUI (Chicken / курица)", p: "140" },
        { label: "PORC (Pork / свинина)", p: "185" },
        { label: "VIȚEL (Veal / телятина)", p: "190" },
        { label: "MIEL (Lamb / ягненок)", p: "195" },
      ],
      desc: {
        ro: "Carne fragedă marinată după rețete vechi și friptă la cărbuni.",
        ru: "Нежное мясо, маринованное по старинным рецептам и обжаренное на углях.",
        en: "Tender meat marinated with traditional recipes and charcoal-grilled.",
      },
    },
    {
      slug: "liulea-kebab",
      name: "LIULEA-KEBAB",
      img: "assets/menu/liulea.jpg",
      a: ["lactose"],
      variants: [
        { label: "PUI (Chicken / курица)", w: "250g", p: "140" },
        { label: "PUI CU CAȘCAVAL (Chicken with cheese / Курица с сыром)", w: "300g", p: "170" },
        { label: "MIX PORC-VIȚEL (pork-veal / Свинина-телятина)", w: "250g", p: "165" },
        { label: "MIX PORC-VIȚEL CU CAȘCAVAL (pork-veal with cheese / Свинина-телятина с сыром)", w: "300g", p: "185" },
        { label: "MIEL (Lamb / ягненок)", w: "250g", p: "185" },
        { label: "LIULEA-KEBAB BY CHEF", w: "400g", p: "210" },
      ],
      desc: {
        ro: "Carne tocată fin cu ierburi aromatice, modelată pe sabie și friptă la foc deschis.",
        ru: "Рубленое мясо с ароматными травами, приготовленное на шампуре над открытым огнем.",
        en: "Savory minced meat with aromatic herbs, skewered and flame-grilled to perfection.",
      },
    },
    {
      slug: null, /* зарезервирован «peste-la-gratar»: нет фото, страница не заведена */
      name: "PEȘTE LA GRĂTAR",
      img: null,
      a: ["fish"],
      variants: [
        { label: "PĂSTRĂV (Trout / Форель)", w: "250/60g", p: "225", slug: "pastrav", img: "assets/menu/pastrav.jpg" },
        { label: "STEAK SOMON (Salmon steak / Стейк из семги)", w: "150/60g", p: "240", slug: "steak-somon", img: "assets/menu/somon.jpg" },
        { label: "DORADA (Dorada / Дорада)", w: "330/60g", p: "320", slug: "dorada", img: "assets/menu/dorada.jpg" },
        { label: "STEAK STURION (Sturgeon steak / Стейк из осетра)", w: "250/60g", p: "340", slug: "steak-sturion", img: "assets/menu/sturion.jpg" },
      ],
      desc: {
        ro: "Pește nobil pregătit la grătar, servit cu lămâie și sosul nostru special.",
        ru: "Благородная рыба на гриле, подается с лимоном и фирменным соусом.",
        en: "Premium fish grilled to perfection, served with lemon and our signature sauce.",
      },
    },
    ],
  },
  {
    id: "grill-special",
    title: {
      ro: "SPECIALITĂȚI LA GRĂTAR",
      ru: "ОСОБЫЕ БЛЮДА НА ГРИЛЕ",
      en: "GRILL SPECIALTIES",
    },
    items: [
    {
      slug: "abhazura",
      name: "ABHAZURA",
      img: "assets/menu/abhazura.jpg",
      w: "220g",
      p: "160",
      desc: {
        ro: "Chiftelute picante învelite în prapure, o delicatesă tradițională din regiunea Abhazia.",
        ru: "Пикантные мясные шарики в жировой сетке — традиционный деликатес из Абхазии.",
        en: "Spicy meatballs wrapped in caul fat, a traditional delicacy from the Abkhazia region.",
      },
    },
    {
      slug: "costite-de-porc",
      name: "COSTIȚE DE PORC (Pork ribs / Свиные ребрышки)",
      img: "assets/menu/costite-porc.jpg",
      w: "400g",
      p: "225",
      desc: {
        ro: "Costițe suculente cu crustă crocantă, pline de savoare și aromă de fum.",
        ru: "Сочные ребрышки с хрустящей корочкой, пропитанные ароматом дымка.",
        en: "Juicy ribs with a crispy crust, packed with flavor and a smoky aroma.",
      },
    },
    {
      slug: "costite-de-miel",
      name: "COSTIȚE DE MIEL (Square of lamb / Каре ягненка)",
      img: "assets/menu/costite-miel.jpg",
      w: "220g",
      p: "385",
    },
    {
      slug: "pui-la-gratar-cu-legume",
      name: "PUI LA GRĂTAR CU LEGUME",
      img: "assets/menu/pui-gratar.jpg",
      w: "650g",
      p: "350",
      desc: {
        ro: "Pui întreg rumenit la foc, însoțit de un mix de legume coapte la grătar.",
        ru: "Целый цыпленок с золотистой корочкой в дуэте с сочными овощами гриль.",
        en: "Whole golden-brown grilled chicken served with a mix of fire-roasted vegetables.",
      },
    },
    ],
  },
  {
    id: "mains",
    title: {
      ro: "FELURI PRINCIPALE",
      ru: "ГОРЯЧИЕ БЛЮДА",
      en: "MAIN COURSES",
    },
    items: [
    {
      slug: "tvini",
      name: "TVINI",
      img: "assets/menu/tvini.jpg",
      w: "300g",
      p: "145",
      desc: {
        ro: "Delicatețe din creier de vițel, pregătită la tigaie cu unt și ierburi aromatice.",
        ru: "Деликатес из телячьих мозгов, томленый на сковороде со сливочным маслом и пряными травами.",
        en: "Delicate veal brain sautéed in butter with aromatic herbs.",
      },
    },
    {
      slug: "odjahuri",
      name: "ODJAHURI",
      img: "assets/menu/odjahuri.jpg",
      w: "250g",
      variants: [
        { label: "PORC (Свинина)", p: "170" },
        { label: "VIȚEL (Телятина)", p: "190" },
        { label: "MIEL (Ягненок)", p: "210" },
        { label: "CIUPERCI (Грибы)", p: "130" },
      ],
      desc: {
        ro: "Un fel de mâncare „de familie\", cu carne sau ciuperci și cartofi prăjiți, ceapă și condimente georgiene.",
        ru: "«Домашнее» блюдо из мяса или грибов, обжаренное с картофелем, луком и грузинскими специями.",
        en: "A \"family-style\" dish of meat or mushrooms fried with potatoes, onions, and Georgian spices.",
      },
    },
    {
      slug: "ceashushuli",
      name: "CEASHUSHULI",
      img: "assets/menu/ceashushuli.jpg",
      w: "250g",
      variants: [
        { label: "VIȚEL (Veal / Телятина)", p: "165" },
        { label: "MIEL (Lamb / Ягненок)", p: "180" },
      ],
      desc: {
        ro: "Carne fragedă tomleată într-un sos dens de roșii cu ardei dulce, usturoi și verdeață.",
        ru: "Нежное мясо, томленое в густом томатном соусе с болгарским перцем, чесноком и зеленью.",
        en: "Tender meat stewed in a rich tomato sauce with bell peppers, garlic, and herbs.",
      },
    },
    {
      slug: "chakapuli",
      name: "CHAKAPULI",
      img: "assets/chakapuli.jpg",
      w: "300g",
      p: "210",
      desc: {
        ro: "Tocană aromată din carne de miel, gătită cu vin alb, tarhon din abundență și prune verzi (tkemali).",
        ru: "Ароматное рагу из мяса ягненка, томленое в белом вине с обилием тархуна и зеленой алычой.",
        en: "Fragrant lamb stew slow-cooked in white wine with plenty of tarragon and green sour plums.",
      },
    },
    {
      slug: "chakhokhbili",
      name: "CHAKHOKHBILI",
      img: "assets/menu/chakhokhbili.jpg",
      w: "300g",
      p: "150",
      desc: {
        ro: "Bucăți de pui înăbușite într-un sos bogat de roșii cu ceapă, busuioc și mirodenii georgiene.",
        ru: "Кусочки курицы, тушенные в насыщенном соусе из помидоров с луком, базиликом и грузинскими специями.",
        en: "Chicken pieces simmered in a rich tomato sauce with onions, basil, and Georgian spices.",
      },
    },
    ],
  },
  {
    id: "garnish",
    title: {
      ro: "GARNITURI",
      ru: "ГАРНИРЫ",
      en: "SIDE DISHES",
    },
    items: [
    {
      slug: "gomi",
      name: "GOMI",
      img: "assets/menu/gomi.jpg",
      w: "200g",
      p: "65",
      desc: {
        ro: "Terci tradițional din mălai fin, cremos și sățios, simbolul ospitalității georgiene.",
        ru: "Традиционная каша из кукурузной муки крупного и мелкого помола — нежная, густая и очень сытная.",
        en: "Traditional Georgian cornmeal mash, smooth and hearty — a true staple of hospitality.",
      },
    },
    {
      slug: "legume-la-gratar",
      name: "LEGUME LA GRĂTAR",
      img: "assets/menu/legume.jpg",
      w: "300g",
      p: "150",
      desc: {
        ro: "Mix de legume de sezon (ardei, dovlecei, vinete, ciuperci) rumenite la foc deschis.",
        ru: "Микс сезонных овощей (перец, кабачки, баклажаны, грибы), запеченных на открытом огне с ароматом дымка.",
        en: "Seasonal vegetable mix (bell peppers, zucchini, eggplant, mushrooms) charred to perfection over an open flame.",
      },
    },
    {
      slug: "felii-de-cartofi-cu-usturoi",
      name: "FELII DE CARTOFI CU USTUROI",
      img: "assets/menu/cartofi-felii.jpg",
      w: "150g",
      p: "55",
      desc: {
        ro: "Cartofi aurii tăiați felii, trași la tigaie cu usturoi proaspăt și verdeață aromată.",
        ru: "Золотистые дольки картофеля, обжаренные с пикантным чесноком и свежей зеленью.",
        en: "Golden potato wedges sautéed with fresh garlic and aromatic herbs.",
      },
    },
    {
      slug: "cartofi-pai",
      name: "CARTOFI PAI",
      img: "assets/menu/cartofi-pai.jpg",
      w: "150g",
      p: "50",
      desc: {
        ro: "Cartofi crocanți tăiați pai, prăjiți până la o crustă perfectă, serviți cu sare.",
        ru: "Хрустящий картофель, нарезанный соломкой и обжаренный до золотистой корочки.",
        en: "Crispy French fries deep-fried to a golden crunch, lightly salted.",
      },
    },
    ],
  },
  {
    id: "bread",
    title: {
      ro: "PÂINE ȘI SOSURI",
      ru: "ХЛЕБ И СОУСЫ",
      en: "BREAD AND SAUCES",
    },
    items: [
    {
      slug: null, /* зарезервирован «soti»: нет фото, страница не заведена */
      name: "ȘOTI",
      img: null,
      w: "100g",
      p: "10",
      desc: {
        ro: "Pâine tradițională georgiană, coaptă pe pereții cuptorului de lut (tandîr).",
        ru: "Традиционный грузинский хлеб, испеченный на стенках глиняной печи (тандыр).",
        en: "Traditional Georgian bread baked on the walls of a clay oven (tandoor).",
      },
    },
    {
      slug: null, /* зарезервирован «lavas»: нет фото, страница не заведена */
      name: "LAVAȘ",
      img: null,
      w: "20g",
      p: "10",
      desc: {
        ro: "Lipie subțire, dospită fin, ideală pentru a rula carnea de pe grătar.",
        ru: "Тонкий бездрожжевой лаваш, идеально подходящий к сочному шашлыку.",
        en: "Thin flatbread, perfect for wrapping grilled meats.",
      },
    },
    {
      slug: null, /* зарезервирован «sosuri»: нет фото, страница не заведена */
      name: "SOSURI / СОУСЫ / SAUCES",
      img: null,
      w: "50g",
      p: "25",
      children: [
        {
          name: "ADJICA",
          desc: {
            ro: "Pastă picantă cu ardei și usturoi.",
            ru: "Острая паста с перцем и чесноком.",
            en: "Spicy chili and garlic paste.",
          },
        },
        {
          name: "SAȚEBELI",
          desc: {
            ro: "Sos de roșii cu ierburi și condimente.",
            ru: "Томатный соус со специями и кинзой.",
            en: "Tomato sauce with herbs and spices.",
          },
        },
        {
          name: "MAȚONI",
          desc: {
            ro: "Sos de iaurt tradițional cu usturoi.",
            ru: "Кисломолочный соус с чесноком.",
            en: "Traditional yogurt sauce with garlic.",
          },
        },
        {
          name: "TKEMALI",
          desc: {
            ro: "Sos de prune verzi cu note acrișoare.",
            ru: "Пикантный соус из зеленой алычи.",
            en: "Sour green plum sauce.",
          },
        },
        {
          name: "SMÂNTÂNĂ / KETCHUP",
          desc: {
            ro: "Smântână proaspătă / Ketchup.",
            ru: "Сметана / Кетчуп.",
            en: "Sour cream / Ketchup.",
          },
        },
      ],
    },
    ],
  },
  {
    id: "desserts",
    title: {
      ro: "DESERTURI",
      ru: "ДЕСЕРТЫ",
      en: "DESSERTS",
    },
    items: [
    {
      slug: "napoleon",
      name: "NAPOLEON",
      img: "assets/menu/napoleon.jpg",
      a: ["egg", "lactose", "gluten"],
      w: "130g",
      p: "80",
      desc: {
        ro: "Desert clasic cu multe straturi fine de foietaj și cremă fină de vanilie.",
        ru: "Классический многослойный десерт из хрустящего слоеного теста с нежным ванильным кремом.",
        en: "Classic multi-layered puff pastry dessert with smooth vanilla custard.",
      },
    },
    {
      slug: null, /* зарезервирован «coptura-cu-mac»: нет фото, страница не заведена */
      name: "COPTURĂ CU MAC",
      img: null,
      a: ["gluten"],
      w: "130g",
      p: "75",
      desc: {
        ro: "Prăjitură de casă bogată în mac, pregătită după o rețetă tradițională caldă.",
        ru: "Домашняя выпечка с обильной маковой начинкой, приготовленная по традиционному рецепту.",
        en: "Homemade poppy seed cake prepared according to a warm traditional recipe.",
      },
    },
    {
      slug: "karakum",
      name: "KARAKUM",
      img: "assets/menu/karakum.jpg",
      a: ["nuts"],
      w: "150g",
      p: "80",
      desc: {
        ro: "Un desert crocant cu ciocolată și nuci, inspirat din gusturile copilăriei.",
        ru: "Хрустящий десерт с шоколадом и орехами, вдохновленный вкусами детства.",
        en: "A crunchy chocolate and nut dessert inspired by childhood flavors.",
      },
    },
    {
      slug: null, /* зарезервирован «matzoni»: нет фото, страница не заведена */
      name: "MATZONI",
      img: null,
      a: ["lactose"],
      w: "150g",
      p: "50",
      desc: {
        ro: "Iaurt tradițional georgian, sănătos și răcoritor, servit adesea cu miere și nuci.",
        ru: "Традиционный грузинский йогурт, полезный и освежающий, подается с клубникой.",
        en: "Traditional Georgian yogurt, healthy and refreshing, often served with honey and walnuts.",
      },
    },
    {
      slug: null, /* зарезервирован «inghetata»: нет фото, страница не заведена */
      name: "ÎNGHEȚATĂ",
      img: null,
      a: ["lactose"],
      w: "150g",
      p: "70",
      desc: {
        ro: "Diverse sortimente de înghețată artizanală pentru un final răcoros de masă.",
        ru: "Ассорти из различных сортов крафтового мороженого для прохладного завершения трапезы.",
        en: "Assorted craft ice cream flavors for a refreshing end to the meal.",
      },
    },
    ],
  },
];

/* Аллергены — шесть значков со страницы-легенды печатного меню */
const ALLERGENS = [
  { key: "egg", ro: "OUĂ", ru: "Яйцо", en: "Egg" },
  { key: "lactose", ro: "LACTOZĂ", ru: "Лактоза", en: "Lactose" },
  { key: "gluten", ro: "GLUTEN", ru: "Глютен", en: "Gluten" },
  { key: "nuts", ro: "NUCI", ru: "Орех", en: "Nut" },
  { key: "fish", ro: "PEȘTE", ru: "Рыба", en: "Fish" },
  { key: "crustaceans", ro: "CRUSTACEE", ru: "Ракообразные", en: "Crustaceans" },
];

/* Предупреждение об аллергенах — со страницы-легенды */
const MENU_NOTICE = {
  ro: "Vă rugăm să informați chelnerul dacă sunteți alergic la orice alimente. Toate prețurile sunt indicate în lei.",
  ru: "Пожалуйста, сообщите официанту, если у вас есть аллергия на какие-либо продукты. Все цены указаны в леях.",
  en: "Please inform your waiter if you have any allergies to food. All prices are listed in lei.",
};

/* Завершающий блок меню */
const MENU_CLOSING = {
  ro: "Oaspetul este un dar de la Dumnezeu",
  ru: "Гость — это подарок от Бога",
  en: "A guest is a gift from God",
};

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
