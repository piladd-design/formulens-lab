'use client'

import Link from 'next/link'
import { useState } from 'react'

const translations = {
  DE: {
    back: '← Home Care Dashboard',
    title: 'Hautanalyse',
    subtitle:
      'AI-Diagnostik für Homecare: Feuchtigkeit, Pigmentierung, Falten und Akne / entzündliche Elemente.',
    photo: 'Hautfoto',
    upload: 'Hautfoto hochladen',
    analyze: '✨ Haut analysieren',
    analyzing: 'AI analysiert das Hautfoto...',
    empty: 'Laden Sie ein Foto hoch, um die Hautanalyse zu starten.',
    error: 'Hautanalyse fehlgeschlagen. Bitte versuchen Sie es erneut.',
    score: 'Homecare Skin Score',
    hydration: 'Feuchtigkeit',
    pigmentation: 'Pigmentierung',
    wrinkles: 'Falten',
    acne: 'Akne / Entzündungen',
    summary: 'Analyseergebnis',
    morning: 'Homecare Routine — Morgen',
    evening: 'Homecare Routine — Abend',
    products: 'Summecosmetics Empfehlung',
    professional: 'Hinweis',
  },

  RU: {
    back: '← Домашний уход',
    title: 'Анализ кожи',
    subtitle:
      'AI-диагностика для домашнего ухода: увлажнение, пигментация, морщины и акне / воспалительные элементы.',
    photo: 'Фото кожи',
    upload: 'Загрузить фото кожи',
    analyze: '✨ Анализировать кожу',
    analyzing: 'AI анализирует фото кожи...',
    empty: 'Загрузите фото для анализа кожи.',
    error: 'Ошибка анализа кожи. Попробуйте ещё раз.',
    score: 'Индекс кожи Homecare',
    hydration: 'Увлажнение',
    pigmentation: 'Пигментация',
    wrinkles: 'Морщины',
    acne: 'Акне / воспаления',
    summary: 'Результат анализа',
    morning: 'Домашняя рутина — утро',
    evening: 'Домашняя рутина — вечер',
    products: 'Рекомендации Summecosmetics',
    professional: 'Примечание',
  },

  EN: {
    back: '← Home Care Dashboard',
    title: 'Skin Analysis',
    subtitle:
      'AI diagnostics for homecare: hydration, pigmentation, wrinkles and acne / inflammatory elements.',
    photo: 'Skin Photo',
    upload: 'Upload Skin Photo',
    analyze: '✨ Analyze Skin',
    analyzing: 'AI is analyzing the skin photo...',
    empty: 'Upload a photo to start skin analysis.',
    error: 'Skin analysis failed. Please try again.',
    score: 'Homecare Skin Score',
    hydration: 'Hydration',
    pigmentation: 'Pigmentation',
    wrinkles: 'Wrinkles',
    acne: 'Acne / Inflammation',
    summary: 'Analysis Result',
    morning: 'Homecare Routine — Morning',
    evening: 'Homecare Routine — Evening',
    products: 'Summecosmetics Recommendation',
    professional: 'Note',
  },
}

export default function ClientSkinPage() {
  const [lang, setLang] = useState('DE')
  const [imagePreview, setImagePreview] = useState(null)
  const [imageBase64, setImageBase64] = useState('')
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const t = translations[lang]

  const uploadImage = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const previewUrl = URL.createObjectURL(file)
    setImagePreview(previewUrl)
    setAnalysis(null)
    setError('')

    const reader = new FileReader()

    reader.onloadend = () => {
      setImageBase64(reader.result)
    }

    reader.readAsDataURL(file)
  }

  const analyzeSkin = async () => {
    if (!imageBase64) return

    setLoading(true)
    setError('')
    setAnalysis(null)

    try {
      const response = await fetch('/api/skin-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: imageBase64,
          lang,
        }),
      })

      const data = await response.json()

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Skin analysis failed')
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
        { label: t.pigmentation, value: analysis.pigmentation },
        { label: t.wrinkles, value: analysis.wrinkles },
        { label: t.acne, value: analysis.acne },
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
            <h2 style={styles.h2}>{t.photo}</h2>

            <label style={{ cursor: 'pointer' }}>
              <div style={styles.uploadBox}>
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Skin preview"
                    style={styles.image}
                  />
                ) : (
                  t.upload
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
              disabled={!imageBase64 || loading}
              style={{
                ...styles.primaryBtn,
                opacity: imageBase64 && !loading ? 1 : 0.45,
                cursor: imageBase64 && !loading ? 'pointer' : 'not-allowed',
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
                    {safeScore(analysis.overallScore)}
                  </div>

                  <div>
                    <div style={styles.scoreText}>
                      {safeScore(analysis.overallScore)}/100
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

            <Info title={t.morning}>{analysis.morningRoutine}</Info>

            <Info title={t.evening}>{analysis.eveningRoutine}</Info>

            <Info title={t.products}>{analysis.summecosmetics}</Info>

            <Info title={t.professional}>{analysis.professionalNote}</Info>
          </section>
        )}
      </div>
    </main>
  )
}

function Metric({ label, value = 0 }) {
  const safeValue = safeScore(value)

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
            background: 'linear-gradient(90deg,#7b2cff,#ff00aa)',
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
      <p style={styles.infoText}>{children || '—'}</p>
    </div>
  )
}

function safeScore(value) {
  return Math.max(0, Math.min(100, Number(value) || 0))
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
    maxWidth: '880px',
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
  uploadBox: {
    height: '360px',
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
