'use client'

import { useState } from 'react'

const T = {
  RU: {
    badge: 'AI COSMETIC INTELLIGENCE',
    heroTitle: 'FORMULENS LAB',
    heroSub:
      'Профессиональный AI-инструмент для анализа кожи, формул и создания уходовых стратегий.',
    client: 'Я клиент',
    pro: 'Я косметолог',
    clientPrice: '9 €/мес',
    proPrice: '29 €/мес',
    trial: '7 дней бесплатно',
    chooseClient: 'Для домашнего ухода',
    choosePro: 'Для профессиональной работы',
    formulaTitle: 'Анализ формулы',
    formulaBtn: 'Анализировать формулу',
    formulaPlaceholder: 'Aqua, Glycerin, Niacinamide, Panthenol...',
    pdf: 'Скачать PDF-отчёт',
    skinTitleBasic: 'Basic Skin Analysis',
    skinTitlePro: 'Pro Skin Analysis',
    upload: 'Загрузить фото кожи',
    analyzeSkin: 'Анализировать кожу',
    result: 'Результат анализа',
    score: 'Skin Intelligence Score',
    benefits: 'Ключевые преимущества',
    conclusion: 'Профессиональный вывод',
    homeRoutine: 'Домашняя рутина',
    proProtocol: 'Профессиональный протокол',
    products: 'Рекомендации Summecosmetics',
  },
  DE: {
    badge: 'AI COSMETIC INTELLIGENCE',
    heroTitle: 'FORMULENS LAB',
    heroSub:
      'Professionelles AI-Tool für Hautanalyse, Formelanalyse und Pflege-Strategien.',
    client: 'Ich bin Kundin',
    pro: 'Ich bin Kosmetikerin',
    clientPrice: '9 €/Monat',
    proPrice: '29 €/Monat',
    trial: '7 Tage kostenlos',
    chooseClient: 'Für Homecare',
    choosePro: 'Für professionelle Arbeit',
    formulaTitle: 'Formelanalyse',
    formulaBtn: 'Formel analysieren',
    formulaPlaceholder: 'Aqua, Glycerin, Niacinamide, Panthenol...',
    pdf: 'PDF-Bericht herunterladen',
    skinTitleBasic: 'Basic Skin Analysis',
    skinTitlePro: 'Pro Skin Analysis',
    upload: 'Hautfoto hochladen',
    analyzeSkin: 'Haut analysieren',
    result: 'Analyseergebnis',
    score: 'Skin Intelligence Score',
    benefits: 'Wichtige Vorteile',
    conclusion: 'Professionelle Einschätzung',
    homeRoutine: 'Homecare Routine',
    proProtocol: 'Professionelles Behandlungsprotokoll',
    products: 'Summecosmetics Empfehlungen',
  },
  EN: {
    badge: 'AI COSMETIC INTELLIGENCE',
    heroTitle: 'FORMULENS LAB',
    heroSub:
      'Premium AI tool for skin analysis, formula analysis and cosmetic strategy.',
    client: 'I am a client',
    pro: 'I am a professional',
    clientPrice: '9 €/month',
    proPrice: '29 €/month',
    trial: '7 days free',
    chooseClient: 'For home skincare',
    choosePro: 'For professional work',
    formulaTitle: 'Formula Analysis',
    formulaBtn: 'Analyze Formula',
    formulaPlaceholder: 'Aqua, Glycerin, Niacinamide, Panthenol...',
    pdf: 'Download PDF Report',
    skinTitleBasic: 'Basic Skin Analysis',
    skinTitlePro: 'Pro Skin Analysis',
    upload: 'Upload skin photo',
    analyzeSkin: 'Analyze skin',
    result: 'Analysis Result',
    score: 'Skin Intelligence Score',
    benefits: 'Key Benefits',
    conclusion: 'Professional Conclusion',
    homeRoutine: 'Homecare Routine',
    proProtocol: 'Professional Treatment Protocol',
    products: 'Summecosmetics Recommendations',
  },
}

const basicMetrics = [
  { key: 'Увлажнение', value: 62 },
  { key: 'Пигментация', value: 54 },
  { key: 'Морщины', value: 48 },
]

const proMetrics = [
  { key: 'Увлажнение', value: 62 },
  { key: 'Барьер', value: 38 },
  { key: 'Текстура и поры', value: 55 },
  { key: 'Пигментация', value: 54 },
  { key: 'Себум', value: 58 },
  { key: 'Возрастные признаки', value: 48 },
  { key: 'Упругость', value: 52 },
]

