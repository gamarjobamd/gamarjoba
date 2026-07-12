/* Gamarjoba — данные о блюдах (трёхъязычно через L(ru, ro, en) из i18n.js).
   ka — название грузинской вязью, одинаково для всех языков. */

const DISHES = [
  {
    id: "adjaruli",
    img: "assets/menu/adjaruli.jpg",
    name: "Adjaruli",
    ka: "აჭარული",
    tagline: L(
      "Хачапури-лодочка с яйцом и маслом",
      "Luntre khachapuri cu ou și unt",
      "Boat-shaped khachapuri with egg and butter"
    ),
    category: L("Хачапури", "Khachapuri", "Khachapuri"),
    weight: "450 g",
    price: "155 MDL",
    allergens: ["яйцо", "лактоза", "глютен"],
    description: L(
      "Лодочка из тёплого теста, доверху наполненная расплавленным сыром, с яичным желтком и кусочком масла в сердце. Перед едой всё перемешивают прямо в лодочке — и едят, отламывая хрустящие борта. Символ Аджарии и, пожалуй, самое узнаваемое блюдо Грузии.",
      "O luntre din aluat cald, plină cu brânză topită, cu gălbenuș de ou și o bucată de unt în mijloc. Înainte de a mânca, totul se amestecă direct în luntre — și se mănâncă rupând marginile crocante. Simbolul Adjariei și, probabil, cel mai recunoscut fel georgian.",
      "A boat of warm dough filled to the brim with molten cheese, an egg yolk and a knob of butter at its heart. Stir it all together right in the boat, then eat by tearing off the crispy edges. The symbol of Adjara and arguably Georgia's most recognisable dish."
    ),
    ritual: L(
      "Смешайте желток, масло и сыр вилкой, пока хачапури горячий. Отламывайте края и макайте — руками, как дома.",
      "Amestecați gălbenușul, untul și brânza cu furculița cât e fierbinte. Rupeți marginile și înmuiați — cu mâinile, ca acasă.",
      "Mix the yolk, butter and cheese with a fork while it's hot. Tear off the edges and dip — with your hands, like at home."
    ),
  },
  {
    id: "mama-hinkali",
    img: "assets/menu/mama-hinkali.jpg",
    name: "Mama Hinkali",
    ka: "დედა ხინკალი",
    tagline: L(
      "Гигантский хинкали на всю компанию",
      "Hinkali gigant pentru toată compania",
      "A giant khinkali for the whole table"
    ),
    category: L("Хинкали", "Hinkali", "Khinkali"),
    weight: "800 g",
    price: "150 MDL",
    allergens: ["глютен"],
    description: L(
      "Гастрономическое шоу: внутри одного гигантского хинкали «Мама» спрятаны пять сочных маленьких хинкали. Его выносят на стол целиком, режут при гостях, и это всегда маленький спектакль. Блюдо-повод: заказывают на компанию, фотографируют, делят по-братски.",
      "Un spectacol gastronomic: în interiorul gigantului „Mama” se ascund cinci hinkali mici și suculenți. Se aduce întreg la masă și se taie în fața oaspeților — mereu un mic spectacol. Se comandă pentru toată compania, se fotografiază, se împarte frățește.",
      "A gastronomic show: hidden inside one giant “Mama” khinkali are five juicy little ones. It arrives whole and is carved at the table — always a little performance. A dish you order for the whole party, photograph, and share."
    ),
    ritual: L(
      "Хинкали держат за «хвостик», надкусывают сбоку и сначала выпивают бульон. Хвостик оставляют на тарелке — так считают, сколько съедено.",
      "Hinkali se ține de „codiță”, se mușcă dintr-o parte și mai întâi se bea zeama. Codițele rămân pe farfurie — așa se numără câte ați mâncat.",
      "Hold a khinkali by its “tail”, bite the side and drink the broth first. Leave the tails on the plate — that's how you count how many you've had."
    ),
  },
  {
    id: "mtsvadi",
    img: "assets/menu/mtsvadi.jpg",
    name: "Mtsvadi Vițel",
    ka: "მწვადი",
    tagline: L("Телятина на живых углях", "Vițel pe cărbuni încinși", "Veal over live coals"),
    category: L("Мангал", "Mangal", "Charcoal grill"),
    weight: "250 g",
    price: "190 MDL",
    allergens: [],
    description: L(
      "Крупные куски телятины, обожжённые на углях до дымной корочки, — без маринадов-заглушек, только мясо, соль и огонь. Подаётся с луком и соусом сацебели. Мцвади — сердце грузинского застолья: пока он жарится, стол уже накрыт и тосты уже звучат.",
      "Bucăți mari de vițel, rumenite pe cărbuni până la o crustă afumată — fără marinate care ascund gustul: doar carne, sare și foc. Se servește cu ceapă și sos satsebeli. Mtsvadi e inima mesei georgiene: cât se frige, masa e deja pusă și toasturile au început.",
      "Large cuts of veal seared over coals to a smoky crust — no masking marinades, just meat, salt and fire. Served with onions and satsebeli sauce. Mtsvadi is the heart of a Georgian feast: while it grills, the table is set and the toasts have begun."
    ),
    ritual: L(
      "Ешьте с тёплым шоти и сацебели. Лук с шампура — не гарнир, а обязательная часть.",
      "Mâncați cu shoti cald și satsebeli. Ceapa de pe frigăruie nu e garnitură — e parte obligatorie.",
      "Eat it with warm shoti bread and satsebeli. The onions from the skewer are not a side — they're essential."
    ),
  },
  {
    id: "shkmeruli",
    img: "assets/menu/shkmeruli.jpg",
    name: "Shkmeruli",
    ka: "შქმერული",
    tagline: L(
      "Цыплёнок в чесночно-сливочном соусе",
      "Pui în sos cremos de usturoi",
      "Chicken in creamy garlic sauce"
    ),
    category: L("Горячие закуски", "Gustări calde", "Hot starters"),
    weight: "350 g",
    price: "170 MDL",
    allergens: ["лактоза"],
    description: L(
      "Румяный цыплёнок, утопленный в кипящем молочно-чесночном соусе, — подаётся в глиняной сковороде кеци, ещё шипящим. Блюдо из горного села Шкмери: простое по составу и оглушительное по вкусу. Соус собирают хлебом до последней капли.",
      "Pui rumen, scufundat în sos fierbinte de lapte și usturoi — servit în tigaia de lut ketsi, încă sfârâind. Un fel din satul de munte Shkmeri: simplu la compoziție, copleșitor la gust. Sosul se adună cu pâine până la ultima picătură.",
      "Golden chicken drowned in a bubbling milk-and-garlic sauce, served still sizzling in a ketsi clay pan. A dish from the mountain village of Shkmeri: simple in its parts, overwhelming in flavour. You mop up the sauce with bread to the last drop."
    ),
    ritual: L(
      "Не спешите: дайте соусу минуту настояться, потом макайте шоти. Хлеба понадобится больше, чем вы думаете.",
      "Nu vă grăbiți: lăsați sosul un minut, apoi înmuiați shoti. Va fi nevoie de mai multă pâine decât credeți.",
      "Don't rush: let the sauce settle for a minute, then dip your shoti. You'll need more bread than you think."
    ),
  },
  {
    id: "badrijani",
    img: "assets/menu/badrijani.jpg",
    name: "Badrijani",
    ka: "ბადრიჯანი",
    tagline: L(
      "Рулетики из баклажана с ореховой пастой",
      "Rulouri de vinete cu pastă de nuci",
      "Aubergine rolls with walnut paste"
    ),
    category: L("Закуски", "Gustări", "Starters"),
    weight: "200 g",
    price: "80 MDL",
    allergens: ["орех"],
    description: L(
      "Тонкие ломтики жареного баклажана, свёрнутые вокруг пасты из грецкого ореха с чесноком и специями, украшенные зёрнами граната. Холодная закуска, с которой начинается почти каждое грузинское застолье, — и по которой узнают хорошую кухню.",
      "Felii subțiri de vinete prăjite, rulate în jurul unei paste de nuci cu usturoi și mirodenii, presărate cu boabe de rodie. Gustarea rece cu care începe aproape orice masă georgiană — și după care se recunoaște o bucătărie bună.",
      "Thin slices of fried aubergine rolled around a paste of walnuts, garlic and spices, studded with pomegranate seeds. The cold starter that opens nearly every Georgian feast — and the one by which a good kitchen is judged."
    ),
    ritual: L(
      "Это первая тарелка на столе супры. Ешьте вилкой в один укус — орех, баклажан и гранат должны встретиться вместе.",
      "E prima farfurie pe masa supra. Mâncați cu furculița, dintr-o mușcătură — nuca, vânăta și rodia trebuie să se întâlnească.",
      "It's the first plate on the supra table. Eat it in one bite — the walnut, aubergine and pomegranate should meet together."
    ),
  },
  {
    id: "chakapuli",
    img: "assets/chakapuli.jpg",
    name: "Chakapuli",
    ka: "ჩაქაფული",
    tagline: L(
      "Ягнёнок, тушённый с тархуном и ткемали",
      "Miel înăbușit cu tarhon și tkemali",
      "Lamb stewed with tarragon and tkemali"
    ),
    category: L("Горячие блюда", "Feluri principale", "Main courses"),
    weight: "300 g",
    price: "210 MDL",
    allergens: [],
    description: L(
      "Молодой ягнёнок, томлённый в белом вине с целыми охапками тархуна, кинзы и зелёной алычи ткемали. Весеннее блюдо Кахетии — кислое, травяное, ни на что не похожее. Его едят ложкой, вылавливая мясо из ароматного зелёного бульона.",
      "Miel tânăr, gătit încet în vin alb cu brațe întregi de tarhon, coriandru și corcodușe verzi tkemali. Felul de primăvară al Kahetiei — acrișor, ierbos, fără seamăn. Se mănâncă cu lingura, pescuind carnea din zeama verde aromată.",
      "Young lamb slow-cooked in white wine with whole armfuls of tarragon, coriander and green tkemali plums. Kakheti's springtime dish — tart, herbal, like nothing else. Eat it with a spoon, fishing the meat out of the fragrant green broth."
    ),
    ritual: L(
      "К чакапули положено белое вино и никакой спешки. Бульон — половина удовольствия, оставьте для него ложку.",
      "La chakapuli se cuvine vin alb și deloc grabă. Zeama e jumătate din plăcere — păstrați o lingură pentru ea.",
      "Chakapuli calls for white wine and no hurry. The broth is half the pleasure — save a spoon for it."
    ),
  },
];

/* Порядок для навигации «следующее блюдо» на странице блюда */
const DISH_ORDER = DISHES.map((d) => d.id);

function getDish(id) {
  return DISHES.find((d) => d.id === id) || null;
}
