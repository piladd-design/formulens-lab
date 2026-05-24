import { NextResponse } from 'next/server'

export async function POST(req) {
  try {
    const { inci, language } = await req.json()

    const prompts = {
      EN: `
You are a professional cosmetic chemist.

Analyze this INCI list:
${inci}

Return ONLY valid JSON.

{
  "formulaScore": 85,
  "hydration": 90,
  "barrierSupport": 80,
  "antiAging": 75,
  "acneSafety": 85,
  "irritationRisk": 10,

  "keyBenefits": [
    "Deep hydration",
    "Skin barrier support",
    "Soothing effect",
    "Improvement of skin tone"
  ],

  "keyIngredients": [
    {
      "name": "Glycerin",
      "description": "A humectant that attracts moisture to the skin"
    }
  ],

  "potentialConcerns": [
    "None significant; very low irritation risk"
  ],

  "bestFor": [
    "Dry skin",
    "Sensitive skin",
    "Dehydrated skin",
    "Aging skin"
  ],

  "professionalConclusion":
    "This formula provides strong hydration and barrier support with a low irritation profile."
}
`,

      DE: `
Du bist professioneller Kosmetikchemiker.

Analysiere diese INCI-Liste:
${inci}

Antworte NUR mit gültigem JSON auf DEUTSCH.

{
  "formulaScore": 85,
  "hydration": 90,
  "barrierSupport": 80,
  "antiAging": 75,
  "acneSafety": 85,
  "irritationRisk": 10,

  "keyBenefits": [
    "Tiefe Feuchtigkeitsversorgung",
    "Unterstützung der Hautbarriere",
    "Beruhigende Wirkung",
    "Verbesserung des Hauttons"
  ],

  "keyIngredients": [
    {
      "name": "Glycerin",
      "description": "Ein Feuchtigkeitsspender, der Wasser in der Haut bindet"
    }
  ],

  "potentialConcerns": [
    "Keine wesentlichen Risiken; sehr geringes Reizpotenzial"
  ],

  "bestFor": [
    "Trockene Haut",
    "Empfindliche Haut",
    "Dehydrierte Haut",
    "Reife Haut"
  ],

  "professionalConclusion":
    "Die Formel bietet intensive Feuchtigkeitspflege und stärkt die Hautbarriere bei geringem Reizpotenzial."
}
`,

      RU: `
Ты профессиональный косметический химик.

Проанализируй этот INCI-состав:
${inci}

Отвечай ТОЛЬКО валидным JSON на РУССКОМ языке.

{
  "formulaScore": 85,
  "hydration": 90,
  "barrierSupport": 80,
  "antiAging": 75,
  "acneSafety": 85,
  "irritationRisk": 10,

  "keyBenefits": [
    "Глубокое увлажнение",
    "Поддержка кожного барьера",
    "Успокаивающий эффект",
    "Улучшение тона кожи"
  ],

  "keyIngredients": [
    {
      "name": "Глицерин",
      "description": "Увлажняющий компонент, притягивающий влагу к коже"
    }
  ],

  "potentialConcerns": [
    "Существенных рисков не обнаружено; очень низкий риск раздражения"
  ],

  "bestFor": [
    "Сухая кожа",
    "Чувствительная кожа",
    "Обезвоженная кожа",
    "Возрастная кожа"
  ],

  "professionalConclusion":
    "Формула обеспечивает интенсивное увлажнение и поддержку кожного барьера при минимальном риске раздражения."
}
`,
    }

    const response = await fetch(
      'https://api.openai.com/v1/chat/completions',
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',

          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },

        body: JSON.stringify({
          model: 'gpt-4.1-mini',

          messages: [
            {
              role: 'user',
              content: prompts[language] || prompts.EN,
            },
          ],

          temperature: 0.7,
        }),
      }
    )

    const data = await response.json()

    const text =
      data.choices?.[0]?.message?.content || '{}'

    const cleaned = text
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim()

    const parsed = JSON.parse(cleaned)

    return NextResponse.json({
      success: true,
      data: parsed,
    })
  } catch (error) {
    console.log(error)

    return NextResponse.json({
      success: false,
      error: 'Analysis failed',
    })
  }
}
