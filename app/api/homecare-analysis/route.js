````js
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

function getProduct(name, line, step, purpose = '') {
  return {
    name,
    line,
    step,
    purpose,
  }
}

function buildHomecareProtocol(analysis) {
  const acne = Number(analysis.acne || 0)
  const hydration = Number(analysis.hydration || 0)
  const pigmentation = Number(analysis.pigmentation || 0)
  const barrier = Number(analysis.barrier || 100)
  const wrinkles = Number(analysis.wrinkles || 0)

  let mainLine = 'GLACIAR'
  let secondaryLine = null

  if (acne >= 45) {
    mainLine = 'BALANCE'
  } else if (pigmentation >= 50) {
    mainLine = 'BECLARITY'
  } else if (barrier <= 55) {
    mainLine = 'NICELY'
  } else if (wrinkles >= 50) {
    mainLine = 'MYCODE'
  } else if (hydration <= 55) {
    mainLine = 'GLACIAR'
  }

  if (mainLine !== 'NICELY' && barrier <= 65) {
    secondaryLine = 'NICELY'
  } else if (mainLine !== 'GLACIAR' && hydration <= 55) {
    secondaryLine = 'GLACIAR'
  } else if (
    mainLine !== 'BECLARITY' &&
    pigmentation >= 45
  ) {
    secondaryLine = 'BECLARITY'
  }

  const protocols = {
    GLACIAR: {
      concern:
        'Обезвоженность и недостаток комфорта кожи.',
      morning: [
        getProduct(
          'GLACIAR Cleansing Milk',
          'GLACIAR',
          'Очищение'
        ),
        getProduct(
          'GLACIAR Soft Lotion',
          'GLACIAR',
          'Тонизация'
        ),
        getProduct(
          'Hydraluronic Serum Gel',
          'GLACIAR',
          'Сыворотка'
        ),
        getProduct(
          'GLACIAR Hydration Cream',
          'GLACIAR',
          'Крем'
        ),
      ],
      evening: [
        getProduct(
          'GLACIAR Cleansing Milk',
          'GLACIAR',
          'Очищение'
        ),
        getProduct(
          'GLACIAR Soft Lotion',
          'GLACIAR',
          'Тонизация'
        ),
        getProduct(
          'Hydro Repairer Serum',
          'GLACIAR',
          'Сыворотка'
        ),
        getProduct(
          'GLACIAR Hydration Cream',
          'GLACIAR',
          'Крем'
        ),
      ],
      extra: [
        getProduct(
          'SUMMESUN SPF50+',
          'SUMMESUN',
          'Защита'
        ),
      ],
    },

    NICELY: {
      concern:
        'Чувствительность, покраснение и поддержка барьера.',
      morning: [
        getProduct(
          'NICELY Gentle Cleanser',
          'NICELY',
          'Очищение'
        ),
        getProduct(
          'NICELY Sweet Toner',
          'NICELY',
          'Тонизация'
        ),
        getProduct(
          'NICELY Smooth Final Cream',
          'NICELY',
          'Крем'
        ),
      ],
      evening: [
        getProduct(
          'NICELY Gentle Cleanser',
          'NICELY',
          'Очищение'
        ),
        getProduct(
          'NICELY Sweet Toner',
          'NICELY',
          'Тонизация'
        ),
        getProduct(
          'NICELY The Nourisher',
          'NICELY',
          'Питание'
        ),
      ],
      extra: [
        getProduct(
          'SUMMESUN SPF50+',
          'SUMMESUN',
          'Защита'
        ),
      ],
    },

    BALANCE: {
      concern:
        'Акне, воспаления, себум и расширенные поры.',
      morning: [
        getProduct(
          'BALANCE Cleanning Mousse',
          'BALANCE',
          'Очищение'
        ),
        getProduct(
          'BALANCE Balancing Lotion',
          'BALANCE',
          'Тонизация'
        ),
        getProduct(
          'BALANCE Pure Regulator Serum Gel',
          'BALANCE',
          'Сыворотка'
        ),
        getProduct(
          'BALANCE Hydro Balance Gel Cream',
          'BALANCE',
          'Крем'
        ),
      ],
      evening: [
        getProduct(
          'BALANCE Cleanning Mousse',
          'BALANCE',
          'Очищение'
        ),
        getProduct(
          'BALANCE Balancing Lotion',
          'BALANCE',
          'Тонизация'
        ),
        getProduct(
          'BALANCE Pure Regulator Serum Gel',
          'BALANCE',
          'Сыворотка'
        ),
      ],
      extra: [
        getProduct(
          'BALANCE Drying Gel',
          'BALANCE',
          'Локально'
        ),
      ],
    },

    BECLARITY: {
      concern:
        'Пигментация, постакне и неровный тон кожи.',
      morning: [
        getProduct(
          'BECLARITY Clarifying Cleanser',
          'BECLARITY',
          'Очищение'
        ),
        getProduct(
          'BECLARITY Blemish Corrector Serum',
          'BECLARITY',
          'Сыворотка'
        ),
      ],
      evening: [
        getProduct(
          'BECLARITY Clarifying Cleanser',
          'BECLARITY',
          'Очищение'
        ),
        getProduct(
          'BECLARITY Dark Spot Eraser',
          'BECLARITY',
          'Локальный уход'
        ),
      ],
      extra: [
        getProduct(
          'SUMMESUN SPF50+',
          'SUMMESUN',
          'Защита'
        ),
      ],
    },

    MYCODE: {
      concern:
        'Возрастные изменения и морщины.',
      morning: [
        getProduct(
          'MyCODE ADVANCED 05',
          'MYCODE',
          'Сыворотка'
        ),
      ],
      evening: [
        getProduct(
          'MyCODE ADVANCED 06',
          'MYCODE',
          'Сыворотка'
        ),
      ],
      extra: [
        getProduct(
          'SUMMESUN SPF50+',
          'SUMMESUN',
          'Защита'
        ),
      ],
    },
  }

  return {
    mainLine,
    mainProtocol: protocols[mainLine],
    secondaryLine,
    secondaryProtocol: secondaryLine
      ? protocols[secondaryLine]
      : null,
  }
}

export async function POST(req) {
  try {
    const { image } = await req.json()

    if (!image) {
      return Response.json(
        { error: 'Image is required' },
        { status: 400 }
      )
    }

    const response = await client.responses.create({
      model: 'gpt-4.1-mini',
      input: [
        {
          role: 'user',
          content: [
            {
              type: 'input_text',
              text: `
Analyze facial skin from photo.

Return ONLY JSON:

{
 "overallScore":0,
 "hydration":0,
 "pigmentation":0,
 "wrinkles":0,
 "acne":0,
 "barrier":0,
 "texture":0,
 "sebum":0,
 "aging":0,
 "firmness":0,
 "skinType":"",
 "summary":"",
 "professionalNote":"",
 "priorities":["","",""]
}

IMPORTANT:
If inflammatory acne lesions are visible,
acne MUST NOT be 0.
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

    const analysis = safeJsonParse(
      response.output_text
    )

    const protocol =
      buildHomecareProtocol(analysis)

    return Response.json({
      analysis,
      protocol,
    })
  } catch (error) {
    console.error(error)

    return Response.json(
      { error: 'Homecare analysis failed' },
      { status: 500 }
    )
  }
}
````
