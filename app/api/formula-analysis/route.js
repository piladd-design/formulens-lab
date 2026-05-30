import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req) {
  try {
    const { formula, lang = 'DE' } = await req.json()

    const language =
      lang === 'RU'
        ? 'Russian'
        : lang === 'EN'
        ? 'English'
        : 'German'

    const response = await client.responses.create({
      model: 'gpt-4.1-mini',

      input: `
You are a professional cosmetic formulation expert.

Language: ${language}

Analyze this cosmetic INCI formula.

Return ONLY valid JSON.

Example:

{
  "overallScore": 82,
  "hydration": 88,
  "barrier": 84,
  "antiAging": 91,
  "acne": 73,
  "irritation": 18,
  "summary": "text",
  "ingredients": "text",
  "skinTypes": "text",
  "warnings": "text",
  "recommendation": "text",
  "summecosmetics": "text"
}

Rules:

overallScore = 0-100
hydration = 0-100
barrier = 0-100
antiAging = 0-100
acne = 0-100
irritation = 0-100

Return only JSON.
No markdown.
No explanations.

Formula:

${formula}
      `,
    })

    const content = response.output_text

    return Response.json(JSON.parse(content))
  } catch (error) {
    console.error(error)

    return Response.json(
      { error: 'Analysis failed' },
      { status: 500 }
    )
  }
}
