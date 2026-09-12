/* Gamarjoba — страница полного меню.

   Кухня — страницы бумажного меню картинками: они лежат в menu.html
   статически (tools/build-menu-pages.mjs), сама картинка не меняется.
   Поверх неё скрипт раскладывает прозрачные области по координатам из
   js/menu-hotspots.js: тап по блюду кладёт его в корзину.

   Барная карта не менялась: карточки рисует menu-template.js. */

const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let activeGroup = location.hash === "#bar" ? "bar" : "kitchen";

/* карточная разметка бара */
const TPL = createMenuTemplate({
  lang: LANG,
  langs: I18N_LANGS,
  ui: UI,
  allergens: ALLERGENS,
});

const navEl = document.getElementById("menuNav");
const pagesEl = document.getElementById("menuPages");
const sectionsEl = document.getElementById("menuSections");
const hintEl = document.querySelector(".menu-hint");
let io, sectionIO;

/* ── Переключение кухня / бар ──
   Кухня уже в разметке — её только показываем. Бар рисуем при первом
   переходе и оставляем в DOM: возврат на вкладку не должен ничего ждать. */
let barRendered = false;

function showGroup(group) {
  activeGroup = group;
  const isBar = group === "bar";

  document.querySelectorAll(".menu-tabs button").forEach((b) =>
    b.classList.toggle("is-active", b.dataset.group === group)
  );

  if (isBar && !barRendered) {
    navEl.innerHTML = TPL.renderNav(BAR, true);
    sectionsEl.innerHTML = TPL.renderSections(BAR, true);
    barRendered = true;
  }

  pagesEl.hidden = isBar;
  sectionsEl.hidden = !isBar;
  navEl.hidden = !isBar;
  /* подсказка про тап по блюду — про страницы кухни; у бара свои карточки */
  if (hintEl) hintEl.hidden = isBar;

  if (isBar) wireObservers();
}

/* ── Области заказа поверх страниц меню ──
   Координаты из menu-hotspots.js задают прозрачную кнопку на месте блюда:
   тап кладёт его в корзину. Ничего постоянного поверх страницы не рисуется —
   подсветка только под курсором, вспышка на тап и одно короткое проступание
   всех областей при первом заходе, чтобы гость понял, что тут можно нажимать. */
const HINT_KEY = "gamarjoba-menu-hinted";
/* Размеры кнопок в процентах листа — те же, что в CSS. Высота считается
   из пропорции страницы: лист печатного меню 1600 × 2015. */
const BADGE = 6.4;
const BADGE_TIGHT = 2.5;
const PAGE_RATIO = 1600 / 2015;

/* ── Куда поставить кнопку ──
   Правило одно: кнопка стоит у цены своего блюда — под правым нижним углом
   блока, а у строки варианта сразу за её ценой. Дальше идут запасные точки:
   скрипт берёт первую, где кнопка никому не мешает. Проверяется три вещи —
   не вышла ли за край листа, не легла ли на блок другого блюда и не
   столкнулась ли с уже поставленной кнопкой. */
function badgeSpots(spot) {
  const d = spot.v != null ? BADGE_TIGHT : BADGE;
  const dy = d * PAGE_RATIO;
  const right = spot.l + spot.w;
  const bottom = spot.t + spot.h;

  if (spot.v != null) {
    /* Строка варианта: вплотную за колонкой цен, дальше — правее и ещё
       правее. По вертикали держимся последней строки области: у первой
       строки блока над ценой ещё заголовок с описанием, и середина области
       пришлась бы на текст, а не на цену. */
    /* отступ от цены — постоянный, не зависит от размера кнопки: тогда все
       строки одного блюда встают ровно в одну линию */
    const x = (spot.ax != null ? spot.ax : right) + 1.7;
    /* Где в области её цена: у первой строки блока над ценой ещё заголовок
       с описанием, значит цена внизу. У остальных строка цены сверху —
       последняя в списке дотянута вниз до свободного места. */
    const y = spot.h > 6 ? bottom - 1 : spot.t + 1.1;
    /* основная точка — сразу за ценой; запасные уходят правее или чуть
       выше, но нужны редко: в один столбец кнопки помещаются сами */
    return [
      [0, 0], [1.2, 0], [2.4, 0], [0, -1.3], [1.2, -1.3], [-1.6, 0],
    ].map(([k, shift]) => ({ x: x + d * k, y: y + shift, d, dy }));
  }
  /* блюдо с одной ценой: под углом блока, потом левее по нижнему краю,
     потом сбоку от угла */
  return [
    { x: right - d * 0.2, y: bottom + dy * 0.6, d, dy },
    { x: right - d * 1.4, y: bottom + dy * 0.6, d, dy },
    { x: right - d * 2.6, y: bottom + dy * 0.6, d, dy },
    { x: right + d * 0.7, y: bottom - dy * 0.1, d, dy },
    { x: right + d * 0.7, y: bottom - dy * 1.1, d, dy },
    { x: right - d * 0.2, y: bottom - dy * 0.7, d, dy },
  ];
}

