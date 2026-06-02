// lib/strategy-engine.js

import { detectSkinProblems } from './skin-problems.js'

function getLang(input = {}) {
  const lang = String(input.lang || 'DE').toLowerCase()
  if (lang === 'ru') return 'ru'
  if (lang === 'en') return 'en'
  return 'de'
}

function textOf(input = {}) {
  return [
    input.goal,
    input.problem,
    input.notes,
    input.concerns,
    input.skinType,
    input.sensitivity,
  ]
    .flat()
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
}

function has(text, words = []) {
  return words.some((word) => text.includes(word.toLowerCase()))
}

function getGoalBoosts(input = {}) {
  const text = textOf(input)
  const boosts = {}

  if (
    has(text, [
      'hydration',
      'hydrate',
      'moisture',
      'feuchtigkeit',
      'befeuchtung',
      'увлаж',
      'обезвож',
      'сух',
      'комфорт',
    ])
  ) {
    boosts.HYDRATION = 80
    boosts.BARRIER_REPAIR = -40
  }

  if (
    has(text, [
      'lifting',
      'firming',
      'anti-age',
      'anti aging',
      'straffung',
      'falten',
      'лифтинг',
      'упруг',
      'морщ',
      'дряб',
      'омолож',
    ])
  ) {
    boosts.COLLAGEN_FIRMING = 70
  }

  if (
    has(text, [
      'pigment',
      'flecken',
      'brightening',
      'tone',
      'пигмент',
      'пятн',
      'тон',
      'освет',
    ])
  ) {
    boosts.PIGMENT_CONTROL = 60
    boosts.VITAMIN_C_GLOW = 25
  }

  if (
    has(text, [
      'glow',
      'radiance',
      'fresh',
      'fahler teint',
      'сиян',
      'свеж',
      'туск',
    ])
  ) {
    boosts.VITAMIN_C_GLOW = 60
    boosts.CELL_ACTIVATION = 25
  }

  if (
    has(text, [
      'acne',
      'akne',
      'pimple',
      'unrein',
      'акне',
      'прыщ',
      'высып',
      'себум',
      'жирн',
    ])
  ) {
    boosts.ACNE_CONTROL = 70
  }

  if (
    has(text, [
      'redness',
      'rötung',
      'couperose',
      'rosacea',
      'irritation',
      'reactive',
      'burning',
      'покрас',
      'купероз',
      'розацеа',
      'раздраж',
      'реактив',
      'жжение',
      'высокая чувствительность',
    ])
  ) {
    boosts.BARRIER_REPAIR = 75
  }

  return boosts
}

