import { products } from './products.js'

function normalize(value) {
  return String(value || '').trim().toLowerCase()
}

function toArray(value) {
  if (Array.isArray(value)) return value
  if (!value) return []
  return [value]
}

function canonicalLine(line = '') {
  const value = String(line).toUpperCase()

  if (value.includes('MYCODE')) return 'MYCODE'
  if (value.includes('CELL C')) return 'CELL_C'
  if (value.includes('CELL')) return 'CELL'
  if (value.includes('GLACIAR')) return 'GLACIAR'
  if (value.includes('NICELY')) return 'NICELY'
  if (value.includes('BALANCE')) return 'BALANCE'
  if (value.includes('BECLARITY')) return 'BECLARITY'
  if (value.includes('SUMMESUN')) return 'SUMMESUN'

  return value
}

export function detectGoal(input = {}) {
  const text = normalize(input.goal)

  if (text.includes('увлаж') || text.includes('hydrat') || text.includes('feucht')) {
    return 'hydration'
  }

  if (
    text.includes('лифт') ||
    text.includes('упруг') ||
    text.includes('lifting') ||
    text.includes('firm') ||
    text.includes('straff')
  ) {
    return 'lifting'
  }

  if (
    text.includes('морщ') ||
    text.includes('anti') ||
    text.includes('wrinkle') ||
    text.includes('falten')
  ) {
    return 'anti_age'
  }

  if (
    text.includes('пигмент') ||
    text.includes('pigment') ||
    text.includes('fleck')
  ) {
    return 'pigmentation'
  }

  if (
    text.includes('акне') ||
    text.includes('acne') ||
    text.includes('akne')
  ) {
    return 'acne'
  }

  if (
    text.includes('чувств') ||
    text.includes('sensitive') ||
    text.includes('empfind')
  ) {
    return 'sensitive'
  }

  if (
    text.includes('сиян') ||
    text.includes('glow') ||
    text.includes('radiance')
  ) {
    return 'glow'
  }

  return 'hydration'
}

function goalMainLine(goal) {
  const map = {
    hydration: 'GLACIAR',
    lifting: 'MYCODE',
    anti_age: 'MYCODE',
    pigmentation: 'BECLARITY',
    acne: 'BALANCE',
    sensitive: 'NICELY',
    glow: 'CELL_C',
  }

  return map[goal] || 'GLACIAR'
}

function normalizeConcern(value) {
  const text = normalize(value)

  if (text.includes('wrinkles') || text.includes('морщ') || text.includes('falten')) return 'wrinkles'
  if (text.includes('lifting') || text.includes('дряб') || text.includes('firm')) return 'lifting'
  if (text.includes('pigmentation') || text.includes('пигмент')) return 'pigmentation'
  if (text.includes('acne') || text.includes('акне') || text.includes('akne')) return 'acne'
  if (text.includes('redness') || text.includes('крас') || text.includes('röt')) return 'redness'
  if (text.includes('dehydration') || text.includes('обезв')) return 'dehydration'
  if (text.includes('dullness') || text.includes('туск')) return 'dullness'
  if (text.includes('regeneration') || text.includes('реген')) return 'regeneration'

  return text
}

function supportLinesFromConcerns(concerns, mainLine) {
  const lines = []

  concerns.forEach((concern) => {
    if (concern === 'wrinkles' || concern === 'lifting') {
      lines.push('MYCODE', 'CELL')
    }

    if (concern === 'pigmentation') {
      lines.push('BECLARITY', 'CELL_C')
    }

    if (concern === 'acne') {
      lines.push('BALANCE')
    }

    if (concern === 'redness') {
      lines.push('NICELY')
    }

    if (concern === 'dehydration') {
      lines.push('GLACIAR')
    }

    if (concern === 'dullness') {
      lines.push('CELL_C')
    }

    if (concern === 'regeneration') {
      lines.push('CELL')
    }
  })

  return [...new Set(lines)].filter((line) => line !== mainLine)
}

