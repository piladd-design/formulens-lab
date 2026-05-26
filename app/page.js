'use client'

import { useState } from 'react'

const translations = {
  EN: {
    badge: 'AI COSMETIC INTELLIGENCE',
    title: 'Understand your cosmetic formula.',
    subtitle: 'Paste an INCI list and receive a clear, clinical-style ingredient analysis for safety, benefits and potential concerns.',
    analyzeTitle: 'Analyze Formula',
    resultTitle: 'Analysis Result',
    placeholder: 'Aqua, Glycerin, Niacinamide...',
    button: 'Analyze Formula',
    loading: 'Analyzing...',
    empty: 'Your AI analysis will appear here after submitting a formula.',
    formulaScore: 'Formula Score',
    hydration: 'Hydration',
    barrier: 'Barrier Support',
    antiAging: 'Anti-Aging',
    acne: 'Acne Safety',
    irritation: 'Irritation Risk',
    benefits: 'KEY BENEFITS',
    ingredients: 'KEY INGREDIENTS',
    concerns: 'POTENTIAL CONCERNS',
    bestFor: 'BEST FOR',
    conclusion: 'PROFESSIONAL CONCLUSION',
  },
  DE: {
    badge: 'KI-KOSMETIKANALYSE',
    title: 'Verstehen Sie Ihre kosmetische Formel.',
    subtitle: 'Fügen Sie eine INCI-Liste ein und erhalten Sie eine klare professionelle Analyse zu Nutzen, Sicherheit und möglichen Risiken.',
    analyzeTitle: 'Formel analysieren',
    resultTitle: 'Analyseergebnis',
    placeholder: 'Aqua, Glycerin, Niacinamide...',
    button: 'Formel analysieren',
    loading: 'Analyse läuft...',
    empty: 'Ihre KI-Analyse erscheint hier nach dem Absenden der Formel.',
    formulaScore: 'Formelbewertung',
    hydration: 'Feuchtigkeit',
    barrier: 'Barriere-Schutz',
    antiAging: 'Anti-Aging',
    acne: 'Akne-Sicherheit',
    irritation: 'Reizungsrisiko',
    benefits: 'WICHTIGE VORTEILE',
    ingredients: 'WICHTIGE INHALTSSTOFFE',
    concerns: 'MÖGLICHE RISIKEN',
    bestFor: 'GEEIGNET FÜR',
    conclusion: 'PROFESSIONELLES FAZIT',
  },
  RU: {
    badge: 'ИИ-АНАЛИЗ КОСМЕТИКИ',
    title: 'Поймите свою косметическую формулу.',
    subtitle: 'Вставьте INCI-состав и получите понятный профессиональный анализ пользы, безопасности и возможных рисков.',
    analyzeTitle: 'Анализ формулы',
    resultTitle: 'Результат анализа',
    placeholder: 'Aqua, Glycerin, Niacinamide...',
    button: 'Анализировать формулу',
    loading: 'Анализируем...',
    empty: 'Результат ИИ-анализа появится здесь после отправки формулы.',
    formulaScore: 'Оценка формулы',
    hydration: 'Увлажнение',
    barrier: 'Поддержка барьера',
    antiAging: 'Антивозрастной эффект',
    acne: 'Безопасность при акне',
    irritation: 'Риск раздражения',
    benefits: 'КЛЮЧЕВЫЕ ПРЕИМУЩЕСТВА',
    ingredients: 'ВАЖНЫЕ ИНГРЕДИЕНТЫ',
    concerns: 'ВОЗМОЖНЫЕ РИСКИ',
    bestFor: 'ПОДХОДИТ ДЛЯ',
    conclusion: 'ПРОФЕССИОНАЛЬНЫЙ ВЫВОД',
  },
}

