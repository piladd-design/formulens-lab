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
    stepsTitle: 'How does it work?',
    step1: 'Paste INCI list',
    step2: 'AI analyzes ingredients',
    step3: 'Receive professional report',

    skinTitle: 'AI Skin Analysis',
    skinSubtitle:
      'Upload a face photo and receive a professional cosmetic skin intelligence report.',
    uploadSkinPhoto: 'Upload Skin Photo',
    analyzeSkin: 'Analyze Skin',
    skinResult: 'Skin Analysis Result',
    skinWaiting: 'Upload a photo to start professional skin analysis',
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
    stepsTitle: 'Wie funktioniert es?',
    step1: 'INCI-Liste einfügen',
    step2: 'KI analysiert Inhaltsstoffe',
    step3: 'Professionellen Bericht erhalten',

    skinTitle: 'KI-Hautanalyse',
    skinSubtitle:
      'Laden Sie ein Gesichtsfoto hoch und erhalten Sie einen professionellen kosmetischen Hautanalyse-Bericht.',
    uploadSkinPhoto: 'Hautfoto hochladen',
    analyzeSkin: 'Haut analysieren',
    skinResult: 'Ergebnis der Hautanalyse',
    skinWaiting:
      'Laden Sie ein Foto hoch, um die professionelle Hautanalyse zu starten',
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
    badge: 'ИИ-АНАЛИЗ КОСМЕТИКИ',
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
    stepsTitle: 'Как это работает?',
    step1: 'Вставьте INCI-состав',
    step2: 'ИИ анализирует компоненты',
    step3: 'Получите профессиональный отчёт',

    skinTitle: 'ИИ-анализ кожи',
    skinSubtitle:
      'Загрузите фото лица и получите профессиональный косметологический анализ кожи.',
    uploadSkinPhoto: 'Загрузить фото кожи',
    analyzeSkin: 'Анализировать кожу',
    skinResult: 'Результат анализа кожи',
    skinWaiting: 'Загрузите фото, чтобы начать профессиональный анализ кожи',
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
  const [language, setLanguage] = useState('EN')
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

  const skinMetrics = [
    {
      title: t.hydrationSkin,
      level: t.reduced,
      summary:
        language === 'RU'
          ? 'Видимые признаки указывают на сниженное удержание влаги и возможный дисбаланс текстуры, связанный с обезвоженностью.'
          : language === 'DE'
          ? 'Sichtbare Anzeichen deuten auf reduzierte Feuchtigkeitsspeicherung und mögliche dehydrationsbedingte Texturveränderungen hin.'
          : 'Visible signs indicate reduced hydration retention and possible dehydration-related texture imbalance.',
    },
    {
      title: t.barrierSkin,
      level: t.moderate,
      summary:
        language === 'RU'
          ? 'Кожа выглядит слегка реактивной, что может указывать на сниженный уровень барьерной устойчивости.'
          : language === 'DE'
          ? 'Die Haut wirkt leicht reaktiv, was auf eine reduzierte Barriere-Resilienz hinweisen kann.'
          : 'The skin appears slightly reactive, with signs that may indicate reduced barrier resilience.',
    },
    {
      title: t.textureSkin,
      level: t.moderate,
      summary:
        language === 'RU'
          ? 'Наблюдаются легкие неровности текстуры и активность пор, особенно в центральной зоне лица.'
          : language === 'DE'
          ? 'Leichte Texturunregelmäßigkeiten und sichtbare Porenaktivität sind besonders in zentralen Gesichtsbereichen erkennbar.'
          : 'Mild texture irregularities and visible pore activity can be observed, especially in central facial areas.',
    },
    {
      title: t.pigmentationSkin,
      level: t.balanced,
      summary:
        language === 'RU'
          ? 'Пигментация выглядит относительно контролируемой, с легкой тенденцией к неравномерности тона.'
          : language === 'DE'
          ? 'Die Pigmentierung wirkt relativ kontrolliert, mit nur leichter Tendenz zu ungleichmäßigem Hautton.'
          : 'Pigmentation appears relatively controlled, with only mild uneven tone tendencies.',
    },
    {
      title: t.sebumSkin,
      level: t.moderate,
      summary:
        language === 'RU'
          ? 'Активность себума выглядит сбалансированной или слегка повышенной, особенно в T-зоне.'
          : language === 'DE'
          ? 'Die Sebumaktivität wirkt ausgeglichen bis leicht erhöht, besonders in der T-Zone.'
          : 'Sebum activity appears balanced to slightly increased, especially in the T-zone.',
    },
    {
      title: t.agingSkin,
      level: t.earlySigns,
      summary:
        language === 'RU'
          ? 'Ранние признаки старения могут проявляться в виде мелких линий, усталости кожи и сниженного сияния.'
          : language === 'DE'
          ? 'Frühe Alterungsanzeichen können sich durch feine Linien, Hautmüdigkeit und reduzierte Ausstrahlung zeigen.'
          : 'Early visible aging signs may include fine lines, fatigue and reduced skin luminosity.',
    },
    {
      title: t.firmnessSkin,
      level: t.moderate,
      summary:
        language === 'RU'
          ? 'Визуальные признаки упругости указывают на легкое снижение эластичности и структурной поддержки кожи.'
          : language === 'DE'
          ? 'Sichtbare Festigkeitsindikatoren deuten auf einen leichten Verlust an Elastizität und struktureller Unterstützung hin.'
          : 'Visible firmness indicators suggest mild loss of elasticity and reduced structural support.',
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

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
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
                lineHeight: '1.6',
              }}
            >
              {language === 'RU'
                ? 'Введите INCI-состав и нажмите кнопку анализа.'
                : language === 'DE'
                ? 'Geben Sie eine INCI-Liste ein und starten Sie die Analyse.'
                : 'Enter an INCI list and start the analysis.'}
            </div>
          ) : (
            <>
              <div
                style={{
                  background: 'rgba(12,12,24,0.92)',
                  border: '1px solid #242424',
                  borderRadius: '30px',
                  padding: '34px',
                }}
              >
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '28px' }}
                >
                  <div
                    style={{
                      width: '150px',
                      height: '150px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg,#7b2cff,#ff00aa)',
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
                        marginBottom: '18px',
                      }}
                    >
                      ✔ {t.excellent}
                    </div>

                    <div
                      style={{
                        color: '#cfcfcf',
                        maxWidth: '420px',
                        lineHeight: '1.6',
                      }}
                    >
                      {language === 'RU' &&
                        'Сбалансированная профессиональная формула с высоким потенциалом ухода и минимальным риском раздражения.'}
                      {language === 'DE' &&
                        'Professionell ausgewogene Formel mit hoher Pflegewirkung und sehr geringem Irritationspotenzial.'}
                      {language === 'EN' &&
                        'Balanced professional formula with excellent skincare potential and minimal irritation risk.'}
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '20px',
                }}
              >
                {[
                  [t.hydration, 95],
                  [t.barrier, 85],
                  [t.antiaging, 80],
                  [t.acne, 90],
                  [t.irritation, 5],
                ].map(([label, value], index) => (
                  <div
                    key={index}
                    style={{
                      background: 'rgba(12,12,24,0.92)',
                      border: '1px solid #242424',
                      borderRadius: '24px',
                      padding: '24px',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '18px',
                        fontWeight: '700',
                      }}
                    >
                      <span>{label}</span>
                      <span
                        style={{
                          color:
                            label === t.irritation ? '#66ff99' : '#ff4fd8',
                        }}
                      >
                        {value}/100
                      </span>
                    </div>

                    <div
                      style={{
                        height: '10px',
                        borderRadius: '10px',
                        background: '#1c1c1c',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          width: `${value}%`,
                          height: '100%',
                          background:
                            label === t.irritation
                              ? '#44ff88'
                              : 'linear-gradient(90deg,#7b2cff,#ff00aa)',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <InfoBlock title={`✨ ${t.benefits}`}>
                {language === 'RU'
                  ? 'Глубокое увлажнение, поддержка кожного барьера, успокаивающее действие и улучшение гладкости кожи.'
                  : language === 'DE'
                  ? 'Intensive Hydration, Stärkung der Hautbarriere, beruhigende Wirkung und verbessertes Hautgefühl.'
                  : 'Deep hydration, skin barrier support, soothing effect and improved skin smoothness.'}
              </InfoBlock>

              <InfoBlock title={t.conclusion}>
                {language === 'RU'
                  ? 'Формула демонстрирует высокий профессиональный потенциал ухода при минимальном риске раздражения.'
                  : language === 'DE'
                  ? 'Die Formel zeigt ein starkes professionelles Pflegepotenzial bei minimalem Irritationsrisiko.'
                  : 'The formula demonstrates strong professional skincare potential with minimal irritation risk.'}
              </InfoBlock>
            </>
          )}
        </div>
      </section>

      <section
        style={{
          maxWidth: '1500px',
          margin: '90px auto 0',
          border: '1px solid #242424',
          borderRadius: '34px',
          padding: '42px',
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015))',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '42px' }}>
          <div
            style={{
              display: 'inline-block',
              marginBottom: '18px',
              padding: '10px 18px',
              border: '1px solid #333',
              borderRadius: '999px',
              color: '#c8c8c8',
              fontSize: '14px',
              letterSpacing: '2px',
            }}
          >
            FORMULENS LAB
          </div>

          <h2
            style={{
              fontSize: 'clamp(38px, 5vw, 64px)',
              margin: '0 0 20px',
              fontWeight: '900',
            }}
          >
            {t.skinTitle}
          </h2>

          <p
            style={{
              color: '#bdbdbd',
              fontSize: '21px',
              maxWidth: '760px',
              margin: '0 auto',
              lineHeight: '1.6',
            }}
          >
            {t.skinSubtitle}
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
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
            <label style={{ display: 'block', cursor: 'pointer' }}>
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
              display: 'flex',
              alignItems: skinAnalysis ? 'flex-start' : 'center',
              justifyContent: 'center',
            }}
          >
            {!skinAnalysis ? (
              <div
                style={{
                  textAlign: 'center',
                  color: '#8f8f8f',
                  fontSize: '22px',
                  lineHeight: '1.6',
                }}
              >
                {t.skinWaiting}
              </div>
            ) : (
              <div>
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
                    ? 'Видимые косметологические признаки указывают на сниженное удержание влаги, легкую чувствительность барьера и ранние изменения текстуры кожи.'
                    : language === 'DE'
                    ? 'Sichtbare kosmetische Anzeichen deuten auf reduzierte Feuchtigkeitsspeicherung, leichte Barrieresensibilität und frühe Texturveränderungen hin.'
                    : 'Visible cosmetic signs suggest reduced moisture retention, mild barrier sensitivity and early texture irregularity.'}
                </p>
              </div>
            )}
          </div>
        </div>

        {skinAnalysis && (
          <>
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

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                gap: '24px',
                marginTop: '34px',
              }}
            >
              <InfoBlock title={t.professionalInterpretation}>
                {language === 'RU'
                  ? 'Текущий профиль кожи предполагает стратегию восстановления барьера, усиления увлажнения, успокаивающей поддержки и постепенной антивозрастной коррекции.'
                  : language === 'DE'
                  ? 'Das aktuelle Hautprofil spricht für eine barriereorientierte Strategie mit Feuchtigkeitsaufbau, beruhigender Unterstützung und progressiver Anti-Aging-Pflege.'
                  : 'The current skin profile suggests a barrier-first approach with hydration restoration, calming support and progressive anti-aging strategy.'}
              </InfoBlock>

              <ListBlock
                title={t.skinStrategy}
                items={
                  language === 'RU'
                    ? [
                        'Восстановление увлажнения',
                        'Поддержка барьерной устойчивости',
                        'Улучшение текстуры',
                        'Антиоксидантная защита',
                        'Поддержка упругости',
                      ]
                    : language === 'DE'
                    ? [
                        'Wiederaufbau der Feuchtigkeit',
                        'Unterstützung der Barriere-Resilienz',
                        'Verfeinerung der Hauttextur',
                        'Antioxidativer Schutz',
                        'Unterstützung der Festigkeit',
                      ]
                    : [
                        'Hydration restoration',
                        'Barrier resilience support',
                        'Texture refinement',
                        'Antioxidant protection',
                        'Elasticity support',
                      ]
                }
              />

              <ListBlock
                title={t.ingredientPriorities}
                items={
                  language === 'RU'
                    ? [
                        'Гиалуроновая кислота',
                        'Ниацинамид',
                        'Эктоин',
                        'Пептиды',
                        'Витамин C',
                        'Церамиды',
                      ]
                    : language === 'DE'
                    ? [
                        'Hyaluronsäure',
                        'Niacinamid',
                        'Ectoin',
                        'Peptide',
                        'Vitamin C',
                        'Ceramide',
                      ]
                    : [
                        'Hyaluronic Acid',
                        'Niacinamide',
                        'Ectoin',
                        'Peptides',
                        'Vitamin C',
                        'Ceramides',
                      ]
                }
              />

              <ListBlock
                title={t.professionalCare}
                items={
                  language === 'RU'
                    ? [
                        'Увлажняющие профессиональные процедуры',
                        'Протоколы поддержки барьера',
                        'Мягкое обновление без агрессивного пилинга',
                        'Антиоксидантный и укрепляющий уход',
                      ]
                    : language === 'DE'
                    ? [
                        'Feuchtigkeitsorientierte Behandlungen',
                        'Barriereunterstützende Protokolle',
                        'Sanfte Erneuerung statt aggressiver Exfoliation',
                        'Festigende und antioxidative Pflege',
                      ]
                    : [
                        'Hydration-focused facial treatments',
                        'Barrier-support protocols',
                        'Gentle renewal instead of aggressive exfoliation',
                        'Firming and antioxidant professional care',
                      ]
                }
              />
            </div>
          </>
        )}
      </section>
    </main>
  )
}

function InfoBlock({ title, children }) {
  return (
    <div
      style={{
        background: 'rgba(12,12,24,0.92)',
        border: '1px solid #242424',
        borderRadius: '26px',
        padding: '30px',
      }}
    >
      <h3
        style={{
          color: '#d46cff',
          marginBottom: '18px',
          fontSize: '25px',
        }}
      >
        {title}
      </h3>

      <p
        style={{
          color: '#e8e8e8',
          lineHeight: '1.8',
          fontSize: '18px',
        }}
      >
        {children}
      </p>
    </div>
  )
}

function ListBlock({ title, items }) {
  return (
    <div
      style={{
        background: 'rgba(12,12,24,0.92)',
        border: '1px solid #242424',
        borderRadius: '26px',
        padding: '30px',
      }}
    >
      <h3
        style={{
          color: '#d46cff',
          marginBottom: '18px',
          fontSize: '25px',
        }}
      >
        {title}
      </h3>

      <ul
        style={{
          color: '#e8e8e8',
          lineHeight: '2',
          fontSize: '18px',
          paddingLeft: '22px',
        }}
      >
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
