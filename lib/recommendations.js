import { products } from './products.js'

function product(key) {
  return products[key]
}

export const recommendationProtocols = {
  BALANCE: {
    concern: 'Akne / Entzündungen / fettige Haut',
    morning: [
      product('balance_cleansing_mousse'),
      product('balance_balancing_lotion'),
      product('balance_pure_regulator'),
      product('summsun_spf50_sensitive'),
    ],
    evening: [
      product('balance_cleansing_mousse'),
      product('balance_balancing_lotion'),
      product('balance_pure_regulator'),
      product('balance_hydro_balance'),
    ],
    extra: [
      product('balance_drying_gel'),
    ],
  },

  NICELY: {
    concern: 'Empfindlichkeit / Rötungen / geschwächte Barriere',
    morning: [
      product('nicely_gentle_cleanser'),
      product('nicely_sweet_toner'),
      product('nicely_hydration_serum'),
      product('nicely_hydration_cream'),
      product('nicely_smooth_final_spf50'),
    ],
    evening: [
      product('nicely_gentle_cleanser'),
      product('nicely_sweet_toner'),
      product('nicely_hydration_serum'),
      product('nicely_hydration_cream'),
    ],
    extra: [],
  },

  GLACIAR: {
    concern: 'Feuchtigkeitsmangel / trockene oder fahle Haut',
    morning: [
      product('glaciar_cleansing_milk'),
      product('glaciar_soft_lotion'),
      product('hydraluronic_serum_gel'),
      product('glaciar_hydration_cream'),
      product('summsun_spf50_sensitive'),
    ],
    evening: [
      product('glaciar_cleansing_milk'),
      product('glaciar_soft_lotion'),
      product('hydraluronic_serum_gel'),
      product('glaciar_hydration_cream'),
    ],
    extra: [
      product('hydro_repairer_serum'),
    ],
  },

  BECLARITY: {
    concern: 'Pigmentierung / unebener Teint / postinflammatorische Flecken',
    morning: [
      product('beclarity_clarifying_cleanser'),
      product('beclarity_blemish_corrector_serum'),
      product('beclarity_blemish_controller_spf50'),
    ],
    evening: [
      product('beclarity_clarifying_cleanser'),
      product('beclarity_dark_spot_eraser'),
      product('beclarity_blemish_corrector_serum'),
    ],
    extra: [
      product('summsun_spf50_cc'),
    ],
  },

  CELL: {
    concern: 'Anti-Aging / erste Falten / Vitalität',
    morning: [
      product('cell_activator_serum'),
      product('cell_vitality_cream'),
      product('summsun_spf50_sensitive'),
    ],
    evening: [
      product('cell_activator_serum'),
      product('cell_vitality_cream'),
    ],
    extra: [],
  },

  CELL_C: {
    concern: 'Glow / Vitamin C / Anti-Aging / unebener Teint',
    morning: [
      product('cell_c_cleansing_mousse'),
      product('cell_c_renewal_serum'),
      product('cell_c_regenerating_cream'),
      product('summsun_spf50_sensitive'),
    ],
    evening: [
      product('cell_c_cleansing_mousse'),
      product('cell_c_renewal_serum'),
      product('cell_c_regenerating_cream'),
    ],
    extra: [
      product('cell_c_hydro_nourishing_cream'),
    ],
  },
}

export function getProtocolByLine(line) {
  if (!line) return null

  const normalized = String(line)
    .trim()
    .toUpperCase()
    .replace(/\s+/g, '_')

  return recommendationProtocols[normalized] || null
}

export function getRecommendedProtocol(result) {
  const mainLine = result?.recommendedLines?.main
  const secondaryLine = result?.recommendedLines?.secondary

  const mainProtocol = getProtocolByLine(mainLine)
  const secondaryProtocol = getProtocolByLine(secondaryLine)

  return {
    mainLine,
    secondaryLine,
    mainProtocol,
    secondaryProtocol,
  }
}
