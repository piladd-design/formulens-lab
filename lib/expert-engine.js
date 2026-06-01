export function buildExpertDecision(input = {}) {
  const age = Number(input.age || 0)
  const text = JSON.stringify(input).toLowerCase()

  const has = (...terms) =>
    terms.some((term) => text.includes(term.toLowerCase()))

  // =========================
  // DETECT CONDITIONS
  // =========================

  const hasAcne = has(
    'acne',
    'akne',
    'акне',
    'прыщи',
    'прыщ',
    'blemishes',
    'pickel',
    'unreinheiten',
    'воспаления',
    'воспаление'
  )

  const hasPigmentation = has(
    'pigmentation',
    'pigment',
    'pigmentflecken',
    'melasma',
    'dark spots',
    'flecken',
    'пигментация',
    'пигмент',
    'пигментные пятна',
    'пятна',
    'мелазма',
    'неровный тон'
  )

  const hasWrinkles = has(
    'wrinkles',
    'wrinkle',
    'falten',
    'морщины',
    'морщина',
    'anti-age',
    'antiaging'
  )

  const hasLifting = has(
    'lifting',
    'firming',
    'loss of firmness',
    'skin sagging',
    'erschlaffung',
    'kontur',
    'лифтинг',
    'овал',
    'птоз',
    'дряблость',
    'упругость',
    'потеря упругости',
    'потеря плотности'
  )

  const hasPhotoaging = has(
    'photoaging',
    'photodamage',
    'retinol',
    'retinoid',
    'фотостарение',
    'ретинол',
    'текстура',
    'неровная текстура'
  )

  const hasGlowConcern = has(
    'dull',
    'lack of glow',
    'glow',
    'fahle haut',
    'müde haut',
    'oxidative stress',
    'smoker',
    'тусклая',
    'тусклая кожа',
    'нет сияния',
    'сияние',
    'усталый цвет',
    'серый цвет лица'
  )

  const hasNeckConcern = has(
    'neck',
    'decollete',
    'décolleté',
    'hals',
    'dekolleté',
    'шея',
    'декольте'
  )

  const hasOily = has(
    'oily',
    'fettig',
    'sebum',
    'talg',
    'жирная',
    'жирность',
    'жирный блеск',
    'себум'
  )

  const dehydrated = has(
    'dehydration',
    'dehydrated',
    'dry',
    'dryness',
    'tightness',
    'trocken',
    'trockene haut',
    'feuchtigkeitsarm',
    'обезвоженность',
    'обезвоженная',
    'сухая',
    'сухость',
    'стянутость',
    'шелушение'
  )

  const lowSensitivity = has(
    'низкая чувствительность',
    'низкой чувствительностью',
    'low sensitivity',
    'niedrige empfindlichkeit'
  )

  const mildSensitivity =
    !lowSensitivity &&
    has(
      'medium sensitivity',
      'средняя чувствительность',
      'средней чувствительностью',
      'mittel',
      'mittlere empfindlichkeit',
      'sensitive',
      'sensibel',
      'empfindlich',
      'чувствительная',
      'чувствительность'
    )

  const severeSensitivity =
    !lowSensitivity &&
    has(
      'high sensitivity',
      'sehr empfindlich',
      'stark empfindlich',
      'severe sensitivity',
      'redness',
      'rötung',
      'rosacea',
      'couperose',
      'irritation',
      'burning',
      'barrier damage',
      'высокая чувствительность',
      'сильная чувствительность',
      'выраженная чувствительность',
      'покраснение',
      'краснота',
      'розацеа',
      'купероз',
      'раздражение',
      'жжение',
      'нарушенный барьер',
      'поврежденный барьер'
    )

  const sensitive = mildSensitivity || severeSensitivity

  // =========================
  // PRIMARY DECISION TREE
  // =========================

  let primary = 'GLACIAR'

  // 1. Severe redness / rosacea / irritation wins first.
  //    Skin must be stabilised before aggressive anti-age or pigment work.
  if (severeSensitivity) {
    primary = 'NICELY'
  }

  // 2. Acne / inflammatory impurities.
  else if (hasAcne || hasOily) {
    primary = 'BALANCE'
  }

  // 3. Pigmentation / melasma / uneven tone.
  else if (hasPigmentation) {
    primary = 'BECLARITY'
  }

  // 4. Advanced age management: wrinkles, lifting, firmness, neck.
  else if (
    hasWrinkles ||
    hasLifting ||
    hasPhotoaging ||
    hasNeckConcern ||
    age >= 45
  ) {
    primary = 'MYCODE'
  }

  // 5. Glow / antioxidant / tired skin.
  else if (hasGlowConcern) {
    primary = 'CELL_C'
  }

  // 6. Early anti-aging prevention.
  else if (age >= 30 && age < 45) {
    primary = 'CELL'
  }

  // 7. Hydration-only case.
  else if (dehydrated) {
    primary = 'GLACIAR'
  }

  // =========================
  // SUPPORT LINES
  // =========================

  const support = []

  if (sensitive && primary !== 'NICELY') {
    support.push('NICELY')
  }

  if (dehydrated && primary !== 'GLACIAR') {
    support.push('GLACIAR')
  }

  if (hasGlowConcern && primary !== 'CELL_C') {
    support.push('CELL_C')
  }

  if (hasPigmentation && primary !== 'BECLARITY') {
    support.push('BECLARITY')
  }

  if (
    (hasWrinkles || hasLifting || hasPhotoaging || hasNeckConcern || age >= 45) &&
    primary !== 'MYCODE' &&
    primary !== 'NICELY'
  ) {
    support.push('MYCODE')
  }

  support.push('SUMMESUN')

  return {
    primary,
    support: [...new Set(support)],

    age,

    flags: {
      hasAcne,
      hasOily,
      hasPigmentation,
      hasWrinkles,
      hasLifting,
      hasPhotoaging,
      hasGlowConcern,
      hasNeckConcern,
      dehydrated,
      sensitive,
      mildSensitivity,
      severeSensitivity,
      lowSensitivity,
    },
  }
}
