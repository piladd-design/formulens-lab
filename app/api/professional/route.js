import { buildProfessionalProtocol } from '../../../lib/professional-protocols.js'
import { buildStrategy } from '../../../lib/strategy-engine.js'

function normalizeLang(lang = 'DE') {
  const value = String(lang).toUpperCase()
  if (value === 'RU') return 'RU'
  if (value === 'EN') return 'EN'
  return 'DE'
}

export async function POST(req) {
  try {
    const body = await req.json()

    const input = {
      ...body,
      lang: normalizeLang(body.lang),
    }

    const strategy = buildStrategy(input)
    const protocol = buildProfessionalProtocol(input)

    return Response.json({
      success: true,
      summary: '',
      strategy,
      protocol,
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
