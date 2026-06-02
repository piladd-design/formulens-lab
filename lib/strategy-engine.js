// lib/strategy-engine.js

function textOf(input = {}) {
  return [
    input.age,
    input.gender,
    input.skinType,
    input.sensitivity,
    input.concerns,
    input.goal,
    input.problem,
    input.notes,
  ]
    .flat()
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
}

function has(text, words) {
  return words.some((word) => text.includes(word.toLowerCase()))
}

export function buildStrategy(input = {}) {
  const text = textOf(input)
  const age = Number(input.age || 0)

  const flags = {
    ageing: has(text, [
      'wrinkle',
      'wrinkles',
      'falten',
      'морщ',
      'anti-age',
      'anti aging',
      'anti-aging',
      'lifting',
      'лифтинг',
      'firming',
      'упруг',
      'дряб',
      'sagging',
      'oval',
      'овал',
    ]),

    dehydration: has(text, [
      'dry',
      'trocken',
      'сух',
      'dehydrat',
      'обезвож',
      'hydration',
      'увлаж',
      'tightness',
      'стянут',
    ]),

    sensitivity: has(text, [
      'sensitive',
      'sensibel',
      'empfindlich',
      'чувств',
      'reactive',
      'реактив',
      'irritation',
      'раздраж',
    ]),

    redness: has(text, [
      'redness',
      'rötung',
      'покрас',
      'rosacea',
      'розацеа',
      'couperose',
      'купероз',
    ]),

    pigmentation: has(text, [
      'pigment',
      'пигмент',
      'dark spot',
      'flecken',
      'melasma',
      'мелазма',
      'uneven tone',
      'неровный тон',
      'пятн',
    ]),

    acne: has(text, [
      'acne',
      'akne',
      'акне',
      'pimple',
      'прыщ',
      'comedone',
      'комедон',
      'blackhead',
      'черные точки',
      'oily',
      'жирн',
      'sebum',
      'себум',
      'unrein',
    ]),

    glow: has(text, [
      'glow',
      'radiance',
      'сиян',
      'fresh',
      'свеж',
      'dull',
      'туск',
      'tired',
      'устал',
      'smoker',
      'куриль',
    ]),

    regeneration: has(text, [
      'regeneration',
      'регенер',
      'cell activation',
      'клет',
      'vitality',
      'жизн',
      'recovery',
      'восстанов',
    ]),

    photoaging: has(text, [
      'photoaging',
      'фотостар',
      'sun damage',
      'uv',
      'уф',
      'oxidative',
      'оксид',
      'antioxidant',
      'антиоксид',
    ]),
  }

  const strategies = []

  function add(strategy) {
    if (!strategies.find((item) => item.id === strategy.id)) {
      strategies.push(strategy)
    }
  }

  // 1. Critical / corrective priorities
  if (flags.redness || flags.sensitivity) {
    add({
      id: 'BARRIER_REPAIR',
      name: 'Barrier Repair Strategy',
      priority: 95,
      lines: ['NICELY', 'GLACIAR'],
      actives: ['soothing complex', 'barrier support', 'hydration'],
      reason: 'Sensitive, reactive or redness-prone skin needs barrier stabilisation before intensive correction.',
    })
  }

  if (flags.acne) {
    add({
      id: 'ACNE_CONTROL',
      name: 'Acne & Sebum Control Strategy',
      priority: 92,
      lines: ['BALANCE'],
      actives: ['sebum control', 'clarifying complex', 'pore refining'],
      reason: 'Impurities, oiliness or comedones require sebum control and pore-focused care.',
    })
  }

  if (flags.pigmentation) {
    add({
      id: 'PIGMENT_CONTROL',
      name: 'Pigment Control Strategy',
      priority: 90,
      lines: ['BECLARITY', 'CELL C', 'SUMMESUN'],
      actives: ['brightening complex', 'vitamin C', 'SPF'],
      reason: 'Pigmentation and uneven tone need brightening, antioxidant support and daily UV protection.',
    })
  }

  // 2. Age / structure
  if (flags.ageing || age >= 50) {
    add({
      id: 'COLLAGEN_FIRMING',
      name: 'Collagen & Firming Strategy',
      priority: flags.ageing ? 88 : 70,
      lines: ['MYCODE', 'CELL'],
      actives: ['retinol', 'peptides', 'firming complex'],
      reason: 'Wrinkles, sagging or loss of firmness require collagen support and firming correction.',
    })
  }

  // 3. Hydration / comfort
  if (flags.dehydration) {
    add({
      id: 'HYDRATION',
      name: 'Hydration Strategy',
      priority: 82,
      lines: ['GLACIAR', 'NICELY'],
      actives: ['hyaluronic acid', 'NMF support', 'hydration complex'],
      reason: 'Dryness, tightness or dehydration require water balance restoration and comfort support.',
    })
  }

  // 4. Glow / vitamin C
  if (flags.glow || flags.photoaging) {
    add({
      id: 'VITAMIN_C_GLOW',
      name: 'Vitamin C & Glow Strategy',
      priority: 80,
      lines: ['CELL C', 'SUMMESUN'],
      actives: ['vitamin C', 'antioxidants', 'radiance support'],
      reason: 'Dull, tired or photoaged skin benefits from vitamin C, glow and antioxidant protection.',
    })
  }

  // 5. Cell activation
  if (flags.regeneration || (!flags.ageing && age >= 30 && age <= 45)) {
    add({
      id: 'CELL_ACTIVATION',
      name: 'Cell Activation Strategy',
      priority: flags.regeneration ? 78 : 60,
      lines: ['CELL'],
      actives: ['cell vitality support', 'revitalising complex'],
      reason: 'Early ageing, tired skin or regeneration goals need cellular activation and vitality support.',
    })
  }

  if (strategies.length === 0) {
    add({
      id: 'PREVENTION',
      name: 'Prevention & Skin Quality Strategy',
      priority: 50,
      lines: ['CELL', 'CELL C', 'SUMMESUN'],
      actives: ['antioxidants', 'cell vitality support', 'SPF'],
      reason: 'No dominant concern was detected, so the focus is prevention, glow and skin quality.',
    })
  }

  const sorted = strategies.sort((a, b) => b.priority - a.priority)

  const primaryStrategy = sorted[0]
  const secondaryStrategies = sorted.slice(1, 3)

  const recommendedLines = [
    ...new Set(sorted.flatMap((strategy) => strategy.lines)),
  ]

  const activeIngredients = [
    ...new Set(sorted.flatMap((strategy) => strategy.actives)),
  ]

  return {
    primaryStrategy,
    secondaryStrategies,
    strategies: sorted,
    recommendedLines,
    activeIngredients,
    flags,
  }
}

export default buildStrategy
