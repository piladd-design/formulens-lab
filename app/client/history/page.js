'use client'

import Link from 'next/link'
import { useState } from 'react'

const translations = {
  DE: {
    back: '← Home Care Dashboard',
    title: 'Analyse-Historie',
    subtitle:
      'Speichern Sie Hautanalysen, Formelergebnisse und Homecare-Routinen, um Veränderungen Ihrer Haut über die Zeit zu verfolgen.',
    add: '＋ Neue Analyse',
    list: 'Meine Analysen',
    type: 'Typ',
    date: 'Datum',
    score: 'Score',
    focus: 'Fokus',
    skin: 'Hautanalyse',
    formula: 'Formelanalyse',
    homecare: 'Homecare Routine',
  },

  RU: {
    back: '← Домашний уход',
    title: 'История анализов',
    subtitle:
      'Сохраняйте анализы кожи, результаты анализа формул и домашние рутины, чтобы отслеживать изменения кожи со временем.',
    add: '＋ Новый анализ',
    list: 'Мои анализы',
    type: 'Тип',
    date: 'Дата',
    score: 'Оценка',
    focus: 'Фокус',
    skin: 'Анализ кожи',
    formula: 'Анализ формулы',
    homecare: 'Домашняя рутина',
  },

  EN: {
    back: '← Home Care Dashboard',
    title: 'Analysis History',
    subtitle:
      'Save skin analyses, formula results and homecare routines to track changes in your skin over time.',
    add: '＋ New Analysis',
    list: 'My Analyses',
    type: 'Type',
    date: 'Date',
    score: 'Score',
    focus: 'Focus',
    skin: 'Skin Analysis',
    formula: 'Formula Analysis',
    homecare: 'Homecare Routine',
  },
}

const demoItems = [
  {
    typeKey: 'skin',
    date: '30.05.2026',
    score: '58 / 100',
    focus: 'Hydration · Acne · Pigmentation',
  },
  {
    typeKey: 'formula',
    date: '29.05.2026',
    score: '90 / 100',
    focus: 'Barrier · Hydration · Irritation Risk',
  },
  {
    typeKey: 'homecare',
    date: '28.05.2026',
    score: '—',
    focus: 'GLACIAR · NICELY · SUMMESUN',
  },
]

export default function ClientHistoryPage() {
  const [lang, setLang] = useState('DE')
  const [items, setItems] = useState(demoItems)

  const t = translations[lang]

  const addAnalysis = () => {
    const today = new Date().toLocaleDateString('de-DE')

    setItems([
      {
        typeKey: 'skin',
        date: today,
        score: '—',
        focus:
          lang === 'RU'
            ? 'Новый анализ кожи'
            : lang === 'DE'
            ? 'Neue Hautanalyse'
            : 'New skin analysis',
      },
      ...items,
    ])
  }

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

        <button onClick={addAnalysis} style={styles.addBtn}>
          {t.add}
        </button>

        <section style={styles.section}>
          <h2 style={styles.h2}>{t.list}</h2>

          <div style={styles.grid}>
            {items.map((item, index) => (
              <div key={`${item.date}-${index}`} style={styles.card}>
                <div style={styles.cardTop}>
                  <div style={styles.icon}>
                    {item.typeKey === 'skin'
                      ? '📷'
                      : item.typeKey === 'formula'
                      ? '🔬'
                      : '🏠'}
                  </div>

                  <h3 style={styles.cardTitle}>{t[item.typeKey]}</h3>
                </div>

                <div style={styles.row}>
                  <span>{t.date}</span>
                  <strong>{item.date}</strong>
                </div>

                <div style={styles.row}>
                  <span>{t.score}</span>
                  <strong>{item.score}</strong>
                </div>

                <div style={styles.row}>
                  <span>{t.focus}</span>
                  <strong>{item.focus}</strong>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
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
    marginBottom: '24px',
  },
  sub: {
    color: '#bdbdbd',
    fontSize: '22px',
    lineHeight: 1.6,
    maxWidth: '900px',
    marginBottom: '36px',
  },
  addBtn: {
    padding: '18px 30px',
    borderRadius: '18px',
    border: 'none',
    background: 'linear-gradient(90deg,#7b2cff,#ff00aa)',
    color: 'white',
    fontSize: '18px',
    fontWeight: 900,
    cursor: 'pointer',
    marginBottom: '40px',
  },
  section: {
    marginTop: '10px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))',
    gap: '24px',
  },
  card: {
    background: 'rgba(12,12,24,0.92)',
    border: '1px solid #242424',
    borderRadius: '28px',
    padding: '28px',
  },
  cardTop: {
    display: 'flex',
    alignItems: 'center',
    gap: '18px',
    marginBottom: '24px',
  },
  icon: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg,#7b2cff,#ff00aa)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '28px',
  },
  cardTitle: {
    fontSize: '24px',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '12px',
    padding: '12px 0',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    color: '#d4d4d4',
  },
}
