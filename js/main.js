/* Gamarjoba — главная страница: рендер карточек и скролл-анимации */

const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ── Рендер карточек блюд ── */
const grid = document.getElementById("dishGrid");
if (grid) {
  grid.innerHTML = DISHES.map(
    (d, i) => `
    <a class="dish-card" href="dish.html?id=${d.id}" data-dish="${d.id}">
      <span class="dish-card__num">№ ${String(i + 1).padStart(2, "0")}</span>
      <span class="dish-card__go" aria-hidden="true">→</span>
      <div class="dish-card__art"><img src="${d.img}" alt="${d.name} — ${T(d.tagline)}" loading="lazy" /></div>
      <h3 class="dish-card__name">${d.name}</h3>
      <p class="dish-card__tagline">${T(d.tagline)}</p>
      <div class="dish-card__meta">
        <span>${T(d.category)}</span>
        <span>${d.price}</span>
      </div>
    </a>`
  ).join("");
}

/* ── Разбивка текста на буквы (футер) ── */
function splitLetters(el) {
  if (!el) return;
  const text = el.textContent;
  el.textContent = "";
  [...text].forEach((ch, i) => {
    const s = document.createElement("span");
    s.textContent = ch;
    s.style.transitionDelay = `${i * 55}ms`;
    el.appendChild(s);
  });
}
splitLetters(document.getElementById("footerBig"));

/* ── Reveal при появлении в вьюпорте ── */
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      io.unobserve(entry.target);
    });
  },
  { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
);
document
  .querySelectorAll(".reveal, .reveal-lines, .mask-reveal, .dish-card, .footer__big")
  .forEach((el) => io.observe(el));

/* Карточки: лёгкий каскад появления */
document.querySelectorAll(".dish-card").forEach((card, i) => {
  card.classList.add("reveal");
  card.style.transitionDelay = `${(i % 3) * 90}ms`;
});

/* ── Прогресс-бар (hero-раскрытие живёт в reveal.js) ── */
const progressBar = document.getElementById("progressBar");
let ticking = false;

function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    if (progressBar && max > 0) {
      progressBar.style.transform = `scaleX(${window.scrollY / max})`;
    }
    ticking = false;
  });
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ── Мобильное меню ── */
const burger = document.getElementById("navBurger");
const mobileMenu = document.getElementById("mobileMenu");
if (burger && mobileMenu) {
  const toggle = (open) => {
    mobileMenu.classList.toggle("is-open", open);
    burger.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", open);
    document.body.style.overflow = open ? "hidden" : "";
  };
  burger.addEventListener("click", () => toggle(!mobileMenu.classList.contains("is-open")));
  mobileMenu.addEventListener("click", (e) => {
    if (e.target.closest("a")) toggle(false);
  });
}

/* ── Плавный переход на страницу блюда (красная шторка) ── */
const transition = document.getElementById("pageTransition");
document.addEventListener("click", (e) => {
  const card = e.target.closest(".dish-card");
  if (!card || !transition || REDUCED) return;
  e.preventDefault();
  transition.classList.add("is-active");
  setTimeout(() => {
    window.location.href = card.href;
  }, 560);
});
