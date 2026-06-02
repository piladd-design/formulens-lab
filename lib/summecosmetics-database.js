// =====================================================
// FORMULENS LAB
// SUMMECOSMETICS KNOWLEDGE DATABASE v1.1
// =====================================================

// -----------------------------------------------------
// GOALS
// -----------------------------------------------------

export const GOALS = {
  GENERAL: 'general',
  HYDRATION: 'hydration',
  LIFTING: 'lifting',
  FIRMING: 'firming',
  PIGMENTATION: 'pigmentation',
  ACNE: 'acne',
  SENSITIVE: 'sensitive',
  REGENERATION: 'regeneration',
  GLOW: 'glow',
  PORE_REFINING: 'pore_refining',
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
  PORES: 'pores',
}

// -----------------------------------------------------
// SUMMECOSMETICS LINES
// -----------------------------------------------------

export const LINES = {
  ECC: {
    id: 'ECC',
    name: 'ESSENTIAL CARE CONCEPT',
    professional: true,
    homecare: true,
    primaryGoals: [GOALS.GENERAL],
    secondaryBenefits: [
      'preparation',
      'cleansing',
      'peeling',
      'finalProtection',
    ],
  },

  NICELY: {
    id: 'NICELY',
    name: 'NICELY',
    professional: true,
    homecare: true,
    primaryGoals: [GOALS.SENSITIVE],
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
    primaryGoals: [GOALS.HYDRATION],
    secondaryBenefits: [
      SKIN_PROBLEMS.DEHYDRATION,
      SKIN_PROBLEMS.WRINKLES,
      'comfort',
      'elasticity',
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
      GOALS.PORE_REFINING,
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
      GOALS.PORE_REFINING,
    ],
    secondaryBenefits: [
      SKIN_PROBLEMS.PIGMENTATION,
      SKIN_PROBLEMS.PORES,
      'unevenTone',
      'brightening',
      'spotCorrection',
      'texture',
    ],
  },

  CELL: {
    id: 'CELL',
    name: 'CELL',
    professional: true,
    homecare: true,
    primaryGoals: [GOALS.REGENERATION],
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
    primaryGoals: [GOALS.GLOW],
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
    primaryGoals: [GOALS.SUN_PROTECTION],
    secondaryBenefits: [
      'uvProtection',
      'photoagingPrevention',
      'dailyProtection',
    ],
  },
}

// -----------------------------------------------------
// GOAL → MAIN LINE
// -----------------------------------------------------

export const GOAL_TO_LINE = {
  [GOALS.GENERAL]: 'ECC',
  [GOALS.HYDRATION]: 'GLACIAR',
  [GOALS.LIFTING]: 'MYCODE',
  [GOALS.FIRMING]: 'MYCODE',
  [GOALS.PIGMENTATION]: 'BECLARITY',
  [GOALS.ACNE]: 'BALANCE',
  [GOALS.SENSITIVE]: 'NICELY',
  [GOALS.REGENERATION]: 'CELL',
  [GOALS.GLOW]: 'CELL_C',
  [GOALS.PORE_REFINING]: 'BECLARITY',
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

  [SKIN_PROBLEMS.PORES]: [
    'BECLARITY',
    'BALANCE',
  ],
}

// -----------------------------------------------------
// PROTOCOL LIBRARY
// STRUCTURE ONLY
// PRODUCT DATABASE IS IN lib/products-database.js
// -----------------------------------------------------

export const PROTOCOL_LIBRARY = {
  STANDARD_ECC: {
    id: 'STANDARD_ECC',
    line: 'ECC',
  },

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

  BECLARITY_PORE_REFINING: {
    id: 'BECLARITY_PORE_REFINING',
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
