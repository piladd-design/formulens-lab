'use client'

import Link from 'next/link'
import { useState } from 'react'

const translations = {
  DE: {
    back: '← Professional Dashboard',
    title: 'KI-Protokoll aus Foto',
    subtitle:
      'Kundenfoto → Hautanalyse → Behandlungsprotokoll → Homecare-Empfehlung.',

    uploadTitle: 'Kundenfoto',
    upload: 'Kundenfoto hochladen',
    analyze: '✨ Foto analysieren',

    waiting:
      'Laden Sie ein Foto hoch, um eine vollständige Hautanalyse und ein professionelles Protokoll zu erhalten.',

    skinScore: 'Professioneller Hautindex',
    diagnosis: 'Diagnose',
    protocol: 'Kabinenprotokoll',
    homecare: 'Homecare-Empfehlung',
    pdf: 'PDF-Bericht erstellen',

    diagnosisText:
      'Die Haut zeigt Anzeichen von Dehydratation, leichter Barriereschwäche, erhöhter Reaktivität und ungleichmäßigem Hautton. Empfohlen wird zunächst eine Stabilisierung der Hautbarriere und intensive Feuchtigkeitsversorgung.',

    protocolSteps: [
      'ESSENTIAL Reinigung',
      'NICELY Barrierestärkung',
      'GLACIAR Hydration',
      'BECLARITY Pigmentkorrektur',
      'SUMMESUN SPF Schutz',
    ],

    homecareText:
      'Morgens: Reinigung → GLACIAR → NICELY → SUMMESUN SPF. \nAbends: Reinigung → NICELY → BALANCE bei Bedarf.',
  },

  RU: {
    back: '← Профессиональная панель',
    title: 'AI-протокол по фото',
    subtitle:
      'Фото клиента → диагностика кожи → кабинетный протокол → домашний уход.',

    uploadTitle: 'Фото клиента',
    upload: 'Загрузить фото клиента',
    analyze: '✨ Анализировать фото',

    waiting:
      'Загрузите фото клиента для получения полной диагностики и профессионального протокола.',

    skinScore: 'Профессиональный индекс кожи',
    diagnosis: 'Диагностика',
    protocol: 'Кабинетный протокол',
    homecare: 'Домашний уход',
    pdf: 'Создать PDF-отчёт',

    diagnosisText:
      'Кожа демонстрирует признаки обезвоженности, снижения барьерной функции, повышенной реактивности и неравномерности тона. Рекомендуется начать с восстановления барьера и интенсивного увлажнения.',

    protocolSteps: [
      'ESSENTIAL очищение',
      'NICELY восстановление барьера',
      'GLACIAR увлажнение',
      'BECLARITY коррекция пигментации',
      'SUMMESUN SPF защита',
    ],

    homecareText:
      'Утро: очищение → GLACIAR → NICELY → SUMMESUN SPF. \nВечер: очищение → NICELY → BALANCE по необходимости.',
  },

  EN: {
    back: '← Professional Dashboard',
    title: 'AI Protocol from Photo',
    subtitle:
      'Client photo → skin analysis → treatment protocol → homecare recommendation.',

    uploadTitle: 'Client Photo',
    upload: 'Upload Client Photo',
    analyze: '✨ Analyze Photo',

    waiting:
      'Upload a client photo to receive a complete skin analysis and professional protocol.',

    skinScore: 'Professional Skin Score',
    diagnosis: 'Diagnosis',
    protocol: 'Treatment Protocol',
    homecare: 'Homecare Recommendation',
    pdf: 'Generate PDF Report',

    diagnosisText:
      'The skin shows signs of dehydration, reduced barrier function, increased reactivity and uneven tone. Initial focus should be on barrier restoration and intensive hydration.',

    protocolSteps: [
      'ESSENTIAL cleansing',
      'NICELY barrier support',
      'GLACIAR hydration',
      'BECLARITY pigmentation correction',
      'SUMMESUN SPF protection',
    ],

    homecareText:
      'Morning: cleansing → GLACIAR → NICELY → SUMMESUN SPF. \nEvening: cleansing → NICELY → BALANCE when needed.',
  },
}