const T = {
  BARRIER_REPAIR: {
    de: {
      name: 'Barriere-Reparatur Strategie',
      reason:
        'Empfindliche, reaktive oder geschwächte Haut benötigt Stabilisierung der Hautbarriere.',
    },
    ru: {
      name: 'Стратегия восстановления барьера',
      reason:
        'Чувствительная, реактивная или ослабленная кожа требует стабилизации кожного барьера.',
    },
    en: {
      name: 'Barrier Repair Strategy',
      reason:
        'Sensitive, reactive or barrier-weakened skin needs barrier stabilisation.',
    },
  },

  ACNE_CONTROL: {
    de: {
      name: 'Akne- und Sebumkontrollstrategie',
      reason:
        'Unreinheiten, fettige Haut oder Komedonen erfordern Sebumkontrolle und Arbeit mit Poren.',
    },
    ru: {
      name: 'Стратегия контроля акне и себума',
      reason:
        'Высыпания, жирность или комедоны требуют контроля себума и работы с порами.',
    },
    en: {
      name: 'Acne & Sebum Control Strategy',
      reason:
        'Impurities, oiliness or comedones require sebum control and pore-focused care.',
    },
  },

  PIGMENT_CONTROL: {
    de: {
      name: 'Pigmentkontrollstrategie',
      reason:
        'Pigmentierung und ungleichmäßiger Ton benötigen Aufhellung, antioxidative Unterstützung und UV-Schutz.',
    },
    ru: {
      name: 'Стратегия контроля пигментации',
      reason:
        'Пигментация и неровный тон требуют осветления, антиоксидантной поддержки и SPF-защиты.',
    },
    en: {
      name: 'Pigment Control Strategy',
      reason:
        'Pigmentation and uneven tone need brightening, antioxidant support and UV protection.',
    },
  },

  COLLAGEN_FIRMING: {
    de: {
      name: 'Kollagen- und Straffungsstrategie',
      reason:
        'Falten, Erschlaffung oder Festigkeitsverlust benötigen Kollagenunterstützung und straffende Korrektur.',
    },
    ru: {
      name: 'Стратегия коллагена и упругости',
      reason:
        'Морщины, дряблость или потеря упругости требуют поддержки коллагена и укрепляющей коррекции.',
    },
    en: {
      name: 'Collagen & Firming Strategy',
      reason:
        'Wrinkles, sagging or loss of firmness require collagen support and firming correction.',
    },
  },

  HYDRATION: {
    de: {
      name: 'Hydrationsstrategie',
      reason:
        'Trockenheit, Spannungsgefühl oder Dehydrierung erfordern Wiederherstellung des Feuchtigkeitshaushalts.',
    },
    ru: {
      name: 'Стратегия увлажнения',
      reason:
        'Сухость, стянутость или обезвоженность требуют восстановления водного баланса и комфорта кожи.',
    },
    en: {
      name: 'Hydration Strategy',
      reason:
        'Dryness, tightness or dehydration require water balance restoration and comfort support.',
    },
  },

  VITAMIN_C_GLOW: {
    de: {
      name: 'Vitamin-C- und Glow-Strategie',
      reason:
        'Fahle, müde oder lichtgeschädigte Haut profitiert von Vitamin C, Glow und antioxidativem Schutz.',
    },
    ru: {
      name: 'Стратегия Vitamin C и сияния',
      reason:
        'Тусклая, уставшая или фотоповреждённая кожа нуждается в Vitamin C, сиянии и антиоксидантной защите.',
    },
    en: {
      name: 'Vitamin C & Glow Strategy',
      reason:
        'Dull, tired or photoaged skin benefits from vitamin C, glow and antioxidant protection.',
    },
  },

  CELL_ACTIVATION: {
    de: {
      name: 'Zellaktivierungsstrategie',
      reason:
        'Erste Alterszeichen, müde Haut oder Regenerationsziele benötigen Zellaktivierung und Vitalität.',
    },
    ru: {
      name: 'Стратегия клеточной активации',
      reason:
        'Первые возрастные признаки, уставшая кожа или потребность в регенерации требуют клеточной активации.',
    },
    en: {
      name: 'Cell Activation Strategy',
      reason:
        'Early ageing, tired skin or regeneration goals need cellular activation and vitality support.',
    },
  },

  PREVENTION: {
    de: {
      name: 'Präventions- und Hautqualitätsstrategie',
      reason:
        'Ohne dominante Problematik liegt der Fokus auf Prävention, Glow und Hautqualität.',
    },
    ru: {
      name: 'Стратегия профилактики и качества кожи',
      reason:
        'Если нет доминирующей проблемы, фокус делается на профилактике, сиянии и качестве кожи.',
    },
    en: {
      name: 'Prevention & Skin Quality Strategy',
      reason:
        'No dominant concern was detected, so the focus is prevention, glow and skin quality.',
    },
  },
}

const ACTIVES = {
  'soothing complex': {
    de: 'успокаивающий комплекс',
    ru: 'успокаивающий комплекс',
    en: 'soothing complex',
  },
  'barrier support': {
    de: 'поддержка барьера',
    ru: 'поддержка барьера',
    en: 'barrier support',
  },
  hydration: {
    de: 'увлажнение',
    ru: 'увлажнение',
    en: 'hydration',
  },
  'sebum control': {
    de: 'контроль себума',
    ru: 'контроль себума',
    en: 'sebum control',
  },
  'clarifying complex': {
    de: 'очищающий комплекс',
    ru: 'очищающий комплекс',
    en: 'clarifying complex',
  },
  'pore refining': {
    de: 'сужение пор',
    ru: 'сужение пор',
    en: 'pore refining',
  },
  'brightening complex': {
    de: 'осветляющий комплекс',
    ru: 'осветляющий комплекс',
    en: 'brightening complex',
  },
  'vitamin C': {
    de: 'Vitamin C',
    ru: 'Vitamin C',
    en: 'vitamin C',
  },
  SPF: {
    de: 'SPF',
    ru: 'SPF',
    en: 'SPF',
  },
  retinol: {
    de: 'ретинол',
    ru: 'ретинол',
    en: 'retinol',
  },
  peptides: {
    de: 'пептиды',
    ru: 'пептиды',
    en: 'peptides',
  },
  'firming complex': {
    de: 'укрепляющий комплекс',
    ru: 'укрепляющий комплекс',
    en: 'firming complex',
  },
  'hyaluronic acid': {
    de: 'гиалуроновая кислота',
    ru: 'гиалуроновая кислота',
    en: 'hyaluronic acid',
  },
  'NMF support': {
    de: 'поддержка NMF',
    ru: 'поддержка NMF',
    en: 'NMF support',
  },
  'hydration complex': {
    de: 'увлажняющий комплекс',
    ru: 'увлажняющий комплекс',
    en: 'hydration complex',
  },
  antioxidants: {
    de: 'антиоксиданты',
    ru: 'антиоксиданты',
    en: 'antioxidants',
  },
  'radiance support': {
    de: 'поддержка сияния',
    ru: 'поддержка сияния',
    en: 'radiance support',
  },
  'cell vitality support': {
    de: 'клеточная витальность',
    ru: 'клеточная витальность',
    en: 'cell vitality support',
  },
  'revitalising complex': {
    de: 'ревитализирующий комплекс',
    ru: 'ревитализирующий комплекс',
    en: 'revitalising complex',
  },
}

