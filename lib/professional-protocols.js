import { selectProducts } from './product-selector.js'

function normalizeLang(lang = 'DE') {
  const value = String(lang).toUpperCase()
  if (value === 'RU') return 'RU'
  if (value === 'EN') return 'EN'
  return 'DE'
}

function t(lang, ru, de, en) {
  if (lang === 'RU') return ru
  if (lang === 'EN') return en
  return de
}

function clean(list = []) {
  return list.filter(Boolean)
}

function step(product, lang, fallback = {}) {
  if (!product) return null

  return {
    ref: product.ref || '',
    name: product.name || '',
    line: product.line || '',
    step: product.step || fallback.step || '',
    category: product.category || '',
    phase: product.phase || '',

    purpose: product.purpose || fallback.purpose || '',
    instruction: product.purpose || fallback.purpose || '',

    quantity:
      fallback.quantity ||
      t(lang, 'По необходимости', 'Nach Bedarf', 'As needed'),

    amount:
      fallback.quantity ||
      t(lang, 'По необходимости', 'Nach Bedarf', 'As needed'),

    exposure: fallback.exposure || '',
    removal: fallback.removal || '',
    note: fallback.note || '',
  }
}

function detectVariant(input, selected, lang) {
  const goal = selected?.context?.goal || 'hydration'
  const mainLine = selected?.recommendedLines?.[0] || 'GLACIAR'

  const names = {
    hydration: t(lang, 'Интенсивное увлажнение', 'Intensive Hydration', 'Intensive Hydration'),
    lifting: t(lang, 'Лифтинг и упругость', 'Lifting & Firming', 'Lifting & Firming'),
    anti_age: t(lang, 'Антивозрастная коррекция', 'Anti-Aging Correction', 'Anti-Aging Correction'),
    pigmentation: t(lang, 'Коррекция пигментации', 'Pigment Correction', 'Pigmentation Correction'),
    acne: t(lang, 'Чистая кожа / себорегуляция', 'Clear Skin / Seboregulation', 'Clear Skin / Seboregulation'),
    sensitive: t(lang, 'Восстановление барьера', 'Barrier Recovery', 'Barrier Recovery'),
    glow: t(lang, 'Сияние кожи', 'Glow Treatment', 'Glow Treatment'),
  }

  return {
    variantId: `${mainLine}_${goal}`.toUpperCase().replace(/\s+/g, '_'),
    variantName: names[goal] || names.hydration,
  }
}

function buildCourse(input, selected, lang) {
  const goal = selected?.context?.goal || 'hydration'

  if (goal === 'lifting' || goal === 'anti_age') {
    return {
      frequency: t(lang, '4 процедуры, каждые 14–21 день', '4 Behandlungen, alle 14–21 Tage', '4 treatments, every 14–21 days'),
      note: t(lang, 'Курс направлен на упругость, плотность и возрастную коррекцию кожи.', 'Der Kurs zielt auf Festigkeit, Dichte und Anti-Aging-Korrektur ab.', 'The course targets firmness, density and age-related correction.'),
    }
  }

  if (goal === 'pigmentation') {
    return {
      frequency: t(lang, '4–6 процедур, каждые 14 дней', '4–6 Behandlungen, alle 14 Tage', '4–6 treatments, every 14 days'),
      note: t(lang, 'Обязательна ежедневная SPF-защита.', 'Täglicher SPF-Schutz ist obligatorisch.', 'Daily SPF protection is mandatory.'),
    }
  }

  if (goal === 'acne') {
    return {
      frequency: t(lang, '4 процедуры, каждые 7–14 дней', '4 Behandlungen, alle 7–14 Tage', '4 treatments, every 7–14 days'),
      note: t(lang, 'Интенсивность адаптировать к воспалению и чувствительности кожи.', 'Die Intensität an Entzündung und Empfindlichkeit anpassen.', 'Adjust intensity to inflammation and sensitivity.'),
    }
  }

  return {
    frequency: t(lang, '4 процедуры, каждые 7–14 дней', '4 Behandlungen, alle 7–14 Tage', '4 treatments, every 7–14 days'),
    note: t(lang, 'Курс направлен на восстановление увлажнённости, комфорта и свежести кожи.', 'Der Kurs zielt auf Feuchtigkeit, Komfort und Frische ab.', 'The course restores hydration, comfort and freshness.'),
  }
}

