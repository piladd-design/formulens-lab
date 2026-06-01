import OpenAI from 'openai'
import { buildHomecareRecommendation } from '../../../lib/homecare-routines.js'

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

function productList(products = []) {
  return products
    .map((item, index) => {
      if (!item) return null

      return `${index + 1}. ${item.name} (${item.line}, ${item.step}) — ${item.purpose}`
    })
    .filter(Boolean)
    .join('\n')
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

    const routine = buildHomecareRecommendation({
      ...body,
      lang,
    })

    const language =
      lang === 'RU'
        ? 'Russian'
        : lang === 'EN'
        ? 'English'
        : 'German'

    const response = await client.responses.create({
      model: 'gpt-4.1-mini',
      input: `
You are FORMULENS LAB homecare text assistant.

Your task:
Write a short premium cosmetic explanation based ONLY on the FORMULENS recommendation below.

IMPORTANT RULES:
- Do NOT choose products yourself.
- Do NOT recommend ingredients that are not clearly represented in the selected products.
- Do NOT mention dermatologist.
- If professional support is needed, say "cosmetologist" / "Kosmetikerin" / "косметолог".
- Do NOT mention laser therapy.
- Do NOT mention medical diagnosis.
- Do NOT invent extra treatments.
- Do NOT contradict the selected primary line.
- Focus on cosmetic homecare and professional cosmetic support.
- Return ONLY valid JSON.

Language: ${language}

CLIENT DATA:
Gender: ${gender}
Age: ${age}
Skin Type: ${skinType}
Sensitivity: ${sensitivity}
Concerns: ${concerns}
Goal: ${goal}

FORMULENS SELECTED PROTOCOL:
Primary line: ${routine.primaryLine}
Recommended lines: ${routine.lines?.join(', ')}
Detected concerns: ${routine.detectedConcerns?.join(', ')}

MORNING PRODUCTS:
${productList(routine.morning)}

EVENING PRODUCTS:
${productList(routine.evening)}

WEEKLY SUPPORT:
${productList(routine.weeklySupport)}

AVOID:
${routine.avoid?.map((item, index) => `${index + 1}. ${item}`).join('\n')}

Write:
1. summary: explain why this protocol was selected.
2. professionalAdvice: explain how to use the selected morning/evening products and suggest consultation with a cosmetologist if professional treatments are needed.

Return JSON exactly:

{
  "summary": "",
  "professionalAdvice": ""
}
`,
    })

    const ai = JSON.parse(response.output_text)

    return Response.json({
      ...ai,
      recommendation: routine,
    })
  } catch (error) {
    console.error(error)

    return Response.json(
      {
        error: 'Homecare generation failed',
      },
      {
        status: 500,
      }
    )
  }
}