const STRATEGY_DEFINITIONS = {
  BARRIER_REPAIR: {
    id: 'BARRIER_REPAIR',
    basePriority: 70,
    lines: ['NICELY', 'GLACIAR'],
    actives: ['soothing complex', 'barrier support', 'hydration'],
  },
  ACNE_CONTROL: {
    id: 'ACNE_CONTROL',
    basePriority: 90,
    lines: ['BALANCE'],
    actives: ['sebum control', 'clarifying complex', 'pore refining'],
  },
  PIGMENT_CONTROL: {
    id: 'PIGMENT_CONTROL',
    basePriority: 88,
    lines: ['BECLARITY', 'CELL C', 'SUMMESUN'],
    actives: ['brightening complex', 'vitamin C', 'SPF'],
  },
  COLLAGEN_FIRMING: {
    id: 'COLLAGEN_FIRMING',
    basePriority: 84,
    lines: ['MYCODE', 'CELL'],
    actives: ['retinol', 'peptides', 'firming complex'],
  },
  HYDRATION: {
    id: 'HYDRATION',
    basePriority: 86,
    lines: ['GLACIAR', 'NICELY'],
    actives: ['hyaluronic acid', 'NMF support', 'hydration complex'],
  },
  VITAMIN_C_GLOW: {
    id: 'VITAMIN_C_GLOW',
    basePriority: 78,
    lines: ['CELL C', 'SUMMESUN'],
    actives: ['vitamin C', 'antioxidants', 'radiance support'],
  },
  CELL_ACTIVATION: {
    id: 'CELL_ACTIVATION',
    basePriority: 74,
    lines: ['CELL'],
    actives: ['cell vitality support', 'revitalising complex'],
  },
  PREVENTION: {
    id: 'PREVENTION',
    basePriority: 50,
    lines: ['CELL', 'CELL C', 'SUMMESUN'],
    actives: ['antioxidants', 'cell vitality support', 'SPF'],
  },
}

function localizeStrategy(strategy, lang) {
  const translated = T[strategy.id]?.[lang] || T[strategy.id]?.de

  return {
    ...strategy,
    name: translated?.name || strategy.id,
    reason: translated?.reason || '',
  }
}

function localizeActive(item, lang) {
  return ACTIVES[item]?.[lang] || item
}

function addOrUpdateStrategy(list, strategy) {
  if (!strategy) return

  const existing = list.find((item) => item.id === strategy.id)

  if (!existing) {
    list.push(strategy)
    return
  }

  existing.priority = Math.max(existing.priority, strategy.priority)

  existing.sourceProblems = [
    ...new Set([
      ...(existing.sourceProblems || []),
      ...(strategy.sourceProblems || []),
    ]),
  ]
}

function buildDetectedProblemSummary(problems = [], lang = 'de') {
  return problems.map((problem) => ({
    id: problem.id,
    group: problem.group,
    label: problem.label?.[lang] || problem.label?.de || problem.id,
    priority: problem.priority,
    strategies: problem.strategies,
    lines: problem.lines,
  }))
}

function collectStrategiesFromProblems(problems = []) {
  const strategies = []

  problems.forEach((problem) => {
    problem.strategies?.forEach((strategyId) => {
      const base = STRATEGY_DEFINITIONS[strategyId]
      if (!base) return

      addOrUpdateStrategy(strategies, {
        ...base,
        priority: Math.max(base.basePriority, problem.priority || base.basePriority),
        sourceProblems: [problem.id],
      })
    })
  })

  return strategies
}

function applyGoalBoosts(strategies = [], boosts = {}) {
  Object.entries(boosts).forEach(([strategyId, boost]) => {
    const base = STRATEGY_DEFINITIONS[strategyId]
    if (!base) return

    const existing = strategies.find((item) => item.id === strategyId)

    if (existing) {
      existing.priority += boost
      existing.sourceProblems = [
        ...new Set([...(existing.sourceProblems || []), 'CLIENT_GOAL']),
      ]
    } else if (boost > 0) {
      strategies.push({
        ...base,
        priority: base.basePriority + boost,
        sourceProblems: ['CLIENT_GOAL'],
      })
    }
  })

  return strategies
}

