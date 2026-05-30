import Link from 'next/link'

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at top left,#24003a 0%,#07000d 38%,#000 100%)',
        color: 'white',
        padding: '60px 6%',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <section
        style={{
          maxWidth: '1300px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'inline-block',
            padding: '10px 18px',
            border: '1px solid rgba(255,255,255,0.22)',
            borderRadius: '999px',
            color: '#d8d8d8',
            fontSize: '14px',
            letterSpacing: '1px',
            marginBottom: '34px',
          }}
        >
          AI COSMETIC INTELLIGENCE
        </div>

        <h1
          style={{
            fontSize: 'clamp(48px, 8vw, 92px)',
            lineHeight: 1,
            margin: '0 0 26px',
            fontWeight: 900,
            letterSpacing: '-2px',
          }}
        >
          FORMULENS LAB
        </h1>

        <p
          style={{
            color: '#d0d0d8',
            fontSize: 'clamp(19px, 2vw, 24px)',
            lineHeight: 1.5,
            maxWidth: '860px',
            margin: '0 auto 70px',
          }}
        >
          Professionelle AI-Plattform für Hautanalyse, Formelanalyse und
          intelligente Behandlungsprotokolle.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '34px',
            alignItems: 'stretch',
          }}
        >
          <PlanCard
            title="HOME CARE"
            subtitle="Für den privaten Gebrauch"
            price="9€"
            trial="3 Tage kostenlos"
            href="/client"
            button="Kostenlos testen"
            features={[
              'Formula Analyzer',
              'Skin Analysis Basic',
              'Hydration',
              'Pigmentation',
              'Wrinkles',
              'Acne',
              'Homecare Routine',
              'Summecosmetics Empfehlungen',
            ]}
          />

          <PlanCard
            professional
            title="PROFESSIONAL"
            subtitle="Für Kosmetikerinnen & Institute"
            price="29€"
            trial="7 Tage kostenlos"
            href="/pro"
            button="7 Tage kostenlos testen"
            features={[
              'Formula Analyzer PRO',
              'Skin Analysis PRO',
              '7 Hautparameter',
              'Protocol Builder',
              'Photo → Protocol',
              'PDF Reports',
              'Client History',
              'Summecosmetics Protocols',
            ]}
          />
        </div>
      </section>
    </main>
  )
}

function PlanCard({
  title,
  subtitle,
  price,
  trial,
  features,
  href,
  button,
  professional,
}) {
  return (
    <div
      style={{
        position: 'relative',
        background: 'rgba(10,10,28,0.88)',
        border: professional
          ? '2px solid #ff00aa'
          : '1px solid rgba(255,255,255,0.12)',
        borderRadius: '34px',
        padding: '46px',
        textAlign: 'center',
        boxShadow: professional
          ? '0 0 45px rgba(255,0,170,0.16)'
          : '0 0 35px rgba(0,0,0,0.28)',
      }}
    >
      {professional && (
        <div
          style={{
            position: 'absolute',
            top: '22px',
            right: '22px',
            padding: '8px 15px',
            borderRadius: '999px',
            background: '#ff00aa',
            color: 'white',
            fontSize: '12px',
            fontWeight: 800,
          }}
        >
          FOUNDER PRICE
        </div>
      )}

      <h2
        style={{
          fontSize: '34px',
          margin: '30px 0 10px',
          fontWeight: 900,
        }}
      >
        {title}
      </h2>

      <p style={{ color: '#aeb0c0', fontSize: '16px', marginBottom: '28px' }}>
        {subtitle}
      </p>

      <div
        style={{
          fontSize: '56px',
          fontWeight: 900,
          marginBottom: '8px',
        }}
      >
        {price}
      </div>

      <div
        style={{
          color: '#00ff99',
          fontSize: '17px',
          fontWeight: 700,
          marginBottom: professional ? '18px' : '38px',
        }}
      >
        {trial}
      </div>

      {professional && (
        <>
          <div
            style={{
              display: 'inline-block',
              padding: '8px 16px',
              borderRadius: '999px',
              background: 'rgba(255,0,170,0.15)',
              border: '1px solid rgba(255,0,170,0.4)',
              color: '#ff4dc4',
              fontSize: '14px',
              fontWeight: 800,
              marginBottom: '14px',
            }}
          >
            Nur bis 01.07.2026
          </div>

          <div
            style={{
              color: '#999',
              fontSize: '15px',
              textDecoration: 'line-through',
              marginBottom: '8px',
            }}
          >
            Regulärer Preis: 39 €/Monat
          </div>

          <div
            style={{
              color: '#bbb',
              fontSize: '14px',
              marginBottom: '30px',
            }}
          >
            Exklusiver Preis für Early Adopters
          </div>
        </>
      )}

      <ul
        style={{
          textAlign: 'left',
          lineHeight: 2,
          color: '#f2f2f2',
          fontSize: '16px',
          marginBottom: '38px',
        }}
      >
        {features.map((item) => (
          <li key={item}>✓ {item}</li>
        ))}
      </ul>

      <Link href={href}>
        <button
          style={{
            width: '100%',
            border: 'none',
            borderRadius: '18px',
            padding: '20px',
            background: 'linear-gradient(90deg,#7b2cff,#ff00aa)',
            color: 'white',
            fontSize: '17px',
            fontWeight: 900,
            cursor: 'pointer',
          }}
        >
          {button}
        </button>
      </Link>
    </div>
  )
}
