'use client'

import { useState } from 'react'

export default function Home() {
  const [inci, setInci] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const analyzeFormula = async () => {
    if (!inci) return

    setLoading(true)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inci }),
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error(error)
    }

    setLoading(false)
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#050505',
        color: 'white',
        fontFamily: 'Arial',
        padding: '40px 20px',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <h1
          style={{
            fontSize: '64px',
            marginBottom: '10px',
            fontWeight: '700',
          }}
        >
          FORMULENS LAB
        </h1>

        <p
          style={{
            color: '#999',
            fontSize: '20px',
            marginBottom: '50px',
          }}
        >
          Clinical cosmetic intelligence
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '30px',
          }}
        >
          <div
            style={{
              background: '#101010',
              padding: '30px',
              borderRadius: '24px',
              border: '1px solid #1f1f1f',
            }}
          >
            <h2
              style={{
                marginBottom: '20px',
                fontSize: '28px',
              }}
            >
              Analyze Formula
            </h2>

            <textarea
              value={inci}
              onChange={(e) => setInci(e.target.value)}
              placeholder='Paste INCI ingredients here...'
              style={{
                width: '100%',
                height: '240px',
                background: '#0a0a0a',
                border: '1px solid #222',
                borderRadius: '16px',
                padding: '20px',
                color: 'white',
                fontSize: '16px',
                resize: 'none',
                outline: 'none',
              }}
            />

            <button
              onClick={analyzeFormula}
              style={{
                marginTop: '20px',
                width: '100%',
                padding: '18px',
                borderRadius: '16px',
                border: 'none',
                background:
                  'linear-gradient(135deg, #7b2ff7 0%, #f107a3 100%)',
                color: 'white',
                fontSize: '18px',
                fontWeight: '700',
                cursor: 'pointer',
              }}
            >
              {loading ? 'Analyzing...' : 'Analyze Formula'}
            </button>
          </div>

          <div
            style={{
              background: '#101010',
              padding: '30px',
              borderRadius: '24px',
              border: '1px solid #1f1f1f',
            }}
          >
            <h2
              style={{
                marginBottom: '20px',
                fontSize: '28px',
              }}
            >
              Analysis Result
            </h2>

            {result ? (
              <div>
                <p
                  style={{
                    color: '#aaa',
                    lineHeight: '1.8',
                    fontSize: '17px',
                  }}
                >
                  {result.message}
                </p>
              </div>
            ) : (
              <p
                style={{
                  color: '#666',
                  lineHeight: '1.8',
                }}
              >
                AI analysis will appear here...
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
