'use client'

import { useState } from 'react'

const translations = {
  EN: {
    badge: 'AI COSMETIC INTELLIGENCE',
    title: 'Understand your cosmetic formula.',
    subtitle:
      'Paste an INCI list and receive a clear, professional cosmetic analysis with benefits, risks and suitability insights.',

    inputTitle: 'Formula Analysis',
    placeholder: 'Aqua, Glycerin, Niacinamide, Panthenol...',
    button: 'Analyze Formula',
    pdf: 'Download PDF Report',

    result: 'Analysis Result',
    excellent: 'Excellent Formula',

    hydration: 'Hydration',
    barrier: 'Barrier Support',
    antiaging: 'Anti-Aging Effect',
    acne: 'Acne Safety',
    irritation: 'Irritation Risk',

    benefits: 'Key Benefits',
    conclusion: 'Professional Conclusion',

    skinTitle: 'AI Skin Analysis',
    skinSubtitle:
      'Upload a face photo and receive a professional cosmetic skin intelligence report.',

    uploadSkinPhoto: 'Upload Skin Photo',
    analyzeSkin: 'Analyze Skin',

    skinResult: 'Skin Analysis Result',

    professionalInterpretation: 'Professional Interpretation',
    skinStrategy: 'Recommended Skin Strategy',
    ingredientPriorities: 'Ingredient Priorities',
    professionalCare: 'Professional Care Direction',

    hydrationSkin: 'Hydration',
    barrierSkin: 'Barrier Condition',
    textureSkin: 'Texture & Pores',
    pigmentationSkin: 'Pigmentation',
    sebumSkin: 'Sebum Balance',
    agingSkin: 'Aging Signs',
    firmnessSkin: 'Firmness & Elasticity',

    reduced: 'Reduced',
    moderate: 'Moderate',
    balanced: 'Balanced',
    earlySigns: 'Early Signs',
  },

  DE: {
    badge: 'KI-KOSMETIKANALYSE',
    title: 'Verstehen Sie Ihre kosmetische Formel.',
    subtitle:
      'Fügen Sie eine INCI-Liste ein und erhalten Sie eine professionelle Analyse mit Vorteilen, Risiken und Hauttyp-Empfehlungen.',

    inputTitle: 'Formelanalyse',
    placeholder: 'Aqua, Glycerin, Niacinamide, Panthenol...',
    button: 'Formel analysieren',
    pdf: 'PDF-Bericht herunterladen',

    result: 'Analyseergebnis',
    excellent: 'Ausgezeichnete Formel',

    hydration: 'Feuchtigkeit',
    barrier: 'Barriere-Schutz',
    antiaging: 'Anti-Aging-Effekt',
    acne: 'Akne-Sicherheit',
    irritation: 'Reizungsrisiko',

    benefits: 'Wichtige Vorteile',
    conclusion: 'Professionelle Einschätzung',

    skinTitle: 'KI-Hautanalyse',
    skinSubtitle:
      'Laden Sie ein Gesichtsfoto hoch und erhalten Sie einen professionellen kosmetischen Hautanalyse-Bericht.',

    uploadSkinPhoto: 'Hautfoto hochladen',
    analyzeSkin: 'Haut analysieren',

    skinResult: 'Ergebnis der Hautanalyse',

    professionalInterpretation: 'Professionelle Interpretation',
    skinStrategy: 'Empfohlene Hautstrategie',
    ingredientPriorities: 'Wirkstoff-Prioritäten',
    professionalCare: 'Professionelle Behandlungsausrichtung',

    hydrationSkin: 'Feuchtigkeit',
    barrierSkin: 'Barrierezustand',
    textureSkin: 'Textur & Poren',
    pigmentationSkin: 'Pigmentierung',
    sebumSkin: 'Sebum-Balance',
    agingSkin: 'Alterungsanzeichen',
    firmnessSkin: 'Festigkeit & Elastizität',

    reduced: 'Reduziert',
    moderate: 'Moderat',
    balanced: 'Ausgeglichen',
    earlySigns: 'Frühe Anzeichen',
  },

  RU: {
    badge: 'ИИ-КОСМЕТОЛОГИЧЕСКИЙ ИНТЕЛЛЕКТ',
    title: 'Поймите свою косметическую формулу.',
    subtitle:
      'Вставьте INCI-состав и получите профессиональный анализ эффективности, безопасности и совместимости с кожей.',

    inputTitle: 'Анализ формулы',
    placeholder: 'Aqua, Glycerin, Niacinamide, Panthenol...',
    button: 'Анализировать формулу',
    pdf: 'Скачать PDF-отчёт',

    result: 'Результат анализа',
    excellent: 'Отличная формула',

    hydration: 'Увлажнение',
    barrier: 'Поддержка барьера',
    antiaging: 'Антивозрастной эффект',
    acne: 'Безопасность при акне',
    irritation: 'Риск раздражения',

    benefits: 'Ключевые преимущества',
    conclusion: 'Профессиональный вывод',

    skinTitle: 'ИИ-анализ кожи',
    skinSubtitle:
      'Загрузите фото лица и получите профессиональный косметологический анализ кожи.',

    uploadSkinPhoto: 'Загрузить фото кожи',
    analyzeSkin: 'Анализировать кожу',

    skinResult: 'Результат анализа кожи',

    professionalInterpretation: 'Профессиональная интерпретация',
    skinStrategy: 'Рекомендованная стратегия ухода',
    ingredientPriorities: 'Приоритетные активы',
    professionalCare: 'Профессиональное направление ухода',

    hydrationSkin: 'Увлажнение',
    barrierSkin: 'Состояние барьера',
    textureSkin: 'Текстура и поры',
    pigmentationSkin: 'Пигментация',
    sebumSkin: 'Себум-баланс',
    agingSkin: 'Признаки старения',
    firmnessSkin: 'Упругость и эластичность',

    reduced: 'Снижено',
    moderate: 'Умеренно',
    balanced: 'Сбалансировано',
    earlySigns: 'Ранние признаки',
  },
}

