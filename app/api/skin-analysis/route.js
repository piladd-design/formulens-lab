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
    const {
      image,
      lang = 'DE',
      age = '',
      concern = '',
      skinType = '',
      sensitivity = '',
    } = await req.json()

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
You are FORMULENS LAB professional cosmetic skin analysis engine.

Language: ${language}

Analyze the visible facial skin condition from the photo.
This is cosmetic analysis only, not medical diagnosis.

Client context:
Age: ${age || 'not provided'}
Main concern: ${concern || 'not provided'}
Skin type: ${skinType || 'not provided'}
Sensitivity: ${sensitivity || 'not provided'}

IMPORTANT SCORING LOGIC:

Return 7 professional parameters.

hydration:
0 = very dehydrated / dry-looking
100 = very well hydrated

barrier:
0 = visibly weakened / irritated / reactive barrier
100 = stable barrier

texture:
0 = very smooth texture
100 = very uneven texture / enlarged pores / roughness

pigmentation:
0 = no visible pigmentation
100 = very strong pigmentation / dark spots / melasma-like uneven tone

sebum:
0 = no visible oiliness
100 = strong oiliness / enlarged pores / sebaceous look

aging:
0 = no visible aging signs
100 = strong visible lines, wrinkles, laxity or mature skin signs

firmness:
0 = low firmness / visible laxity
100 = good firmness and elasticity

overallScore:
0 = very problematic cosmetic condition
100 = very good cosmetic condition

CRITICAL RULES:
If visible brown spots, sun spots, freckles, melasma-like patches or strong uneven tone are visible, pigmentation MUST be high.
Mild pigmentation: 35-55.
Clear multiple pigmentation spots: 60-75.
Strong visible pigmentation: 75-90.

If client age is above 40, do not underestimate aging signs.
If client age is above 50, aging and firmness must be evaluated more critically.

If redness or irritation is visible, barrier should be lower and sensitivity must be mentioned.

Return ONLY valid JSON with this exact structure:

{
  "overallScore": 0,
  "hydration": 0,
  "barrier": 0,
  "texture": 0,
  "pigmentation": 0,
  "sebum": 0,
  "aging": 0,
  "firmness": 0,

  "hydrationStatus": "text",
  "barrierStatus": "text",
  "textureStatus": "text",
  "pigmentationStatus": "text",
  "sebumStatus": "text",
  "agingStatus": "text",
  "firmnessStatus": "text",

  "overview": "text",
  "interpretation": "text",
  "strategy": "text",
  "homecare": "text",
  "recommendedLines": "text",
  "topPriorities": ["text", "text", "text"]
}

Recommended Summecosmetics logic:
NICELY = sensitivity, redness, barrier support.
GLACIAR = dehydration, moisture support.
BALANCE = sebum, pores, acne-prone or inflammatory tendency.
BECLARITY = pigmentation, dark spots, uneven tone.
CELL = regeneration, mature skin, loss of quality.
CELL C = glow, antioxidant support, uneven tone.
SUMMESUN = daily SPF, mandatory with pigmentation and anti-aging care.

No markdown.
No explanations outside JSON.
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
      { error: 'Skin analysis failed' },
      { status: 500 }
    )
  }
}
