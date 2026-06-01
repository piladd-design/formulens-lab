import { products } from './products'
import {
  getPrimaryCollection,
  getSupportCollections,
} from './diagnostic-matrix'

function p(key) {
  return products[key]
}

export function generateHomecareRoutine(formData = {}) {
  const primary = getPrimaryCollection(formData)
  const support = getSupportCollections(formData)

  let morning = []
  let evening = []
  let recommendations = []

  switch (primary) {
    case 'BALANCE':
      morning = [
        p('balance_cleansing_mousse'),
        p('balance_balancing_lotion'),
        p('balance_pure_regulator'),
        p('summsun_spf50_sensitive'),
      ]

      evening = [
        p('balance_cleansing_mousse'),
        p('balance_balancing_lotion'),
        p('balance_pure_regulator'),
        p('balance_hydro_balance'),
      ]

      recommendations.push('BALANCE')
      break

    case 'NICELY':
      morning = [
        p('nicely_gentle_cleanser'),
        p('nicely_sweet_toner'),
        p('nicely_hydration_serum'),
        p('nicely_hydration_cream'),
        p('nicely_smooth_final_spf50'),
      ]

      evening = [
        p('nicely_gentle_cleanser'),
        p('nicely_sweet_toner'),
        p('nicely_hydration_serum'),
        p('nicely_hydration_cream'),
      ]

      recommendations.push('NICELY')
      break

    case 'GLACIAR':
      morning = [
        p('glaciar_cleansing_milk'),
        p('glaciar_soft_lotion'),
        p('hydraluronic_serum_gel'),
        p('glaciar_hydration_cream'),
        p('summsun_spf50_sensitive'),
      ]

      evening = [
        p('glaciar_cleansing_milk'),
        p('glaciar_soft_lotion'),
        p('hydraluronic_serum_gel'),
        p('glaciar_hydration_cream'),
      ]

      recommendations.push('GLACIAR')
      break

    case 'BECLARITY':
      morning = [
        p('beclarity_clarifying_cleanser'),
        p('beclarity_blemish_corrector_serum'),
        p('beclarity_blemish_controller_spf50'),
      ]

      evening = [
        p('beclarity_clarifying_cleanser'),
        p('beclarity_dark_spot_eraser'),
        p('beclarity_blemish_corrector_serum'),
      ]

      recommendations.push('BECLARITY')
      break

    case 'CELL_C':
      morning = [
        p('cell_c_cleansing_mousse'),
        p('cell_c_renewal_serum'),
        p('cell_c_regenerating_cream'),
        p('summsun_spf50_sensitive'),
      ]

      evening = [
        p('cell_c_cleansing_mousse'),
        p('cell_c_renewal_serum'),
        p('cell_c_regenerating_cream'),
      ]

      recommendations.push('CELL_C')
      break

    case 'CELL':
      morning = [
        p('cell_activator_serum'),
        p('cell_vitality_cream'),
        p('summsun_spf50_sensitive'),
      ]

      evening = [
        p('cell_activator_serum'),
        p('cell_vitality_cream'),
      ]

      recommendations.push('CELL')
      break

    case 'MYCODE':
      {
        const age = Number(formData.age || 0)

        const concernText = JSON.stringify(formData).toLowerCase()

        const hasLifting =
          concernText.includes('lifting') ||
          concernText.includes('лифтинг') ||
          concernText.includes('овал') ||
          concernText.includes('firming') ||
          concernText.includes('упруг')

        const hasRetinol =
          concernText.includes('photoaging') ||
          concernText.includes('фотостарение') ||
          concernText.includes('retinol')

        const hasSensitive =
          concernText.includes('sensitive') ||
          concernText.includes('чувств')

        if (hasLifting) {
          morning = [
            p('mycode_061'),
            p('mycode_062'),
            p('summsun_spf50_sensitive'),
          ]

          evening = [
            p('mycode_061'),
            p('mycode_062'),
          ]

          recommendations.push('MYCODE 06')
        } else if (hasRetinol) {
          morning = [
            p('mycode_071'),
            p('mycode_072'),
            p('summsun_spf50_sensitive'),
          ]

          evening = [
            p('mycode_071'),
            p('mycode_072'),
          ]

          recommendations.push('MYCODE 07')
        } else {
          morning = [
            p('mycode_051'),
            age >= 60
              ? p('mycode_053')
              : p('mycode_052'),
            p('summsun_spf50_sensitive'),
          ]

          evening = [
            p('mycode_051'),
            age >= 60
              ? p('mycode_053')
              : p('mycode_052'),
          ]

          recommendations.push('MYCODE 05')
        }

        if (hasSensitive) {
          recommendations.push('MYCODE 02')
        }
      }
      break

    default:
      morning = [
        p('glaciar_cleansing_milk'),
        p('hydraluronic_serum_gel'),
        p('glaciar_hydration_cream'),
        p('summsun_spf50_sensitive'),
      ]

      evening = [
        p('glaciar_cleansing_milk'),
        p('hydraluronic_serum_gel'),
        p('glaciar_hydration_cream'),
      ]
  }

  return {
    primaryLine: primary,
    supportLines: support,
    recommendations,
    morning: morning.filter(Boolean),
    evening: evening.filter(Boolean),
  }
}
