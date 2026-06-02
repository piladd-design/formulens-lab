// =====================================================
// FORMULENS LAB
// SUMMECOSMETICS KNOWLEDGE DATABASE v1.0
// =====================================================

// -----------------------------------------------------
// GOALS
// -----------------------------------------------------

export const GOALS = {
  HYDRATION: 'hydration',
  LIFTING: 'lifting',
  FIRMING: 'firming',
  PIGMENTATION: 'pigmentation',
  ACNE: 'acne',
  SENSITIVE: 'sensitive',
  REGENERATION: 'regeneration',
  GLOW: 'glow',
  SUN_PROTECTION: 'sunProtection',
}

// -----------------------------------------------------
// SKIN PROBLEMS
// -----------------------------------------------------

export const SKIN_PROBLEMS = {
  WRINKLES: 'wrinkles',
  LIFTING: 'lifting',
  PIGMENTATION: 'pigmentation',
  ACNE: 'acne',
  REDNESS: 'redness',
  DEHYDRATION: 'dehydration',
  DULLNESS: 'dullness',
  REGENERATION: 'regeneration',
}

// -----------------------------------------------------
// SUMMECOSMETICS LINES
// -----------------------------------------------------

export const LINES = {
  ECC: {
    id: 'ESSENTIAL_CARE_CONCEPT',
    name: 'ESSENTIAL CARE CONCEPT',

    professional: true,
    homecare: true,

    description:
      'Universal preparation, cleansing, peeling and final protection line.',
  },

  NICELY: {
    id: 'NICELY',
    name: 'NICELY',

    professional: true,
    homecare: true,

    primaryGoals: [
      GOALS.SENSITIVE,
    ],

    secondaryBenefits: [
      SKIN_PROBLEMS.REDNESS,
      'comfort',
      'barrier',
      'reactivity',
    ],
  },

  GLACIAR: {
    id: 'GLACIAR',
    name: 'GLACIAR',

    professional: true,
    homecare: true,

    primaryGoals: [
      GOALS.HYDRATION,
    ],

    secondaryBenefits: [
      SKIN_PROBLEMS.DEHYDRATION,
      SKIN_PROBLEMS.WRINKLES,
      'barrier',
      'comfort',
      'elasticity',
      'regeneration',
      'hydrolipidBalance',
    ],
  },

  BALANCE: {
    id: 'BALANCE',
    name: 'BALANCE',

    professional: true,
    homecare: true,

    primaryGoals: [
      GOALS.ACNE,
    ],

    secondaryBenefits: [
      'oilControl',
      'pores',
      'comedones',
      'clarifying',
    ],
  },

  BECLARITY: {
    id: 'BECLARITY',
    name: 'BECLARITY',

    professional: true,
    homecare: true,

    primaryGoals: [
      GOALS.PIGMENTATION,
    ],

    secondaryBenefits: [
      SKIN_PROBLEMS.PIGMENTATION,
      'unevenTone',
      'brightening',
      'spotCorrection',
    ],
  },

  CELL: {
    id: 'CELL',
    name: 'CELL',

    professional: true,
    homecare: true,

    primaryGoals: [
      GOALS.REGENERATION,
    ],

    secondaryBenefits: [
      'antiAge',
      'cellRenewal',
      'vitality',
      'recovery',
    ],
  },

  CELL_C: {
    id: 'CELL_C',
    name: 'CELL C',

    professional: true,
    homecare: true,

    primaryGoals: [
      GOALS.GLOW,
    ],

    secondaryBenefits: [
      'vitaminC',
      'radiance',
      'antioxidants',
      'brightening',
    ],
  },

  MYCODE: {
    id: 'MYCODE',
    name: 'MYCODE',

    professional: true,
    homecare: true,

    primaryGoals: [
      GOALS.LIFTING,
      GOALS.FIRMING,
    ],

    secondaryBenefits: [
      SKIN_PROBLEMS.WRINKLES,
      SKIN_PROBLEMS.LIFTING,
      'retinol',
      'peptides',
      'collagen',
      'firmness',
    ],
  },

  SUMMESUN: {
    id: 'SUMMESUN',
    name: 'SUMMESUN',

    professional: true,
    homecare: true,

    primaryGoals: [
      GOALS.SUN_PROTECTION,
    ],

    secondaryBenefits: [
      'uvProtection',
      'photoagingPrevention',
      'dailyProtection',
    ],
  },
}

// -----------------------------------------------------
// GOAL → MAIN LINE
// THIS IS THE MOST IMPORTANT MAP
// -----------------------------------------------------

export const GOAL_TO_LINE = {
  [GOALS.HYDRATION]: 'GLACIAR',

  [GOALS.LIFTING]: 'MYCODE',

  [GOALS.FIRMING]: 'MYCODE',

  [GOALS.PIGMENTATION]: 'BECLARITY',

  [GOALS.ACNE]: 'BALANCE',

  [GOALS.SENSITIVE]: 'NICELY',

  [GOALS.REGENERATION]: 'CELL',

  [GOALS.GLOW]: 'CELL_C',

  [GOALS.SUN_PROTECTION]: 'SUMMESUN',
}

// -----------------------------------------------------
// PROBLEM → SUPPORT LINE
// DOES NOT SELECT THE PROTOCOL
// ONLY SUPPORT / HOMECARE / NEXT COURSE
// -----------------------------------------------------

export const PROBLEM_SUPPORT = {
  [SKIN_PROBLEMS.WRINKLES]: [
    'MYCODE',
    'CELL',
  ],

  [SKIN_PROBLEMS.LIFTING]: [
    'MYCODE',
    'CELL',
  ],

  [SKIN_PROBLEMS.PIGMENTATION]: [
    'BECLARITY',
    'CELL_C',
  ],

  [SKIN_PROBLEMS.ACNE]: [
    'BALANCE',
  ],

  [SKIN_PROBLEMS.REDNESS]: [
    'NICELY',
  ],

  [SKIN_PROBLEMS.DEHYDRATION]: [
    'GLACIAR',
  ],

  [SKIN_PROBLEMS.DULLNESS]: [
    'CELL_C',
  ],

  [SKIN_PROBLEMS.REGENERATION]: [
    'CELL',
  ],
}

// -----------------------------------------------------
// PROTOCOL LIBRARY
// STRUCTURE ONLY
// PRODUCTS WILL BE ADDED LATER
// -----------------------------------------------------

export const PROTOCOL_LIBRARY = {
  GLACIAR_HYDRATION: {
    id: 'GLACIAR_HYDRATION',
    line: 'GLACIAR',
  },

  MYCODE_FIRMING: {
    id: 'MYCODE_FIRMING',
    line: 'MYCODE',
  },

  MYCODE_RETINOL: {
    id: 'MYCODE_RETINOL',
    line: 'MYCODE',
  },

  BECLARITY_BRIGHTENING: {
    id: 'BECLARITY_BRIGHTENING',
    line: 'BECLARITY',
  },

  BALANCE_ACNE: {
    id: 'BALANCE_ACNE',
    line: 'BALANCE',
  },

  NICELY_SOOTHING: {
    id: 'NICELY_SOOTHING',
    line: 'NICELY',
  },

  CELL_REGENERATION: {
    id: 'CELL_REGENERATION',
    line: 'CELL',
  },

  CELLC_GLOW: {
    id: 'CELLC_GLOW',
    line: 'CELL_C',
  },
}
