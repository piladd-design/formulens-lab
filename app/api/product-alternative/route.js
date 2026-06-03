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
      product = '',
      lang = 'DE',
      context = '',
    } = await req.json()

    if (!product.trim()) {
      return Response.json(
        { error: 'Product name is required' },
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
      input: `
You are FORMULENS LAB AI Product Alternative Finder.

You help professional cosmetologists find safe and logical cosmetic alternatives when a product is unavailable.

Language: ${language}

Unavailable product:
${product}

Additional context:
${context || 'not provided'}

IMPORTANT:
This is professional cosmetic decision support.
This is NOT medical advice.
Do not recommend medication or invasive procedures.

Use only cosmetic logic:
- product category
- function in protocol
- skin goal
- skin condition
- line philosophy
- treatment step

Known Summecosmetics lines:

ECC:
universal preparation, cleansing, mist, peeling, final protection.

NICELY:
sensitive skin, redness, comfort, barrier support, delicate cleansing, calming hydration.

GLACIAR:
hydration, dehydration, comfort, moisture reservoir, soft lotion, hydration cream, hydration serum direction.

BALANCE:
sebum regulation, oily skin, pores, comedones, acne-prone skin, clarifying care.

BECLARITY:
pigmentation, dark spots, uneven tone, post-inflammatory marks, brightening support.

CELL:
regeneration, recovery, mature skin, skin quality, density support.

CELL C:
glow, antioxidant support, vitamin C direction, radiance, uneven tone.

MYCODE:
professional codes, targeted anti-age, firming, plumping, comforting, depigmenting, retinol-like protocols, lifting.

SUMMESUN:
daily SPF protection, post-peel protection, pigmentation protection, anti-age protection.

Return ONLY valid JSON with this exact structure:

{
  "title": "",
  "missingProduct": "",
  "productRole": "",
  "mainAlternative": {
    "name": "",
    "line": "",
    "why": "",
    "howToUse": "",
    "limitations": ""
  },
  "otherAlternatives": [
    {
      "name": "",
      "line": "",
      "why": ""
    }
  ],
  "protocolAdjustment": "",
  "caution": "",
  "clientExplanation": ""
}

Rules:

title:
Short title for the answer.

missingProduct:
Repeat the unavailable product name.

productRole:
Explain what role the missing product most likely has:
cleanser, toner, mist, serum, mask, cream, SPF, peel, local product, professional active, homecare product.

mainAlternative:
Give the best logical replacement.
If exact product is unknown, recommend a line + product type direction.
Example:
"NICELY calming toner / soft lotion direction"
or
"ECC Remover Mist"
or
"GLACIAR Soft Lotion"

otherAlternatives:
Give 2-3 additional alternatives if useful.

protocolAdjustment:
Explain how the procedure or homecare should be adjusted.

caution:
Explain what should not be replaced 1:1.
Mention if the alternative is functional, not identical.

clientExplanation:
Write a short message the cosmetologist can say/send to the client.

Important:
Do not invent exact product names unless they are clearly likely from Summecosmetics lines.
If unsure, use product direction instead of fake exact names.

Language rule:
All text fields must be strictly in ${language}.
Use English only for brand and product line names.

Return ONLY JSON.
No markdown.
No extra text.
      `,
    })

    const result = safeJsonParse(response.output_text)

    return Response.json({ result })
  } catch (error) {
    console.error(error)

    return Response.json(
      { error: 'Product alternative search failed' },
      { status: 500 }
    )
  }
}
