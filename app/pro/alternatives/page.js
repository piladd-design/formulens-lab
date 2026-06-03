'use client'

import Link from 'next/link'
import { useState } from 'react'

const translations = {
  DE: {
    back: '← Professional Dashboard',
    title: 'AI Produkt-Alternative',
    subtitle:
      'Finden Sie eine professionelle Alternative, wenn ein Produkt nicht verfügbar ist: nach Funktion, Hautziel, Protokollschritt und Summecosmetics Linie.',

    product: 'Nicht verfügbares Produkt',
    productPlaceholder:
      'z.B. NICELY Sweet Toner, GLACIAR Serum, MYCODE 03...',
    context: 'Zusätzlicher Kontext',
    contextPlaceholder:
      'z.B. empfindliche Haut, nach Peeling, Feuchtigkeit, Kabinenprotokoll...',
    find: '✨ Alternative finden',
    finding: 'AI sucht Alternative...',
    empty:
      'Geben Sie ein fehlendes Produkt ein, um eine professionelle Alternative zu finden.',
    error: 'Alternative konnte nicht gefunden werden. Bitte versuchen Sie es erneut.',

    missingProduct: 'Fehlendes Produkt',
    productRole: 'Rolle im Protokoll',
    mainAlternative: 'Beste Alternative',
    otherAlternatives: 'Weitere Optionen',
    protocolAdjustment: 'Anpassung im Protokoll',
    caution: 'Wichtiger Hinweis',
    clientExplanation: 'Erklärung für die Kundin',
    line: 'Linie',
    why: 'Warum geeignet',
    howToUse: 'Anwendung',
    limitations: 'Grenzen der Alternative',
  },

  RU: {
    back: '← Профессиональная панель',
    title: 'AI Подбор Альтернатив',
    subtitle:
      'Профессиональный подбор замены, если продукта нет в наличии: по функции, цели кожи, этапу протокола и линии Summecosmetics.',

    product: 'Какого продукта нет?',
    productPlaceholder:
      'например: NICELY Sweet Toner, GLACIAR Serum, MYCODE 03...',
    context: 'Дополнительный контекст',
    contextPlaceholder:
      'например: чувствительная кожа, после пилинга, увлажнение, кабинетный протокол...',
    find: '✨ Найти альтернативу',
    finding: 'AI подбирает альтернативу...',
    empty:
      'Введите отсутствующий продукт, чтобы получить профессиональную замену.',
    error: 'Не удалось подобрать альтернативу. Попробуйте ещё раз.',

    missingProduct: 'Отсутствующий продукт',
    productRole: 'Роль продукта в протоколе',
    mainAlternative: 'Лучшая альтернатива',
    otherAlternatives: 'Другие варианты',
    protocolAdjustment: 'Коррекция протокола',
    caution: 'Важное замечание',
    clientExplanation: 'Объяснение для клиента',
    line: 'Линия',
    why: 'Почему подходит',
    howToUse: 'Как использовать',
    limitations: 'Ограничения замены',
  },

  EN: {
    back: '← Professional Dashboard',
    title: 'AI Product Alternative',
    subtitle:
      'Find a professional replacement when a product is unavailable: by function, skin goal, protocol step and Summecosmetics line.',

    product: 'Unavailable product',
    productPlaceholder:
      'e.g. NICELY Sweet Toner, GLACIAR Serum, MYCODE 03...',
    context: 'Additional context',
    contextPlaceholder:
      'e.g. sensitive skin, post-peel, hydration, professional protocol...',
    find: '✨ Find Alternative',
    finding: 'AI is finding alternative...',
    empty:
      'Enter an unavailable product to receive a professional alternative.',
    error: 'Alternative could not be found. Please try again.',

    missingProduct: 'Missing product',
    productRole: 'Role in protocol',
    mainAlternative: 'Best alternative',
    otherAlternatives: 'Other options',
    protocolAdjustment: 'Protocol adjustment',
    caution: 'Important note',
    clientExplanation: 'Client explanation',
    line: 'Line',
    why: 'Why suitable',
    howToUse: 'How to use',
    limitations: 'Limitations',
  },
}

