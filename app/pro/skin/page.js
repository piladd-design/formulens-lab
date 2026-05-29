'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function ProSkinPage() {
  const [image, setImage] = useState(null)
  const [done, setDone] = useState(false)

  const uploadImage = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    setImage(URL.createObjectURL(file))
    setDone(false)
  }

  const metrics = [
    { label: 'Hydration', value: 58, status: 'Reduced' },
    { label: 'Barrier Condition', value: 34, status: 'Compromised' },
    { label: 'Texture & Pores', value: 52, status: 'Moderate' },
    { label: 'Pigmentation', value: 46, status: 'Uneven' },
    { label: 'Sebum Balance', value: 61, status: 'Moderate' },
    { label: 'Aging Signs', value: 49, status: 'Early Signs' },
    { label: 'Firmness & Elasticity', value: 51, status: 'Moderate' },
  ]

  return (
    <main style={styles.main}>
      <div style={styles.wrap}>
        <Link href="/pro" style={styles.back}>
          ← Professional Dashboard
        </Link>

        <h1 style={styles.h1}>Skin Analysis PRO</h1>

        <p style={styles.sub}>
          Расширенная профессиональная диагностика кожи по 7 параметрам:
          увлажнение, барьер, текстура, пигментация, себум, возрастные признаки
          и упругость.
        </p>

        <section style={styles.grid}>
          <div style={styles.panel}>
            <h2 style={styles.h2}>Фото клиента</h2>

            <label style={{ cursor: 'pointer' }}>
              <div style={styles.uploadBox}>
                {image ? (
                  <img src={image} alt="Skin preview" style={styles.image} />
                ) : (
                  'Загрузить фото клиента'
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
              ✨ Analyze Skin PRO
            </button>
          </div>

          <div style={styles.panel}>
            {!done ? (
              <div style={styles.empty}>
                Загрузите фото клиента для профессионального анализа кожи.
              </div>
            ) : (
              <>
                <h2 style={styles.h2}>Professional Skin Overview</h2>

                <p style={styles.text}>
                  Визуально наблюдаются признаки сниженного влагоудержания,
                  выраженной реактивности, ослабленной барьерной функции,
                  воспалительной активности и неравномерности тона. Основная
                  стратегия: сначала стабилизация барьера и воспаления, затем
                  работа с текстурой, пигментацией и возрастными признаками.
                </p>

                <div style={styles.scoreBox}>
                  <div style={styles.scoreCircle}>54</div>
                  <div>
                    <div style={styles.scoreText}>54/100</div>
                    <div style={styles.scoreLabel}>Professional Skin Score</div>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>

        {done && (
          <>
            <section style={styles.visualSection}>
              <h2 style={styles.h2}>Diagnostic Map</h2>

              <div style={styles.metricGrid}>
                {metrics.map((metric) => (
                  <Metric key={metric.label} {...metric} />
                ))}
              </div>
            </section>

            <section style={styles.resultGrid}>
              <Info title="Professional Interpretation">
                Приоритетная задача — не агрессивная стимуляция, а стабилизация
                кожи: снижение реактивности, поддержка барьерной функции,
                восстановление влагоудержания и контроль воспалительных
                проявлений. После стабилизации можно постепенно подключать
                стратегии для текстуры, пигментации и возрастных признаков.
              </Info>

              <Info title="Treatment Strategy">
                1. Мягкое очищение и подготовка кожи. <br />
                2. Успокаивающий барьерный протокол. <br />
                3. Увлажнение и восстановление комфорта. <br />
                4. Только после стабилизации — мягкая коррекция текстуры и
                пигментации.
              </Info>

              <Info title="Homecare Protocol">
                Утро: мягкое очищение, увлажнение, барьерная поддержка, SPF.{' '}
                <br />
                Вечер: очищение, успокаивающий актив, восстановление барьера.{' '}
                <br />
                Временно избегать агрессивных кислот и сильной ретиноидной
                нагрузки.
              </Info>

              <Info title="Summecosmetics Direction">
                NICELY — барьер и чувствительность. <br />
                GLACIAR — увлажнение. <br />
                BALANCE — воспаления и себум. <br />
                BECLARITY — пигментация после стабилизации. <br />
                CELL C — сияние и антиоксидантная поддержка.
              </Info>
            </section>
          </>
        )}
      </div>
    </main>
  )
}

function Metric({ label, value, status }) {
  return (
    <div style={styles.metric}>
      <div style={styles.metricHeader}>
        <span>{label}</span>
        <strong>{status}</strong>
      </div>

      <div style={styles.barBg}>
        <div
          style={{
            width: `${value}%`,
            height: '100%',
            background: getBarColor(value),
          }}
        />
      </div>

      <div style={styles.metricFooter}>
        <span>{value}/100</span>
        <span>{getPriority(value)}</span>
      </div>
    </div>
  )
}

function getBarColor(value) {
  if (value < 45) return 'linear-gradient(90deg,#ff4d6d,#ff00aa)'
  if (value < 65) return 'linear-gradient(90deg,#f59e0b,#ff00aa)'
  return 'linear-gradient(90deg,#7b2cff,#ff00aa)'
}

function getPriority(value) {
  if (value < 45) return 'High priority'
  if (value < 65) return 'Moderate priority'
  return 'Stable'
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
    padding: '50px 6%',
    fontFamily: 'Arial, sans-serif',
  },
  wrap: {
    maxWidth: '1400px',
    margin: '0 auto',
  },
  back: {
    color: '#aaa',
    textDecoration: 'none',
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
  },
  infoTitle: {
    fontSize: '24px',
    marginBottom: '16px',
  },
  infoText: {
    color: '#d4d4d4',
    lineHeight: 1.8,
    fontSize: '17px',
  },
}
