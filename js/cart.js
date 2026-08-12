/* Gamarjoba — корзина. Хранится в localStorage, доступна на всех страницах.
   Оформление заказа: собирает сообщение и открывает его в WhatsApp ресторана.
   API: Cart.add({ id, name, detail, price }), Cart.open() */

const Cart = (() => {
  const KEY = "gamarjoba-cart";
  const CONTACT_KEY = "gamarjoba-contact";
  const WHATSAPP = "37369904304"; /* +373 69 904 304 — WhatsApp ресторана */

  let items = [];
  try {
    items = JSON.parse(localStorage.getItem(KEY)) || [];
  } catch (_) {
    items = [];
  }
  let contact = { name: "", phone: "", note: "" };
  try {
    contact = { ...contact, ...(JSON.parse(localStorage.getItem(CONTACT_KEY)) || {}) };
  } catch (_) {}

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
        <div class="cart-form">
          <input class="cart-form__field" id="cartName" type="text" autocomplete="name"
                 placeholder="${tr("cartName")}" />
          <input class="cart-form__field" id="cartPhone" type="tel" autocomplete="tel"
                 placeholder="${tr("cartPhone")}" />
          <textarea class="cart-form__field cart-form__field--note" id="cartComment" rows="2"
                    placeholder="${tr("cartComment")}"></textarea>
        </div>
        <p class="cart-drawer__note">${tr("cartOrderNote")}</p>
        <a class="cart-drawer__cta cart-drawer__cta--wa" id="cartOrder" href="#" target="_blank" rel="noopener noreferrer">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12.04 2c-5.5 0-9.97 4.47-9.97 9.97 0 1.76.46 3.48 1.34 5L2 22l5.16-1.35a9.94 9.94 0 0 0 4.88 1.27h.01c5.5 0 9.97-4.47 9.97-9.97 0-2.66-1.04-5.17-2.92-7.05A9.9 9.9 0 0 0 12.04 2Zm0 1.87c2.17 0 4.2.84 5.73 2.38a8.06 8.06 0 0 1 2.37 5.72c0 4.47-3.63 8.1-8.1 8.1a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.06.8.82-2.99-.19-.31a8.07 8.07 0 0 1-1.24-4.29c0-4.47 3.64-8.1 8.1-8.1Zm-2.6 4.2c-.14 0-.36.05-.55.26-.19.21-.72.7-.72 1.71s.74 1.98.84 2.12c.1.14 1.44 2.28 3.55 3.1 1.76.68 2.12.55 2.5.51.38-.03 1.22-.5 1.4-.98.17-.48.17-.9.12-.98-.05-.09-.19-.14-.4-.24-.21-.1-1.22-.6-1.41-.67-.19-.07-.33-.1-.47.1-.14.21-.53.67-.65.81-.12.14-.24.16-.45.05a5.7 5.7 0 0 1-1.66-1.02 6.2 6.2 0 0 1-1.15-1.43c-.12-.21-.01-.32.09-.42.09-.09.21-.24.31-.36.1-.12.14-.21.21-.35.07-.14.03-.26-.02-.36-.05-.1-.44-1.11-.62-1.52-.16-.4-.33-.35-.45-.35h-.4Z"/>
          </svg>
          <span>${tr("cartOrder")}</span>
        </a>
        <a class="cart-drawer__call" href="tel:+37369904304">${tr("cartCall")}</a>
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

  /* ── Текст заказа для WhatsApp ── */
  function buildMessage() {
    const lines = [`*${tr("waTitle")}*`, "", `*${tr("waOrder")}:*`];
    items.forEach((i, idx) => {
      const detail = i.detail ? ` (${i.detail})` : "";
      lines.push(`${idx + 1}. ${i.name}${detail} — ${i.qty} × ${i.price} = ${i.qty * i.price} mdl`);
    });
    lines.push("", `*${tr("waTotal")}: ${total()} mdl*`);
    if (contact.name) lines.push("", `${tr("waName")}: ${contact.name}`);
    if (contact.phone) lines.push(`${tr("waPhone")}: ${contact.phone}`);
    if (contact.note) lines.push(`${tr("waComment")}: ${contact.note}`);
    return lines.join("\n");
  }

  function updateOrderLink() {
    const orderBtn = document.getElementById("cartOrder");
    if (!orderBtn) return;
    const empty = items.length === 0;
    orderBtn.classList.toggle("is-disabled", empty);
    orderBtn.setAttribute("aria-disabled", empty);
    orderBtn.href = empty
      ? "#"
      : `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(buildMessage())}`;
  }

  function render() {
    const n = count();
    countEl.hidden = n === 0;
    countEl.textContent = n;
    totalEl.textContent = `${total()} mdl`;
    updateOrderLink();
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

  /* ── Поля заказа: подставляем сохранённое и обновляем ссылку на лету ── */
  const fields = {
    name: document.getElementById("cartName"),
    phone: document.getElementById("cartPhone"),
    note: document.getElementById("cartComment"),
  };
  Object.entries(fields).forEach(([key, el]) => {
    if (!el) return;
    el.value = contact[key] || "";
    el.addEventListener("input", () => {
      contact[key] = el.value.trim();
      localStorage.setItem(
        CONTACT_KEY,
        JSON.stringify({ name: contact.name, phone: contact.phone })
      ); /* комментарий не запоминаем — он разовый */
      updateOrderLink();
    });
  });

  /* пустую корзину не отправляем */
  document.getElementById("cartOrder").addEventListener("click", (e) => {
    if (!items.length) {
      e.preventDefault();
      fab.classList.remove("is-pop");
      void fab.offsetWidth;
      fab.classList.add("is-pop");
    }
  });

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
