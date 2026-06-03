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

function clamp(value, min = 0, max = 100) {
  const number = Number(value || 0)
  return Math.min(Math.max(number, min), max)
}

function hasAcneWords(analysis = {}) {
  const text = [
    analysis.summary,
    analysis.professionalNote,
    analysis.skinType,
    ...(analysis.priorities || []),
  ]
    .join(' ')
    .toLowerCase()

  return [
    'acne',
    'akne',
    'entzündung',
    'entzündungen',
    'inflammation',
    'inflamed',
    'pimple',
    'pimples',
    'papules',
    'pustules',
    'comedones',
    'комедон',
    'комедоны',
    'акне',
    'воспал',
    'высып',
    'прыщ',
    'прыщи',
    'папул',
    'пустул',
    'post-acne',
    'post acne',
    'постакне',
  ].some((word) => text.includes(word))
}

function correctHomecareAnalysis(rawAnalysis = {}) {
  const analysis = {
    ...rawAnalysis,
    overallScore: clamp(rawAnalysis.overallScore),
    hydration: clamp(rawAnalysis.hydration),
    pigmentation: clamp(rawAnalysis.pigmentation),
    wrinkles: clamp(rawAnalysis.wrinkles),
    acne: clamp(rawAnalysis.acne),
    barrier: clamp(rawAnalysis.barrier, 0, 100),
    texture: clamp(rawAnalysis.texture),
    sebum: clamp(rawAnalysis.sebum),
    aging: clamp(rawAnalysis.aging),
    firmness: clamp(rawAnalysis.firmness),
    priorities: Array.isArray(rawAnalysis.priorities)
      ? rawAnalysis.priorities
      : [],
  }

  const acneMentioned = hasAcneWords(analysis)

  if (acneMentioned && analysis.acne < 55) {
    analysis.acne = 70
  }

  if (acneMentioned && analysis.texture >= 45 && analysis.acne < 65) {
    analysis.acne = 65
  }

  if (acneMentioned && analysis.barrier <= 60 && analysis.acne < 65) {
    analysis.acne = 65
  }

  if (analysis.acne >= 55 && analysis.barrier > 70) {
    analysis.barrier = 55
  }

  if (analysis.acne >= 55 && analysis.texture < 45) {
    analysis.texture = 55
  }

  if (analysis.acne >= 55 && analysis.overallScore > 55) {
    analysis.overallScore = 40
  }

  if (analysis.acne >= 70 && analysis.overallScore > 45) {
    analysis.overallScore = 38
  }

  if (analysis.acne >= 55) {
    const required = [
      'Воспалительные элементы',
      'Поддержка барьера',
      'Контроль себума',
    ]

    required.forEach((item) => {
      if (!analysis.priorities.includes(item)) {
        analysis.priorities.push(item)
      }
    })

    analysis.summary =
      analysis.summary ||
      'Кожа показывает признаки воспалительных элементов, повышенной реактивности и нарушения баланса.'

    analysis.professionalNote =
      analysis.professionalNote ||
      'Приоритет: мягкое очищение, контроль себума, поддержка кожного барьера и ежедневная SPF-защита.'
  }

  return analysis
}

function getProduct(name, line, step, purpose = '') {
  return { name, line, step, purpose }
}

