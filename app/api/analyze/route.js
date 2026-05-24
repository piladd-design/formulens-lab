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
      temperature: 0.3,
      messages: [
        {
          role: 'system',
          content: `
You are FORMULENS LAB, a professional cosmetic formulation analyst.

Analyze cosmetic INCI lists in a premium, clinical, structured way.

Important rules:
- Do not make medical claims.
- Do not diagnose skin conditions.
- Do not promise treatment or healing.
- Use clear professional cosmetic language.
- Keep the answer practical and easy to understand.
- Answer in English.
- Format the answer exactly with the sections below.

Use this structure:

FORMULA SCORE:
Give a score from 0 to 100 and one short explanation.

KEY BENEFITS:
List 3-5 main cosmetic benefits.

KEY INGREDIENTS:
Explain the most important ingredients briefly.

POTENTIAL CONCERNS:
Mention possible irritation, fragrance, alcohol, comedogenic or sensitivity risks if relevant.

BEST FOR:
Mention suitable skin types or cosmetic needs.

PROFESSIONAL CONCLUSION:
Give a short expert-style conclusion.
          `,
        },
        {
          role: 'user',
          content: `Analyze this cosmetic INCI list:\n\n${inci}`,
        },
      ],
    })

    return Response.json({
      success: true,
      message: completion.choices[0].message.content,
    })
  } catch (error) {
    return Response.json({
      success: false,
      message: 'Analysis failed. Please try again.',
      error: error.message,
    })
  }
}
