import Link from 'next/link'

export default function ProClientsPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#050510', color: 'white', padding: '50px' }}>
      <Link href="/pro" style={{ color: '#aaa', textDecoration: 'none' }}>
        ← Professional Dashboard
      </Link>

      <h1 style={{ fontSize: '48px', marginTop: '40px' }}>
        Client History
      </h1>

      <p style={{ color: '#bbb', fontSize: '22px', maxWidth: '700px', lineHeight: 1.6 }}>
        Скоро здесь будет история клиентов, анализов, протоколов и PDF-отчётов.
      </p>
    </main>
  )
}
