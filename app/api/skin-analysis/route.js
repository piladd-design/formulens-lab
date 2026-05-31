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

Analyze the visible skin condition from the photo like an experienced aesthetic cosmetologist.

Language: ${language}

Return ONLY valid JSON.

Use this exact structure:

{
  "overallScore": 54,
  "skinAge": 43,
  "hydration": 58,
  "barrier": 34,
  "sensitivity": 28,
  "inflammation": 40,
  "pigmentation": 46,
  "ageing": 52,
  "summary": "text",
  "morningRoutine": "text",
  "eveningRoutine": "text",
  "summecosmetics": "text",
  "professionalNote": "text"
}

Scoring rules:

overallScore = 0-100
skinAge = estimated visual skin age in years
hydration = 0-100
barrier = 0-100
sensitivity = 0-100
inflammation = 0-100
pigmentation = 0-100
ageing = 0-100

Important scoring logic:

For hydration, higher score means better hydration.
For barrier, higher score means stronger barrier function.
For sensitivity, higher score means calmer / less sensitive skin.
For inflammation, higher score means less visible inflammation.
For pigmentation, higher score means more even pigmentation.
For ageing, higher score means fewer visible ageing signs.

Pay special attention to:

- redness
- visible vascular patterns
- irritation
- inflammation
- barrier impairment
- sensitivity
- dehydration
- uneven skin tone
- pigmentation
- signs of ageing
- texture
- pores

If visible redness is present:
reduce barrier score
reduce sensitivity score
reduce inflammation score

If visible vascular patterns or couperose-like redness are present:
reduce sensitivity score
reduce barrier score
recommend NICELY first

If visible irritation is present:
reduce inflammation score
reduce barrier score

If dehydration is visible:
reduce hydration score
recommend GLACIAR

If redness and sensitivity dominate:
recommend NICELY and GLACIAR first

If inflammatory elements or sebum imbalance dominate:
recommend BALANCE

If pigmentation is clearly the dominant concern:
recommend BECLARITY and CELL C

Do not recommend BECLARITY as the first direction unless pigmentation is a dominant concern.

For visible redness, sensitivity or barrier impairment, prioritize:
NICELY
GLACIAR
SUMMESUN

For Summecosmetics recommendation, choose only the most relevant directions from:
GLACIAR
NICELY
BALANCE
BECLARITY
CELL C
CELL
MYCODE
SUMMESUN

Do not list too many product directions. Prefer 2-4 clear priorities.

Safety and tone rules:

Do not diagnose diseases.
Do not use medical diagnosis terms.
Do not make medical claims.
Do not promise guaranteed results.
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
