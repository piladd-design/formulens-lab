'use client'

import { useState } from 'react'
import Link from 'next/link'

const translations = {
  DE: {
    back: '← Home Care Dashboard',
    title: 'Hautanalyse',
    subtitle:
      'AI-Diagnostik für Homecare: Feuchtigkeit, Pigmentierung, Falten und Akne / entzündliche Elemente.',
    photo: 'Hautfoto',
    upload: 'Hautfoto hochladen',
    analyze: '✨ Haut analysieren',
    analyzing: 'Analyse läuft...',
    empty: 'Laden Sie ein Foto hoch und starten Sie die Analyse.',
    score: 'Hautindex Homecare',
    hydration: 'Feuchtigkeit',
    pigmentation: 'Pigmentierung',
    wrinkles: 'Falten',
    acne: 'Akne / Entzündungen',
    strategy: 'Ihre Pflegestrategie',
    mainLine: 'Hauptlinie',
    secondaryLine: 'Zusätzliche Linie',
    spf: 'Täglicher Schutz',
    priorities: 'Hauptaufgaben der Haut',
    skinType: 'Hauttyp',
    result: 'Analyseergebnis',
    morning: 'Homecare Routine — Morgen',
    evening: 'Homecare Routine — Abend',
    products: 'Summecosmetics Empfehlung',
    note: 'Professioneller Hinweis',
  },
  RU: {
    back: '← Домашний уход',
    title: 'Анализ кожи',
    subtitle:
      'AI-диагностика для домашнего ухода: увлажнение, пигментация, морщины и акне / воспалительные элементы.',
    photo: 'Фото кожи',
    upload: 'Загрузить фото кожи',
    analyze: '✨ Анализировать кожу',
    analyzing: 'Анализируем...',
    empty: 'Загрузите фото и запустите анализ кожи.',
    score: 'Индекс кожи Homecare',
    hydration: 'Увлажнение',
    pigmentation: 'Пигментация',
    wrinkles: 'Морщины',
    acne: 'Акне / воспаления',
    strategy: 'Ваша стратегия ухода',
    mainLine: 'Основная линия',
    secondaryLine: 'Дополнительная линия',
    spf: 'Ежедневная защита',
    priorities: 'Основные задачи кожи',
    skinType: 'Тип кожи',
    result: 'Результат анализа',
    morning: 'Домашняя рутина — утро',
    evening: 'Домашняя рутина — вечер',
    products: 'Рекомендации Summecosmetics',
    note: 'Профессиональное примечание',
  },
  EN: {
    back: '← Home Care Dashboard',
    title: 'Skin Analysis',
    subtitle:
      'AI diagnostics for homecare: hydration, pigmentation, wrinkles and acne / inflammatory elements.',
    photo: 'Skin photo',
    upload: 'Upload skin photo',
    analyze: '✨ Analyze skin',
    analyzing: 'Analyzing...',
    empty: 'Upload a photo and start the skin analysis.',
    score: 'Homecare Skin Index',
    hydration: 'Hydration',
    pigmentation: 'Pigmentation',
    wrinkles: 'Wrinkles',
    acne: 'Acne / inflammation',
    strategy: 'Your care strategy',
    mainLine: 'Main line',
    secondaryLine: 'Additional line',
    spf: 'Daily protection',
    priorities: 'Main skin priorities',
    skinType: 'Skin type',
    result: 'Analysis result',
    morning: 'Homecare routine — morning',
    evening: 'Homecare routine — evening',
    products: 'Summecosmetics recommendation',
    note: 'Professional note',
  },
}

function clamp(value) {
  const number = Number(value)
  if (Number.isNaN(number)) return 0
  return Math.max(0, Math.min(100, number))
}

function getHydrationColor(value) {
  if (value < 31) return '#ff3b5c'
  if (value < 61) return '#ffb020'
  return '#38ef7d'
}

function getProblemColor(value) {
  if (value < 31) return '#38ef7d'
  if (value < 61) return '#ffb020'
  return '#ff3b5c'
}

function ScoreBar({ label, value, type }) {
  const safeValue = clamp(value)
  const color =
    type === 'hydration'
      ? getHydrationColor(safeValue)
      : getProblemColor(safeValue)

  return (
    <div style={styles.scoreItem}>
      <div style={styles.scoreTop}>
        <span>{label}</span>
        <strong>{safeValue}/100</strong>
      </div>

      <div style={styles.track}>
        <div
          style={{
            ...styles.fill,
            width: `${safeValue}%`,
            background: color,
          }}
        />
      </div>
    </div>
  )
}

