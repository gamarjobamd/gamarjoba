/* Gamarjoba — страница политики cookie.

   Здесь лежит единственная копия реквизитов оператора и единственный
   перечень того, что сайт хранит на устройстве посетителя. Правка —
   только тут: страница и все три языковые версии берут данные отсюда.

   Подключается ПОСЛЕ i18n.js: пользуется его L(), T() и tr(). */

/* ── Оператор. Одно место на весь сайт. ── */
const COMPANY = {
  name: 'SRL "Pan Avenue"',
  idno: "1003600110491",
  address: "bd. Mircea cel Bătrîn 6, mun. Chișinău, Republica Moldova",
  email: "gamarjobamd@gmail.com",
  brand: "Gamarjoba",
  site: "gamarjoba.md",
};

/* ── Надзорный орган ── */
const SUPERVISOR = {
  name: "Centrul Național pentru Protecția Datelor cu Caracter Personal (CNPDCP)",
  url: "https://datepersonale.md",
};

/* ── Что сайт хранит на устройстве ──
   Составлено по фактическому аудиту кода, а не по памяти.
   Cookie сайт не ставит вообще: ни одной строки document.cookie.
   localStorage и sessionStorage приравнены к cookie, поэтому
   раскрываются здесь наравне с ними. */
const STORAGE_ITEMS = [
  {
    key: "gamarjoba-cart",
    kind: "localStorage",
    source: "js/cart.js",
    purpose: L(
      "Состав корзины: что вы добавили и в каком количестве.",
      "Conținutul coșului: ce ați adăugat și în ce cantitate.",
      "Cart contents: what you added and in what quantity."
    ),
    ttl: L("До очистки браузера", "Până la ștergerea datelor din browser", "Until you clear your browser"),
  },
  {
    key: "gamarjoba-contact",
    kind: "localStorage",
    source: "js/cart.js",
    purpose: L(
      "Имя и телефон, введённые в форме заказа, — чтобы не набирать их заново при следующем заказе.",
      "Numele și telefonul introduse în formularul de comandă — ca să nu le reintroduceți data viitoare.",
      "The name and phone you entered in the order form, so you don't retype them next time."
    ),
    ttl: L("До очистки браузера", "Până la ștergerea datelor din browser", "Until you clear your browser"),
  },
  {
    key: "gamarjoba-lang",
    kind: "localStorage",
    source: "js/i18n.js",
    purpose: L(
      "Выбранный вами язык сайта: RO, RU или EN.",
      "Limba site-ului aleasă de dvs.: RO, RU sau EN.",
      "The site language you chose: RO, RU or EN."
    ),
    ttl: L("До очистки браузера", "Până la ștergerea datelor din browser", "Until you clear your browser"),
  },
  {
    key: "gamarjoba-menu-return",
    kind: "sessionStorage",
    source: "js/menu.js",
    purpose: L(
      "Вкладка и позиция прокрутки в меню, чтобы вернуть вас на то же место после просмотра блюда.",
      "Fila și poziția derulării în meniu, ca să reveniți în același loc după ce ați văzut un preparat.",
      "The menu tab and scroll position, so you return to the same spot after viewing a dish."
    ),
    ttl: L("До закрытия вкладки", "Până la închiderea filei", "Until you close the tab"),
  },
];

/* ── Рендер ── */
(() => {
  const esc = (s) =>
    String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  /* Реквизиты оператора — один блок, собирается из COMPANY */
  const card = document.getElementById("operatorCard");
  if (card) {
    card.innerHTML = [
      [tr("ckOperatorName"), esc(COMPANY.name)],
      ["IDNO", esc(COMPANY.idno)],
      [tr("ckOperatorAddress"), esc(COMPANY.address)],
      [
        tr("ckOperatorEmail"),
        `<a href="mailto:${esc(COMPANY.email)}">${esc(COMPANY.email)}</a>`,
      ],
    ]
      .map(
        ([label, value]) =>
          `<div class="ck-card__row"><dt>${esc(label)}</dt><dd>${value}</dd></div>`
      )
      .join("");
  }

  /* Таблица хранимых значений */
  const tbody = document.getElementById("storageRows");
  if (tbody) {
    tbody.innerHTML = STORAGE_ITEMS.map(
      (i) => `
      <tr role="row">
        <td role="cell" data-th="${esc(tr("ckThName"))}"><code>${esc(i.key)}</code></td>
        <td role="cell" data-th="${esc(tr("ckThProvider"))}">${esc(COMPANY.site)}<small>${esc(i.kind)}</small></td>
        <td role="cell" data-th="${esc(tr("ckThPurpose"))}">${esc(T(i.purpose))}</td>
        <td role="cell" data-th="${esc(tr("ckThTtl"))}">${esc(T(i.ttl))}</td>
      </tr>`
    ).join("");
  }

  /* Надзорный орган — название и ссылка, больше ничего */
  const sup = document.getElementById("supervisorLink");
  if (sup) {
    sup.innerHTML =
      `${esc(SUPERVISOR.name)} — ` +
      `<a href="${esc(SUPERVISOR.url)}" target="_blank" rel="noopener noreferrer">${esc(
        SUPERVISOR.url.replace(/^https:\/\//, "")
      )}</a>`;
  }

  /* ── Рабочая кнопка: удалить всё, что сайт сохранил ──
     Согласия сайт не собирает — отзывать нечего. Единственное реальное
     действие, доступное посетителю здесь, — стереть сохранённое. */
  const btn = document.getElementById("ckClear");
  const status = document.getElementById("ckClearStatus");
  if (btn && status) {
    btn.addEventListener("click", () => {
      let removed = 0;
      for (const i of STORAGE_ITEMS) {
        const store = i.kind === "sessionStorage" ? sessionStorage : localStorage;
        try {
          if (store.getItem(i.key) !== null) {
            store.removeItem(i.key);
            removed += 1;
          }
        } catch (_) {
          /* приватный режим и запрет хранилища — удалять просто нечего */
        }
      }
      status.textContent = removed
        ? `${tr("ckClearDone")} (${removed})`
        : tr("ckClearEmpty");
      status.hidden = false;
    });
  }
})();
