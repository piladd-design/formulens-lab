import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

function safeJsonParse(text) {
  try {
    return JSON.parse(text)
  } catch {
    const cleaned = String(text)
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim()

    return JSON.parse(cleaned)
  }
}

export async function POST(req) {
  try {
    const { image, age, lang = 'DE' } = await req.json()

    if (!image) {
      return Response.json(
        { error: 'Image is required' },
        { status: 400 }
      )
    }

    const language =
      lang === 'RU'
        ? 'Russian'
        : lang === 'EN'
        ? 'English'
        : 'German'

    const response = await client.responses.create({
      model: 'gpt-4.1-mini',
      input: [
        {
          role: 'user',
          content: [
            {
              type: 'input_text',
              text: `
You are FORMULENS LAB PRO Skin Analysis Engine.

You are a professional cosmetic skin analysis assistant for cosmetologists.

Language: ${language}

Client age: ${age || 'unknown'}

This is NOT a medical diagnosis.
This is a cosmetic visual skin assessment only.

IMPORTANT:
Analyze only what is clearly visible in the uploaded image.

Do NOT mention:
- forehead if forehead is not visible
- neck if neck is not visible
- full face if only one area is visible
- wrinkles in areas that are not clearly visible
- pigmentation if it is not clearly visible
- acne if only redness without lesions is visible

Return ONLY valid JSON.
No markdown.
No explanations outside JSON.

Use this exact structure:

{
  "overallScore": 0,

  "hydration": 0,
  "hydrationStatus": "",

  "barrier": 0,
  "barrierStatus": "",

  "texture": 0,
  "textureStatus": "",

  "pigmentation": 0,
  "pigmentationStatus": "",

  "sebum": 0,
  "sebumStatus": "",

  "aging": 0,
  "agingStatus": "",

  "firmness": 0,
  "firmnessStatus": "",

  "topPriorities": ["", "", ""],

  "overview": "",
  "interpretation": "",
  "strategy": "",
  "homecare": "",
  "recommendedLines": ""
}

SCORING SYSTEM — VERY IMPORTANT:

For the 7 diagnostic parameters, use SEVERITY scores.

0 = no visible cosmetic issue
100 = very strong visible cosmetic issue

Therefore:

hydration =
severity of dehydration / dryness / dull lack of moisture.
0 = no visible dehydration.
100 = severe visible dryness or dehydration.

barrier =
severity of barrier disturbance / redness / irritation / reactivity.
0 = calm stable-looking skin.
100 = strongly compromised barrier with strong redness or irritation.

texture =
severity of texture irregularity, visible pores, roughness, acne marks.
0 = smooth texture.
100 = very uneven texture or very visible pores.

pigmentation =
severity of visible pigmentation, dark spots, sun spots, melasma-like patches, uneven tone.
0 = no visible pigmentation.
100 = very strong visible pigmentation.

sebum =
severity of oiliness, shine, sebaceous congestion, oily pores.
0 = no visible excess sebum.
100 = strong visible oiliness / congestion.

aging =
severity of visible aging signs, lines, wrinkles, loss of density.
0 = no visible aging signs.
100 = strong visible aging signs.

firmness =
severity of firmness loss / elasticity loss / laxity.
0 = no visible firmness loss.
100 = strong visible loss of firmness.

overallScore:
This is NOT severity.
overallScore is cosmetic condition quality:
100 = excellent visible cosmetic skin condition.
0 = strongly compromised cosmetic skin condition.

STATUS WORDING:

Because diagnostic parameters are severity scores:
- 0-25 = minimal / low visible concern
- 26-45 = mild concern
- 46-65 = moderate concern
- 66-80 = pronounced concern
- 81-100 = strong / high priority concern

Make status wording consistent with the score.

Examples:
barrier 75 = pronounced barrier disturbance / visible redness and reactivity.
barrier 30 = mild barrier concern.
firmness 65 = moderate firmness loss.
firmness 25 = minimal firmness loss.
pigmentation 80 = pronounced pigmentation.
pigmentation 20 = minimal pigmentation.

VISUAL ACCURACY RULES:

If strong redness dominates the visible image:
barrier should normally be 70-90.

If mild redness is visible:
barrier should normally be 35-60.

If visible brown pigmentation spots, sun spots or melasma-like patches dominate:
pigmentation should normally be 75-90.

If only very mild uneven tone is visible:
pigmentation should normally be 20-45.

If forehead is not visible:
do not mention forehead lines.

If eye area is not clearly visible:
do not mention eye wrinkles.

If jawline or lower face contour is not visible:
do not make strong claims about firmness loss.

If the image shows only one side/area of the face:
say that the assessment is based on the visible area only.

AGE RULES:

Use age as context, not as a replacement for visual analysis.

If age is above 40:
evaluate aging and firmness more carefully,
but do not invent wrinkles if they are not visible.

If age is below 35:
do not exaggerate aging unless clearly visible.

RECOMMENDED SUMMECOSMETICS LINES:

NICELY:
barrier disturbance, redness, sensitivity, reactive-looking skin.

GLACIAR:
dehydration, dryness, lack of comfort, moisture support.

BALANCE:
visible sebum, pores, blemishes, congestion, acne-prone look.

BECLARITY:
pigmentation, dark spots, uneven tone.

CELL:
aging signs, regeneration, mature skin, density support.

CELL C:
glow, antioxidant support, mild uneven tone, early aging support.

SUMMESUN:
daily SPF, especially with pigmentation, redness, anti-aging care, acids, vitamin C or retinol-like care.

Prioritize recommendedLines based on the highest visual priorities.

Return text in ${language}.
Return ONLY JSON.
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

    const analysis = safeJsonParse(response.output_text)

    return Response.json({ analysis })
  } catch (error) {
    console.error(error)

    return Response.json(
      { error: 'Professional skin analysis failed' },
      { status: 500 }
    )
  }
}
