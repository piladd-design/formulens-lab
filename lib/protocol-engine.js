import { PRODUCTS } from './products-database.js'
import { buildProtocolProducts } from './product-selector.js'
import { PREPARATION_PROTOCOLS } from './protocol-library.js'

function normalizeGoal(goal = 'general') {
  const value = String(goal).toLowerCase().trim()

  const has = (patterns) => patterns.some((word) => value.includes(word))

  if (has([
    'раздраж',
    'покрасн',
    'краснот',
    'чувств',
    'реактив',
    'купероз',
    'барьер',
    'sens',
    'empfind',
    'redness',
    'irritat',
    'reactive',
    'barrier',
    'couperose',
  ])) {
    return 'sensitivity'
  }

  if (has([
    'пор',
    'себум',
    'жирн',
    'комедон',
    'текстур',
    'рельеф',
    'pores',
    'pore',
    'sebum',
    'oily',
    'comedon',
    'texture',
  ])) {
    return 'pore_refining'
  }

  if (has([
    'акне',
    'прыщ',
    'высып',
    'воспален',
    'acne',
    'akne',
    'breakout',
  ])) {
    return 'acne'
  }

  if (has([
    'пигмент',
    'пятн',
    'мелазм',
    'осветл',
    'pigm',
    'fleck',
    'bright',
    'spot',
    'melasma',
  ])) {
    return 'pigmentation'
  }

  if (has([
    'регенерац',
    'восстанов',
    'обновлен',
    'репарац',
    'regen',
    'repair',
    'renewal',
  ])) {
    return 'regeneration'
  }

  if (has([
    'lift',
    'firm',
    'лифт',
    'упруг',
    'straff',
    'морщ',
    'falten',
    'anti',
    'age',
  ])) {
    return 'anti_age'
  }

  if (has([
    'glow',
    'radiance',
    'сиян',
  ])) {
    return 'radiance'
  }

  if (has([
    'hydr',
    'feucht',
    'увлаж',
    'сух',
    'обезвож',
    'влага',
    'dehydrat',
    'dry',
  ])) {
    return 'hydration'
  }

  return 'general'
}

function findById(id) {
  const product = PRODUCTS.find((product) => product.id === id) || null

  if (!product) return null

  if (product.active === false || product.discontinued === true) {
    return product.replacement ? findById(product.replacement) : null
  }

  return product
}

function productStep(product, overrides = {}) {
  if (!product) return null

  return {
    id: product.id,
    name: product.name,
    line: product.line,
    category: product.category,
    step: product.step,

    amount: overrides.amount || product.amount || '',
    application: overrides.application || product.application || '',
    exposure: overrides.exposure || product.exposure || '',
    removal: overrides.removal || product.removal || '',
    note: overrides.note || product.note || '',

    goals: product.goals || [],
    concerns: product.concerns || [],
  }
}

function buildSimplePhase(title, products = []) {
  const steps = products
    .filter(Boolean)
    .map((product) => productStep(product))
    .filter(Boolean)

  if (!steps.length) return null

  return { title, steps }
}

function getPreparationKey(goal) {
  if (goal === 'hydration') return 'GLACIAR'
  if (goal === 'sensitivity') return 'NICELY'

  return 'STANDARD'
}

function buildPreparationPhases(goal) {
  const key = getPreparationKey(goal)
  const template = PREPARATION_PROTOCOLS[key] || PREPARATION_PROTOCOLS.STANDARD

  return template.steps
    .map((phase) => {
      const steps = (phase.products || [])
        .map((productId) => productStep(findById(productId), phase))
        .filter(Boolean)

      if (!steps.length) return null

      return {
        title: phase.title,
        steps,
      }
    })
    .filter(Boolean)
}

function getProfessionalFinish(goal, selected) {
  if (goal === 'sensitivity') {
    return [
      findById('nicely-smooth-final-cream'),
      findById('ecc-repair-lip-balm'),
    ].filter(Boolean)
  }

  return [
    findById('ecc-repair-shield-spf50'),
    findById('ecc-repair-lip-balm'),
  ].filter(Boolean)
}

export function buildProtocol(input = {}) {
  const goal = normalizeGoal(input.goal || input.treatmentGoal || input.primaryGoal)
  const selected = buildProtocolProducts(goal)

  const preparationPhases = buildPreparationPhases(goal)

  const active = selected.active || []
  const mask = selected.mask ? [selected.mask] : []
  const finish = getProfessionalFinish(goal, selected)

  const phases = [
    ...preparationPhases,
    buildSimplePhase('Активная фаза', active),
    buildSimplePhase('Маска', mask),
    buildSimplePhase('Завершение и защита', finish),
  ].filter(Boolean)

  const preparation = preparationPhases.flatMap((phase) => phase.steps)

  return {
    goal,

    mainLine: selected.mainLine || 'ECC',
    supportLines: selected.supportLines || [],

    protocolType: 'Профессиональный протокол',
    variantName: selected.variantName || selected.mainLine || 'STANDARD',

    phases,

    preparation,
    activePhase: active.map((product) => productStep(product)),
    mask: mask.map((product) => productStep(product)),
    finish: finish.map((product) => productStep(product)),

    homecare: (selected.homecare || []).map((product) => productStep(product)),
    local: (selected.local || []).map((product) => productStep(product)),
  }
}

export default buildProtocol
