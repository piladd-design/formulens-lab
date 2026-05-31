import OpenAI from 'openai'
import { getRecommendations } from '@/lib/recommendations'

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

This is NOT a medical diagnosis.
This is a cosmetic homecare analysis only.

Return ONLY valid JSON.

Use this exact structure:

{
  "overallScore": 54,
  "hydration": 58,
  "pigmentation": 46,
  "wrinkles": 52,
  "acne": 68,
  "skinType": "text",
  "recommendedLines": {
    "main": "BALANCE",
    "secondary": "GLACIAR",
    "spf": "SUMMESUN SPF50+"
  },
  "priorities": ["text", "text", "text"],
  "summary": "text",
  "morningRoutine": "text",
  "eveningRoutine": "text",
  "summecosmetics": "text",
  "professionalNote": "text"
}

Score logic:
overallScore: Higher score means better overall cosmetic skin condition.
hydration: Higher score means better hydration.
pigmentation: Higher score means more visible pigmentation, uneven tone, dark spots or post-inflammatory marks.
wrinkles: Higher score means more visible wrinkles, lines, texture changes or ageing signs.
acne: Higher score means more visible acne, redness, irritation, inflammatory elements, blemishes or reactive-looking skin.

Important:
If visible redness, irritation or inflammatory elements are present, increase acne score significantly.
If strong redness dominates the image, acne score should normally be above 70.
If severe visible irritation dominates the image, acne score should normally be above 80.
If uneven tone, dark spots or post-inflammatory marks are visible, increase pigmentation score.
If visible lines, wrinkles or ageing signs are present, increase wrinkles score.
If dryness, tight-looking skin or dullness is visible, reduce hydration score.

Recommended line logic:
BALANCE: acne, blemishes, excess sebum, enlarged pores or inflammatory elements.
NICELY: sensitivity, redness, reactive skin, irritation, couperose-like redness or weakened barrier.
GLACIAR: dehydration, dryness, tightness, dullness or lack of comfort.
BECLARITY: pigmentation, dark spots, post-inflammatory marks or uneven tone.
CELL: visible ageing, wrinkles, loss of density or mature skin signs.
CELL C: glow, antioxidant support, early ageing, uneven tone and mild pigmentation.
SUMMESUN SPF50+: always recommend as daily protection.

Do not diagnose diseases.
Do not use scary medical language.
Focus on cosmetic homecare and professional cosmetic support.

Tone:
Premium, clear, reassuring, motivating.

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
    const analysis = JSON.parse(content)

    const recommendations = getRecommendations(analysis, lang)

    return Response.json({
      analysis,
      recommendations,
    })
  } catch (error) {
    console.error(error)

    return Response.json(
      { error: 'Skin analysis failed' },
      { status: 500 }
    )
  }
}
