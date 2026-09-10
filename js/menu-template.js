/* Gamarjoba — карточная разметка барной карты.
   Ни DOM, ни браузерных API, ни глобалей: всё приходит параметрами.

   Кухня на /menu — страницы бумажного меню картинками, вёрстки там нет.
   Здесь остались карточки бара: name/ru через L(), variants — [{v, p}].

   createMenuTemplate({ lang, langs, ui, allergens }) ->
     { renderItem, renderNav, renderSections } */

/* Значки аллергенов — контурные, в круге, как на странице-легенде макета */
const ALLERGEN_ICONS = {
  egg: '<path d="M12 3c3.3 0 5.8 5 5.8 9.1A5.8 5.8 0 0 1 12 18a5.8 5.8 0 0 1-5.8-5.9C6.2 8 8.7 3 12 3Z"/>',
  lactose: '<path d="M9.5 2.6h5v2.3l2 3.4V21h-9V8.3l2-3.4V2.6Z"/><path d="M7.5 11.5h9"/>',
  gluten:
    '<path d="M12 21V7"/><path d="M12 8.5c-2.6 0-4-1.6-4-3.6 2.6 0 4 1.6 4 3.6Zm0 0c2.6 0 4-1.6 4-3.6-2.6 0-4 1.6-4 3.6Z"/><path d="M12 13.5c-2.6 0-4-1.6-4-3.6 2.6 0 4 1.6 4 3.6Zm0 0c2.6 0 4-1.6 4-3.6-2.6 0-4 1.6-4 3.6Z"/><path d="M12 18.5c-2.6 0-4-1.6-4-3.6 2.6 0 4 1.6 4 3.6Zm0 0c2.6 0 4-1.6 4-3.6-2.6 0-4 1.6-4 3.6Z"/>',
  nuts:
    '<path d="M12 3c4 0 7 3.4 7 7.6 0 5-3.4 10.4-7 10.4S5 15.6 5 10.6C5 6.4 8 3 12 3Z"/><path d="M12 4v16"/><path d="M9 6.5c1 2.6 1 8.4 0 11M15 6.5c-1 2.6-1 8.4 0 11"/>',
  fish:
    '<path d="M3.5 12c2.6-3.6 6-5.4 9.4-5.4 3.6 0 6.2 2.2 7.6 5.4-1.4 3.2-4 5.4-7.6 5.4-3.4 0-6.8-1.8-9.4-5.4Z"/><path d="m3.5 12-.1-3.6L6.6 10M3.5 12l-.1 3.6L6.6 14"/><circle cx="16.4" cy="10.6" r="1"/>',
  crustaceans:
    '<g stroke-width="1.8"><path d="M17 7.5C11 7 6 10 6 14c0 2.5 2 4.4 5 5"/><path d="M11 19c-.3 1.6.2 3 1.4 4M13.8 18.7c.8 1.4 2 2.4 3.6 2.9"/></g><path d="m17 7.5 4-3 .4 5.2z" fill="currentColor" stroke="none"/><circle cx="14" cy="9.4" r="1.2" fill="currentColor" stroke="none"/>',
};

function allergenIcon(key, label) {
  const d = ALLERGEN_ICONS[key];
  if (!d) return "";
  return `<span class="allerg" data-allerg="${key}" title="${label}" aria-label="${label}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg></span>`;
}

