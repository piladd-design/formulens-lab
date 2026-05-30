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
    result: 'AI-Analyse',
    error: 'Analyse fehlgeschlagen. Bitte versuchen Sie es erneut.',
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
    result: 'AI-анализ',
    error: 'Ошибка анализа. Попробуйте ещё раз.',
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
    result: 'AI Analysis',
    error: 'Analysis failed. Please try again.',
  },
}

export default function ClientFormulaPage() {
  const [lang, setLang] = useState('DE')
  const [formula, setFormula] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const t = translations[lang]

  const analyzeFormula = async () => {
    if (!formula.trim()) return

    setLoading(true)
    setError('')
    setResult('')

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

      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed')
      }

      setResult(data.result)
    } catch (err) {
      console.error(err)
      setError(t.error)
    } finally {
      setLoading(false)
    }
  }

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
                  setResult('')
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
                setResult('')
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
            {!result && !error && !loading && (
              <div style={styles.empty}>{t.empty}</div>
            )}

            {loading && <div style={styles.empty}>{t.analyzing}</div>}

            {error && <div style={styles.error}>{error}</div>}

            {result && (
              <>
                <h2 style={styles.h2}>{t.result}</h2>
                <div style={styles.aiResult}>{result}</div>
              </>
            )}
          </div>
        </section>
      </div>
    </main>
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
  aiResult: {
    background: '#0d0d18',
    border: '1px solid #252525',
    borderRadius: '22px',
    padding: '26px',
    color: '#d4d4d4',
    lineHeight: 1.8,
    fontSize: '18px',
    whiteSpace: 'pre-line',
  },
}
