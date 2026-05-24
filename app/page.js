'use client'

import { useState } from 'react'

const sections = [
  'FORMULA SCORE',
  'KEY BENEFITS',
  'KEY INGREDIENTS',
  'POTENTIAL CONCERNS',
  'BEST FOR',
  'PROFESSIONAL CONCLUSION',
]

function extractSection(text, title) {
  if (!text) return ''

  const start = text.indexOf(title + ':')

  if (start === -1) return ''

  const nextStarts = sections
    .filter((s) => s !== title)
    .map((s) => text.indexOf(s + ':', start + title.length))
    .filter((i) => i !== -1)

  const end = nextStarts.length
    ? Math.min(...nextStarts)
    : text.length

  return text
    .slice(start + title.length + 1, end)
    .trim()
    .replace(/\*\*/g, '')
}

function getScore(text) {
  const scoreText = extractSection(text, 'FORMULA SCORE')
  const match = scoreText.match(/\d+/)

  return match ? match[0] : '85'
}

export default function Home() {
  const [inci, setInci] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [language, setLanguage] = useState('EN')

  const analyzeFormula = async () => {
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

      setResult(data)
    } catch (error) {
      setResult({
        message:
          'Analysis service is currently unavailable. Please try again.',
      })
    }

    setLoading(false)
  }

  const analysisText = result?.message || ''

  return (
    <main
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at top left, #2b1055 0%, #090909 40%)',
        color: 'white',
        padding: '40px',
        fontFamily: 'Arial',
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '60px',
          }}
        >
          <div>
            <div
              style={{
                fontSize: '14px',
                color: '#b388ff',
                marginBottom: '12px',
                letterSpacing: '2px',
              }}
            >
              AI COSMETIC INTELLIGENCE
            </div>

            <h1
              style={{
                fontSize: '34px',
                fontWeight: '700',
                margin: 0,
              }}
            >
              FORMULENS LAB
            </h1>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '10px',
            }}
          >
            {['EN', 'DE', 'RU'].map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                style={{
                  background:
                    language === lang
                      ? 'linear-gradient(90deg,#7b2ff7,#f107a3)'
                      : '#111',
                  color: 'white',
                  border: '1px solid #333',
                  borderRadius: '10px',
                  padding: '10px 18px',
                  cursor: 'pointer',
                  fontWeight: '600',
                }}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        <div
          style={{
            maxWidth: '800px',
            marginBottom: '60px',
          }}
        >
          <h2
            style={{
              fontSize: '82px',
              lineHeight: '0.95',
              marginBottom: '30px',
              fontWeight: '800',
            }}
          >
            Understand your cosmetic formula.
          </h2>

          <p
            style={{
              fontSize: '28px',
              lineHeight: '1.5',
              color: '#cfcfcf',
            }}
          >
            Paste an INCI list and receive a clear, clinical-style
            ingredient analysis for safety, benefits and potential concerns.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '30px',
            alignItems: 'start',
          }}
        >
          <div
            style={{
              background: '#0d0d12',
              border: '1px solid #1f1f2b',
              borderRadius: '28px',
              padding: '30px',
            }}
          >
            <h2
              style={{
                fontSize: '26px',
                marginBottom: '25px',
              }}
            >
              Analyze Formula
            </h2>

            <textarea
              value={inci}
              onChange={(e) => setInci(e.target.value)}
              placeholder='Aqua, Glycerin, Niacinamide...'
              style={{
                width: '100%',
                height: '220px',
                background: '#050505',
                border: '1px solid #222',
                borderRadius: '20px',
                color: 'white',
                padding: '20px',
                fontSize: '18px',
                resize: 'none',
                outline: 'none',
              }}
            />

            <div
              style={{
                marginTop: '10px',
                color: '#777',
                fontSize: '14px',
              }}
            >
              {inci.length}/5000 characters
            </div>

            <button
              onClick={analyzeFormula}
              disabled={loading}
              style={{
                width: '100%',
                marginTop: '25px',
                padding: '22px',
                border: 'none',
                borderRadius: '18px',
                background:
                  'linear-gradient(90deg,#7b2ff7,#f107a3)',
                color: 'white',
                fontSize: '20px',
                fontWeight: '700',
                cursor: 'pointer',
              }}
            >
              {loading ? 'Analyzing...' : 'Analyze Formula'}
            </button>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            {analysisText && (
              <>
                <div
                  style={{
                    background: '#0d0d12',
                    border: '1px solid #1f1f2b',
                    borderRadius: '28px',
                    padding: '30px',
                    display: 'flex',
                    gap: '24px',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '90px',
                      height: '90px',
                      borderRadius: '50%',
                      background:
                        'linear-gradient(135deg,#7b2ff7,#33d2ff)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '42px',
                      fontWeight: '700',
                    }}
                  >
                    {getScore(analysisText)}
                  </div>

                  <div>
                    <div
                      style={{
                        fontSize: '26px',
                        fontWeight: '700',
                        marginBottom: '10px',
                      }}
                    >
                      Formula Score
                    </div>

                    <div
                      style={{
                        color: '#cfcfcf',
                        lineHeight: '1.7',
                      }}
                    >
                      {extractSection(
                        analysisText,
                        'FORMULA SCORE'
                      )}
                    </div>
                  </div>
                </div>

                {sections
                  .filter((section) => section !== 'FORMULA SCORE')
                  .map((section) => {
                    const content = extractSection(
                      analysisText,
                      section
                    )

                    if (!content) return null

                    return (
                      <div
                        key={section}
                        style={{
                          background: '#0d0d12',
                          border: '1px solid #1f1f2b',
                          borderRadius: '28px',
                          padding: '30px',
                        }}
                      >
                        <div
                          style={{
                            color: '#d19cff',
                            fontSize: '16px',
                            letterSpacing: '2px',
                            marginBottom: '20px',
                            fontWeight: '700',
                          }}
                        >
                          {section}
                        </div>

                        <div
                          style={{
                            color: '#f5f5f5',
                            lineHeight: '1.9',
                            fontSize: '17px',
                            whiteSpace: 'pre-wrap',
                          }}
                        >
                          {content}
                        </div>
                      </div>
                    )
                  })}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
