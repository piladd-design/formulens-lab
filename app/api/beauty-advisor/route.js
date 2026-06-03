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
Explain when the cosmetologist should stop treatment or refer the client to a physician.
Mention physician only if there are warning signs such as severe swelling, blistering, open wounds, strong pain, allergic reaction, infection signs, or symptoms outside normal cosmetic reaction.

clientMessage:
Write a short message the cosmetologist can say/send to the client.

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
