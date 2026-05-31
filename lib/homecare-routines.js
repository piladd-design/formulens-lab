import { products } from './products.js'

function includesAny(text, words) {
  return words.some((word) => text.includes(word))
}

function product(key) {
  const p = products[key]
  if (!p) return null

  return {
    ref: p.ref,
    name: p.name,
    line: p.line,
    step: p.step,
    purpose: p.purpose,
  }
}

function clean(list) {
  return [...new Set(list.filter(Boolean))]
}

function langText(lang, ru, de, en) {
  if (lang === 'RU') return ru
  if (lang === 'EN') return en
  return de
}

export function buildHomecareRecommendation(data) {
  const lang = data.lang || 'DE'

  const skinType = String(data.skinType || '').toLowerCase()
  const sensitivity = String(data.sensitivity || '').toLowerCase()
  const concerns = String(data.concerns || '').toLowerCase()
  const goal = String(data.goal || '').toLowerCase()
  const age = Number(data.age || 0)

  const text = `${skinType} ${sensitivity} ${concerns} ${goal}`

  const isDry = includesAny(text, [
    'dry',
    'trocken',
    'сух',
    'сухая',
    'обезвож',
    'dehydrated',
    'feuchtigkeitsarm',
  ])

  const isSensitive = includesAny(text, [
    'sensitive',
    'sensibel',
    'empfindlich',
    'чувств',
    'средн',
    'высок',
    'reactive',
    'покрас',
    'redness',
    'rötung',
  ])

  const hasWrinkles = includesAny(text, [
    'wrinkle',
    'wrinkles',
    'falten',
    'морщ',
    'anti-age',
    'antiaging',
    'aging',
    'омолож',
    'лифтинг',
    'упруг',
    'firmness',
  ])

  const hasPigmentation = includesAny(text, [
    'pigment',
    'pigmentation',
    'пигмент',
    'пятн',
    'flecken',
    'dark spot',
    'spot',
    'melasma',
  ])

  const hasAcne = includesAny(text, [
    'acne',
    'akne',
    'акне',
    'прыщ',
    'воспал',
    'unrein',
    'pickel',
    'blemish',
  ])

  const isOily = includesAny(text, [
    'oily',
    'fettig',
    'жир',
    'жирная',
    'sebum',
    'talg',
  ])

  let primaryLine = 'GLACIAR'
  const supportLines = []

  // Главная проблема имеет приоритет над типом кожи
  if (hasWrinkles || age >= 45) {
    primaryLine = 'CELL'
  }

  if (hasPigmentation) {
    primaryLine = 'BECLARITY'
  }

  if (hasAcne || isOily) {
    primaryLine = 'BALANCE'
  }

  if (isDry && primaryLine !== 'GLACIAR') supportLines.push('GLACIAR')
  if (isSensitive && primaryLine !== 'NICELY') supportLines.push('NICELY')
  if ((hasWrinkles || age >= 45) && primaryLine !== 'CELL') supportLines.push('CELL')
  if (hasPigmentation && primaryLine !== 'BECLARITY') supportLines.push('BECLARITY')

  supportLines.push('SUMMESUN')

  const lines = clean([primaryLine, ...supportLines])

  let morning = []
  let evening = []
  let weeklySupport = []
  let priorities = []
  let avoid = []

  if (primaryLine === 'CELL') {
    morning = [
      product('cell_activator_serum'),
      product('cell_vitality_cream'),
      product('summsun_spf50_sensitive'),
    ]

    evening = [
      product('cell_activator_serum'),
      product('cell_vitality_cream'),
    ]

    if (isDry) {
      morning.push(product('hydraluronic_serum_gel'))
      evening.push(product('hydraluronic_serum_gel'))
    }

    priorities = [
      langText(lang, 'Коррекция морщин', 'Faltenkorrektur', 'Wrinkle correction'),
      langText(lang, 'Поддержка упругости кожи', 'Unterstützung der Hautfestigkeit', 'Firmness support'),
      langText(lang, 'Ежедневная SPF-защита', 'Täglicher UV-Schutz', 'Daily SPF protection'),
    ]

    avoid = [
      langText(lang, 'Не перегружать чувствительную кожу активами', 'Empfindliche Haut nicht mit Wirkstoffen überladen', 'Do not overload sensitive skin with actives'),
      langText(lang, 'Не пропускать SPF утром', 'SPF morgens nicht auslassen', 'Do not skip morning SPF'),
      langText(lang, 'Не менять уход слишком часто', 'Pflege nicht zu häufig wechseln', 'Do not change products too often'),
    ]
  }

  if (primaryLine === 'BECLARITY') {
    morning = [
      product('beclarity_clarifying_cleanser'),
      product('beclarity_blemish_corrector_serum'),
      product('beclarity_blemish_controller_spf50'),
    ]

    evening = [
      product('beclarity_clarifying_cleanser'),
      product('beclarity_dark_spot_eraser'),
      product('beclarity_blemish_corrector_serum'),
    ]

    if (isDry) {
      morning.push(product('hydraluronic_serum_gel'))
      evening.push(product('hydraluronic_serum_gel'))
    }

    if (hasWrinkles || age >= 45) {
      evening.push(product('cell_vitality_cream'))
    }

    weeklySupport = [
      product('summsun_spf50_cc'),
    ]

    priorities = [
      langText(lang, 'Коррекция пигментации', 'Pigmentkorrektur', 'Pigmentation correction'),
      langText(lang, 'Ровный тон кожи', 'Ebenmäßigerer Hautton', 'More even skin tone'),
      langText(lang, 'Строгая SPF-защита', 'Konsequenter täglicher UV-Schutz', 'Strict SPF protection'),
    ]

    avoid = [
      langText(lang, 'Солнце без SPF', 'Sonne ohne SPF', 'Sun without SPF'),
      langText(lang, 'Нерегулярный уход', 'Unregelmäßige Pflege', 'Inconsistent routine'),
      langText(lang, 'Слишком много осветляющих активов одновременно', 'Zu viele aufhellende Wirkstoffe gleichzeitig', 'Too many brightening actives at once'),
    ]
  }

  if (primaryLine === 'BALANCE') {
    morning = [
      product('balance_cleansing_mousse'),
      product('balance_balancing_lotion'),
      product('balance_pure_regulator'),
      product('summsun_spf50_sensitive'),
    ]

    evening = [
      product('balance_cleansing_mousse'),
      product('balance_balancing_lotion'),
      product('balance_pure_regulator'),
      product('balance_hydro_balance'),
    ]

    weeklySupport = [
      product('balance_drying_gel'),
    ]

    priorities = [
      langText(lang, 'Контроль себума', 'Sebumkontrolle', 'Sebum control'),
      langText(lang, 'Снижение воспалительных элементов', 'Reduktion von Unreinheiten', 'Reduce inflammatory elements'),
      langText(lang, 'Поддержка чистой текстуры кожи', 'Unterstützung eines klareren Hautbildes', 'Support clearer skin texture'),
    ]

    avoid = [
      langText(lang, 'Плотные жирные кремы', 'Schwere okklusive Cremes', 'Heavy occlusive creams'),
      langText(lang, 'Агрессивные скрабы', 'Aggressive Scrubs', 'Aggressive scrubs'),
      langText(lang, 'Слишком много активов одновременно', 'Zu viele Wirkstoffe gleichzeitig', 'Too many actives at once'),
    ]
  }

  if (primaryLine === 'NICELY') {
    morning = [
      product('nicely_gentle_cleanser'),
      product('nicely_sweet_toner'),
      product('nicely_hydration_serum'),
      product('nicely_hydration_cream'),
      product('nicely_smooth_final_spf50'),
    ]

    evening = [
      product('nicely_gentle_cleanser'),
      product('nicely_sweet_toner'),
      product('nicely_hydration_serum'),
      product('nicely_hydration_cream'),
    ]

    priorities = [
      langText(lang, 'Восстановление барьера', 'Barrierestärkung', 'Barrier support'),
      langText(lang, 'Снижение чувствительности', 'Reduktion der Empfindlichkeit', 'Reduce sensitivity'),
      langText(lang, 'Комфорт и увлажнение', 'Komfort und Feuchtigkeit', 'Comfort and hydration'),
    ]

    avoid = [
      langText(lang, 'Сильные кислоты', 'Starke Säuren', 'Strong acids'),
      langText(lang, 'Ретиноидная перегрузка', 'Retinoid-Überlastung', 'Retinoid overload'),
      langText(lang, 'Частое отшелушивание', 'Zu häufiges Peeling', 'Frequent exfoliation'),
    ]
  }

  if (primaryLine === 'GLACIAR') {
    morning = [
      product('glaciar_cleansing_milk'),
      product('glaciar_soft_lotion'),
      product('hydraluronic_serum_gel'),
      product(isDry ? 'glaciar_plus_hydration_cream' : 'glaciar_hydration_cream'),
      product('summsun_spf50_sensitive'),
    ]

    evening = [
      product('glaciar_cleansing_milk'),
      product('glaciar_soft_lotion'),
      product('hydraluronic_serum_gel'),
      product(isDry ? 'glaciar_plus_hydration_cream' : 'glaciar_hydration_cream'),
    ]

    weeklySupport = [
      product('hydro_repairer_serum'),
    ]

    priorities = [
      langText(lang, 'Глубокое увлажнение', 'Tiefenhydration', 'Deep hydration'),
      langText(lang, 'Комфорт кожи', 'Hautkomfort', 'Skin comfort'),
      langText(lang, 'Поддержка барьера', 'Barrierestärkung', 'Barrier support'),
    ]

    avoid = [
      langText(lang, 'Пересушивающее очищение', 'Austrocknende Reinigung', 'Over-cleansing'),
      langText(lang, 'Спиртовые формулы', 'Alkoholreiche Formulierungen', 'Alcohol-heavy formulas'),
      langText(lang, 'Сыворотка без крема сверху', 'Serum ohne abschließende Creme', 'Serum without cream on top'),
    ]
  }

  return {
    strategy: lines.join(' + '),
    primaryLine,
    secondaryLines: clean(supportLines),
    lines,
    priorities: clean(priorities),
    morning: morning.filter(Boolean),
    evening: evening.filter(Boolean),
    weeklySupport: weeklySupport.filter(Boolean),
    avoid: clean(avoid),
  }
}