function TextCard({ title, children }) {
  return (
    <div style={styles.textCard}>
      <h3 style={styles.cardTitle}>{title}</h3>
      <div style={styles.cardText}>{children}</div>
    </div>
  )
}

export default function SkinAnalysisPage() {
  const [lang, setLang] = useState('RU')
  const [image, setImage] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const t = translations[lang]

  function handleFileChange(event) {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()

    reader.onloadend = () => {
      setImage(reader.result)
      setResult(null)
      setError('')
    }

    reader.readAsDataURL(file)
  }

  async function analyzeSkin() {
    if (!image || loading) return

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/skin-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image,
          lang,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed')
      }

      setResult(data)
    } catch (err) {
      console.error(err)
      setError('Analysis failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const overallScore = clamp(result?.overallScore)
  const hydration = clamp(result?.hydration)
  const pigmentation = clamp(result?.pigmentation)
  const wrinkles = clamp(result?.wrinkles)
  const acne = clamp(result?.acne)

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <div style={styles.top}>
          <Link href="/client/homecare" style={styles.back}>
            {t.back}
          </Link>

          <div style={styles.langs}>
            {['DE', 'RU', 'EN'].map((item) => (
              <button
                key={item}
                onClick={() => setLang(item)}
                style={{
                  ...styles.langButton,
                  ...(lang === item ? styles.langButtonActive : {}),
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <section style={styles.hero}>
          <h1 style={styles.title}>{t.title}</h1>
          <p style={styles.subtitle}>{t.subtitle}</p>
        </section>

        <section style={styles.grid}>
          <div style={styles.panel}>
            <h2 style={styles.panelTitle}>{t.photo}</h2>

            <label style={styles.uploadBox}>
              {image ? (
                <img src={image} alt="Skin preview" style={styles.preview} />
              ) : (
                <span>{t.upload}</span>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </label>

            <button
              onClick={analyzeSkin}
              disabled={!image || loading}
              style={{
                ...styles.primaryButton,
                opacity: !image || loading ? 0.55 : 1,
                cursor: !image || loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? t.analyzing : t.analyze}
            </button>

            {error && <p style={styles.error}>{error}</p>}
          </div>

          <div style={styles.panel}>
            {!result ? (
              <div style={styles.empty}>{t.empty}</div>
            ) : (
              <>
                <div style={styles.scoreHeader}>
                  <div style={styles.circle}>{overallScore}</div>

                  <div>
                    <div style={styles.bigScore}>{overallScore}/100</div>
                    <div style={styles.scoreLabel}>{t.score}</div>
                  </div>
                </div>

                <ScoreBar
                  label={t.hydration}
                  value={hydration}
                  type="hydration"
                />
                <ScoreBar
                  label={t.pigmentation}
                  value={pigmentation}
                  type="problem"
                />
                <ScoreBar
                  label={t.wrinkles}
                  value={wrinkles}
                  type="problem"
                />
                <ScoreBar label={t.acne} value={acne} type="problem" />
              </>
            )}
          </div>
        </section>

        {result && (
          <>
            <section style={styles.strategyGrid}>
              <TextCard title={t.strategy}>
                <div style={styles.strategyRows}>
                  <div style={styles.strategyRow}>
                    <span>{t.mainLine}</span>
                    <strong>{result.recommendedLines?.main || '-'}</strong>
                  </div>

                  <div style={styles.strategyRow}>
                    <span>{t.secondaryLine}</span>
                    <strong>
                      {result.recommendedLines?.secondary || '-'}
                    </strong>
                  </div>

                  <div style={styles.strategyRow}>
                    <span>{t.spf}</span>
                    <strong>
                      {result.recommendedLines?.spf || 'SUMMESUN SPF50+'}
                    </strong>
                  </div>
                </div>
              </TextCard>

              <TextCard title={t.priorities}>
                {Array.isArray(result.priorities) &&
                result.priorities.length > 0 ? (
                  <ol style={styles.priorityList}>
                    {result.priorities.slice(0, 3).map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ol>
                ) : (
                  <p>-</p>
                )}
              </TextCard>

              <TextCard title={t.skinType}>
                <p>{result.skinType || '-'}</p>
              </TextCard>
            </section>

            <section style={styles.cardsGrid}>
              <TextCard title={t.result}>
                <p>{result.summary}</p>
              </TextCard>

              <TextCard title={t.morning}>
                <p>{result.morningRoutine}</p>
              </TextCard>

              <TextCard title={t.evening}>
                <p>{result.eveningRoutine}</p>
              </TextCard>

              <TextCard title={t.products}>
                <p>{result.summecosmetics}</p>
              </TextCard>

              <TextCard title={t.note}>
                <p>{result.professionalNote}</p>
              </TextCard>
            </section>
          </>
        )}
      </div>
    </main>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background:
      'radial-gradient(circle at top left, #1b0f2f 0%, #050510 38%, #000 100%)',
    color: '#fff',
    padding: '56px 24px 90px',
    fontFamily:
      'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '24px',
    marginBottom: '60px',
  },
  back: {
    color: '#b9b9c9',
    textDecoration: 'none',
    fontSize: '15px',
  },
  langs: {
    display: 'flex',
    gap: '10px',
  },
  langButton: {
    border: '1px solid rgba(255,255,255,0.18)',
    background: 'rgba(0,0,0,0.35)',
    color: '#fff',
    borderRadius: '14px',
    padding: '10px 16px',
    fontWeight: 800,
    cursor: 'pointer',
  },
  langButtonActive: {
    background: 'linear-gradient(135deg, #7b2cff, #ff0a8a)',
    borderColor: 'transparent',
  },
  hero: {
    marginBottom: '48px',
  },
  title: {
    fontSize: 'clamp(54px, 7vw, 86px)',
    lineHeight: 0.95,
    margin: '0 0 28px',
    fontWeight: 950,
    letterSpacing: '-0.06em',
  },
  subtitle: {
    maxWidth: '760px',
    color: '#d8d8e5',
    fontSize: '22px',
    lineHeight: 1.5,
    margin: 0,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '32px',
    alignItems: 'stretch',
  },
  panel: {
    background: 'rgba(11, 11, 26, 0.92)',
    border: '1px solid rgba(255,255,255,0.10)',
    borderRadius: '28px',
    padding: '34px',
    minHeight: '470px',
    boxShadow: '0 30px 80px rgba(0,0,0,0.35)',
  },
  panelTitle: {
    fontSize: '30px',
    margin: '0 0 24px',
    fontWeight: 900,
  },
  uploadBox: {
    height: '300px',
    border: '1px dashed rgba(255,255,255,0.24)',
    borderRadius: '22px',
    background: '#050505',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#c9c9d8',
    fontSize: '20px',
    overflow: 'hidden',
    cursor: 'pointer',
    marginBottom: '24px',
  },
  preview: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  primaryButton: {
    width: '100%',
    border: 'none',
    borderRadius: '18px',
    padding: '20px 24px',
    background: 'linear-gradient(135deg, #7b2cff, #ff0a8a)',
    color: '#fff',
    fontSize: '20px',
    fontWeight: 900,
  },
  error: {
    marginTop: '16px',
    color: '#ff758f',
  },
  empty: {
    height: '100%',
    minHeight: '390px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#a9a9bb',
    fontSize: '22px',
    lineHeight: 1.4,
  },
  scoreHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    marginBottom: '28px',
  },
  circle: {
    width: '118px',
    height: '118px',
    borderRadius: '999px',
    background: 'linear-gradient(135deg, #7b2cff, #ff0a8a)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '44px',
    fontWeight: 950,
  },
  bigScore: {
    fontSize: '44px',
    fontWeight: 950,
    letterSpacing: '-0.04em',
  },
  scoreLabel: {
    color: '#aaaabc',
    marginTop: '6px',
  },
  scoreItem: {
    border: '1px solid rgba(255,255,255,0.10)',
    background: 'rgba(255,255,255,0.025)',
    borderRadius: '18px',
    padding: '18px',
    marginBottom: '16px',
  },
  scoreTop: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '12px',
    fontWeight: 850,
  },
  track: {
    height: '9px',
    borderRadius: '999px',
    background: 'rgba(255,255,255,0.10)',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: '999px',
  },
  strategyGrid: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 1fr 1fr',
    gap: '26px',
    marginTop: '34px',
  },
  cardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '26px',
    marginTop: '26px',
  },
  textCard: {
    background: 'rgba(11, 11, 26, 0.92)',
    border: '1px solid rgba(255,255,255,0.10)',
    borderRadius: '24px',
    padding: '28px',
    minHeight: '170px',
  },
  cardTitle: {
    fontSize: '25px',
    lineHeight: 1.05,
    margin: '0 0 20px',
    fontWeight: 950,
  },
  cardText: {
    color: '#f1f1f8',
    fontSize: '17px',
    lineHeight: 1.65,
    whiteSpace: 'pre-line',
  },
  strategyRows: {
    display: 'grid',
    gap: '14px',
  },
  strategyRow: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    borderBottom: '1px solid rgba(255,255,255,0.09)',
    paddingBottom: '12px',
  },
  priorityList: {
    margin: 0,
    paddingLeft: '22px',
  },
}
