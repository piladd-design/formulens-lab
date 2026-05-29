'use client'

import Link from 'next/link'

export default function ProDashboard() {
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
        <Link href="/" style={{ color: '#aaa', textDecoration: 'none' }}>
          ← FORMULENS LAB
        </Link>

        <h1
          style={{
            fontSize: 'clamp(42px,6vw,72px)',
            margin: '40px 0 16px',
            fontWeight: 900,
          }}
        >
          PROFESSIONAL DASHBOARD
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
          Профессиональная AI-система для косметологов: диагностика кожи,
          анализ формул, протоколы процедур, PDF-отчёты и клиентская история.
        </p>

        <div
          style={{
            display: 'inline-block',
            marginBottom: '34px',
            padding: '10px 18px',
            borderRadius: '999px',
            background: 'rgba(255,0,170,0.14)',
            border: '1px solid rgba(255,0,170,0.5)',
            color: '#ff7bd8',
            fontWeight: 800,
            letterSpacing: '1px',
          }}
        >
          FOUNDER PRICE · 29 €/Monat · 7 Tage kostenlos
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))',
            gap: '24px',
          }}
        >
          <ServiceCard
            href="/pro/formula"
            icon="🔬"
            title="Formula Analyzer PRO"
            text="Расширенный анализ INCI-формул: эффективность, риски, активы и профессиональная оценка."
          />

          <ServiceCard
            href="/pro/skin"
            icon="📷"
            title="Skin Analysis PRO"
            text="7 параметров кожи: увлажнение, барьер, текстура, пигментация, себум, возрастные признаки и упругость."
          />

          <ServiceCard
            href="/pro/protocol"
            icon="🧾"
            title="Protocol Builder"
            text="Создание профессионального протокола процедуры по описанию кожи и задач клиента."
          />

          <ServiceCard
            href="/pro/photo-protocol"
            icon="📸"
            title="AI Protocol from Photo"
            text="Фото клиента → диагностика → кабинетный протокол → домашний уход."
          />

          <ServiceCard
            href="/pro/reports"
            icon="📄"
            title="PDF Reports"
            text="Премиальные отчёты для клиента: диагностика, стратегия, протокол и домашний уход."
          />

          <ServiceCard
            href="/pro/clients"
            icon="👥"
            title="Client History"
            text="История клиентов, анализов, процедур и рекомендаций для повторных консультаций."
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
