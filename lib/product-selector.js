import { PRODUCTS } from './products-database.js'
import { getProtocolRule } from './protocol-rules.js'

function findProduct(id) {
  if (!id) return null

  const product = PRODUCTS.find((product) => product.id === id) || null

  if (!product) return null

  if (product.active === false || product.discontinued === true) {
    return product.replacement ? findProduct(product.replacement) : null
  }

  return product
}

function findProducts(ids = []) {
  return ids
    .map((id) => findProduct(id))
    .filter(Boolean)
}

export function buildProtocolProducts(goal = 'general') {
  const rule = getProtocolRule(goal) || getProtocolRule('general')

  return {
    mainLine: rule?.mainLine || 'ECC',

    supportLines: rule?.supportLines || [],

    peel: rule?.peel
      ? findProduct(rule.peel)
      : null,

    active: findProducts(rule?.active || []),

    mask: rule?.mask
      ? findProduct(rule.mask)
      : null,

    finish: findProducts(rule?.finish || []),

    homecare: findProducts(rule?.homecare || []),

    local: findProducts(rule?.local || []),
  }
}

export default buildProtocolProducts
