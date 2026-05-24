import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req) {
  try {
    const body = await req.json()

    const inci = body.inci
    const language = body.language || 'EN'

    if (!inci) {
      return Response.json({
        success: false,
        message: 'No INCI list provided.',
      })
    }

    const prompts = {
      EN: `
You are a professional cosmetic formulation analyst.

Analyze the cosmetic INCI list professionally and clearly.

IMPORTANT:
- ALL output MUST be in ENGLISH.
- Use simple clean formatting.
- No markdown stars (**).
- Keep professional luxury skincare tone.
- Short concise sections.

Return EXACTLY in this structure:

FORMULA SCORE:
[number from 1-100]

HYDRATION:
[number]

BARRIER SUPPORT:
[number]

ANTI-AGING:
[number]

ACNE SAFE:
[number]

IRRITATION RISK:
[number]

KEY BENEFITS:
- item
- item
- item

KEY INGREDIENTS:
- ingredient: explanation
- ingredient: explanation
- ingredient: explanation

POTENTIAL CONCERNS:
- item
- item

BEST FOR:
- item
- item
- item

PROFESSIONAL CONCLUSION:
short professional conclusion
`,

      DE: `
Sie sind ein professioneller Experte für kosmetische Formulierungen.

Analysieren Sie die kosmetische INCI-Liste professionell und klar.

WICHTIG:
- Die GESAMTE Ausgabe MUSS auf DEUTSCH sein.
- Keine englischen Wörter.
- Kein Markdown.
- Professioneller Premium-Hautpflege-Stil.
- Kurze strukturierte Abschnitte.

Antworten Sie GENAU in dieser Struktur:

FORMULA SCORE:
[Zahl von 1-100]

HYDRATION:
[Zahl]

BARRIER SUPPORT:
[Zahl]

ANTI-AGING:
[Zahl]

ACNE SAFE:
[Zahl]

IRRITATION RISK:
[Zahl]

KEY BENEFITS:
- Punkt
- Punkt
- Punkt

KEY INGREDIENTS:
- Inhaltsstoff: Erklärung
- Inhaltsstoff: Erklärung
- Inhaltsstoff: Erklärung

POTENTIAL CONCERNS:
- Punkt
- Punkt

BEST FOR:
- Punkt
- Punkt
- Punkt

PROFESSIONAL CONCLUSION:
kurzes professionelles Fazit

WICHTIG:
Auch die Abschnittsinhalte müssen vollständig auf Deutsch sein.
`,

      RU: `
Вы профессиональный эксперт по косметическим формулам.

Проанализируйте косметический INCI-состав профессионально и понятно.

ВАЖНО:
- ВЕСЬ ответ должен быть ТОЛЬКО на РУССКОМ языке.
- Никаких английских слов.
- Без markdown.
- Профессиональный премиальный стиль.
- Краткие структурированные блоки.

Верните ответ СТРОГО в этой структуре:

FORMULA SCORE:
[число от 1-100]

HYDRATION:
[число]

BARRIER SUPPORT:
[число]

ANTI-AGING:
[число]

ACNE SAFE:
[число]

IRRITATION RISK:
[число]

KEY BENEFITS:
- пункт
- пункт
- пункт

KEY INGREDIENTS:
- ингредиент: описание
- ингредиент: описание
- ингредиент: описание

POTENTIAL CONCERNS:
- пункт
- пункт

BEST FOR:
- пункт
- пункт
- пункт

PROFESSIONAL CONCLUSION:
краткий профессиональный вывод

ВАЖНО:
Даже содержимое списков и объяснений должно быть полностью на русском языке.
`,
    }

    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.7,
      messages: [
        {
          role: 'system',
          content: prompts[language],
        },
        {
          role: 'user',
          content: `Analyze this cosmetic INCI list:\n\n${inci}`,
        },
      ],
    })

    return Response.json({
      success: true,
      message: completion.choices[0].message.content,
    })
  } catch (error) {
    return Response.json({
      success: false,
      message: 'Analysis service is currently unavailable.',
      error: error.message,
    })
  }
}
