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
      question = '',
      lang = 'DE',
      clientAge = '',
      skinContext = '',
    } = await req.json()

    if (!question.trim()) {
      return Response.json(
        { error: 'Question is required' },
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
You are FORMULENS LAB AI Beauty Advisor.

You support professional cosmetologists with cosmetic, non-medical decision support.

Language: ${language}

Question from cosmetologist:
${question}

Client age:
${clientAge || 'not provided'}

Additional skin context:
${skinContext || 'not provided'}

IMPORTANT:
This is not medical advice.
Do not diagnose diseases.
Do not prescribe medication.
Do not recommend invasive procedures.

Use a calm, professional, practical tone.
Do not create panic.
Do not use scary medical language.
Be practical, reassuring and clear.

Return ONLY valid JSON with this exact structure:

{
  "title": "",
  "situation": "",
  "immediateSteps": ["", "", ""],
  "avoid": ["", "", ""],
  "summecosmeticsLines": ["", "", ""],
  "professionalRecommendation": "",
  "whenToStop": "",
  "clientMessage": ""
}

Rules:

situation:
Explain what may be happening cosmetically.

immediateSteps:
Give practical safe steps for the cosmetologist.

avoid:
List what should be avoided temporarily.

summecosmeticsLines:
Recommend relevant Summecosmetics lines:
NICELY = sensitivity, redness, barrier support.
GLACIAR = dehydration, tightness, comfort.
BALANCE = sebum, acne-prone skin, inflammation tendency.
BECLARITY = pigmentation, post-inflammatory marks, uneven tone.
CELL = regeneration, mature skin, recovery support.
CELL C = glow, antioxidant support, uneven tone.
MYCODE = lifting, wrinkles, firmness loss, professional anti-age protocols.
SUMMESUN = daily SPF protection.

professionalRecommendation:
Give a concise professional recommendation.

whenToStop:
Use a soft professional wording.
Do not write dramatic phrases.
Do not overuse "doctor", "infection", "wounds", "blisters" unless the user clearly describes severe warning signs.

For Russian output, the meaning should be:
"Если реакция кожи выражена сильнее ожидаемой, сохраняется длительное время или вызывает сомнения, рекомендуется прекратить активное воздействие, сосредоточиться на восстановлении комфорта кожи и при необходимости рекомендовать клиенту дополнительную консультацию со специалистом."

For German output, use the same calm meaning:
If the skin reaction is stronger than expected, lasts longer than usual or raises concerns, active stimulation should be stopped, the focus should shift to restoring skin comfort, and if needed an additional professional consultation can be recommended.

For English output, use the same calm meaning:
If the skin reaction is stronger than expected, persists for longer than usual or raises concern, active stimulation should be stopped, the focus should shift to restoring skin comfort, and if needed an additional professional consultation can be recommended.

clientMessage:
Write a short message the cosmetologist can say/send to the client.
The message should sound calm, reassuring and professional.

Language rule:
All text fields must be strictly in ${language}.
Use English only for brand names.

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
      { error: 'Beauty advisor failed' },
      { status: 500 }
    )
  }
}
