'use client'

import Link from 'next/link'
import { useState } from 'react'

const translations = {
  DE: {
    back: '← Home Care Dashboard',
    title: 'Formelanalyse',
    subtitle:
      'Fügen Sie die INCI-Liste eines kosmetischen Produkts ein und erhalten Sie eine verständliche AI-Analyse zu Nutzen, Risiken und Hautverträglichkeit.',
    inci: 'INCI-Liste',
    analyze: '✨ Formel analysieren',
    analyzing: 'AI analysiert die Formel...',
    empty: 'Geben Sie die INCI-Liste ein und starten Sie die Analyse.',
    error: 'Analyse fehlgeschlagen. Bitte versuchen Sie es erneut.',
    score: 'Formel-Score',
    hydration: 'Feuchtigkeit',
    barrier: 'Barriere',
    antiAging: 'Anti-Aging',
    acne: 'Akne-Kompatibilität',
    irritation: 'Irritationsrisiko',
    summary: 'Zusammenfassung',
    ingredients: 'Aktive Inhaltsstoffe',
    skinTypes: 'Geeignete Hauttypen',
    warnings: 'Hinweise',
    recommendation: 'Empfehlung',
    summecosmetics: 'Summecosmetics Empfehlung',
  },

  RU: {
    back: '← Домашний уход',
    title: 'Анализ формулы',
    subtitle:
      'Вставьте INCI-состав косметического продукта и получите понятный AI-анализ пользы, рисков и совместимости с кожей.',
    inci: 'INCI-состав',
    analyze: '✨ Анализировать формулу',
    analyzing: 'AI анализирует формулу...',
    empty: 'Введите состав и нажмите анализ.',
    error: 'Ошибка анализа. Попробуйте ещё раз.',
    score: 'Оценка формулы',
    hydration: 'Увлажнение',
    barrier: 'Барьер',
    antiAging: 'Anti-Aging',
    acne: 'Совместимость при акне',
    irritation: 'Риск раздражения',
    summary: 'Краткий вывод',
    ingredients: 'Активные ингредиенты',
    skinTypes: 'Подходящие типы кожи',
    warnings: 'Предупреждения',
    recommendation: 'Рекомендация',
    summecosmetics: 'Рекомендация Summecosmetics',
  },

  EN: {
    back: '← Home Care Dashboard',
    title: 'Formula Analysis',
    subtitle:
      'Paste the INCI list of a cosmetic product and receive a clear AI analysis of benefits, risks and skin compatibility.',
    inci: 'INCI Ingredients',
    analyze: '✨ Analyze Formula',
    analyzing: 'AI is analyzing the formula...',
    empty: 'Enter the INCI list and start the analysis.',
    error: 'Analysis failed. Please try again.',
    score: 'Formula Score',
    hydration: 'Hydration',
    barrier: 'Barrier',
    antiAging: 'Anti-Aging',
    acne: 'Acne Compatibility',
    irritation: 'Irritation Risk',
    summary: 'Summary',
    ingredients: 'Active Ingredients',
    skinTypes: 'Suitable Skin Types',
    warnings: 'Warnings',
    recommendation: 'Recommendation',
    summecosmetics: 'Summecosmetics Recommendation',
  },
}

