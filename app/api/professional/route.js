import OpenAI from 'openai'
import { buildProfessionalTreatment } from '../../../lib/professional-treatment-builder'

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

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

    const protocol = buildProfessionalTreatment(body)

    const language =
      lang === 'RU'
        ? 'Russian'
        : lang === 'EN'
        ? 'English'
        : 'German'

    const response = await client.responses.create({
      model: 'gpt-4.1-mini',
      input: `
You are a senior aesthetic skin therapist.

Create a SHORT professional explanation for a cosmetologist.

Language: ${language}

Gender: ${gender}
Age: ${age}
Skin Type: ${skinType}
Sensitivity: ${sensitivity}
Concerns: ${concerns}
Goal: ${goal}

Rules:

- Maximum 120 words.
- Professional tone.
- Explain WHY this protocol was selected.
- Mention expected treatment goals.
- Do NOT recommend products not included in the protocol.
- Do NOT invent ingredients.
- Return valid JSON only.

{
  "summary":""
}
`,
    })

    let ai = {
      summary: '',
    }

    try {
      ai = JSON.parse(response.output_text)
    } catch (e) {
      console.error('Professional JSON parse error', e)
    }

    return Response.json({
      success: true,
      summary: ai.summary || '',
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
