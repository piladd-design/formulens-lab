import { buildProfessionalProtocol } from './professional-protocols.js'
import { selectProfessionalVariant as selectAdvancedVariant } from './professional-variant-engine.js'

export function buildProfessionalTreatment(input = {}) {
  const result = buildProfessionalProtocol(input)
  const advancedVariant = selectAdvancedVariant(input)

  return {
    mode: 'PROFESSIONAL',
    audience: result.protocol?.audience || 'Für Kosmetikerinnen & Institute',
    decision: result.decision,
    variant: result.variant,
    advancedVariant,
    treatment: {
      ...result.protocol,
      advancedVariant,
    },
  }
}
