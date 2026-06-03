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

CORE LOGIC:
Do NOT search by similar product names.
Search by product FUNCTION in protocol.

Think in this order:
1. What category is the missing product?
2. What protocol step does it close?
3. What cosmetic function does it perform?
4. What Summecosmetics product line can cover this function?
5. What is preserved and what is lost with the alternative?

VERY IMPORTANT:
Do not offer the same product under a different synonym as an alternative.

Examples:
- NICELY Toner, NICELY Tonic, NICELY Mist, NICELY Soft Lotion direction = same functional product family.
If NICELY toner is missing, do NOT recommend NICELY mist/toner as the main alternative.
- GLACIAR Toner, GLACIAR Mist, GLACIAR Soft Lotion direction = same functional product family.
- ESSENTIAL, ECC and Essential Care Concept may refer to the same universal preparation family.

If a toner / mist / lotion is unavailable, choose another line that can close the same protocol step.

Known Summecosmetics line logic:

ESSENTIAL / ECC:
universal preparation, cleansing, mist, toner direction, pH comfort, basic soothing, universal protocol support.

NICELY:
sensitive skin, redness, comfort, barrier support, delicate cleansing, calming hydration.
Best for reactive and sensitive skin.

GLACIAR:
hydration, dehydration, comfort, moisture reservoir, soft lotion / toner direction, hydration cream, hydration serum direction.
Best for dehydration and comfort support.

BALANCE:
sebum regulation, oily skin, pores, comedones, acne-prone skin, clarifying care.
Best for seborrhea, pores and inflammatory tendency.

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

TONER / MIST REPLACEMENT LOGIC:

If missing product is NICELY toner / tonic / mist / lotion:
Main alternatives should normally be:
1. GLACIAR Soft Lotion / Toner direction
2. ESSENTIAL / ECC Mist or Toner direction

Reason:
NICELY toner function = sensitive skin comfort + barrier support + calming preparation.
GLACIAR covers comfort + hydration.
ESSENTIAL / ECC covers universal preparation + basic soothing.

Do NOT recommend NICELY toner/mist/lotion as its own replacement.

If missing product is GLACIAR toner / mist / soft lotion:
Main alternatives should normally be:
1. ESSENTIAL / ECC Mist or Toner direction
2. NICELY Toner / Mist direction if sensitivity or redness is present

If missing product is ESSENTIAL / ECC mist / toner:
Main alternatives should normally be:
1. GLACIAR Soft Lotion / Toner direction for hydration
2. NICELY Toner / Mist direction for sensitivity

If missing product is BALANCE toner / lotion:
Main alternatives may close the toning step, but explain that seboregulation may be reduced.
Use ESSENTIAL / ECC or GLACIAR depending on skin comfort.
Do not claim full seboregulating equivalence unless BALANCE product is available.

Return ONLY valid JSON with this exact structure:

{
  "title": "",
  "missingProduct": "",
  "productRole": "",
  "mainAlternative": {
    "name": "",
    "line": "",
    "match": 0,
    "why": "",
    "howToUse": "",
    "limitations": ""
  },
  "otherAlternatives": [
    {
      "name": "",
      "line": "",
      "match": 0,
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
Explain the role by function, not by brand name.
Example:
"toning / mist step for calming, comfort and barrier support"

mainAlternative:
Give the best logical replacement from a DIFFERENT functional product family when the missing product is unavailable.
Do not recommend the same product under a different synonym.

match:
Compatibility score from 0 to 100.
100 = almost identical functional coverage.
70-90 = good functional replacement.
40-69 = partial replacement.
Below 40 = only emergency / weak replacement.

otherAlternatives:
Give 2-3 additional alternatives if useful.
Each alternative must include match.

protocolAdjustment:
Explain how the procedure or homecare should be adjusted.

caution:
Explain what is not identical.
Use calm professional wording.
Do not write dramatic or medical warnings.
Avoid words like "doctor" unless absolutely necessary.
Do not write "Доктор рекомендует".
Use "косметолог рекомендует" in Russian.

clientExplanation:
Write a short message the cosmetologist can say/send to the client.
Use soft professional wording.
For Russian, use "косметолог", not "доктор".

Important:
Do not invent exact product names unless they are clearly likely from Summecosmetics lines.
If unsure, use product direction instead of fake exact names.
Examples:
"GLACIAR Soft Lotion / Toner direction"
"ESSENTIAL / ECC Mist or Toner direction"
"NICELY calming toner direction"

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
