import {
  GOALS,
  GOAL_TO_LINE,
  PROBLEM_SUPPORT,
} from './summecosmetics-database.js'

// -----------------------------------------------------
// GOAL DETECTION
// -----------------------------------------------------

function detectGoal(input = {}) {
  const text = String(input.goal || '').toLowerCase()

  if (
    text.includes('hydr') ||
    text.includes('увлаж') ||
    text.includes('feucht')
  ) {
    return GOALS.HYDRATION
  }

  if (
    text.includes('lift') ||
    text.includes('firm') ||
    text.includes('лифт') ||
    text.includes('упруг') ||
    text.includes('straff')
  ) {
    return GOALS.LIFTING
  }

  if (
    text.includes('pigm') ||
    text.includes('пигмент') ||
    text.includes('fleck') ||
    text.includes('bright')
  ) {
    return GOALS.PIGMENTATION
  }

  if (
    text.includes('acne') ||
    text.includes('akne') ||
    text.includes('акне')
  ) {
    return GOALS.ACNE
  }

  if (
    text.includes('sens') ||
    text.includes('empfind') ||
    text.includes('чувств')
  ) {
    return GOALS.SENSITIVE
  }

  if (
    text.includes('regen') ||
    text.includes('восстанов')
  ) {
    return GOALS.REGENERATION
  }

  if (
    text.includes('glow') ||
    text.includes('сиян')
  ) {
    return GOALS.GLOW
  }

  return GOALS.HYDRATION
}

// -----------------------------------------------------
// LABELS
// -----------------------------------------------------

const GOAL_LABELS = {
  hydration: {
    RU: 'Стратегия увлажнения',
    DE: 'Hydrationsstrategie',
    EN: 'Hydration Strategy',
  },

  lifting: {
    RU: 'Стратегия лифтинга',
    DE: 'Lifting Strategie',
    EN: 'Lifting Strategy',
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
    RU: 'Стратегия чувствительной кожи',
    DE: 'Sensitive Skin Strategie',
    EN: 'Sensitive Skin Strategy',
  },

  regeneration: {
    RU: 'Стратегия регенерации',
    DE: 'Regenerationsstrategie',
    EN: 'Regeneration Strategy',
  },

  glow: {
    RU: 'Стратегия сияния',
    DE: 'Glow Strategie',
    EN: 'Glow Strategy',
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

  const mainLine = GOAL_TO_LINE[goal]

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