export default function Home() {
  const [language, setLanguage] = useState('EN')
  const [inci, setInci] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const t = translations[language]

  async function analyzeFormula() {
    if (!inci.trim()) return

    setLoading(true)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inci, language }),
      })

      const data = await response.json()

      if (data.success) {
        setResult(data.data)
      }
    } catch (error) {
      console.log(error)
    }

    setLoading(false)
  }

  const metrics = result
    ? [
        { label: t.hydration, value: result.hydration },
        { label: t.barrier, value: result.barrierSupport },
        { label: t.antiAging, value: result.antiAging },
        { label: t.acne, value: result.acneSafety },
        { label: t.irritation, value: 100 - result.irritationRisk },
      ]
    : []

  return (
    <main className="page">
      <div className="container">
        <div className="top">
          <div>
            <div className="badge">{t.badge}</div>
            <div className="brand">FORMULENS LAB</div>
            <h1 className="title">{t.title}</h1>
            <p className="subtitle">{t.subtitle}</p>
          </div>

          <div className="languages">
            {['EN', 'DE', 'RU'].map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={language === lang ? 'lang active' : 'lang'}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        <div className="grid">
          <div className="card">
            <div className="sectionTitle">{t.analyzeTitle}</div>

            <textarea
              value={inci}
              onChange={(e) => setInci(e.target.value)}
              placeholder={t.placeholder}
              className="textarea"
            />

            <button onClick={analyzeFormula} className="button">
              {loading ? t.loading : t.button}
            </button>
          </div>

          <div className="card resultCardMain">
            <div className="sectionTitle">{t.resultTitle}</div>

            {!result ? (
              <div className="empty">{t.empty}</div>
            ) : (
              <>
                <div className="scoreCard">
                  <div className="scoreCircle">{result.formulaScore}</div>

                  <div>
                    <div className="scoreTitle">{t.formulaScore}</div>
                    <div className="scoreText">{result.formulaScore}/100</div>
                  </div>
                </div>

                <div className="metrics">
                  {metrics.map((metric) => (
                    <div key={metric.label} className="metricCard">
                      <div className="metricTop">
                        <span>{metric.label}</span>
                        <span>{metric.value}</span>
                      </div>

                      <div className="progressBg">
                        <div
                          className="progress"
                          style={{ width: `${metric.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <Block title={t.benefits} items={result.keyBenefits} />
                <IngredientBlock title={t.ingredients} items={result.keyIngredients} />
                <Block title={t.concerns} items={result.potentialConcerns} />
                <Block title={t.bestFor} items={result.bestFor} />

                <div className="section">
                  <div className="sectionHeading">{t.conclusion}</div>
                  <div className="text">{result.professionalConclusion}</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .page {
          min-height: 100vh;
          background: #000;
          color: #fff;
          padding: 72px 40px;
          font-family: Inter, Arial, sans-serif;
          background-image: radial-gradient(
            circle at top left,
            rgba(120, 0, 255, 0.35),
            transparent 42%
          );
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .top {
          display: flex;
          justify-content: space-between;
          gap: 40px;
          align-items: flex-start;
          margin-bottom: 60px;
        }

        .badge {
          font-size: 14px;
          letter-spacing: 3px;
          color: #b46cff;
          margin-bottom: 18px;
          font-weight: 700;
        }

        .brand {
          font-size: 48px;
          font-weight: 900;
          margin-bottom: 28px;
        }

        .title {
          font-size: clamp(48px, 7vw, 92px);
          line-height: 0.95;
          font-weight: 900;
          max-width: 820px;
          margin: 0 0 30px;
        }

        .subtitle {
          font-size: 20px;
          line-height: 1.7;
          color: #d0d0d0;
          max-width: 760px;
          margin: 0;
        }

        .languages {
          display: flex;
          gap: 12px;
          flex-shrink: 0;
        }

        .lang {
          padding: 10px 16px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: transparent;
          color: #fff;
          cursor: pointer;
          font-weight: 800;
        }

        .lang.active {
          border: 1px solid transparent;
          background: linear-gradient(90deg, #7c3aed, #ff00aa);
        }

        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          align-items: start;
        }

        .card {
          background: rgba(10, 10, 18, 0.92);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 30px;
          padding: 30px;
          box-shadow: 0 30px 100px rgba(0, 0, 0, 0.35);
        }

        .sectionTitle {
          font-size: 24px;
          font-weight: 900;
          margin-bottom: 25px;
        }

        .textarea {
          width: 100%;
          height: 240px;
          background: #000;
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 20px;
          font-size: 18px;
          resize: none;
          outline: none;
          box-sizing: border-box;
        }

        .button {
          width: 100%;
          margin-top: 25px;
          padding: 22px;
          border-radius: 18px;
          border: none;
          background: linear-gradient(90deg, #7c3aed, #ff00aa);
          color: #fff;
          font-weight: 900;
          font-size: 18px;
          cursor: pointer;
        }

        .empty {
          opacity: 0.65;
          line-height: 1.8;
        }

        .scoreCard {
          display: flex;
          align-items: center;
          gap: 25px;
          margin-bottom: 25px;
        }

        .scoreCircle {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: linear-gradient(135deg, #7c3aed, #40c9ff);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 42px;
          font-weight: 900;
          flex-shrink: 0;
        }

        .scoreTitle {
          color: #d48cff;
          font-weight: 900;
          font-size: 26px;
          margin-bottom: 8px;
        }

        .scoreText {
          font-size: 20px;
        }

        .metrics {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 25px;
        }

        .metricCard {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 20px;
          padding: 18px;
        }

        .metricTop {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          font-weight: 800;
          gap: 10px;
        }

        .progressBg {
          width: 100%;
          height: 10px;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.06);
          overflow: hidden;
        }

        .progress {
          height: 10px;
          border-radius: 20px;
          background: linear-gradient(90deg, #7c3aed, #ff00aa);
        }

        .section {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 24px;
          padding: 24px;
          margin-top: 20px;
        }

        .sectionHeading {
          color: #d48cff;
          letter-spacing: 2px;
          font-weight: 900;
          margin-bottom: 20px;
          font-size: 15px;
        }

        .list {
          display: flex;
          flex-direction: column;
          gap: 14px;
          color: #f0f0f0;
          line-height: 1.7;
        }

        .text {
          line-height: 1.8;
          color: #f0f0f0;
        }

        @media (max-width: 900px) {
          .page {
            padding: 28px 18px 42px;
          }

          .top {
            flex-direction: column;
            gap: 28px;
            margin-bottom: 42px;
          }

          .languages {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
          }

          .lang {
            width: 100%;
            padding: 12px 0;
          }

          .brand {
            font-size: 34px;
            margin-bottom: 24px;
          }

          .badge {
            font-size: 12px;
            letter-spacing: 2px;
          }

          .title {
            font-size: 48px;
          }

          .subtitle {
            font-size: 17px;
          }

          .grid {
            grid-template-columns: 1fr;
            gap: 22px;
          }

          .card {
            padding: 22px;
            border-radius: 24px;
          }

          .textarea {
            height: 220px;
            font-size: 16px;
          }

          .button {
            padding: 19px;
            font-size: 16px;
          }

          .metrics {
            grid-template-columns: 1fr;
          }

          .scoreCard {
            align-items: flex-start;
          }

          .scoreCircle {
            width: 78px;
            height: 78px;
            font-size: 34px;
          }

          .scoreTitle {
            font-size: 22px;
          }
        }

        @media (max-width: 480px) {
          .title {
            font-size: 40px;
          }

          .brand {
            font-size: 30px;
          }

          .sectionTitle {
            font-size: 22px;
          }

          .scoreCard {
            flex-direction: row;
          }

          .metricTop {
            font-size: 14px;
          }
        }
      `}</style>
    </main>
  )
}

function Block({ title, items }) {
  return (
    <div className="section">
      <div className="sectionHeading">{title}</div>
      <div className="list">
        {items?.map((item, index) => (
          <div key={index}>— {item}</div>
        ))}
      </div>
    </div>
  )
}

function IngredientBlock({ title, items }) {
  return (
    <div className="section">
      <div className="sectionHeading">{title}</div>
      <div className="list">
        {items?.map((item, index) => (
          <div key={index}>
            <strong>{item.name}</strong>: {item.description}
          </div>
        ))}
      </div>
    </div>
  )
}