export default function ProductAlternativesPage() {
  const [lang, setLang] = useState('DE')
  const [product, setProduct] = useState('')
  const [context, setContext] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const t = translations[lang]

  async function findAlternative() {
    if (!product.trim()) return

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await fetch('/api/product-alternative', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product,
          context,
          lang,
        }),
      })

      const data = await response.json()

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Product alternative search failed')
      }

      setResult(data.result)
    } catch (err) {
      console.error(err)
      setError(t.error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={styles.main}>
      <div style={styles.wrap}>
        <div style={styles.topBar}>
          <Link href="/pro" style={styles.back}>
            {t.back}
          </Link>

          <div style={styles.langSwitch}>
            {['DE', 'RU', 'EN'].map((item) => (
              <button
                key={item}
                onClick={() => {
                  setLang(item)
                  setResult(null)
                  setError('')
                }}
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
            <h2 style={styles.h2}>{t.product}</h2>

            <input
              value={product}
              onChange={(e) => {
                setProduct(e.target.value)
                setResult(null)
                setError('')
              }}
              placeholder={t.productPlaceholder}
              style={styles.input}
            />

            <label style={styles.fieldLabel}>
              <span>{t.context}</span>
              <textarea
                value={context}
                onChange={(e) => {
                  setContext(e.target.value)
                  setResult(null)
                  setError('')
                }}
                placeholder={t.contextPlaceholder}
                style={styles.textarea}
              />
            </label>

            <button
              onClick={findAlternative}
              disabled={!product.trim() || loading}
              style={{
                ...styles.primaryBtn,
                opacity: product.trim() && !loading ? 1 : 0.45,
                cursor:
                  product.trim() && !loading ? 'pointer' : 'not-allowed',
              }}
            >
              {loading ? t.finding : t.find}
            </button>
          </div>

          <div style={styles.panel}>
            {!result && !error && !loading && (
              <div style={styles.empty}>{t.empty}</div>
            )}

            {loading && <div style={styles.empty}>{t.finding}</div>}

            {error && <div style={styles.error}>{error}</div>}

            {result && (
              <>
                <h2 style={styles.h2}>
                  {result.title || t.mainAlternative}
                </h2>

                <Info title={t.missingProduct}>
                  {result.missingProduct}
                </Info>

                <Info title={t.productRole}>
                  {result.productRole}
                </Info>

                {result.mainAlternative && (
                  <MainAlternative
                    title={t.mainAlternative}
                    item={result.mainAlternative}
                    t={t}
                  />
                )}
              </>
            )}
          </div>
        </section>

        {result && (
          <section style={styles.resultGrid}>
            <AlternativesList
              title={t.otherAlternatives}
              items={result.otherAlternatives}
              t={t}
            />

            <Info title={t.protocolAdjustment}>
              {result.protocolAdjustment}
            </Info>

            <Info title={t.caution}>{result.caution}</Info>

            <Info title={t.clientExplanation}>
              {result.clientExplanation}
            </Info>
          </section>
        )}
      </div>
    </main>
  )
}

function MainAlternative({ title, item, t }) {
  if (!item) return null

  return (
    <div style={styles.featureCard}>
      <h3 style={styles.featureTitle}>{title}</h3>

      <div style={styles.productName}>{item.name}</div>

      {item.line && (
        <div style={styles.badge}>
          {t.line}: {item.line}
        </div>
      )}

      <Info title={t.why}>{item.why}</Info>
      <Info title={t.howToUse}>{item.howToUse}</Info>
      <Info title={t.limitations}>{item.limitations}</Info>
    </div>
  )
}

function AlternativesList({ title, items, t }) {
  if (!Array.isArray(items) || !items.length) return null

  return (
    <div style={styles.info}>
      <h3 style={styles.infoTitle}>{title}</h3>

      <div style={styles.altList}>
        {items.map((item, index) => (
          <div key={index} style={styles.altItem}>
            <strong style={styles.altName}>{item.name}</strong>

            {item.line && (
              <div style={styles.altLine}>
                {t.line}: {item.line}
              </div>
            )}

            {item.why && (
              <p style={styles.infoText}>{item.why}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function Info({ title, children }) {
  if (!children) return null

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
  input: {
    width: '100%',
    borderRadius: '18px',
    border: '1px solid #262626',
    background: '#050505',
    color: 'white',
    padding: '18px',
    fontSize: '18px',
    outline: 'none',
    marginBottom: '22px',
  },
  textarea: {
    width: '100%',
    minHeight: '170px',
    background: '#050505',
    border: '1px solid #262626',
    borderRadius: '22px',
    color: 'white',
    padding: '22px',
    fontSize: '17px',
    resize: 'vertical',
    outline: 'none',
    lineHeight: 1.6,
  },
  fieldLabel: {
    display: 'grid',
    gap: '8px',
    color: '#d8d8d8',
    fontSize: '14px',
    fontWeight: 700,
    marginBottom: '18px',
  },
  primaryBtn: {
    width: '100%',
    marginTop: '4px',
    padding: '22px',
    borderRadius: '20px',
    border: 'none',
    background: 'linear-gradient(90deg,#7b2cff,#ff00aa)',
    color: 'white',
    fontSize: '20px',
    fontWeight: 900,
  },
  empty: {
    minHeight: '430px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#888',
    fontSize: '22px',
    textAlign: 'center',
    lineHeight: 1.6,
  },
  error: {
    background: '#3b1111',
    border: '1px solid #7f1d1d',
    color: '#ffb4b4',
    borderRadius: '20px',
    padding: '22px',
    fontSize: '18px',
    lineHeight: 1.6,
  },
  resultGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))',
    gap: '24px',
    marginTop: '34px',
  },
  info: {
    background: '#0d0d18',
    border: '1px solid #252525',
    borderRadius: '22px',
    padding: '22px',
    marginBottom: '18px',
  },
  infoTitle: {
    fontSize: '22px',
    marginTop: 0,
    marginBottom: '14px',
  },
  infoText: {
    color: '#d4d4d4',
    lineHeight: 1.8,
    fontSize: '17px',
    whiteSpace: 'pre-line',
    margin: 0,
  },
  featureCard: {
    background: '#0d0d18',
    border: '1px solid rgba(255,0,170,0.35)',
    borderRadius: '26px',
    padding: '24px',
    marginTop: '18px',
  },
  featureTitle: {
    fontSize: '22px',
    marginTop: 0,
    marginBottom: '16px',
  },
  productName: {
    fontSize: '30px',
    fontWeight: 900,
    marginBottom: '14px',
  },
  badge: {
    display: 'inline-block',
    marginBottom: '18px',
    padding: '8px 12px',
    borderRadius: '999px',
    background: 'rgba(255,0,170,0.14)',
    border: '1px solid rgba(255,0,170,0.35)',
    color: '#ff8adc',
    fontWeight: 800,
    fontSize: '14px',
  },
  altList: {
    display: 'grid',
    gap: '18px',
  },
  altItem: {
    background: '#050505',
    border: '1px solid #252525',
    borderRadius: '18px',
    padding: '18px',
  },
  altName: {
    display: 'block',
    fontSize: '19px',
    marginBottom: '8px',
  },
  altLine: {
    color: '#ff8adc',
    fontWeight: 800,
    marginBottom: '8px',
    fontSize: '14px',
  },
}
