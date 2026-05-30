'use client'

import Link from 'next/link'
import { useState } from 'react'

const translations = {
  DE: {
    back: '← Professional Dashboard',
    title: 'PDF-Berichte',
    subtitle:
      'Erstellen Sie professionelle Kundenberichte mit Hautanalyse, Behandlungsstrategie, Homecare-Empfehlung und Summecosmetics-Protokoll.',

    clientName: 'Kundenname',
    clientNamePlaceholder: 'Zum Beispiel: Anna Müller',
    reportType: 'Berichtstyp',
    reportTypePlaceholder: 'Hautanalyse, Protokoll, Homecare...',
    notes: 'Notizen',
    notesPlaceholder:
      'Kurze Zusammenfassung der Hautsituation, Ziele und Empfehlungen...',
    generate: '✨ Bericht vorbereiten',

    empty:
      'Füllen Sie die Berichtsdaten aus, um eine Vorschau zu erstellen.',
    preview: 'Berichtsvorschau',
    reportDate: 'Datum',
    skinOverview: 'Hautübersicht',
    strategy: 'Strategie',
    homecare: 'Homecare',
    protocol: 'Kabinenprotokoll',
    products: 'Summecosmetics-Empfehlungen',
    download: '📄 Bericht herunterladen',

    skinOverviewText:
      'Die Haut zeigt sichtbare Hinweise auf reduzierte Feuchtigkeit, leichte Reaktivität und Bedarf an Barriereunterstützung.',
    strategyText:
      'Priorität: Beruhigung, Hydration, Barriereaufbau und schrittweise Korrektur von Textur und Pigmentierung.',
    homecareText:
      'Morgens: sanfte Reinigung, Hydration, Barriereunterstützung, SPF. Abends: Reinigung, beruhigende Wirkstoffe und Regeneration.',
    protocolText:
      'ESSENTIAL → NICELY → GLACIAR → problemorientierte Korrektur → SUMMESUN SPF.',
    productsText:
      'NICELY · GLACIAR · BALANCE · BECLARITY · CELL C · SUMMESUN',
  },

  RU: {
    back: '← Профессиональная панель',
    title: 'PDF-отчёты',
    subtitle:
      'Создавайте профессиональные отчёты для клиентов: анализ кожи, стратегия процедуры, домашний уход и протокол Summecosmetics.',

    clientName: 'Имя клиента',
    clientNamePlaceholder: 'Например: Анна Иванова',
    reportType: 'Тип отчёта',
    reportTypePlaceholder: 'Анализ кожи, протокол, домашний уход...',
    notes: 'Заметки',
    notesPlaceholder:
      'Краткое описание состояния кожи, целей и рекомендаций...',
    generate: '✨ Подготовить отчёт',

    empty:
      'Заполните данные отчёта, чтобы создать предварительный просмотр.',
    preview: 'Предварительный просмотр отчёта',
    reportDate: 'Дата',
    skinOverview: 'Обзор кожи',
    strategy: 'Стратегия',
    homecare: 'Домашний уход',
    protocol: 'Кабинетный протокол',
    products: 'Рекомендации Summecosmetics',
    download: '📄 Скачать отчёт',

    skinOverviewText:
      'Кожа демонстрирует признаки сниженного увлажнения, лёгкой реактивности и потребности в поддержке барьерной функции.',
    strategyText:
      'Приоритет: успокоение, увлажнение, восстановление барьера и постепенная коррекция текстуры и пигментации.',
    homecareText:
      'Утро: мягкое очищение, увлажнение, поддержка барьера, SPF. Вечер: очищение, успокаивающие активы и восстановление.',
    protocolText:
      'ESSENTIAL → NICELY → GLACIAR → коррекция по проблеме → SUMMESUN SPF.',
    productsText:
      'NICELY · GLACIAR · BALANCE · BECLARITY · CELL C · SUMMESUN',
  },

  EN: {
    back: '← Professional Dashboard',
    title: 'PDF Reports',
    subtitle:
      'Create professional client reports with skin analysis, treatment strategy, homecare recommendation and Summecosmetics protocol.',

    clientName: 'Client Name',
    clientNamePlaceholder: 'Example: Anna Miller',
    reportType: 'Report Type',
    reportTypePlaceholder: 'Skin analysis, protocol, homecare...',
    notes: 'Notes',
    notesPlaceholder:
      'Short summary of skin condition, goals and recommendations...',
    generate: '✨ Prepare Report',

    empty:
      'Fill in the report data to create a preview.',
    preview: 'Report Preview',
    reportDate: 'Date',
    skinOverview: 'Skin Overview',
    strategy: 'Strategy',
    homecare: 'Homecare',
    protocol: 'Treatment Protocol',
    products: 'Summecosmetics Recommendations',
    download: '📄 Download Report',

    skinOverviewText:
      'The skin shows visible signs of reduced hydration, mild reactivity and need for barrier support.',
    strategyText:
      'Priority: calming, hydration, barrier restoration and gradual correction of texture and pigmentation.',
    homecareText:
      'Morning: gentle cleansing, hydration, barrier support, SPF. Evening: cleansing, calming actives and recovery.',
    protocolText:
      'ESSENTIAL → NICELY → GLACIAR → concern-oriented correction → SUMMESUN SPF.',
    productsText:
      'NICELY · GLACIAR · BALANCE · BECLARITY · CELL C · SUMMESUN',
  },
}

