'use client'

import Link from 'next/link'
import { useState } from 'react'

const translations = {
  DE: {
    back: '← Professional Dashboard',
    title: 'Protokoll Builder',
    subtitle:
      'Erstellen Sie ein professionelles Behandlungsprotokoll anhand von Alter, Hauttyp, Sensibilität, Fototyp, Hautproblemen und Behandlungsziel.',
    clientData: 'Kundendaten',
    age: 'Alter',
    agePlaceholder: 'Zum Beispiel: 45',
    skinType: 'Hauttyp',
    skinTypePlaceholder: 'Zum Beispiel: trocken',
    sensitivity: 'Hautsensibilität',
    sensitivityPlaceholder: 'Niedrig, mittel oder hoch',
    phototype: 'Fototyp',
    phototypePlaceholder: 'I, II, III, IV, V oder VI',
    concerns: 'Hauptprobleme',
    concernsPlaceholder: 'Zum Beispiel: Falten, Erschlaffung',
    goal: 'Behandlungsziel',
    goalPlaceholder: 'Zum Beispiel: Feuchtigkeit',
    create: '✨ Protokoll erstellen',
    creating: 'Protokoll wird erstellt...',
    empty:
      'Füllen Sie die Kundendaten aus, um ein professionelles Behandlungsprotokoll zu erstellen.',
    diagnosis: 'PROFESSIONELLE DIAGNOSE',
    aiSummary: 'AI Zusammenfassung',
    strategy: 'FORMULENS STRATEGIE',
    primaryStrategy: 'Primäre Strategie',
    supportStrategies: 'Unterstützende Strategien',
    recommendedLines: 'Empfohlene Linien',
    activeFocus: 'Aktiver Fokus',
    mainLine: 'Hauptlinie',
    variant: 'Variante',
    course: 'Kurs',
    homecare: 'Homecare Unterstützung',
    amount: 'Menge',
    exposure: 'Einwirkzeit',
    removal: 'Entfernung',
    note: 'Hinweis',
    error: 'Fehler',
  },

  RU: {
    back: '← Профессиональная панель',
    title: 'Конструктор протоколов',
    subtitle:
      'Создание профессионального протокола процедуры по возрасту, типу кожи, чувствительности, фототипу, проблемам кожи и цели процедуры.',
    clientData: 'Данные клиента',
    age: 'Возраст',
    agePlaceholder: 'Например: 55',
    skinType: 'Тип кожи',
    skinTypePlaceholder: 'Например: сухая',
    sensitivity: 'Чувствительность кожи',
    sensitivityPlaceholder: 'Низкая, средняя или высокая',
    phototype: 'Фототип',
    phototypePlaceholder: 'I, II, III, IV, V или VI',
    concerns: 'Основные проблемы',
    concernsPlaceholder: 'Например: морщины, дряблость',
    goal: 'Цель процедуры',
    goalPlaceholder: 'Например: увлажнение',
    create: '✨ Создать протокол',
    creating: 'Протокол создаётся...',
    empty:
      'Заполните данные клиента, чтобы создать профессиональный протокол.',
    diagnosis: 'ПРОФЕССИОНАЛЬНАЯ ДИАГНОСТИКА',
    aiSummary: 'AI резюме',
    strategy: 'СТРАТЕГИЯ FORMULENS',
    primaryStrategy: 'Основная стратегия',
    supportStrategies: 'Поддерживающие стратегии',
    recommendedLines: 'Рекомендуемые линии',
    activeFocus: 'Активный фокус',
    mainLine: 'Основная линия',
    variant: 'Вариант',
    course: 'Курс',
    homecare: 'Домашняя поддержка',
    amount: 'Количество',
    exposure: 'Экспозиция',
    removal: 'Удаление',
    note: 'Примечание',
    error: 'Ошибка',
  },

  EN: {
    back: '← Professional Dashboard',
    title: 'Protocol Builder',
    subtitle:
      'Create a professional treatment protocol based on age, skin type, sensitivity, phototype, skin concerns and treatment goal.',
    clientData: 'Client Data',
    age: 'Age',
    agePlaceholder: 'Example: 55',
    skinType: 'Skin Type',
    skinTypePlaceholder: 'Example: dry',
    sensitivity: 'Skin Sensitivity',
    sensitivityPlaceholder: 'Low, medium or high',
    phototype: 'Phototype',
    phototypePlaceholder: 'I, II, III, IV, V or VI',
    concerns: 'Main Concerns',
    concernsPlaceholder: 'Example: wrinkles, sagging',
    goal: 'Treatment Goal',
    goalPlaceholder: 'Example: hydration',
    create: '✨ Create Protocol',
    creating: 'Creating protocol...',
    empty:
      'Fill in the client data to create a professional treatment protocol.',
    diagnosis: 'PROFESSIONAL DIAGNOSIS',
    aiSummary: 'AI Summary',
    strategy: 'FORMULENS STRATEGY',
    primaryStrategy: 'Primary Strategy',
    supportStrategies: 'Supporting Strategies',
    recommendedLines: 'Recommended Lines',
    activeFocus: 'Active Focus',
    mainLine: 'Main Line',
    variant: 'Variant',
    course: 'Course',
    homecare: 'Homecare Support',
    amount: 'Amount',
    exposure: 'Exposure',
    removal: 'Removal',
    note: 'Note',
    error: 'Error',
  },
}

