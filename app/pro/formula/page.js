'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function FormulaAnalyzerPage() {
  const [lang, setLang] = useState('DE')
  const [formula, setFormula] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function analyzeFormula() {
    if (!formula.trim()) {
      setError('Bitte INCI-Formel eingeben.')
      return
    }

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const res = await fetch('/api/formula-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formula, lang }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data?.error || 'Analysis failed')
      }

      setResult(data)
    } catch (err) {
      setError('Analyse konnte nicht durchgeführt werden.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at top left,#1a1028 0%,#050505 35%,#000 100%)',
        color: 'white',
        padding: '40px 6% 70px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <Link href="/pro" style={{ color: '#aaa', textDecoration: 'none' }}>
          ← Professional Dashboard
        </Link>

        <h1 style={{ fontSize: '48px', margin: '36px 0 12px' }}>
          Formelanalyse PRO
        </h1>

        <p style={{ color: '#bdbdbd', fontSize: '20px', lineHeight: 1.5 }}>
          Erweiterte INCI-Analyse: Wirksamkeit, Risiken, Wirkstoffe und
          professionelle Bewertung.
        </p>

        <div style={{ display: 'flex', gap: '10px', margin: '28px 0' }}>
          {['DE', 'RU', 'EN'].map((item) => (
            <button
              key={item}
              onClick={() => setLang(item)}
              style={{
                width: '54px',
                height: '40px',
                borderRadius: '14px',
                border:
                  lang === item
                    ? '1px solid #ff00aa'
                    : '1px solid rgba(255,255,255,0.2)',
                background:
                  lang === item
                    ? 'linear-gradient(90deg,#7b2cff,#ff00aa)'
                    : 'transparent',
                color: 'white',
                fontWeight: 800,
                cursor: 'pointer',
              }}
            >
              {item}
            </button>
          ))}
        </div>

        <textarea
          value={formula}
          onChange={(e) => setFormula(e.target.value)}
          placeholder="INCI hier einfügen..."
          style={{
            width: '100%',
            minHeight: '220px',
            borderRadius: '24px',
            padding: '22px',
            background: 'rgba(12,12,24,0.92)',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.18)',
            fontSize: '16px',
            lineHeight: 1.6,
            outline: 'none',
            resize: 'vertical',
          }}
        />

        <button
          onClick={analyzeFormula}
          disabled={loading}
          style={{
            marginTop: '22px',
            padding: '15px 26px',
            borderRadius: '999px',
            border: 'none',
            background: 'linear-gradient(90deg,#7b2cff,#ff00aa)',
            color: 'white',
            fontWeight: 900,
            fontSize: '16px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? 'Analyse läuft...' : 'Formel analysieren'}
        </button>

        {error && (
          <p style={{ marginTop: '18px', color: '#ff7b7b' }}>{error}</p>
        )}

        {result && (
          <section style={{ marginTop: '42px' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))',
                gap: '16px',
                marginBottom: '28px',
              }}
            >
              <Score title="Overall" value={result.overallScore} />
              <Score title="Hydration" value={result.hydration} />
              <Score title="Barrier" value={result.barrier} />
              <Score title="Anti-Aging" value={result.antiAging} />
              <Score title="Acne" value={result.acne} />
              <Score title="Irritation" value={result.irritation} />
            </div>

            <ResultBlock title="Summary" text={result.summary} />
            <ResultBlock title="Ingredients" text={result.ingredients} />
            <ResultBlock title="Skin Types" text={result.skinTypes} />
            <ResultBlock title="Warnings" text={result.warnings} />
            <ResultBlock title="Recommendation" text={result.recommendation} />
            <ResultBlock
              title="SUMMECOSMETICS Recommendation"
              text={result.summecosmetics}
            />
          </section>
        )}
      </div>
    </main>
  )
}

function Score({ title, value }) {
  return (
    <div
      style={{
        background: 'rgba(12,12,24,0.92)',
        border: '1px solid rgba(255,255,255,0.14)',
        borderRadius: '22px',
        padding: '20px',
      }}
    >
      <div style={{ color: '#bdbdbd', marginBottom: '8px' }}>{title}</div>
      <div style={{ fontSize: '34px', fontWeight: 900 }}>
        {Number.isFinite(Number(value)) ? value : '—'}
      </div>
    </div>
  )
}

function ResultBlock({ title, text }) {
  if (!text) return null

  return (
    <div
      style={{
        background: 'rgba(12,12,24,0.92)',
        border: '1px solid rgba(255,255,255,0.14)',
        borderRadius: '24px',
        padding: '24px',
        marginBottom: '18px',
      }}
    >
      <h2 style={{ marginTop: 0 }}>{title}</h2>
      <p style={{ color: '#d0d0d0', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
        {text}
      </p>
    </div>
  )
}
