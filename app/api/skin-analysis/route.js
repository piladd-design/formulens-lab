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

Score interpretation:

overallScore:
Higher score means healthier overall skin condition.
Lower score means the skin needs more cosmetic homecare support.

hydration:
Higher score means better visible hydration.
Lower score means visible dehydration, dryness, tight-looking skin or dullness.

pigmentation:
Higher score means more visible pigmentation problems, uneven tone, dark spots or post-inflammatory marks.
Lower score means more even-looking tone.

wrinkles:
Higher score means more visible wrinkles, lines, texture changes or ageing signs.
Lower score means smoother-looking skin with fewer visible ageing signs.

acne:
Higher score means more visible acne, redness, irritation, inflammatory elements, blemishes or reactive-looking skin.
Lower score means calmer-looking skin with fewer visible inflammatory elements.

Important cosmetic logic:

If visible redness, irritation or inflammatory elements are present:
increase acne score significantly.

If strong redness dominates the image:
acne score should normally be above 70.

If severe visible irritation dominates:
acne score should normally be above 80.

If visible blemishes, acne-like elements or sebum imbalance are present:
increase acne score.

If uneven tone, pigmentation, dark spots or post-inflammatory marks are visible:
increase pigmentation score.

If visible lines, wrinkles, texture changes or ageing signs are present:
increase wrinkles score.

If dryness, tight-looking skin, dullness or dehydration is visible:
reduce hydration score.

If redness, irritation or sensitivity dominates:
recommend calming, barrier-supporting and hydrating homecare.

For visible redness or sensitivity:
recommend NICELY and GLACIAR first.

For visible blemishes, acne-like elements or sebum imbalance:
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