function createMenuTemplate({ lang, langs, ui, allergens }) {
  /* те же T() и tr(), что в i18n.js, но с явным языком вместо глобали */
  const T = (v) => (v == null ? "" : typeof v === "string" ? v : (v[lang] ?? v.ru ?? ""));
  const tr = (key) => T(ui[key]);
  const esc = (s) => String(s).replace(/"/g, "&quot;");

  const allergName = (key) => {
    const a = (allergens || []).find((x) => x.key === key);
    return a ? `${a.ro} · ${T(a)}` : key;
  };

  /* Подзаголовок плашки. Кухня повторяет печать: крупно румынское название,
     под ним два других языка. Бар пока живёт по-старому — крупно выбранный. */
  function sectionTitles(s, isBar) {
    if (isBar || typeof s.title === "string") {
      return { main: T(s.title), sub: subLangs(s.title, s.ro) };
    }
    return { main: s.title.ro, sub: [s.title.ru, s.title.en].filter(Boolean).join(" • ") };
  }

  function subLangs(title, roFallback) {
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
  function renderItem(item, sectionId, itemIdx, extraClass = "") {
    const slug = item.slug || "";
    const dishHref = slug ? `/dish/${slug}/` : "";
    const name = T(item.name);
    const desc = T(item.desc || item.ru);
    const alt = item.alt ? " · " + T(item.alt) : "";
    const itemId = `${sectionId}:${name}`;
    const allergKeys = item.a || [];

    const allergRow = allergKeys.length
      ? `<div class="menu-item__allerg">${allergKeys
          .map((k) => allergenIcon(k, esc(allergName(k))))
          .join("")}</div>`
      : "";

    /* сноска со звёздочкой: помечаем цену и печатаем текст под описанием */
    const star = item.note ? '<sup class="menu-item__star-note">*</sup>' : "";
    const note = item.note ? `<p class="menu-item__note">${T(item.note)}</p>` : "";

    /* граммовка у позиций с вариантами идёт строкой над списком цен —
       как в макете: «270g (3 buc) 80 mdl / (la tigaie) 85 mdl» */
    const hasVariants = Boolean(item.variants);
    const preMeta =
      hasVariants && item.w
        ? `<p class="menu-item__meta menu-item__meta--pre">${item.w}</p>`
        : "";

    const variants = hasVariants
      ? `<ul class="menu-item__variants">${item.variants
          .map((v) => {
            const label = v.label != null ? v.label : T(v.v);
            const vw = v.w ? `<em class="menu-item__vw">${v.w}</em>` : "";
            const text = label
              ? v.slug
                ? `<a href="/dish/${v.slug}/">${label}</a>`
                : label
              : v.w || "";
            const detail = [label, v.w].filter(Boolean).join(" · ");
            return `<li${v.slug ? ` data-href="/dish/${v.slug}/"` : ""}>
            <span>${text}</span>${label ? vw : ""}<i class="menu-item__dots"></i><b>${v.p}</b>
            <button class="add-btn" data-id="${esc(itemId)} — ${esc(detail)}" data-name="${esc(name)}" data-detail="${esc(detail)}" data-price="${v.p}" aria-label="+">+</button>
          </li>`;
          })
          .join("")}</ul>`
      : "";

    /* подпункты с общей ценой — соусы */
    const children = item.children
      ? `<ul class="menu-item__children">${item.children
          .map(
            (c) => `<li>
            <b>${T(c.name)}</b>
            <span>${T(c.desc || c.ru)}</span>
          </li>`
          )
          .join("")}</ul>`
      : "";

    const price =
      item.p != null
        ? `<span class="menu-item__price">${item.p}<small> mdl</small>${star}</span>
         <button class="add-btn" data-id="${esc(itemId)}" data-name="${esc(name)}" data-detail="${esc(item.w || "")}" data-price="${item.p}" aria-label="+">+</button>`
        : "";

    const media = item.img
      ? `<div class="menu-item__media"><img class="menu-item__thumb" src="${item.img}" alt="${esc(name)}" loading="lazy" /></div>`
      : `<div class="menu-item__media menu-item__media--empty" aria-hidden="true"><span class="menu-item__ph"></span></div>`;

    const badge = item.badge
      ? `<span class="menu-item__badge">${T(item.badge)}</span>`
      : "";

    /* кликается только карточка со своей страницей */
    const linkAttr = slug ? ` data-href="${dishHref}"` : "";
    /* медиа-колонка есть всегда: фото либо плейсхолдер того же размера,
       иначе карточка выпала бы из чередования «фото слева / справа» */
    const cls = [
      "menu-item",
      "reveal" + extraClass,
      slug ? "menu-item--link" : "",
      "menu-item--has-img",
      item.img ? "" : "menu-item--no-photo",
    ]
      .filter(Boolean)
      .join(" ");

    return `
    <div${linkAttr} data-a="${allergKeys.join(" ")}" data-search="${esc(name.toLowerCase())}" class="${cls}">
      ${media}
      <div class="menu-item__body">
        <div class="menu-item__head">
          <span class="menu-item__name">${slug ? `<a href="${dishHref}">${name}</a>` : name}</span>
          <i class="menu-item__orn" aria-hidden="true"></i>
        </div>
        ${badge}
        ${allergRow}
        ${desc || alt ? `<p class="menu-item__ru">${desc}${alt}</p>` : ""}
        ${note}
        ${children}
        ${preMeta}
        ${variants}
        ${(item.w && !preMeta) || price ? `<div class="menu-item__foot">
          <span class="menu-item__meta">${preMeta ? "" : item.w || ""}</span>
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
          `<a class="menu-nav__chip${isBar ? " menu-nav__chip--bar" : ""}" href="#${s.id}" data-section="${s.id}">${sectionTitles(s, isBar).main}</a>`
      )
      .join("");
  }

  /* ── Разделы со всеми позициями ── */
  function renderSections(data, isBar, extraClass = "") {
    return data
      .map((s, i) => {
        const t = sectionTitles(s, isBar);
        return `
    <section class="menu-section${isBar ? " menu-section--bar" : ""}" id="${s.id}">
      <header class="menu-section__head reveal${extraClass}">
        <div class="menu-section__band">
          <span class="menu-section__num">${String(i + 1).padStart(2, "0")}</span>
          <h2 class="menu-section__title">${t.main}</h2>
          <p class="menu-section__ro">${t.sub}</p>
        </div>
      </header>
      ${s.note ? `<p class="menu-section__note reveal${extraClass}">${T(s.note)}</p>` : ""}
      <div class="menu-section__items">
        ${s.items.map((it, ii) => renderItem(it, s.id, ii, extraClass)).join("")}
      </div>
    </section>`;
      })
      .join("");
  }

  return {
    T,
    tr,
    sectionTitles,
    renderItem,
    renderNav,
    renderSections,
  };
}
