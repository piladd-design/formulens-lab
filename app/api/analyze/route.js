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
      messages: [
        {
          role: 'system',
          content: `
You are a professional cosmetic chemist and skincare analyst.

Analyze cosmetic INCI lists professionally and return the response EXACTLY in this structure.

FORMULA SCORE:
85

KEY BENEFITS:
- hydration
- barrier support
- soothing
- brightening

KEY INGREDIENTS:
- Niacinamide: improves skin tone and barrier function
- Panthenol: soothing and repairing
- Hyaluronic Acid: hydration

POTENTIAL CONCERNS:
- possible irritation for very sensitive skin

BEST FOR:
- dry skin
- sensitive skin
- dehydrated skin

PROFESSIONAL CONCLUSION:
This formula is well-balanced and focused on hydration, barrier repair and skin comfort.

HYDRATION:
92

BARRIER SUPPORT:
88

ANTI-AGING:
74

IRRITATION RISK:
LOW

ACNE SAFE:
YES

FRAGRANCE FREE:
YES
`
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
      message: 'Analysis service is temporarily unavailable.',
      error: error.message,
    })
  }
}
