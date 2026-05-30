'use client'

import Link from 'next/link'
import { useState } from 'react'

const translations = {
  DE: {
    back: '← Home Care Dashboard',
    title: 'Formelanalyse',
    subtitle:
      'Fügen Sie die INCI-Liste eines kosmetischen Produkts ein und erhalten Sie eine verständliche Analyse zu Nutzen, Risiken und Hautverträglichkeit.',
    inci: 'INCI-Liste',
    analyze: '✨ Formel analysieren',
    empty: 'Geben Sie die INCI-Liste ein und starten Sie die Analyse.',
    goodFormula: '✔ Gute Formel',
    hydration: 'Feuchtigkeit',
    barrier: 'Barriereunterstützung',
    antiAge: 'Anti-Aging-Potenzial',
    acne: 'Akne-Kompatibilität',
    irritation: 'Irritationsrisiko',
    benefits: 'Hauptvorteile',
    benefitsText:
      'Die Formel zeigt ein gutes Potenzial für Feuchtigkeit, Unterstützung der Hautbarriere und ein niedriges Irritationsrisiko bei korrekter Anwendung.',
    recommendation: 'Empfehlung',
    recommendationText:
      'Für die Homecare-Strategie lässt sich diese Formel sinnvoll mit feuchtigkeitsspendender und barrierestärkender Pflege kombinieren. Innerhalb von Summecosmetics passt dies besonders zu GLACIAR und NICELY.',
  },

  RU: {
    back: '← Домашний уход',
    title: 'Анализ формулы',
    subtitle:
      'Вставьте INCI-состав косметического продукта и получите понятный анализ пользы, рисков и совместимости с кожей.',
    inci: 'INCI-состав',
    analyze: '✨ Анализировать формулу',
    empty: 'Введите состав и нажмите анализ.',
    goodFormula: '✔ Хорошая формула',
    hydration: 'Увлажнение',
    barrier: 'Поддержка барьера',
    antiAge: 'Антивозрастной потенциал',
    acne: 'Совместимость при акне',
    irritation: 'Риск раздражения',
    benefits: 'Ключевые преимущества',
    benefitsText:
      'Формула демонстрирует хороший потенциал увлажнения, поддержку кожного барьера и низкий риск раздражения при корректном применении.',
    recommendation: 'Рекомендация',
    recommendationText:
      'Для домашнего ухода логично сочетать такую формулу с увлажняющей и барьерной стратегией. В экосистеме Summecosmetics это направление может соответствовать линиям GLACIAR и NICELY.',
  },

  EN: {
    back: '← Home Care Dashboard',
    title: 'Formula Analysis',
    subtitle:
      'Paste the INCI list of a cosmetic product and receive a clear analysis of benefits, risks and skin compatibility.',
    inci: 'INCI Ingredients',
    analyze: '✨ Analyze Formula',
    empty: 'Enter the INCI list and start the analysis.',
    goodFormula: '✔ Good Formula',
    hydration: 'Hydration',
    barrier: 'Barrier Support',
    antiAge: 'Anti-Aging Potential',
    acne: 'Acne Compatibility',
    irritation: 'Irritation Risk',
    benefits: 'Key Benefits',
    benefitsText:
      'The formula shows good potential for hydration, barrier support and low irritation risk when used correctly.',
    recommendation: 'Recommendation',
    recommendationText:
      'For a homecare strategy, this formula can be combined well with hydrating and barrier-supporting skincare. Within Summecosmetics, this direction corresponds especially to GLACIAR and NICELY.',
  },
}

export default function ClientFormulaPage() {
  const [lang, setLang] = useState('DE')
  const [formula, setFormula] = useState('')
  const [done, setDone] = useState(false)

  const t = translations[lang]

  const analyzeFormula = () => {
    if (!formula.trim()) return
    setDone(true)
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

        <section style={styles.grid}>
          <div style={styles.panel}>
            <h2 style={styles.h2}>{t.inci}</h2>

            <textarea
              value={formula}
              onChange={(e) => {
                setFormula(e.target.value)
                setDone(false)
              }}
              placeholder="Aqua, Glycerin, Niacinamide, Panthenol..."
              style={styles.textarea}
            />

            <button
              onClick={analyzeFormula}
              disabled={!formula.trim()}
              style={{
                ...styles.primaryBtn,
                background: formula.trim()
                  ? 'linear-gradient(90deg,#7b2cff,#ff00aa)'
                  : '#222',
                cursor: formula.trim() ? 'pointer' : 'not-allowed',
                opacity: formula.trim() ? 1 : 0.45,
              }}
            >
              {t.analyze}
            </button>
          </div>

          <div style={styles.panel}>
            {!done ? (
              <div style={styles.empty}>{t.empty}</div>
            ) : (
              <>
                <div style={styles.scoreRow}>
                  <div style={styles.scoreCircle}>90</div>

                  <div>
                    <div style={styles.scoreText}>90/100</div>

                    <div style={styles.badge}>{t.goodFormula}</div>
                  </div>
                </div>

                <Metric label={t.hydration} value={92} />
                <Metric label={t.barrier} value={84} />
                <Metric label={t.antiAge} value={76} />
                <Metric label={t.acne} value={88} />
                <Metric label={t.irritation} value={14} green />

                <Info title={t.benefits}>{t.benefitsText}</Info>

                <Info title={t.recommendation}>{t.recommendationText}</Info>
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
    <div style={styles.metric}>
      <div style={styles.metricHeader}>
        <span>{label}</span>
        <span>{value}/100</span>
      </div>

      <div style={styles.barBg}>
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
  h2: {
    fontSize: '30px',
    marginBottom: '22px',
  },
  textarea: {
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
  },
  primaryBtn: {
    width: '100%',
    marginTop: '22px',
    padding: '22px',
    borderRadius: '20px',
    border: 'none',
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
  scoreRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '26px',
    marginBottom: '30px',
  },
  scoreCircle: {
    width: '130px',
    height: '130px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg,#7b2cff,#ff00aa)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '48px',
    fontWeight: 900,
  },
  scoreText: {
    fontSize: '44px',
    fontWeight: 900,
  },
  badge: {
    display: 'inline-block',
    marginTop: '10px',
    padding: '9px 16px',
    borderRadius: '999px',
    background: '#123d1f',
    color: '#66ff99',
    fontWeight: 800,
  },
  metric: {
    background: '#0d0d18',
    border: '1px solid #252525',
    borderRadius: '18px',
    padding: '18px',
    marginBottom: '16px',
  },
  metricHeader: {
    display: 'flex',
    justifyContent: 'space-between',
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
  info: {
    marginTop: '22px',
    background: '#0d0d18',
    border: '1px solid #252525',
    borderRadius: '22px',
    padding: '24px',
  },
  infoTitle: {
    fontSize: '22px',
    marginBottom: '14px',
  },
  infoText: {
    color: '#d4d4d4',
    lineHeight: 1.7,
    fontSize: '17px',
  },
}
