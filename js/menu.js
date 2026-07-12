/* Gamarjoba — страница полного меню: вкладки Кухня/Бар, корзина, скролл-анимации */

const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const GROUPS = { kitchen: MENU, bar: BAR };
let activeGroup = location.hash === "#bar" ? "bar" : "kitchen";

/* ── Рендер одной позиции ── */
function renderItem(item, sectionTitle, itemIdx) {
  const linkAttr = item.link ? ` data-href="dish.html?id=${item.link}"` : "";
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
    ? ` data-mi="${sectionTitle}:${itemIdx}"`
    : "";
  const thumb = item.img
    ? `<img class="menu-item__thumb" src="${item.img}" alt="${name}" loading="lazy" />`
    : "";
  return `
    <div${linkAttr}${photoAttrs} class="menu-item reveal${item.link ? " menu-item--link" : ""}${item.img && !item.link ? " menu-item--photo" : ""}">
      <div class="menu-item__row">
        ${thumb}
        <span class="menu-item__name">${name}${item.link ? '<span class="menu-item__star">✳</span>' : ""}</span>
        <i class="menu-item__dots"></i>
        <span class="menu-item__meta">${item.w || ""}</span>
        ${price}
      </div>
      ${ru || alt ? `<p class="menu-item__ru">${ru}${alt}</p>` : ""}
      ${variants}
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
        <span class="menu-section__num">${String(i + 1).padStart(2, "0")}</span>
        <div>
          <h2 class="menu-section__title">${T(s.title)}</h2>
          <p class="menu-section__ro">${s.ro}</p>
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
  const clickable = e.target.closest(".menu-item--photo, .menu-item--link[data-href]");
  if (!clickable) return;
  const href = clickable.dataset.href
    ? `${clickable.dataset.href}&back=menu`
    : `dish.html?mi=${clickable.dataset.mi}&back=menu`;
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