export default function ProProtocolPage() {
  const [lang, setLang] = useState('RU')
  const [clientAge, setClientAge] = useState('')
  const [skinType, setSkinType] = useState('')
  const [sensitivity, setSensitivity] = useState('')
  const [phototype, setPhototype] = useState('')
  const [concerns, setConcerns] = useState('')
  const [goal, setGoal] = useState('')

  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const t = translations[lang]

  const canCreate =
    clientAge.trim() &&
    skinType.trim() &&
    sensitivity.trim() &&
    phototype.trim() &&
    concerns.trim() &&
    goal.trim()

  const resetResult = () => {
    setDone(false)
    setResult(null)
    setError('')
  }

  const createProtocol = async () => {
    if (!canCreate || loading) return

    setLoading(true)
    setError('')
    setResult(null)
    setDone(false)

    try {
      const res = await fetch('/api/professional', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lang,
          age: clientAge,
          skinType,
          sensitivity,
          phototype,
          concerns: concerns
            .split(',')
            .map((item) => item.trim())
            .filter(Boolean),
          goal,
        }),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Protocol generation failed')
      }

      setResult(data)
      setDone(true)
    } catch (err) {
      setError(err.message || 'Protocol generation failed')
    } finally {
      setLoading(false)
    }
  }

  const strategy = result?.strategy
  const protocolRoot = result?.protocol
  const treatment = protocolRoot?.treatment || protocolRoot?.protocol
  const decision = protocolRoot?.decision
  const variant = protocolRoot?.variant

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
                  resetResult()
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
            <h2 style={styles.h2}>{t.clientData}</h2>

            <Field label={t.age} value={clientAge} setValue={setClientAge} placeholder={t.agePlaceholder} reset={resetResult} />
            <Field label={t.skinType} value={skinType} setValue={setSkinType} placeholder={t.skinTypePlaceholder} reset={resetResult} />
            <Field label={t.sensitivity} value={sensitivity} setValue={setSensitivity} placeholder={t.sensitivityPlaceholder} reset={resetResult} />
            <Field label={t.phototype} value={phototype} setValue={setPhototype} placeholder={t.phototypePlaceholder} reset={resetResult} />
            <TextArea label={t.concerns} value={concerns} setValue={setConcerns} placeholder={t.concernsPlaceholder} reset={resetResult} />
            <TextArea label={t.goal} value={goal} setValue={setGoal} placeholder={t.goalPlaceholder} reset={resetResult} />

            <button
              onClick={createProtocol}
              disabled={!canCreate || loading}
              style={{
                ...styles.primaryBtn,
                opacity: canCreate && !loading ? 1 : 0.45,
                cursor: canCreate && !loading ? 'pointer' : 'not-allowed',
              }}
            >
              {loading ? t.creating : t.create}
            </button>
          </div>

          <div style={styles.panel}>
            {!done && !error ? (
              <div style={styles.empty}>{t.empty}</div>
            ) : null}

            {error ? (
              <div style={styles.errorBox}>
                <h2 style={styles.h2}>{t.error}</h2>
                <p style={styles.text}>{error}</p>
              </div>
            ) : null}

            {done && result ? (
              <>
                <h2 style={styles.h2}>{t.diagnosis}</h2>

                <div style={styles.badge}>{treatment?.mainLine || decision?.mainLine}</div>
                <div style={styles.protocolName}>
                  {treatment?.variantName || variant?.variantName}
                </div>

                {result.summary ? (
                  <div style={styles.infoBox}>
                    <h3 style={styles.infoTitle}>{t.aiSummary}</h3>
                    <p style={styles.text}>{result.summary}</p>
                  </div>
                ) : null}

                <div style={styles.infoBox}>
                  <h3 style={styles.infoTitle}>{t.strategy}</h3>

                  <InfoLine title={t.primaryStrategy}>
                    <strong>{strategy?.primaryStrategy?.name}</strong>
                    <br />
                    {strategy?.primaryStrategy?.reason}
                  </InfoLine>

                  <InfoLine title={t.supportStrategies}>
                    {strategy?.secondaryStrategies?.map((item) => (
                      <div key={item.id} style={styles.smallCard}>
                        <strong>{item.name}</strong>
                        <br />
                        {item.reason}
                      </div>
                    ))}
                  </InfoLine>

                  <InfoLine title={t.recommendedLines}>
                    {strategy?.recommendedLines?.join(' / ')}
                  </InfoLine>

                  <InfoLine title={t.activeFocus}>
                    {strategy?.activeIngredients?.join(' / ')}
                  </InfoLine>
                </div>
              </>
            ) : null}
          </div>
        </section>

        {done && treatment ? (
          <>
            <section style={styles.protocolSection}>
              <h2 style={styles.h2}>{treatment.title}</h2>

              <div style={styles.metaGrid}>
                <Meta title={t.mainLine}>{treatment.mainLine}</Meta>
                <Meta title={t.variant}>{treatment.variantName}</Meta>
                <Meta title={t.course}>{treatment.course}</Meta>
              </div>

              {treatment.courseNote ? (
                <p style={styles.courseNote}>{treatment.courseNote}</p>
              ) : null}

              <div style={styles.phases}>
                {treatment.phases?.map((phase) => (
                  <div key={phase.title} style={styles.phase}>
                    <h3 style={styles.phaseTitle}>{phase.title}</h3>

                    <div style={styles.steps}>
                      {phase.steps?.map((step, index) => (
                        <StepCard
                          key={step.id || `${phase.title}-${index}`}
                          step={step}
                          index={index}
                          labels={t}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section style={styles.resultGrid}>
              <Info title={t.homecare}>
                {treatment.homecareSupport?.join('\n')}
              </Info>

              {treatment.equipment?.length ? (
                <Info title="Equipment">
                  {treatment.equipment
                    .map((item) => `${item.name}${item.usage ? ` — ${item.usage}` : ''}`)
                    .join('\n')}
                </Info>
              ) : null}

              {treatment.reason ? (
                <Info title="FORMULENS Reason">{treatment.reason}</Info>
              ) : null}
            </section>
          </>
        ) : null}
      </div>
    </main>
  )
}

function Field({ label, value, setValue, placeholder, reset }) {
  return (
    <>
      <label style={styles.label}>{label}</label>
      <input
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          reset()
        }}
        placeholder={placeholder}
        style={styles.input}
      />
    </>
  )
}

function TextArea({ label, value, setValue, placeholder, reset }) {
  return (
    <>
      <label style={styles.label}>{label}</label>
      <textarea
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          reset()
        }}
        placeholder={placeholder}
        style={styles.textarea}
      />
    </>
  )
}

