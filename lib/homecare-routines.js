import { products } from './products.js'

function has(text, words) {
  return words.some((word) => text.includes(word))
}

function product(key) {
  const p = products[key]
  if (!p) return null

  return {
    name: p.name,
    line: p.line,
    step: p.step,
    purpose: p.purpose,
  }
}

function clean(list) {
  return [...new Set(list.filter(Boolean))]
}

const dict = {
  DE: {
    cleanser: 'Reinigung',
    lotion: 'Tonisierung',
    serum: 'Serum',
    cream: 'Pflege',
    protection: 'Schutz',
    pigmentationSupport: 'Pigmentkorrektur',
    hydrationSupport: 'Feuchtigkeitsaufbau',
    antiAgeSupport: 'Anti-Aging-Unterstützung',
    barrierSupport: 'Barrierestärkung',
    avoidSun: 'Sonne ohne SPF vermeiden',
    avoidOverload: 'Nicht zu viele aktive Wirkstoffe gleichzeitig verwenden',
    avoidAggressive: 'Aggressive Peelings und Scrubs vermeiden',
  },
  RU: {
    cleanser: 'Очищение',
    lotion: 'Тонизация',
    serum: 'Сыворотка',
    cream: 'Крем',
    protection: 'Защита',
    pigmentationSupport: 'Коррекция пигментации',
    hydrationSupport: 'Восстановление увлажнённости',
    antiAgeSupport: 'Anti-Age поддержка',
    barrierSupport: 'Поддержка кожного барьера',
    avoidSun: 'Не выходить на солнце без SPF',
    avoidOverload: 'Не перегружать кожу большим количеством активов',
    avoidAggressive: 'Избегать агрессивных пилингов и скрабов',
  },
  EN: {
    cleanser: 'Cleanser',
    lotion: 'Lotion',
    serum: 'Serum',
    cream: 'Cream',
    protection: 'Protection',
    pigmentationSupport: 'Pigmentation correction',
    hydrationSupport: 'Hydration support',
    antiAgeSupport: 'Anti-aging support',
    barrierSupport: 'Barrier support',
    avoidSun: 'Avoid sun exposure without SPF',
    avoidOverload: 'Avoid too many active ingredients at once',
    avoidAggressive: 'Avoid aggressive peels and scrubs',
  },
}

export function buildHomecareRecommendation(data) {
  const lang = data.lang || 'DE'
  const t = dict[lang] || dict.DE

  const skinType = String(data.skinType || '').toLowerCase()
  const sensitivity = String(data.sensitivity || '').toLowerCase()
  const concerns = String(data.concerns || '').toLowerCase()
  const goal = String(data.goal || '').toLowerCase()
  const age = Number(data.age || 0)

  const allText = `${skinType} ${sensitivity} ${concerns} ${goal}`

  const isDry = has(allText, ['dry', 'trocken', 'сух', 'сухая'])
  const isOily = has(allText, ['oily', 'fettig', 'жир', 'жирная'])
  const isSensitive = has(allText, [
    'sensitive',
    'sensibel',
    'empfindlich',
    'чувств',
    'средн',
    'высок',
    'reactive',
    'rötung',
    'redness',
    'покрас',
  ])
  const hasAcne = has(allText, [
    'acne',
    'akne',
    'акне',
    'unrein',
    'pickel',
    'воспал',
    'прыщ',
  ])
  const hasPigmentation = has(allText, [
    'pigment',
    'пигмент',
    'пятн',
    'flecken',
    'spot',
    'dark',
    'melasma',
  ])
  const hasWrinkles = has(allText, [
    'wrinkle',
    'falten',
    'морщ',
    'anti-age',
    'antiaging',
    'aging',
    'омолож',
    'лифтинг',
  ])

  let primaryLine = 'GLACIAR'
  const secondaryLines = []

  if (hasPigmentation) {
    primaryLine = 'BECLARITY'
    if (isDry) secondaryLines.push('GLACIAR')
    if (hasWrinkles || age >= 45) secondaryLines.push('CELL')
    if (isSensitive) secondaryLines.push('NICELY')
  } else if (hasAcne || isOily) {
    primaryLine = 'BALANCE'
    if (isSensitive) secondaryLines.push('NICELY')
    if (isDry) secondaryLines.push('GLACIAR')
  } else if (isSensitive) {
    primaryLine = 'NICELY'
    if (isDry) secondaryLines.push('GLACIAR')
  } else if (hasWrinkles || age >= 45) {
    primaryLine = 'CELL'
    if (isDry) secondaryLines.push('GLACIAR')
  } else if (isDry) {
    primaryLine = 'GLACIAR'
  }

  const lines = clean([primaryLine, ...secondaryLines, 'SUMMESUN'])

  let morning = []
  let evening = []
  let weeklySupport = []
  let priorities = []

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

    weeklySupport = [
      product('summsun_spf50_cc'),
    ]

    priorities = [
      t.pigmentationSupport,
      t.hydrationSupport,
      t.protection,
    ]

    if (isDry) {
      morning.splice(1, 0, product('hydraluronic_serum_gel'))
      evening.splice(1, 0, product('hydraluronic_serum_gel'))
    }

    if (hasWrinkles || age >= 45) {
      evening.push(product('cell_vitality_cream'))
      priorities.push(t.antiAgeSupport)
    }

    if (isSensitive) {
      priorities.push(t.barrierSupport)
    }
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
      t.hydrationSupport,
      t.barrierSupport,
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
      lang === 'RU' ? 'Контроль себума' : lang === 'DE' ? 'Sebumkontrolle' : 'Sebum control',
      lang === 'RU' ? 'Снижение воспалительных элементов' : lang === 'DE' ? 'Reduktion von Unreinheiten' : 'Reduce inflammatory elements',
      t.barrierSupport,
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
      t.barrierSupport,
      t.hydrationSupport,
    ]
  }

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

    priorities = [
      t.antiAgeSupport,
      t.barrierSupport,
    ]
  }

  return {
    strategy: lines.join(' + '),
    primaryLine,
    secondaryLines,
    lines,
    priorities: clean(priorities),
    morning: morning.filter(Boolean),
    evening: evening.filter(Boolean),
    weeklySupport: weeklySupport.filter(Boolean),
    avoid: [
      t.avoidSun,
      t.avoidOverload,
      t.avoidAggressive,
    ],
  }
}