export default function Home() {
  const [language, setLanguage] = useState('RU')
  const [formula, setFormula] = useState('')
  const [analyzed, setAnalyzed] = useState(false)

  const [skinImage, setSkinImage] = useState(null)
  const [skinAnalysis, setSkinAnalysis] = useState(false)

  const t = translations[language]

  const analyzeFormula = () => {
    if (!formula.trim()) return
    setAnalyzed(true)
  }

  const handleSkinImageUpload = (event) => {
    const file = event.target.files?.[0]

    if (!file) return

    setSkinImage(URL.createObjectURL(file))
    setSkinAnalysis(false)
  }

  const analyzeSkin = () => {
    if (!skinImage) return

    setSkinAnalysis(true)
  }

  const downloadPdf = () => {
    const content = `
FORMULENS LAB

${t.result}

Formula:
${formula}

Score: 90/100

${t.excellent}

${t.benefits}

- ${
      language === 'RU'
        ? 'Глубокое увлажнение'
        : language === 'DE'
        ? 'Intensive Hydration'
        : 'Deep hydration'
    }

- ${
      language === 'RU'
        ? 'Поддержка кожного барьера'
        : language === 'DE'
        ? 'Stärkung der Hautbarriere'
        : 'Skin barrier support'
    }

- ${
      language === 'RU'
        ? 'Минимальный риск раздражения'
        : language === 'DE'
        ? 'Minimales Irritationsrisiko'
        : 'Minimal irritation risk'
    }
`

    const blob = new Blob([content], {
      type: 'text/plain',
    })

    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')

    link.href = url
    link.download = 'FORMULENS-LAB-REPORT.txt'

    link.click()

    URL.revokeObjectURL(url)
  }

  const skinMetrics = [
    {
      title: t.hydrationSkin,
      level: t.reduced,
      summary:
        language === 'RU'
          ? 'Видимые признаки указывают на сниженное удержание влаги и возможный дисбаланс текстуры.'
          : language === 'DE'
          ? 'Sichtbare Anzeichen deuten auf reduzierte Feuchtigkeitsspeicherung hin.'
          : 'Visible signs indicate reduced hydration retention.',
    },

    {
      title: t.barrierSkin,
      level: t.moderate,
      summary:
        language === 'RU'
          ? 'Кожа выглядит слегка реактивной.'
          : language === 'DE'
          ? 'Die Haut wirkt leicht reaktiv.'
          : 'The skin appears slightly reactive.',
    },

    {
      title: t.textureSkin,
      level: t.moderate,
      summary:
        language === 'RU'
          ? 'Наблюдаются легкие неровности текстуры и активность пор.'
          : language === 'DE'
          ? 'Leichte Texturunregelmäßigkeiten sind sichtbar.'
          : 'Mild texture irregularities are visible.',
    },

    {
      title: t.pigmentationSkin,
      level: t.balanced,
      summary:
        language === 'RU'
          ? 'Пигментация выглядит относительно контролируемой.'
          : language === 'DE'
          ? 'Die Pigmentierung wirkt relativ kontrolliert.'
          : 'Pigmentation appears relatively controlled.',
    },

    {
      title: t.sebumSkin,
      level: t.moderate,
      summary:
        language === 'RU'
          ? 'Себум-активность слегка повышена в T-зоне.'
          : language === 'DE'
          ? 'Die Sebumaktivität ist leicht erhöht.'
          : 'Sebum activity appears slightly increased.',
    },

    {
      title: t.agingSkin,
      level: t.earlySigns,
      summary:
        language === 'RU'
          ? 'Наблюдаются ранние признаки возрастных изменений.'
          : language === 'DE'
          ? 'Frühe Alterungsanzeichen sind sichtbar.'
          : 'Early visible aging signs are present.',
    },

    {
      title: t.firmnessSkin,
      level: t.moderate,
      summary:
        language === 'RU'
          ? 'Наблюдается легкое снижение упругости.'
          : language === 'DE'
          ? 'Leichter Verlust an Elastizität sichtbar.'
          : 'Mild loss of elasticity is visible.',
    },
  ]

  return (
    <main
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at top left, #1a1028 0%, #050505 35%, #000 100%)',
        color: 'white',
        padding: '70px 6%',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '54px' }}>
        <div
          style={{
            display: 'inline-block',
            marginBottom: '20px',
            padding: '10px 18px',
            border: '1px solid #333',
            borderRadius: '999px',
            color: '#c8c8c8',
            fontSize: '14px',
            letterSpacing: '2px',
          }}
        >
          {t.badge}
        </div>

        <h1
          style={{
            fontSize: 'clamp(42px, 7vw, 82px)',
            lineHeight: '1.05',
            margin: '0 auto 24px',
            maxWidth: '980px',
            fontWeight: '900',
          }}
        >
          {t.title}
        </h1>

        <p
          style={{
            color: '#bdbdbd',
            fontSize: '22px',
            maxWidth: '760px',
            margin: '0 auto',
            lineHeight: '1.6',
          }}
        >
          {t.subtitle}
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '50px',
        }}
      >
        {['EN', 'DE', 'RU'].map((lang) => (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            style={{
              width: '58px',
              height: '44px',
              borderRadius: '14px',
              border:
                language === lang ? '1px solid #ff00aa' : '1px solid #333',

              background:
                language === lang
                  ? 'linear-gradient(135deg,#7b2cff,#ff00aa)'
                  : 'transparent',

              color: 'white',
              fontWeight: '700',
              cursor: 'pointer',
            }}
          >
            {lang}
          </button>
        ))}
      </div>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.25fr)',
          gap: '40px',
          maxWidth: '1500px',
          margin: '0 auto',
        }}
      >
        <div>
          <h2 style={{ fontSize: '34px', marginBottom: '22px' }}>
            {t.inputTitle}
          </h2>

          <textarea
            value={formula}
            onChange={(e) => {
              setFormula(e.target.value)
              setAnalyzed(false)
            }}
            placeholder={t.placeholder}
            style={{
              width: '100%',
              height: '260px',
              background: '#050505',
              border: '1px solid #262626',
              borderRadius: '22px',
              color: 'white',
              padding: '24px',
              fontSize: '22px',
              resize: 'none',
              outline: 'none',
            }}
          />

          <button
            onClick={analyzeFormula}
            disabled={!formula.trim()}
            style={{
              width: '100%',
              marginTop: '24px',

              background: formula.trim()
                ? 'linear-gradient(90deg,#7b2cff 0%,#ff00aa 100%)'
                : '#222',

              border: 'none',
              color: 'white',
              fontSize: '22px',
              fontWeight: '800',
              padding: '24px',
              borderRadius: '22px',
              cursor: formula.trim() ? 'pointer' : 'not-allowed',
              opacity: formula.trim() ? 1 : 0.45,
            }}
          >
            ✨ {t.button}
          </button>

          {analyzed && (
            <button
              onClick={downloadPdf}
              style={{
                width: '100%',
                marginTop: '18px',
                background: 'transparent',
                border: '1px solid #2f2f2f',
                color: 'white',
                fontSize: '20px',
                padding: '20px',
                borderRadius: '22px',
                cursor: 'pointer',
              }}
            >
              {t.pdf}
            </button>
          )}
        </div>

        <div>
          {!analyzed ? (
            <div
              style={{
                background: 'rgba(12,12,24,0.92)',
                border: '1px solid #242424',
                borderRadius: '30px',
                padding: '54px',
                minHeight: '260px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#8f8f8f',
                textAlign: 'center',
                fontSize: '22px',
              }}
            >
              {language === 'RU'
                ? 'Введите INCI-состав и нажмите анализ.'
                : language === 'DE'
                ? 'Geben Sie eine INCI-Liste ein.'
                : 'Enter an INCI formula.'}
            </div>
          ) : (
            <div
              style={{
                background: 'rgba(12,12,24,0.92)',
                border: '1px solid #242424',
                borderRadius: '30px',
                padding: '34px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '28px',
                }}
              >
                <div
                  style={{
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    background:
                      'linear-gradient(135deg,#7b2cff,#ff00aa)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '54px',
                    fontWeight: '900',
                  }}
                >
                  90
                </div>

                <div>
                  <div
                    style={{
                      fontSize: '52px',
                      fontWeight: '900',
                      marginBottom: '10px',
                    }}
                  >
                    90/100
                  </div>

                  <div
                    style={{
                      background: '#123d1f',
                      color: '#66ff99',
                      display: 'inline-block',
                      padding: '10px 18px',
                      borderRadius: '14px',
                      fontWeight: '700',
                    }}
                  >
                    ✔ {t.excellent}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section
        style={{
          maxWidth: '1500px',
          margin: '90px auto 0',
        }}
      >
        <h2
          style={{
            fontSize: '48px',
            marginBottom: '18px',
            fontWeight: '900',
            textAlign: 'center',
          }}
        >
          {t.skinTitle}
        </h2>

        <p
          style={{
            color: '#bdbdbd',
            fontSize: '21px',
            maxWidth: '760px',
            margin: '0 auto 40px',
            lineHeight: '1.6',
            textAlign: 'center',
          }}
        >
          {t.skinSubtitle}
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '34px',
          }}
        >
          <div
            style={{
              background: 'rgba(12,12,24,0.92)',
              border: '1px solid #242424',
              borderRadius: '30px',
              padding: '30px',
            }}
          >
            <label
              style={{
                display: 'block',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  height: '360px',
                  borderRadius: '24px',
                  border: '1px dashed #444',
                  background: '#050505',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  color: '#9b9b9b',
                  fontSize: '22px',
                }}
              >
                {skinImage ? (
                  <img
                    src={skinImage}
                    alt="Skin preview"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  t.uploadSkinPhoto
                )}
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={handleSkinImageUpload}
                style={{ display: 'none' }}
              />
            </label>

            <button
              onClick={analyzeSkin}
              disabled={!skinImage}
              style={{
                width: '100%',
                marginTop: '24px',

                background: skinImage
                  ? 'linear-gradient(90deg,#7b2cff 0%,#ff00aa 100%)'
                  : '#222',

                border: 'none',
                color: 'white',
                fontSize: '22px',
                fontWeight: '800',
                padding: '24px',
                borderRadius: '22px',
                cursor: skinImage ? 'pointer' : 'not-allowed',
                opacity: skinImage ? 1 : 0.45,
              }}
            >
              ✨ {t.analyzeSkin}
            </button>
          </div>

          <div
            style={{
              background: 'rgba(12,12,24,0.92)',
              border: '1px solid #242424',
              borderRadius: '30px',
              padding: '34px',
              minHeight: '360px',
            }}
          >
            {!skinAnalysis ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  color: '#8f8f8f',
                  fontSize: '22px',
                  textAlign: 'center',
                }}
              >
                {language === 'RU'
                  ? 'Загрузите фото для анализа кожи.'
                  : language === 'DE'
                  ? 'Laden Sie ein Foto hoch.'
                  : 'Upload a photo for analysis.'}
              </div>
            ) : (
              <>
                <h3
                  style={{
                    fontSize: '32px',
                    marginBottom: '20px',
                  }}
                >
                  {t.skinResult}
                </h3>

                <p
                  style={{
                    color: '#d8d8d8',
                    fontSize: '20px',
                    lineHeight: '1.8',
                  }}
                >
                  {language === 'RU'
                    ? 'Видимые признаки указывают на чувствительность кожи, активность воспалительных элементов и нарушение барьерной устойчивости.'
                    : language === 'DE'
                    ? 'Sichtbare Anzeichen deuten auf Sensibilität und Barrierestörungen hin.'
                    : 'Visible signs suggest sensitivity and barrier imbalance.'}
                </p>
              </>
            )}
          </div>
        </div>

        {skinAnalysis && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              gap: '22px',
              marginTop: '34px',
            }}
          >
            {skinMetrics.map((metric) => (
              <div
                key={metric.title}
                style={{
                  background: 'rgba(12,12,24,0.92)',
                  border: '1px solid #242424',
                  borderRadius: '26px',
                  padding: '26px',
                }}
              >
                <div
                  style={{
                    color: '#aaa',
                    marginBottom: '12px',
                    fontSize: '17px',
                  }}
                >
                  {metric.title}
                </div>

                <div
                  style={{
                    color: '#ff4fd8',
                    fontSize: '28px',
                    fontWeight: '800',
                    marginBottom: '14px',
                  }}
                >
                  {metric.level}
                </div>

                <p
                  style={{
                    color: '#d2d2d2',
                    lineHeight: '1.65',
                    fontSize: '17px',
                  }}
                >
                  {metric.summary}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