function InfoLine({ title, children }) {
  return (
    <div style={styles.infoLine}>
      <div style={styles.infoLabel}>{title}</div>
      <div style={styles.infoValue}>{children}</div>
    </div>
  )
}

function Meta({ title, children }) {
  return (
    <div style={styles.meta}>
      <div style={styles.metaTitle}>{title}</div>
      <div style={styles.metaText}>{children}</div>
    </div>
  )
}

function StepCard({ step, index, labels }) {
  return (
    <div style={styles.step}>
      <div style={styles.stepNumber}>{String(index + 1).padStart(2, '0')}</div>

      <div>
        <h4 style={styles.stepTitle}>{step.name}</h4>
        <div style={styles.stepLine}>{step.line}</div>
        <div style={styles.stepCategory}>{step.category}</div>

        {step.instruction ? (
          <p style={styles.stepText}>{step.instruction}</p>
        ) : null}

        <div style={styles.stepMetaGrid}>
          {step.amount ? <Mini title={labels.amount}>{step.amount}</Mini> : null}
          {step.exposure ? <Mini title={labels.exposure}>{step.exposure}</Mini> : null}
          {step.removal ? <Mini title={labels.removal}>{step.removal}</Mini> : null}
        </div>

        {step.note ? (
          <p style={styles.note}>
            <strong>{labels.note}: </strong>
            {step.note}
          </p>
        ) : null}
      </div>
    </div>
  )
}

