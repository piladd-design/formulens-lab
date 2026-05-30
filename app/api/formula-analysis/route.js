import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req) {
  try {
    const { formula, lang = 'DE' } = await req.json()

    if (!formula || !formula.trim()) {
      return Response.json(
        { error: 'Formula is required' },
        { status: 400 }
      )
    }

    const language =
      lang === 'RU' ? 'Russian' : lang === 'EN' ? 'English' : 'German'

    const response = await client.responses.create({
      model: 'gpt-4.1-mini',
      input: `
You are a cosmetic formulation assistant for FORMULENS LAB.

Analyze this INCI formula for a homecare user.
Language: ${language}

Return a clear, premium but understandable analysis.
Do not diagnose diseases.
Do not make medical claims.
Focus on:
- hydration
- barrier support
- anti-aging potential
- acne compatibility
- irritation risk
- key benefits
- recommendation
- relevant Summecosmetics directions if appropriate

INCI:
${formula}
      `,
    })

    return Response.json({
      result: response.output_text,
    })
  } catch (error) {
    console.error(error)

    return Response.json(
      { error: 'AI analysis failed' },
      { status: 500 }
    )
  }
}
