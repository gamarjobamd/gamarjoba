/* Gamarjoba — чистые функции разметки меню.
   Ни DOM, ни браузерных API, ни глобалей: всё приходит параметрами.
   Один и тот же код собирает меню в браузере (menu.js) и статику
   при сборке (tools/build-menu.mjs) — второй копии шаблона нет.

   createMenuTemplate({ lang, langs, ui, badges }) -> { renderItem, renderNav, renderSections }
     lang   — "ru" | "ro" | "en"
     langs  — I18N_LANGS из i18n.js
     ui     — объект UI из i18n.js (для подписей бейджей)
     badges — BADGE_T из i18n.js: ключ бейджа -> ключ строки в UI */

function createMenuTemplate({ lang, langs, ui, badges }) {
  /* те же T() и tr(), что в i18n.js, но с явным языком вместо глобали */
  const T = (v) => (v == null ? "" : typeof v === "string" ? v : (v[lang] ?? v.ru ?? ""));
  const tr = (key) => T(ui[key]);

  /* Подзаголовок плашки: два других языка через «•», как в печатном меню,
     где под названием раздела идут остальные две строки. */
  function otherLangs(title, roFallback) {
    if (!title || typeof title === "string") return roFallback || "";
    return langs
      .filter((l) => l !== lang)
      .map((l) => title[l])
      .filter(Boolean)
      .join(" • ");
  }

  /* ── Рендер одной позиции ──
     extraClass — дополнительные классы карточки (статике нужен is-visible,
     иначе .reveal оставит её при opacity: 0 до появления наблюдателя) */
  function renderItem(item, sectionTitle, itemIdx, extraClass = "") {
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
    const photoAttrs = item.img && !item.link ? ` data-href="${dishHref}"` : "";
    const media = item.img
      ? `<div class="menu-item__media"><img class="menu-item__thumb" src="${item.img}" alt="${name}" loading="lazy" /></div>`
      : "";
    /* бейдж-отличие из печатного меню: особый выбор, легенда, классика, хит */
    const badge =
      item.badge && badges[item.badge]
        ? `<span class="menu-item__badge">${tr(badges[item.badge])}</span>`
        : "";
    return `
    <div${linkAttr}${photoAttrs} class="menu-item reveal${extraClass}${item.link ? " menu-item--link" : ""}${item.img && !item.link ? " menu-item--photo" : ""}${item.img ? " menu-item--has-img" : ""}">
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

  /* ── Чипы разделов ── */
  function renderNav(data, isBar) {
    return data
      .map(
        (s) =>
          `<a class="menu-nav__chip${isBar ? " menu-nav__chip--bar" : ""}" href="#${s.id}" data-section="${s.id}">${T(s.title)}</a>`
      )
      .join("");
  }

  /* ── Разделы со всеми позициями ── */
  function renderSections(data, isBar, extraClass = "") {
    return data
      .map(
        (s, i) => `
    <section class="menu-section${isBar ? " menu-section--bar" : ""}" id="${s.id}">
      <header class="menu-section__head reveal${extraClass}">
        <div class="menu-section__band">
          <span class="menu-section__num">${String(i + 1).padStart(2, "0")}</span>
          <h2 class="menu-section__title">${T(s.title)}</h2>
          <p class="menu-section__ro">${otherLangs(s.title, s.ro)}</p>
        </div>
      </header>
      ${s.note ? `<p class="menu-section__note reveal${extraClass}">${T(s.note)}</p>` : ""}
      <div class="menu-section__items">
        ${s.items.map((it, ii) => renderItem(it, s.id, ii, extraClass)).join("")}
      </div>
    </section>`
      )
      .join("");
  }

  return { T, tr, otherLangs, renderItem, renderNav, renderSections };
}
