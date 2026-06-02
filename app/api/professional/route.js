import { buildProfessionalProtocol } from '../../../lib/professional-protocols.js'
import { buildStrategy } from '../../../lib/strategy-engine.js'

function normalizeLang(lang = 'DE') {
  const value = String(lang).toUpperCase()
  if (value === 'RU') return 'RU'
  if (value === 'EN') return 'EN'
  return 'DE'
}

function buildFallbackSummary(strategy, protocolResult, lang) {
  const primary = strategy.primaryStrategy?.name || ''
  const line = protocolResult.protocol?.mainLine || protocolResult.decision?.mainLine || ''
  const variant = protocolResult.protocol?.variantName || protocolResult.variant?.variantName || ''

  if (lang === 'RU') {
    return `Основная стратегия: ${primary}. Выбран профессиональный протокол ${line}${variant ? ` — ${variant}` : ''}. Поддерживающие стратегии используются как дополнительная коррекция, без замены основной цели процедуры.`
  }

  if (lang === 'EN') {
    return `Primary strategy: ${primary}. Selected professional protocol: ${line}${variant ? ` — ${variant}` : ''}. Supporting strategies are used as additional correction without replacing the main treatment goal.`
  }

  return `Primäre Strategie: ${primary}. Ausgewähltes professionelles Protokoll: ${line}${variant ? ` — ${variant}` : ''}. Unterstützende Strategien ergänzen die Korrektur, ersetzen aber nicht das Hauptziel der Behandlung.`
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

    const compatibleProtocol = {
      ...protocolResult,

      // новая структура
      protocol: protocolResult.protocol,

      // старая структура, которую, скорее всего, ждёт page.js
      treatment: protocolResult.protocol,
    }

    return Response.json({
      success: true,
      summary: buildFallbackSummary(strategy, protocolResult, input.lang),
      strategy,
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
