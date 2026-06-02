import { products } from './products.js'

function product(key) {
  return products[key] || null
}

function cleanList(list = []) {
  return list.filter(Boolean)
}

function normalize(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
}

function toArray(value) {
  if (Array.isArray(value)) return value
  if (!value) return []
  return [value]
}

function detectGoal(input = {}) {
  const text = normalize(input.goal)

  if (text.includes('увлаж') || text.includes('feucht') || text.includes('hydrat')) {
    return 'hydration'
  }

  if (text.includes('лифт') || text.includes('упруг') || text.includes('firm') || text.includes('straff')) {
    return 'lifting'
  }

  if (text.includes('морщ') || text.includes('wrinkle') || text.includes('falten') || text.includes('anti')) {
    return 'anti_age'
  }

  if (text.includes('пигмент') || text.includes('fleck') || text.includes('pigment')) {
    return 'pigmentation'
  }

  if (text.includes('акне') || text.includes('acne') || text.includes('akne')) {
    return 'acne'
  }

  if (text.includes('чувств') || text.includes('sens') || text.includes('empfind')) {
    return 'sensitive'
  }

  if (text.includes('сиян') || text.includes('glow') || text.includes('radiance')) {
    return 'glow'
  }

  return 'hydration'
}

function normalizeConcern(concern) {
  const text = normalize(concern)

  if (text.includes('морщ') || text.includes('wrinkle') || text.includes('falten')) {
    return 'wrinkles'
  }

  if (text.includes('дряб') || text.includes('flacc') || text.includes('firm') || text.includes('kontur')) {
    return 'flaccidity'
  }

  if (text.includes('пигмент') || text.includes('fleck') || text.includes('spot')) {
    return 'pigmentation'
  }

  if (text.includes('акне') || text.includes('acne') || text.includes('akne')) {
    return 'acne'
  }

  if (text.includes('крас') || text.includes('red') || text.includes('röt')) {
    return 'redness'
  }

  if (text.includes('сух') || text.includes('dry') || text.includes('trocken')) {
    return 'dryness'
  }

  if (text.includes('обезв') || text.includes('dehyd') || text.includes('feucht')) {
    return 'dehydration'
  }

  if (text.includes('туск') || text.includes('dull') || text.includes('fahl')) {
    return 'dullness'
  }

  return text
}

function normalizeSkinType(value) {
  const text = normalize(value)

  if (text.includes('сух') || text.includes('dry') || text.includes('trocken')) return 'dry'
  if (text.includes('жир') || text.includes('oily') || text.includes('fett')) return 'oily'
  if (text.includes('комб') || text.includes('combination') || text.includes('misch')) return 'combination'
  if (text.includes('чув') || text.includes('sens') || text.includes('empfind')) return 'sensitive'
  if (text.includes('normal')) return 'normal'

  return text || 'all'
}

function scoreProduct(item, context) {
  let score = 0

  const goals = item.goals || []
  const concerns = item.concerns || []
  const skinTypes = item.skinTypes || []

  if (goals.includes(context.goal)) score += 12

  context.concerns.forEach((concern) => {
    if (concerns.includes(concern)) score += 6
    if (goals.includes(concern)) score += 4
  })

  if (skinTypes.includes(context.skinType)) score += 4
  if (skinTypes.includes('all')) score += 2

  if (context.sensitivity !== 'low') {
    if (goals.includes('sensitive')) score += 4
    if (goals.includes('barrier_repair')) score += 3
  }

  if (context.age >= 45) {
    if (goals.includes('anti_age')) score += 3
    if (goals.includes('firming')) score += 2
    if (goals.includes('lifting')) score += 2
  }

  if (context.goal === 'hydration' && item.line === 'GLACIAR') score += 6
  if (context.goal === 'lifting' && item.line.includes('MYCODE')) score += 6
  if (context.goal === 'anti_age' && item.line.includes('MYCODE')) score += 5
  if (context.goal === 'pigmentation' && item.line === 'BECLARITY') score += 6
  if (context.goal === 'acne' && item.line === 'BALANCE') score += 6
  if (context.goal === 'sensitive' && item.line === 'NICELY') score += 6
  if (context.goal === 'glow' && item.line === 'CELL C') score += 6

  return score
}

