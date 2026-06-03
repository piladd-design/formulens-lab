'use client'

import Link from 'next/link'
import { useState } from 'react'

const translations = {
  DE: {
    back: '← FORMULENS LAB',
    title: 'PROFESSIONAL DASHBOARD',
    subtitle:
      'Professionelle AI-Systeme für Kosmetikerinnen: Hautanalyse, Formelanalyse, Behandlungsprotokolle, PDF-Berichte und Kundenhistorie.',
    badge: 'FOUNDER PRICE · 29 €/Monat · 7 Tage kostenlos · bis 01.07.2026',

    skin: 'Hautanalyse PRO',
    skinText:
      '7 Hautparameter: Feuchtigkeit, Barriere, Textur, Pigmentierung, Sebum, Alterungszeichen und Festigkeit.',

    advisor: 'AI Beauty Advisor',
    advisorText:
      'Soforthilfe für Kosmetikerinnen: Rötungen, Reaktionen, Barriereprobleme, Peelings und Behandlungssituationen.',

    alternatives: 'AI Produkt-Alternative',
    alternativesText:
      'Intelligente Produktersatz-Suche nach Funktion, Hautziel, Protokollschritt und Summecosmetics Linie.',

    formula: 'Formelanalyse PRO',
    formulaText:
      'Erweiterte INCI-Analyse: Wirksamkeit, Risiken, Wirkstoffe und professionelle Bewertung.',

    protocol: 'Protokoll Builder',
    protocolText:
      'Erstellung professioneller Behandlungsprotokolle nach Hautbeschreibung und Kundenzielen.',

    photoProtocol: 'KI-Protokoll aus Foto',
    photoProtocolText:
      'Kundenfoto → Analyse → Kabinenprotokoll → Homecare-Empfehlung.',

    clients: 'Kundenhistorie',
    clientsText:
      'Kundenhistorie, Analysen, Behandlungen und Empfehlungen für Folgeconsultations.',

    reports: 'PDF-Berichte',
    reportsText:
      'Premium-Berichte für Kundinnen: Analyse, Strategie, Protokoll und Homecare.',
  },

  RU: {
    back: '← FORMULENS LAB',
    title: 'ПРОФЕССИОНАЛЬНАЯ ПАНЕЛЬ',
    subtitle:
      'Профессиональная AI-система для косметологов: анализ кожи, анализ формул, протоколы процедур, PDF-отчёты и история клиентов.',
    badge: 'FOUNDER PRICE · 29 €/месяц · 7 дней бесплатно · до 01.07.2026',

    skin: 'Анализ кожи PRO',
    skinText:
      '7 параметров кожи: увлажнение, барьер, текстура, пигментация, себум, возрастные признаки и упругость.',

    advisor: 'AI Консультант Косметолога',
    advisorText:
      'Быстрый AI-помощник для косметолога: покраснение, реакции после процедур, нарушение барьера, пилинги и сложные ситуации.',

    alternatives: 'AI Подбор Альтернатив',
    alternativesText:
      'Подбор профессиональной замены по функции продукта, цели процедуры и линии Summecosmetics.',

    formula: 'Анализ формулы PRO',
    formulaText:
      'Расширенный анализ INCI-формул: эффективность, риски, активные компоненты и профессиональная оценка.',

    protocol: 'Конструктор протоколов',
    protocolText:
      'Создание профессионального протокола процедуры по описанию кожи и задач клиента.',

    photoProtocol: 'AI-протокол по фото',
    photoProtocolText:
      'Фото клиента → диагностика → кабинетный протокол → домашний уход.',

    clients: 'История клиентов',
    clientsText:
      'История клиентов, анализов, процедур и рекомендаций для повторных консультаций.',

    reports: 'PDF-отчёты',
    reportsText:
      'Премиальные отчёты для клиента: диагностика, стратегия, протокол и домашний уход.',
  },

  EN: {
    back: '← FORMULENS LAB',
    title: 'PROFESSIONAL DASHBOARD',
    subtitle:
      'Professional AI system for beauty professionals: skin analysis, formula analysis, treatment protocols, PDF reports and client history.',
    badge: 'FOUNDER PRICE · 29 €/month · 7 days free · until 01.07.2026',

    skin: 'Skin Analysis PRO',
    skinText:
      '7 skin parameters: hydration, barrier, texture, pigmentation, sebum, aging signs and firmness.',

    advisor: 'AI Beauty Advisor',
    advisorText:
      'Instant support for beauty professionals: redness, reactions, barrier issues, peels and treatment situations.',

    alternatives: 'AI Product Alternative',
    alternativesText:
      'Professional replacement finder based on function, skin goal, protocol step and Summecosmetics line.',

    formula: 'Formula Analyzer PRO',
    formulaText:
      'Advanced INCI analysis: effectiveness, risks, active ingredients and professional evaluation.',

    protocol: 'Protocol Builder',
    protocolText:
      'Create professional treatment protocols based on skin description and client goals.',

    photoProtocol: 'AI Protocol from Photo',
    photoProtocolText:
      'Client photo → analysis → treatment protocol → homecare recommendation.',

    clients: 'Client History',
    clientsText:
      'Client history, analyses, treatments and recommendations for follow-up consultations.',

    reports: 'PDF Reports',
    reportsText:
      'Premium client reports: analysis, strategy, treatment protocol and homecare.',
  },
}

