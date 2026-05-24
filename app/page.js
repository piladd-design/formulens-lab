'use client'

import { useState } from 'react'

const loadingSteps = {
  EN: [
    'Analyzing molecular structure...',
    'Evaluating irritation profile...',
    'Checking barrier support...',
    'Scanning active ingredients...',
    'Calculating hydration score...',
    'Generating professional conclusion...',
  ],
  DE: [
    'Molekulare Struktur wird analysiert...',
    'Irritationsprofil wird bewertet...',
    'Barriere-Support wird geprüft...',
    'Aktive Inhaltsstoffe werden gescannt...',
    'Feuchtigkeits-Score wird berechnet...',
    'Professionelles Fazit wird erstellt...',
  ],
  RU: [
    'Анализируем молекулярную структуру...',
    'Оцениваем риск раздражения...',
    'Проверяем поддержку кожного барьера...',
    'Сканируем активные ингредиенты...',
    'Рассчитываем уровень увлажнения...',
    'Формируем профессиональный вывод...',
  ],
}

const sections = [
  'FORMULA SCORE',
  'KEY BENEFITS',
  'KEY INGREDIENTS',
  'POTENTIAL CONCERNS',
  'BEST FOR',
  'PROFESSIONAL CONCLUSION',
]

const translations = {
  EN: {
    badge: 'AI COSMETIC INTELLIGENCE',
    title: 'Understand your cosmetic formula.',
    subtitle:
      'Paste an INCI list and receive a clear, clinical-style ingredient analysis for safety, benefits and potential concerns.',
    analyzeTitle: 'Analyze Formula',
    resultTitle: 'Analysis Result',
    placeholder: 'Aqua, Glycerin, Niacinamide, Panthenol, Hyaluronic Acid...',
    button: 'Analyze Formula',
    empty: 'Your AI analysis will appear here after submitting a formula.',
    score: 'Formula Score',
    counter: 'characters',
    metrics: {
      hydration: 'Hydration',
      barrier: 'Barrier Support',
      antiAging: 'Anti-Aging',
      acneSafety: 'Acne Safety',
      irritation: 'Irritation Risk',
    },
    sectionNames: {
      'KEY BENEFITS': 'KEY BENEFITS',
      'KEY INGREDIENTS': 'KEY INGREDIENTS',
      'POTENTIAL CONCERNS': 'POTENTIAL CONCERNS',
      'BEST FOR': 'BEST FOR',
      'PROFESSIONAL CONCLUSION': 'PROFESSIONAL CONCLUSION',
    },
  },
  DE: {
    badge: 'KI-KOSMETIKANALYSE',
    title: 'Verstehen Sie Ihre kosmetische Formel.',
    subtitle:
      'Fügen Sie eine INCI-Liste ein und erhalten Sie eine klare, professionell strukturierte Analyse zu Nutzen, Sicherheit und möglichen Risiken.',
    analyzeTitle: 'Formel analysieren',
    resultTitle: 'Analyseergebnis',
    placeholder: 'Aqua, Glycerin, Niacinamide, Panthenol, Hyaluronic Acid...',
    button: 'Formel analysieren',
    empty: 'Ihre KI-Analyse erscheint hier nach dem Absenden der Formel.',
    score: 'Formel-Score',
    counter: 'Zeichen',
    metrics: {
      hydration: 'Feuchtigkeit',
      barrier: 'Barriere-Support',
      antiAging: 'Anti-Aging',
      acneSafety: 'Akne-Eignung',
      irritation: 'Irritationsrisiko',
    },
    sectionNames: {
      'KEY BENEFITS': 'HAUPTVORTEILE',
      'KEY INGREDIENTS': 'WICHTIGE INHALTSSTOFFE',
      'POTENTIAL CONCERNS': 'MÖGLICHE HINWEISE',
      'BEST FOR': 'GEEIGNET FÜR',
      'PROFESSIONAL CONCLUSION': 'PROFESSIONELLES FAZIT',
    },
  },
  RU: {
    badge: 'ИИ-АНАЛИЗ КОСМЕТИКИ',
    title: 'Поймите свою косметическую формулу.',
    subtitle:
      'Вставьте INCI-состав и получите понятный профессиональный анализ пользы, безопасности и возможных рисков.',
    analyzeTitle: 'Анализ формулы',
    resultTitle: 'Результат анализа',
    placeholder: 'Aqua, Glycerin, Niacinamide, Panthenol, Hyaluronic Acid...',
    button: 'Анализировать формулу',
    empty: 'Результат ИИ-анализа появится здесь после отправки формулы.',
    score: 'Оценка формулы',
    counter: 'символов',
    metrics: {
      hydration: 'Увлажнение',
      barrier: 'Поддержка барьера',
      antiAging: 'Anti-Aging',
      acneSafety: 'Подходит при акне',
      irritation: 'Риск раздражения',
    },
    sectionNames: {
      'KEY BENEFITS': 'КЛЮЧЕВЫЕ ПРЕИМУЩЕСТВА',
      'KEY INGREDIENTS': 'ВАЖНЫЕ ИНГРЕДИЕНТЫ',
      'POTENTIAL CONCERNS': 'ВОЗМОЖНЫЕ РИСКИ',
      'BEST FOR': 'ПОДХОДИТ ДЛЯ',
      'PROFESSIONAL CONCLUSION': 'ПРОФЕССИОНАЛЬНЫЙ ВЫВОД',
    },
  },
}

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

