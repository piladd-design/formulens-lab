'use client'

import Link from 'next/link'
import { useState } from 'react'

const translations = {
  DE: {
    back: '← FORMULENS LAB',
    title: 'HOME CARE DASHBOARD',
    subtitle:
      'Persönliche Hautpflege-Intelligenz: Formelanalyse, Hautanalyse, Homecare-Routinen und Empfehlungen.',
    formula: 'Formelanalyse',
    formulaText: 'Analysieren Sie die INCI-Liste eines kosmetischen Produkts.',
    skin: 'Hautanalyse',
    skinText:
      '4 Parameter: Feuchtigkeit, Pigmentierung, Falten und Akne.',
    homecare: 'Homecare Routine',
    homecareText:
      'Erstellen Sie eine Pflegeroutine nach Hautbeschreibung und Zielen.',
    history: 'Analyse-Historie',
    historyText:
      'Speichern Sie Ergebnisse und verfolgen Sie Veränderungen Ihrer Haut.',
  },

  RU: {
    back: '← FORMULENS LAB',
    title: 'ДОМАШНИЙ УХОД',
    subtitle:
      'Персональная система для домашнего ухода: анализ формул, анализ кожи, домашние рутины и рекомендации.',
    formula: 'Анализ формулы',
    formulaText: 'Проверьте INCI-состав косметического продукта.',
    skin: 'Анализ кожи',
    skinText:
      '4 параметра: увлажнение, пигментация, морщины и акне.',
    homecare: 'Домашняя рутина',
    homecareText:
      'Создайте уход по описанию кожи и задач.',
    history: 'История анализов',
    historyText:
      'Сохраняйте результаты и отслеживайте изменения кожи.',
  },

  EN: {
    back: '← FORMULENS LAB',
    title: 'HOME CARE DASHBOARD',
    subtitle:
      'Personal skincare intelligence: formula analysis, skin analysis, homecare routines and recommendations.',
    formula: 'Formula Analysis',
    formulaText: 'Analyze the INCI list of a cosmetic product.',
    skin: 'Skin Analysis',
    skinText:
      '4 parameters: hydration, pigmentation, wrinkles and acne.',
    homecare: 'Homecare Routine',
    homecareText:
      'Create a skincare routine based on skin description and goals.',
    history: 'Analysis History',
    historyText:
      'Save results and track changes in your skin over time.',
  },
}

export default function ClientDashboard() {
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
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
            maxWidth: '820px',
            lineHeight: 1.6,
            marginBottom: '44px',
          }}
        >
          {t.subtitle}
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
            title={t.formula}
            text={t.formulaText}
          />

          <ServiceCard
            href="/client/skin"
            icon="📷"
            title={t.skin}
            text={t.skinText}
          />

          <ServiceCard
            href="/client/homecare"
            icon="🏠"
            title={t.homecare}
            text={t.homecareText}
          />

          <ServiceCard
            href="/client/history"
            icon="📊"
            title={t.history}
            text={t.historyText}
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
          boxShadow: '0 0 30px rgba(0,0,0,0.24)',
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
