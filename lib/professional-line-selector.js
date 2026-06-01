// lib/professional-line-selector.js

function norm(value) {
  if (!value) return ''
  return String(value).toLowerCase().trim()
}

function asArray(value) {
  if (!value) return []
  if (Array.isArray(value)) return value.map(norm).filter(Boolean)
  return [norm(value)].filter(Boolean)
}

function hasAny(text, words) {
  return words.some((word) => text.includes(word))
}

function collectText(input = {}) {
  return [
    input.gender,
    input.age,
    input.skinType,
    input.sensitivity,
    input.concerns,
    input.goal,
    input.problem,
    input.notes,
  ]
    .flatMap(asArray)
    .join(' ')
}

function detectProfessionalFlags(input = {}) {
  const text = collectText(input)

  const flags = {
    pigmentation: hasAny(text, [
      'pigment',
      'пигмент',
      'hyperpigmentation',
      'hyperpigment',
      'dark spot',
      'dark spots',
      'melasma',
      'flecken',
      'altersflecken',
      'sonnenflecken',
      'uneven tone',
      'tone',
      'тон',
      'пятн',
    ]),

    acne: hasAny(text, [
      'acne',
      'akne',
      'акне',
      'comedone',
      'comedones',
      'blackhead',
      'blackheads',
      'unrein',
      'blemish',
      'blemishes',
      'pimple',
      'pimples',
      'seborrhea',
      'seborrhoea',
      'oily',
      'жирн',
      'комедон',
      'воспал',
      'прыщ',
    ]),

    redness: hasAny(text, [
      'redness',
      'rötung',
      'rötungen',
      'rosacea',
      'розацеа',
      'couperose',
      'купероз',
      'red veins',
      'capillaries',
      'покрас',
      'сосуд',
      'капилляр',
      'irritation',
      'irritated',
      'раздраж',
    ]),

    sensitivity: hasAny(text, [
      'sensitive',
      'sensitivity',
      'empfindlich',
      'empfindlichkeit',
      'чувств',
      'reactive',
      'reaktiv',
      'реактив',
      'burning',
      'stinging',
      'жжение',
    ]),

    dehydration: hasAny(text, [
      'dehydration',
      'dehydrated',
      'feuchtigkeitsarm',
      'wasserarm',
      'обезвож',
      'недостаток влаги',
      'lack of moisture',
      'moisture',
      'hydration',
      'увлажн',
      'tightness',
      'стянут',
    ]),

    dryness: hasAny(text, [
      'dry',
      'trocken',
      'сух',
      'very dry',
      'sehr trocken',
      'очень сух',
      'липид',
      'lipid',
      'nourish',
      'питани',
    ]),

    wrinkles: hasAny(text, [
      'wrinkle',
      'wrinkles',
      'falten',
      'fältchen',
      'морщ',
      'lines',
      'fine lines',
      'expression lines',
      'anti-age',
      'anti age',
      'antiaging',
      'anti-aging',
    ]),

    lifting: hasAny(text, [
      'lifting',
      'лифтинг',
      'firming',
      'straffung',
      'straff',
      'упруг',
      'festigkeit',
      'elasticity',
      'эластич',
      'flaccidity',
      'дряб',
      'sagging',
      'oval',
      'овал',
      'contour',
      'контур',
    ]),

    regeneration: hasAny(text, [
      'regeneration',
      'regenerating',
      'регенер',
      'renewal',
      'renew',
      'обнов',
      'cell',
      'cellular',
      'zell',
      'zellular',
      'клет',
      'vitality',
      'vitalität',
      'energy',
      'энерг',
    ]),

    dullness: hasAny(text, [
      'dull',
      'tired',
      'müde',
      'устал',
      'туск',
      'glow',
      'radiance',
      'сиян',
      'lack of glow',
      'lack of radiance',
    ]),

    firstAging: hasAny(text, [
      'first signs',
      'erste anzeichen',
      'первые признаки',
      'prevention',
      'prävention',
      'профилактика',
      'prevent',
      'vorbeugung',
    ]),
  }

  flags.highSensitivity =
    flags.redness ||
    hasAny(text, [
      'high sensitivity',
      'very sensitive',
      'sehr empfindlich',
      'высокая чувствительность',
      'сильно чувств',
      'reactive skin',
      'реактивная кожа',
    ])

  return flags
}

