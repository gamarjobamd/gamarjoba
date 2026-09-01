/* Gamarjoba — страница блюда.

   Канонический адрес — /dish/<slug>/: статическая страница, собранная
   scripts/build-dishes.js. Разметку рисует общий модуль dish-template.js —
   тот же код, что использует сборка; второй копии шаблона нет.

   Старые адреса вида /dish?item=… продолжают работать: слаг резолвится
   здесь же и страница перенаправляется на канонический адрес.
     ?item=<slug>          — прежний канонический адрес
     ?id=<dish>            — ещё более ранний адрес фирменных блюд
     ?mi=<sectionId>:<idx> — самый ранний, нестабильный: позиция по индексу
     ?back=menu            — кнопка «Назад» ведёт в меню, на место клика */

const params = new URLSearchParams(window.location.search);
const fromMenu = params.get("back") === "menu";

/* «Назад» — в меню, если пришли из меню */
if (fromMenu) {
  const backLink = document.querySelector(".nav__back");
  if (backLink) backLink.href = "/menu";
}

const TPL = createDishTemplate({
  lang: LANG,
  ui: UI,
  allergens: ALLERGEN_T,
  dishes: DISHES,
  dishOrder: DISH_ORDER,
  sections: [...MENU, ...BAR],
  menuFull: typeof MENU_FULL !== "undefined" ? MENU_FULL : null,
  dishFull: typeof DISH_FULL !== "undefined" ? DISH_FULL : null,
});

/* ── Какое блюдо показываем ──
   На /dish/<slug>/ слаг лежит в адресе, на старых /dish?… — в параметрах. */
function slugFromPath() {
  const m = window.location.pathname.match(/^\/dish\/([^/]+)\/?$/);
  return m ? decodeURIComponent(m[1]) : "";
}

function slugFromQuery() {
  const direct = params.get("item") || params.get("id");
  if (direct) return direct;
  const mi = params.get("mi");
  if (!mi) return "";
  const [secId, idxStr] = mi.split(":");
  const sec = [...MENU, ...BAR].find((s) => s.id === secId);
  const item = sec && sec.items[Number(idxStr)];
  return item ? TPL.itemSlug(item) : "";
}

const pathSlug = slugFromPath();
const slug = pathSlug || slugFromQuery();

/* Старый адрес — уводим на канонический, чтобы у блюда был один URL.
   replace, а не assign: старая страница не должна оставаться в истории. */
if (!pathSlug) {
  const target = slug && TPL.metaBySlug(slug) ? TPL.dishHref(slug, fromMenu) : "/404.html";
  window.location.replace(target);
}

const main = document.getElementById("dishMain");
const rendered = pathSlug ? TPL.renderBySlug(slug, { fromMenu }) : null;

if (rendered) {
  document.title = `${TPL.metaBySlug(slug).name} — Gamarjoba`;
  main.innerHTML = rendered.html;

  /* «В корзину» у самого блюда: у фирменных цена строкой, у позиций меню — числом */
  const addBtn = document.getElementById("dishAdd");
  if (addBtn) {
    const payload =
      rendered.kind === "rich"
        ? {
            id: `dish:${rendered.dish.id}`,
            name: rendered.dish.name,
            detail: TPL.T(rendered.dish.tagline),
            price: parseInt(rendered.dish.price.replace(/\D+/g, ""), 10) || 0,
          }
        : {
            id: `${rendered.sec.id}:${TPL.T(rendered.item.name)}`,
            name: TPL.T(rendered.item.name),
            detail: rendered.item.w || "",
            price: rendered.item.p,
          };
    addBtn.addEventListener("click", () => Cart.add(payload));
  }
} else if (pathSlug) {
  /* адрес вида /dish/<slug>/ есть, а блюда такого нет */
  window.location.replace("/404.html");
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
