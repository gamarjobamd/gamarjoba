/* Gamarjoba — страница блюда.
   Два режима:
   ?id=<dish>            — 6 фирменных блюд с полным описанием (DISHES)
   ?mi=<sectionId>:<idx> — любая позиция полного меню (MENU/BAR)
   &back=menu            — кнопка «Назад» ведёт в меню, на место клика */

const params = new URLSearchParams(window.location.search);
const fromMenu = params.get("back") === "menu";
const backSuffix = fromMenu ? "&back=menu" : "";

/* «Назад» — в меню, если пришли из меню */
if (fromMenu) {
  const backLink = document.querySelector(".nav__back");
  if (backLink) backLink.href = "menu.html";
}

const ALL_SECTIONS = [...MENU, ...BAR];

function findMenuItem(mi) {
  const [secId, idxStr] = (mi || "").split(":");
  const sec = ALL_SECTIONS.find((s) => s.id === secId);
  if (!sec) return null;
  const item = sec.items[Number(idxStr)];
  return item ? { sec, item, idx: Number(idxStr) } : null;
}

const main = document.getElementById("dishMain");

/* ── Полное описание из печатного меню: RO / RU / EN подряд ── */
function fullBlock(data) {
  if (!data) return "";
  const rows = [["RO", data.ro], ["RU", data.ru], ["EN", data.en]]
    .filter(([, text]) => text)
    .map(
      ([code, text]) => `
        <div class="dish-full__row">
          <span class="dish-full__lang">${code}</span>
          <p class="dish-full__text">${text}</p>
        </div>`
    )
    .join("");
  return rows ? `<div class="dish-full reveal">${rows}</div>` : "";
}

/* ── Режим 1: фирменное блюдо с полным описанием ── */
function renderRich(dish) {
  document.title = `${dish.name} — Gamarjoba`;
  const idx = DISH_ORDER.indexOf(dish.id);
  const next = getDish(DISH_ORDER[(idx + 1) % DISH_ORDER.length]);

  const allergens = dish.allergens.length
    ? `<div class="dish-allergens">${dish.allergens.map((a) => `<span>${T(ALLERGEN_T[a]) || a}</span>`).join("")}</div>`
    : `<div class="dish-allergens"><span>${tr("dishNoAllergens")}</span></div>`;

  main.innerHTML = `
  <section class="dish-hero">
    <div class="dish-hero__art" id="dishArt"><img src="${dish.img}" alt="${dish.name} — ${T(dish.tagline)}" /></div>
    <div>
      <p class="dish-hero__cat reveal">${T(dish.category)} · № ${String(idx + 1).padStart(2, "0")}</p>
      <h1 class="dish-hero__name reveal">${dish.name}</h1>
      <p class="dish-hero__ru reveal" lang="ka">${dish.ka}</p>
      <p class="dish-hero__tagline reveal">${T(dish.tagline)}</p>
      ${fullBlock(typeof DISH_FULL !== "undefined" ? DISH_FULL[dish.id] : null)}
      <div class="dish-hero__meta reveal">
        <div><span>${tr("dishWeight")}</span><strong>${dish.weight}</strong></div>
        <div><span>${tr("dishPrice")}</span><strong>${dish.price}</strong></div>
      </div>
      <button class="dish-hero__add reveal" id="dishAdd">${tr("dishAdd")} · ${dish.price}</button>
    </div>
  </section>

  <section class="dish-body">
    <div class="dish-body__desc reveal-lines">
      <h2>${tr("dishAbout")}</h2>
      <p>${T(dish.description)}</p>
      ${allergens}
    </div>
    <div class="dish-body__ritual reveal">
      <h2>${tr("dishHow")}</h2>
      <p>${T(dish.ritual)}</p>
    </div>
  </section>

  <a class="dish-next" href="dish.html?id=${next.id}${backSuffix}">
    <span>${tr("dishNext")}</span>
    <strong>${next.name} →</strong>
  </a>`;

  document.getElementById("dishAdd").addEventListener("click", () => {
    Cart.add({
      id: `dish:${dish.id}`,
      name: dish.name,
      detail: T(dish.tagline),
      price: parseInt(dish.price.replace(/\D+/g, ""), 10) || 0,
    });
  });
}

