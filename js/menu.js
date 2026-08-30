/* Gamarjoba — страница полного меню: вкладки Кухня/Бар, корзина, скролл-анимации */

const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const GROUPS = { kitchen: MENU, bar: BAR };
let activeGroup = location.hash === "#bar" ? "bar" : "kitchen";

/* Подзаголовок плашки: два других языка через «•», как в печатном меню,
   где под названием раздела идут остальные две строки. */
function otherLangs(title, roFallback) {
  if (!title || typeof title === "string") return roFallback || "";
  return I18N_LANGS.filter((l) => l !== LANG)
    .map((l) => title[l])
    .filter(Boolean)
    .join(" • ");
}

/* ── Рендер одной позиции ── */
function renderItem(item, sectionTitle, itemIdx) {
  /* канонический адрес страницы блюда — по стабильному слагу, а не по индексу.
     Один источник и для data-href, и для настоящей <a> на названии. */
  const slug = item.slug || item.link || "";
  const dishHref = slug ? `/dish?item=${slug}` : "";
  const linkAttr = item.link ? ` data-href="${dishHref}"` : "";
  const name = T(item.name);
  const ru = T(item.ru);
  const alt = item.alt ? " · " + T(item.alt) : "";
  const itemId = `${sectionTitle}:${name}`;
  const variants = item.variants
    ? `<ul class="menu-item__variants">${item.variants
        .map((v) => {
          const vv = T(v.v);
          return `<li>
            <span>${vv}</span><i class="menu-item__dots"></i><b>${v.p}</b>
            <button class="add-btn" data-id="${itemId} — ${vv}" data-name="${name}" data-detail="${vv}" data-price="${v.p}" aria-label="+">+</button>
          </li>`;
        })
        .join("")}</ul>`
    : "";
  const price =
    item.p != null
      ? `<span class="menu-item__price">${item.p}<small> mdl</small></span>
         <button class="add-btn" data-id="${itemId}" data-name="${name}" data-detail="${item.w || ""}" data-price="${item.p}" aria-label="+">+</button>`
      : "";
  const photoAttrs = item.img && !item.link
    ? ` data-href="${dishHref}"`
    : "";
  const media = item.img
    ? `<div class="menu-item__media"><img class="menu-item__thumb" src="${item.img}" alt="${name}" loading="lazy" /></div>`
    : "";
  /* бейдж-отличие из печатного меню: особый выбор, легенда, классика, хит */
  const badge = item.badge && BADGE_T[item.badge]
    ? `<span class="menu-item__badge">${tr(BADGE_T[item.badge])}</span>`
    : "";
  return `
    <div${linkAttr}${photoAttrs} class="menu-item reveal${item.link ? " menu-item--link" : ""}${item.img && !item.link ? " menu-item--photo" : ""}${item.img ? " menu-item--has-img" : ""}">
      ${media}
      <div class="menu-item__body">
        <div class="menu-item__head">
          <span class="menu-item__name">${dishHref ? `<a href="${dishHref}">${name}</a>` : name}${item.link ? '<span class="menu-item__star">✳</span>' : ""}</span>
          <i class="menu-item__orn" aria-hidden="true"></i>
        </div>
        ${badge}
        ${ru || alt ? `<p class="menu-item__ru">${ru}${alt}</p>` : ""}
        ${variants}
        ${item.w || price ? `<div class="menu-item__foot">
          <span class="menu-item__meta">${item.w || ""}</span>
          ${price}
        </div>` : ""}
      </div>
    </div>`;
}

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

  navEl.innerHTML = data
    .map((s) => `<a class="menu-nav__chip${isBar ? " menu-nav__chip--bar" : ""}" href="#${s.id}" data-section="${s.id}">${T(s.title)}</a>`)
    .join("");

  sectionsEl.innerHTML = data
    .map(
      (s, i) => `
    <section class="menu-section${isBar ? " menu-section--bar" : ""}" id="${s.id}">
      <header class="menu-section__head reveal">
        <div class="menu-section__band">
          <span class="menu-section__num">${String(i + 1).padStart(2, "0")}</span>
          <h2 class="menu-section__title">${T(s.title)}</h2>
          <p class="menu-section__ro">${otherLangs(s.title, s.ro)}</p>
        </div>
      </header>
      ${s.note ? `<p class="menu-section__note reveal">${T(s.note)}</p>` : ""}
      <div class="menu-section__items">
        ${s.items.map((it, ii) => renderItem(it, s.id, ii)).join("")}
      </div>
    </section>`
    )
    .join("");

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
