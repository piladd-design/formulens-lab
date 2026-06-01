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
    'увлажнение',
    'увлажнить',
    'недостаток влаги',
    'дефицит влаги',
    'обезвоженность',
    'обезвоженная',
    'сухая',
    'сухость',
    'стянутость',
    'шелушение'
  )

  const hasCellActivation = has(
    'cell activation',
    'cellular activation',
    'regeneration',
    'regenerate',
    'vitality',
    'revitalise',
    'revitalize',
    'first signs of aging',
    'early aging',
    'erste altersanzeichen',
    'zellaktivierung',
    'regeneration',
    'vitalität',
    'клеточная активация',
    'активация клеток',
    'регенерация',
    'регенерировать',
    'восстановление',
    'восстановить',
    'жизненная сила',
    'усталая кожа',
    'усталый цвет',
    'первые возрастные изменения',
    'профилактика старения'
  )

  const hasVitaminCGlow = has(
    'vitamin c',
    'vitamin-c',
    'витамин c',
    'витамин с',
    'antioxidant',
    'antioxidative',
    'антиоксиданты',
    'антиоксидантная защита',
    'radiance',
    'leuchtkraft',
    'glow',
    'сияние'
  )

  const hasDullSkin = has(
    'dull',
    'lack of glow',
    'fahle haut',
    'müde haut',
    'oxidative stress',
    'smoker',
    'тусклая',
    'тусклая кожа',
    'нет сияния',
    'усталый цвет',
    'серый цвет лица'
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

  // 1. Severe redness / rosacea / irritation.
  if (severeSensitivity) {
    primary = 'NICELY'
  }

  // 2. Acne / sebum / inflammatory impurities.
  else if (hasAcne || hasOily) {
    primary = 'BALANCE'
  }

  // 3. Pigmentation / melasma / uneven tone.
  else if (hasPigmentation) {
    primary = 'BECLARITY'
  }

  // 4. Advanced age-management: wrinkles, lifting, firmness, neck.
  else if (
    hasWrinkles ||
    hasLifting ||
    hasPhotoaging ||
    hasNeckConcern
  ) {
    primary = 'MYCODE'
  }

  // 5. Cellular activation / regeneration / tired skin.
  // CELL must win over simple dryness when regeneration or tired skin is the main goal.
  else if (hasCellActivation || hasDullSkin) {
    primary = 'CELL'
  }

  // 6. Vitamin C / antioxidant glow.
  else if (hasVitaminCGlow) {
    primary = 'CELL_C'
  }

  // 7. Hydration-only case.
  else if (dehydrated) {
    primary = 'GLACIAR'
  }

  // 8. Neutral age-based prevention only if no clear concern was detected.
  else if (age >= 30 && age < 45) {
    primary = 'CELL'
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

  if (hasVitaminCGlow && primary !== 'CELL_C') {
    support.push('CELL_C')
  }

  if (hasPigmentation && primary !== 'BECLARITY') {
    support.push('BECLARITY')
  }

  if (
    (hasWrinkles || hasLifting || hasPhotoaging || hasNeckConcern) &&
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
      hasNeckConcern,
      hasCellActivation,
      hasVitaminCGlow,
      hasDullSkin,
      dehydrated,
      sensitive,
      mildSensitivity,
      severeSensitivity,
      lowSensitivity,
    },
  }
}
