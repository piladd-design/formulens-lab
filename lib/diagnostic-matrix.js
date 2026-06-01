export const diagnosticMatrix = {
  ESSENTIAL: {
    role: 'preparation',
    title: 'Skin preparation and recovery',
    concerns: [
      'deep_cleansing',
      'comedones',
      'clogged_pores',
      'rough_texture',
      'pre_treatment',
      'post_extraction_repair',
    ],
    priority: 70,
  },

  BALANCE: {
    role: 'primary',
    title: 'Sebum control and acne-prone skin',
    concerns: [
      'acne',
      'inflammation',
      'blemishes',
      'oily_skin',
      'sebum',
      'comedones',
      'enlarged_pores',
    ],
    priority: 95,
  },

  GLACIAR: {
    role: 'support',
    title: 'Hydration and dehydration recovery',
    concerns: [
      'dehydration',
      'dryness',
      'tightness',
      'lack_of_comfort',
      'fine_dehydration_lines',
      'barrier_support',
    ],
    priority: 75,
  },

  NICELY: {
    role: 'support_or_primary',
    title: 'Sensitivity, redness and barrier repair',
    concerns: [
      'sensitivity',
      'redness',
      'reactive_skin',
      'irritation',
      'rosacea_tendency',
      'barrier_damage',
      'burning',
      'tightness',
    ],
    priority: 90,
  },

  BECLARITY: {
    role: 'primary',
    title: 'Pigmentation and uneven tone',
    concerns: [
      'pigmentation',
      'dark_spots',
      'melasma',
      'post_acne_marks',
      'uneven_tone',
      'photoaging_pigment',
    ],
    priority: 95,
  },

  CELL_C: {
    role: 'primary_or_support',
    title: 'Glow, antioxidant protection and photoaging',
    concerns: [
      'dull_skin',
      'lack_of_glow',
      'oxidative_stress',
      'smoker_skin',
      'urban_stress',
      'early_photoaging',
      'uneven_tone',
    ],
    priority: 80,
  },

  CELL: {
    role: 'primary_or_support',
    title: 'Early anti-aging and cellular vitality',
    concerns: [
      'early_aging',
      'first_wrinkles',
      'loss_of_vitality',
      'tired_skin',
      'prevention',
      'mild_loss_of_firmness',
    ],
    priority: 78,
  },

  MYCODE: {
    role: 'primary',
    title: 'Personalized advanced anti-aging',
    concerns: [
      'wrinkles',
      'deep_wrinkles',
      'lifting',
      'loss_of_firmness',
      'loss_of_density',
      'skin_sagging',
      'advanced_aging',
      'neck_decollete',
      'personalized_antiaging',
    ],
    priority: 100,
  },

  SUMMESUN: {
    role: 'protection',
    title: 'Daily UV protection',
    concerns: [
      'uv_protection',
      'pigmentation_prevention',
      'antiaging_protection',
      'post_peel_protection',
      'daily_spf',
    ],
    priority: 100,
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
    'hals',
    'dekolleté',
  ],
}

export const mycodeHomecareCodes = {
  glow: {
    code: '011',
    line: 'MYCODE',
    concern: 'dull_skin',
    role: 'serum',
  },

  calming_serum: {
    code: '021',
    line: 'MYCODE',
    concern: 'sensitivity',
    role: 'serum',
  },

  calming_cream: {
    code: '022',
    line: 'MYCODE',
    concern: 'sensitivity',
    role: 'cream',
  },

  plumping_serum: {
    code: '051',
    line: 'MYCODE',
    concern: 'wrinkles',
    role: 'serum',
  },

  plumping_cream: {
    code: '052',
    line: 'MYCODE',
    concern: 'wrinkles',
    role: 'cream',
  },

  ultra_rich_plumping_cream: {
    code: '053',
    line: 'MYCODE',
    concern: 'wrinkles_dry_mature',
    role: 'cream',
  },

  firming_serum: {
    code: '061',
    line: 'MYCODE',
    concern: 'lifting',
    role: 'serum',
  },

  firming_cream: {
    code: '062',
    line: 'MYCODE',
    concern: 'lifting',
    role: 'cream',
  },

  retinol_serum: {
    code: '071',
    line: 'MYCODE',
    concern: 'renewal_photoaging',
    role: 'serum',
  },

  retinol_cream: {
    code: '072',
    line: 'MYCODE',
    concern: 'renewal_photoaging',
    role: 'cream',
  },

  neck_serum: {
    code: '081',
    line: 'MYCODE',
    concern: 'neck_decollete',
    role: 'serum',
  },

  neck_cream: {
    code: '082',
    line: 'MYCODE',
    concern: 'neck_decollete',
    role: 'cream',
  },

  hydronutrition_mask: {
    code: '095',
    line: 'MYCODE',
    concern: 'hydration_support',
    role: 'mask',
  },
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

export function scoreCollections(input = {}) {
  const detectedConcerns = detectConcerns(input)
  const age = Number(input.age || 0)

  const scores = {
    ESSENTIAL: 0,
    BALANCE: 0,
    GLACIAR: 0,
    NICELY: 0,
    BECLARITY: 0,
    CELL_C: 0,
    CELL: 0,
    MYCODE: 0,
    SUMMESUN: 100,
  }

  detectedConcerns.forEach((concern) => {
    if (['acne', 'oily_skin'].includes(concern)) scores.BALANCE += 95

    if (['pigmentation'].includes(concern)) scores.BECLARITY += 95

    if (['dehydration', 'dryness'].includes(concern)) scores.GLACIAR += 75

    if (['sensitivity', 'redness'].includes(concern)) scores.NICELY += 90

    if (['dull_skin'].includes(concern)) scores.CELL_C += 80

    if (['wrinkles'].includes(concern)) scores.MYCODE += 100

    if (['lifting', 'advanced_aging', 'neck_decollete'].includes(concern)) {
      scores.MYCODE += 100
    }
  })

  if (age >= 45) scores.MYCODE += 35
  if (age >= 30 && age < 45) scores.CELL += 35
  if (age >= 25 && age < 40) scores.CELL_C += 20

  if (scores.BALANCE > 0 || scores.BECLARITY > 0 || scores.MYCODE > 0) {
    scores.ESSENTIAL += 50
  }

  return {
    detectedConcerns,
    scores,
  }
}

export function getPrimaryCollection(input = {}) {
  const { scores } = scoreCollections(input)

  const sorted = Object.entries(scores)
    .filter(([line]) => line !== 'SUMMESUN' && line !== 'ESSENTIAL')
    .sort((a, b) => b[1] - a[1])

  return sorted[0]?.[0] || 'GLACIAR'
}

export function getSupportCollections(input = {}) {
  const { scores } = scoreCollections(input)
  const primary = getPrimaryCollection(input)

  return Object.entries(scores)
    .filter(([line, score]) => {
      if (line === primary) return false
      if (line === 'SUMMESUN') return true
      if (line === 'ESSENTIAL') return score >= 50
      return score >= 70
    })
    .sort((a, b) => b[1] - a[1])
    .map(([line]) => line)
}
