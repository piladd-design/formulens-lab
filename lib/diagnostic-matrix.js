export const diagnosticMatrix = {
  ESSENTIAL: {
    role: 'preparation',
    title: 'Skin preparation and recovery',
  },

  BALANCE: {
    role: 'primary',
    title: 'Sebum control and acne-prone skin',
  },

  GLACIAR: {
    role: 'support',
    title: 'Hydration and dehydration recovery',
  },

  NICELY: {
    role: 'primary_or_support',
    title: 'Sensitivity, redness and barrier repair',
  },

  BECLARITY: {
    role: 'primary',
    title: 'Pigmentation and uneven tone',
  },

  CELL_C: {
    role: 'primary_or_support',
    title: 'Glow, antioxidant protection and photoaging',
  },

  CELL: {
    role: 'primary_or_support',
    title: 'Early anti-aging and cellular vitality',
  },

  MYCODE: {
    role: 'primary',
    title: 'Personalized advanced anti-aging',
  },

  SUMMESUN: {
    role: 'protection',
    title: 'Daily UV protection',
  },
}

export const concernKeywords = {
  acne: [
    'acne',
    'akne',
    'акне',
    'прыщи',
    'прыщ',
    'воспаления',
    'воспаление',
    'blemishes',
    'pickel',
    'unreinheiten',
  ],

  oily_skin: [
    'жирная',
    'жирный блеск',
    'себум',
    'oily',
    'fettig',
    'sebum',
    'talg',
  ],

  pigmentation: [
    'пигментация',
    'пигмент',
    'пятна',
    'пигментные пятна',
    'melasma',
    'pigmentation',
    'dark spots',
    'flecken',
    'pigmentflecken',
    'uneven tone',
    'неровный тон',
  ],

  dehydration: [
    'обезвоженность',
    'обезвоженная',
    'стянутость',
    'мало влаги',
    'dehydration',
    'dehydrated',
    'feuchtigkeitsarm',
    'tightness',
  ],

  dryness: [
    'сухая',
    'сухость',
    'шелушение',
    'dry',
    'dryness',
    'trocken',
    'trockene haut',
  ],

  sensitivity: [
    'чувствительная',
    'чувствительность',
    'реактивная',
    'раздражение',
    'sensitive',
    'sensitivity',
    'sensibel',
    'empfindlich',
    'irritation',
  ],

  redness: [
    'покраснение',
    'краснота',
    'купероз',
    'розацеа',
    'redness',
    'rosacea',
    'couperose',
    'rötung',
  ],

  dull_skin: [
    'тусклая',
    'нет сияния',
    'усталый цвет',
    'сияние',
    'glow',
    'dull',
    'lack of glow',
    'müde haut',
    'fahle haut',
  ],

  wrinkles: [
    'морщины',
    'морщина',
    'wrinkles',
    'falten',
    'anti-age',
    'antiaging',
  ],

  lifting: [
    'лифтинг',
    'овал',
    'птоз',
    'дряблость',
    'упругость',
    'lifting',
    'firming',
    'loss of firmness',
    'erschlaffung',
    'konturen',
  ],

  advanced_aging: [
    'глубокие морщины',
    'зрелая кожа',
    'возрастная кожа',
    'advanced aging',
    'mature skin',
    'reife haut',
  ],

  neck_decollete: [
    'шея',
    'декольте',
    'neck',
    'decollete',
    'décolleté',
    'hals',
    'dekolleté',
  ],
}

export function detectConcerns(input = {}) {
  const text = JSON.stringify(input).toLowerCase()
  const detected = []

  Object.entries(concernKeywords).forEach(([concern, keywords]) => {
    if (keywords.some((keyword) => text.includes(keyword.toLowerCase()))) {
      detected.push(concern)
    }
  })

  return detected
}

export function getPrimaryCollection(input = {}) {
  const detected = detectConcerns(input)
  const age = Number(input.age || 0)

  // 1. Acne / sebum
  if (detected.includes('acne') || detected.includes('oily_skin')) {
    return 'BALANCE'
  }

  // 2. Pigmentation
  if (detected.includes('pigmentation')) {
    return 'BECLARITY'
  }

  // 3. Sensitivity / redness / rosacea
  if (detected.includes('sensitivity') || detected.includes('redness')) {
    return 'NICELY'
  }

  // 4. Wrinkles / lifting / advanced aging
  if (
    detected.includes('wrinkles') ||
    detected.includes('lifting') ||
    detected.includes('advanced_aging') ||
    detected.includes('neck_decollete')
  ) {
    return 'MYCODE'
  }

  // 5. Dehydration / dryness
  if (detected.includes('dehydration') || detected.includes('dryness')) {
    return 'GLACIAR'
  }

  // 6. Glow / antioxidant / dull skin
  if (detected.includes('dull_skin')) {
    return 'CELL_C'
  }

  // 7. Early aging
  if (age >= 30 && age < 45) {
    return 'CELL'
  }

  // 8. 45+ without specific problem
  if (age >= 45) {
    return 'MYCODE'
  }

  return 'GLACIAR'
}

export function getSupportCollections(input = {}) {
  const detected = detectConcerns(input)
  const primary = getPrimaryCollection(input)

  const support = []

  if (
    primary !== 'GLACIAR' &&
    (detected.includes('dehydration') || detected.includes('dryness'))
  ) {
    support.push('GLACIAR')
  }

  if (
    primary !== 'NICELY' &&
    (detected.includes('sensitivity') || detected.includes('redness'))
  ) {
    support.push('NICELY')
  }

  if (
    primary !== 'CELL_C' &&
    detected.includes('dull_skin')
  ) {
    support.push('CELL_C')
  }

  if (
    primary !== 'BECLARITY' &&
    detected.includes('pigmentation')
  ) {
    support.push('BECLARITY')
  }

  support.push('SUMMESUN')

  return [...new Set(support)]
}

export function scoreCollections(input = {}) {
  const detectedConcerns = detectConcerns(input)
  const primary = getPrimaryCollection(input)
  const support = getSupportCollections(input)

  return {
    detectedConcerns,
    primary,
    support,
  }
}
