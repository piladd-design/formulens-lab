'use client'

import Link from 'next/link'
import { useState } from 'react'

const translations = {
  DE: {
    back: '← Professional Dashboard',
    pageTitle: 'Hautanalyse PRO',
    subtitle:
      'Professionelle Hautdiagnostik anhand von 7 Parametern: Feuchtigkeit, Hautbarriere, Textur, Pigmentierung, Sebum, Altersanzeichen und Festigkeit.',

    uploadTitle: 'Kundenfoto',
    uploadPhoto: 'Kundenfoto hochladen',
    analyze: '✨ Haut analysieren',
    analyzing: 'AI analysiert die Haut...',
    uploadHint:
      'Laden Sie ein Kundenfoto hoch und geben Sie das Alter der Kundin ein.',

    age: 'Alter',
    agePlaceholder: 'z.B. 45',

    overview: 'Professionelle Hautbewertung',
    score: 'Professioneller Hautindex',
    diagnosticMap: 'Diagnostische Hautkarte',

    interpretation: 'Professionelle Interpretation',
    strategy: 'Behandlungsstrategie',
    homecare: 'Homecare-Empfehlung',
    directions: 'Empfohlene Summecosmetics Linien',

    hydration: 'Dehydrierung / Feuchtigkeit',
    barrier: 'Barrierestörung',
    texture: 'Textur & Poren',
    pigmentation: 'Pigmentierung',
    sebum: 'Sebum',
    aging: 'Altersanzeichen',
    firmness: 'Festigkeitsverlust',

    error: 'Analyse fehlgeschlagen. Bitte versuchen Sie es erneut.',
  },

  RU: {
    back: '← Профессиональная панель',
    pageTitle: 'Анализ кожи PRO',
    subtitle:
      'Расширенная профессиональная диагностика кожи по 7 параметрам: увлажнение, барьер, текстура, пигментация, себум, возрастные признаки и упругость.',

    uploadTitle: 'Фото клиента',
    uploadPhoto: 'Загрузить фото клиента',
    analyze: '✨ Анализировать кожу',
    analyzing: 'AI анализирует кожу...',
    uploadHint: 'Загрузите фото клиента и укажите возраст.',

    age: 'Возраст',
    agePlaceholder: 'например: 45',

    overview: 'Профессиональная оценка кожи',
    score: 'Профессиональный индекс кожи',
    diagnosticMap: 'Диагностическая карта',

    interpretation: 'Профессиональная интерпретация',
    strategy: 'Стратегия процедуры',
    homecare: 'Домашний протокол',
    directions: 'Рекомендуемые линии Summecosmetics',

    hydration: 'Обезвоженность',
    barrier: 'Нарушение барьера',
    texture: 'Текстура и поры',
    pigmentation: 'Пигментация',
    sebum: 'Себум',
    aging: 'Возрастные признаки',
    firmness: 'Снижение упругости',

    error: 'Ошибка анализа. Попробуйте ещё раз.',
  },

  EN: {
    back: '← Professional Dashboard',
    pageTitle: 'Skin Analysis PRO',
    subtitle:
      'Advanced professional skin diagnostics across 7 parameters: hydration, barrier condition, texture, pigmentation, sebum balance, aging signs and firmness.',

    uploadTitle: 'Client Photo',
    uploadPhoto: 'Upload Client Photo',
    analyze: '✨ Analyze Skin',
    analyzing: 'AI is analyzing the skin...',
    uploadHint: 'Upload a client photo and enter the client age.',

    age: 'Age',
    agePlaceholder: 'e.g. 45',

    overview: 'Professional Skin Overview',
    score: 'Professional Skin Score',
    diagnosticMap: 'Diagnostic Map',

    interpretation: 'Professional Interpretation',
    strategy: 'Treatment Strategy',
    homecare: 'Homecare Protocol',
    directions: 'Recommended Summecosmetics Lines',

    hydration: 'Dehydration',
    barrier: 'Barrier Disturbance',
    texture: 'Texture & Pores',
    pigmentation: 'Pigmentation',
    sebum: 'Sebum',
    aging: 'Aging Signs',
    firmness: 'Firmness Loss',

    error: 'Analysis failed. Please try again.',
  },
}

