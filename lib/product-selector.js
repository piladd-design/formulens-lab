import { PRODUCTS } from './products-database.js'
import { getProtocolRule } from './protocol-rules.js'

function findProduct(id) {
  return PRODUCTS.find(product => product.id === id)
}

function findProducts(ids = []) {
  return ids
    .map(findProduct)
    .filter(Boolean)
}

export function buildProtocolProducts(goal) {
  const rule = getProtocolRule(goal)

  return {
    mainLine: rule.mainLine,

    supportLines: rule.supportLines || [],

    peel: rule.peel
      ? findProduct(rule.peel)
      : null,

    active: findProducts(rule.active),

    mask: rule.mask
      ? findProduct(rule.mask)
      : null,

    finish: findProducts(rule.finish),

    homecare: findProducts(rule.homecare),

    local: findProducts(rule.local || [])
  }
}

export default buildProtocolProducts