export default function ProDashboard() {
  const [lang, setLang] = useState('DE')
  const t = translations[lang]

  return (
    <main
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at top left,#1a1028 0%,#050505 35%,#000 100%)',
        color: 'white',
        padding: '40px 6% 70px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '20px',
            alignItems: 'center',
            marginBottom: '36px',
          }}
        >
          <Link href="/" style={{ color: '#aaa', textDecoration: 'none' }}>
            {t.back}
          </Link>

          <div style={{ display: 'flex', gap: '10px' }}>
            {['DE', 'RU', 'EN'].map((item) => (
              <button
                key={item}
                onClick={() => setLang(item)}
                style={{
                  width: '54px',
                  height: '40px',
                  borderRadius: '14px',
                  border:
                    lang === item
                      ? '1px solid #ff00aa'
                      : '1px solid rgba(255,255,255,0.2)',
                  background:
                    lang === item
                      ? 'linear-gradient(90deg,#7b2cff,#ff00aa)'
                      : 'transparent',
                  color: 'white',
                  fontWeight: 800,
                  cursor: 'pointer',
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <h1
          style={{
            fontSize: 'clamp(42px,6vw,72px)',
            margin: '40px 0 16px',
            fontWeight: 900,
            letterSpacing: '-1px',
          }}
        >
          {t.title}
        </h1>

        <p
          style={{
            color: '#bdbdbd',
            fontSize: '22px',
            maxWidth: '880px',
            lineHeight: 1.6,
            marginBottom: '28px',
          }}
        >
          {t.subtitle}
        </p>

        <div
          style={{
            display: 'inline-block',
            marginBottom: '40px',
            padding: '10px 18px',
            borderRadius: '999px',
            background: 'rgba(255,0,170,0.14)',
            border: '1px solid rgba(255,0,170,0.5)',
            color: '#ff7bd8',
            fontWeight: 800,
            letterSpacing: '1px',
          }}
        >
          {t.badge}
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))',
            gap: '24px',
          }}
        >
          <ServiceCard
            href="/pro/skin"
            icon="📷"
            title={t.skin}
            text={t.skinText}
          />

          <ServiceCard
            href="/pro/advisor"
            icon="🧠"
            title={t.advisor}
            text={t.advisorText}
          />

          <ServiceCard
            href="/pro/alternatives"
            icon="🔄"
            title={t.alternatives}
            text={t.alternativesText}
          />

          <ServiceCard
            href="/pro/formula"
            icon="🔬"
            title={t.formula}
            text={t.formulaText}
          />

          <ServiceCard
            href="/protocol-builder"
            icon="🧾"
            title={t.protocol}
            text={t.protocolText}
          />

          <ServiceCard
            href="/pro/photo-protocol"
            icon="📸"
            title={t.photoProtocol}
            text={t.photoProtocolText}
          />

          <ServiceCard
            href="/pro/clients"
            icon="👥"
            title={t.clients}
            text={t.clientsText}
          />

          <ServiceCard
            href="/pro/reports"
            icon="📄"
            title={t.reports}
            text={t.reportsText}
          />
        </div>
      </div>
    </main>
  )
}

function ServiceCard({ href, icon, title, text }) {
  return (
    <Link href={href} style={{ textDecoration: 'none', color: 'white' }}>
      <div
        style={{
          minHeight: '250px',
          background: 'rgba(12,12,24,0.92)',
          border: '1px solid #242424',
          borderRadius: '28px',
          padding: '30px',
          cursor: 'pointer',
          boxShadow: '0 0 30px rgba(0,0,0,0.24)',
        }}
      >
        <div style={{ fontSize: '40px', marginBottom: '22px' }}>{icon}</div>

        <h2 style={{ fontSize: '27px', marginBottom: '14px' }}>{title}</h2>

        <p style={{ color: '#bdbdbd', lineHeight: 1.6, fontSize: '17px' }}>
          {text}
        </p>
      </div>
    </Link>
  )
}