const sameDish = (a, b) => a.sec === b.sec && a.name === b.name;

function placeBadges(spots, placed) {
  const taken = [];
  placed.forEach(({ spot, btn }) => {
    const options = badgeSpots(spot);
    /* волосок пересечения — не помеха: иначе кнопка прыгает на запасную
       точку из-за десятой доли процента */
    const EPS = 0.3;
    const fits = (o) => {
      const box = {
        l: o.x - o.d / 2 + EPS, r: o.x + o.d / 2 - EPS,
        t: o.y - o.dy / 2 + EPS, b: o.y + o.dy / 2 - EPS,
      };
      if (box.l < 0 || box.r > 100 || box.t < 0 || box.b > 100) return false;
      /* чужой блок с названием, описанием и ценой закрывать нельзя */
      const onText = spots.some(
        (s) => !sameDish(s, spot) && box.l < s.l + s.w && s.l < box.r && box.t < s.t + s.h && s.t < box.b
      );
      if (onText) return false;
      return !taken.some((t) => box.l < t.r && t.l < box.r && box.t < t.b && t.t < box.b);
    };
    const pick = options.find(fits) || options[0];
    taken.push({
      l: pick.x - pick.d / 2, r: pick.x + pick.d / 2,
      t: pick.y - pick.dy / 2, b: pick.y + pick.dy / 2,
    });
    btn.style.setProperty("--badge-x", `${((pick.x - spot.l) / spot.w) * 100}%`);
    btn.style.setProperty("--badge-y", `${((pick.y - spot.t) / spot.h) * 100}%`);
  });
}

function findItem(spot) {
  const sec = MENU.find((s) => s.id === spot.sec);
  const item = sec && sec.items.find((it) => it.name === spot.name);
  if (!item) return null;
  /* строку заказа собирает корзина: формат id один для меню и страниц блюд,
     а у позиций с выбором в строку кладётся список вариантов */
  if (spot.c != null) return Cart.line(spot.sec, item.name, item, { c: spot.c });
  if (spot.v != null) return Cart.line(spot.sec, item.name, item, spot.v);
  return Cart.line(spot.sec, item.name, item);
}

function buildHotspots() {
  if (typeof MENU_HOTSPOTS === "undefined") return;
  const add = tr("dishAdd");
  let made = 0;

  document.querySelectorAll(".menu-pages__page").forEach((page) => {
    const spots = MENU_HOTSPOTS[page.dataset.page];
    if (!spots || page.querySelector(".hotspot")) return;

    const placed = [];

    spots.forEach((spot) => {
      const dish = findItem(spot);
      if (!dish) return;

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "hotspot";
      btn.style.left = `${spot.l}%`;
      btn.style.top = `${spot.t}%`;
      btn.style.width = `${spot.w}%`;
      btn.style.height = `${spot.h}%`;
      btn.setAttribute(
        "aria-label",
        `${add}: ${dish.name}${dish.detail ? `, ${dish.detail}` : ""}, ${dish.price} mdl`
      );
      btn.addEventListener("click", () => {
        Cart.add(dish);
        btn.classList.remove("is-added");
        void btn.offsetWidth;
        btn.classList.add("is-added");
      });

      /* Видимая кнопка живёт внутри области: у блюда остаётся один
         обработчик и одна остановка табуляции, а плюс лишь показывает,
         куда жать. Размер и отступы — в долях листа, поэтому кнопка
         одинаково выглядит и на широком экране, и на телефоне. */
      const badge = document.createElement("span");
      badge.className = "qty-badge";
      badge.setAttribute("aria-hidden", "true");
      btn.appendChild(badge);

      /* строка варианта — узкая полоса, там кнопка мельче */
      if (spot.v != null) btn.classList.add("hotspot--tight");
      placed.push({ spot, btn, badge });

      page.appendChild(btn);
      made++;
    });

    placeBadges(spots, placed);
  });

  if (made) showHintOnce();
}

/* Первый заход: области один раз проступают и гаснут. Дальше не повторяем —
   иначе подсказка превращается в мельтешение при каждом открытии меню.

   Ждём первую страницу меню: если подсветка вспыхнет на пустом месте, пока
   картинка ещё грузится, гость её просто не свяжет с блюдами. Если картинка
   почему-то не пришла за четыре секунды, показываем всё равно — подсказка
   важнее идеального момента. */
function showHintOnce() {
  let seen = false;
  try {
    seen = localStorage.getItem(HINT_KEY) === "1";
  } catch (_) {
    seen = true; /* приватный режим: лучше не мигать вовсе */
  }
  if (seen) return;

  const play = () => {
    document.querySelectorAll(".hotspot").forEach((el) => el.classList.add("is-hinted"));
    try {
      localStorage.setItem(HINT_KEY, "1");
    } catch (_) {}
  };

  const img = document.querySelector(".menu-pages__img");
  if (!img) return play();

  let fired = false;
  const once = () => {
    if (fired) return;
    fired = true;
    clearTimeout(timer);
    play();
  };
  const timer = setTimeout(once, 4000);

  if (img.decode) {
    /* decode() ждёт не только загрузку, но и готовность к отрисовке */
    img.decode().then(once, once);
  } else if (img.complete) {
    once();
  } else {
    img.addEventListener("load", once, { once: true });
    img.addEventListener("error", once, { once: true });
  }
}