function buildHomecareProtocol(analysis) {
  const acne = Number(analysis.acne || 0)
  const hydration = Number(analysis.hydration || 0)
  const pigmentation = Number(analysis.pigmentation || 0)
  const barrier = Number(analysis.barrier || 100)
  const aging = Number(analysis.aging || 0)
  const firmness = Number(analysis.firmness || 100)

  let mainLine = 'GLACIAR'
  let secondaryLine = null

  if (acne >= 55) {
    mainLine = 'BALANCE'
  } else if (aging >= 60 || firmness <= 55) {
    mainLine = 'MYCODE'
  } else if (pigmentation >= 55) {
    mainLine = 'BECLARITY'
  } else if (barrier <= 55) {
    mainLine = 'NICELY'
  } else {
    mainLine = 'GLACIAR'
  }

  if (mainLine !== 'NICELY' && barrier <= 65) {
    secondaryLine = 'NICELY'
  } else if (mainLine !== 'GLACIAR' && hydration <= 60) {
    secondaryLine = 'GLACIAR'
  } else if (mainLine !== 'BECLARITY' && pigmentation >= 45) {
    secondaryLine = 'BECLARITY'
  }

  const protocols = {
    GLACIAR: {
      concern: 'Обезвоженность и недостаток комфорта кожи.',
      morning: [
        getProduct('GLACIAR Cleansing Milk', 'GLACIAR', 'Очищение'),
        getProduct('GLACIAR Soft Lotion', 'GLACIAR', 'Тонизация'),
        getProduct('Hydraluronic Serum Gel', 'GLACIAR', 'Сыворотка'),
        getProduct('GLACIAR Hydration Cream', 'GLACIAR', 'Крем'),
        getProduct('SUMMESUN SPF50+ Sensitive Skin', 'SUMMESUN', 'SPF'),
      ],
      evening: [
        getProduct('GLACIAR Cleansing Milk', 'GLACIAR', 'Очищение'),
        getProduct('GLACIAR Soft Lotion', 'GLACIAR', 'Тонизация'),
        getProduct('Hydro Repairer Serum', 'GLACIAR', 'Сыворотка'),
        getProduct('GLACIAR Hydration Cream', 'GLACIAR', 'Крем'),
      ],
      extra: [],
    },

    NICELY: {
      concern: 'Чувствительность, покраснение и поддержка барьера.',
      morning: [
        getProduct('NICELY Gentle Cleanser', 'NICELY', 'Очищение'),
        getProduct('NICELY Sweet Toner', 'NICELY', 'Тонизация'),
        getProduct('NICELY Smooth Final Cream', 'NICELY', 'Крем'),
        getProduct('SUMMESUN SPF50+ Sensitive Skin', 'SUMMESUN', 'SPF'),
      ],
      evening: [
        getProduct('NICELY Gentle Cleanser', 'NICELY', 'Очищение'),
        getProduct('NICELY Sweet Toner', 'NICELY', 'Тонизация'),
        getProduct('NICELY The Nourisher', 'NICELY', 'Питание'),
      ],
      extra: [],
    },

    BALANCE: {
      concern: 'Акне, воспалительные элементы, себум и расширенные поры.',
      morning: [
        getProduct('BALANCE Cleanning Mousse', 'BALANCE', 'Очищение'),
        getProduct('BALANCE Balancing Lotion', 'BALANCE', 'Тонизация'),
        getProduct('BALANCE Pure Regulator Serum Gel', 'BALANCE', 'Сыворотка'),
        getProduct('BALANCE Hydro Balance Gel-Cream', 'BALANCE', 'Крем'),
        getProduct('SUMMESUN SPF50+ Sensitive Skin', 'SUMMESUN', 'SPF'),
      ],
      evening: [
        getProduct('BALANCE Cleanning Mousse', 'BALANCE', 'Очищение'),
        getProduct('BALANCE Balancing Lotion', 'BALANCE', 'Тонизация'),
        getProduct('BALANCE Pure Regulator Serum Gel', 'BALANCE', 'Сыворотка'),
        getProduct('BALANCE Hydro Balance Gel-Cream', 'BALANCE', 'Крем'),
      ],
      extra: [
        getProduct('BALANCE Drying Gel', 'BALANCE', 'Локально'),
      ],
    },

    BECLARITY: {
      concern: 'Пигментация, постакне и неровный тон кожи.',
      morning: [
        getProduct('BECLARITY Clarifying Cleanser', 'BECLARITY', 'Очищение'),
        getProduct('BECLARITY Blemish Corrector Serum', 'BECLARITY', 'Сыворотка'),
        getProduct('BECLARITY Blemish Controller Cream SPF50', 'BECLARITY', 'SPF'),
      ],
      evening: [
        getProduct('BECLARITY Clarifying Cleanser', 'BECLARITY', 'Очищение'),
        getProduct('BECLARITY Blemish Corrector Serum', 'BECLARITY', 'Сыворотка'),
        getProduct('BECLARITY Dark Spot Eraser', 'BECLARITY', 'Локальный уход'),
      ],
      extra: [],
    },

    MYCODE: {
      concern: 'Возрастные изменения, морщины и снижение упругости.',
      morning: [
        getProduct('ECC Remover Micellar Eyes & Face', 'ECC', 'Очищение'),
        getProduct('ECC Remover Mist', 'ECC', 'Тонизация'),
        getProduct(
          'MyCODE ADVANCED 05 Plumping Replenish Facial Serum',
          'MYCODE',
          'Сыворотка'
        ),
        getProduct(
          'MyCODE ADVANCED Plumping Redensifying Face Cream',
          'MYCODE',
          'Крем'
        ),
        getProduct('SUMMESUN SPF50+ Sensitive Skin', 'SUMMESUN', 'SPF'),
      ],
      evening: [
        getProduct('ECC Remover Micellar Eyes & Face', 'ECC', 'Очищение'),
        getProduct('ECC Remover Mist', 'ECC', 'Тонизация'),
        getProduct(
          'MyCODE ADVANCED 06 Firming Restructuring Facial Serum',
          'MYCODE',
          'Сыворотка'
        ),
        getProduct(
          'MyCODE ADVANCED Firming Restructuring Face Cream',
          'MYCODE',
          'Крем'
        ),
      ],
      extra: [],
    },
  }

  return {
    mainLine,
    mainProtocol: protocols[mainLine],
    secondaryLine,
    secondaryProtocol: secondaryLine ? protocols[secondaryLine] : null,
  }
}

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
You are FORMULENS LAB Home Care cosmetic skin analysis engine.

