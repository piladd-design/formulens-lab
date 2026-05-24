'use client'

import { useState } from 'react'

const sections = [
  'FORMULA SCORE',
  'KEY BENEFITS',
  'KEY INGREDIENTS',
  'POTENTIAL CONCERNS',
  'BEST FOR',
  'PROFESSIONAL CONCLUSION',
]

function extractSection(text, title) {
  if (!text) return ''
  const start = text.indexOf(title + ':')
  if (start === -1) return ''

  const nextStarts = sections
    .filter((s) => s !== title)
    .map((s) => text.indexOf(s + ':', start + title.length))
    .filter((i) => i !== -1)

  const end = nextStarts.length ? Math.min(...nextStarts) : text.length

  return text
    .slice(start + title.length + 1, end)
    .trim()
    .replace(/\*\*/g, '')
}

function getScore(text) {
  const scoreText = extractSection(text, 'FORMULA SCORE')
  const match = scoreText.match(/\d+/)
  return match ? match[0] : '82'
}

export default function Home() {
  const [inci, setInci] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const analyzeFormula = async () => {
    if (!inci.trim()) return

    setLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inci }),
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({
        message: 'Analysis service is currently unavailable. Please try again.',
      })
    }

    setLoading(false)
  }

  const text = result?.message || ''
  const score = getScore(text)

  return (
    <main style={styles.page}>
      <section style={styles.hero}>
        <div style={styles.badge}>AI Cosmetic Intelligence</div>

        <h1 style={styles.title}>
          Understand your
          <br />
          cosmetic formula.
        </h1>

        <p style={styles.subtitle}>
          Paste an INCI list and receive a clinical-style ingredient analysis
          with benefits, risks and professional conclusion.
        </p>

        <div style={styles.grid}>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Analyze Formula</h2>

            <textarea
              value={inci}
              onChange={(e) => setInci(e.target.value)}
              placeholder="Aqua, Glycerin, Niacinamide, Panthenol, Hyaluronic Acid..."
              style={styles.textarea}
            />

            <div style={styles.counter}>{inci.length}/5000 characters</div>

            <button onClick={analyzeFormula} style={styles.button}>
              {loading ? 'Analyzing formula...' : 'Analyze Formula'}
            </button>
          </div>

          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Analysis Result</h2>

            {loading && (
              <div style={styles.loadingBox}>
                <div style={styles.pulse}></div>
                <p>Analyzing molecular profile...</p>
              </div>
            )}

            {!loading && result && (
              <div style={styles.resultGrid}>
                <div style={styles.scoreCard}>
                  <div style={styles.score}>{score}</div>
                  <div>
                    <div style={styles.scoreLabel}>Formula Score</div>
                    <p style={styles.smallText}>
                      {extractSection(text, 'FORMULA SCORE')}
                    </p>
                  </div>
                </div>

                {sections.slice(1).map((section) => (
                  <div key={section} style={styles.resultSection}>
                    <h3 style={styles.sectionTitle}>{section}</h3>
                    <p style={styles.resultText}>{extractSection(text, section)}</p>
                  </div>
                ))}
              </div>
            )}

            {!loading && !result && (
              <div style={styles.empty}>
                Your AI analysis will appear here after submitting a formula.
              </div>
            )}
          </div>
        </div>

        <div style={styles.features}>
          <div style={styles.feature}>Ingredient safety</div>
          <div style={styles.feature}>Skin benefit profile</div>
          <div style={styles.feature}>Irritation risk</div>
          <div style={styles.feature}>Professional report</div>
        </div>
      </section>
    </main>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background:
      'radial-gradient(circle at top left, rgba(130,70,255,0.25), transparent 35%), #050506',
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
    padding: '32px',
  },
  hero: {
    maxWidth: '1180px',
    margin: '0 auto',
    paddingTop: '70px',
  },
  badge: {
    display: 'inline-block',
    padding: '10px 16px',
    borderRadius: '999px',
    background: 'rgba(140,90,255,0.12)',
    border: '1px solid rgba(180,140,255,0.25)',
    color: '#c9b6ff',
    fontSize: '14px',
    marginBottom: '28px',
  },
  title: {
    fontSize: 'clamp(44px, 7vw, 86px)',
    lineHeight: '0.95',
    letterSpacing: '-0.05em',
    margin: 0,
    maxWidth: '780px',
  },
  subtitle: {
    color: '#b8b8c2',
    fontSize: '20px',
    lineHeight: '1.6',
    maxWidth: '680px',
    marginTop: '28px',
    marginBottom: '48px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
    gap: '28px',
  },
  card: {
    background: 'rgba(18,18,22,0.88)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '28px',
    padding: '30px',
    boxShadow: '0 30px 80px rgba(0,0,0,0.45)',
  },
  cardTitle: {
    fontSize: '28px',
    marginTop: 0,
    marginBottom: '20px',
  },
  textarea: {
    width: '100%',
    minHeight: '260px',
    background: '#070708',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '20px',
    color: '#fff',
    padding: '20px',
    fontSize: '16px',
    lineHeight: '1.6',
    resize: 'vertical',
    outline: 'none',
    boxSizing: 'border-box',
  },
  counter: {
    color: '#777',
    fontSize: '13px',
    marginTop: '12px',
  },
  button: {
    marginTop: '20px',
    width: '100%',
    padding: '18px 22px',
    borderRadius: '18px',
    border: 'none',
    background: 'linear-gradient(135deg, #7b2ff7, #f107a3)',
    color: '#fff',
    fontSize: '17px',
    fontWeight: '700',
    cursor: 'pointer',
  },
  resultGrid: {
    display: 'grid',
    gap: '16px',
  },
  scoreCard: {
    display: 'flex',
    gap: '18px',
    alignItems: 'center',
    background: '#080809',
    borderRadius: '22px',
    padding: '20px',
    border: '1px solid rgba(255,255,255,0.08)',
  },
  score: {
    minWidth: '88px',
    height: '88px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #7b2ff7, #00e5ff)',
    fontSize: '34px',
    fontWeight: '800',
  },
  scoreLabel: {
    color: '#c9b6ff',
    fontWeight: '700',
    marginBottom: '6px',
  },
  smallText: {
    color: '#aaa',
    lineHeight: '1.6',
    margin: 0,
    fontSize: '14px',
  },
  resultSection: {
    background: '#080809',
    borderRadius: '20px',
    padding: '18px',
    border: '1px solid rgba(255,255,255,0.08)',
  },
  sectionTitle: {
    color: '#c9b6ff',
    fontSize: '13px',
    letterSpacing: '0.08em',
    marginTop: 0,
    marginBottom: '10px',
  },
  resultText: {
    color: '#d5d5dd',
    lineHeight: '1.7',
    fontSize: '15px',
    margin: 0,
    whiteSpace: 'pre-line',
  },
  loadingBox: {
    minHeight: '260px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    color: '#aaa',
  },
  pulse: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #7b2ff7, #00e5ff)',
    marginBottom: '18px',
  },
  empty: {
    color: '#777',
    lineHeight: '1.8',
    minHeight: '260px',
  },
  features: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '16px',
    marginTop: '28px',
  },
  feature: {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '18px',
    padding: '18px',
    color: '#d8d8df',
  },
}
