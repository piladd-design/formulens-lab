'use client'

import { useState } from 'react'

const translations = {
  EN: {
    badge: 'AI COSMETIC INTELLIGENCE',
    title: 'Understand your cosmetic formula.',
    subtitle:
      'Paste an INCI list and receive a clear, professional cosmetic analysis with benefits, risks and suitability insights.',
    inputTitle: 'Formula Analysis',
    placeholder: 'Aqua, Glycerin, Niacinamide...',
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
    ingredients: 'Important Ingredients',
    risks: 'Possible Risks',
    suitable: 'Suitable For',
    conclusion: 'Professional Conclusion',
    stepsTitle: 'How does it work?',
    step1: 'Paste INCI list',
    step2: 'AI analyzes ingredients',
    step3: 'Receive professional report',
  },

  DE: {
    badge: 'KI-KOSMETIKANALYSE',
    title: 'Verstehen Sie Ihre kosmetische Formel.',
    subtitle:
      'Fügen Sie eine INCI-Liste ein und erhalten Sie eine professionelle Analyse mit Vorteilen, Risiken und Hauttyp-Empfehlungen.',
    inputTitle: 'Formelanalyse',
    placeholder: 'Aqua, Glycerin, Niacinamide...',
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
    ingredients: 'Wichtige Inhaltsstoffe',
    risks: 'Mögliche Risiken',
    suitable: 'Geeignet für',
    conclusion: 'Professionelle Einschätzung',
    stepsTitle: 'Wie funktioniert es?',
    step1: 'INCI-Liste einfügen',
    step2: 'KI analysiert Inhaltsstoffe',
    step3: 'Professionellen Bericht erhalten',
  },

  RU: {
    badge: 'ИИ-АНАЛИЗ КОСМЕТИКИ',
    title: 'Поймите свою косметическую формулу.',
    subtitle:
      'Вставьте INCI-состав и получите профессиональный анализ эффективности, безопасности и совместимости с кожей.',
    inputTitle: 'Анализ формулы',
    placeholder: 'Aqua, Glycerin, Niacinamide...',
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
    ingredients: 'Важные ингредиенты',
    risks: 'Возможные риски',
    suitable: 'Подходит для',
    conclusion: 'Профессиональный вывод',
    stepsTitle: 'Как это работает?',
    step1: 'Вставьте INCI-состав',
    step2: 'ИИ анализирует компоненты',
    step3: 'Получите профессиональный отчёт',
  },
}