export default function PhotoProtocolPage() {
  const [lang, setLang] = useState('DE')
  const [image, setImage] = useState(null)
  const [done, setDone] = useState(false)

  const t = translations[lang]

  const uploadImage = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setImage(URL.createObjectURL(file))
    setDone(false)
  }

  const downloadPdf = () => {
    const content = `
FORMULENS LAB

${t.title}

${t.diagnosis}
${t.diagnosisText}

${t.protocol}
${t.protocolSteps.map((step) => `- ${step}`).join('\n')}

${t.homecare}
${t.homecareText}
`

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = 'FORMULENS-LAB-PHOTO-PROTOCOL.txt'
    link.click()

    URL.revokeObjectURL(url)
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
                onClick={() => setLang(item)}
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
            <h2 style={styles.h2}>{t.uploadTitle}</h2>

            <label style={{ cursor: 'pointer' }}>
              <div style={styles.uploadBox}>
                {image ? (
                  <img src={image} alt="Client preview" style={styles.image} />
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
              <div style={styles.empty}>{t.waiting}</div>
            ) : (
              <>
                <div style={styles.scoreBox}>
                  <div style={styles.scoreCircle}>54</div>

                  <div>
                    <div style={styles.scoreText}>54/100</div>
                    <div style={styles.scoreLabel}>{t.skinScore}</div>
                  </div>
                </div>

                <div style={styles.arrowFlow}>
                  PHOTO
                  <br />↓<br />
                  AI ANALYSIS
                  <br />↓<br />
                  PROTOCOL
                  <br />↓<br />
                  HOMECARE
                </div>
              </>
            )}
          </div>
        </section>

        {done && (
          <>
            <section style={styles.resultGrid}>
              <Info title={t.diagnosis}>{t.diagnosisText}</Info>

              <Info title={t.protocol}>
                {t.protocolSteps.map((step) => (
                  <div key={step}>✓ {step}</div>
                ))}
              </Info>

              <Info title={t.homecare}>{t.homecareText}</Info>
            </section>

            <button onClick={downloadPdf} style={styles.pdfBtn}>
              📄 {t.pdf}
            </button>
          </>
        )}
      </div>
    </main>
  )
}

function Info({ title, children }) {
  return (
    <div style={styles.info}>
      <h3 style={styles.infoTitle}>{title}</h3>
      <div style={styles.infoText}>{children}</div>
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
    marginBottom: '30px',
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
  },
  langActive: {
    width: '54px',
    height: '40px',
    borderRadius: '14px',
    border: 'none',
    background: 'linear-gradient(90deg,#7b2cff,#ff00aa)',
    color: 'white',
    cursor: 'pointer',
  },
  h1: {
    fontSize: 'clamp(42px,6vw,72px)',
    fontWeight: 900,
  },
  sub: {
    color: '#bbb',
    fontSize: '22px',
    lineHeight: 1.6,
    marginBottom: '40px',
    maxWidth: '900px',
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
    padding: '30px',
  },
  h2: {
    marginBottom: '20px',
  },
  uploadBox: {
    height: '350px',
    borderRadius: '20px',
    border: '1px dashed #444',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    color: '#999',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  primaryBtn: {
    width: '100%',
    marginTop: '20px',
    padding: '20px',
    borderRadius: '20px',
    border: 'none',
    background: 'linear-gradient(90deg,#7b2cff,#ff00aa)',
    color: 'white',
    fontWeight: 900,
  },
  empty: {
    minHeight: '350px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#888',
    textAlign: 'center',
  },
  scoreBox: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
  },
  scoreCircle: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg,#7b2cff,#ff00aa)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '40px',
    fontWeight: 900,
  },
  scoreText: {
    fontSize: '40px',
    fontWeight: 900,
  },
  scoreLabel: {
    color: '#aaa',
  },
  arrowFlow: {
    marginTop: '30px',
    textAlign: 'center',
    lineHeight: '2',
    color: '#ff7bd8',
    fontWeight: 700,
  },
  resultGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))',
    gap: '24px',
    marginTop: '30px',
  },
  info: {
    background: 'rgba(12,12,24,0.92)',
    border: '1px solid #242424',
    borderRadius: '24px',
    padding: '24px',
  },
  infoTitle: {
    marginBottom: '15px',
  },
  infoText: {
    color: '#d4d4d4',
    lineHeight: 1.8,
    whiteSpace: 'pre-line',
  },
  pdfBtn: {
    marginTop: '30px',
    width: '100%',
    padding: '24px',
    borderRadius: '20px',
    border: 'none',
    background: 'linear-gradient(90deg,#7b2cff,#ff00aa)',
    color: 'white',
    fontWeight: 900,
    fontSize: '18px',
    cursor: 'pointer',
  },
}
