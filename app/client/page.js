'use client'

import Link from 'next/link'

export default function ClientDashboard() {
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
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
          CLIENT DASHBOARD
        </h1>

        <p
          style={{
            color: '#bdbdbd',
            fontSize: '22px',
            maxWidth: '760px',
            lineHeight: 1.6,
            marginBottom: '44px',
          }}
        >
          Домашний уход, анализ кожи, анализ формул и персональные рекомендации.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))',
            gap: '24px',
          }}
        >
          <ServiceCard
            href="/client/formula"
            icon="🔬"
            title="Анализ формулы"
            text="Проверьте INCI-состав косметического продукта."
          />

          <ServiceCard
            href="/client/skin"
            icon="📷"
            title="Анализ кожи"
            text="4 параметра: увлажнение, пигментация, морщины и акне."
          />

          <ServiceCard
            href="/client/homecare"
            icon="🏠"
            title="Домашняя рутина"
            text="Создайте уход по описанию кожи и задач."
          />

          <ServiceCard
            href="/client/history"
            icon="📊"
            title="История анализов"
            text="Сохраняйте результаты и отслеживайте изменения."
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
          minHeight: '230px',
          background: 'rgba(12,12,24,0.92)',
          border: '1px solid #242424',
          borderRadius: '28px',
          padding: '30px',
          cursor: 'pointer',
        }}
      >
        <div style={{ fontSize: '40px', marginBottom: '22px' }}>{icon}</div>

        <h2 style={{ fontSize: '28px', marginBottom: '14px' }}>{title}</h2>

        <p style={{ color: '#bdbdbd', lineHeight: 1.6, fontSize: '17px' }}>
          {text}
        </p>
      </div>
    </Link>
  )
}