function buildProtocolSteps(input, selected, lang) {
  const p = selected.protocolProducts || {}

  const cleansing = p.cleansing?.[0]
  const toning = p.toning?.[0]
  const peeling = p.peeling?.[0]
  const active = p.active || []
  const mask = p.mask?.[0]
  const final = p.final?.[0]
  const protection = p.protection?.[0]

  return {
    preparation: clean([
      step(cleansing, lang, {
        step: t(lang, 'Очищение', 'Reinigung', 'Cleansing'),
        quantity: t(lang, '4–6 нажатий / 3–5 мл', '4–6 Pumpstöße / 3–5 ml', '4–6 pumps / 3–5 ml'),
        removal: t(lang, 'Смыть водой и высушить кожу.', 'Mit Wasser abnehmen und Haut trocknen.', 'Rinse with water and dry.'),
      }),

      step(toning, lang, {
        step: t(lang, 'Тонизация', 'Tonisierung', 'Toning'),
        quantity: t(lang, '3–5 нажатий', '3–5 Pumpstöße', '3–5 pumps'),
        removal: t(lang, 'Не смывать.', 'Nicht abspülen.', 'Do not rinse.'),
      }),
    ]),

    peeling: clean([
      step(peeling, lang, {
        step: t(lang, 'Пилинг', 'Peeling', 'Peeling'),
        quantity: t(lang, 'Около 5–10 мл', 'Ca. 5–10 ml', 'Approx. 5–10 ml'),
        exposure: t(lang, '3–10 минут по чувствительности кожи.', '3–10 Minuten je nach Hautempfindlichkeit.', '3–10 minutes depending on sensitivity.'),
        removal: t(lang, 'Смыть водой / удалить влажным полотенцем.', 'Mit Wasser abnehmen / mit feuchtem Tuch entfernen.', 'Rinse with water / remove with damp towel.'),
        note: t(lang, 'Пилинг всегда адаптировать к состоянию кожи.', 'Peeling immer an den Hautzustand anpassen.', 'Always adapt peeling to skin condition.'),
      }),
    ]),

    activePhase: clean(
      active.slice(0, 3).map((item) =>
        step(item, lang, {
          step: t(lang, 'Активная фаза', 'Aktive Phase', 'Active Phase'),
          quantity: t(lang, '1–3 мл / по необходимости', '1–3 ml / nach Bedarf', '1–3 ml / as needed'),
          exposure: t(lang, 'Массировать до впитывания.', 'Bis zur Aufnahme einmassieren.', 'Massage until absorbed.'),
          removal: t(lang, 'Не смывать.', 'Nicht abspülen.', 'Do not rinse.'),
        })
      )
    ),

    mask: clean([
      step(mask, lang, {
        step: t(lang, 'Маска', 'Maske', 'Mask'),
        quantity: t(lang, 'Около 15 мл', 'Ca. 15 ml', 'Approx. 15 ml'),
        exposure: t(lang, '10–15 минут.', '10–15 Minuten.', '10–15 minutes.'),
        removal: t(lang, 'Смыть водой / удалить влажным полотенцем, если не указано иначе.', 'Mit Wasser oder feuchtem Tuch entfernen, falls nicht anders angegeben.', 'Remove with water or damp towel unless otherwise stated.'),
      }),
    ]),

    finish: clean([
      step(final, lang, {
        step: t(lang, 'Финальный крем', 'Abschlusspflege', 'Final Care'),
        quantity: t(lang, '1–2 мл', '1–2 ml', '1–2 ml'),
        removal: t(lang, 'Не смывать.', 'Nicht abspülen.', 'Do not rinse.'),
      }),

      step(protection, lang, {
        step: t(lang, 'SPF-защита', 'SPF-Schutz', 'SPF Protection'),
        quantity: t(lang, 'Достаточное количество', 'Ausreichende Menge', 'Sufficient amount'),
        removal: t(lang, 'Не смывать.', 'Nicht abspülen.', 'Do not rinse.'),
      }),
    ]),
  }
}

export function buildProfessionalProtocol(input = {}) {
  const lang = normalizeLang(input.lang)
  const selected = selectProducts(input)

  const mainLine = selected.recommendedLines?.[0] || 'GLACIAR'
  const supportLines = selected.recommendedLines?.slice(1, 4) || []

  const variant = detectVariant(input, selected, lang)
  const course = buildCourse(input, selected, lang)
  const steps = buildProtocolSteps(input, selected, lang)

  const phases = [
    {
      title: t(lang, 'Подготовка кожи', 'Hautvorbereitung', 'Skin Preparation'),
      steps: steps.preparation,
    },
    {
      title: t(lang, 'Пилинг', 'Peeling', 'Peeling'),
      steps: steps.peeling,
    },
    {
      title: t(lang, 'Активная фаза', 'Aktive Phase', 'Active Phase'),
      steps: steps.activePhase,
    },
    {
      title: t(lang, 'Маска', 'Maske', 'Mask'),
      steps: steps.mask,
    },
    {
      title: t(lang, 'Завершение и защита', 'Abschluss & Schutz', 'Finish & Protection'),
      steps: steps.finish,
    },
  ].filter((phase) => phase.steps?.length > 0)

  const protocol = {
    mainLine,
    supportLines,

    protocolType: t(
      lang,
      'Профессиональный протокол',
      'Professionelles Protokoll',
      'Professional Protocol'
    ),

    variantName: variant.variantName,
    course: course.frequency,
    courseNote: course.note,

    phases,

    preparation: steps.preparation,
    skinPreparation: steps.preparation,
    preparationPhase: steps.preparation,

    peeling: steps.peeling,
    peelingPhase: steps.peeling,
    exfoliation: steps.peeling,

    activePhase: steps.activePhase,
    active: steps.activePhase,

    mask: steps.mask,
    maskPhase: steps.mask,

    finish: steps.finish,
    finalPhase: steps.finish,
    finishAndProtection: steps.finish,

    homecare: selected.homecare,
    selectedProducts: selected.topProducts,

    homecareSupport: [
      mainLine,
      'SUMMESUN SPF50+',
    ],
  }

  return {
    decision: {
      mainLine,
      supportLines,
      reason: t(
        lang,
        'Главная линия выбрана по цели процедуры, а поддерживающие линии — по проблемам кожи.',
        'Die Hauptlinie wird nach dem Behandlungsziel gewählt, unterstützende Linien nach Hautproblemen.',
        'The main line is selected by treatment goal; support lines are selected by skin concerns.'
      ),
    },

    variant,
    protocol,
    treatment: protocol,
    recommendations: selected,
  }
}

export default buildProfessionalProtocol
