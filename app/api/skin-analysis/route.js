import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req) {
  try {
    const { image, lang = 'DE' } = await req.json()

    if (!image) {
      return Response.json({ error: 'Image is required' }, { status: 400 })
    }

    const language =
      lang === 'RU' ? 'Russian' : lang === 'EN' ? 'English' : 'German'

    const response = await client.responses.create({
      model: 'gpt-4.1-mini',
      input: [
        {
          role: 'user',
          content: [
            {
              type: 'input_text',
              text: `
You are a cosmetic skin analysis assistant for FORMULENS LAB.

Analyze the visible skin condition from the photo.

Language: ${language}

Return ONLY valid JSON.

Use this structure:
{
  "overallScore": 54,
  "hydration": 58,
  "pigmentation": 46,
  "wrinkles": 52,
  "acne": 68,
  "summary": "text",
  "morningRoutine": "text",
  "eveningRoutine": "text",
  "summecosmetics": "text",
  "professionalNote": "text"
}

Rules:
Do not diagnose diseases.
Do not make medical claims.
Use cosmetic language only.
Mention that photo-based analysis is not a medical diagnosis.
No markdown.
Only JSON.
              `,
            },
            {
              type: 'input_image',
              image_url: image,
            },
          ],
        },
      ],
    })

    return Response.json(JSON.parse(response.output_text))
  } catch (error) {
    console.error(error)
    return Response.json({ error: 'Skin analysis failed' }, { status: 500 })
  }
}
