import { buildProfessionalProtocol } from '../../../lib/professional-protocols.js'
import { buildStrategy } from '../../../lib/strategy-engine.js'
import { buildSmartRecommendations } from '../../../lib/recommendations.js'

function normalizeLang(lang = 'DE') {
  const value = String(lang).toUpperCase()
  if (value === 'RU') return 'RU'
  if (value === 'EN') return 'EN'
  return 'DE'
}

function buildFallbackSummary(strategy, protocolResult, smartRecommendations, lang) {
  const primary = strategy.primaryStrategy?.name || ''
  const line =
    smartRecommendations?.recommendedLines?.[0] ||
    protocolResult.protocol?.mainLine ||
    protocolResult.decision?.mainLine ||
    ''

  const variant =
    protocolResult.protocol?.variantName ||
    protocolResult.variant?.variantName ||
    ''

  if (lang === 'RU') {
    return `Основная стратегия: ${primary}. Главная линия выбрана по цели процедуры: ${line}${variant ? ` — ${variant}` : ''}. Продукты и домашняя поддержка подобраны с учётом цели, проблем кожи, возраста, типа кожи и чувствительности.`
  }

  if (lang === 'EN') {
    return `Primary strategy: ${primary}. Main line selected by treatment goal: ${line}${variant ? ` — ${variant}` : ''}. Products and homecare are selected according to goal, skin concerns, age, skin type and sensitivity.`
  }

  return `Primäre Strategie: ${primary}. Hauptlinie nach Behandlungsziel ausgewählt: ${line}${variant ? ` — ${variant}` : ''}. Produkte und Heimpflege werden nach Ziel, Hautproblemen, Alter, Hauttyp und Empfindlichkeit ausgewählt.`
}

export async function POST(req) {
  try {
    const body = await req.json()

    const input = {
      ...body,
      lang: normalizeLang(body.lang),
    }

    const strategy = buildStrategy(input)
    const protocolResult = buildProfessionalProtocol(input)
    const smartRecommendations = buildSmartRecommendations(input)

    const compatibleProtocol = {
      ...protocolResult,

      protocol: protocolResult.protocol,
      treatment: protocolResult.protocol,

      smartRecommendations,
      recommendations: smartRecommendations,
    }

    return Response.json({
      success: true,
      summary: buildFallbackSummary(
        strategy,
        protocolResult,
        smartRecommendations,
        input.lang
      ),
      strategy,
      recommendations: smartRecommendations,
      protocol: compatibleProtocol,
    })
  } catch (error) {
    console.error('FORMULENS professional error:', error)

    return Response.json(
      {
        success: false,
        error: error?.message || 'Professional protocol generation failed',
      },
      { status: 500 }
    )
  }
}
