import { buildProfessionalProtocol } from './professional-protocols.js'

export function buildProfessionalTreatment(input = {}) {
  const result = buildProfessionalProtocol(input)

  return {
    mode: 'PROFESSIONAL',
    audience: result.protocol?.audience || 'Für Kosmetikerinnen & Institute',
    decision: result.decision,
    variant: result.variant,
    treatment: result.protocol,
  }
}
