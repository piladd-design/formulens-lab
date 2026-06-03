'use client'

import Link from 'next/link'
import { useState } from 'react'

const translations = {
  DE: {
    back: '← Professional Dashboard',
    title: 'AI Beauty Advisor',
    subtitle:
      'Professionelle Soforthilfe für kosmetische Situationen: Rötung, Reaktion nach Peeling, Brennen, Spannungsgefühl, Barriereprobleme und Pflegeentscheidungen.',

    question: 'Frage / Situation',
    questionPlaceholder:
      'z.B. Nach dem Peeling ist starke Rötung aufgetreten. Was soll ich tun?',
    age: 'Alter',
    agePlaceholder: 'z.B. 42',
    context: 'Zusätzlicher Hautkontext',
    contextPlaceholder:
      'z.B. empfindliche Haut, Couperose, Retinol-Nutzung, trockene Haut...',
    ask: '✨ Empfehlung erhalten',
    asking: 'AI erstellt Empfehlung...',
    empty:
      'Beschreiben Sie eine kosmetische Situation, um eine professionelle Empfehlung zu erhalten.',
    error: 'Empfehlung konnte nicht erstellt werden. Bitte versuchen Sie es erneut.',

    situation: 'Was passiert wahrscheinlich?',
    immediateSteps: 'Sofortmaßnahmen',
    avoid: 'Vorübergehend vermeiden',
    lines: 'Empfohlene Summecosmetics Linien',
    recommendation: 'Professionelle Empfehlung',
    whenToStop: 'Wann ist zusätzliche Vorsicht sinnvoll?',
    clientMessage: 'Nachricht an die Kundin',
  },

  RU: {
    back: '← Профессиональная панель',
    title: 'AI Консультант Косметолога',
    subtitle:
      'Профессиональная быстрая помощь для косметолога: покраснение, реакция после пилинга, жжение, стянутость, нарушение барьера и выбор ухода.',

    question: 'Вопрос / ситуация',
    questionPlaceholder:
      'например: После пилинга у клиента появилось сильное покраснение. Что делать?',
    age: 'Возраст',
    agePlaceholder: 'например: 42',
    context: 'Дополнительный контекст кожи',
    contextPlaceholder:
      'например: чувствительная кожа, купероз, ретинол, сухость...',
    ask: '✨ Получить рекомендацию',
    asking: 'AI готовит рекомендацию...',
    empty:
      'Опишите косметологическую ситуацию, чтобы получить профессиональную рекомендацию.',
    error: 'Не удалось создать рекомендацию. Попробуйте ещё раз.',

    situation: 'Что, вероятно, происходит?',
    immediateSteps: 'Что сделать сразу',
    avoid: 'Что временно исключить',
    lines: 'Рекомендуемые линии Summecosmetics',
    recommendation: 'Профессиональная рекомендация',
    whenToStop: 'Когда необходима дополнительная консультация?',
    clientMessage: 'Сообщение для клиента',
  },

  EN: {
    back: '← Professional Dashboard',
    title: 'AI Beauty Advisor',
    subtitle:
      'Professional quick support for cosmetic situations: redness, post-peel reaction, burning, tightness, barrier issues and care decisions.',

    question: 'Question / Situation',
    questionPlaceholder:
      'e.g. Strong redness appeared after peeling. What should I do?',
    age: 'Age',
    agePlaceholder: 'e.g. 42',
    context: 'Additional Skin Context',
    contextPlaceholder:
      'e.g. sensitive skin, couperose, retinol use, dry skin...',
    ask: '✨ Get Recommendation',
    asking: 'AI is preparing recommendation...',
    empty:
      'Describe a cosmetic situation to receive a professional recommendation.',
    error: 'Recommendation could not be created. Please try again.',

    situation: 'What is probably happening?',
    immediateSteps: 'Immediate steps',
    avoid: 'Temporarily avoid',
    lines: 'Recommended Summecosmetics Lines',
    recommendation: 'Professional Recommendation',
    whenToStop: 'When is additional caution needed?',
    clientMessage: 'Client message',
  },
}

