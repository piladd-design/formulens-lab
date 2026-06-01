import { buildProfessionalProtocol } from './professional-protocols.js'

export function buildProfessionalTreatment(input = {}) {
  const result = buildProfessionalProtocol(input)

  return {
    mode: 'PROFESSIONAL',
    audience: 'Für Kosmetikerinnen & Institute',
    decision: result.decision,
    treatment: result.protocol,
  }
}