function scoreProfessionalLines(flags = {}) {
  const scores = {
    MYCODE: 0,
    BECLARITY: 0,
    NICELY: 0,
    GLACIAR: 0,
    BALANCE: 0,
    CELL: 0,
    CELL_C: 0,
  }

  if (flags.pigmentation) {
    scores.BECLARITY += 100
    scores.CELL_C += 35
    scores.MYCODE += 10
  }

  if (flags.acne) {
    scores.BALANCE += 100
    scores.ESSENTIAL = 35
  }

  if (flags.redness || flags.highSensitivity) {
    scores.NICELY += 100
    scores.GLACIAR += 25
    scores.MYCODE -= 20
    scores.CELL_C -= 20
  }

  if (flags.sensitivity && !flags.redness) {
    scores.NICELY += 75
    scores.GLACIAR += 20
  }

  if (flags.dehydration) {
    scores.GLACIAR += 95
    scores.NICELY += 20
    scores.MYCODE += 10
  }

  if (flags.dryness) {
    scores.GLACIAR += 70
    scores.MYCODE += 30
    scores.NICELY += 20
    scores.CELL += 10
  }

  if (flags.wrinkles || flags.lifting) {
    scores.MYCODE += 105
    scores.CELL += 35
  }

  if (flags.regeneration) {
    scores.CELL += 90
    scores.MYCODE += 25
    scores.CELL_C += 25
  }

  if (flags.dullness) {
    scores.CELL_C += 70
    scores.CELL += 45
    scores.GLACIAR += 15
  }

  if (flags.firstAging && !flags.wrinkles && !flags.lifting) {
    scores.CELL += 65
    scores.CELL_C += 35
    scores.MYCODE += 20
  }

  return scores
}

function sortScores(scores = {}) {
  return Object.entries(scores)
    .filter(([, score]) => typeof score === 'number')
    .sort((a, b) => b[1] - a[1])
}

function selectProfessionalLine(input = {}) {
  const flags = detectProfessionalFlags(input)
  const scores = scoreProfessionalLines(flags)
  const ranked = sortScores(scores)

  let mainLine = ranked[0]?.[0] || 'MYCODE'

  // Hard expert overrides
  if (flags.acne) mainLine = 'BALANCE'
  if (flags.pigmentation) mainLine = 'BECLARITY'
  if (flags.redness || flags.highSensitivity) mainLine = 'NICELY'

  // Pure dehydration without stronger pathology
  if (
    flags.dehydration &&
    !flags.pigmentation &&
    !flags.acne &&
    !flags.redness &&
    !flags.wrinkles &&
    !flags.lifting
  ) {
    mainLine = 'GLACIAR'
  }

  // Regeneration / tired skin without stronger pathology
  if (
    flags.regeneration &&
    !flags.pigmentation &&
    !flags.acne &&
    !flags.redness &&
    !flags.wrinkles &&
    !flags.lifting &&
    !flags.dehydration
  ) {
    mainLine = 'CELL'
  }

  const supportingLines = buildSupportingLines(mainLine, flags)
  const recommendedLines = [mainLine, ...supportingLines].filter(
    (line, index, arr) => arr.indexOf(line) === index
  )

  return {
    mainLine,
    supportingLines,
    recommendedLines,
    scores,
    flags,
    confidence: calculateConfidence(mainLine, scores),
    reason: buildReason(mainLine, flags, input.lang || 'DE'),
  }
}

function buildSupportingLines(mainLine, flags) {
  const lines = []

  if (mainLine !== 'SUMMESUN') lines.push('SUMMESUN')

  if (mainLine === 'MYCODE') {
    if (flags.sensitivity || flags.redness) lines.push('NICELY')
    if (flags.dryness || flags.dehydration) lines.push('GLACIAR')
    return lines
  }

  if (mainLine === 'BECLARITY') {
    if (flags.dryness || flags.dehydration) lines.push('GLACIAR')
    if (flags.sensitivity || flags.redness) lines.push('NICELY')
    return lines
  }

  if (mainLine === 'NICELY') {
    if (flags.dryness || flags.dehydration) lines.push('GLACIAR')
    return lines
  }

  if (mainLine === 'GLACIAR') {
    if (flags.sensitivity || flags.redness) lines.push('NICELY')
    return lines
  }

  if (mainLine === 'BALANCE') {
    if (flags.sensitivity || flags.redness) lines.push('NICELY')
    return lines
  }

  if (mainLine === 'CELL') {
    if (flags.dryness || flags.dehydration) lines.push('GLACIAR')
    return lines
  }

  if (mainLine === 'CELL_C') {
    if (flags.pigmentation) lines.push('BECLARITY')
    return lines
  }

  return lines
}

