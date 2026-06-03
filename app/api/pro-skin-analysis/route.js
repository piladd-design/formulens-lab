import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req) {
  try {
    const {
      image,
      age,
      lang = 'DE',
    } = await req.json()

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
You are a PROFESSIONAL cosmetic skin analysis expert for FORMULENS LAB.

Language: ${language}

Client age: ${age || 'unknown'}

IMPORTANT:

This is NOT a medical diagnosis.

Evaluate only visible cosmetic skin characteristics.

Return ONLY valid JSON.

Structure:

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

  "topPriorities": [
    "",
    "",
    ""
  ],

  "overview": "",
  "interpretation": "",
  "strategy": "",
  "homecare": "",
  "recommendedLines": ""
}

SCORING RULES

overallScore:
100 = excellent cosmetic skin condition
0 = severely compromised skin condition

hydration:
100 = very well hydrated
0 = severe dehydration

barrier:
100 = excellent barrier
0 = severely weakened barrier

Reduce barrier score if visible:
- redness
- irritation
- inflammation
- reactive appearance
- dryness

texture:
Higher score =
more visible enlarged pores,
rough texture,
uneven surface,
acne marks,
textural irregularities

pigmentation:
Higher score =
more visible pigmentation,
dark spots,
sun damage,
post-inflammatory pigmentation,
uneven skin tone

If pigmentation dominates the image:
pigmentation should normally be above 80.

sebum:
Higher score =
more visible oiliness,
sebaceous activity,
shiny skin,
congested pores

aging:
Higher score =
more visible ageing signs,
wrinkles,
lines,
loss of density

firmness:
100 = excellent firmness
0 = severe loss of elasticity

TOP PRIORITIES

Return 3 most important priorities.

Examples:

- Barrier restoration
- Pigmentation correction
- Daily UV protection
- Hydration
- Sebum regulation
- Texture improvement
- Anti-ageing support
- Redness reduction

SUMMECOSMETICS LOGIC

NICELY:
redness,
sensitivity,
reactive skin,
barrier weakness

GLACIAR:
dehydration,
comfort,
hydration

BALANCE:
acne,
sebaceous activity,
congestion,
pores

BECLARITY:
pigmentation,
uneven tone,
dark spots

CELL:
ageing,
density,
mature skin

CELL C:
glow,
antioxidant support,
early ageing

Return only JSON.
No markdown.
No explanations.
No code blocks.
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

    return Response.json({
      analysis,
    })
  } catch (error) {
    console.error(error)

    return Response.json(
      {
        error: 'Professional skin analysis failed',
      },
      {
        status: 500,
      }
    )
  }
}
