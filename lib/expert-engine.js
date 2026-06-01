export function buildExpertDecision(input = {}) {
  const age = Number(input.age || 0)

  const text = JSON.stringify(input).toLowerCase()

  const has = (...terms) =>
    terms.some((term) => text.includes(term.toLowerCase()))

  // =========================
  // PRIMARY CONCERN
  // =========================

  let primary = null

  if (
    has(
      'acne',
      'akne',
      'акне',
      'pickel',
      'blemishes',
      'воспаления'
    )
  ) {
    primary = 'BALANCE'
  }

  else if (
    has(
      'pigmentation',
      'pigment',
      'pigmentflecken',
      'melasma',
      'пигментация',
      'пигментные пятна'
    )
  ) {
    primary = 'BECLARITY'
  }

  else if (
    has(
      'wrinkles',
      'falten',
      'морщины',
      'lifting',
      'лифтинг',
      'firming',
      'loss of firmness',
      'потеря упругости',
      'advanced aging',
      'возрастная кожа'
    )
  ) {
    primary = 'MYCODE'
  }

  else if (
    has(
      'dull',
      'glow',
      'сияние',
      'тусклая кожа',
      'oxidative stress'
    )
  ) {
    primary = 'CELL_C'
  }

  else if (age >= 30 && age < 45) {
    primary = 'CELL'
  }

  else {
    primary = 'GLACIAR'
  }

  // =========================
  // SUPPORT LINES
  // =========================

  const support = []

  const sensitive =
    has(
      'sensitive',
      'sensibel',
      'чувствительная',
      'чувствительность',
      'redness',
      'розацеа',
      'rosacea',
      'couperose',
      'купероз'
    )

  const dehydrated =
    has(
      'dehydration',
      'dehydrated',
      'обезвоженность',
      'dry',
      'trocken',
      'сухая кожа',
      'сухость'
    )

  const glow =
    has(
      'dull',
      'glow',
      'сияние',
      'тусклая кожа'
    )

  if (sensitive && primary !== 'NICELY') {
    support.push('NICELY')
  }

  if (dehydrated && primary !== 'GLACIAR') {
    support.push('GLACIAR')
  }

  if (glow && primary !== 'CELL_C') {
    support.push('CELL_C')
  }

  support.push('SUMMESUN')

  return {
    primary,
    support,
    age,
    sensitive,
    dehydrated,
    glow,
  }
}
