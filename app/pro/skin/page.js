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
    uploadHint: 'Laden Sie ein Kundenfoto für die professionelle Hautanalyse hoch.',

    overview: 'Professionelle Hautbewertung',
    score: 'Professioneller Hautindex',
    diagnosticMap: 'Diagnostische Hautkarte',

    interpretation: 'Professionelle Interpretation',
    strategy: 'Behandlungsstrategie',
    homecare: 'Homecare-Empfehlung',
    directions: 'Empfohlene Summecosmetics Linien',

    overviewText:
      'Sichtbar sind Hinweise auf reduzierte Feuchtigkeitsspeicherung, ausgeprägte Reaktivität, geschwächte Barrierefunktion, entzündliche Aktivität und ungleichmäßigen Hautton. Die primäre Strategie: zuerst Barriere und Entzündungsreaktionen stabilisieren, danach schrittweise an Textur, Pigmentierung und Altersanzeichen arbeiten.',

    interpretationText:
      'Die Priorität liegt nicht in aggressiver Stimulation, sondern in der Stabilisierung der Haut: Reduktion der Reaktivität, Unterstützung der Barrierefunktion, Wiederaufbau der Feuchtigkeitsspeicherung und Kontrolle entzündlicher Tendenzen. Nach der Stabilisierung können Strategien für Textur, Pigmentierung und Altersanzeichen schrittweise integriert werden.',

    strategyText:
      '1. Sanfte Reinigung und Vorbereitung der Haut. \n2. Beruhigendes Barriere-Protokoll. \n3. Feuchtigkeit und Wiederherstellung des Hautkomforts. \n4. Erst nach Stabilisierung: sanfte Korrektur von Textur und Pigmentierung.',

    homecareText:
      'Morgens: sanfte Reinigung, Feuchtigkeit, Barriereunterstützung, SPF. \nAbends: Reinigung, beruhigender Wirkstoff, Barriereaufbau. \nVorübergehend aggressive Säuren und starke Retinoid-Belastung vermeiden.',

    directionsText:
      'NICELY — Barriere und Sensibilität. \nGLACIAR — Feuchtigkeit. \nBALANCE — Entzündungen und Sebum. \nBECLARITY — Pigmentierung nach Stabilisierung. \nCELL C — Glow und antioxidative Unterstützung.',

    hydration: 'Feuchtigkeit',
    barrier: 'Hautbarriere',
    texture: 'Textur & Poren',
    pigmentation: 'Pigmentierung',
    sebum: 'Sebum',
    aging: 'Altersanzeichen',
    firmness: 'Festigkeit & Elastizität',

    reduced: 'Reduziert',
    compromised: 'Geschwächt',
    moderate: 'Mittel',
    uneven: 'Ungleichmäßig',
    early: 'Frühe Anzeichen',

    highPriority: 'Hohe Priorität',
    moderatePriority: 'Mittlere Priorität',
    stable: 'Stabil',
  },

  RU: {
    back: '← Профессиональная панель',
    pageTitle: 'Анализ кожи PRO',
    subtitle:
      'Расширенная профессиональная диагностика кожи по 7 параметрам: увлажнение, барьер, текстура, пигментация, себум, возрастные признаки и упругость.',

    uploadTitle: 'Фото клиента',
    uploadPhoto: 'Загрузить фото клиента',
    analyze: '✨ Анализировать кожу',
    uploadHint: 'Загрузите фото клиента для профессионального анализа кожи.',

    overview: 'Профессиональная оценка кожи',
    score: 'Профессиональный индекс кожи',
    diagnosticMap: 'Диагностическая карта',

    interpretation: 'Профессиональная интерпретация',
    strategy: 'Стратегия процедуры',
    homecare: 'Домашний протокол',
    directions: 'Рекомендуемые линии Summecosmetics',

    overviewText:
      'Визуально наблюдаются признаки сниженного влагоудержания, выраженной реактивности, ослабленной барьерной функции, воспалительной активности и неравномерности тона. Основная стратегия: сначала стабилизация барьера и воспаления, затем работа с текстурой, пигментацией и возрастными признаками.',

    interpretationText:
      'Приоритетная задача — не агрессивная стимуляция, а стабилизация кожи: снижение реактивности, поддержка барьерной функции, восстановление влагоудержания и контроль воспалительных проявлений. После стабилизации можно постепенно подключать стратегии для текстуры, пигментации и возрастных признаков.',

    strategyText:
      '1. Мягкое очищение и подготовка кожи. \n2. Успокаивающий барьерный протокол. \n3. Увлажнение и восстановление комфорта. \n4. Только после стабилизации — мягкая коррекция текстуры и пигментации.',

    homecareText:
      'Утро: мягкое очищение, увлажнение, барьерная поддержка, SPF. \nВечер: очищение, успокаивающий актив, восстановление барьера. \nВременно избегать агрессивных кислот и сильной ретиноидной нагрузки.',

    directionsText:
      'NICELY — барьер и чувствительность. \nGLACIAR — увлажнение. \nBALANCE — воспаления и себум. \nBECLARITY — пигментация после стабилизации. \nCELL C — сияние и антиоксидантная поддержка.',

    hydration: 'Увлажнение',
    barrier: 'Барьер',
    texture: 'Текстура и поры',
    pigmentation: 'Пигментация',
    sebum: 'Себум',
    aging: 'Возрастные признаки',
    firmness: 'Упругость и эластичность',

    reduced: 'Снижено',
    compromised: 'Ослаблен',
    moderate: 'Умеренно',
    uneven: 'Неравномерно',
    early: 'Ранние признаки',

    highPriority: 'Высокий приоритет',
    moderatePriority: 'Средний приоритет',
    stable: 'Стабильно',
  },

  EN: {
    back: '← Professional Dashboard',
    pageTitle: 'Skin Analysis PRO',
    subtitle:
      'Advanced professional skin diagnostics across 7 parameters: hydration, barrier condition, texture, pigmentation, sebum balance, aging signs and firmness.',

    uploadTitle: 'Client Photo',
    uploadPhoto: 'Upload Client Photo',
    analyze: '✨ Analyze Skin',
    uploadHint: 'Upload a client photo for professional skin analysis.',

    overview: 'Professional Skin Overview',
    score: 'Professional Skin Score',
    diagnosticMap: 'Diagnostic Map',

    interpretation: 'Professional Interpretation',
    strategy: 'Treatment Strategy',
    homecare: 'Homecare Protocol',
    directions: 'Recommended Summecosmetics Lines',

    overviewText:
      'Visible signs suggest reduced moisture retention, pronounced reactivity, weakened barrier function, inflammatory activity and uneven skin tone. The primary strategy: first stabilize barrier function and inflammation, then gradually address texture, pigmentation and aging signs.',

    interpretationText:
      'The priority is not aggressive stimulation, but skin stabilization: reducing reactivity, supporting barrier function, restoring moisture retention and controlling inflammatory tendencies. After stabilization, strategies for texture, pigmentation and aging signs can be gradually introduced.',

    strategyText:
      '1. Gentle cleansing and skin preparation. \n2. Calming barrier-support protocol. \n3. Hydration and restoration of comfort. \n4. Only after stabilization: gentle correction of texture and pigmentation.',

    homecareText:
      'Morning: gentle cleansing, hydration, barrier support, SPF. \nEvening: cleansing, calming active support, barrier restoration. \nTemporarily avoid aggressive acids and strong retinoid load.',

    directionsText:
      'NICELY — barrier and sensitivity. \nGLACIAR — hydration. \nBALANCE — inflammation and sebum. \nBECLARITY — pigmentation after stabilization. \nCELL C — glow and antioxidant support.',

    hydration: 'Hydration',
    barrier: 'Barrier Condition',
    texture: 'Texture & Pores',
    pigmentation: 'Pigmentation',
    sebum: 'Sebum Balance',
    aging: 'Aging Signs',
    firmness: 'Firmness & Elasticity',

    reduced: 'Reduced',
    compromised: 'Compromised',
    moderate: 'Moderate',
    uneven: 'Uneven',
    early: 'Early Signs',

    highPriority: 'High priority',
    moderatePriority: 'Moderate priority',
    stable: 'Stable',
  },
}

