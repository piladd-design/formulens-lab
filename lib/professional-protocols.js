import { buildProtocol } from './protocol-engine.js'

function normalizeLang(lang = 'RU') {
  const value = String(lang).toUpperCase()
  if (value === 'DE') return 'DE'
  if (value === 'EN') return 'EN'
  return 'RU'
}

function buildSummary(protocol, lang) {
  if (lang === 'DE') {
    return `Hauptstrategie: ${protocol.mainLine}. Das professionelle Protokoll wurde nach dem Behandlungsziel ausgewählt. Unterstützende Linien ergänzen die Korrektur, ersetzen aber nicht das Hauptziel.`
  }

  if (lang === 'EN') {
    return `Main strategy: ${protocol.mainLine}. The professional protocol was selected according to the treatment goal. Supporting lines complement the correction without replacing the main goal.`
  }

  return `Основная стратегия: ${protocol.mainLine}. Профессиональный протокол выбран по цели процедуры. Поддерживающие линии дополняют коррекцию, но не заменяют главную цель.`
}

export function buildProfessionalProtocol(input = {}) {
  const lang = normalizeLang(input.lang)
  const protocol = buildProtocol(input)

  return {
    decision: {
      mainLine: protocol.mainLine,
      supportLines: protocol.supportLines,
      reason:
        lang === 'DE'
          ? 'Die Hauptlinie wird nach dem Behandlungsziel gewählt, unterstützende Linien nach Hautproblemen.'
          : lang === 'EN'
            ? 'The main line is selected by the treatment goal; supporting lines are selected by skin concerns.'
            : 'Главная линия выбирается по цели процедуры, поддерживающие линии — по проблемам кожи.',
    },

    variant: {
      variantId: protocol.goal,
      variantName: protocol.variantName,
    },

    protocol,
    treatment: protocol,

    summary: buildSummary(protocol, lang),

    recommendations: {
      mainLine: protocol.mainLine,
      supportLines: protocol.supportLines,
      homecare: protocol.homecare,
      local: protocol.local,
    },
  }
}

export default buildProfessionalProtocol
