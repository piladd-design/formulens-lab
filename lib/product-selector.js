import { products } from './products.js'

function normalize(value) {
  return String(value || '').trim().toLowerCase()
}

function toArray(value) {
  if (Array.isArray(value)) return value
  if (!value) return []
  return [value]
}

function detectGoal(input = {}) {
  const text = normalize(input.goal)

  if (text.includes('увлаж') || text.includes('hydrat') || text.includes('feucht')) return 'hydration'
  if (text.includes('лифт') || text.includes('упруг') || text.includes('lifting') || text.includes('firm') || text.includes('straff')) return 'lifting'
  if (text.includes('морщ') || text.includes('falten') || text.includes('wrinkle') || text.includes('anti')) return 'anti_age'
  if (text.includes('пигмент') || text.includes('pigment') || text.includes('fleck')) return 'pigmentation'
  if (text.includes('акне') || text.includes('acne') || text.includes('akne')) return 'acne'
  if (text.includes('чувств') || text.includes('sensitive') || text.includes('empfind')) return 'sensitive'
  if (text.includes('сиян') || text.includes('glow') || text.includes('radiance')) return 'glow'

  return 'hydration'
}

function normalizeConcern(value) {
  const text = normalize(value)

  if (text.includes('морщ') || text.includes('falten') || text.includes('wrinkle')) return 'wrinkles'
  if (text.includes('дряб') || text.includes('lifting') || text.includes('firm') || text.includes('flacc')) return 'flaccidity'
  if (text.includes('пигмент') || text.includes('pigment') || text.includes('fleck')) return 'pigmentation'
  if (text.includes('акне') || text.includes('acne') || text.includes('akne')) return 'acne'
  if (text.includes('крас') || text.includes('red') || text.includes('röt')) return 'redness'
  if (text.includes('сух') || text.includes('dry') || text.includes('trocken')) return 'dryness'
  if (text.includes('обезв') || text.includes('dehyd')) return 'dehydration'
  if (text.includes('туск') || text.includes('dull') || text.includes('fahl')) return 'dullness'
  if (text.includes('реген') || text.includes('regen')) return 'regeneration'

  return text
}

function normalizeSkinType(value) {
  const text = normalize(value)

  if (text.includes('сух') || text.includes('dry') || text.includes('trocken')) return 'dry'
  if (text.includes('жир') || text.includes('oily') || text.includes('fett')) return 'oily'
  if (text.includes('комб') || text.includes('combination') || text.includes('misch')) return 'combination'
  if (text.includes('чув') || text.includes('sensitive') || text.includes('empfind')) return 'sensitive'
  if (text.includes('normal')) return 'normal'

  return 'all'
}

function scoreProduct(product, context) {
  let score = 0

  const goals = product.goals || []
  const concerns = product.concerns || []
  const skinTypes = product.skinTypes || []

  if (goals.includes(context.goal)) score += 12

  context.concerns.forEach((concern) => {
    if (concerns.includes(concern)) score += 7
    if (goals.includes(concern)) score += 4
  })

  if (skinTypes.includes(context.skinType)) score += 5
  if (skinTypes.includes('all')) score += 2

  if (context.age >= 45) {
    if (goals.includes('anti_age')) score += 4
    if (goals.includes('lifting')) score += 3
    if (goals.includes('firming')) score += 3
    if (concerns.includes('wrinkles')) score += 3
  }

  if (context.sensitivity !== 'low') {
    if (goals.includes('sensitive')) score += 5
    if (goals.includes('barrier_repair')) score += 4
    if (concerns.includes('redness')) score += 3
  }

  if (context.goal === 'hydration' && product.line === 'GLACIAR') score += 8
  if (context.goal === 'lifting' && product.line.includes('MYCODE')) score += 8
  if (context.goal === 'anti_age' && product.line.includes('MYCODE')) score += 7
  if (context.goal === 'pigmentation' && product.line === 'BECLARITY') score += 8
  if (context.goal === 'acne' && product.line === 'BALANCE') score += 8
  if (context.goal === 'sensitive' && product.line === 'NICELY') score += 8
  if (context.goal === 'glow' && product.line === 'CELL C') score += 8

  return score
}

function getBest(scored, phase, limit = 1) {
  return scored
    .filter((item) => item.product.phase === phase)
    .slice(0, limit)
    .map((item) => item.product)
}

export function selectProducts(input = {}) {
  const context = {
    goal: detectGoal(input),
    concerns: toArray(input.concerns).map(normalizeConcern),
    skinType: normalizeSkinType(input.skinType),
    sensitivity: normalize(input.sensitivity || 'medium'),
    age: Number(input.age || 0),
  }

  const scored = Object.values(products)
    .map((product) => ({
      product,
      score: scoreProduct(product, context),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)

  const lineScores = {}

  scored.forEach((item) => {
    const line = item.product.line
    lineScores[line] = (lineScores[line] || 0) + item.score
  })

  const recommendedLines = Object.entries(lineScores)
    .sort((a, b) => b[1] - a[1])
    .map(([line]) => line)

  return {
    context,
    recommendedLines,
    topProducts: scored.slice(0, 12).map((item) => item.product),

    protocolProducts: {
      cleansing: getBest(scored, 'cleansing', 2),
      toning: getBest(scored, 'toning', 2),
      peeling: getBest(scored, 'peeling', 1),
      active: getBest(scored, 'active', 4),
      mask: getBest(scored, 'mask', 2),
      final: getBest(scored, 'final', 3),
      protection: getBest(scored, 'protection', 2),
    },

    homecare: {
      morning: [
        ...getBest(scored, 'cleansing', 1),
        ...getBest(scored, 'toning', 1),
        ...getBest(scored.filter((i) => i.product.homecare), 'active', 1),
        ...getBest(scored.filter((i) => i.product.homecare), 'final', 1),
        ...getBest(scored, 'protection', 1),
      ],

      evening: [
        ...getBest(scored, 'cleansing', 1),
        ...getBest(scored, 'toning', 1),
        ...getBest(scored.filter((i) => i.product.homecare), 'active', 1),
        ...getBest(scored.filter((i) => i.product.homecare), 'final', 1),
      ],
    },
  }
}

export default selectProducts