/* ── Проявление при прокрутке ──
   Обложка и подпись под ней размечены .reveal и без наблюдателя остались
   бы прозрачными, поэтому он работает всегда, а не только на баре. */
function revealAll() {
  if (!io) {
    io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
    );
  }
  document
    .querySelectorAll(".reveal:not(.is-visible), .reveal-lines:not(.is-visible)")
    .forEach((el) => io.observe(el));
}

/* ── Наблюдатель бара: активный чип раздела ── */
function wireObservers() {
  if (sectionIO) sectionIO.disconnect();
  revealAll();

  document.querySelectorAll(".menu-section").forEach((sec) => {
    sec.querySelectorAll(".menu-item").forEach((it, i) => {
      it.style.transitionDelay = `${Math.min(i, 6) * 60}ms`;
    });
  });

  const chips = [...document.querySelectorAll(".menu-nav__chip")];
  /* Активный чип подводим сдвигом самой ленты. scrollIntoView здесь не
     годится: лента липкая, и браузер тащит к её нелипкой позиции всю
     страницу — меню отскакивало бы к началу при каждом новом разделе. */
  const centerChip = (chip) => {
    const left = chip.offsetLeft - (navEl.clientWidth - chip.offsetWidth) / 2;
    navEl.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  };
  sectionIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        chips.forEach((c) =>
          c.classList.toggle("is-active", c.dataset.section === entry.target.id)
        );
        const active = chips.find((c) => c.classList.contains("is-active"));
        if (active) centerChip(active);
      });
    },
    { rootMargin: "-20% 0px -70% 0px" }
  );
  document.querySelectorAll(".menu-section").forEach((s) => sectionIO.observe(s));
}

/* ── Вкладки ── */
document.querySelectorAll(".menu-tabs button").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.dataset.group === activeGroup) return;
    showGroup(btn.dataset.group);
    document.querySelector(".menu-tabs").scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const savedReturn = (() => {
  try {
    return JSON.parse(sessionStorage.getItem("gamarjoba-menu-return"));
  } catch (_) {
    return null;
  }
})();
if (savedReturn && savedReturn.group === "bar") activeGroup = "bar";
showGroup(activeGroup);
revealAll();
buildHotspots();
if (savedReturn) {
  sessionStorage.removeItem("gamarjoba-menu-return");
  requestAnimationFrame(() => {
    window.scrollTo({ top: savedReturn.y || 0, behavior: "instant" });
  });
}

/* ── Клики: корзина бара и переходы на страницы блюд ── */
const transition = document.getElementById("pageTransition");

function goToDish(href) {
  /* запоминаем вкладку и позицию скролла для возврата */
  sessionStorage.setItem(
    "gamarjoba-menu-return",
    JSON.stringify({ group: activeGroup, y: window.scrollY })
  );
  const url = `${href}?back=menu`;
  if (REDUCED || !transition) {
    window.location.href = url;
    return;
  }
  transition.classList.remove("page-transition--out");
  transition.classList.add("is-active");
  setTimeout(() => {
    window.location.href = url;
  }, 560);
}

document.addEventListener("click", (e) => {
  const addBtn = e.target.closest(".add-btn");
  if (addBtn) {
    e.preventDefault();
    e.stopPropagation();
    Cart.add({
      id: addBtn.dataset.id,
      name: addBtn.dataset.name,
      detail: addBtn.dataset.detail,
      price: addBtn.dataset.price,
    });
    addBtn.classList.remove("is-added");
    void addBtn.offsetWidth;
    addBtn.classList.add("is-added");
    return;
  }

  const clickable =
    e.target.closest(".menu-item__variants li[data-href]") ||
    e.target.closest(".menu-item--link[data-href]");
  if (!clickable) return;
  e.preventDefault();
  goToDish(clickable.dataset.href);
});

/* ── Прогресс-бар + параллакс заголовка ── */
const progressBar = document.getElementById("progressBar");
const menuTitle = document.getElementById("menuTitle");
let ticking = false;
window.addEventListener(
  "scroll",
  () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (progressBar && max > 0) {
        progressBar.style.transform = `scaleX(${window.scrollY / max})`;
      }
      if (menuTitle && !REDUCED) {
        const y = window.scrollY;
        menuTitle.style.transform = `translateY(${y * 0.22}px)`;
        menuTitle.style.opacity = Math.max(0, 1 - y / (window.innerHeight * 0.6));
      }
      ticking = false;
    });
  },
  { passive: true }
);