export default function Home() {
  const [lang, setLang] = useState('RU')
  const [mode, setMode] = useState(null)
  const [formula, setFormula] = useState('')
  const [formulaDone, setFormulaDone] = useState(false)
  const [skinImage, setSkinImage] = useState(null)
  const [skinDone, setSkinDone] = useState(false)

  const t = T[lang]
  const metrics = mode === 'pro' ? proMetrics : basicMetrics

  const uploadImage = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setSkinImage(URL.createObjectURL(file))
    setSkinDone(false)
  }

  const downloadPdf = () => {
    const text = `
FORMULENS LAB

${mode === 'pro' ? 'PRO REPORT' : 'CLIENT REPORT'}

Formula:
${formula}

Skin Analysis:
${metrics.map((m) => `${m.key}: ${m.value}/100`).join('\n')}

Summecosmetics Strategy:
- Barrier support
- Hydration restoration
- Calming care
- Antioxidant protection
`
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'FORMULENS-LAB-REPORT.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <main style={styles.main}>
      <Language value={lang} setValue={setLang} />

      <section style={styles.hero}>
        <div style={styles.badge}>{t.badge}</div>
        <h1 style={styles.h1}>{t.heroTitle}</h1>
        <p style={styles.sub}>{t.heroSub}</p>

        <div style={styles.planGrid}>
          <PlanCard
            active={mode === 'client'}
            title={t.client}
            subtitle={t.chooseClient}
            price={t.clientPrice}
            onClick={() => setMode('client')}
          />
          <PlanCard
            active={mode === 'pro'}
            title={t.pro}
            subtitle={t.choosePro}
            price={t.proPrice}
            trial={t.trial}
            onClick={() => setMode('pro')}
          />
        </div>
      </section>

      {mode && (
        <>
          <section style={styles.grid}>
            <div style={styles.panel}>
              <h2 style={styles.h2}>{t.formulaTitle}</h2>
              <textarea
                value={formula}
                onChange={(e) => {
                  setFormula(e.target.value)
                  setFormulaDone(false)
                }}
                placeholder={t.formulaPlaceholder}
                style={styles.textarea}
              />

              <button
                onClick={() => formula.trim() && setFormulaDone(true)}
                style={styles.primaryBtn}
              >
                ✨ {t.formulaBtn}
              </button>

              {formulaDone && (
                <button onClick={downloadPdf} style={styles.secondaryBtn}>
                  {t.pdf}
                </button>
              )}
            </div>

            <div style={styles.panel}>
              {formulaDone ? (
                <>
                  <ScoreCircle value={90} />
                  <MetricBar label="Hydration" value={95} />
                  <MetricBar label="Barrier Support" value={85} />
                  <MetricBar label="Anti-Aging" value={80} />
                  <MetricBar label="Irritation Risk" value={5} green />
                  <Info title={t.benefits}>
                    Интенсивное увлажнение, поддержка барьера, низкий риск
                    раздражения и высокая совместимость с чувствительной кожей.
                  </Info>
                </>
              ) : (
                <Empty text="Введите INCI-состав и нажмите анализ." />
              )}
            </div>
          </section>

          <section style={styles.skinSection}>
            <h2 style={styles.h1}>
              {mode === 'pro' ? t.skinTitlePro : t.skinTitleBasic}
            </h2>

            <div style={styles.grid}>
              <div style={styles.panel}>
                <label style={{ cursor: 'pointer' }}>
                  <div style={styles.uploadBox}>
                    {skinImage ? (
                      <img src={skinImage} alt="" style={styles.image} />
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
                  onClick={() => skinImage && setSkinDone(true)}
                  style={styles.primaryBtn}
                >
                  ✨ {t.analyzeSkin}
                </button>
              </div>

              <div style={styles.panel}>
                {skinDone ? (
                  <>
                    <h3 style={styles.h2}>{t.result}</h3>
                    <p style={styles.text}>
                      Визуально наблюдаются признаки чувствительности,
                      нарушенной барьерной функции, воспалительной активности и
                      снижения влагоудержания.
                    </p>
                    <SkinBars metrics={metrics} />
                  </>
                ) : (
                  <Empty text="Загрузите фото для анализа кожи." />
                )}
              </div>
            </div>

            {skinDone && (
              <div style={styles.resultGrid}>
                <Info title={t.homeRoutine}>
                  GLACIAR для увлажнения, NICELY для барьера и чувствительности,
                  CELL C для сияния и антиоксидантной поддержки.
                </Info>

                {mode === 'pro' && (
                  <Info title={t.proProtocol}>
                    Очищение ESSENTIAL, успокаивающий протокол NICELY,
                    восстановление барьера, затем мягкая работа с текстурой и
                    пигментацией.
                  </Info>
                )}

                <Info title={t.products}>
                  GLACIAR · NICELY · BECLARITY · CELL C · MYCODE ADVANCED
                </Info>
              </div>
            )}
          </section>
        </>
      )}
    </main>
  )
}

function Language({ value, setValue }) {
  return (
    <div style={styles.lang}>
      {['EN', 'DE', 'RU'].map((l) => (
        <button
          key={l}
          onClick={() => setValue(l)}
          style={{
            ...styles.langBtn,
            background:
              value === l ? 'linear-gradient(135deg,#7b2cff,#ff00aa)' : 'transparent',
          }}
        >
          {l}
        </button>
      ))}
    </div>
  )
}

function PlanCard({ title, subtitle, price, trial, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        ...styles.plan,
        border: active ? '1px solid #ff00aa' : '1px solid #242424',
      }}
    >
      <h2>{title}</h2>
      <p>{subtitle}</p>
      <strong>{price}</strong>
      {trial && <span>{trial}</span>}
    </button>
  )
}

