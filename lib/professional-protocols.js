import { buildProtocol } from './protocol-builder.js'

function normalizeLang(lang = 'RU') {
  const value = String(lang).toUpperCase()
  if (value === 'DE') return 'DE'
  if (value === 'EN') return 'EN'
  return 'RU'
}

function buildSummary(protocolBuilderResult, lang) {
  const line =
    protocolBuilderResult?.strategy?.mainLineLabel ||
    protocolBuilderResult?.strategy?.mainLine ||
    '—'

  const variant = protocolBuilderResult?.strategy?.mycodeVariant

  if (lang === 'DE') {
    return `Hauptstrategie: ${line}${variant ? ` ${variant}` : ''}. Das professionelle Protokoll wurde nach dem Hauptziel ausgewählt. Das Alter wird als Modifikator berücksichtigt, ersetzt aber nicht die Hauptaufgabe der Haut.`
  }

  if (lang === 'EN') {
    return `Main strategy: ${line}${variant ? ` ${variant}` : ''}. The professional protocol was selected according to the main goal. Age is used as a modifier, but it does not replace the main skin concern.`
  }

  return `Основная стратегия: ${line}${variant ? ` ${variant}` : ''}. Профессиональный протокол выбран по главной задаче кожи. Возраст учитывается как модификатор, но не заменяет основную проблему.`
}

export function buildProfessionalProtocol(input = {}) {
  const lang = normalizeLang(input.lang)
  const result = buildProtocol(input)

  const strategy = result.strategy || {}
  const protocol = result.protocol || {}

  return {
    decision: {
      mainLine: strategy.mainLineLabel || strategy.mainLine,
      supportLines: strategy.supportingLineLabels || strategy.supportingLines || [],
      reason:
        lang === 'DE'
          ? 'Die Hauptlinie wird nach dem Hauptziel gewählt. Unterstützende Linien ergänzen das Protokoll, ersetzen aber nicht die Hauptlinie.'
          : lang === 'EN'
            ? 'The main line is selected by the main goal. Supporting lines complement the protocol, but do not replace the main line.'
            : 'Главная линия выбирается по главной задаче. Поддерживающие линии дополняют протокол, но не заменяют основную линию.',
    },

    variant: {
      variantId: strategy.mycodeVariant || protocol.variant || null,
      variantName: strategy.mycodeVariant
        ? `MYCODE ${strategy.mycodeVariant}`
        : protocol.variant || '—',
    },

    protocol: {
      ...protocol,
      mainLine: strategy.mainLineLabel || strategy.mainLine,
      supportLines: strategy.supportingLineLabels || strategy.supportingLines || [],
      activeConcentrates: result.activeConcentrates || [],
      homecare: result.homecare || [],
      protocolBuilder: result,
    },

    treatment: {
      ...protocol,
      mainLine: strategy.mainLineLabel || strategy.mainLine,
      supportLines: strategy.supportingLineLabels || strategy.supportingLines || [],
      activeConcentrates: result.activeConcentrates || [],
      homecare: result.homecare || [],
      protocolBuilder: result,
    },

    summary: buildSummary(result, lang),

    recommendations: {
      mainLine: strategy.mainLineLabel || strategy.mainLine,
      supportLines: strategy.supportingLineLabels || strategy.supportingLines || [],
      homecare: result.homecare || [],
      activeConcentrates: result.activeConcentrates || [],
    },
  }
}

export default buildProfessionalProtocol