export default function Home() {
  const [language, setLanguage] = useState('RU')
  const [formula, setFormula] = useState('')
  const [analyzed, setAnalyzed] = useState(false)

  const t = translations[language]

  const analyzeFormula = () => {
    setAnalyzed(true)
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at top left, #2b0b52 0%, #050505 45%)',
        color: 'white',
        padding: '40px',
        fontFamily: 'Arial',
      }}
    >
      <div
        style={{
          maxWidth: '1450px',
          margin: '0 auto',
        }}
      >
        {/* TOP */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '60px',
          }}
        >
          <div>
            <div
              style={{
                color: '#b86cff',
                letterSpacing: '3px',
                fontSize: '14px',
                marginBottom: '16px',
              }}
            >
              {t.badge}
            </div>

            <h1
              style={{
                fontSize: '88px',
                lineHeight: '0.95',
                marginBottom: '30px',
                maxWidth: '760px',
                fontWeight: '900',
              }}
            >
              {t.title}
            </h1>

            <p
              style={{
                maxWidth: '760px',
                fontSize: '19px',
                lineHeight: '1.7',
                color: '#d0d0d0',
              }}
            >
              {t.subtitle}
            </p>
          </div>

          {/* LANG */}
          <div style={{ display: 'flex', gap: '12px', height: '50px' }}>
            {['EN', 'DE', 'RU'].map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                style={{
                  width: '58px',
                  borderRadius: '14px',
                  border:
                    language === lang
                      ? '1px solid #ff00aa'
                      : '1px solid #333',
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
        </div>

        {/* MAIN GRID */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '28px',
          }}
        >
          {/* LEFT */}
          <div
            style={{
              background: 'rgba(12,12,24,0.92)',
              border: '1px solid #242424',
              borderRadius: '30px',
              padding: '28px',
              height: 'fit-content',
            }}
          >
            <h2
              style={{
                fontSize: '42px',
                marginBottom: '28px',
              }}
            >
              {t.inputTitle}
            </h2>

            <textarea
              value={formula}
              onChange={(e) => setFormula(e.target.value)}
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
              style={{
                width: '100%',
                marginTop: '24px',
                background:
                  'linear-gradient(90deg,#7b2cff 0%,#ff00aa 100%)',
                border: 'none',
                color: 'white',
                fontSize: '22px',
                fontWeight: '800',
                padding: '24px',
                borderRadius: '22px',
                cursor: 'pointer',
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
                📄 {t.pdf}
              </button>
            )}

            {/* HOW */}
            <div
              style={{
                marginTop: '34px',
                border: '1px solid #242424',
                borderRadius: '24px',
                padding: '24px',
              }}
            >
              <h3
                style={{
                  marginBottom: '22px',
                  fontSize: '24px',
                }}
              >
                {t.stepsTitle}
              </h3>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '20px',
                }}
              >
                {[t.step1, t.step2, t.step3].map((step, index) => (
                  <div
                    key={index}
                    style={{
                      flex: 1,
                      textAlign: 'center',
                    }}
                  >
                    <div
                      style={{
                        width: '74px',
                        height: '74px',
                        margin: '0 auto 18px',
                        borderRadius: '50%',
                        background:
                          'linear-gradient(135deg,#7b2cff,#ff00aa)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '28px',
                        fontWeight: '800',
                      }}
                    >
                      {index + 1}
                    </div>

                    <div
                      style={{
                        color: '#d4d4d4',
                        lineHeight: '1.5',
                      }}
                    >
                      {step}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            {/* SCORE */}
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

            {/* METRICS */}
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

            {/* BENEFITS */}
            <div
              style={{
                background: 'rgba(12,12,24,0.92)',
                border: '1px solid #242424',
                borderRadius: '26px',
                padding: '28px',
              }}
            >
              <h3
                style={{
                  color: '#d46cff',
                  marginBottom: '20px',
                  fontSize: '24px',
                }}
              >
                ✨ {t.benefits}
              </h3>

              <ul
                style={{
                  lineHeight: '2',
                  color: '#e8e8e8',
                  fontSize: '18px',
                }}
              >
                {language === 'RU' && (
                  <>
                    <li>Глубокое и длительное увлажнение кожи</li>
                    <li>Укрепление защитного барьера кожи</li>
                    <li>Успокаивающее действие</li>
                    <li>Поддержка гладкости и эластичности</li>
                  </>
                )}

                {language === 'DE' && (
                  <>
                    <li>Intensive und langanhaltende Hydration</li>
                    <li>Stärkung der Hautbarriere</li>
                    <li>Beruhigende Wirkung</li>
                    <li>Verbesserung von Elastizität und Hautgefühl</li>
                  </>
                )}

                {language === 'EN' && (
                  <>
                    <li>Deep and long-lasting hydration</li>
                    <li>Skin barrier support</li>
                    <li>Soothing effect</li>
                    <li>Improved elasticity and smoothness</li>
                  </>
                )}
              </ul>
            </div>

            {/* CONCLUSION */}
            <div
              style={{
                background:
                  'linear-gradient(135deg,rgba(123,44,255,0.12),rgba(255,0,170,0.08))',
                border: '1px solid #ff00aa',
                borderRadius: '28px',
                padding: '30px',
              }}
            >
              <h3
                style={{
                  color: '#ff58d0',
                  marginBottom: '18px',
                  fontSize: '26px',
                }}
              >
                🛡 {t.conclusion}
              </h3>

              <p
                style={{
                  lineHeight: '1.9',
                  fontSize: '19px',
                  color: '#f1f1f1',
                }}
              >
                {language === 'RU' &&
                  'Комбинация гиалуроновой кислоты и пантенола обеспечивает интенсивное увлажнение, поддержку кожного барьера и высокий уровень комфорта даже для чувствительной кожи. Формула демонстрирует высокий профессиональный потенциал при минимальном риске раздражения.'}

                {language === 'DE' &&
                  'Die Kombination aus Hyaluronsäure und Panthenol sorgt für intensive Feuchtigkeitsversorgung, stärkt die Hautbarriere und bietet auch empfindlicher Haut hohen Komfort. Die Formel zeigt ein starkes professionelles Pflegepotenzial bei minimalem Irritationsrisiko.'}

                {language === 'EN' &&
                  'The combination of hyaluronic acid and panthenol delivers deep hydration, barrier support and excellent comfort even for sensitive skin. The formula demonstrates strong professional skincare potential with minimal irritation risk.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