export default function ProReportsPage() {
  const [lang, setLang] = useState('DE')
  const [clientName, setClientName] = useState('')
  const [reportType, setReportType] = useState('')
  const [notes, setNotes] = useState('')
  const [done, setDone] = useState(false)

  const t = translations[lang]

  const canGenerate =
    clientName.trim() && reportType.trim() && notes.trim()

  const generateReport = () => {
    if (!canGenerate) return
    setDone(true)
  }

  const downloadReport = () => {
    const content = `
FORMULENS LAB

${t.title}

${t.clientName}: ${clientName}
${t.reportType}: ${reportType}
${t.reportDate}: ${new Date().toLocaleDateString()}

${t.notes}
${notes}

${t.skinOverview}
${t.skinOverviewText}

${t.strategy}
${t.strategyText}

${t.homecare}
${t.homecareText}

${t.protocol}
${t.protocolText}

${t.products}
${t.productsText}
`

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = 'FORMULENS-LAB-REPORT.txt'
    link.click()

    URL.revokeObjectURL(url)
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
            <h2 style={styles.h2}>{t.title}</h2>

            <Field
              label={t.clientName}
              value={clientName}
              setValue={setClientName}
              placeholder={t.clientNamePlaceholder}
              setDone={setDone}
            />

            <Field
              label={t.reportType}
              value={reportType}
              setValue={setReportType}
              placeholder={t.reportTypePlaceholder}
              setDone={setDone}
            />

            <TextArea
              label={t.notes}
              value={notes}
              setValue={setNotes}
              placeholder={t.notesPlaceholder}
              setDone={setDone}
            />

            <button
              onClick={generateReport}
              disabled={!canGenerate}
              style={{
                ...styles.primaryBtn,
                opacity: canGenerate ? 1 : 0.45,
                cursor: canGenerate ? 'pointer' : 'not-allowed',
              }}
            >
              {t.generate}
            </button>
          </div>

          <div style={styles.panel}>
            {!done ? (
              <div style={styles.empty}>{t.empty}</div>
            ) : (
              <>
                <h2 style={styles.h2}>{t.preview}</h2>

                <div style={styles.reportHeader}>
                  <div>
                    <div style={styles.muted}>{t.clientName}</div>
                    <div style={styles.reportName}>{clientName}</div>
                  </div>

                  <div>
                    <div style={styles.muted}>{t.reportDate}</div>
                    <div style={styles.reportName}>
                      {new Date().toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div style={styles.previewBox}>
                  <h3>{t.reportType}</h3>
                  <p>{reportType}</p>

                  <h3>{t.notes}</h3>
                  <p>{notes}</p>
                </div>

                <button onClick={downloadReport} style={styles.secondaryBtn}>
                  {t.download}
                </button>
              </>
            )}
          </div>
        </section>

        {done && (
          <section style={styles.resultGrid}>
            <Info title={t.skinOverview}>{t.skinOverviewText}</Info>

            <Info title={t.strategy}>{t.strategyText}</Info>

            <Info title={t.homecare}>{t.homecareText}</Info>

            <Info title={t.protocol}>{t.protocolText}</Info>

            <Info title={t.products}>{t.productsText}</Info>
          </section>
        )}
      </div>
    </main>
  )
}

function Field({ label, value, setValue, placeholder, setDone }) {
  return (
    <>
      <label style={styles.label}>{label}</label>
      <input
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          setDone(false)
        }}
        placeholder={placeholder}
        style={styles.input}
      />
    </>
  )
}

function TextArea({ label, value, setValue, placeholder, setDone }) {
  return (
    <>
      <label style={styles.label}>{label}</label>
      <textarea
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          setDone(false)
        }}
        placeholder={placeholder}
        style={styles.textarea}
      />
    </>
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
    maxWidth: '1400px',
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
  secondaryBtn: {
    width: '100%',
    marginTop: '24px',
    padding: '20px',
    borderRadius: '20px',
    border: 'none',
    background: 'linear-gradient(90deg,#7b2cff,#ff00aa)',
    color: 'white',
    fontSize: '18px',
    fontWeight: 900,
    cursor: 'pointer',
  },
  empty: {
    minHeight: '470px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#888',
    fontSize: '22px',
    textAlign: 'center',
    lineHeight: 1.6,
  },
  reportHeader: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    background: '#0d0d18',
    border: '1px solid #252525',
    borderRadius: '22px',
    padding: '24px',
    marginBottom: '24px',
  },
  muted: {
    color: '#888',
    marginBottom: '8px',
  },
  reportName: {
    fontSize: '22px',
    fontWeight: 900,
  },
  previewBox: {
    background: '#0d0d18',
    border: '1px solid #252525',
    borderRadius: '22px',
    padding: '24px',
    color: '#d4d4d4',
    lineHeight: 1.7,
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
    whiteSpace: 'pre-line',
  },
}