function enrichByAge(strategies, age) {
  if (age >= 50) {
    addOrUpdateStrategy(strategies, {
      ...STRATEGY_DEFINITIONS.COLLAGEN_FIRMING,
      priority: 80,
      sourceProblems: ['AGE_50_PLUS'],
    })
  }

  if (age >= 30 && age <= 45) {
    addOrUpdateStrategy(strategies, {
      ...STRATEGY_DEFINITIONS.CELL_ACTIVATION,
      priority: 60,
      sourceProblems: ['AGE_PREVENTION'],
    })
  }

  return strategies
}

function filterBarrierOverreaction(strategies, input = {}) {
  const text = textOf(input)

  const hasRealBarrierProblem = has(text, [
    'redness',
    'rötung',
    'покрас',
    'irritation',
    'раздраж',
    'reactive',
    'реактив',
    'couperose',
    'купероз',
    'rosacea',
    'розацеа',
    'barrier',
    'барьер',
    'burning',
    'жжение',
    'high sensitivity',
    'hohe empfindlichkeit',
    'высокая чувствительность',
  ])

  return strategies.map((strategy) => {
    if (strategy.id !== 'BARRIER_REPAIR') return strategy

    if (!hasRealBarrierProblem) {
      return {
        ...strategy,
        priority: Math.min(strategy.priority, 55),
      }
    }

    return strategy
  })
}

function forceGoalPriority(strategies, input = {}) {
  const text = textOf(input)

  const wantsHydration = has(text, [
    'hydration',
    'hydrate',
    'moisture',
    'feuchtigkeit',
    'befeuchtung',
    'увлаж',
    'обезвож',
    'сух',
    'комфорт',
  ])

  const wantsFirming = has(text, [
    'lifting',
    'firming',
    'anti-age',
    'anti aging',
    'straffung',
    'falten',
    'лифтинг',
    'упруг',
    'морщ',
    'дряб',
    'омолож',
  ])

  const wantsPigment = has(text, [
    'pigment',
    'flecken',
    'brightening',
    'пигмент',
    'пятн',
    'освет',
  ])

  const wantsAcne = has(text, [
    'acne',
    'akne',
    'unrein',
    'акне',
    'прыщ',
    'высып',
    'себум',
    'жирн',
  ])

  const realBarrierCrisis = has(text, [
    'redness',
    'rötung',
    'покрас',
    'irritation',
    'раздраж',
    'reactive',
    'реактив',
    'couperose',
    'купероз',
    'rosacea',
    'розацеа',
    'burning',
    'жжение',
    'high sensitivity',
    'hohe empfindlichkeit',
    'высокая чувствительность',
  ])

  return strategies.map((strategy) => {
    if (wantsHydration && strategy.id === 'HYDRATION') {
      return { ...strategy, priority: 1000 }
    }

    if (wantsFirming && !wantsHydration && strategy.id === 'COLLAGEN_FIRMING') {
      return { ...strategy, priority: 1000 }
    }

    if (wantsPigment && strategy.id === 'PIGMENT_CONTROL') {
      return { ...strategy, priority: 1000 }
    }

    if (wantsAcne && strategy.id === 'ACNE_CONTROL') {
      return { ...strategy, priority: 1000 }
    }

    if (!realBarrierCrisis && strategy.id === 'BARRIER_REPAIR') {
      return { ...strategy, priority: Math.min(strategy.priority, 50) }
    }

    return strategy
  })
}

export function buildStrategy(input = {}) {
  const lang = getLang(input)
  const age = Number(input.age || 0)

  const detectedProblems = detectSkinProblems(input)
  const goalBoosts = getGoalBoosts(input)

  let strategies = collectStrategiesFromProblems(detectedProblems)

  strategies = applyGoalBoosts(strategies, goalBoosts)
  strategies = enrichByAge(strategies, age)
  strategies = filterBarrierOverreaction(strategies, input)
  strategies = forceGoalPriority(strategies, input)

  if (strategies.length === 0) {
    strategies.push({
      ...STRATEGY_DEFINITIONS.PREVENTION,
      priority: STRATEGY_DEFINITIONS.PREVENTION.basePriority,
      sourceProblems: ['DEFAULT'],
    })
  }

  const sorted = strategies
    .sort((a, b) => b.priority - a.priority)
    .map((strategy) => localizeStrategy(strategy, lang))

  const primaryStrategy = sorted[0]
  const secondaryStrategies = sorted.slice(1, 3)

  const recommendedLines = [
    ...new Set([
      ...sorted.flatMap((strategy) => strategy.lines || []),
      ...detectedProblems.flatMap((problem) => problem.lines || []),
    ]),
  ]

  const activeIngredients = [
    ...new Set(sorted.flatMap((strategy) => strategy.actives || [])),
  ].map((item) => localizeActive(item, lang))

  return {
    lang,
    primaryStrategy,
    secondaryStrategies,
    strategies: sorted,
    recommendedLines,
    activeIngredients,
    detectedProblems: buildDetectedProblemSummary(detectedProblems, lang),
  }
}

export default buildStrategy
