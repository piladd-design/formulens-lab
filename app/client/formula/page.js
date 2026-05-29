'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function ClientFormulaPage() {
  const [formula, setFormula] = useState('')
  const [done, setDone] = useState(false)

  const analyzeFormula = () => {
    if (!formula.trim()) return
    setDone(true)
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at top left,#1a1028 0%,#050505 35%,#000 100%)',
        color: 'white',
        padding: '50px 6%',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
        <Link href="/client" style={{ color: '#aaa', textDecoration: 'none' }}>
          ← Client Dashboard
        </Link>

        <h1
          style={{
            fontSize: 'clamp(42px,6vw,72px)',
            margin: '40px 0 16px',
            fontWeight: 900,
          }}
        >
          Анализ формулы
        </h1>

        <p
          style={{
            color: '#bdbdbd',
            fontSize: '22px',
            maxWidth: '820px',
            lineHeight: 1.6,
            marginBottom: '44px',
          }}
        >
          Вставьте INCI-состав косметического продукта и получите понятный
          анализ пользы, рисков и совместимости с кожей.
        </p>

        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))',
            gap: '30px',
          }}
        >
          <div style={panel}>
            <h2 style={h2}>INCI-состав</h2>

            <textarea
              value={formula}
              onChange={(e) => {
                setFormula(e.target.value)
                setDone(false)
              }}
              placeholder="Aqua, Glycerin, Niacinamide, Panthenol..."
              style={{
                width: '100%',
                minHeight: '280px',
                background: '#050505',
                border: '1px solid #262626',
                borderRadius: '22px',
                color: 'white',
                padding: '24px',
                fontSize: '19px',
                resize: 'vertical',
                outline: 'none',
              }}
            />

            <button
              onClick={analyzeFormula}
              disabled={!formula.trim()}
              style={{
                width: '100%',
                marginTop: '22px',
                padding: '22px',
                borderRadius: '20px',
                border: 'none',
                background: formula.trim()
                  ? 'linear-gradient(90deg,#7b2cff,#ff00aa)'
                  : '#222',
                color: 'white',
                fontSize: '20px',
                fontWeight: 900,
                cursor: formula.trim() ? 'pointer' : 'not-allowed',
                opacity: formula.trim() ? 1 : 0.45,
              }}
            >
              ✨ Анализировать формулу
            </button>
          </div>

          <div style={panel}>
            {!done ? (
              <div style={empty}>
                Введите состав и нажмите анализ.
              </div>
            ) : (
              <>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '26px',
                    marginBottom: '30px',
                  }}
                >
                  <div style={scoreCircle}>90</div>

                  <div>
                    <div style={{ fontSize: '44px', fontWeight: 900 }}>
                      90/100
                    </div>

                    <div
                      style={{
                        display: 'inline-block',
                        marginTop: '10px',
                        padding: '9px 16px',
                        borderRadius: '999px',
                        background: '#123d1f',
                        color: '#66ff99',
                        fontWeight: 800,
                      }}
                    >
                      ✔ Хорошая формула
                    </div>
                  </div>
                </div>

                <Metric label="Увлажнение" value={92} />
                <Metric label="Поддержка барьера" value={84} />
                <Metric label="Антивозрастной потенциал" value={76} />
                <Metric label="Совместимость при акне" value={88} />
                <Metric label="Риск раздражения" value={14} green />

                <Info title="Ключевые преимущества">
                  Формула демонстрирует хороший потенциал увлажнения,
                  поддержку кожного барьера и низкий риск раздражения при
                  корректном применении.
                </Info>

                <Info title="Рекомендация">
                  Для домашнего ухода логично сочетать такую формулу с
                  увлажняющей и барьерной стратегией. В экосистеме
                  Summecosmetics это направление может соответствовать линиям
                  GLACIAR и NICELY.
                </Info>
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}

function Metric({ label, value, green }) {
  return (
    <div
      style={{
        background: '#0d0d18',
        border: '1px solid #252525',
        borderRadius: '18px',
        padding: '18px',
        marginBottom: '16px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '12px',
          color: '#e8e8e8',
          fontWeight: 700,
        }}
      >
        <span>{label}</span>
        <span>{value}/100</span>
      </div>

      <div
        style={{
          height: '10px',
          background: '#1c1c1c',
          borderRadius: '999px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${value}%`,
            height: '100%',
            background: green
              ? '#44ff88'
              : 'linear-gradient(90deg,#7b2cff,#ff00aa)',
          }}
        />
      </div>
    </div>
  )
}

function Info({ title, children }) {
  return (
    <div
      style={{
        marginTop: '22px',
        background: '#0d0d18',
        border: '1px solid #252525',
        borderRadius: '22px',
        padding: '24px',
      }}
    >
      <h3 style={{ fontSize: '22px', marginBottom: '14px' }}>{title}</h3>
      <p style={{ color: '#d4d4d4', lineHeight: 1.7, fontSize: '17px' }}>
        {children}
      </p>
    </div>
  )
}

const panel = {
  background: 'rgba(12,12,24,0.92)',
  border: '1px solid #242424',
  borderRadius: '30px',
  padding: '34px',
}

const h2 = {
  fontSize: '30px',
  marginBottom: '22px',
}

const empty = {
  minHeight: '360px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#888',
  fontSize: '22px',
  textAlign: 'center',
}

const scoreCircle = {
  width: '130px',
  height: '130px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg,#7b2cff,#ff00aa)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '48px',
  fontWeight: 900,
}