export default function BeautyAdvisorPage() {
  const [lang, setLang] = useState('DE')
  const [question, setQuestion] = useState('')
  const [clientAge, setClientAge] = useState('')
  const [skinContext, setSkinContext] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const t = translations[lang]

  async function askAdvisor() {
    if (!question.trim()) return

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await fetch('/api/beauty-advisor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          lang,
          clientAge,
          skinContext,
        }),
      })

      const data = await response.json()

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Beauty advisor failed')
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
          <Link href="/pro" style={styles.back}>
            {t.back}
          </Link>

          <div style={styles.langSwitch}>
            {['DE', 'RU', 'EN'].map((item) => (
              <button
                key={item}
                onClick={() => {
                  setLang(item)
                  setResult(null)
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
            <h2 style={styles.h2}>{t.question}</h2>

            <textarea
              value={question}
              onChange={(e) => {
                setQuestion(e.target.value)
                setResult(null)
                setError('')
              }}
              placeholder={t.questionPlaceholder}
              style={styles.textarea}
            />

            <div style={styles.formGrid}>
              <Field
                label={t.age}
                value={clientAge}
                onChange={setClientAge}
                placeholder={t.agePlaceholder}
              />
            </div>

            <label style={styles.fieldLabel}>
              <span>{t.context}</span>
              <textarea
                value={skinContext}
                onChange={(e) => setSkinContext(e.target.value)}
                placeholder={t.contextPlaceholder}
                style={styles.smallTextarea}
              />
            </label>

            <button
              onClick={askAdvisor}
              disabled={!question.trim() || loading}
              style={{
                ...styles.primaryBtn,
                opacity: question.trim() && !loading ? 1 : 0.45,
                cursor:
                  question.trim() && !loading ? 'pointer' : 'not-allowed',
              }}
            >
              {loading ? t.asking : t.ask}
            </button>
          </div>

          <div style={styles.panel}>
            {!result && !error && !loading && (
              <div style={styles.empty}>{t.empty}</div>
            )}

            {loading && <div style={styles.empty}>{t.asking}</div>}

            {error && <div style={styles.error}>{error}</div>}

            {result && (
              <>
                <h2 style={styles.h2}>{result.title || t.recommendation}</h2>

                <Info title={t.situation}>{result.situation}</Info>

                <List title={t.immediateSteps} items={result.immediateSteps} />

                <List title={t.avoid} items={result.avoid} />

                <List title={t.lines} items={result.summecosmeticsLines} />
              </>
            )}
          </div>
        </section>

        {result && (
          <section style={styles.resultGrid}>
            <Info title={t.recommendation}>
              {result.professionalRecommendation}
            </Info>

            <Info title={t.whenToStop}>{result.whenToStop}</Info>

            <Info title={t.clientMessage}>{result.clientMessage}</Info>
          </section>
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

function Info({ title, children }) {
  if (!children) return null

  return (
    <div style={styles.info}>
      <h3 style={styles.infoTitle}>{title}</h3>
      <p style={styles.infoText}>{children}</p>
    </div>
  )
}

function List({ title, items }) {
  if (!Array.isArray(items) || !items.length) return null

  return (
    <div style={styles.info}>
      <h3 style={styles.infoTitle}>{title}</h3>
      <ul style={styles.list}>
        {items.map((item, index) => (
          <li key={index} style={styles.listItem}>
            {item}
          </li>
        ))}
      </ul>
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
  textarea: {
    width: '100%',
    minHeight: '230px',
    background: '#050505',
    border: '1px solid #262626',
    borderRadius: '22px',
    color: 'white',
    padding: '22px',
    fontSize: '18px',
    resize: 'vertical',
    outline: 'none',
    lineHeight: 1.6,
    marginBottom: '18px',
  },
  smallTextarea: {
    width: '100%',
    minHeight: '110px',
    background: '#050505',
    border: '1px solid #262626',
    borderRadius: '18px',
    color: 'white',
    padding: '16px',
    fontSize: '16px',
    resize: 'vertical',
    outline: 'none',
    lineHeight: 1.5,
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))',
    gap: '14px',
    marginBottom: '18px',
  },
  fieldLabel: {
    display: 'grid',
    gap: '8px',
    color: '#d8d8d8',
    fontSize: '14px',
    fontWeight: 700,
    marginBottom: '18px',
  },
  input: {
    width: '100%',
    borderRadius: '14px',
    border: '1px solid #262626',
    background: '#050505',
    color: 'white',
    padding: '14px',
    fontSize: '15px',
    outline: 'none',
  },
  primaryBtn: {
    width: '100%',
    marginTop: '4px',
    padding: '22px',
    borderRadius: '20px',
    border: 'none',
    background: 'linear-gradient(90deg,#7b2cff,#ff00aa)',
    color: 'white',
    fontSize: '20px',
    fontWeight: 900,
  },
  empty: {
    minHeight: '500px',
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
  resultGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))',
    gap: '24px',
    marginTop: '34px',
  },
  info: {
    background: '#0d0d18',
    border: '1px solid #252525',
    borderRadius: '22px',
    padding: '22px',
    marginBottom: '18px',
  },
  infoTitle: {
    fontSize: '22px',
    marginTop: 0,
    marginBottom: '14px',
  },
  infoText: {
    color: '#d4d4d4',
    lineHeight: 1.8,
    fontSize: '17px',
    whiteSpace: 'pre-line',
    margin: 0,
  },
  list: {
    margin: 0,
    paddingLeft: '22px',
    color: '#d4d4d4',
    lineHeight: 1.8,
    fontSize: '17px',
  },
  listItem: {
    marginBottom: '8px',
  },
}
