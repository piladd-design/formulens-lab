import OpenAI from 'openai'
import { buildProfessionalTreatment } from '../../../lib/professional-treatment-builder.js'
import { buildStrategy } from '../../../lib/strategy-engine.js'

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

function languageName(lang) {
  if (lang === 'RU') return 'Russian'
  if (lang === 'EN') return 'English'
  return 'German'
}

export async function POST(req) {
  try {
    const body = await req.json()

    const {
      gender,
      age,
      skinType,
      sensitivity,
      concerns,
      goal,
      lang = 'DE',
    } = body

    const strategy = buildStrategy(body)
    const protocol = buildProfessionalTreatment(body)

    const response = await client.responses.create({
      model: 'gpt-4.1-mini',
      input: `
You are FORMULENS LAB, a professional Summecosmetics treatment assistant.

Write a short professional diagnosis for a cosmetologist.

Language: ${languageName(lang)}

CLIENT DATA:
Gender: ${gender}
Age: ${age}
Skin type: ${skinType}
Sensitivity: ${sensitivity}
Concerns: ${Array.isArray(concerns) ? concerns.join(', ') : concerns}
Goal: ${goal}

FORMULENS STRATEGY:
Primary strategy: ${strategy.primaryStrategy?.name}
Primary reason: ${strategy.primaryStrategy?.reason}
Secondary strategies: ${strategy.secondaryStrategies?.map((s) => s.name).join(', ')}
Recommended lines: ${strategy.recommendedLines?.join(', ')}
Active ingredients / focus: ${strategy.activeIngredients?.join(', ')}

SELECTED PROFESSIONAL PROTOCOL:
Main line: ${protocol.decision?.mainLine}
Variant: ${protocol.variant?.variantName}
Protocol type: ${protocol.treatment?.protocolType}
Course: ${protocol.treatment?.course}

RULES:
- Maximum 120 words.
- Do not invent products.
- Do not mention dermatologist.
- Say cosmetologist / Kosmetikerin / косметолог if professional control is needed.
- Explain the professional logic: primary concern, secondary support, strategy.
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
      protocol,
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
