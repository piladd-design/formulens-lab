// lib/strategy-engine.js

import { detectSkinProblems } from './skin-problems.js'

function getLang(input = {}) {
  const lang = String(input.lang || 'DE').toLowerCase()
  if (lang === 'ru') return 'ru'
  if (lang === 'en') return 'en'
  return 'de'
}

const T = {
  BARRIER_REPAIR: {
    de: {
      name: 'Barriere-Reparatur Strategie',
      reason:
        'Empfindliche, reaktive oder geschwächte Haut benötigt zuerst Stabilisierung der Hautbarriere.',
    },
    ru: {
      name: 'Стратегия восстановления барьера',
      reason:
        'Чувствительная, реактивная или ослабленная кожа требует сначала стабилизации кожного барьера.',
    },
    en: {
      name: 'Barrier Repair Strategy',
      reason:
        'Sensitive, reactive or barrier-weakened skin needs stabilisation before intensive correction.',
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
        'Pigmentierung und ungleichmäßiger Ton benötigen Aufhellung, antioxidative Unterstützung und täglichen UV-Schutz.',
    },
    ru: {
      name: 'Стратегия контроля пигментации',
      reason:
        'Пигментация и неровный тон требуют осветления, антиоксидантной поддержки и ежедневной SPF-защиты.',
    },
    en: {
      name: 'Pigment Control Strategy',
      reason:
        'Pigmentation and uneven tone need brightening, antioxidant support and daily UV protection.',
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
    de: 'beruhigender Komplex',
    ru: 'успокаивающий комплекс',
    en: 'soothing complex',
  },
  'barrier support': {
    de: 'Barriere-Unterstützung',
    ru: 'поддержка барьера',
    en: 'barrier support',
  },
  hydration: {
    de: 'Hydration',
    ru: 'увлажнение',
    en: 'hydration',
  },
  'sebum control': {
    de: 'Sebumkontrolle',
    ru: 'контроль себума',
    en: 'sebum control',
  },
  'clarifying complex': {
    de: 'klärender Komplex',
    ru: 'очищающий комплекс',
    en: 'clarifying complex',
  },
  'pore refining': {
    de: 'Porenverfeinerung',
    ru: 'сужение пор',
    en: 'pore refining',
  },
  'brightening complex': {
    de: 'Brightening-Komplex',
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
    de: 'Retinol',
    ru: 'ретинол',
    en: 'retinol',
  },
  peptides: {
    de: 'Peptide',
    ru: 'пептиды',
    en: 'peptides',
  },
  'firming complex': {
    de: 'straffender Komplex',
    ru: 'укрепляющий комплекс',
    en: 'firming complex',
  },
  'hyaluronic acid': {
    de: 'Hyaluronsäure',
    ru: 'гиалуроновая кислота',
    en: 'hyaluronic acid',
  },
  'NMF support': {
    de: 'NMF-Unterstützung',
    ru: 'поддержка NMF',
    en: 'NMF support',
  },
  'hydration complex': {
    de: 'Hydrationskomplex',
    ru: 'увлажняющий комплекс',
    en: 'hydration complex',
  },
  antioxidants: {
    de: 'Antioxidantien',
    ru: 'антиоксиданты',
    en: 'antioxidants',
  },
  'radiance support': {
    de: 'Glow-Unterstützung',
    ru: 'поддержка сияния',
    en: 'radiance support',
  },
  'cell vitality support': {
    de: 'Zellvitalität',
    ru: 'клеточная витальность',
    en: 'cell vitality support',
  },
  'revitalising complex': {
    de: 'revitalisierender Komplex',
    ru: 'ревитализирующий комплекс',
    en: 'revitalising complex',
  },
}

const STRATEGY_DEFINITIONS = {
  BARRIER_REPAIR: {
    id: 'BARRIER_REPAIR',
    basePriority: 95,
    lines: ['NICELY', 'GLACIAR'],
    actives: ['soothing complex', 'barrier support', 'hydration'],
  },
  ACNE_CONTROL: {
    id: 'ACNE_CONTROL',
    basePriority: 92,
    lines: ['BALANCE'],
    actives: ['sebum control', 'clarifying complex', 'pore refining'],
  },
  PIGMENT_CONTROL: {
    id: 'PIGMENT_CONTROL',
    basePriority: 90,
    lines: ['BECLARITY', 'CELL C', 'SUMMESUN'],
    actives: ['brightening complex', 'vitamin C', 'SPF'],
  },
  COLLAGEN_FIRMING: {
    id: 'COLLAGEN_FIRMING',
    basePriority: 88,
    lines: ['MYCODE', 'CELL'],
    actives: ['retinol', 'peptides', 'firming complex'],
  },
  HYDRATION: {
    id: 'HYDRATION',
    basePriority: 82,
    lines: ['GLACIAR', 'NICELY'],
    actives: ['hyaluronic acid', 'NMF support', 'hydration complex'],
  },
  VITAMIN_C_GLOW: {
    id: 'VITAMIN_C_GLOW',
    basePriority: 80,
    lines: ['CELL C', 'SUMMESUN'],
    actives: ['vitamin C', 'antioxidants', 'radiance support'],
  },
  CELL_ACTIVATION: {
    id: 'CELL_ACTIVATION',
    basePriority: 78,
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

function addUniqueStrategy(list, strategy) {
  if (!strategy) return

  if (!list.find((item) => item.id === strategy.id)) {
    list.push(strategy)
  }
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

      addUniqueStrategy(strategies, {
        ...base,
        priority: Math.max(base.basePriority, problem.priority || base.basePriority),
        sourceProblems: [problem.id],
      })
    })
  })

  return strategies
}

function enrichByAge(strategies, age) {
  if (age >= 50) {
    addUniqueStrategy(strategies, {
      ...STRATEGY_DEFINITIONS.COLLAGEN_FIRMING,
      priority: 82,
      sourceProblems: ['AGE_50_PLUS'],
    })
  }

  if (age >= 30 && age <= 45) {
    addUniqueStrategy(strategies, {
      ...STRATEGY_DEFINITIONS.CELL_ACTIVATION,
      priority: 60,
      sourceProblems: ['AGE_PREVENTION'],
    })
  }

  return strategies
}

export function buildStrategy(input = {}) {
  const lang = getLang(input)
  const age = Number(input.age || 0)
  const detectedProblems = detectSkinProblems(input)

  let strategies = collectStrategiesFromProblems(detectedProblems)
  strategies = enrichByAge(strategies, age)

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
