'use client'

import Link from 'next/link'
import { useState } from 'react'

const translations = {
  DE: {
    back: '← Home Care Dashboard',
    title: 'Hautanalyse',
    subtitle:
      'Basis-AI-Diagnostik für Homecare: Feuchtigkeit, Pigmentierung, Falten und Akne / entzündliche Elemente.',
    photo: 'Hautfoto',
    upload: 'Hautfoto hochladen',
    analyze: '✨ Haut analysieren',
    empty: 'Laden Sie ein Foto hoch, um die Hautanalyse zu starten.',
    result: 'Analyseergebnis',
    resultText:
      'Sichtbar sind Hinweise auf reduzierte Feuchtigkeit, ungleichmäßige Pigmentierung, frühe Faltenbildung und entzündliche Aktivität. Für die Homecare wird eine beruhigende, feuchtigkeitsspendende und barrierestärkende Strategie empfohlen.',
    hydration: 'Feuchtigkeit',
    pigmentation: 'Pigmentierung',
    wrinkles: 'Falten',
    acne: 'Akne / Entzündungen',
    reduced: 'Reduziert',
    moderate: 'Mittel',
    early: 'Frühe Anzeichen',
    expressed: 'Ausgeprägt',
    morning: 'Homecare Routine — Morgen',
    evening: 'Homecare Routine — Abend',
    products: 'Summecosmetics Empfehlung',
    professional: 'Professional Recommendation',
    morningText:
      '1. Sanfte Reinigung — ESSENTIAL. \n2. Feuchtigkeit — GLACIAR. \n3. Barriereunterstützung — NICELY. \n4. Bei Pigmentierung — BECLARITY oder CELL C. \n5. Täglich SPF — SUMMESUN.',
    eveningText:
      '1. Reinigung ohne Austrocknung. \n2. Beruhigende Pflege — NICELY. \n3. Bei Entzündungen — BALANCE. \n4. Regeneration und Feuchtigkeit — GLACIAR / NICELY. \n5. Sanfte Erneuerung 1–2 Mal pro Woche.',
    productsText:
      'GLACIAR — Feuchtigkeit. \nNICELY — Barriere und Sensibilität. \nBALANCE — Akne und Sebum. \nBECLARITY — Pigmentierung. \nCELL C — Glow und antioxidative Unterstützung. \nSUMMESUN — täglicher UV-Schutz.',
    professionalText:
      'Bei ausgeprägten Hautveränderungen empfehlen wir eine professionelle Hautanalyse und individuelle Behandlung durch eine Kosmetikerin.',
  },

  RU: {
    back: '← Домашний уход',
    title: 'Анализ кожи',
    subtitle:
      'Базовая AI-диагностика для домашнего ухода: увлажнение, пигментация, морщины и акне / воспалительные элементы.',
    photo: 'Фото кожи',
    upload: 'Загрузить фото кожи',
    analyze: '✨ Анализировать кожу',
    empty: 'Загрузите фото для анализа кожи.',
    result: 'Результат анализа',
    resultText:
      'Визуально наблюдаются признаки сниженного увлажнения, неравномерной пигментации, ранних возрастных изменений и воспалительной активности. Для домашнего ухода рекомендуется успокаивающая, увлажняющая и барьерно-восстанавливающая стратегия.',
    hydration: 'Увлажнение',
    pigmentation: 'Пигментация',
    wrinkles: 'Морщины',
    acne: 'Акне / воспаления',
    reduced: 'Снижено',
    moderate: 'Умеренно',
    early: 'Ранние признаки',
    expressed: 'Выражено',
    morning: 'Домашняя рутина — утро',
    evening: 'Домашняя рутина — вечер',
    products: 'Рекомендации Summecosmetics',
    professional: 'Профессиональная рекомендация',
    morningText:
      '1. Мягкое очищение — ESSENTIAL. \n2. Увлажнение — GLACIAR. \n3. Поддержка барьера — NICELY. \n4. При пигментации — BECLARITY или CELL C. \n5. Ежедневно SPF — SUMMESUN.',
    eveningText:
      '1. Очищение без пересушивания. \n2. Успокаивающий уход — NICELY. \n3. При воспалениях — BALANCE. \n4. Восстановление и увлажнение — GLACIAR / NICELY. \n5. Мягкое обновление 1–2 раза в неделю.',
    productsText:
      'GLACIAR — увлажнение. \nNICELY — барьер и чувствительность. \nBALANCE — акне и себум. \nBECLARITY — пигментация. \nCELL C — сияние и антиоксидантная поддержка. \nSUMMESUN — ежедневная SPF-защита.',
    professionalText:
      'При выраженных изменениях кожи рекомендуется профессиональная диагностика и индивидуальный подбор процедур у косметолога.',
  },

  EN: {
    back: '← Home Care Dashboard',
    title: 'Skin Analysis',
    subtitle:
      'Basic AI diagnostics for homecare: hydration, pigmentation, wrinkles and acne / inflammatory elements.',
    photo: 'Skin Photo',
    upload: 'Upload Skin Photo',
    analyze: '✨ Analyze Skin',
    empty: 'Upload a photo to start skin analysis.',
    result: 'Analysis Result',
    resultText:
      'Visible signs suggest reduced hydration, uneven pigmentation, early wrinkle formation and inflammatory activity. For homecare, a calming, hydrating and barrier-supporting strategy is recommended.',
    hydration: 'Hydration',
    pigmentation: 'Pigmentation',
    wrinkles: 'Wrinkles',
    acne: 'Acne / Inflammation',
    reduced: 'Reduced',
    moderate: 'Moderate',
    early: 'Early Signs',
    expressed: 'Expressed',
    morning: 'Homecare Routine — Morning',
    evening: 'Homecare Routine — Evening',
    products: 'Summecosmetics Recommendation',
    professional: 'Professional Recommendation',
    morningText:
      '1. Gentle cleansing — ESSENTIAL. \n2. Hydration — GLACIAR. \n3. Barrier support — NICELY. \n4. For pigmentation — BECLARITY or CELL C. \n5. Daily SPF — SUMMESUN.',
    eveningText:
      '1. Cleansing without drying. \n2. Calming care — NICELY. \n3. For inflammation — BALANCE. \n4. Recovery and hydration — GLACIAR / NICELY. \n5. Gentle renewal 1–2 times per week.',
    productsText:
      'GLACIAR — hydration. \nNICELY — barrier and sensitivity. \nBALANCE — acne and sebum. \nBECLARITY — pigmentation. \nCELL C — glow and antioxidant support. \nSUMMESUN — daily SPF protection.',
    professionalText:
      'For significant skin concerns, a professional skin consultation and individual treatment plan are recommended.',
  },
}