function Mini({ title, children }) {
  return (
    <div style={styles.mini}>
      <div style={styles.miniTitle}>{title}</div>
      <div style={styles.miniText}>{children}</div>
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
  label: {
    display: 'block',
    color: '#bdbdbd',
    marginBottom: '10px',
    marginTop: '18px',
    fontSize: '16px',
  },
  input: {
    width: '100%',
    background: '#050505',
    border: '1px solid #262626',
    borderRadius: '18px',
    color: 'white',
    padding: '18px',
    fontSize: '18px',
    outline: 'none',
  },
  textarea: {
    width: '100%',
    minHeight: '120px',
    background: '#050505',
    border: '1px solid #262626',
    borderRadius: '18px',
    color: 'white',
    padding: '18px',
    fontSize: '18px',
    resize: 'vertical',
    outline: 'none',
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
    minHeight: '620px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#888',
    fontSize: '22px',
    textAlign: 'center',
    lineHeight: 1.6,
  },
  errorBox: {
    background: 'rgba(255,0,100,0.12)',
    border: '1px solid rgba(255,0,100,0.35)',
    borderRadius: '22px',
    padding: '24px',
  },
  text: {
    color: '#d4d4d4',
    lineHeight: 1.7,
    fontSize: '18px',
  },
  badge: {
    display: 'inline-block',
    padding: '10px 16px',
    borderRadius: '999px',
    background: 'linear-gradient(90deg,#7b2cff,#ff00aa)',
    fontWeight: 900,
    marginBottom: '14px',
  },
  protocolName: {
    fontSize: '24px',
    fontWeight: 900,
    marginBottom: '24px',
  },
  infoBox: {
    marginTop: '24px',
    background: '#0d0d18',
    border: '1px solid #252525',
    borderRadius: '22px',
    padding: '24px',
  },
  infoTitle: {
    fontSize: '24px',
    marginBottom: '16px',
  },
  infoLine: {
    borderTop: '1px solid #252525',
    paddingTop: '16px',
    marginTop: '16px',
  },
  infoLabel: {
    color: '#aaa',
    marginBottom: '8px',
    fontSize: '15px',
  },
  infoValue: {
    color: '#eee',
    lineHeight: 1.7,
    fontSize: '17px',
  },
  smallCard: {
    background: '#050505',
    border: '1px solid #262626',
    borderRadius: '16px',
    padding: '14px',
    marginBottom: '10px',
  },
  protocolSection: {
    marginTop: '34px',
    background: 'rgba(12,12,24,0.92)',
    border: '1px solid #242424',
    borderRadius: '30px',
    padding: '34px',
  },
  metaGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))',
    gap: '18px',
    marginBottom: '20px',
  },
  meta: {
    background: '#0d0d18',
    border: '1px solid #252525',
    borderRadius: '20px',
    padding: '18px',
  },
  metaTitle: {
    color: '#aaa',
    fontSize: '14px',
    marginBottom: '8px',
  },
  metaText: {
    fontSize: '18px',
    fontWeight: 800,
    lineHeight: 1.5,
  },
  courseNote: {
    color: '#d4d4d4',
    lineHeight: 1.7,
    fontSize: '17px',
    marginBottom: '28px',
  },
  phases: {
    display: 'grid',
    gap: '26px',
  },
  phase: {
    background: '#090912',
    border: '1px solid #222',
    borderRadius: '24px',
    padding: '24px',
  },
  phaseTitle: {
    fontSize: '26px',
    marginBottom: '18px',
  },
  steps: {
    display: 'grid',
    gap: '18px',
  },
  step: {
    display: 'grid',
    gridTemplateColumns: '80px 1fr',
    gap: '20px',
    background: '#0d0d18',
    border: '1px solid #252525',
    borderRadius: '22px',
    padding: '22px',
  },
  stepNumber: {
    width: '62px',
    height: '62px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg,#7b2cff,#ff00aa)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 900,
    fontSize: '18px',
  },
  stepTitle: {
    fontSize: '22px',
    marginBottom: '8px',
  },
  stepLine: {
    color: '#ff8bd8',
    fontWeight: 800,
    marginBottom: '6px',
  },
  stepCategory: {
    color: '#aaa',
    marginBottom: '12px',
  },
  stepText: {
    color: '#d4d4d4',
    lineHeight: 1.7,
    fontSize: '17px',
  },
  stepMetaGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))',
    gap: '12px',
    marginTop: '16px',
  },
  mini: {
    background: '#050505',
    border: '1px solid #262626',
    borderRadius: '16px',
    padding: '12px',
  },
  miniTitle: {
    color: '#aaa',
    fontSize: '13px',
    marginBottom: '6px',
  },
  miniText: {
    color: '#fff',
    fontWeight: 800,
    lineHeight: 1.4,
  },
  note: {
    marginTop: '14px',
    color: '#d4d4d4',
    lineHeight: 1.6,
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
  infoText: {
    color: '#d4d4d4',
    lineHeight: 1.8,
    fontSize: '17px',
    whiteSpace: 'pre-line',
  },
}
