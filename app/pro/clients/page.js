'use client'

import Link from 'next/link'
import { useState } from 'react'

const translations = {
  DE: {
    back: '← Professional Dashboard',
    title: 'Kundenhistorie',
    subtitle:
      'Verwalten Sie Kunden, Analysen, Behandlungsprotokolle und PDF-Berichte an einem Ort.',
    newClient: '👤 Neuer Kunde',
    saveClient: 'Kunde speichern',
    cancel: 'Abbrechen',
    name: 'Name',
    namePlaceholder: 'Anna Müller',
    protocolPlaceholder: 'Barrier Recovery Protocol',
    lastAnalysis: 'Letzte Analyse',
    skinScore: 'Hautindex',
    lastProtocol: 'Letztes Protokoll',
    reports: 'PDF-Berichte',
    clientList: 'Kundenübersicht',
  },

  RU: {
    back: '← Профессиональная панель',
    title: 'История клиентов',
    subtitle:
      'Управление клиентами, анализами кожи, протоколами процедур и PDF-отчётами в одном месте.',
    newClient: '👤 Новый клиент',
    saveClient: 'Сохранить клиента',
    cancel: 'Отмена',
    name: 'Имя',
    namePlaceholder: 'Анна Иванова',
    protocolPlaceholder: 'Восстановление барьера',
    lastAnalysis: 'Последний анализ',
    skinScore: 'Индекс кожи',
    lastProtocol: 'Последний протокол',
    reports: 'PDF-отчёты',
    clientList: 'Список клиентов',
  },

  EN: {
    back: '← Professional Dashboard',
    title: 'Client History',
    subtitle:
      'Manage clients, skin analyses, treatment protocols and PDF reports in one place.',
    newClient: '👤 New Client',
    saveClient: 'Save Client',
    cancel: 'Cancel',
    name: 'Name',
    namePlaceholder: 'Anna Miller',
    protocolPlaceholder: 'Barrier Recovery Protocol',
    lastAnalysis: 'Last Analysis',
    skinScore: 'Skin Score',
    lastProtocol: 'Last Protocol',
    reports: 'PDF Reports',
    clientList: 'Client List',
  },
}

const initialClients = [
  {
    name: 'Anna Müller',
    analysis: '12.06.2026',
    score: '54 / 100',
    protocol: 'Barrier Recovery Protocol',
    reports: 4,
  },
  {
    name: 'Julia Weber',
    analysis: '10.06.2026',
    score: '67 / 100',
    protocol: 'Hydration Protocol',
    reports: 2,
  },
  {
    name: 'Maria Schneider',
    analysis: '08.06.2026',
    score: '72 / 100',
    protocol: 'Pigmentation Protocol',
    reports: 5,
  },
]