function extractMetric(text, title, fallback) {
  if (!text) return fallback

  const match = text.match(new RegExp(`${title}:\\s*([^\\n]+)`, 'i'))
  return match ? match[1].trim() : fallback
}

function getScore(text) {
  const scoreText = extractSection(text, 'FORMULA SCORE')
  const match = scoreText.match(/\d+/)
  return match ? match[0] : '85'
}

function metricNumber(value, fallback) {
  const match = String(value).match(/\d+/)
  return match ? parseInt(match[0]) : fallback
}

function generateMetrics(text, score) {
  const base = parseInt(score || 85)

  return [
    {
      id: 'hydration',
      value: metricNumber(extractMetric(text, 'HYDRATION', base + 7), Math.min(base + 7, 99)),
      color: '#38bdf8',
    },
    {
      id: 'barrier',
      value: metricNumber(extractMetric(text, 'BARRIER SUPPORT', base + 3), Math.min(base + 3, 99)),
      color: '#8b5cf6',
    },
    {
      id: 'antiAging',
      value: metricNumber(extractMetric(text, 'ANTI-AGING', base + 1), Math.min(base + 1, 99)),
      color: '#ec4899',
    },
    {
      id: 'acneSafety',
      value:
        extractMetric(text, 'ACNE SAFE', 'YES').toUpperCase().includes('YES')
          ? Math.max(base - 6, 70)
          : 45,
      color: '#22c55e',
    },
    {
      id: 'irritation',
      value:
        extractMetric(text, 'IRRITATION RISK', 'LOW').toUpperCase().includes('LOW')
          ? 12
          : extractMetric(text, 'IRRITATION RISK', 'LOW').toUpperCase().includes('MEDIUM')
            ? 45
            : 78,
      color: '#f97316',
    },
  ]
}