Language: ${language}

Analyze visible facial skin from the photo.
This is cosmetic analysis only, not medical diagnosis.

Return ONLY valid JSON with this exact structure:

{
  "overallScore": 0,
  "hydration": 0,
  "pigmentation": 0,
  "wrinkles": 0,
  "acne": 0,
  "barrier": 0,
  "texture": 0,
  "sebum": 0,
  "aging": 0,
  "firmness": 0,
  "skinType": "text",
  "summary": "text",
  "professionalNote": "text",
  "priorities": ["text", "text", "text"]
}

SCORING:
overallScore: 0 = very problematic cosmetic condition, 100 = very good cosmetic condition.
hydration: 0 = very dehydrated, 100 = very hydrated.
pigmentation: 0 = no visible pigmentation, 100 = strong pigmentation / post-acne marks / uneven tone.
wrinkles: 0 = no visible wrinkles, 100 = strong visible aging signs.
acne: 0 = no visible acne or inflammation, 100 = very severe acne-like cosmetic condition.
barrier: 0 = visibly weakened / irritated / reactive, 100 = stable.
texture: 0 = smooth, 100 = very uneven texture / pores / roughness / acne texture.
sebum: 0 = no visible oiliness, 100 = strong oiliness.
aging: 0 = no visible aging signs, 100 = strong visible aging signs.
firmness: 0 = low firmness / visible laxity, 100 = good firmness.

CRITICAL:
If inflammatory acne lesions, pimples, papules, pustules, comedones, red inflamed spots or many post-acne marks are visible, acne MUST NOT be 0.
If more than 5 visible inflammatory spots are present, acne MUST be at least 55.
If many red papules/pustules are visible across the cheek or chin, acne MUST be at least 70.
If visible neck folds, facial laxity, mature skin texture or deep lines are present, aging MUST be at least 60 or firmness MUST be 55 or lower.
If redness or irritation is visible, barrier should be lower.
If post-acne marks are visible, pigmentation should increase.

In summary, professionalNote and priorities:
- mention inflammatory elements when visible
- mention aging / firmness loss when visible
- avoid medical claims and avoid the word "treatment"

No markdown. No text outside JSON.
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

    const rawAnalysis = safeJsonParse(response.output_text)
    const analysis = correctHomecareAnalysis(rawAnalysis)
    const protocol = buildHomecareProtocol(analysis)

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
