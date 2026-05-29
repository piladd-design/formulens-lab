'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at top left,#2a0845,#000000)',
        color: 'white',
        padding: '40px 20px',
        fontFamily: 'Arial, sans-serif'
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center'
        }}
      >
        <div
          style={{
            display: 'inline-block',
            padding: '10px 18px',
            border: '1px solid #444',
            borderRadius: '999px',
            marginBottom: '20px'
          }}
        >
          AI COSMETIC INTELLIGENCE
        </div>

        <h1
          style={{
            fontSize: '64px',
            fontWeight: '800',
            marginBottom: '20px'
          }}
        >
          FORMULENS LAB
        </h1>

        <p
          style={{
            fontSize: '22px',
            color: '#cccccc',
            maxWidth: '900px',
            margin: '0 auto 60px'
          }}
        >
          AI-платформа для анализа кожи, анализа косметических формул,
          создания домашних рутин и профессиональных протоколов.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(350px,1fr))',
            gap: '30px'
          }}
        >

          {/* CLIENT */}

          <div
            style={{
              background: '#07071b',
              border: '1px solid #222',
              borderRadius: '30px',
              padding: '40px'
            }}
          >
            <h2
              style={{
                fontSize: '38px',
                marginBottom: '10px'
              }}
            >
              CLIENT
            </h2>

            <p
              style={{
                color: '#9ca3af',
                marginBottom: '20px'
              }}
            >
              Для домашнего ухода
            </p>

            <div
              style={{
                fontSize: '52px',
                fontWeight: '800',
                marginBottom: '10px'
              }}
            >
              9€
            </div>

            <div
              style={{
                color: '#00ff88',
                marginBottom: '30px'
              }}
            >
              3 дня бесплатно
            </div>

            <ul
              style={{
                textAlign: 'left',
                lineHeight: '2'
              }}
            >
              <li>✔ Анализ формулы</li>
              <li>✔ Анализ кожи</li>
              <li>✔ Увлажнение</li>
              <li>✔ Пигментация</li>
              <li>✔ Морщины</li>
              <li>✔ Акне</li>
              <li>✔ Домашняя рутина</li>
              <li>✔ Рекомендации Summecosmetics</li>
            </ul>

            <Link href="/client">
              <button
                style={{
                  width: '100%',
                  marginTop: '30px',
                  padding: '18px',
                  border: 'none',
                  borderRadius: '16px',
                  background:
                    'linear-gradient(90deg,#7c3aed,#ff00aa)',
                  color: 'white',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                Попробовать бесплатно
              </button>
            </Link>
          </div>

          {/* PRO */}

          <div
            style={{
              background: '#07071b',
              border: '2px solid #ff00aa',
              borderRadius: '30px',
              padding: '40px',
              position: 'relative'
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: '#ff00aa',
                padding: '8px 14px',
                borderRadius: '999px',
                fontSize: '12px'
              }}
            >
              FOUNDER PRICE
            </div>

            <h2
              style={{
                fontSize: '38px',
                marginBottom: '10px'
              }}
            >
              PROFESSIONAL
            </h2>

            <p
              style={{
                color: '#9ca3af',
                marginBottom: '20px'
              }}
            >
              Для косметологов
            </p>

            <div
              style={{
                fontSize: '52px',
                fontWeight: '800',
                marginBottom: '10px'
              }}
            >
              29€
            </div>

            <div
              style={{
                color: '#00ff88',
                marginBottom: '30px'
              }}
            >
              7 дней бесплатно
            </div>

            <ul
              style={{
                textAlign: 'left',
                lineHeight: '2'
              }}
            >
              <li>✔ Formula Analyzer PRO</li>
              <li>✔ Skin Analysis PRO</li>
              <li>✔ 7 параметров кожи</li>
              <li>✔ Protocol Builder</li>
              <li>✔ Photo → Protocol</li>
              <li>✔ PDF Reports</li>
              <li>✔ Client History</li>
              <li>✔ Summecosmetics Protocols</li>
            </ul>

            <Link href="/pro">
              <button
                style={{
                  width: '100%',
                  marginTop: '30px',
                  padding: '18px',
                  border: 'none',
                  borderRadius: '16px',
                  background:
                    'linear-gradient(90deg,#7c3aed,#ff00aa)',
                  color: 'white',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                Попробовать бесплатно
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
