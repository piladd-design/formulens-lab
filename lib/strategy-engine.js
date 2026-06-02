// lib/strategy-engine.js

import { detectSkinProblems } from './skin-problems.js'

const STRATEGY_DEFINITIONS = {
  BARRIER_REPAIR: {
    id: 'BARRIER_REPAIR',
    name: 'Barrier Repair Strategy',
    priority: 95,
    lines: ['NICELY', 'GLACIAR'],
    actives: ['soothing complex', 'barrier support', 'hydration'],
    reason:
      'Sensitive, reactive or barrier-weakened skin needs stabilisation before intensive correction.',
  },

  ACNE_CONTROL: {
    id: 'ACNE_CONTROL',
    name: 'Acne & Sebum Control Strategy',
    priority: 92,
    lines: ['BALANCE'],
    actives: ['sebum control', 'clarifying complex', 'pore refining'],
    reason:
      'Impurities, oiliness or comedones require sebum control and pore-focused care.',
  },

  PIGMENT_CONTROL: {
    id: 'PIGMENT_CONTROL',
    name: 'Pigment Control Strategy',
    priority: 90,
    lines: ['BECLARITY', 'CELL C', 'SUMMESUN'],
    actives: ['brightening complex', 'vitamin C', 'SPF'],
    reason:
      'Pigmentation and uneven tone need brightening, antioxidant support and daily UV protection.',
  },

  COLLAGEN_FIRMING: {
    id: 'COLLAGEN_FIRMING',
    name: 'Collagen & Firming Strategy',
    priority: 88,
    lines: ['MYCODE', 'CELL'],
    actives: ['retinol', 'peptides', 'firming complex'],
    reason:
      'Wrinkles, sagging or loss of firmness require collagen support and firming correction.',
  },

  HYDRATION: {
    id: 'HYDRATION',
    name: 'Hydration Strategy',
    priority: 82,
    lines: ['GLACIAR', 'NICELY'],
    actives: ['hyaluronic acid', 'NMF support', 'hydration complex'],
    reason:
      'Dryness, tightness or dehydration require water balance restoration and comfort support.',
  },

  VITAMIN_C_GLOW: {
    id: 'VITAMIN_C_GLOW',
    name: 'Vitamin C & Glow Strategy',
    priority: 80,
    lines: ['CELL C', 'SUMMESUN'],
    actives: ['vitamin C', 'antioxidants', 'radiance support'],
    reason:
      'Dull, tired or photoaged skin benefits from vitamin C, glow and antioxidant protection.',
  },

  CELL_ACTIVATION: {
    id: 'CELL_ACTIVATION',
    name: 'Cell Activation Strategy',
    priority: 78,
    lines: ['CELL'],
    actives: ['cell vitality support', 'revitalising complex'],
    reason:
      'Early ageing, tired skin or regeneration goals need cellular activation and vitality support.',
  },

  PREVENTION: {
    id: 'PREVENTION',
    name: 'Prevention & Skin Quality Strategy',
    priority: 50,
    lines: ['CELL', 'CELL C', 'SUMMESUN'],
    actives: ['antioxidants', 'cell vitality support', 'SPF'],
    reason:
      'No dominant concern was detected, so the focus is prevention, glow and skin quality.',
  },
}

function addUniqueStrategy(list, strategy) {
  if (!strategy) return

  if (!list.find((item) => item.id === strategy.id)) {
    list.push(strategy)
  }
}

function buildDetectedProblemSummary(problems = []) {
  return problems.map((problem) => ({
    id: problem.id,
    group: problem.group,
    label: problem.label,
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
        priority: Math.max(base.priority, problem.priority || base.priority),
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
  const age = Number(input.age || 0)
  const detectedProblems = detectSkinProblems(input)

  let strategies = collectStrategiesFromProblems(detectedProblems)

  strategies = enrichByAge(strategies, age)

  if (strategies.length === 0) {
    strategies.push({
      ...STRATEGY_DEFINITIONS.PREVENTION,
      sourceProblems: ['DEFAULT'],
    })
  }

  const sorted = strategies.sort((a, b) => b.priority - a.priority)

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
  ]

  return {
    primaryStrategy,
    secondaryStrategies,
    strategies: sorted,
    recommendedLines,
    activeIngredients,
    detectedProblems: buildDetectedProblemSummary(detectedProblems),
  }
}

export default buildStrategy
