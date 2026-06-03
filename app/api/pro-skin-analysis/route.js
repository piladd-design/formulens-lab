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

LANGUAGE RULE:
All text fields in JSON must be written strictly in ${language}.
If Russian is selected, write all descriptions in Russian only.
If German is selected, write all descriptions in German only.
If English is selected, write all descriptions in English only.
Use English only for brand names:
NICELY, GLACIAR, BALANCE, BECLARITY, CELL, CELL C, MYCODE, SUMMESUN.

IMPORTANT:
Analyze only what is clearly visible in the uploaded image.

Do NOT mention:
- forehead if forehead is not visible
- neck if neck is not visible
- full face if only one area is visible
- wrinkles in areas that are not clearly visible
- pigmentation if it is not clearly visible
- acne if only redness without visible lesions is present

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

SCORING SYSTEM:

For the 7 diagnostic parameters, use SEVERITY scores.

0 = no visible cosmetic issue
100 = very strong visible cosmetic issue

hydration =
severity of dehydration / dryness / dull lack of moisture.

barrier =
severity of barrier disturbance / redness / irritation / reactivity.

texture =
severity of texture irregularity, visible pores, roughness, acne marks.

pigmentation =
severity of visible pigmentation, dark spots, sun spots, melasma-like patches, uneven tone.

sebum =
severity of oiliness, shine, sebaceous congestion, oily pores.

aging =
severity of visible aging signs, lines, wrinkles, loss of density.

firmness =
severity of firmness loss / elasticity loss / laxity.

overallScore:
This is NOT severity.
overallScore is cosmetic condition quality:
100 = excellent visible cosmetic skin condition.
0 = strongly compromised cosmetic skin condition.

STATUS WORDING:

Because diagnostic parameters are severity scores:
- 0-25 = minimal visible concern
- 26-45 = mild concern
- 46-65 = noticeable concern
- 66-80 = pronounced concern
- 81-100 = strong / high priority concern

Do not overuse the word "moderate".
For firmness specifically:
- 0-25: minimal firmness loss
- 26-45: mild firmness loss
- 46-65: firmness loss
- 66-80: pronounced firmness loss
- 81-100: strong firmness loss

If language is Russian:
For firmnessStatus use:
- 0-25: "минимальное снижение упругости"
- 26-45: "лёгкое снижение упругости"
- 46-65: "потеря упругости"
- 66-80: "выраженная потеря упругости"
- 81-100: "сильная потеря упругости"

Do NOT write "умеренная потеря упругости" for firmness.

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

If age is above 60:
firmness loss may be age-consistent,
but still score the visible firmness loss according to severity.
Do not automatically reduce firmness severity just because it is age-consistent.

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

MYCODE:
lifting, firmness loss, wrinkles, plumping, mature skin protocols.

SUMMESUN:
daily SPF, especially with pigmentation, redness, anti-aging care, acids, vitamin C or retinol-like care.

LINE SELECTION RULES:

If firmness loss or lifting need is one of the top visual priorities:
recommendedLines must include MYCODE and CELL.
Use GLACIAR only if visible dehydration is also an important priority.

If aging signs are one of the top priorities:
recommendedLines should include CELL and MYCODE.

If pigmentation is one of the top priorities:
recommendedLines should include BECLARITY and SUMMESUN.
CELL C may be added for antioxidant support and glow.

If barrier disturbance or redness is one of the top priorities:
recommendedLines should include NICELY.
SUMMESUN may be added for daily protection.

If pores, sebum or congestion are one of the top priorities:
recommendedLines should include BALANCE.

If dehydration is one of the top priorities:
recommendedLines should include GLACIAR.

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