export default function ProClientsPage() {
  const [lang, setLang] = useState('DE')
  const [clients, setClients] = useState(initialClients)
  const [showForm, setShowForm] = useState(false)

  const [name, setName] = useState('')
  const [score, setScore] = useState('')
  const [protocol, setProtocol] = useState('')

  const t = translations[lang]

  const addClient = () => {
    if (!name.trim()) return

    const today = new Date().toLocaleDateString('de-DE')

    const newClient = {
      name,
      analysis: today,
      score: score.trim() ? `${score} / 100` : '—',
      protocol: protocol.trim() || '—',
      reports: 0,
    }

    setClients([newClient, ...clients])
    setName('')
    setScore('')
    setProtocol('')
    setShowForm(false)
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

        <button
          onClick={() => setShowForm(!showForm)}
          style={styles.newClientBtn}
        >
          {t.newClient}
        </button>

        {showForm && (
          <section style={styles.formBox}>
            <h2 style={styles.h2}>{t.newClient}</h2>

            <label style={styles.label}>{t.name}</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.namePlaceholder}
              style={styles.input}
            />

            <label style={styles.label}>{t.skinScore}</label>
            <input
              value={score}
              onChange={(e) => setScore(e.target.value)}
              placeholder="54"
              style={styles.input}
            />

            <label style={styles.label}>{t.lastProtocol}</label>
            <input
              value={protocol}
              onChange={(e) => setProtocol(e.target.value)}
              placeholder={t.protocolPlaceholder}
              style={styles.input}
            />

            <div style={styles.formButtons}>
              <button onClick={addClient} style={styles.saveBtn}>
                {t.saveClient}
              </button>

              <button
                onClick={() => setShowForm(false)}
                style={styles.cancelBtn}
              >
                {t.cancel}
              </button>
            </div>
          </section>
        )}

        <section style={styles.section}>
          <h2 style={styles.h2}>{t.clientList}</h2>

          <div style={styles.grid}>
            {clients.map((client) => (
              <div key={`${client.name}-${client.analysis}`} style={styles.card}>
                <div style={styles.avatar}>{client.name.charAt(0)}</div>

                <h3 style={styles.clientName}>{client.name}</h3>

                <div style={styles.infoRow}>
                  <span>{t.lastAnalysis}</span>
                  <strong>{client.analysis}</strong>
                </div>

                <div style={styles.infoRow}>
                  <span>{t.skinScore}</span>
                  <strong>{client.score}</strong>
                </div>

                <div style={styles.infoRow}>
                  <span>{t.lastProtocol}</span>
                  <strong>{client.protocol}</strong>
                </div>

                <div style={styles.infoRow}>
                  <span>{t.reports}</span>
                  <strong>{client.reports}</strong>
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
  wrap: { maxWidth: '1400px', margin: '0 auto' },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '36px',
  },
  back: { color: '#aaa', textDecoration: 'none' },
  langSwitch: { display: 'flex', gap: '10px' },
  langBtn: {
    width: '54px',
    height: '40px',
    borderRadius: '14px',
    border: '1px solid rgba(255,255,255,0.2)',
    background: 'transparent',
    color: 'white',
    cursor: 'pointer',
  },
  langActive: {
    width: '54px',
    height: '40px',
    borderRadius: '14px',
    border: 'none',
    background: 'linear-gradient(90deg,#7b2cff,#ff00aa)',
    color: 'white',
    cursor: 'pointer',
  },
  h1: {
    fontSize: 'clamp(42px,6vw,72px)',
    marginBottom: '20px',
    fontWeight: 900,
  },
  h2: { fontSize: '30px', marginBottom: '24px' },
  sub: {
    color: '#bdbdbd',
    fontSize: '22px',
    lineHeight: 1.6,
    maxWidth: '900px',
    marginBottom: '40px',
  },
  newClientBtn: {
    padding: '18px 30px',
    borderRadius: '18px',
    border: 'none',
    background: 'linear-gradient(90deg,#7b2cff,#ff00aa)',
    color: 'white',
    fontSize: '18px',
    fontWeight: 800,
    cursor: 'pointer',
    marginBottom: '30px',
  },
  formBox: {
    background: 'rgba(12,12,24,0.92)',
    border: '1px solid #242424',
    borderRadius: '28px',
    padding: '30px',
    marginBottom: '40px',
    maxWidth: '620px',
  },
  label: {
    display: 'block',
    color: '#bdbdbd',
    marginBottom: '10px',
    marginTop: '18px',
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
  formButtons: {
    display: 'flex',
    gap: '14px',
    marginTop: '24px',
  },
  saveBtn: {
    flex: 1,
    padding: '18px',
    borderRadius: '18px',
    border: 'none',
    background: 'linear-gradient(90deg,#7b2cff,#ff00aa)',
    color: 'white',
    fontWeight: 900,
    cursor: 'pointer',
  },
  cancelBtn: {
    flex: 1,
    padding: '18px',
    borderRadius: '18px',
    border: '1px solid #333',
    background: 'transparent',
    color: 'white',
    fontWeight: 900,
    cursor: 'pointer',
  },
  section: { marginTop: '10px' },
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
  avatar: {
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg,#7b2cff,#ff00aa)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '30px',
    fontWeight: 900,
    marginBottom: '18px',
  },
  clientName: { fontSize: '24px', marginBottom: '24px' },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '12px',
    padding: '12px 0',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    color: '#d4d4d4',
  },
}