function scoreProduct(product, context, phase) {
  let score = 0

  const line = canonicalLine(product.line)
  const goals = product.goals || []
  const concerns = product.concerns || []
  const skinTypes = product.skinTypes || []

  if (line === context.mainLine) score += 100

  if (context.supportLines.includes(line)) score += 25

  if (goals.includes(context.goal)) score += 20

  context.concerns.forEach((concern) => {
    if (concerns.includes(concern)) score += 8
    if (goals.includes(concern)) score += 5
  })

  if (skinTypes.includes(context.skinType)) score += 5
  if (skinTypes.includes('all')) score += 2

  if (context.age >= 45) {
    if (goals.includes('anti_age')) score += 6
    if (goals.includes('lifting')) score += 6
    if (goals.includes('firming')) score += 4
  }

  if (context.sensitivity !== 'low') {
    if (goals.includes('sensitive')) score += 4
    if (goals.includes('barrier_repair')) score += 4
  }

  if (phase === 'cleansing' || phase === 'toning') {
    if (line === context.mainLine) score += 20
    if (context.mainLine === 'MYCODE' && line === 'GLACIAR') score += 15
    if (context.mainLine === 'CELL' && line === 'GLACIAR') score += 15
    if (context.sensitivity !== 'low' && line === 'NICELY') score += 10
  }

  if (phase === 'protection' && line === 'SUMMESUN') score += 100

  if (context.goal !== 'acne' && !context.concerns.includes('acne') && line === 'BALANCE') {
    score -= 100
  }

  return score
}

function getPhaseProducts(context, phase, limit = 1) {
  return Object.values(products)
    .filter((product) => product.phase === phase)
    .map((product) => ({
      product,
      score: scoreProduct(product, context, phase),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.product)
}

export function selectProducts(input = {}) {
  const goal = detectGoal(input)
  const mainLine = goalMainLine(goal)

  const concerns = toArray(input.concerns).map(normalizeConcern)

  const supportLines = supportLinesFromConcerns(concerns, mainLine)

  const context = {
    goal,
    mainLine,
    supportLines,
    concerns,
    age: Number(input.age || 0),
    skinType: normalize(input.skinType || 'all'),
    sensitivity: normalize(input.sensitivity || 'medium'),
  }

  const protocolProducts = {
    cleansing: getPhaseProducts(context, 'cleansing', 1),
    toning: getPhaseProducts(context, 'toning', 1),
    peeling: getPhaseProducts(context, 'peeling', 1),
    active: getPhaseProducts(context, 'active', 3),
    mask: getPhaseProducts(context, 'mask', 1),
    final: getPhaseProducts(context, 'final', 2),
    protection: getPhaseProducts(context, 'protection', 1),
  }

  const topProducts = [
    ...protocolProducts.cleansing,
    ...protocolProducts.toning,
    ...protocolProducts.peeling,
    ...protocolProducts.active,
    ...protocolProducts.mask,
    ...protocolProducts.final,
    ...protocolProducts.protection,
  ]

  return {
    context,

    recommendedLines: [
      mainLine,
      ...supportLines,
    ],

    topProducts,

    protocolProducts,

    homecare: {
      morning: [
        ...getPhaseProducts(context, 'cleansing', 1),
        ...getPhaseProducts(context, 'toning', 1),
        ...getPhaseProducts(context, 'active', 1).filter((p) => p.homecare),
        ...getPhaseProducts(context, 'final', 1).filter((p) => p.homecare),
        ...getPhaseProducts(context, 'protection', 1),
      ],

      evening: [
        ...getPhaseProducts(context, 'cleansing', 1),
        ...getPhaseProducts(context, 'toning', 1),
        ...getPhaseProducts(context, 'active', 1).filter((p) => p.homecare),
        ...getPhaseProducts(context, 'final', 1).filter((p) => p.homecare),
      ],
    },
  }
}

export default selectProducts
