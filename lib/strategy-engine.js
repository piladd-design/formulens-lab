import {
  GOALS,
  GOAL_TO_LINE,
  PROBLEM_SUPPORT,
} from './summecosmetics-database.js'

// -----------------------------------------------------
// GOAL DETECTION
// -----------------------------------------------------

function detectGoal(input = {}) {
  const text = String(input.goal || input.treatmentGoal || input.primaryGoal || '')
    .toLowerCase()
    .trim()

  const has = (patterns) => patterns.some((word) => text.includes(word))

  if (has([
    'раздраж',
    'покрасн',
    'краснот',
    'чувств',
    'реактив',
    'купероз',
    'барьер',
    'sens',
    'empfind',
    'redness',
    'irritat',
    'reactive',
    'barrier',
    'couperose',
  ])) {
    return GOALS.SENSITIVE
  }

  if (has([
    'пор',
    'себум',
    'жирн',
    'комедон',
    'текстур',
    'рельеф',
    'pores',
    'pore',
    'sebum',
    'oily',
    'comedon',
    'texture',
  ])) {
    return GOALS.PORE_REFINING
  }

  if (has([
    'акне',
    'прыщ',
    'высып',
    'воспален',
    'acne',
    'akne',
    'breakout',
  ])) {
    return GOALS.ACNE
  }

  if (has([
    'пигмент',
    'пятн',
    'мелазм',
    'осветл',
    'pigm',
    'fleck',
    'bright',
    'spot',
    'melasma',
  ])) {
    return GOALS.PIGMENTATION
  }

  if (has([
    'регенерац',
    'восстанов',
    'обновлен',
    'репарац',
    'regen',
    'repair',
    'renewal',
  ])) {
    return GOALS.REGENERATION
  }

  if (has([
    'lift',
    'firm',
    'лифт',
    'упруг',
    'straff',
    'морщ',
    'falten',
    'anti',
    'age',
  ])) {
    return GOALS.LIFTING
  }

  if (has([
    'glow',
    'сиян',
    'radiance',
  ])) {
    return GOALS.GLOW
  }

  if (has([
    'hydr',
    'увлаж',
    'feucht',
    'сух',
    'обезвож',
    'влага',
    'dehydrat',
    'dry',
  ])) {
    return GOALS.HYDRATION
  }

  return GOALS.GENERAL
}

// -----------------------------------------------------
// LABELS
// -----------------------------------------------------

const GOAL_LABELS = {
  general: {
    RU: 'Базовая профессиональная стратегия',
    DE: 'Basisstrategie',
    EN: 'Basic Professional Strategy',
  },

  hydration: {
    RU: 'Стратегия увлажнения',
    DE: 'Hydrationsstrategie',
    EN: 'Hydration Strategy',
  },

  lifting: {
    RU: 'Стратегия лифтинга и anti-age коррекции',
    DE: 'Lifting- und Anti-Aging-Strategie',
    EN: 'Lifting and Anti-Aging Strategy',
  },

  firming: {
    RU: 'Стратегия упругости',
    DE: 'Straffungsstrategie',
    EN: 'Firming Strategy',
  },

  pigmentation: {
    RU: 'Стратегия коррекции пигментации',
    DE: 'Pigmentkorrektur Strategie',
    EN: 'Pigmentation Strategy',
  },

  acne: {
    RU: 'Стратегия коррекции акне',
    DE: 'Akne Strategie',
    EN: 'Acne Strategy',
  },

  sensitive: {
    RU: 'Стратегия восстановления барьера и снижения реактивности',
    DE: 'Strategie zur Barrierestärkung und Beruhigung',
    EN: 'Barrier Repair and Calming Strategy',
  },

  regeneration: {
    RU: 'Стратегия регенерации и восстановления качества кожи',
    DE: 'Regenerationsstrategie',
    EN: 'Regeneration Strategy',
  },

  glow: {
    RU: 'Стратегия сияния и улучшения тона кожи',
    DE: 'Glow Strategie',
    EN: 'Glow Strategy',
  },

  pore_refining: {
    RU: 'Стратегия себорегуляции и улучшения текстуры кожи',
    DE: 'Strategie zur Sebumregulation und Hauttexturverfeinerung',
    EN: 'Sebum Control and Skin Texture Strategy',
  },
}

function getLang(input = {}) {
  const lang = String(input.lang || 'DE').toUpperCase()

  if (lang === 'RU') return 'RU'
  if (lang === 'EN') return 'EN'

  return 'DE'
}

// -----------------------------------------------------
// MAIN ENGINE
// -----------------------------------------------------

export function buildStrategy(input = {}) {
  const lang = getLang(input)

  const goal = detectGoal(input)

  const mainLine = GOAL_TO_LINE[goal] || GOAL_TO_LINE.general || 'ECC'

  const concerns = Array.isArray(input.concerns)
    ? input.concerns
    : []

  const supportLines = new Set()

  concerns.forEach((problem) => {
    const key = String(problem).toLowerCase()

    const map = {
      wrinkles: 'wrinkles',
      lifting: 'lifting',
      pigmentation: 'pigmentation',
      acne: 'acne',
      redness: 'redness',
      dehydration: 'dehydration',
      dullness: 'dullness',
      regeneration: 'regeneration',
      pores: 'pores',
      pore_refining: 'pores',
      sensitivity: 'redness',
      sensitive: 'redness',
    }

    const support = PROBLEM_SUPPORT[map[key]]

    if (!support) return

    support.forEach((line) => {
      if (line !== mainLine) {
        supportLines.add(line)
      }
    })
  })

  return {
    goal,

    mainLine,

    primaryStrategy: {
      id: goal,
      name:
        GOAL_LABELS[goal]?.[lang] ||
        GOAL_LABELS[goal]?.DE ||
        goal,
      reason:
        lang === 'RU'
          ? 'Основная стратегия определяется целью процедуры.'
          : lang === 'DE'
          ? 'Die Hauptstrategie wird durch das Behandlungsziel bestimmt.'
          : 'The primary strategy is determined by the treatment goal.',
    },

    secondaryStrategies: [...supportLines].map((line) => ({
      name: line,
    })),

    recommendedLines: [
      mainLine,
      ...supportLines,
    ],

    supportLines: [...supportLines],

    activeIngredients: [],
  }
}

export default buildStrategy