function ScoreCircle({ value }) {
  return (
    <div style={styles.scoreWrap}>
      <div style={styles.circle}>{value}</div>
      <div>
        <div style={styles.scoreText}>{value}/100</div>
        <div style={styles.good}>✔ Excellent</div>
      </div>
    </div>
  )
}

function MetricBar({ label, value, green }) {
  return (
    <div style={styles.metric}>
      <div style={styles.metricTop}>
        <span>{label}</span>
        <b>{value}/100</b>
      </div>
      <div style={styles.barBg}>
        <div
          style={{
            width: `${value}%`,
            height: '100%',
            background: green ? '#44ff88' : 'linear-gradient(90deg,#7b2cff,#ff00aa)',
          }}
        />
      </div>
    </div>
  )
}

function SkinBars({ metrics }) {
  return (
    <div style={{ marginTop: 28 }}>
      {metrics.map((m) => (
        <MetricBar key={m.key} label={m.key} value={m.value} />
      ))}
    </div>
  )
}

function Info({ title, children }) {
  return (
    <div style={styles.info}>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  )
}

function Empty({ text }) {
  return <div style={styles.empty}>{text}</div>
}

const styles = {
  main: {
    minHeight: '100vh',
    background: 'radial-gradient(circle at top left,#1a1028 0%,#050505 35%,#000 100%)',
    color: 'white',
    padding: '60px 6%',
    fontFamily: 'Arial, sans-serif',
  },
  lang: { display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 40 },
  langBtn: {
    width: 58,
    height: 44,
    borderRadius: 14,
    border: '1px solid #333',
    color: 'white',
    fontWeight: 800,
    cursor: 'pointer',
  },
  hero: { textAlign: 'center', maxWidth: 1200, margin: '0 auto 70px' },
  badge: {
    display: 'inline-block',
    padding: '10px 18px',
    border: '1px solid #333',
    borderRadius: 999,
    letterSpacing: 3,
    color: '#c8c8c8',
    fontSize: 13,
  },
  h1: { fontSize: 'clamp(42px,6vw,76px)', fontWeight: 900, margin: '24px 0 18px' },
  h2: { fontSize: 34, marginBottom: 22 },
  sub: { color: '#bdbdbd', fontSize: 22, lineHeight: 1.6 },
  planGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, marginTop: 48 },
  plan: {
    background: 'rgba(12,12,24,.92)',
    borderRadius: 30,
    padding: 34,
    color: 'white',
    textAlign: 'left',
    cursor: 'pointer',
  },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 34, maxWidth: 1500, margin: '0 auto' },
  panel: {
    background: 'rgba(12,12,24,.92)',
    border: '1px solid #242424',
    borderRadius: 30,
    padding: 34,
  },
  textarea: {
    width: '100%',
    height: 260,
    background: '#050505',
    color: 'white',
    border: '1px solid #262626',
    borderRadius: 22,
    padding: 24,
    fontSize: 20,
  },
  primaryBtn: {
    width: '100%',
    marginTop: 24,
    padding: 24,
    borderRadius: 22,
    border: 'none',
    background: 'linear-gradient(90deg,#7b2cff,#ff00aa)',
    color: 'white',
    fontSize: 21,
    fontWeight: 900,
    cursor: 'pointer',
  },
  secondaryBtn: {
    width: '100%',
    marginTop: 16,
    padding: 20,
    borderRadius: 22,
    border: '1px solid #333',
    background: 'transparent',
    color: 'white',
    fontSize: 18,
  },
  scoreWrap: { display: 'flex', alignItems: 'center', gap: 28, marginBottom: 28 },
  circle: {
    width: 140,
    height: 140,
    borderRadius: '50%',
    background: 'linear-gradient(135deg,#7b2cff,#ff00aa)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 52,
    fontWeight: 900,
  },
  scoreText: { fontSize: 50, fontWeight: 900 },
  good: { background: '#123d1f', color: '#66ff99', padding: '10px 18px', borderRadius: 14 },
  metric: { background: '#0d0d18', border: '1px solid #252525', borderRadius: 18, padding: 18, marginBottom: 16 },
  metricTop: { display: 'flex', justifyContent: 'space-between', marginBottom: 12 },
  barBg: { height: 10, background: '#1c1c1c', borderRadius: 99, overflow: 'hidden' },
  info: {
    marginTop: 24,
    background: '#0d0d18',
    border: '1px solid #252525',
    borderRadius: 22,
    padding: 26,
    lineHeight: 1.7,
  },
  empty: {
    minHeight: 260,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#888',
    fontSize: 22,
    textAlign: 'center',
  },
  skinSection: { maxWidth: 1500, margin: '90px auto 0' },
  uploadBox: {
    height: 360,
    borderRadius: 24,
    border: '1px dashed #444',
    background: '#050505',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    color: '#aaa',
    fontSize: 22,
  },
  image: { width: '100%', height: '100%', objectFit: 'cover' },
  resultGrid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, marginTop: 34 },
}
