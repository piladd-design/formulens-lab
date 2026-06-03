import OpenAI from 'openai'

import {
  findProductByName,
  getAlternativeCandidates,
} from '../../../lib/product-selector.js'

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

function buildProductContext(product) {
  if (!product) {
    return 'Product was not found in FORMULENS product database.'
  }

  return `
Detected product from FORMULENS database:

ID: ${product.id}
Name: ${product.name}
Line: ${product.line}
Category: ${product.category}
Step: ${product.step}
Professional: ${product.professional ? 'yes' : 'no'}
Retail: ${product.retail ? 'yes' : 'no'}

Goals:
${(product.goals || []).join(', ')}

Concerns:
${(product.concerns || []).join(', ')}
`
}

function buildAlternativesContext(alternatives = []) {
  if (!alternatives.length) {
    return 'No preselected alternatives were found in FORMULENS product database.'
  }

  return alternatives
    .map(
      (item, index) => `
Alternative ${index + 1}

ID: ${item.id}
Name: ${item.name}
Line: ${item.line}
Category: ${item.category}
Step: ${item.step}
Match: ${item.match}
Professional: ${item.professional ? 'yes' : 'no'}
Retail: ${item.retail ? 'yes' : 'no'}

Goals:
${(item.goals || []).join(', ')}

Concerns:
${(item.concerns || []).join(', ')}
`
    )
    .join('\n')
}

export async function POST(req) {
  try {
    const { product = '', lang = 'DE', context = '' } = await req.json()

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

    const sourceProduct = findProductByName(product)

    const alternatives = sourceProduct
      ? getAlternativeCandidates(sourceProduct, 5)
      : []

    const productContext = buildProductContext(sourceProduct)
    const alternativesContext = buildAlternativesContext(alternatives)

    const response = await client.responses.create({
      model: 'gpt-4.1-mini',
      input: `
You are FORMULENS LAB AI Product Alternative Finder.

You help professional cosmetologists find safe and logical cosmetic alternatives when a product is unavailable.

Language: ${language}

Unavailable product entered by user:
${product}

Additional context:
${context || 'not provided'}

CATALOG PRODUCT DATA:

${productContext}

PRESELECTED ALTERNATIVES FROM FORMULENS DATABASE:

${alternativesContext}

IMPORTANT:
This is professional cosmetic decision support.
This is NOT medical advice.
Do not recommend medication or invasive procedures.

CORE LOGIC:
Use the FORMULENS product database first.
The database alternatives are preselected by category, protocol step, goals and concerns.
Prefer database alternatives when available.
Do not invent products when database alternatives are available.

Do NOT recommend the original product again.
Do NOT recommend the same product under another synonym.
Do NOT recommend the same functional family as an alternative.

Examples:
- NICELY Toner, NICELY Tonic, NICELY Mist, NICELY Sweet Toner are the same functional product family.
- GLACIAR Toner, GLACIAR Mist, GLACIAR Soft Lotion are the same functional product family.
- CELL Activator Serum, CELL serum, CELL Activator Nourishing Anti-Ageing Serum are the same product family.
- ESSENTIAL, ECC and Essential Care Concept may refer to the same universal preparation family.

Think in this order:
1. What category is the missing product?
2. What protocol step does it close?
3. What cosmetic function does it perform?
4. Which database alternative best covers that function?
5. What is preserved and what is reduced with the replacement?

Known Summecosmetics line logic:

ESSENTIAL / ECC:
universal preparation, cleansing, mist, toner direction, pH comfort, basic soothing, universal protocol support.

NICELY:
sensitive skin, redness, comfort, barrier support, delicate cleansing, calming hydration.

GLACIAR:
hydration, dehydration, comfort, moisture reservoir, soft lotion / toner direction, hydration cream, hydration serum direction.

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
Use the detected database product name if available.
If not found, repeat the user's unavailable product.

productRole:
Explain the product role by function, not only by brand name.

mainAlternative:
Use the best preselected database alternative when available.
Use its real product name and line.
Use its match score.

otherAlternatives:
Use remaining preselected database alternatives when available.
Each alternative must include match score.

match:
Use database match score when available.
If product was not found in database, estimate compatibility:
100 = almost identical functional coverage.
70-90 = good functional replacement.
40-69 = partial replacement.
Below 40 = only emergency / weak replacement.

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

Language rule:
All text fields must be strictly in ${language}.
Use English only for brand and product line names.

Return ONLY JSON.
No markdown.
No extra text.
      `,
    })

    const result = safeJsonParse(response.output_text)

    return Response.json({
      result,
      debug: {
        foundProduct: sourceProduct
          ? {
              id: sourceProduct.id,
              name: sourceProduct.name,
              line: sourceProduct.line,
              category: sourceProduct.category,
              step: sourceProduct.step,
            }
          : null,
        alternatives: alternatives.map((item) => ({
          id: item.id,
          name: item.name,
          line: item.line,
          category: item.category,
          step: item.step,
          match: item.match,
        })),
      },
    })
  } catch (error) {
    console.error(error)

    return Response.json(
      { error: 'Product alternative search failed' },
      { status: 500 }
    )
  }
}
