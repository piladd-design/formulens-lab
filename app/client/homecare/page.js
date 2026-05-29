'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function ClientHomecarePage() {
  const [age, setAge] = useState('')
  const [skinType, setSkinType] = useState('')
  const [concerns, setConcerns] = useState('')
  const [done, setDone] = useState(false)

  const createRoutine = () => {
    if (!age.trim() || !skinType.trim() || !concerns.trim()) return
    setDone(true)
  }

  return (
    <main style={styles.main}>
      <div style={styles.wrap}>
        <Link href="/client" style={styles.back}>
          ← Client Dashboard
        </Link>

        <h1 style={styles.h1}>Домашняя рутина</h1>

        <p style={styles.sub}>
          Создайте персональную стратегию домашнего ухода по возрасту, типу кожи
          и основным задачам. Позже здесь будут точные продукты Summecosmetics.
        </p>

        <section style={styles.grid}>
          <div style={styles.panel}>
            <h2 style={styles.h2}>Описание кожи</h2>

            <label style={styles.label}>Возраст</label>
            <input
              value={age}
              onChange={(e) => {
                setAge(e.target.value)
                setDone(false)
              }}
              placeholder="Например: 45"
              style={styles.input}
            />

            <label style={styles.label}>Тип кожи</label>
            <input
              value={skinType}
              onChange={(e) => {
                setSkinType(e.target.value)
                setDone(false)
              }}
              placeholder="Например: сухая, чувствительная"
              style={styles.input}
            />

            <label style={styles.label}>Основные проблемы</label>
            <textarea
              value={concerns}
              onChange={(e) => {
                setConcerns(e.target.value)
                setDone(false)
              }}
              placeholder="Например: сухость, морщины, покраснение, пигментация"
              style={styles.textarea}
            />

            <button
              onClick={createRoutine}
              disabled={!age.trim() || !skinType.trim() || !concerns.trim()}
              style={{
                ...styles.primaryBtn,
                opacity:
                  age.trim() && skinType.trim() && concerns.trim() ? 1 : 0.45,
                cursor:
                  age.trim() && skinType.trim() && concerns.trim()
                    ? 'pointer'
                    : 'not-allowed',
              }}
            >
              ✨ Создать домашний уход
            </button>
          </div>

          <div style={styles.panel}>
            {!done ? (
              <div style={styles.empty}>
                Заполните описание кожи, чтобы создать рутину.
              </div>
            ) : (
              <>
                <h2 style={styles.h2}>Стратегия ухода</h2>

                <p style={styles.text}>
                  Для кожи {age} лет с характеристикой “{skinType}” и задачами
                  “{concerns}” рекомендуется мягкая, последовательная рутина с
                  акцентом на восстановление барьера, увлажнение и постепенную
                  коррекцию основных признаков.
                </p>

                <div style={styles.priorityBox}>
                  <h3 style={styles.infoTitle}>Приоритеты</h3>
                  <ul style={styles.list}>
                    <li>Восстановление и защита кожного барьера</li>
                    <li>Стабильное увлажнение утром и вечером</li>
                    <li>Мягкая работа с воспалениями и покраснением</li>
                    <li>Постепенная коррекция пигментации и возрастных признаков</li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </section>

        {done && (
          <section style={styles.resultGrid}>
            <Info title="Утро">
              1. Мягкое очищение — ESSENTIAL. <br />
              2. Увлажняющий этап — GLACIAR. <br />
              3. При чувствительности — NICELY. <br />
              4. При пигментации или тусклости — CELL C / BECLARITY. <br />
              5. Обязательно SPF — SUMMESUN.
            </Info>

            <Info title="Вечер">
              1. Очищение без пересушивания — ESSENTIAL / BALANCE. <br />
              2. Барьерная поддержка — NICELY. <br />
              3. При воспалениях — BALANCE. <br />
              4. При возрастных признаках — CELL / MYCODE. <br />
              5. Завершение уходом для восстановления кожи.
            </Info>

            <Info title="Еженедельный уход">
              1–2 раза в неделю мягкое обновление кожи. <br />
              При чувствительности избегать агрессивных пилингов. <br />
              При обезвоженности усилить GLACIAR. <br />
              При воспалениях не перегружать кожу активами.
            </Info>

            <Info title="Summecosmetics-направления">
              GLACIAR — увлажнение. <br />
              NICELY — чувствительность и барьер. <br />
              BALANCE — акне и себум. <br />
              BECLARITY — пигментация. <br />
              CELL C — сияние и антиоксидантная защита. <br />
              CELL / MYCODE — возрастные признаки.
            </Info>
          </section>
        )}
      </div>
    </main>
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
    maxWidth: '860px',
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
  label: {
    display: 'block',
    color: '#bdbdbd',
    marginBottom: '10px',
    marginTop: '18px',
    fontSize: '16px',
  },
  input: {
    width: '100%',
    background: '#050505',
    border: '1px solid #262626',
    borderRadius: '18px',
    color: 'white',
    padding: '18px',
    fontSize: '18px',
    outline: 'none',
  },
  textarea: {
    width: '100%',
    minHeight: '170px',
    background: '#050505',
    border: '1px solid #262626',
    borderRadius: '18px',
    color: 'white',
    padding: '18px',
    fontSize: '18px',
    resize: 'vertical',
    outline: 'none',
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
  priorityBox: {
    marginTop: '26px',
    background: '#0d0d18',
    border: '1px solid #252525',
    borderRadius: '22px',
    padding: '24px',
  },
  list: {
    color: '#d4d4d4',
    lineHeight: 1.9,
    fontSize: '17px',
    paddingLeft: '22px',
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
