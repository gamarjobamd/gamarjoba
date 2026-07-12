/* Gamarjoba — корзина. Хранится в localStorage, доступна на всех страницах.
   API: Cart.add({ id, name, detail, price }), Cart.open() */

const Cart = (() => {
  const KEY = "gamarjoba-cart";
  let items = [];
  try {
    items = JSON.parse(localStorage.getItem(KEY)) || [];
  } catch (_) {
    items = [];
  }

  /* ── UI ── */
  const root = document.createElement("div");
  root.innerHTML = `
    <button class="cart-fab" id="cartFab" aria-label="Корзина">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M3 4h2l2.4 12.2a1.5 1.5 0 0 0 1.5 1.3h7.9a1.5 1.5 0 0 0 1.5-1.2L20.5 8H6"/>
        <circle cx="9.5" cy="20.5" r="1.3"/>
        <circle cx="16.5" cy="20.5" r="1.3"/>
      </svg>
      <span class="cart-fab__count" id="cartCount" hidden>0</span>
    </button>
    <div class="cart-overlay" id="cartOverlay" hidden></div>
    <aside class="cart-drawer" id="cartDrawer" aria-label="Корзина" aria-hidden="true">
      <header class="cart-drawer__head">
        <h2>${tr("cartTitle")}</h2>
        <button class="cart-drawer__close" id="cartClose" aria-label="Закрыть">✕</button>
      </header>
      <div class="ornament-band cart-drawer__band" aria-hidden="true"></div>
      <div class="cart-drawer__body" id="cartBody"></div>
      <footer class="cart-drawer__foot">
        <div class="cart-drawer__total"><span>${tr("cartTotal")}</span><b id="cartTotal">0 mdl</b></div>
        <p class="cart-drawer__note">${tr("cartNote")}</p>
        <a class="cart-drawer__cta" href="tel:+37369904304">${tr("cartCall")}</a>
        <button class="cart-drawer__clear" id="cartClear">${tr("cartClear")}</button>
      </footer>
    </aside>`;
  document.body.appendChild(root);

  const fab = document.getElementById("cartFab");
  const countEl = document.getElementById("cartCount");
  const overlay = document.getElementById("cartOverlay");
  const drawer = document.getElementById("cartDrawer");
  const body = document.getElementById("cartBody");
  const totalEl = document.getElementById("cartTotal");

  function save() {
    localStorage.setItem(KEY, JSON.stringify(items));
  }

  function count() {
    return items.reduce((s, i) => s + i.qty, 0);
  }

  function total() {
    return items.reduce((s, i) => s + i.qty * i.price, 0);
  }

  function render() {
    const n = count();
    countEl.hidden = n === 0;
    countEl.textContent = n;
    totalEl.textContent = `${total()} mdl`;
    if (!items.length) {
      body.innerHTML = `<p class="cart-empty">${tr("cartEmpty")}</p>`;
      return;
    }
    body.innerHTML = items
      .map(
        (i, idx) => `
      <div class="cart-item">
        <div class="cart-item__info">
          <b>${i.name}</b>
          ${i.detail ? `<small>${i.detail}</small>` : ""}
          <span>${i.price} mdl</span>
        </div>
        <div class="cart-item__qty">
          <button data-act="minus" data-i="${idx}" aria-label="Меньше">−</button>
          <b>${i.qty}</b>
          <button data-act="plus" data-i="${idx}" aria-label="Больше">+</button>
        </div>
      </div>`
      )
      .join("");
  }

  function open() {
    overlay.hidden = false;
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function close() {
    overlay.hidden = true;
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function add({ id, name, detail, price }) {
    const found = items.find((i) => i.id === id);
    if (found) found.qty += 1;
    else items.push({ id, name, detail: detail || "", price: Number(price) || 0, qty: 1 });
    save();
    render();
    fab.classList.remove("is-pop");
    void fab.offsetWidth; /* перезапуск анимации */
    fab.classList.add("is-pop");
  }

  fab.addEventListener("click", open);
  overlay.addEventListener("click", close);
  document.getElementById("cartClose").addEventListener("click", close);
  document.getElementById("cartClear").addEventListener("click", () => {
    items = [];
    save();
    render();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
  body.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-act]");
    if (!btn) return;
    const i = Number(btn.dataset.i);
    if (btn.dataset.act === "plus") items[i].qty += 1;
    else {
      items[i].qty -= 1;
      if (items[i].qty <= 0) items.splice(i, 1);
    }
    save();
    render();
  });

  render();
  return { add, open };
})();
