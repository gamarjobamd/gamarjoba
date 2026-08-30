/* Gamarjoba — страница полного меню: вкладки Кухня/Бар, корзина, скролл-анимации */

const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const GROUPS = { kitchen: MENU, bar: BAR };
let activeGroup = location.hash === "#bar" ? "bar" : "kitchen";

/* разметку строит общий модуль menu-template.js — тот же код,
   что использует сборка статики; здесь только язык и словари */
const TPL = createMenuTemplate({ lang: LANG, langs: I18N_LANGS, ui: UI, badges: BADGE_T });

/* ── Рендер группы (кухня или бар) ── */
const navEl = document.getElementById("menuNav");
const sectionsEl = document.getElementById("menuSections");
let io, sectionIO;

function renderGroup(group) {
  activeGroup = group;
  const data = GROUPS[group];
  const isBar = group === "bar";

  document.querySelectorAll(".menu-tabs button").forEach((b) =>
    b.classList.toggle("is-active", b.dataset.group === group)
  );

  navEl.innerHTML = TPL.renderNav(data, isBar);
  sectionsEl.innerHTML = TPL.renderSections(data, isBar);

  wireObservers();
}

/* ── Наблюдатели: reveal + активный раздел ── */
function wireObservers() {
  if (io) io.disconnect();
  if (sectionIO) sectionIO.disconnect();

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
  document.querySelectorAll(".reveal, .reveal-lines").forEach((el) => io.observe(el));

  document.querySelectorAll(".menu-section").forEach((sec) => {
    sec.querySelectorAll(".menu-item").forEach((it, i) => {
      it.style.transitionDelay = `${Math.min(i, 6) * 60}ms`;
    });
  });

  const chips = [...document.querySelectorAll(".menu-nav__chip")];
  sectionIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        chips.forEach((c) =>
          c.classList.toggle("is-active", c.dataset.section === entry.target.id)
        );
        const active = chips.find((c) => c.classList.contains("is-active"));
        if (active) active.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
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
    renderGroup(btn.dataset.group);
    document.getElementById("menuNav").scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const savedReturn = (() => {
  try {
    return JSON.parse(sessionStorage.getItem("gamarjoba-menu-return"));
  } catch (_) {
    return null;
  }
})();
if (savedReturn && savedReturn.group && GROUPS[savedReturn.group]) {
  activeGroup = savedReturn.group;
}
renderGroup(activeGroup);
if (savedReturn) {
  sessionStorage.removeItem("gamarjoba-menu-return");
  requestAnimationFrame(() => {
    window.scrollTo({ top: savedReturn.y || 0, behavior: "instant" });
  });
}

/* ── Клики: корзина и переходы на страницы блюд ── */
const transition = document.getElementById("pageTransition");
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
  const clickable = e.target.closest(".menu-item--photo[data-href], .menu-item--link[data-href]");
  if (!clickable) return;
  /* на названии блюда теперь настоящая <a> — гасим её переход, иначе браузер
     уйдёт сразу и мы потеряем анимацию и запоминание позиции скролла */
  e.preventDefault();
  const href = `${clickable.dataset.href}&back=menu`;
  /* запоминаем вкладку и позицию скролла для возврата */
  sessionStorage.setItem(
    "gamarjoba-menu-return",
    JSON.stringify({ group: activeGroup, y: window.scrollY })
  );
  if (REDUCED || !transition) {
    window.location.href = href;
    return;
  }
  transition.classList.remove("page-transition--out");
  transition.classList.add("is-active");
  setTimeout(() => {
    window.location.href = href;
  }, 560);
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


/* ── Параллакс декоративного слоя ──
   Двигаем только transform, амплитуда до 6% высоты экрана.
   При prefers-reduced-motion не трогаем элементы вовсе. */
(() => {
  if (REDUCED) return;
  const items = [...document.querySelectorAll(".decor__item")];
  if (!items.length) return;

  let anchors = [];
  const measure = () => {
    anchors = items.map((el) => {
      el.style.transform = "";
      return el.getBoundingClientRect().top + window.scrollY;
    });
  };

  let queued = false;
  const apply = () => {
    queued = false;
    const vh = window.innerHeight;
    const mid = window.scrollY + vh / 2;
    items.forEach((el, i) => {
      if (!el.offsetParent) return; /* скрыт на этой ширине */
      /* rel = 0, когда элемент по центру экрана; ±1 — экран в сторону.
         Ограничиваем одним экраном, иначе сдвиг сразу упирается в потолок. */
      const rel = Math.max(-1, Math.min(1, (mid - anchors[i]) / vh));
      const amp = vh * (parseFloat(el.dataset.speed) || 0.03); /* 2–6% высоты экрана */
      el.style.transform = `translate3d(0, ${(rel * amp).toFixed(1)}px, 0)`;
    });
  };
  const onScroll = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(apply);
  };

  measure();
  apply();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", () => {
    clearTimeout(window.__decorT);
    window.__decorT = setTimeout(() => {
      measure();
      apply();
    }, 150);
  });
  /* позиции зависят от высоты страницы — пересчитываем после смены вкладки */
  document.querySelectorAll(".menu-tabs button").forEach((b) =>
    b.addEventListener("click", () => setTimeout(measure, 60))
  );
})();
