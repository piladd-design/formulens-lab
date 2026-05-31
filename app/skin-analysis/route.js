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
You are a cosmetic homecare skin analysis assistant for FORMULENS LAB.

Analyze the visible skin condition from the photo for a homecare user.

Language: ${language}

This is NOT a professional dermatological diagnosis.
This is a simple cosmetic homecare analysis.

Return ONLY valid JSON.

Use this exact structure:

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

Scoring rules:

overallScore = 0-100
hydration = 0-100
pigmentation = 0-100
wrinkles = 0-100
acne = 0-100

Important meaning of scores:

hydration:
Higher score means better visible hydration.
Lower score means more visible dryness or dehydration.

pigmentation:
Higher score means more even-looking tone.
Lower score means more visible pigmentation, uneven tone or post-inflammatory marks.

wrinkles:
Higher score means fewer visible wrinkles or smoother-looking skin.
Lower score means more visible lines, wrinkles or loss of smoothness.

acne:
Higher score means fewer visible blemishes or inflammatory elements.
Lower score means more visible blemishes, acne-like elements, redness or inflammation.

overallScore:
General homecare skin condition score based on the four parameters above.

Important cosmetic logic:

If visible redness, irritation or inflammatory elements are present:
reduce acne score.
Mention calming and barrier-supporting homecare.

If uneven tone, dark spots or post-inflammatory marks are visible:
reduce pigmentation score.
Mention tone-evening support.

If dryness, tight-looking skin or dullness is visible:
reduce hydration score.
Mention hydration and comfort.

If visible lines, wrinkles or texture changes are present:
reduce wrinkles score.
Mention smoothing and anti-aging support.

For visible redness or sensitivity:
recommend NICELY and GLACIAR first.

For visible blemishes or sebum imbalance:
recommend BALANCE.

For pigmentation or uneven tone:
recommend BECLARITY and CELL C only if pigmentation is a clear concern.

For daily protection:
recommend SUMMESUN when appropriate.

Summecosmetics recommendation:
Choose only 2-4 most relevant directions from:
GLACIAR
NICELY
BALANCE
BECLARITY
CELL C
SUMMESUN
MYCODE

Do not list too many directions.
Make the recommendation simple and understandable for a homecare user.

Professional note:
The professionalNote should be positive and motivating.
It should explain that the analysis is based on visual assessment of a photo and is intended for cosmetic recommendations only.
It should encourage regular homecare and, if needed, professional cosmetic support.
Do not recommend visiting a dermatologist unless there are obvious severe medical concerns visible in the image.

Safety and tone:

Do not diagnose diseases.
Do not use medical diagnosis terms.
Do not make medical claims.
Do not promise guaranteed results.
Use cosmetic language only.
Tone should be premium, clear, reassuring and motivating.

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

    const content = response.output_text

    return Response.json(JSON.parse(content))
  } catch (error) {
    console.error(error)

    return Response.json(
      { error: 'Skin analysis failed' },
      { status: 500 }
    )
  }
}
