import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req) {
  try {
    const { formula, lang = 'DE' } = await req.json()

    if (!formula || !formula.trim()) {
      return Response.json(
        { error: 'Formula is required' },
        { status: 400 }
      )
    }

    const language =
      lang === 'RU' ? 'Russian' : lang === 'EN' ? 'English' : 'German'

    const response = await client.responses.create({
      model: 'gpt-4.1-mini',
      input: `
You are a professional cosmetic formulation assistant for FORMULENS LAB.

Analyze the following INCI formula for a homecare user.

Language: ${language}

Important formatting rules:
Return plain text.
Do not use markdown.
Do not use **, ###, ---, bullet syntax.
Use clean formatted paragraphs and numbered sections.

Safety rules:
Do not diagnose diseases.
Do not make medical claims.
Do not promise guaranteed results.
Use careful cosmetic language.

Analyze and include these sections:

1. Overall formula impression
Explain the general character of the formula in simple, premium and understandable language.

2. Main active ingredients
Explain the most important ingredients and their cosmetic role.

3. Hydration
Give a score from 0 to 100 and explain the hydration potential.

4. Barrier support
Give a score from 0 to 100 and explain the barrier-supporting potential.

5. Anti-aging potential
Give a score from 0 to 100 and explain the anti-aging potential.

6. Acne compatibility
Give a score from 0 to 100 and explain whether the formula looks suitable for acne-prone or inflammation-prone skin.

7. Irritation risk
Give a risk score from 0 to 100. A lower number means lower irritation risk.

8. Suitable skin types
Explain which skin types may benefit most.

9. Possible cautions
Mention possible limitations or things to watch.

10. Summecosmetics recommendation
Recommend relevant Summecosmetics directions, for example GLACIAR, NICELY, BALANCE, BECLARITY, CELL C, CELL, MYCODE or SUMMESUN, when appropriate.

11. Final recommendation
Give a clear final cosmetic recommendation for homecare use.

INCI formula:
${formula}
      `,
    })

    return Response.json({
      result: response.output_text,
    })
  } catch (error) {
    console.error(error)

    return Response.json(
      { error: 'AI analysis failed' },
      { status: 500 }
    )
  }
}
