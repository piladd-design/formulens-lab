'use client'

import Link from 'next/link'
import { useState } from 'react'

const translations = {
  DE: {
    badge: 'AI COSMETIC INTELLIGENCE',
    title: 'FORMULENS LAB',
    subtitle:
      'Professionelle AI-Plattform für Hautanalyse, Formelanalyse und intelligente Behandlungsprotokolle.',

    homeTitle: 'HOME CARE',
    homeSubtitle: 'Für den privaten Gebrauch',
    homePrice: '9€',
    homeTrial: '3 Tage kostenlos',
    homeButton: 'Kostenlos testen',

    proTitle: 'PROFESSIONAL',
    proSubtitle: 'Für Kosmetikerinnen & Institute',
    proPrice: '29€',
    proTrial: '7 Tage kostenlos',
    founder: 'FOUNDER PRICE',
    until: 'Nur bis 01.07.2026',
    regular: 'Regulärer Preis: 39 €/Monat',
    early: 'Exklusiver Preis für Early Adopters',
    proButton: '7 Tage kostenlos testen',

    homeFeatures: [
      'Formula Analyzer',
      'Skin Analysis Basic',
      'Hydration',
      'Pigmentation',
      'Wrinkles',
      'Acne',
      'Homecare Routine',
      'Summecosmetics Empfehlungen',
    ],

    proFeatures: [
      'Formula Analyzer PRO',
      'Skin Analysis PRO',
      '7 Hautparameter',
      'Protocol Builder',
      'Photo → Protocol',
      'PDF Reports',
      'Client History',
      'Summecosmetics Protocols',
    ],
  },

  RU: {
    badge: 'ИИ-КОСМЕТОЛОГИЧЕСКИЙ ИНТЕЛЛЕКТ',
    title: 'FORMULENS LAB',
    subtitle:
      'Профессиональная AI-платформа для анализа кожи, анализа формул и создания интеллектуальных протоколов ухода.',

    homeTitle: 'ДОМАШНИЙ УХОД',
    homeSubtitle: 'Для частного использования',
    homePrice: '9€',
    homeTrial: '3 дня бесплатно',
    homeButton: 'Попробовать бесплатно',

    proTitle: 'PROFESSIONAL',
    proSubtitle: 'Для косметологов и институтов',
    proPrice: '29€',
    proTrial: '7 дней бесплатно',
    founder: 'FOUNDER PRICE',
    until: 'Только до 01.07.2026',
    regular: 'Обычная цена: 39 €/месяц',
    early: 'Эксклюзивная цена для первых пользователей',
    proButton: '7 дней бесплатно',

    homeFeatures: [
      'Анализ формулы',
      'Базовый анализ кожи',
      'Увлажнение',
      'Пигментация',
      'Морщины',
      'Акне',
      'Домашняя рутина',
      'Рекомендации Summecosmetics',
    ],

    proFeatures: [
      'Formula Analyzer PRO',
      'Skin Analysis PRO',
      '7 параметров кожи',
      'Protocol Builder',
      'Photo → Protocol',
      'PDF Reports',
      'История клиентов',
      'Протоколы Summecosmetics',
    ],
  },

  EN: {
    badge: 'AI COSMETIC INTELLIGENCE',
    title: 'FORMULENS LAB',
    subtitle:
      'Professional AI platform for skin analysis, formula analysis and intelligent treatment protocols.',

    homeTitle: 'HOME CARE',
    homeSubtitle: 'For personal skincare use',
    homePrice: '9€',
    homeTrial: '3 days free',
    homeButton: 'Start free trial',

    proTitle: 'PROFESSIONAL',
    proSubtitle: 'For beauty professionals & institutes',
    proPrice: '29€',
    proTrial: '7 days free',
    founder: 'FOUNDER PRICE',
    until: 'Only until 01.07.2026',
    regular: 'Regular price: 39 €/month',
    early: 'Exclusive price for early adopters',
    proButton: 'Start 7-day free trial',

    homeFeatures: [
      'Formula Analyzer',
      'Skin Analysis Basic',
      'Hydration',
      'Pigmentation',
      'Wrinkles',
      'Acne',
      'Homecare Routine',
      'Summecosmetics Recommendations',
    ],

    proFeatures: [
      'Formula Analyzer PRO',
      'Skin Analysis PRO',
      '7 Skin Parameters',
      'Protocol Builder',
      'Photo → Protocol',
      'PDF Reports',
      'Client History',
      'Summecosmetics Protocols',
    ],
  },
}

export default function HomePage() {
  const [lang, setLang] = useState('DE')
  const t = translations[lang]

  return (
    <main
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at top left,#24003a 0%,#07000d 38%,#000 100%)',
        color: 'white',
        padding: '40px 6% 70px',
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
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '36px',
          }}
        >
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
          {t.badge}
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
          {t.title}
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
          {t.subtitle}
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
            title={t.homeTitle}
            subtitle={t.homeSubtitle}
            price={t.homePrice}
            trial={t.homeTrial}
            href="/client"
            button={t.homeButton}
            features={t.homeFeatures}
          />

          <PlanCard
            professional
            title={t.proTitle}
            subtitle={t.proSubtitle}
            price={t.proPrice}
            trial={t.proTrial}
            href="/pro"
            button={t.proButton}
            features={t.proFeatures}
            founder={t.founder}
            until={t.until}
            regular={t.regular}
            early={t.early}
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
  founder,
  until,
  regular,
  early,
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
          {founder}
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
            {until}
          </div>

          <div
            style={{
              color: '#999',
              fontSize: '15px',
              textDecoration: 'line-through',
              marginBottom: '8px',
            }}
          >
            {regular}
          </div>

          <div
            style={{
              color: '#bbb',
              fontSize: '14px',
              marginBottom: '30px',
            }}
          >
            {early}
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
