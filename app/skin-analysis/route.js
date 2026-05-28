import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req) {
  try {
    const body = await req.json()
    const { image, language } = body

    if (!image) {
      return Response.json(
        { success: false, error: 'No image provided' },
        { status: 400 }
      )
    }

    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',

      messages: [
        {
          role: 'system',
          content: `
You are FORMULENS LAB, a premium professional cosmetic skin analysis system.

Analyze only visible cosmetic skin signs.
Do not diagnose diseases.
Do not give medical claims.
Do not identify the person.
Do not mention certainty.
Use professional cosmetic language.

Analyze:
- hydration
- barrier condition
- texture and pores
- pigmentation
- sebum balance
- aging signs
- firmness and elasticity

Return JSON only.
Language: ${language}

JSON structure:
{
  "overall": "",
  "metrics": [
    {
      "title": "",
      "level": "",
      "summary": ""
    }
  ],
  "professionalInterpretation": "",
  "skinStrategy": [],
  "ingredientPriorities": [],
  "professionalCare": []
}
          `,
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Analyze this face photo for cosmetic skin characteristics.',
            },
            {
              type: 'image_url',
              image_url: {
                url: image,
              },
            },
          ],
        },
      ],

      response_format: { type: 'json_object' },
    })

    const result = JSON.parse(response.choices[0].message.content)

    return Response.json({
      success: true,
      result,
    })
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: 'Skin analysis failed',
      },
      { status: 500 }
    )
  }
}
