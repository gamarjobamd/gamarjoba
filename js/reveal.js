/* Gamarjoba — scroll-driven раскрытие hero через силуэт Грузии.
   Sticky-контейнер на ~2.5 экрана: прогресс скролла = зум «окна»-контура.
   Всё на transform: scale (GPU). При prefers-reduced-motion — статичная
   открытая версия (маска не включается). */

(() => {
  const gr = document.querySelector(".gr");
  if (!gr) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return; // фолбэк: сразу открытый hero, без маски и без зума

  const track = gr.querySelector(".gr__track");
  if (!track) return;

  gr.classList.add("is-armed");

  const MAX_SCALE = 20; // хватает, чтобы окно перекрыло вьюпорт; финал добивает opacity
  const easeIn = (t) => t * t; // ускоряющийся зум — «мягкий» вход

  let ticking = false;

  function update() {
    ticking = false;
    const total = track.offsetHeight - window.innerHeight;
    const passed = -track.getBoundingClientRect().top;
    const p = total > 0 ? Math.min(1, Math.max(0, passed / total)) : 0;

    // зум окна и лёгкий push-in самого фото
    const s = 1 + (MAX_SCALE - 1) * easeIn(p);
    gr.style.setProperty("--gr-s", s.toFixed(3));
    gr.style.setProperty("--gr-img", (1.15 - 0.15 * p).toFixed(3));

    // на финале маску убираем совсем — гарантированно чистое раскрытие
    const frameOp = p < 0.9 ? 1 : Math.max(0, 1 - (p - 0.9) / 0.1);
    gr.style.setProperty("--gr-frame-op", frameOp.toFixed(3));

    // текст мягко уходит к концу, передавая экран контенту
    const cOp = p < 0.68 ? 1 : Math.max(0, 1 - (p - 0.68) / 0.32);
    gr.style.setProperty("--gr-content-op", cOp.toFixed(3));
    gr.style.setProperty("--gr-content-y", (-48 * Math.max(0, p - 0.68)).toFixed(1) + "px");

    // тёмная фаза (фото занимает края) — шапка становится светлой
    document.body.classList.toggle("gr-dark", p > 0.45 && p < 0.98);
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();
})();