/* ── Режим 2: любая позиция меню ── */
function renderMenuItem(sec, item, idx) {
  const name = T(item.name);
  document.title = `${name} — Gamarjoba`;
  const desc = T(item.ru);
  /* ключ полного описания — «раздел:название», как в menu-full.js */
  const fullKey = `${sec.id}:${typeof item.name === "string" ? item.name : name}`;
  const full = typeof MENU_FULL !== "undefined" ? MENU_FULL[fullKey] : null;

  /* следующее блюдо с фото в этом же разделе */
  let nextHtml = "";
  const n = sec.items.length;
  for (let step = 1; step < n; step++) {
    const j = (idx + step) % n;
    if (sec.items[j].img) {
      nextHtml = `
      <a class="dish-next" href="dish.html?mi=${sec.id}:${j}${backSuffix}">
        <span>${tr("dishNext")}</span>
        <strong>${T(sec.items[j].name)} →</strong>
      </a>`;
      break;
    }
  }

  const meta = `
    <div class="dish-hero__meta reveal">
      ${item.w ? `<div><span>${tr("dishWeight")}</span><strong>${item.w}</strong></div>` : ""}
      ${item.p != null ? `<div><span>${tr("dishPrice")}</span><strong>${item.p} MDL</strong></div>` : ""}
    </div>`;

  const addBtn =
    item.p != null
      ? `<button class="dish-hero__add reveal" id="dishAdd">${tr("dishAdd")} · ${item.p} MDL</button>`
      : "";

  const variants = item.variants
    ? `
  <section class="dish-body dish-body--single">
    <div class="dish-body__desc reveal">
      <h2>${tr("dishVariants")}</h2>
      <ul class="menu-item__variants">
        ${item.variants
          .map((v) => {
            const vv = T(v.v);
            return `<li>
              <span>${vv}</span><i class="menu-item__dots"></i><b>${v.p}</b>
              <button class="add-btn" data-id="${sec.id}:${name} — ${vv}" data-name="${name}" data-detail="${vv}" data-price="${v.p}" aria-label="+">+</button>
            </li>`;
          })
          .join("")}
      </ul>
    </div>
  </section>`
    : "";

  main.innerHTML = `
  <section class="dish-hero">
    <div class="dish-hero__art" id="dishArt">${item.img ? `<img src="${item.img}" alt="${name}" />` : ""}</div>
    <div>
      <p class="dish-hero__cat reveal">${T(sec.title)}</p>
      <h1 class="dish-hero__name reveal">${name}</h1>
      ${desc ? `<p class="dish-hero__tagline reveal">${desc}</p>` : ""}
      ${fullBlock(full)}
      ${meta}
      ${addBtn}
    </div>
  </section>
  ${variants}
  ${nextHtml}`;

  const btn = document.getElementById("dishAdd");
  if (btn) {
    btn.addEventListener("click", () => {
      Cart.add({
        id: `${sec.id}:${name}`,
        name,
        detail: item.w || "",
        price: item.p,
      });
    });
  }
}

/* ── Выбор режима ── */
const found = params.get("mi") ? findMenuItem(params.get("mi")) : null;
if (found) {
  renderMenuItem(found.sec, found.item, found.idx);
} else {
  renderRich(getDish(params.get("id")) || DISHES[0]);
}

/* ── Клики по «+» у вариантов ── */
document.addEventListener("click", (e) => {
  const addBtn = e.target.closest(".add-btn");
  if (!addBtn) return;
  Cart.add({
    id: addBtn.dataset.id,
    name: addBtn.dataset.name,
    detail: addBtn.dataset.detail,
    price: addBtn.dataset.price,
  });
  addBtn.classList.remove("is-added");
  void addBtn.offsetWidth;
  addBtn.classList.add("is-added");
});

/* ── Появление фото и блоков ── */
const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
requestAnimationFrame(() => {
  const art = document.getElementById("dishArt");
  if (art) art.classList.add("is-drawn");
});

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      io.unobserve(entry.target);
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
);
document.querySelectorAll(".reveal, .reveal-lines").forEach((el, i) => {
  el.style.transitionDelay = `${Math.min(i, 5) * 80}ms`;
  io.observe(el);
});

/* ── Прогресс-бар ── */
const progressBar = document.getElementById("progressBar");
window.addEventListener(
  "scroll",
  () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    if (progressBar && max > 0) {
      progressBar.style.transform = `scaleX(${window.scrollY / max})`;
    }
  },
  { passive: true }
);
