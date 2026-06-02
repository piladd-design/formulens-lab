// lib/skin-problems.js

export const SKIN_PROBLEMS = {
  // AGEING
  WRINKLES: {
    group: 'AGEING',
    label: {
      de: 'Falten',
      ru: 'Морщины',
      en: 'Wrinkles',
    },
    keywords: [
      'wrinkle',
      'wrinkles',
      'falten',
      'морщ',
      'linien',
      'lines',
    ],
    strategies: ['COLLAGEN_FIRMING'],
    lines: ['MYCODE', 'CELL'],
    priority: 85,
  },

  SAGGING: {
    group: 'AGEING',
    label: {
      de: 'Erschlaffung / Lifting',
      ru: 'Дряблость / Лифтинг',
      en: 'Sagging / Lifting',
    },
    keywords: [
      'lifting',
      'лифтинг',
      'sagging',
      'erschlaffung',
      'дряб',
      'firming',
      'упруг',
      'oval',
      'овал',
    ],
    strategies: ['COLLAGEN_FIRMING'],
    lines: ['MYCODE', 'CELL'],
    priority: 88,
  },

  LOSS_OF_ELASTICITY: {
    group: 'AGEING',
    label: {
      de: 'Elastizitätsverlust',
      ru: 'Потеря эластичности',
      en: 'Loss of elasticity',
    },
    keywords: [
      'elasticity',
      'elastizität',
      'эластич',
      'firmness',
      'festigkeit',
      'плотност',
    ],
    strategies: ['COLLAGEN_FIRMING', 'CELL_ACTIVATION'],
    lines: ['MYCODE', 'CELL'],
    priority: 82,
  },

  // HYDRATION
  DEHYDRATION: {
    group: 'HYDRATION',
    label: {
      de: 'Dehydrierung',
      ru: 'Обезвоженность',
      en: 'Dehydration',
    },
    keywords: [
      'dehydrat',
      'обезвож',
      'hydration',
      'увлаж',
      'feuchtigkeit',
      'moisture',
      'tightness',
      'стянут',
    ],
    strategies: ['HYDRATION'],
    lines: ['GLACIAR', 'NICELY'],
    priority: 80,
  },

  DRYNESS: {
    group: 'HYDRATION',
    label: {
      de: 'Trockenheit',
      ru: 'Сухость',
      en: 'Dryness',
    },
    keywords: [
      'dry',
      'trocken',
      'сух',
      'шелуш',
      'flaky',
      'schupp',
    ],
    strategies: ['HYDRATION', 'BARRIER_REPAIR'],
    lines: ['GLACIAR', 'NICELY'],
    priority: 78,
  },

  // SENSITIVE / BARRIER
  SENSITIVITY: {
    group: 'SENSITIVITY',
    label: {
      de: 'Empfindlichkeit',
      ru: 'Чувствительность',
      en: 'Sensitivity',
    },
    keywords: [
      'sensitive',
      'sensibel',
      'empfindlich',
      'чувств',
      'reactive',
      'реактив',
    ],
    strategies: ['BARRIER_REPAIR'],
    lines: ['NICELY', 'GLACIAR'],
    priority: 92,
  },

  REDNESS: {
    group: 'SENSITIVITY',
    label: {
      de: 'Rötungen',
      ru: 'Покраснения',
      en: 'Redness',
    },
    keywords: [
      'redness',
      'rötung',
      'red',
      'покрас',
      'irritation',
      'раздраж',
    ],
    strategies: ['BARRIER_REPAIR'],
    lines: ['NICELY'],
    priority: 94,
  },

  BARRIER_DAMAGE: {
    group: 'SENSITIVITY',
    label: {
      de: 'Geschwächte Hautbarriere',
      ru: 'Ослабленный кожный барьер',
      en: 'Weakened skin barrier',
    },
    keywords: [
      'barrier',
      'барьер',
      'geschwächt',
      'weakened',
      'damaged',
      'повреж',
      'post treatment',
      'после процедур',
    ],
    strategies: ['BARRIER_REPAIR', 'HYDRATION'],
    lines: ['NICELY', 'GLACIAR'],
    priority: 96,
  },

  COUPEROSE: {
    group: 'SENSITIVITY',
    label: {
      de: 'Couperose',
      ru: 'Купероз',
      en: 'Couperose',
    },
    keywords: [
      'couperose',
      'купероз',
      'vascular',
      'сосуд',
      'rosacea',
      'розацеа',
    ],
    strategies: ['BARRIER_REPAIR'],
    lines: ['NICELY'],
    priority: 97,
  },

  // PIGMENT / TONE
  PIGMENTATION: {
    group: 'PIGMENTATION',
    label: {
      de: 'Pigmentierung',
      ru: 'Пигментация',
      en: 'Pigmentation',
    },
    keywords: [
      'pigment',
      'пигмент',
      'dark spot',
      'flecken',
      'пятн',
      'melasma',
      'мелазма',
    ],
    strategies: ['PIGMENT_CONTROL', 'VITAMIN_C_GLOW'],
    lines: ['BECLARITY', 'CELL C', 'SUMMESUN'],
    priority: 90,
  },

  UNEVEN_TONE: {
    group: 'PIGMENTATION',
    label: {
      de: 'Ungleichmäßiger Hautton',
      ru: 'Неровный тон',
      en: 'Uneven skin tone',
    },
    keywords: [
      'uneven tone',
      'неровный тон',
      'ungleichmäßig',
      'tone',
      'тон',
    ],
    strategies: ['PIGMENT_CONTROL', 'VITAMIN_C_GLOW'],
    lines: ['BECLARITY', 'CELL C'],
    priority: 76,
  },

  POST_ACNE_MARKS: {
    group: 'PIGMENTATION',
    label: {
      de: 'Post-Akne-Spuren',
      ru: 'Постакне',
      en: 'Post-acne marks',
    },
    keywords: [
      'post acne',
      'post-acne',
      'постакне',
      'acne marks',
      'narben',
      'рубц',
    ],
    strategies: ['PIGMENT_CONTROL', 'ACNE_CONTROL'],
    lines: ['BECLARITY', 'BALANCE', 'CELL C'],
    priority: 84,
  },

  // ACNE / SEBUM
  ACNE: {
    group: 'ACNE',
    label: {
      de: 'Akne',
      ru: 'Акне',
      en: 'Acne',
    },
    keywords: [
      'acne',
      'akne',
      'акне',
      'pimple',
      'прыщ',
      'breakout',
      'высып',
    ],
    strategies: ['ACNE_CONTROL'],
    lines: ['BALANCE'],
    priority: 95,
  },

  COMEDONES: {
    group: 'ACNE',
    label: {
      de: 'Komedonen',
      ru: 'Комедоны',
      en: 'Comedones',
    },
    keywords: [
      'comedone',
      'комедон',
      'blackhead',
      'черные точки',
      'whitehead',
    ],
    strategies: ['ACNE_CONTROL'],
    lines: ['BALANCE'],
    priority: 86,
  },

  OILY_SKIN: {
    group: 'ACNE',
    label: {
      de: 'Ölige Haut / Sebum',
      ru: 'Жирность / Себум',
      en: 'Oily skin / Sebum',
    },
    keywords: [
      'oily',
      'жирн',
      'sebum',
      'себум',
      'glanz',
      'shine',
      'блеск',
    ],
    strategies: ['ACNE_CONTROL'],
    lines: ['BALANCE'],
    priority: 82,
  },

  LARGE_PORES: {
    group: 'ACNE',
    label: {
      de: 'Vergrößerte Poren',
      ru: 'Расширенные поры',
      en: 'Large pores',
    },
    keywords: [
      'pores',
      'poren',
      'поры',
      'large pores',
      'расширенные поры',
    ],
    strategies: ['ACNE_CONTROL'],
    lines: ['BALANCE'],
    priority: 72,
  },

  // GLOW / PHOTOAGING
  DULLNESS: {
    group: 'GLOW',
    label: {
      de: 'Fahler Teint',
      ru: 'Тусклый тон',
      en: 'Dull skin',
    },
    keywords: [
      'dull',
      'туск',
      'fahl',
      'gray',
      'серый',
      'müde',
      'устал',
    ],
    strategies: ['VITAMIN_C_GLOW', 'CELL_ACTIVATION'],
    lines: ['CELL C', 'CELL'],
    priority: 78,
  },

  LACK_OF_GLOW: {
    group: 'GLOW',
    label: {
      de: 'Mangelnde Ausstrahlung',
      ru: 'Недостаток сияния',
      en: 'Lack of glow',
    },
    keywords: [
      'glow',
      'сиян',
      'radiance',
      'ausstrahlung',
      'fresh look',
      'свеж',
    ],
    strategies: ['VITAMIN_C_GLOW'],
    lines: ['CELL C'],
    priority: 80,
  },

  PHOTOAGING: {
    group: 'GLOW',
    label: {
      de: 'Photoaging',
      ru: 'Фотостарение',
      en: 'Photoaging',
    },
    keywords: [
      'photoaging',
      'фотостар',
      'sun damage',
      'uv',
      'уф',
      'oxidative',
      'оксид',
    ],
    strategies: ['VITAMIN_C_GLOW', 'PIGMENT_CONTROL'],
    lines: ['CELL C', 'SUMMESUN', 'BECLARITY'],
    priority: 84,
  },

  SMOKER_SKIN: {
    group: 'GLOW',
    label: {
      de: 'Raucherhaut',
      ru: 'Кожа курильщика',
      en: 'Smoker skin',
    },
    keywords: [
      'smoker',
      'куриль',
      'raucher',
    ],
    strategies: ['VITAMIN_C_GLOW', 'CELL_ACTIVATION'],
    lines: ['CELL C', 'CELL'],
    priority: 74,
  },

  // RECOVERY / PREVENTION
  EARLY_AGEING: {
    group: 'PREVENTION',
    label: {
      de: 'Erste Alterszeichen',
      ru: 'Первые возрастные признаки',
      en: 'Early ageing signs',
    },
    keywords: [
      'first signs',
      'erste alterszeichen',
      'первые признаки',
      'prevention',
      'профилактика',
      'vorbeugung',
    ],
    strategies: ['CELL_ACTIVATION', 'VITAMIN_C_GLOW'],
    lines: ['CELL', 'CELL C', 'SUMMESUN'],
    priority: 70,
  },

  TIRED_SKIN: {
    group: 'PREVENTION',
    label: {
      de: 'Müde Haut',
      ru: 'Уставшая кожа',
      en: 'Tired skin',
    },
    keywords: [
      'tired',
      'müde',
      'устал',
      'stress',
      'стресс',
      'vitality',
      'жизн',
    ],
    strategies: ['CELL_ACTIVATION', 'VITAMIN_C_GLOW'],
    lines: ['CELL', 'CELL C'],
    priority: 72,
  },
}

export function detectSkinProblems(input = {}) {
  const text = [
    input.age,
    input.gender,
    input.skinType,
    input.sensitivity,
    input.concerns,
    input.goal,
    input.problem,
    input.notes,
  ]
    .flat()
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

  const detected = Object.entries(SKIN_PROBLEMS)
    .filter(([, problem]) =>
      problem.keywords.some((word) =>
        text.includes(word.toLowerCase())
      )
    )
    .map(([id, problem]) => ({
      id,
      ...problem,
    }))
    .sort((a, b) => b.priority - a.priority)

  return detected
}

export function getProblemGroups(problems = []) {
  return [...new Set(problems.map((problem) => problem.group))]
}

export default SKIN_PROBLEMS
