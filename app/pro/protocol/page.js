'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function ProProtocolPage() {
  const [clientAge, setClientAge] = useState('')
  const [skinType, setSkinType] = useState('')
  const [concerns, setConcerns] = useState('')
  const [goal, setGoal] = useState('')
  const [done, setDone] = useState(false)

  const canCreate =
    clientAge.trim() && skinType.trim() && concerns.trim() && goal.trim()

  const createProtocol = () => {
    if (!canCreate) return
    setDone(true)
  }

  return (
    <main style={styles.main}>
      <div style={styles.wrap}>
        <Link href="/pro" style={styles.back}>
          ← Professional Dashboard
        </Link>

        <h1 style={styles.h1}>Protocol Builder</h1>

        <p style={styles.sub}>
          Создание профессионального косметологического протокола по описанию
          клиента: возраст, тип кожи, жалобы и цель процедуры.
        </p>

        <section style={styles.grid}>
          <div style={styles.panel}>
            <h2 style={styles.h2}>Данные клиента</h2>

            <label style={styles.label}>Возраст</label>
            <input
              value={clientAge}
              onChange={(e) => {
                setClientAge(e.target.value)
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
              placeholder="Например: сухая, чувствительная, реактивная"
              style={styles.input}
            />

            <label style={styles.label}>Основные проблемы</label>
            <textarea
              value={concerns}
              onChange={(e) => {
                setConcerns(e.target.value)
                setDone(false)
              }}
              placeholder="Например: купероз, покраснение, обезвоженность, морщины, пигментация"
              style={styles.textarea}
            />

            <label style={styles.label}>Цель процедуры</label>
            <textarea
              value={goal}
              onChange={(e) => {
                setGoal(e.target.value)
                setDone(false)
              }}
              placeholder="Например: успокоить кожу, восстановить барьер, улучшить увлажнение и тон"
              style={styles.textarea}
            />

            <button
              onClick={createProtocol}
              disabled={!canCreate}
              style={{
                ...styles.primaryBtn,
                opacity: canCreate ? 1 : 0.45,
                cursor: canCreate ? 'pointer' : 'not-allowed',
              }}
            >
              ✨ Создать протокол
            </button>
          </div>

          <div style={styles.panel}>
            {!done ? (
              <div style={styles.empty}>
                Заполните данные клиента, чтобы создать профессиональный
                протокол.
              </div>
            ) : (
              <>
                <h2 style={styles.h2}>Professional Strategy</h2>

                <p style={styles.text}>
                  Для клиента {clientAge} лет с типом кожи “{skinType}” и
                  задачами “{concerns}” рекомендуется мягкий
                  барьерно-восстанавливающий протокол. Основная цель —
                  стабилизировать кожу, снизить реактивность, восстановить
                  комфорт и подготовить кожу к дальнейшей работе с текстурой,
                  пигментацией и возрастными признаками.
                </p>

                <div style={styles.priorityBox}>
                  <h3 style={styles.infoTitle}>Приоритеты процедуры</h3>
                  <ul style={styles.list}>
                    <li>Снижение реактивности и покраснения</li>
                    <li>Восстановление барьерной функции</li>
                    <li>Интенсивное увлажнение</li>
                    <li>Мягкая работа без агрессивной стимуляции</li>
                    <li>Подготовка кожи к последующим активным протоколам</li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </section>

        {done && (
          <>
            <section style={styles.protocolSection}>
              <h2 style={styles.h2}>Кабинетный протокол</h2>

              <div style={styles.steps}>
                <Step
                  number="01"
                  title="Подготовка и очищение"
                  text="Мягкое очищение кожи без пересушивания. Рекомендуемое направление: ESSENTIAL CARE CONCEPT. Цель — удалить загрязнения, подготовить кожу и не усилить реактивность."
                />

                <Step
                  number="02"
                  title="Тонизация и стабилизация"
                  text="Восстановление комфорта кожи после очищения. При чувствительности приоритет — NICELY. При обезвоженности можно подключить GLACIAR."
                />

                <Step
                  number="03"
                  title="Барьерно-успокаивающий этап"
                  text="Основной этап процедуры: снижение реактивности, поддержка барьера, уменьшение ощущения стресса кожи. Приоритетные линии: NICELY + GLACIAR."
                />

                <Step
                  number="04"
                  title="Коррекция по проблеме"
                  text="Если есть воспалительные элементы — мягко подключить BALANCE. При пигментации после стабилизации — BECLARITY / CELL C. Избегать агрессивных кислот при выраженной реактивности."
                />

                <Step
                  number="05"
                  title="Завершение процедуры"
                  text="Восстановление, защита и комфорт. При дневной процедуре обязательно завершить SPF-направлением SUMMESUN."
                />
              </div>
            </section>

            <section style={styles.resultGrid}>
              <Info title="Домашний протокол">
                Утро: мягкое очищение, GLACIAR для увлажнения, NICELY для
                барьера, SUMMESUN SPF. <br />
                Вечер: очищение, NICELY для восстановления, при воспалениях —
                BALANCE локально или курсом.
              </Info>

              <Info title="Чего избегать">
                Агрессивные кислоты, частые пилинги, сильная ретиноидная
                нагрузка, перегрев, травматичные процедуры до стабилизации
                барьера.
              </Info>

              <Info title="Summecosmetics-направления">
                ESSENTIAL — очищение и подготовка. <br />
                NICELY — чувствительность и барьер. <br />
                GLACIAR — увлажнение. <br />
                BALANCE — воспалительные элементы. <br />
                BECLARITY / CELL C — тон и пигментация после стабилизации.
              </Info>

              <Info title="Professional Note">
                Этот протокол является косметологической стратегией, а не
                медицинским диагнозом. При выраженных дерматологических
                состояниях клиенту следует рекомендовать консультацию врача.
              </Info>
            </section>
          </>
        )}
      </div>
    </main>
  )
}

function Step({ number, title, text }) {
  return (
    <div style={styles.step}>
      <div style={styles.stepNumber}>{number}</div>
      <div>
        <h3 style={styles.stepTitle}>{title}</h3>
        <p style={styles.stepText}>{text}</p>
      </div>
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
    minHeight: '135px',
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
    minHeight: '560px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#888',
    fontSize: '22px',
    textAlign: 'center',
    lineHeight: 1.6,
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
  protocolSection: {
    marginTop: '34px',
    background: 'rgba(12,12,24,0.92)',
    border: '1px solid #242424',
    borderRadius: '30px',
    padding: '34px',
  },
  steps: {
    display: 'grid',
    gap: '18px',
  },
  step: {
    display: 'grid',
    gridTemplateColumns: '80px 1fr',
    gap: '20px',
    background: '#0d0d18',
    border: '1px solid #252525',
    borderRadius: '22px',
    padding: '22px',
  },
  stepNumber: {
    width: '62px',
    height: '62px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg,#7b2cff,#ff00aa)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 900,
    fontSize: '18px',
  },
  stepTitle: {
    fontSize: '22px',
    marginBottom: '10px',
  },
  stepText: {
    color: '#d4d4d4',
    lineHeight: 1.7,
    fontSize: '17px',
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
