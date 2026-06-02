import OpenAI from 'openai'
import { buildProfessionalProtocol } from '../../../lib/professional-protocols.js'
import { buildStrategy } from '../../../lib/strategy-engine.js'

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

function normalizeLang(lang = 'DE') {
  const value = String(lang).toUpperCase()
  if (value === 'RU') return 'RU'
  if (value === 'EN') return 'EN'
  return 'DE'
}

function languageName(lang) {
  if (lang === 'RU') return 'Russian'
  if (lang === 'EN') return 'English'
  return 'German'
}

export async function POST(req) {
  try {
    const body = await req.json()
    const lang = normalizeLang(body.lang)

    const {
      gender,
      age,
      skinType,
      sensitivity,
      concerns,
      goal,
    } = body

    const input = {
      ...body,
      lang,
    }

    const strategy = buildStrategy(input)
    const protocolResult = buildProfessionalProtocol(input)
    const treatment = protocolResult.protocol

    const response = await client.responses.create({
      model: 'gpt-4.1-mini',
      input: `
You are FORMULENS LAB, a professional Summecosmetics treatment assistant.

Write a short professional diagnosis for a cosmetologist.

Language: ${languageName(lang)}

CLIENT DATA:
Gender: ${gender || ''}
Age: ${age || ''}
Skin type: ${skinType || ''}
Sensitivity: ${sensitivity || ''}
Concerns: ${Array.isArray(concerns) ? concerns.join(', ') : concerns || ''}
Goal: ${goal || ''}

FORMULENS STRATEGY:
Primary strategy: ${strategy.primaryStrategy?.name || ''}
Primary reason: ${strategy.primaryStrategy?.reason || ''}
Secondary strategies: ${strategy.secondaryStrategies?.map((s) => s.name).join(', ') || ''}
Recommended lines: ${strategy.recommendedLines?.join(', ') || ''}
Active ingredients / focus: ${strategy.activeIngredients?.join(', ') || ''}

SELECTED PROFESSIONAL PROTOCOL:
Main line: ${treatment?.mainLine || protocolResult.decision?.mainLine || ''}
Variant: ${treatment?.variantName || protocolResult.variant?.variantName || ''}
Protocol type: ${treatment?.protocolType || protocolResult.variant?.protocolType || ''}
Course: ${treatment?.course || ''}

RULES:
- Maximum 120 words.
- Do not invent products.
- Do not mention dermatologist.
- Use only the requested language.
- Say cosmetologist / Kosmetikerin / косметолог if professional control is needed.
- Explain the logic: primary strategy, secondary support, selected line.
- If the goal is hydration, do not describe barrier repair as the main strategy unless the primary strategy is barrier repair.
- Return valid JSON only.

Return exactly:
{
  "summary": ""
}
`,
    })

    let ai = { summary: '' }

    try {
      ai = JSON.parse(response.output_text)
    } catch (error) {
      console.error('Professional JSON parse error:', error)
    }

    return Response.json({
      success: true,
      summary: ai.summary || '',
      strategy,
      protocol: protocolResult,
    })
  } catch (error) {
    console.error(error)

    return Response.json(
      {
        success: false,
        error: 'Professional protocol generation failed',
      },
      {
        status: 500,
      }
    )
  }
}
