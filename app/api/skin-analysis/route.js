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
You are a professional cosmetic skin analysis assistant for FORMULENS LAB.

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

overallScore = 0-100
hydration = 0-100
pigmentation = 0-100
wrinkles = 0-100
acne = 0-100

Do not diagnose diseases.
Do not make medical claims.
Use cosmetic language only.

The analysis is based only on the visible appearance of the skin in the photo.

The professionalNote should be positive, reassuring and educational.

The professionalNote should explain that:
- the analysis is based on visual assessment of a photo
- it is intended for cosmetic recommendations only
- regular homecare is important
- professional cosmetic treatments may help improve results
- individual skincare programs usually provide the best long-term improvement

Do NOT recommend visiting a dermatologist unless there are obvious severe medical concerns visible in the image.

The tone should be professional, premium and motivating.

For the Summecosmetics recommendation, recommend the most relevant directions such as:
GLACIAR
NICELY
BALANCE
BECLARITY
CELL C
CELL
MYCODE
SUMMESUN

Return ONLY valid JSON.

No markdown.
No explanations.
No code blocks.
No additional text outside JSON.
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
