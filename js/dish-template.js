/* Gamarjoba — чистые функции разметки страницы блюда.
   Ни DOM, ни браузерных API, ни глобалей: всё приходит параметрами.
   Один и тот же код рисует блюдо в браузере (dish.js) и собирает
   статические страницы /dish/<slug>/ (scripts/build-dishes.js) —
   второй копии шаблона нет.

   createDishTemplate({ lang, ui, allergens, dishes, dishOrder, sections,
                        menuFull, dishFull })
     lang       — "ru" | "ro" | "en"
     ui         — объект UI из i18n.js
     allergens  — ALLERGEN_T из i18n.js
     dishes     — DISHES из data.js, dishOrder — DISH_ORDER оттуда же
     sections   — [...MENU, ...BAR] из menu-data.js
     menuFull   — MENU_FULL, dishFull — DISH_FULL из menu-full.js */

function createDishTemplate({ lang, ui, allergens, dishes, dishOrder, sections, menuFull, dishFull }) {
  /* те же T() и tr(), что в i18n.js, но с явным языком вместо глобали */
  const T = (v) => (v == null ? "" : typeof v === "string" ? v : (v[lang] ?? v.ru ?? ""));
  const tr = (key) => T(ui[key]);

  /* Страницы блюд лежат на уровень глубже (/dish/<slug>/), поэтому пути
     к ассетам — от корня. Из /dish они резолвятся ровно так же. */
  const asset = (p) => (!p || p.startsWith("/") || /^[a-z]+:/i.test(p) ? p : "/" + p);

  /* стабильный идентификатор позиции: своё поле slug либо id фирменного блюда */
  function itemSlug(item) {
    return (item && (item.slug || item.link)) || "";
  }

  /* канонический адрес страницы блюда */
  function dishHref(slug, fromMenu) {
    return slug ? `/dish/${slug}/${fromMenu ? "?back=menu" : ""}` : "";
  }

  /* поиск позиции по слагу — первое совпадение; дубли (Shurpa, Adjaruli,
     Mtsvadi встречаются в двух разделах) намеренно ведут на одну страницу */
  function findBySlug(slug) {
    if (!slug) return null;
    for (const sec of sections) {
      const idx = sec.items.findIndex((it) => itemSlug(it) === slug);
      if (idx !== -1) return { sec, item: sec.items[idx], idx };
    }
    return null;
  }

  function getDish(id) {
    return dishes.find((d) => d.id === id) || null;
  }

  /* ключ полного описания — «раздел:название», как в menu-full.js.
     Берём исходное (румынское) написание, а не перевод: ключ не должен
     зависеть от выбранного языка. */
  function fullKey(sec, item) {
    return `${sec.id}:${typeof item.name === "string" ? item.name : item.name.ro}`;
  }

  /* ── Полное описание из печатного меню: RO / RU / EN подряд ── */
  function fullBlock(data, extraClass = "") {
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
    return rows ? `<div class="dish-full reveal${extraClass}">${rows}</div>` : "";
  }

  /* ── Режим 1: фирменное блюдо с полным описанием ──
     extraClass — дополнительные классы (статике нужен is-visible,
     иначе .reveal оставит блок при opacity: 0 до появления наблюдателя) */
  function renderRich(dish, { fromMenu = false, extraClass = "" } = {}) {
    const idx = dishOrder.indexOf(dish.id);
    const next = getDish(dishOrder[(idx + 1) % dishOrder.length]);

    const allergenList = dish.allergens.length
      ? `<div class="dish-allergens">${dish.allergens.map((a) => `<span>${T(allergens[a]) || a}</span>`).join("")}</div>`
      : `<div class="dish-allergens"><span>${tr("dishNoAllergens")}</span></div>`;

    return `
  <section class="dish-hero">
    <div class="dish-hero__art" id="dishArt"><img src="${asset(dish.img)}" alt="${dish.name} — ${T(dish.tagline)}" /></div>
    <div>
      <p class="dish-hero__cat reveal${extraClass}">${T(dish.category)} · № ${String(idx + 1).padStart(2, "0")}</p>
      <h1 class="dish-hero__name reveal${extraClass}">${dish.name}</h1>
      <p class="dish-hero__ru reveal${extraClass}" lang="ka">${dish.ka}</p>
      <p class="dish-hero__tagline reveal${extraClass}">${T(dish.tagline)}</p>
      ${fullBlock(dishFull ? dishFull[dish.id] : null, extraClass)}
      <div class="dish-hero__meta reveal${extraClass}">
        <div><span>${tr("dishWeight")}</span><strong>${dish.weight}</strong></div>
        <div><span>${tr("dishPrice")}</span><strong>${dish.price}</strong></div>
      </div>
      <button class="dish-hero__add reveal${extraClass}" id="dishAdd">${tr("dishAdd")} · ${dish.price}</button>
    </div>
  </section>

  <section class="dish-body">
    <div class="dish-body__desc reveal-lines${extraClass}">
      <h2>${tr("dishAbout")}</h2>
      <p>${T(dish.description)}</p>
      ${allergenList}
    </div>
    <div class="dish-body__ritual reveal${extraClass}">
      <h2>${tr("dishHow")}</h2>
      <p>${T(dish.ritual)}</p>
    </div>
  </section>

  <a class="dish-next" href="${dishHref(next.id, fromMenu)}">
    <span>${tr("dishNext")}</span>
    <strong>${next.name} →</strong>
  </a>`;
  }

  /* ── Режим 2: любая позиция меню ── */
  function renderMenuItem(sec, item, idx, { fromMenu = false, extraClass = "" } = {}) {
    const name = T(item.name);
    const desc = T(item.ru);
    const full = menuFull ? menuFull[fullKey(sec, item)] : null;

    /* следующее блюдо с фото в этом же разделе */
    let nextHtml = "";
    const n = sec.items.length;
    for (let step = 1; step < n; step++) {
      const j = (idx + step) % n;
      if (sec.items[j].img) {
        nextHtml = `
      <a class="dish-next" href="${dishHref(itemSlug(sec.items[j]), fromMenu)}">
        <span>${tr("dishNext")}</span>
        <strong>${T(sec.items[j].name)} →</strong>
      </a>`;
        break;
      }
    }

    const meta = `
    <div class="dish-hero__meta reveal${extraClass}">
      ${item.w ? `<div><span>${tr("dishWeight")}</span><strong>${item.w}</strong></div>` : ""}
      ${item.p != null ? `<div><span>${tr("dishPrice")}</span><strong>${item.p} MDL</strong></div>` : ""}
    </div>`;

    const addBtn =
      item.p != null
        ? `<button class="dish-hero__add reveal${extraClass}" id="dishAdd">${tr("dishAdd")} · ${item.p} MDL</button>`
        : "";

    const variants = item.variants
      ? `
  <section class="dish-body dish-body--single">
    <div class="dish-body__desc reveal${extraClass}">
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

    return `
  <section class="dish-hero">
    <div class="dish-hero__art" id="dishArt">${item.img ? `<img src="${asset(item.img)}" alt="${name}" />` : ""}</div>
    <div>
      <p class="dish-hero__cat reveal${extraClass}">${T(sec.title)}</p>
      <h1 class="dish-hero__name reveal${extraClass}">${name}</h1>
      ${desc ? `<p class="dish-hero__tagline reveal${extraClass}">${desc}</p>` : ""}
      ${fullBlock(full, extraClass)}
      ${meta}
      ${addBtn}
    </div>
  </section>
  ${variants}
  ${nextHtml}`;
  }

  /* ── Разметка по слагу: сама выбирает режим ──
     Возвращает null, если такого блюда нет. */
  function renderBySlug(slug, options) {
    const rich = getDish(slug);
    if (rich) return { html: renderRich(rich, options), dish: rich, kind: "rich" };
    const found = findBySlug(slug);
    if (!found) return null;
    return {
      html: renderMenuItem(found.sec, found.item, found.idx, options),
      ...found,
      kind: "item",
    };
  }

  /* ── Данные для <head>: заголовок, описание, фотография ──
     Описание берём из печатного меню (одна фраза, как раз под сниппет),
     иначе — короткую строку из menu-data.js. */
  function metaBySlug(slug) {
    const rich = getDish(slug);
    if (rich) {
      const full = dishFull && dishFull[rich.id];
      return {
        name: rich.name,
        description: (full && T(full)) || T(rich.tagline),
        image: asset(rich.img),
      };
    }
    const found = findBySlug(slug);
    if (!found) return null;
    const full = menuFull && menuFull[fullKey(found.sec, found.item)];
    return {
      name: T(found.item.name),
      description: (full && T(full)) || T(found.item.ru),
      image: asset(found.item.img),
    };
  }

  return {
    T,
    tr,
    asset,
    itemSlug,
    dishHref,
    findBySlug,
    getDish,
    fullBlock,
    renderRich,
    renderMenuItem,
    renderBySlug,
    metaBySlug,
  };
}
