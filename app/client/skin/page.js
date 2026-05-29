'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function ClientSkinPage() {
  const [image, setImage] = useState(null)
  const [done, setDone] = useState(false)

  const uploadImage = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    setImage(URL.createObjectURL(file))
    setDone(false)
  }

  const metrics = [
    { label: 'Увлажнение', value: 58, status: 'Снижено' },
    { label: 'Пигментация', value: 46, status: 'Умеренно' },
    { label: 'Морщины', value: 52, status: 'Ранние признаки' },
    { label: 'Акне / воспаления', value: 68, status: 'Выражено' },
  ]

  return (
    <main style={styles.main}>
      <div style={styles.wrap}>
        <Link href="/client" style={styles.back}>
          ← Client Dashboard
        </Link>

        <h1 style={styles.h1}>Анализ кожи</h1>

        <p style={styles.sub}>
          Базовая AI-диагностика для домашнего ухода: увлажнение, пигментация,
          морщины и акне / воспалительные элементы.
        </p>

        <section style={styles.grid}>
          <div style={styles.panel}>
            <h2 style={styles.h2}>Фото кожи</h2>

            <label style={{ cursor: 'pointer' }}>
              <div style={styles.uploadBox}>
                {image ? (
                  <img src={image} alt="Skin preview" style={styles.image} />
                ) : (
                  'Загрузить фото кожи'
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
              ✨ Анализировать кожу
            </button>
          </div>

          <div style={styles.panel}>
            {!done ? (
              <div style={styles.empty}>Загрузите фото для анализа кожи.</div>
            ) : (
              <>
                <h2 style={styles.h2}>Результат анализа</h2>

                <p style={styles.text}>
                  Визуально наблюдаются признаки сниженного влагоудержания,
                  воспалительной активности, неравномерности тона и ранних
                  возрастных изменений. Для домашнего ухода рекомендуется
                  барьерно-восстанавливающая и противовоспалительная стратегия.
                </p>

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
            <Info title="Домашняя рутина — утро">
              1. Мягкое очищение — ESSENTIAL или BALANCE. <br />
              2. Увлажняющий этап — GLACIAR. <br />
              3. Барьерная поддержка — NICELY. <br />
              4. При пигментации — BECLARITY или CELL C. <br />
              5. Обязательно SPF — SUMMESUN.
            </Info>

            <Info title="Домашняя рутина — вечер">
              1. Очищение без агрессивного пересушивания. <br />
              2. Успокаивающий актив — NICELY. <br />
              3. При воспалениях — BALANCE. <br />
              4. Увлажнение и восстановление — GLACIAR / NICELY. <br />
              5. Мягкое обновление 1–2 раза в неделю.
            </Info>

            <Info title="Рекомендации Summecosmetics">
              Основные направления: BALANCE для воспалений и себума, NICELY для
              чувствительности и барьера, GLACIAR для увлажнения, BECLARITY для
              пигментации, CELL C для сияния и антиоксидантной поддержки.
            </Info>
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
    padding: '50px 6%',
    fontFamily: 'Arial, sans-serif',
  },
  wrap: {
    maxWidth: '1300px',
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
    maxWidth: '820px',
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
  },
}