function calculateConfidence(mainLine, scores) {
  const sorted = sortScores(scores)
  const top = sorted[0]?.[1] || 0
  const second = sorted[1]?.[1] || 0

  if (top <= 0) return 'low'
  if (top - second >= 45) return 'high'
  if (top - second >= 20) return 'medium'
  return 'balanced'
}

function buildReason(mainLine, flags, lang = 'DE') {
  const reasons = {
    RU: {
      MYCODE: 'Выбрана линия MYCODE, потому что ведущими задачами являются возрастные изменения, морщины, потеря плотности или лифтинг.',
      BECLARITY: 'Выбрана линия BECLARITY, потому что ведущей задачей является коррекция пигментации и выравнивание тона кожи.',
      NICELY: 'Выбрана линия NICELY, потому что ведущими задачами являются чувствительность, покраснения, реактивность кожи или розацеа.',
      GLACIAR: 'Выбрана линия GLACIAR, потому что ведущей задачей является восстановление увлажнённости, комфорта и водного баланса кожи.',
      BALANCE: 'Выбрана линия BALANCE, потому что ведущими задачами являются акне, жирность, комедоны или воспалительные элементы.',
      CELL: 'Выбрана линия CELL, потому что ведущей задачей является клеточная активация, ревитализация и профилактика возрастных изменений.',
      CELL_C: 'Выбрана линия CELL C, потому что ведущими задачами являются антиоксидантная защита, сияние и защита от свободных радикалов.',
    },
    DE: {
      MYCODE: 'MYCODE wurde gewählt, weil altersbedingte Veränderungen, Falten, Festigkeitsverlust oder Lifting im Vordergrund stehen.',
      BECLARITY: 'BECLARITY wurde gewählt, weil Pigmentflecken und ein ungleichmäßiger Hautton im Vordergrund stehen.',
      NICELY: 'NICELY wurde gewählt, weil Empfindlichkeit, Rötungen, Reaktivität oder Rosacea im Vordergrund stehen.',
      GLACIAR: 'GLACIAR wurde gewählt, weil Feuchtigkeitsmangel, Hautkomfort und Wiederherstellung des Wasserhaushalts im Vordergrund stehen.',
      BALANCE: 'BALANCE wurde gewählt, weil Akne, Unreinheiten, Komedonen oder ölige Haut im Vordergrund stehen.',
      CELL: 'CELL wurde gewählt, weil Zellaktivierung, Revitalisierung und Prävention erster Alterszeichen im Vordergrund stehen.',
      CELL_C: 'CELL C wurde gewählt, weil antioxidativer Schutz, Ausstrahlung und Schutz vor freien Radikalen im Vordergrund stehen.',
    },
    EN: {
      MYCODE: 'MYCODE was selected because ageing signs, wrinkles, loss of firmness or lifting are the main priorities.',
      BECLARITY: 'BECLARITY was selected because pigmentation and uneven skin tone are the main priorities.',
      NICELY: 'NICELY was selected because sensitivity, redness, reactivity or rosacea are the main priorities.',
      GLACIAR: 'GLACIAR was selected because dehydration, comfort and restoration of the skin’s water balance are the main priorities.',
      BALANCE: 'BALANCE was selected because acne, impurities, comedones or oily skin are the main priorities.',
      CELL: 'CELL was selected because cellular activation, revitalisation and prevention of first ageing signs are the main priorities.',
      CELL_C: 'CELL C was selected because antioxidant defence, glow and protection against free radicals are the main priorities.',
    },
  }

  return reasons[lang]?.[mainLine] || reasons.DE[mainLine] || ''
}

export {
  selectProfessionalLine,
  detectProfessionalFlags,
  scoreProfessionalLines,
}
