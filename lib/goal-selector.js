import {
  GOALS,
  GOAL_TO_LINE,
} from './summecosmetics-database.js'

// -----------------------------------------------------
// GOAL DETECTION
// -----------------------------------------------------

export function detectGoal(input = {}) {
  const text = String(input.goal || '')
    .toLowerCase()
    .trim()

  // HYDRATION

  if (
    text.includes('hydr') ||
    text.includes('увлаж') ||
    text.includes('feucht') ||
    text.includes('moisture')
  ) {
    return GOALS.HYDRATION
  }

  // LIFTING / FIRMING

  if (
    text.includes('lift') ||
    text.includes('firm') ||
    text.includes('straff') ||
    text.includes('упруг') ||
    text.includes('лифт')
  ) {
    return GOALS.LIFTING
  }

  // PIGMENTATION

  if (
    text.includes('pigment') ||
    text.includes('пигмент') ||
    text.includes('bright') ||
    text.includes('fleck') ||
    text.includes('melasma')
  ) {
    return GOALS.PIGMENTATION
  }

  // ACNE

  if (
    text.includes('acne') ||
    text.includes('akne') ||
    text.includes('акне')
  ) {
    return GOALS.ACNE
  }

  // SENSITIVE

  if (
    text.includes('sensitive') ||
    text.includes('sensitivity') ||
    text.includes('empfind') ||
    text.includes('чувств')
  ) {
    return GOALS.SENSITIVE
  }

  // REGENERATION

  if (
    text.includes('regeneration') ||
    text.includes('regener') ||
    text.includes('восстанов')
  ) {
    return GOALS.REGENERATION
  }

  // GLOW

  if (
    text.includes('glow') ||
    text.includes('radiance') ||
    text.includes('сиян')
  ) {
    return GOALS.GLOW
  }

  // SUN

  if (
    text.includes('sun') ||
    text.includes('spf') ||
    text.includes('uv')
  ) {
    return GOALS.SUN_PROTECTION
  }

  // DEFAULT

  return GOALS.HYDRATION
}

// -----------------------------------------------------
// MAIN LINE BY GOAL
// -----------------------------------------------------

export function getGoalMainLine(input = {}) {
  const goal = detectGoal(input)

  return {
    goal,
    mainLine: GOAL_TO_LINE[goal] || 'GLACIAR',
  }
}

// -----------------------------------------------------
// LABELS
// -----------------------------------------------------

export function getGoalLabel(goal, lang = 'DE') {
  const labels = {
    hydration: {
      RU: 'Увлажнение',
      DE: 'Hydration',
      EN: 'Hydration',
    },

    lifting: {
      RU: 'Лифтинг',
      DE: 'Lifting',
      EN: 'Lifting',
    },

    pigmentation: {
      RU: 'Пигментация',
      DE: 'Pigmentierung',
      EN: 'Pigmentation',
    },

    acne: {
      RU: 'Акне',
      DE: 'Akne',
      EN: 'Acne',
    },

    sensitive: {
      RU: 'Чувствительная кожа',
      DE: 'Empfindliche Haut',
      EN: 'Sensitive Skin',
    },

    regeneration: {
      RU: 'Регенерация',
      DE: 'Regeneration',
      EN: 'Regeneration',
    },

    glow: {
      RU: 'Сияние',
      DE: 'Glow',
      EN: 'Glow',
    },

    sunProtection: {
      RU: 'Защита от солнца',
      DE: 'Sonnenschutz',
      EN: 'Sun Protection',
    },
  }

  return (
    labels[goal]?.[lang] ||
    labels[goal]?.DE ||
    goal
  )
}

export default getGoalMainLine
