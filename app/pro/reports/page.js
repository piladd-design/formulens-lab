import Link from 'next/link'

export default function ProReportsPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#050510',
        color: 'white',
        padding: '50px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <Link href="/pro" style={{ color: '#aaa', textDecoration: 'none' }}>
        ← Professional Dashboard
      </Link>

      <h1 style={{ fontSize: '48px', marginTop: '40px' }}>
        PDF Reports
      </h1>

      <p
        style={{
          color: '#bbb',
          fontSize: '22px',
          maxWidth: '760px',
          lineHeight: 1.6,
        }}
      >
        Скоро здесь будет генератор премиальных PDF-отчётов для клиентов:
        диагностика кожи, стратегия ухода, кабинетный протокол и домашние
        рекомендации.
      </p>
    </main>
  )
}
