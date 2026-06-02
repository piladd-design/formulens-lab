export const PROTOCOL_RULES = {
  general: {
    mainLine: 'ECC',
    supportLines: [],
    active: [],
    mask: null,
    finish: ['ecc-repair-shield-spf50'],
    homecare: ['ecc-repair-shield-spf50', 'ecc-repair-lip-balm'],
  },

  hydration: {
    mainLine: 'GLACIAR',
    supportLines: ['MYCODE_ADVANCED', 'CELL'],
    active: ['mycode-03-hydro-nourishing-code'],
    mask: 'mycode-hydronutrition-mask',
    finish: ['glaciar-hydration-cream', 'summsun-spf50-sensitive'],
    homecare: ['hydraluronic-serum-gel', 'glaciar-hydration-cream', 'summsun-spf50-sensitive'],
  },

  sensitivity: {
    mainLine: 'NICELY',
    supportLines: ['CELL', 'ECC'],
    peel: 'nicely-enzyme-peel',
    active: ['mycode-02-comforting-code', 'nicely-the-moisturiser'],
    mask: 'nicely-delicate-mask',
    finish: ['nicely-smooth-final-cream'],
    homecare: ['nicely-skincare-hydration-serum', 'nicely-skincare-hydration-cream'],
  },

  pore_refining: {
    mainLine: 'BECLARITY',
    supportLines: ['BALANCE', 'ECC'],
    active: ['beclarity-blemish-corrector-serum'],
    mask: 'balance-balancing-pure-mask',
    finish: ['beclarity-blemish-controller-spf50'],
    local: ['beclarity-dark-spot-eraser'],
    homecare: ['beclarity-blemish-corrector-serum', 'beclarity-blemish-controller-spf50'],
  },

  acne: {
    mainLine: 'BALANCE',
    supportLines: ['NICELY'],
    active: ['balance-pure-regulator'],
    mask: 'balance-balancing-pure-mask',
    finish: ['balance-hydro-balance', 'summsun-spf50-sensitive'],
    local: ['balance-drying-gel'],
    homecare: ['balance-cleanning-mousse', 'balance-balancing-lotion', 'balance-hydro-balance', 'balance-drying-gel'],
  },

  pigmentation: {
    mainLine: 'BECLARITY',
    supportLines: ['CELL_C', 'MYCODE_ADVANCED'],
    peel: 'nicely-enzyme-peel',
    active: ['beclarity-blemish-corrector-serum', 'mycode-04-depigmenting-code'],
    mask: 'cell-c-orange-rubber-mask',
    finish: ['beclarity-blemish-controller-spf50'],
    local: ['beclarity-dark-spot-eraser'],
    homecare: ['beclarity-blemish-corrector-serum', 'beclarity-dark-spot-eraser', 'beclarity-blemish-controller-spf50'],
  },

  regeneration: {
    mainLine: 'CELL',
    supportLines: ['MYCODE_ADVANCED', 'ECC'],
    active: ['cell-activator-serum'],
    mask: 'mycode-hydronutrition-mask',
    finish: ['ecc-repair-shield-spf50'],
    homecare: ['cell-activator-serum', 'ecc-repair-shield-spf50'],
  },

  lifting: {
    mainLine: 'MYCODE_ADVANCED',
    supportLines: ['CELL', 'CELL_C'],
    active: ['mycode-06-firming-code', 'mycode-05-plumping-code'],
    mask: 'cell-c-orange-rubber-mask',
    finish: ['mycode-firming-cream', 'summsun-spf50-sensitive'],
    homecare: ['mycode-firming-cream', 'cell-activator-serum', 'summsun-spf50-sensitive'],
  },

  anti_age: {
    mainLine: 'MYCODE_ADVANCED',
    supportLines: ['CELL', 'CELL_C'],
    active: ['mycode-05-plumping-code', 'mycode-07-retinol-code'],
    mask: 'mycode-hydronutrition-mask',
    finish: ['mycode-plumping-cream', 'summsun-spf50-sensitive'],
    homecare: ['mycode-plumping-cream', 'cell-activator-serum', 'summsun-spf50-sensitive'],
  },

  radiance: {
    mainLine: 'CELL_C',
    supportLines: ['MYCODE_ADVANCED'],
    peel: 'nicely-enzyme-peel',
    active: ['cell-c-light-lifting-serum-gel'],
    mask: 'cell-c-orange-rubber-mask',
    finish: ['cell-c-antiage-cream', 'summsun-spf50-sensitive'],
    homecare: ['cell-c-renewal-serum', 'cell-c-hydro-c-cream', 'summsun-spf50-sensitive'],
  },
}

export function getProtocolRule(goal = 'general') {
  return PROTOCOL_RULES[goal] || PROTOCOL_RULES.general
}

export default PROTOCOL_RULES
