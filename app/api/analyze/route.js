import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req) {
  try {
    const body = await req.json()

    const inci = body.inci

    if (!inci) {
      return Response.json({
        success: false,
        message: 'No INCI list provided.',
      })
    }

    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      response_format: { type: 'json_object' },

      messages: [
        {
          role: 'system',
          content: `
You are a professional cosmetic formulation analyst.

Analyze cosmetic INCI lists professionally.

Return ONLY valid JSON.

Example structure:

{
  "formulaScore": 88,
  "hydration": 92,
  "barrierSupport": 85,
  "antiAging": 78,
  "acneSafety": 90,
  "irritationRisk": 12,

  "keyBenefits": [
    "Deep hydration",
    "Barrier support",
    "Soothing effect"
  ],

  "keyIngredients": [
    {
      "name": "Niacinamide",
      "description": "Improves skin barrier and skin tone"
    },
    {
      "name": "Panthenol",
      "description": "Provides soothing and repairing effects"
    }
  ],

  "potentialConcerns": [
    "Minimal irritation risk for sensitive skin"
  ],

  "bestFor": [
    "Dry skin",
    "Sensitive skin",
    "Dehydrated skin"
  ],

  "professionalConclusion":
    "This formula is well-balanced and suitable for most skin types."
}
`,
        },

        {
          role: 'user',
          content: `Analyze this INCI list:\n\n${inci}`,
        },
      ],
    })

    const result = JSON.parse(
      completion.choices[0].message.content
    )

    return Response.json({
      success: true,
      data: result,
    })
  } catch (error) {
    return Response.json({
      success: false,
      message: 'Analysis failed.',
      error: error.message,
    })
  }
}