export default function ClientSkinPage() {
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
    { label: t.pigmentation, value: 46, status: t.moderate },
    { label: t.wrinkles, value: 52, status: t.early },
    { label: t.acne, value: 68, status: t.expressed },
  ]

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
            <h2 style={styles.h2}>{t.photo}</h2>

            <label style={{ cursor: 'pointer' }}>
              <div style={styles.uploadBox}>
                {image ? (
                  <img src={image} alt="Skin preview" style={styles.image} />
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
              <div style={styles.empty}>{t.empty}</div>
            ) : (
              <>
                <h2 style={styles.h2}>{t.result}</h2>

                <p style={styles.text}>{t.resultText}</p>

                <div style={{ marginTop: 28 }}>
                  {metrics.map((metric) => (
                    <Metric key={metric.label} {...metric} />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {done && (
          <section style={styles.resultGrid}>
            <Info title={t.morning}>{t.morningText}</Info>
            <Info title={t.evening}>{t.eveningText}</Info>
            <Info title={t.products}>{t.productsText}</Info>
            <Info title={t.professional}>{t.professionalText}</Info>
          </section>
        )}
      </div>
    </main>
  )
}

function Metric({ label, value, status }) {
  return (
    <div style={styles.metric}>
      <div style={styles.metricTop}>
        <span>{label}</span>
        <strong>{status}</strong>
      </div>

      <div style={styles.barBg}>
        <div
          style={{
            width: `${value}%`,
            height: '100%',
            background: 'linear-gradient(90deg,#7b2cff,#ff00aa)',
          }}
        />
      </div>

      <div style={styles.value}>{value}/100</div>
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
    maxWidth: '850px',
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
  text: {
    color: '#d4d4d4',
    lineHeight: 1.7,
    fontSize: '18px',
  },
  metric: {
    background: '#0d0d18',
    border: '1px solid #252525',
    borderRadius: '18px',
    padding: '18px',
    marginBottom: '16px',
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
  value: {
    marginTop: '10px',
    color: '#ff4fd8',
    fontWeight: 800,
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
