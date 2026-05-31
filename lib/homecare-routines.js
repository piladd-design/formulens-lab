import { products } from './products.js'

function has(text, words) {
  return words.some((word) => text.includes(word))
}

function item(key) {
  const p = products[key]
  if (!p) return null
  return `${p.name} — ${p.step}`
}

function clean(list) {
  return [...new Set(list.filter(Boolean))]
}

export function buildHomecareRecommendation(data) {
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
    'reactive',
    'реактив',
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
    'flecken',
    'spot',
    'dark',
    'пятн',
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

  const lines = []

  if (hasAcne || isOily) lines.push('BALANCE')
  if (isSensitive) lines.push('NICELY')
  if (isDry || has(allText, ['hydration', 'feuchtigkeit', 'увлаж'])) {
    lines.push('GLACIAR')
  }
  if (hasPigmentation) lines.push('BECLARITY')
  if (hasWrinkles || age >= 40) lines.push('CELL')
  if (has(allText, ['glow', 'vitamin c', 'сиян', 'туск'])) lines.push('CELL C')

  if (!lines.length) lines.push('GLACIAR')

  const uniqueLines = clean(lines)

  const primary = uniqueLines[0]
  const secondary = uniqueLines.slice(1, 3)

  let morning = []
  let evening = []
  let weeklySupport = []
  let priorities = []
  let avoid = []

  if (primary === 'BALANCE') {
    morning = [
      item('balance_cleansing_mousse'),
      item('balance_balancing_lotion'),
      item('balance_pure_regulator'),
      item('summsun_spf50_sensitive'),
    ]
    evening = [
      item('balance_cleansing_mousse'),
      item('balance_balancing_lotion'),
      item('balance_pure_regulator'),
      item('balance_hydro_balance'),
    ]
    weeklySupport = [item('balance_drying_gel')]
    priorities = [
      'Sebum control',
      'Reduce inflammatory elements',
      'Support clearer skin texture',
    ]
    avoid = [
      'Aggressive scrubs',
      'Heavy occlusive creams',
      'Too many active products at once',
    ]
  }

  if (primary === 'NICELY') {
    morning = [
      item('nicely_gentle_cleanser'),
      item('nicely_sweet_toner'),
      item('nicely_hydration_serum'),
      item('nicely_hydration_cream'),
      item('nicely_smooth_final_spf50'),
    ]
    evening = [
      item('nicely_gentle_cleanser'),
      item('nicely_sweet_toner'),
      item('nicely_hydration_serum'),
      item('nicely_hydration_cream'),
    ]
    priorities = [
      'Barrier support',
      'Reduce sensitivity',
      'Comfort and hydration',
    ]
    avoid = [
      'Strong acids',
      'Retinoid overload',
      'Frequent exfoliation',
    ]
  }

  if (primary === 'GLACIAR') {
    morning = [
      item('glaciar_cleansing_milk'),
      item('glaciar_soft_lotion'),
      item('hydraluronic_serum_gel'),
      item(isDry ? 'glaciar_plus_hydration_cream' : 'glaciar_hydration_cream'),
      item('summsun_spf50_sensitive'),
    ]
    evening = [
      item('glaciar_cleansing_milk'),
      item('glaciar_soft_lotion'),
      item('hydraluronic_serum_gel'),
      item(isDry ? 'glaciar_plus_hydration_cream' : 'glaciar_hydration_cream'),
    ]
    weeklySupport = [item('hydro_repairer_serum')]
    priorities = [
      'Deep hydration',
      'Improve comfort',
      'Support skin barrier',
    ]
    avoid = [
      'Over-cleansing',
      'Alcohol-heavy formulas',
      'Skipping cream after serum',
    ]
  }

  if (primary === 'BECLARITY') {
    morning = [
      item('beclarity_clarifying_cleanser'),
      item('beclarity_blemish_corrector_serum'),
      item('beclarity_blemish_controller_spf50'),
    ]
    evening = [
      item('beclarity_clarifying_cleanser'),
      item('beclarity_dark_spot_eraser'),
      item('beclarity_blemish_corrector_serum'),
    ]
    weeklySupport = [item('summsun_spf50_cc')]
    priorities = [
      'Even skin tone',
      'Dark spot correction',
      'Strict daily SPF',
    ]
    avoid = [
      'Sun exposure without SPF',
      'Inconsistent routine',
      'Combining too many brightening actives',
    ]
  }

  if (primary === 'CELL') {
    morning = [
      item('cell_activator_serum'),
      item('cell_vitality_cream'),
      item('summsun_spf50_sensitive'),
    ]
    evening = [
      item('cell_activator_serum'),
      item('cell_vitality_cream'),
    ]
    priorities = [
      'Anti-aging support',
      'Improve vitality',
      'Support smoother texture',
    ]
    avoid = [
      'Skipping SPF',
      'Over-exfoliation',
      'Changing products too often',
    ]
  }

  if (primary === 'CELL C') {
    morning = [
      item('cell_c_cleansing_mousse'),
      item('cell_c_renewal_serum'),
      item('cell_c_regenerating_cream'),
      item('summsun_spf50_sensitive'),
    ]
    evening = [
      item('cell_c_cleansing_mousse'),
      item('cell_c_renewal_serum'),
      item('cell_c_hydro_nourishing_cream'),
    ]
    priorities = [
      'Glow',
      'Antioxidant support',
      'More even-looking tone',
    ]
    avoid = [
      'Using acids without SPF',
      'Too frequent exfoliation',
      'Irritating combinations',
    ]
  }

  if (secondary.includes('NICELY')) {
    priorities.push('Additional barrier and sensitivity support')
  }

  if (secondary.includes('BECLARITY')) {
    priorities.push('Additional pigmentation support')
  }

  if (secondary.includes('GLACIAR')) {
    priorities.push('Additional hydration support')
  }

  return {
    strategy: `${primary}${secondary.length ? ` + ${secondary.join(' + ')}` : ''}`,
    primaryLine: primary,
    secondaryLines: secondary,
    lines: uniqueLines,
    priorities: clean(priorities),
    morning: clean(morning),
    evening: clean(evening),
    weeklySupport: clean(weeklySupport),
    avoid: clean(avoid),
  }
}
