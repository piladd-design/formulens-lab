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

function productStep(product, fallbackStep = '') {
  if (!product) return null

  return {
    id: product.id,
    name: product.name,
    line: product.line,
    category: product.category,
    step: product.step || fallbackStep,
    goals: product.goals || [],
    concerns: product.concerns || [],
  }
}

function buildPhase(title, products = []) {
  const steps = products
    .filter(Boolean)
    .map((product) => productStep(product))

  if (!steps.length) return null

  return {
    title,
    steps,
  }
}

export function buildProtocol(input = {}) {
  const goal = normalizeGoal(input.goal || input.treatmentGoal || input.primaryGoal)
  const selected = buildProtocolProducts(goal)

  const phases = [
    buildPhase('Подготовка кожи', []),

    selected.peel
      ? buildPhase('Пилинг', [selected.peel])
      : null,

    buildPhase('Активная фаза', selected.active),

    selected.mask
      ? buildPhase('Маска', [selected.mask])
      : null,

    buildPhase('Завершение и защита', selected.finish),
  ].filter(Boolean)

  return {
    goal,
    mainLine: selected.mainLine,
    supportLines: selected.supportLines,

    protocolType: 'Профессиональный протокол',
    variantName: selected.mainLine,

    phases,

    preparation: [],
    peeling: selected.peel ? [productStep(selected.peel)] : [],
    activePhase: selected.active.map((product) => productStep(product)),
    mask: selected.mask ? [productStep(selected.mask)] : [],
    finish: selected.finish.map((product) => productStep(product)),

    homecare: selected.homecare.map((product) => productStep(product)),
    local: selected.local.map((product) => productStep(product)),
  }
}

export default buildProtocol