export default function Home() {
  const [inci, setInci] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [language, setLanguage] = useState('EN')
  const [loadingText, setLoadingText] = useState(loadingSteps.EN[0])

  const current = translations[language]
  const analysisText = result?.message || ''
  const score = getScore(analysisText)
  const metrics = generateMetrics(analysisText, score)

  const analyzeFormula = async () => {
    if (!inci.trim()) return

    setLoading(true)
    setResult(null)
    setLoadingText(loadingSteps[language][0])

    let step = 0

    const interval = setInterval(() => {
      step = (step + 1) % loadingSteps[language].length
      setLoadingText(loadingSteps[language][step])
    }, 1400)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inci, language }),
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({
        message: 'Analysis service is currently unavailable. Please try again.',
      })
    }

    clearInterval(interval)
    setLoading(false)
  }

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <header style={styles.header}>
          <div>
            <div style={styles.badge}>{current.badge}</div>
            <div style={styles.logo}>FORMULENS LAB</div>
          </div>

          <div style={styles.langs}>
            {['EN', 'DE', 'RU'].map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  setLanguage(lang)
                  setResult(null)
                  setLoadingText(loadingSteps[lang][0])
                }}
                style={{
                  ...styles.langButton,
                  ...(language === lang ? styles.langActive : {}),
                }}
              >
                {lang}
              </button>
            ))}
          </div>
        </header>

        <section style={styles.hero}>
          <h1 style={styles.title}>{current.title}</h1>
          <p style={styles.subtitle}>{current.subtitle}</p>
        </section>

        <section style={styles.grid}>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>{current.analyzeTitle}</h2>

            <textarea
              value={inci}
              onChange={(e) => setInci(e.target.value)}
              placeholder={current.placeholder}
              style={styles.textarea}
            />

            <div style={styles.counter}>
              {inci.length}/5000 {current.counter}
            </div>

            <button
              onClick={analyzeFormula}
              disabled={loading}
              style={styles.button}
            >
              {loading ? loadingText : current.button}
            </button>
          </div>

          <div style={styles.resultColumn}>
            <h2 style={styles.cardTitle}>{current.resultTitle}</h2>

            {!loading && !analysisText && (
              <div style={styles.empty}>{current.empty}</div>
            )}

            {loading && (
              <div style={styles.loadingCard}>
                <div style={styles.loadingOrb}></div>
                <div style={styles.loadingText}>{loadingText}</div>
              </div>
            )}

            {!loading && analysisText && (
              <>
                <div style={styles.scoreCard}>
                  <div style={styles.score}>{score}</div>

                  <div>
                    <h3 style={styles.scoreTitle}>{current.score}</h3>
                    <p style={styles.text}>
                      {extractSection(analysisText, 'FORMULA SCORE')}
                    </p>
                  </div>
                </div>

                <div style={styles.metricsGrid}>
                  {metrics.map((metric) => (
                    <div key={metric.id} style={styles.metricCard}>
                      <div style={styles.metricHeader}>
                        <span style={styles.metricTitle}>
                          {current.metrics[metric.id]}
                        </span>
                        <span
                          style={{
                            ...styles.metricValue,
                            color: metric.color,
                          }}
                        >
                          {metric.value}
                        </span>
                      </div>

                      <div style={styles.metricBar}>
                        <div
                          style={{
                            ...styles.metricFill,
                            width: `${Math.min(metric.value, 100)}%`,
                            background: metric.color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {sections.slice(1).map((section) => {
                  const content = extractSection(analysisText, section)
                  if (!content) return null

                  return (
                    <div key={section} style={styles.resultCard}>
                      <h3 style={styles.sectionTitle}>
                        {current.sectionNames[section]}
                      </h3>
                      <p style={styles.text}>{content}</p>
                    </div>
                  )
                })}
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background:
      'radial-gradient(circle at top left, #2b1055 0%, #090909 40%)',
    color: 'white',
    padding: '40px',
    fontFamily: 'Arial, sans-serif',
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '70px',
  },
  badge: {
    color: '#b388ff',
    letterSpacing: '3px',
    fontSize: '14px',
    marginBottom: '14px',
  },
  logo: {
    fontSize: '32px',
    fontWeight: '800',
  },
  langs: {
    display: 'flex',
    gap: '12px',
  },
  langButton: {
    background: '#111',
    color: 'white',
    border: '1px solid #333',
    borderRadius: '10px',
    padding: '10px 18px',
    cursor: 'pointer',
    fontWeight: '700',
  },
  langActive: {
    background: 'linear-gradient(90deg,#7b2ff7,#f107a3)',
    border: '1px solid transparent',
  },
  hero: {
    maxWidth: '820px',
    marginBottom: '60px',
  },
  title: {
    fontSize: 'clamp(48px, 7vw, 86px)',
    lineHeight: '0.95',
    margin: 0,
    fontWeight: '900',
  },
  subtitle: {
    fontSize: '24px',
    lineHeight: '1.5',
    color: '#d5d5dc',
    marginTop: '32px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '32px',
    alignItems: 'start',
  },
  card: {
    background: '#0d0d12',
    border: '1px solid #242430',
    borderRadius: '28px',
    padding: '30px',
  },
  cardTitle: {
    fontSize: '28px',
    marginTop: 0,
    marginBottom: '25px',
  },
  textarea: {
    width: '100%',
    height: '260px',
    background: '#050505',
    border: '1px solid #222',
    borderRadius: '20px',
    color: 'white',
    padding: '20px',
    fontSize: '17px',
    resize: 'none',
    outline: 'none',
    boxSizing: 'border-box',
  },
  counter: {
    marginTop: '12px',
    color: '#777',
    fontSize: '14px',
  },
  button: {
    width: '100%',
    marginTop: '24px',
    padding: '20px',
    border: 'none',
    borderRadius: '18px',
    background: 'linear-gradient(90deg,#7b2ff7,#f107a3)',
    color: 'white',
    fontSize: '17px',
    fontWeight: '800',
    cursor: 'pointer',
  },
  resultColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  scoreCard: {
    background: '#0d0d12',
    border: '1px solid #242430',
    borderRadius: '28px',
    padding: '26px',
    display: 'flex',
    gap: '24px',
    alignItems: 'center',
  },
  score: {
    minWidth: '88px',
    height: '88px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg,#7b2ff7,#33d2ff)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '38px',
    fontWeight: '900',
  },
  scoreTitle: {
    color: '#d19cff',
    margin: 0,
    marginBottom: '10px',
    fontSize: '20px',
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '18px',
  },
  metricCard: {
    background: '#0d0d12',
    border: '1px solid #242430',
    borderRadius: '20px',
    padding: '20px',
  },
  metricHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '14px',
  },
  metricTitle: {
    color: '#f5f5f5',
    fontWeight: '700',
    fontSize: '15px',
  },
  metricValue: {
    fontWeight: '900',
    fontSize: '22px',
  },
  metricBar: {
    width: '100%',
    height: '10px',
    background: '#1a1a22',
    borderRadius: '999px',
    overflow: 'hidden',
  },
  metricFill: {
    height: '100%',
    borderRadius: '999px',
  },
  resultCard: {
    background: '#0d0d12',
    border: '1px solid #242430',
    borderRadius: '24px',
    padding: '26px',
  },
  sectionTitle: {
    color: '#d19cff',
    fontSize: '15px',
    letterSpacing: '2px',
    marginTop: 0,
    marginBottom: '18px',
  },
  text: {
    color: '#f2f2f2',
    lineHeight: '1.8',
    fontSize: '16px',
    margin: 0,
    whiteSpace: 'pre-wrap',
  },
  empty: {
    background: '#0d0d12',
    border: '1px solid #242430',
    borderRadius: '28px',
    padding: '30px',
    color: '#999',
    minHeight: '220px',
    lineHeight: '1.7',
  },
  loadingCard: {
    background: '#0d0d12',
    border: '1px solid #242430',
    borderRadius: '28px',
    padding: '30px',
    color: '#cfcfcf',
    minHeight: '220px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '20px',
  },
  loadingOrb: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg,#7b2ff7,#33d2ff)',
    boxShadow: '0 0 50px rgba(123,47,247,0.8)',
  },
  loadingText: {
    color: '#d5d5dc',
    fontSize: '17px',
    fontWeight: '700',
    textAlign: 'center',
  },
}