export default function ProSkinPage() {
  const [lang, setLang] = useState('DE')
  const [image, setImage] = useState(null)
  const [imageData, setImageData] = useState('')
  const [age, setAge] = useState('')
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const t = translations[lang]

  const uploadImage = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    setImage(URL.createObjectURL(file))
    setAnalysis(null)
    setError('')

    const reader = new FileReader()
    reader.onload = () => {
      setImageData(reader.result)
    }
    reader.readAsDataURL(file)
  }

  async function analyzeSkin() {
    if (!imageData) return

    setLoading(true)
    setError('')
    setAnalysis(null)

    try {
      const response = await fetch('/api/pro-skin-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: imageData,
          lang,
          age,
        }),
      })

      const data = await response.json()

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Skin analysis failed')
      }

      setAnalysis(data.analysis)
    } catch (err) {
      console.error(err)
      setError(t.error)
    } finally {
      setLoading(false)
    }
  }

  const metrics = analysis
    ? [
        {
          label: t.hydration,
          value: analysis.hydration,
          status: analysis.hydrationStatus,
        },
        {
          label: t.barrier,
          value: analysis.barrier,
          status: analysis.barrierStatus,
        },
        {
          label: t.texture,
          value: analysis.texture,
          status: analysis.textureStatus,
        },
        {
          label: t.pigmentation,
          value: analysis.pigmentation,
          status: analysis.pigmentationStatus,
        },
        {
          label: t.sebum,
          value: analysis.sebum,
          status: analysis.sebumStatus,
        },
        {
          label: t.aging,
          value: analysis.aging,
          status: analysis.agingStatus,
        },
        {
          label: t.firmness,
          value: analysis.firmness,
          status: analysis.firmnessStatus,
        },
      ]
    : []

  return (
    <main style={styles.main}>
      <div style={styles.wrap}>
        <div style={styles.topBar}>
          <Link href="/pro" style={styles.back}>
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

        <h1 style={styles.h1}>{t.pageTitle}</h1>

        <p style={styles.sub}>{t.subtitle}</p>

        <section style={styles.grid}>
          <div style={styles.panel}>
            <h2 style={styles.h2}>{t.uploadTitle}</h2>

            <Field
              label={t.age}
              value={age}
              onChange={setAge}
              placeholder={t.agePlaceholder}
            />

            <label style={{ cursor: 'pointer' }}>
              <div style={styles.uploadBox}>
                {image ? (
                  <img src={image} alt="Skin preview" style={styles.image} />
                ) : (
                  t.uploadPhoto
                )}
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={uploadImage}
                style={{ display: 'none' }}
              />
            </label>

            <button
              onClick={analyzeSkin}
              disabled={!imageData || loading}
              style={{
                ...styles.primaryBtn,
                opacity: imageData && !loading ? 1 : 0.45,
                cursor: imageData && !loading ? 'pointer' : 'not-allowed',
              }}
            >
              {loading ? t.analyzing : t.analyze}
            </button>
          </div>

          <div style={styles.panel}>
            {!analysis && !error && !loading && (
              <div style={styles.empty}>{t.uploadHint}</div>
            )}

            {loading && <div style={styles.empty}>{t.analyzing}</div>}

            {error && <div style={styles.error}>{error}</div>}

            {analysis && (
              <>
                <h2 style={styles.h2}>{t.overview}</h2>

                <p style={styles.text}>{analysis.overview}</p>

                <div style={styles.scoreBox}>
                  <div style={styles.scoreCircle}>
                    {safeNumber(analysis.overallScore)}
                  </div>

                  <div>
                    <div style={styles.scoreText}>
                      {safeNumber(analysis.overallScore)}/100
                    </div>
                    <div style={styles.scoreLabel}>{t.score}</div>
                  </div>
                </div>

                {Array.isArray(analysis.topPriorities) && (
                  <div style={styles.priorityBox}>
                    {analysis.topPriorities.map((item, index) => (
                      <span key={index} style={styles.priority}>
                        {item}
                      </span>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {analysis && (
          <>
            <section style={styles.visualSection}>
              <h2 style={styles.h2}>{t.diagnosticMap}</h2>

              <div style={styles.metricGrid}>
                {metrics.map((metric) => (
                  <Metric key={metric.label} metric={metric} />
                ))}
              </div>
            </section>

            <section style={styles.resultGrid}>
              <Info title={t.interpretation}>{analysis.interpretation}</Info>
              <Info title={t.strategy}>{analysis.strategy}</Info>
              <Info title={t.homecare}>{analysis.homecare}</Info>
              <Info title={t.directions}>{analysis.recommendedLines}</Info>
            </section>
          </>
        )}
      </div>
    </main>
  )
}

function Field({ label, value, onChange, placeholder }) {
  return (
    <label style={styles.fieldLabel}>
      <span>{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={styles.input}
      />
    </label>
  )
}

function Metric({ metric }) {
  const value = safeNumber(metric.value)

  return (
    <div style={styles.metric}>
      <div style={styles.metricHeader}>
        <span>{metric.label}</span>
        <strong>{metric.status || ''}</strong>
      </div>

      <div style={styles.barBg}>
        <div
          style={{
            width: `${value}%`,
            height: '100%',
            background: getBarColor(value),
          }}
        />
      </div>

      <div style={styles.metricFooter}>
        <span>{value}/100</span>
        <span>{getPriority(value)}</span>
      </div>
    </div>
  )
}

function Info({ title, children }) {
  if (!children) return null

  return (
    <div style={styles.info}>
      <h3 style={styles.infoTitle}>{title}</h3>
      <p style={styles.infoText}>{children}</p>
    </div>
  )
}

function safeNumber(value) {
  return Math.max(0, Math.min(100, Number(value) || 0))
}

function getBarColor(value) {
  if (value >= 70) return 'linear-gradient(90deg,#ff4d6d,#ff00aa)'
  if (value >= 45) return 'linear-gradient(90deg,#f59e0b,#ff00aa)'
  return 'linear-gradient(90deg,#7b2cff,#ff00aa)'
}

function getPriority(value) {
  if (value >= 70) return 'Высокий приоритет'
  if (value >= 45) return 'Средний приоритет'
  return 'Низкий приоритет'
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
    maxWidth: '1400px',
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
    maxWidth: '920px',
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
  fieldLabel: {
    display: 'grid',
    gap: '8px',
    color: '#d8d8d8',
    fontSize: '14px',
    fontWeight: 700,
  },
  input: {
    width: '100%',
    maxWidth: '220px',
    borderRadius: '14px',
    border: '1px solid #262626',
    background: '#050505',
    color: 'white',
    padding: '14px',
    fontSize: '15px',
    outline: 'none',
  },
  uploadBox: {
    height: '390px',
    marginTop: '22px',
    borderRadius: '24px',
    border: '1px dashed #444',
    background: '#050505',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    color: '#aaa',
    fontSize: '22px',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  primaryBtn: {
    width: '100%',
    marginTop: '22px',
    padding: '22px',
    borderRadius: '20px',
    border: 'none',
    background: 'linear-gradient(90deg,#7b2cff,#ff00aa)',
    color: 'white',
    fontSize: '20px',
    fontWeight: 900,
  },
  empty: {
    minHeight: '420px',
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
  text: {
    color: '#d4d4d4',
    lineHeight: 1.7,
    fontSize: '18px',
  },
  scoreBox: {
    marginTop: '30px',
    display: 'flex',
    alignItems: 'center',
    gap: '26px',
    background: '#0d0d18',
    border: '1px solid #252525',
    borderRadius: '24px',
    padding: '24px',
  },
  scoreCircle: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg,#7b2cff,#ff00aa)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '44px',
    fontWeight: 900,
  },
  scoreText: {
    fontSize: '42px',
    fontWeight: 900,
  },
  scoreLabel: {
    color: '#aaa',
    marginTop: '8px',
  },
  priorityBox: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginTop: '22px',
  },
  priority: {
    padding: '9px 13px',
    borderRadius: '999px',
    background: 'rgba(255,0,170,0.14)',
    border: '1px solid rgba(255,0,170,0.35)',
    color: '#ff8adc',
    fontWeight: 800,
    fontSize: '14px',
  },
  visualSection: {
    marginTop: '34px',
    background: 'rgba(12,12,24,0.92)',
    border: '1px solid #242424',
    borderRadius: '30px',
    padding: '34px',
  },
  metricGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))',
    gap: '20px',
  },
  metric: {
    background: '#0d0d18',
    border: '1px solid #252525',
    borderRadius: '20px',
    padding: '20px',
  },
  metricHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '14px',
    marginBottom: '14px',
    color: '#e8e8e8',
    fontWeight: 700,
  },
  barBg: {
    height: '12px',
    background: '#1c1c1c',
    borderRadius: '999px',
    overflow: 'hidden',
  },
  metricFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '12px',
    color: '#aaa',
    fontSize: '14px',
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
    whiteSpace: 'pre-line',
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
