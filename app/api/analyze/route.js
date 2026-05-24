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
          content:
            'You are a professional cosmetic formulation analyst. Analyze INCI ingredient lists clearly, clinically and responsibly. Do not make medical claims.',
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