export default function ProSkinPage() {
  const [lang, setLang] = useState('DE')
  const [image, setImage] = useState(null)
  const [done, setDone] = useState(false)

  const t = translations[lang]

  const uploadImage = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    setImage(URL.createObjectURL(file))
    setDone(false)
  }

  const metrics = [
    { label: t.hydration, value: 58, status: t.reduced },
    { label: t.barrier, value: 34, status: t.compromised },
    { label: t.texture, value: 52, status: t.moderate },
    { label: t.pigmentation, value: 46, status: t.uneven },
    { label: t.sebum, value: 61, status: t.moderate },
    { label: t.aging, value: 49, status: t.early },
    { label: t.firmness, value: 51, status: t.moderate },
  ]

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
                onClick={() => setLang(item)}
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
              onClick={() => image && setDone(true)}
              disabled={!image}
              style={{
                ...styles.primaryBtn,
                opacity: image ? 1 : 0.45,
                cursor: image ? 'pointer' : 'not-allowed',
              }}
            >
              {t.analyze}
            </button>
          </div>

          <div style={styles.panel}>
            {!done ? (
              <div style={styles.empty}>{t.uploadHint}</div>
            ) : (
              <>
                <h2 style={styles.h2}>{t.overview}</h2>

                <p style={styles.text}>{t.overviewText}</p>

                <div style={styles.scoreBox}>
                  <div style={styles.scoreCircle}>54</div>
                  <div>
                    <div style={styles.scoreText}>54/100</div>
                    <div style={styles.scoreLabel}>{t.score}</div>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>

        {done && (
          <>
            <section style={styles.visualSection}>
              <h2 style={styles.h2}>{t.diagnosticMap}</h2>

              <div style={styles.metricGrid}>
                {metrics.map((metric) => (
                  <Metric key={metric.label} metric={metric} t={t} />
                ))}
              </div>
            </section>

            <section style={styles.resultGrid}>
              <Info title={t.interpretation}>{t.interpretationText}</Info>

              <Info title={t.strategy}>{t.strategyText}</Info>

              <Info title={t.homecare}>{t.homecareText}</Info>

              <Info title={t.directions}>{t.directionsText}</Info>
            </section>
          </>
        )}
      </div>
    </main>
  )
}

function Metric({ metric, t }) {
  return (
    <div style={styles.metric}>
      <div style={styles.metricHeader}>
        <span>{metric.label}</span>
        <strong>{metric.status}</strong>
      </div>

      <div style={styles.barBg}>
        <div
          style={{
            width: `${metric.value}%`,
            height: '100%',
            background: getBarColor(metric.value),
          }}
        />
      </div>

      <div style={styles.metricFooter}>
        <span>{metric.value}/100</span>
        <span>{getPriority(metric.value, t)}</span>
      </div>
    </div>
  )
}

function getBarColor(value) {
  if (value < 45) return 'linear-gradient(90deg,#ff4d6d,#ff00aa)'
  if (value < 65) return 'linear-gradient(90deg,#f59e0b,#ff00aa)'
  return 'linear-gradient(90deg,#7b2cff,#ff00aa)'
}

function getPriority(value, t) {
  if (value < 45) return t.highPriority
  if (value < 65) return t.moderatePriority
  return t.stable
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
  uploadBox: {
    height: '380px',
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
    minHeight: '380px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#888',
    fontSize: '22px',
    textAlign: 'center',
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
