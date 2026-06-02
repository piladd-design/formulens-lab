import { products } from './products.js'

function normalize(value) {
  return String(value || '').trim().toLowerCase()
}

function toArray(value) {
  if (Array.isArray(value)) return value
  if (!value) return []
  return [value]
}

export function detectGoal(input = {}) {
  const text = normalize(input.goal)

  if (text.includes('увлаж') || text.includes('hydrat') || text.includes('feucht'))
    return 'hydration'

  if (
    text.includes('лифт') ||
    text.includes('lifting') ||
    text.includes('firm') ||
    text.includes('straff')
  )
    return 'lifting'

  if (
    text.includes('морщ') ||
    text.includes('anti') ||
    text.includes('wrinkle') ||
    text.includes('falten')
  )
    return 'anti_age'

  if (
    text.includes('пигмент') ||
    text.includes('pigment') ||
    text.includes('fleck')
  )
    return 'pigmentation'

  if (
    text.includes('акне') ||
    text.includes('acne') ||
    text.includes('akne')
  )
    return 'acne'

  if (
    text.includes('чувств') ||
    text.includes('sensitive') ||
    text.includes('empfind')
  )
    return 'sensitive'

  return 'hydration'
}

function goalMainLine(goal) {
  switch (goal) {
    case 'hydration':
      return 'GLACIAR'

    case 'lifting':
      return 'MYCODE'

    case 'anti_age':
      return 'CELL'

    case 'pigmentation':
      return 'BECLARITY'

    case 'acne':
      return 'BALANCE'

    case 'sensitive':
      return 'NICELY'

    default:
      return 'GLACIAR'
  }
}

function scoreProduct(product, context) {
  let score = 0

  if (product.line === context.mainLine)
    score += 100

  if (
    context.age >= 45 &&
    (
      product.line === 'MYCODE' ||
      product.line === 'CELL'
    )
  ) {
    score += 15
  }

  return score
}

export function selectProducts(input = {}) {
  const goal = detectGoal(input)

  const mainLine = goalMainLine(goal)

  const context = {
    goal,
    age: Number(input.age || 0),
    mainLine,
  }

  const scored = Object.values(products)
    .map(product => ({
      product,
      score: scoreProduct(product, context),
    }))
    .sort((a, b) => b.score - a.score)

  const supportLines = ['MYCODE', 'CELL', 'NICELY', 'BECLARITY', 'BALANCE']
    .filter(line => line !== mainLine)
    .slice(0, 3)

  return {
    context,

    recommendedLines: [
      mainLine,
      ...supportLines,
    ],

    topProducts: scored
      .slice(0, 20)
      .map(item => item.product),

    protocolProducts: {
      cleansing: scored
        .filter(x => x.product.phase === 'cleansing')
        .map(x => x.product),

      toning: scored
        .filter(x => x.product.phase === 'toning')
        .map(x => x.product),

      peeling: scored
        .filter(x => x.product.phase === 'peeling')
        .map(x => x.product),

      active: scored
        .filter(x => x.product.phase === 'active')
        .map(x => x.product),

      mask: scored
        .filter(x => x.product.phase === 'mask')
        .map(x => x.product),

      final: scored
        .filter(x => x.product.phase === 'final')
        .map(x => x.product),

      protection: scored
        .filter(x => x.product.phase === 'protection')
        .map(x => x.product),
    },

    homecare: {
      morning: [],
      evening: [],
    },
  }
}