export default function ClientFormulaPage() {
  const [lang, setLang] = useState('DE')
  const [formula, setFormula] = useState('')
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const t = translations[lang]

  const analyzeFormula = async () => {
    if (!formula.trim()) return

    setLoading(true)
    setError('')
    setAnalysis(null)

    try {
      const response = await fetch('/api/formula-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formula,
          lang,
        }),
      })

      const data = await response.json()

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Analysis failed')
      }

      setAnalysis(data)
    } catch (err) {
      console.error(err)
      setError(t.error)
    } finally {
      setLoading(false)
    }
  }

  const metrics = analysis
    ? [
        { label: t.hydration, value: analysis.hydration },
        { label: t.barrier, value: analysis.barrier },
        { label: t.antiAging, value: analysis.antiAging },
        { label: t.acne, value: analysis.acne },
        { label: t.irritation, value: analysis.irritation, green: true },
      ]
    : []

  return (
    <main style={styles.main}>
      <div style={styles.wrap}>
        <div style={styles.topBar}>
          <Link href="/client" style={styles.back}>
            {t.back}
          </Link>

          <div style={styles.langSwitch}>
            {['DE', 'RU', 'EN'].map((item) => (
              <button
                key={item}
                onClick={() => {
                  setLang(item)
                  setAnalysis(null)
                  setError('')
                }}
                style={lang === item ? styles.langActive : styles.langBtn}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <h1 style={styles.h1}>{t.title}</h1>

        <p style={styles.sub}>{t.subtitle}</p>

        <section style={styles.grid}>
          <div style={styles.panel}>
            <h2 style={styles.h2}>{t.inci}</h2>

            <textarea
              value={formula}
              onChange={(e) => {
                setFormula(e.target.value)
                setAnalysis(null)
                setError('')
              }}
              placeholder="Aqua, Glycerin, Niacinamide, Panthenol..."
              style={styles.textarea}
            />

            <button
              onClick={analyzeFormula}
              disabled={!formula.trim() || loading}
              style={{
                ...styles.primaryBtn,
                background:
                  formula.trim() && !loading
                    ? 'linear-gradient(90deg,#7b2cff,#ff00aa)'
                    : '#222',
                cursor:
                  formula.trim() && !loading ? 'pointer' : 'not-allowed',
                opacity: formula.trim() && !loading ? 1 : 0.45,
              }}
            >
              {loading ? t.analyzing : t.analyze}
            </button>
          </div>

          <div style={styles.panel}>
            {!analysis && !error && !loading && (
              <div style={styles.empty}>{t.empty}</div>
            )}

            {loading && <div style={styles.empty}>{t.analyzing}</div>}

            {error && <div style={styles.error}>{error}</div>}

            {analysis && (
              <>
                <div style={styles.scoreRow}>
                  <div style={styles.scoreCircle}>
                    {analysis.overallScore}
                  </div>

                  <div>
                    <div style={styles.scoreText}>
                      {analysis.overallScore}/100
                    </div>
                    <div style={styles.scoreLabel}>{t.score}</div>
                  </div>
                </div>

                <div style={styles.metricsGrid}>
                  {metrics.map((metric) => (
                    <Metric key={metric.label} {...metric} />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {analysis && (
          <section style={styles.resultGrid}>
            <Info title={t.summary}>{analysis.summary}</Info>
            <Info title={t.ingredients}>{analysis.ingredients}</Info>
            <Info title={t.skinTypes}>{analysis.skinTypes}</Info>
            <Info title={t.warnings}>{analysis.warnings}</Info>
            <Info title={t.recommendation}>
              {analysis.recommendation}
            </Info>
            <Info title={t.summecosmetics}>
              {analysis.summecosmetics}
            </Info>
          </section>
        )}
      </div>
    </main>
  )
}

function Metric({ label, value = 0, green }) {
  const safeValue = Math.max(0, Math.min(100, Number(value) || 0))

  return (
    <div style={styles.metric}>
      <div style={styles.metricTop}>
        <span>{label}</span>
        <strong>{safeValue}/100</strong>
      </div>

      <div style={styles.barBg}>
        <div
          style={{
            width: `${safeValue}%`,
            height: '100%',
            background: green
              ? '#44ff88'
              : 'linear-gradient(90deg,#7b2cff,#ff00aa)',
          }}
        />
      </div>
    </div>
  )
}

function Info({ title, children }) {
  return (
    <div style={styles.info}>
      <h3 style={styles.infoTitle}>{title}</h3>
      <p style={styles.infoText}>{children}</p>
    </div>
  )
}

const styles = {
  main: {
    minHeight: '100vh',
    background:
      'radial-gradient(circle at top left,#1a1028 0%,#050505 35%,#000 100%)',
    color: 'white',
    padding: '40px 6% 70px',
    fontFamily: 'Arial, sans-serif',
  },
  wrap: {
    maxWidth: '1300px',
    margin: '0 auto',
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    alignItems: 'center',
    marginBottom: '36px',
  },
  back: {
    color: '#aaa',
    textDecoration: 'none',
  },
  langSwitch: {
    display: 'flex',
    gap: '10px',
  },
  langBtn: {
    width: '54px',
    height: '40px',
    borderRadius: '14px',
    border: '1px solid rgba(255,255,255,0.2)',
    background: 'transparent',
    color: 'white',
    cursor: 'pointer',
    fontWeight: 800,
  },
  langActive: {
    width: '54px',
    height: '40px',
    borderRadius: '14px',
    border: '1px solid #ff00aa',
    background: 'linear-gradient(90deg,#7b2cff,#ff00aa)',
    color: 'white',
    cursor: 'pointer',
    fontWeight: 800,
  },
  h1: {
    fontSize: 'clamp(42px,6vw,72px)',
    margin: '40px 0 16px',
    fontWeight: 900,
  },
  h2: {
    fontSize: '30px',
    marginBottom: '22px',
  },
  sub: {
    color: '#bdbdbd',
    fontSize: '22px',
    maxWidth: '860px',
    lineHeight: 1.6,
    marginBottom: '44px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))',
    gap: '30px',
  },
  panel: {
    background: 'rgba(12,12,24,0.92)',
    border: '1px solid #242424',
    borderRadius: '30px',
    padding: '34px',
  },
  textarea: {
    width: '100%',
    minHeight: '300px',
    background: '#050505',
    border: '1px solid #262626',
    borderRadius: '22px',
    color: 'white',
    padding: '24px',
    fontSize: '19px',
    resize: 'vertical',
    outline: 'none',
  },
  primaryBtn: {
    width: '100%',
    marginTop: '22px',
    padding: '22px',
    borderRadius: '20px',
    border: 'none',
    color: 'white',
    fontSize: '20px',
    fontWeight: 900,
  },
  empty: {
    minHeight: '360px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#888',
    fontSize: '22px',
    textAlign: 'center',
    lineHeight: 1.6,
  },
  error: {
    background: '#3b1111',
    border: '1px solid #7f1d1d',
    color: '#ffb4b4',
    borderRadius: '20px',
    padding: '22px',
    fontSize: '18px',
    lineHeight: 1.6,
  },
  scoreRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '26px',
    marginBottom: '30px',
  },
  scoreCircle: {
    width: '130px',
    height: '130px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg,#7b2cff,#ff00aa)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '46px',
    fontWeight: 900,
  },
  scoreText: {
    fontSize: '44px',
    fontWeight: 900,
  },
  scoreLabel: {
    color: '#aaa',
    marginTop: '8px',
    fontSize: '16px',
  },
  metricsGrid: {
    display: 'grid',
    gap: '16px',
  },
  metric: {
    background: '#0d0d18',
    border: '1px solid #252525',
    borderRadius: '18px',
    padding: '18px',
  },
  metricTop: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '16px',
    marginBottom: '12px',
    color: '#e8e8e8',
    fontWeight: 700,
  },
  barBg: {
    height: '10px',
    background: '#1c1c1c',
    borderRadius: '999px',
    overflow: 'hidden',
  },
  resultGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))',
    gap: '24px',
    marginTop: '34px',
  },
  info: {
    background: 'rgba(12,12,24,0.92)',
    border: '1px solid #242424',
    borderRadius: '26px',
    padding: '28px',
  },
  infoTitle: {
    fontSize: '24px',
    marginBottom: '16px',
  },
  infoText: {
    color: '#d4d4d4',
    lineHeight: 1.8,
    fontSize: '17px',
    whiteSpace: 'pre-line',
  },
}
