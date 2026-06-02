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
    // -----------------------------------------------------
// PRODUCTS
// -----------------------------------------------------

export const PRODUCTS = {
  // GLACIAR
  '10101': {
    id: '10101',
    name: 'GLACIAR Cleansing Milk',
    line: 'GLACIAR',
    category: 'cleanser',
    professional: true,
    homecare: false,
    phase: 'preparation',
    goals: ['hydration', 'barrier_repair'],
    concerns: ['dehydration', 'redness'],
  },

  '10103': {
    id: '10103',
    name: 'GLACIAR Soft Lotion',
    line: 'GLACIAR',
    category: 'toner',
    professional: true,
    homecare: false,
    phase: 'preparation',
    goals: ['hydration', 'barrier_repair'],
    concerns: ['dehydration'],
  },

  '10109': {
    id: '10109',
    name: 'GLACIAR Shell Peeling',
    line: 'GLACIAR',
    category: 'peel',
    professional: true,
    homecare: false,
    phase: 'peeling',
    goals: ['hydration', 'regeneration'],
    concerns: ['dehydration'],
  },

  '10110': {
    id: '10110',
    name: 'GLACIAR Mask',
    line: 'GLACIAR',
    category: 'mask',
    professional: true,
    homecare: false,
    phase: 'mask',
    goals: ['hydration', 'barrier_repair', 'soothing'],
    concerns: ['dehydration', 'redness'],
  },

  '10121': {
    id: '10121',
    name: 'GLACIAR Hydration Gel Cream',
    line: 'GLACIAR',
    category: 'cream',
    professional: true,
    homecare: true,
    phase: 'final',
    goals: ['hydration'],
    concerns: ['dehydration'],
  },

  '10123': {
    id: '10123',
    name: 'GLACIAR Hydro Repairer',
    line: 'GLACIAR',
    category: 'serum',
    professional: true,
    homecare: true,
    phase: 'active',
    goals: ['hydration', 'regeneration', 'barrier_repair'],
    concerns: ['dehydration', 'wrinkles'],
  },

  '10126': {
    id: '10126',
    name: 'GLACIAR Hydraluronic Serum Gel',
    line: 'GLACIAR',
    category: 'serum',
    professional: true,
    homecare: true,
    phase: 'active',
    goals: ['hydration', 'anti_age'],
    concerns: ['dehydration', 'wrinkles'],
  },

  // NICELY

  '10706': {
    id: '10706',
    name: 'THE MOISTURISER',
    line: 'NICELY',
    category: 'cream',
    professional: true,
    homecare: true,
    phase: 'final',
    goals: ['hydration', 'barrier_repair', 'sensitive'],
    concerns: ['redness', 'dehydration'],
  },

  '10707': {
    id: '10707',
    name: 'THE NOURISHER',
    line: 'NICELY',
    category: 'cream',
    professional: true,
    homecare: true,
    phase: 'final',
    goals: ['nutrition', 'barrier_repair'],
    concerns: ['dehydration'],
  },

  '10708': {
    id: '10708',
    name: 'DELICATE MASK',
    line: 'NICELY',
    category: 'mask',
    professional: true,
    homecare: false,
    phase: 'mask',
    goals: ['barrier_repair', 'soothing'],
    concerns: ['redness'],
  },

  '10711': {
    id: '10711',
    name: 'HYDRATION CREAM',
    line: 'NICELY',
    category: 'cream',
    professional: true,
    homecare: true,
    phase: 'final',
    goals: ['hydration', 'barrier_repair'],
    concerns: ['dehydration', 'redness'],
  },

  '10713': {
    id: '10713',
    name: 'NUTRITION CREAM',
    line: 'NICELY',
    category: 'cream',
    professional: true,
    homecare: true,
    phase: 'final',
    goals: ['nutrition', 'barrier_repair'],
    concerns: ['dehydration'],
  },

  // BALANCE

  '10105': {
    id: '10105',
    name: 'BALANCE Cleansing Mousse',
    line: 'BALANCE',
    category: 'cleanser',
    professional: true,
    homecare: true,
    phase: 'preparation',
    goals: ['acne'],
    concerns: ['acne'],
  },

  '10135': {
    id: '10135',
    name: 'PURE REGULATOR SERUM',
    line: 'BALANCE',
    category: 'serum',
    professional: true,
    homecare: true,
    phase: 'active',
    goals: ['acne'],
    concerns: ['acne'],
  },

  '10134': {
    id: '10134',
    name: 'PURE MASK',
    line: 'BALANCE',
    category: 'mask',
    professional: true,
    homecare: false,
    phase: 'mask',
    goals: ['acne'],
    concerns: ['acne'],
  },

  // BECLARITY

  '10270': {
    id: '10270',
    name: 'CLARIFYING CLEANSER',
    line: 'BECLARITY',
    category: 'cleanser',
    professional: true,
    homecare: true,
    phase: 'preparation',
    goals: ['pigmentation'],
    concerns: ['pigmentation'],
  },

  '10272': {
    id: '10272',
    name: 'BLEMISH CORRECTOR SERUM',
    line: 'BECLARITY',
    category: 'serum',
    professional: true,
    homecare: true,
    phase: 'active',
    goals: ['pigmentation'],
    concerns: ['pigmentation'],
  },

  '10273': {
    id: '10273',
    name: 'BLEMISH CONTROLLER SPF30',
    line: 'BECLARITY',
    category: 'spf',
    professional: false,
    homecare: true,
    phase: 'homecare',
    goals: ['pigmentation', 'sun_protection'],
    concerns: ['pigmentation'],
  },

  '10274': {
    id: '10274',
    name: 'BLEMISH CONTROLLER SPF50',
    line: 'BECLARITY',
    category: 'spf',
    professional: false,
    homecare: true,
    phase: 'homecare',
    goals: ['pigmentation', 'sun_protection'],
    concerns: ['pigmentation'],
  },

  // CELL

  '10143': {
    id: '10143',
    name: 'CELL ACTIVATOR SERUM',
    line: 'CELL',
    category: 'serum',
    professional: true,
    homecare: true,
    phase: 'active',
    goals: ['anti_age', 'regeneration', 'lifting'],
    concerns: ['wrinkles', 'lifting'],
  },

  '10144': {
    id: '10144',
    name: 'CELL EYES',
    line: 'CELL',
    category: 'eye_care',
    professional: true,
    homecare: true,
    phase: 'final',
    goals: ['anti_age'],
    concerns: ['wrinkles'],
  },

  // SUMMESUN

  '25001': {
    id: '25001',
    name: 'SUMMESUN SPF50+ Sensitive Skin',
    line: 'SUMMESUN',
    category: 'spf',
    professional: false,
    homecare: true,
    phase: 'protection',
    goals: ['sun_protection', 'sensitive'],
    concerns: ['redness'],
  },

  '25002': {
    id: '25002',
    name: 'SUMMESUN SPF50+ CC Cream',
    line: 'SUMMESUN',
    category: 'spf',
    professional: false,
    homecare: true,
    phase: 'protection',
    goals: ['sun_protection'],
    concerns: [],
  },

  '25007': {
    id: '25007',
    name: 'SUMMESUN AFTER SUN',
    line: 'SUMMESUN',
    category: 'after_sun',
    professional: false,
    homecare: true,
    phase: 'repair',
    goals: ['hydration', 'regeneration'],
    concerns: ['redness'],
  },

  '25012': {
    id: '25012',
    name: 'SUMMESUN SPF50+ Sensitive & Blemished Skin',
    line: 'SUMMESUN',
    category: 'spf',
    professional: false,
    homecare: true,
    phase: 'protection',
    goals: ['sun_protection', 'acne'],
    concerns: ['acne'],
  },
}
  },
}
