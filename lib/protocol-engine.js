import { PRODUCTS } from './products-database.js'
import { buildProtocolProducts } from './product-selector.js'

function normalizeGoal(goal = 'hydration') {
  const value = String(goal).toLowerCase().trim()

  if (value.includes('hydr') || value.includes('feucht') || value.includes('увлаж')) return 'hydration'
  if (value.includes('sens') || value.includes('empfind') || value.includes('чувств')) return 'sensitivity'
  if (value.includes('acne') || value.includes('akne') || value.includes('акне')) return 'acne'
  if (value.includes('pigment') || value.includes('fleck') || value.includes('пигмент')) return 'pigmentation'
  if (value.includes('lift') || value.includes('firm') || value.includes('лифт') || value.includes('упруг')) return 'lifting'
  if (value.includes('anti') || value.includes('age') || value.includes('falten') || value.includes('морщ')) return 'anti_age'
  if (value.includes('glow') || value.includes('radiance') || value.includes('сиян')) return 'radiance'

  return value || 'hydration'
}

function findById(id) {
  return PRODUCTS.find((product) => product.id === id) || null
}

function findByLineAndStep(line, step) {
  return PRODUCTS.filter(
    (product) =>
      product.line === line &&
      product.step === step &&
      product.professional === true
  )
}

function productStep(product) {
  if (!product) return null

  return {
    id: product.id,
    name: product.name,
    line: product.line,
    category: product.category,
    step: product.step,
    goals: product.goals || [],
    concerns: product.concerns || [],
  }
}

function buildPhase(title, products = []) {
  const steps = products.filter(Boolean).map(productStep).filter(Boolean)

  if (!steps.length) return null

  return {
    title,
    steps,
  }
}

function buildPreparation(mainLine) {
  const cleaners = findByLineAndStep(mainLine, 'cleanse')
  const toners = findByLineAndStep(mainLine, 'tone')

  if (cleaners.length || toners.length) {
    return [
      cleaners[0],
      toners[0],
    ].filter(Boolean)
  }

  return [
    findById('nicely-gentle-cleanser'),
    findById('nicely-sweet-toner'),
  ].filter(Boolean)
}

function buildDefaultPeel(goal, selected) {
  if (selected.peel) return selected.peel

  if (goal === 'sensitivity') return findById('nicely-enzyme-peel')
  if (goal === 'pigmentation') return findById('cell-renewall-multi-acid')
  if (goal === 'radiance') return findById('cell-renewall-multi-acid')
  if (goal === 'acne') return findById('cell-renewall-multi-acid')

  return findById('nicely-enzyme-peel') || findById('cell-renewall-multi-acid')
}

export function buildProtocol(input = {}) {
  const goal = normalizeGoal(input.goal || input.treatmentGoal || input.primaryGoal)
  const selected = buildProtocolProducts(goal)

  const preparation = buildPreparation(selected.mainLine)
  const peel = buildDefaultPeel(goal, selected)

  const active = selected.active || []
  const mask = selected.mask ? [selected.mask] : []
  const finish = selected.finish || []

  const phases = [
    buildPhase('Подготовка кожи', preparation),
    buildPhase('Пилинг', peel ? [peel] : []),
    buildPhase('Активная фаза', active),
    buildPhase('Маска', mask),
    buildPhase('Завершение и защита', finish),
  ].filter(Boolean)

  return {
    goal,
    mainLine: selected.mainLine,
    supportLines: selected.supportLines || [],

    protocolType: 'Профессиональный протокол',
    variantName: selected.mainLine,

    phases,

    preparation: preparation.map(productStep),
    peeling: peel ? [productStep(peel)] : [],
    activePhase: active.map(productStep),
    mask: mask.map(productStep),
    finish: finish.map(productStep),

    homecare: (selected.homecare || []).map(productStep),
    local: (selected.local || []).map(productStep),
  }
}

export default buildProtocol
