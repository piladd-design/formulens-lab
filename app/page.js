'use client'

import { useState } from 'react'

const translations = {
  EN: {
    badge: 'AI COSMETIC INTELLIGENCE',
    title: 'Understand your cosmetic formula.',
    subtitle:
      'Paste an INCI list and receive a clear, clinical-style ingredient analysis for safety, benefits and potential concerns.',

    analyzeTitle: 'Analyze Formula',
    resultTitle: 'Analysis Result',

    placeholder: 'Aqua, Glycerin, Niacinamide...',
    button: 'Analyze Formula',
    loading: 'Analyzing...',

    empty:
      'Your AI analysis will appear here after submitting a formula.',

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
    subtitle:
      'Fügen Sie eine INCI-Liste ein und erhalten Sie eine klare professionelle Analyse zu Nutzen, Sicherheit und möglichen Risiken.',

    analyzeTitle: 'Formel analysieren',
    resultTitle: 'Analyseergebnis',

    placeholder: 'Aqua, Glycerin, Niacinamide...',
    button: 'Formel analysieren',
    loading: 'Analyse läuft...',

    empty:
      'Ihre KI-Analyse erscheint hier nach dem Absenden der Formel.',

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
    subtitle:
      'Вставьте INCI-состав и получите понятный профессиональный анализ пользы, безопасности и возможных рисков.',

    analyzeTitle: 'Анализ формулы',
    resultTitle: 'Результат анализа',

    placeholder: 'Aqua, Glycerin, Niacinamide...',
    button: 'Анализировать формулу',
    loading: 'Анализируем...',

    empty:
      'Результат ИИ-анализа появится здесь после отправки формулы.',

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

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          inci,
          language,
        }),
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

  const styles = {
    page: {
      minHeight: '100vh',
      background: '#000',
      color: '#fff',
      padding: '80px 40px',
      fontFamily: 'Inter, sans-serif',
      backgroundImage:
        'radial-gradient(circle at top left, rgba(120,0,255,0.35), transparent 40%)',
    },

    container: {
      maxWidth: '1400px',
      margin: '0 auto',
    },

    top: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '60px',
    },

    logo: {
      fontSize: '18px',
      letterSpacing: '3px',
      color: '#b46cff',
      marginBottom: '20px',
    },

    brand: {
      fontSize: '52px',
      fontWeight: '800',
      marginBottom: '30px',
    },

    title: {
      fontSize: '92px',
      lineHeight: '0.95',
      fontWeight: '900',
      maxWidth: '820px',
      marginBottom: '30px',
    },

    subtitle: {
      fontSize: '20px',
      lineHeight: '1.7',
      color: '#d0d0d0',
      maxWidth: '760px',
    },

    langWrap: {
      display: 'flex',
      gap: '12px',
    },

    langBtn: active => ({
      padding: '10px 16px',
      borderRadius: '12px',
      border: active
        ? '1px solid #ff00aa'
        : '1px solid rgba(255,255,255,0.12)',

      background: active
        ? 'linear-gradient(90deg,#7c3aed,#ff00aa)'
        : 'transparent',

      color: '#fff',
      cursor: 'pointer',
      fontWeight: '700',
    }),

    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '30px',
      marginTop: '60px',
    },

    card: {
      background: 'rgba(10,10,18,0.92)',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: '30px',
      padding: '30px',
    },

    sectionTitle: {
      fontSize: '24px',
      fontWeight: '800',
      marginBottom: '25px',
    },

    textarea: {
      width: '100%',
      height: '240px',
      background: '#000',
      color: '#fff',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '20px',
      padding: '20px',
      fontSize: '18px',
      resize: 'none',
      outline: 'none',
    },

    button: {
      width: '100%',
      marginTop: '25px',
      padding: '22px',
      borderRadius: '18px',
      border: 'none',
      background:
        'linear-gradient(90deg,#7c3aed 0%, #ff00aa 100%)',

      color: '#fff',
      fontWeight: '800',
      fontSize: '18px',
      cursor: 'pointer',
    },

    scoreCard: {
      display: 'flex',
      alignItems: 'center',
      gap: '25px',
      marginBottom: '25px',
    },

    scoreCircle: {
      width: '90px',
      height: '90px',
      borderRadius: '50%',
      background:
        'linear-gradient(135deg,#7c3aed,#40c9ff)',

      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

      fontSize: '42px',
      fontWeight: '900',
    },

    metrics: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '16px',
      marginBottom: '25px',
    },

    metricCard: {
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '20px',
      padding: '18px',
    },

    metricTop: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '12px',
      fontWeight: '700',
    },

    progressBg: {
      width: '100%',
      height: '10px',
      borderRadius: '20px',
      background: 'rgba(255,255,255,0.06)',
    },

    progress: value => ({
      width: `${value}%`,
      height: '10px',
      borderRadius: '20px',
      background:
        'linear-gradient(90deg,#7c3aed,#ff00aa)',
    }),

    section: {
      background: 'rgba(255,255,255,0.02)',
      borderRadius: '24px',
      padding: '24px',
      marginTop: '20px',
    },

    sectionHeading: {
      color: '#d48cff',
      letterSpacing: '2px',
      fontWeight: '800',
      marginBottom: '20px',
      fontSize: '15px',
    },

    list: {
      display: 'flex',
      flexDirection: 'column',
      gap: '14px',
      color: '#f0f0f0',
      lineHeight: '1.7',
    },

    emptyBox: {
      opacity: 0.6,
      lineHeight: '1.8',
    },
  }

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <div style={styles.top}>
          <div>
            <div style={styles.logo}>{t.badge}</div>

            <div style={styles.brand}>
              FORMULENS LAB
            </div>

            <h1 style={styles.title}>
              {t.title}
            </h1>

            <p style={styles.subtitle}>
              {t.subtitle}
            </p>
          </div>

          <div style={styles.langWrap}>
            {['EN', 'DE', 'RU'].map(lang => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                style={styles.langBtn(
                  language === lang
                )}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        <div style={styles.grid}>
          <div style={styles.card}>
            <div style={styles.sectionTitle}>
              {t.analyzeTitle}
            </div>

            <textarea
              value={inci}
              onChange={e =>
                setInci(e.target.value)
              }
              placeholder={t.placeholder}
              style={styles.textarea}
            />

            <button
              onClick={analyzeFormula}
              style={styles.button}
            >
              {loading ? t.loading : t.button}
            </button>
          </div>

          <div style={styles.card}>
            <div style={styles.sectionTitle}>
              {t.resultTitle}
            </div>

            {!result ? (
              <div style={styles.emptyBox}>
                {t.empty}
              </div>
            ) : (
              <>
                <div style={styles.scoreCard}>
                  <div style={styles.scoreCircle}>
                    {result.formulaScore}
                  </div>

                  <div>
                    <div
                      style={{
                        color: '#d48cff',
                        fontWeight: '800',
                        fontSize: '26px',
                        marginBottom: '8px',
                      }}
                    >
                      {t.formulaScore}
                    </div>

                    <div
                      style={{
                        fontSize: '20px',
                      }}
                    >
                      {result.formulaScore}/100
                    </div>
                  </div>
                </div>

                <div style={styles.metrics}>
                  {[
                    {
                      label: t.hydration,
                      value: result.hydration,
                    },

                    {
                      label: t.barrier,
                      value: result.barrierSupport,
                    },

                    {
                      label: t.antiAging,
                      value: result.antiAging,
                    },

                    {
                      label: t.acne,
                      value: result.acneSafety,
                    },

                    {
                      label: t.irritation,
                      value:
                        100 -
                        result.irritationRisk,
                    },
                  ].map(metric => (
                    <div
                      key={metric.label}
                      style={styles.metricCard}
                    >
                      <div style={styles.metricTop}>
                        <span>
                          {metric.label}
                        </span>

                        <span>
                          {metric.value}
                        </span>
                      </div>

                      <div style={styles.progressBg}>
                        <div
                          style={styles.progress(
                            metric.value
                          )}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div style={styles.section}>
                  <div
                    style={styles.sectionHeading}
                  >
                    {t.benefits}
                  </div>

                  <div style={styles.list}>
                    {result.keyBenefits?.map(
                      (item, index) => (
                        <div key={index}>
                          — {item}
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div style={styles.section}>
                  <div
                    style={styles.sectionHeading}
                  >
                    {t.ingredients}
                  </div>

                  <div style={styles.list}>
                    {result.keyIngredients?.map(
                      (item, index) => (
                        <div key={index}>
                          <strong>
                            {item.name}
                          </strong>
                          : {item.description}
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div style={styles.section}>
                  <div
                    style={styles.sectionHeading}
                  >
                    {t.concerns}
                  </div>

                  <div style={styles.list}>
                    {result.potentialConcerns?.map(
                      (item, index) => (
                        <div key={index}>
                          — {item}
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div style={styles.section}>
                  <div
                    style={styles.sectionHeading}
                  >
                    {t.bestFor}
                  </div>

                  <div style={styles.list}>
                    {result.bestFor?.map(
                      (item, index) => (
                        <div key={index}>
                          — {item}
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div style={styles.section}>
                  <div
                    style={styles.sectionHeading}
                  >
                    {t.conclusion}
                  </div>

                  <div
                    style={{
                      lineHeight: '1.8',
                    }}
                  >
                    {
                      result.professionalConclusion
                    }
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
