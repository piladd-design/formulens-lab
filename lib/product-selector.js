import { PRODUCTS } from './products-database.js'
import { PRODUCT_ALIASES } from './product-aliases.js'
import { getProtocolRule } from './protocol-rules.js'

function normalizeText(value = '') {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
}

export function findProductById(id) {
  if (!id) return null

  const product = PRODUCTS.find((product) => product.id === id) || null

  if (!product) return null

  if (product.active === false || product.discontinued === true) {
    return product.replacement ? findProductById(product.replacement) : null
  }

  return product
}

function findProducts(ids = []) {
  return ids
    .map((id) => findProductById(id))
    .filter(Boolean)
}

export function findProductByName(query = '') {
  const value = normalizeText(query)

  if (!value) return null

  const directMatch = PRODUCTS.find((product) => {
    return (
      normalizeText(product.id) === value ||
      normalizeText(product.name) === value
    )
  })

  if (directMatch) {
    return findProductById(directMatch.id)
  }

  for (const [productId, aliases] of Object.entries(PRODUCT_ALIASES || {})) {
    const product = findProductById(productId)
    if (!product) continue

    const allNames = [
      product.id,
      product.name,
      ...(aliases || []),
    ].map(normalizeText)

    const exactMatch = allNames.some((name) => name === value)

    if (exactMatch) {
      return product
    }

    const softMatch = allNames.some((name) => {
      return (
        value.includes(name) ||
        name.includes(value)
      )
    })

    if (softMatch) {
      return product
    }
  }

  return null
}

function scoreCandidate(source, candidate) {
  if (!source || !candidate) return 0
  if (source.id === candidate.id) return -999

  let score = 0

  if (source.category === candidate.category) score += 40
  if (source.step === candidate.step) score += 35

  const sourceGoals = new Set(source.goals || [])
  const sourceConcerns = new Set(source.concerns || [])

  ;(candidate.goals || []).forEach((goal) => {
    if (sourceGoals.has(goal)) score += 8
  })

  ;(candidate.concerns || []).forEach((concern) => {
    if (sourceConcerns.has(concern)) score += 6
  })

  if (source.line !== candidate.line) score += 12
  if (source.line === candidate.line) score -= 20

  if (candidate.active === false || candidate.discontinued === true) {
    score -= 100
  }

  return score
}

export function getAlternativeCandidates(productOrQuery, limit = 5) {
  const source =
    typeof productOrQuery === 'string'
      ? findProductByName(productOrQuery)
      : productOrQuery

  if (!source) return []

  return PRODUCTS
    .map((candidate) => ({
      product: candidate,
      score: scoreCandidate(source, candidate),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => ({
      ...item.product,
      match: Math.max(40, Math.min(98, item.score)),
    }))
}

export function buildProtocolProducts(goal = 'general') {
  const rule = getProtocolRule(goal) || getProtocolRule('general')

  return {
    mainLine: rule?.mainLine || 'ECC',

    supportLines: rule?.supportLines || [],

    peel: rule?.peel
      ? findProductById(rule.peel)
      : null,

    active: findProducts(rule?.active || []),

    mask: rule?.mask
      ? findProductById(rule.mask)
      : null,

    finish: findProducts(rule?.finish || []),

    homecare: findProducts(rule?.homecare || []),

    local: findProducts(rule?.local || []),
  }
}

export default buildProtocolProducts
