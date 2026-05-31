import OpenAI from 'openai'
import { buildHomecareRecommendation } from '../../../lib/homecare-routines'

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

    const routine = buildHomecareRecommendation(body)

    const language =
      lang === 'RU'
        ? 'Russian'
        : lang === 'EN'
        ? 'English'
        : 'German'

    const response = await client.responses.create({
      model: 'gpt-4.1-mini',
      input: `
Create a personalized homecare strategy.

Language: ${language}

Gender: ${gender}
Age: ${age}
Skin Type: ${skinType}
Sensitivity: ${sensitivity}
Concerns: ${concerns}
Goal: ${goal}

Return JSON:

{
  "summary":"",
  "professionalAdvice":""
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