function getProductsByPhase(scoredProducts, phase, limit = 3) {
  return scoredProducts
    .filter((item) => item.phase === phase)
    .slice(0, limit)
    .map((item) => item.product)
}

function scoreAllProducts(input = {}) {
  const context = {
    goal: detectGoal(input),
    concerns: toArray(input.concerns).map(normalizeConcern),
    skinType: normalizeSkinType(input.skinType),
    sensitivity: normalize(input.sensitivity || 'medium'),
    age: Number(input.age || 0),
  }

  const scoredProducts = Object.values(products)
    .map((item) => ({
      product: item,
      score: scoreProduct(item, context),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)

  return {
    context,
    scoredProducts,
  }
}

export function buildSmartRecommendations(input = {}) {
  const { context, scoredProducts } = scoreAllProducts(input)

  const cleansing = getProductsByPhase(scoredProducts, 'cleansing', 2)
  const toning = getProductsByPhase(scoredProducts, 'toning', 2)
  const active = getProductsByPhase(scoredProducts, 'active', 4)
  const mask = getProductsByPhase(scoredProducts, 'mask', 2)
  const final = getProductsByPhase(scoredProducts, 'final', 3)
  const protection = getProductsByPhase(scoredProducts, 'protection', 2)

  const topProducts = scoredProducts.slice(0, 10).map((item) => item.product)

  const lineScores = {}

  scoredProducts.forEach((item) => {
    const line = item.product.line
    lineScores[line] = (lineScores[line] || 0) + item.score
  })

  const recommendedLines = Object.entries(lineScores)
    .sort((a, b) => b[1] - a[1])
    .map(([line]) => line)

  return {
    goal: context.goal,
    concerns: context.concerns,
    skinType: context.skinType,
    recommendedLines,
    topProducts,
    professional: {
      cleansing,
      toning,
      active,
      mask,
      final,
      protection,
    },
    homecare: {
      morning: cleanList([
        cleansing[0],
        toning[0],
        active.find((p) => p.homecare),
        final.find((p) => p.homecare),
        protection[0] || product('summsun_spf50_sensitive'),
      ]),
      evening: cleanList([
        cleansing[0],
        toning[0],
        active.find((p) => p.homecare),
        final.find((p) => p.homecare),
        mask.find((p) => p.homecare),
      ]),
      extra: cleanList([
        ...active.filter((p) => p.homecare).slice(1, 3),
        ...mask.filter((p) => p.homecare).slice(0, 2),
      ]),
    },
  }
}

// =====================================================
// OLD API COMPATIBILITY
// =====================================================

export const recommendationProtocols = {
  BALANCE: {
    concern: 'Akne / Entzündungen / fettige Haut',
    morning: cleanList([
      product('balance_cleansing_mousse'),
      product('balance_balancing_lotion'),
      product('balance_pure_regulator'),
      product('summsun_spf50_sensitive'),
    ]),
    evening: cleanList([
      product('balance_cleansing_mousse'),
      product('balance_balancing_lotion'),
      product('balance_pure_regulator'),
      product('balance_hydro_balance'),
    ]),
    extra: cleanList([
      product('balance_drying_gel'),
    ]),
  },

  NICELY: {
    concern: 'Empfindlichkeit / Rötungen / geschwächte Barriere',
    morning: cleanList([
      product('nicely_gentle_cleanser'),
      product('nicely_sweet_toner'),
      product('nicely_hydration_serum'),
      product('nicely_hydration_cream'),
      product('nicely_smooth_final_spf50'),
    ]),
    evening: cleanList([
      product('nicely_gentle_cleanser'),
      product('nicely_sweet_toner'),
      product('nicely_hydration_serum'),
      product('nicely_hydration_cream'),
    ]),
    extra: cleanList([
      product('nicely_nutrition_cream'),
    ]),
  },

  GLACIAR: {
    concern: 'Feuchtigkeitsmangel / trockene oder fahle Haut',
    morning: cleanList([
      product('glaciar_cleansing_milk'),
      product('glaciar_soft_lotion'),
      product('hydro_repairer_serum'),
      product('glaciar_hydration_cream'),
      product('summsun_spf50_sensitive'),
    ]),
    evening: cleanList([
      product('glaciar_cleansing_milk'),
      product('glaciar_soft_lotion'),
      product('hydro_repairer_serum'),
      product('glaciar_plus_hydration_cream'),
    ]),
    extra: cleanList([
      product('hydraluronic_serum_gel'),
      product('glaciar_mask'),
    ]),
  },

  BECLARITY: {
    concern: 'Pigmentierung / unebener Teint / postinflammatorische Flecken',
    morning: cleanList([
      product('beclarity_clarifying_cleanser'),
      product('beclarity_blemish_corrector_serum'),
      product('beclarity_blemish_controller_spf50'),
    ]),
    evening: cleanList([
      product('beclarity_clarifying_cleanser'),
      product('beclarity_dark_spot_eraser'),
      product('beclarity_blemish_corrector_serum'),
    ]),
    extra: cleanList([
      product('summsun_spf50_cc'),
    ]),
  },

  CELL: {
    concern: 'Anti-Aging / erste Falten / Vitalität',
    morning: cleanList([
      product('cell_activator_serum'),
      product('cell_vitality_cream'),
      product('summsun_spf50_sensitive'),
    ]),
    evening: cleanList([
      product('cell_activator_serum'),
      product('cell_vitality_cream'),
    ]),
    extra: cleanList([
      product('cell_eye_cream'),
    ]),
  },

  CELL_C: {
    concern: 'Glow / Vitamin C / Anti-Aging / unebener Teint',
    morning: cleanList([
      product('cell_c_cleansing_mousse'),
      product('cell_c_renewal_serum'),
      product('cell_c_regenerating_cream'),
      product('summsun_spf50_sensitive'),
    ]),
    evening: cleanList([
      product('cell_c_cleansing_mousse'),
      product('cell_c_renewal_serum'),
      product('cell_c_regenerating_cream'),
    ]),
    extra: cleanList([
      product('cell_c_hydro_nourishing_cream'),
      product('cell_c_light_lifting_serum_gel'),
    ]),
  },

  MYCODE: {
    concern: 'Lifting / Falten / Festigkeit / reife Haut',
    morning: cleanList([
      product('mycode_051'),
      product('mycode_052'),
      product('summsun_spf50_sensitive'),
    ]),
    evening: cleanList([
      product('mycode_061'),
      product('mycode_062'),
    ]),
    extra: cleanList([
      product('mycode_095'),
      product('mycode_071'),
      product('mycode_072'),
    ]),
  },
}

export function getProtocolByLine(line) {
  if (!line) return null

  const normalized = String(line)
    .trim()
    .toUpperCase()
    .replace(/\s+/g, '_')

  if (normalized === 'MYCODE_ADVANCED') return recommendationProtocols.MYCODE
  if (normalized === 'CELL_C') return recommendationProtocols.CELL_C

  return recommendationProtocols[normalized] || null
}

export function getRecommendedProtocol(result) {
  const mainLine =
    result?.recommendedLines?.main ||
    result?.mainLine ||
    result?.recommendedLines?.[0]

  const secondaryLine =
    result?.recommendedLines?.secondary ||
    result?.supportLines?.[0] ||
    result?.recommendedLines?.[1]

  const mainProtocol = getProtocolByLine(mainLine)
  const secondaryProtocol = getProtocolByLine(secondaryLine)

  return {
    mainLine,
    secondaryLine,
    mainProtocol,
    secondaryProtocol,
  }
}
