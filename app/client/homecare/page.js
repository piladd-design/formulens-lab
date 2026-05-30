'use client'

import Link from 'next/link'
import { useState } from 'react'

const translations = {
  DE: {
    back: '← Home Care Dashboard',
    title: 'Homecare Routine',
    subtitle:
      'Erstellen Sie eine personalisierte Homecare-Strategie nach Geschlecht, Alter, Hauttyp, Sensibilität, Hauptproblemen und Pflegeziel.',

    skinDescription: 'Hautbeschreibung',
    gender: 'Geschlecht',
    genderPlaceholder: 'Zum Beispiel: Frau',
    age: 'Alter',
    agePlaceholder: 'Zum Beispiel: 45',
    skinType: 'Hauttyp',
    skinTypePlaceholder: 'Zum Beispiel: trocken, sensibel, Mischhaut',
    sensitivity: 'Hautsensibilität',
    sensitivityPlaceholder: 'Niedrig, mittel oder hoch',
    concerns: 'Hauptprobleme',
    concernsPlaceholder:
      'Zum Beispiel: Trockenheit, Falten, Rötungen, Pigmentierung, Akne',
    goal: 'Pflegeziel',
    goalPlaceholder:
      'Zum Beispiel: Feuchtigkeit, Glow, Anti-Aging, beruhigte Haut',
    create: '✨ Homecare Routine erstellen',

    empty: 'Füllen Sie die Hautbeschreibung aus, um eine Routine zu erstellen.',
    strategyTitle: 'Pflegestrategie',
    strategyText:
      'Für {gender}, {age} Jahre, Hauttyp „{skinType}“, Sensibilität „{sensitivity}“ und Hauptprobleme „{concerns}“ empfiehlt sich eine sanfte, konsequente Homecare-Routine mit Fokus auf Barriere, Feuchtigkeit und schrittweise Korrektur der Hauptzeichen.',
    priorities: 'Prioritäten',
    priorityList: [
      'Stärkung und Schutz der Hautbarriere',
      'Stabile Feuchtigkeitsversorgung morgens und abends',
      'Beruhigung von Rötungen und Reaktivität',
      'Schrittweise Korrektur von Pigmentierung und Alterungszeichen',
      'Keine Überlastung der Haut mit zu vielen aktiven Wirkstoffen',
    ],

    morning: 'Morgen',
    morningText:
      '1. Sanfte Reinigung — ESSENTIAL. \n2. Feuchtigkeitsschritt — GLACIAR. \n3. Bei Sensibilität — NICELY. \n4. Bei Pigmentierung oder fahlem Teint — CELL C / BECLARITY. \n5. Immer SPF — SUMMESUN.',

    evening: 'Abend',
    eveningText:
      '1. Reinigung ohne Austrocknung — ESSENTIAL / BALANCE. \n2. Barriereunterstützung — NICELY. \n3. Bei Entzündungen — BALANCE. \n4. Bei Alterungszeichen — CELL / MYCODE. \n5. Abschluss mit regenerierender Pflege.',

    weekly: 'Wöchentliche Pflege',
    weeklyText:
      '1–2 Mal pro Woche sanfte Hauterneuerung. \nBei Sensibilität aggressive Peelings vermeiden. \nBei Dehydratation GLACIAR verstärken. \nBei Entzündungen die Haut nicht mit zu vielen Wirkstoffen überlasten.',

    directions: 'Summecosmetics-Richtungen',
    directionsText:
      'GLACIAR — Feuchtigkeit. \nNICELY — Sensibilität und Barriere. \nBALANCE — Akne und Sebum. \nBECLARITY — Pigmentierung. \nCELL C — Glow und antioxidative Unterstützung. \nCELL / MYCODE — Alterungszeichen.',
  },

  RU: {
    back: '← Домашний уход',
    title: 'Домашняя рутина',
    subtitle:
      'Создайте персональную стратегию домашнего ухода по полу, возрасту, типу кожи, чувствительности, основным проблемам и цели ухода.',

    skinDescription: 'Описание кожи',
    gender: 'Пол',
    genderPlaceholder: 'Например: женщина',
    age: 'Возраст',
    agePlaceholder: 'Например: 45',
    skinType: 'Тип кожи',
    skinTypePlaceholder: 'Например: сухая, чувствительная, комбинированная',
    sensitivity: 'Чувствительность кожи',
    sensitivityPlaceholder: 'Низкая, средняя или высокая',
    concerns: 'Основные проблемы',
    concernsPlaceholder:
      'Например: сухость, морщины, покраснение, пигментация, акне',
    goal: 'Цель ухода',
    goalPlaceholder:
      'Например: увлажнение, сияние, anti-aging, успокоение кожи',
    create: '✨ Создать домашний уход',

    empty: 'Заполните описание кожи, чтобы создать рутину.',
    strategyTitle: 'Стратегия ухода',
    strategyText:
      'Для {gender}, {age} лет, с типом кожи «{skinType}», чувствительностью «{sensitivity}» и задачами «{concerns}» рекомендуется мягкая, последовательная домашняя рутина с акцентом на восстановление барьера, увлажнение и постепенную коррекцию основных признаков.',
    priorities: 'Приоритеты',
    priorityList: [
      'Восстановление и защита кожного барьера',
      'Стабильное увлажнение утром и вечером',
      'Успокоение покраснений и реактивности',
      'Постепенная коррекция пигментации и возрастных признаков',
      'Не перегружать кожу большим количеством активов',
    ],

    morning: 'Утро',
    morningText:
      '1. Мягкое очищение — ESSENTIAL. \n2. Увлажняющий этап — GLACIAR. \n3. При чувствительности — NICELY. \n4. При пигментации или тусклости — CELL C / BECLARITY. \n5. Обязательно SPF — SUMMESUN.',

    evening: 'Вечер',
    eveningText:
      '1. Очищение без пересушивания — ESSENTIAL / BALANCE. \n2. Барьерная поддержка — NICELY. \n3. При воспалениях — BALANCE. \n4. При возрастных признаках — CELL / MYCODE. \n5. Завершение уходом для восстановления кожи.',

    weekly: 'Еженедельный уход',
    weeklyText:
      '1–2 раза в неделю мягкое обновление кожи. \nПри чувствительности избегать агрессивных пилингов. \nПри обезвоженности усилить GLACIAR. \nПри воспалениях не перегружать кожу активами.',

    directions: 'Summecosmetics-направления',
    directionsText:
      'GLACIAR — увлажнение. \nNICELY — чувствительность и барьер. \nBALANCE — акне и себум. \nBECLARITY — пигментация. \nCELL C — сияние и антиоксидантная защита. \nCELL / MYCODE — возрастные признаки.',
  },

  EN: {
    back: '← Home Care Dashboard',
    title: 'Homecare Routine',
    subtitle:
      'Create a personalized homecare strategy based on gender, age, skin type, sensitivity, main concerns and skincare goal.',

    skinDescription: 'Skin Description',
    gender: 'Gender',
    genderPlaceholder: 'Example: female',
    age: 'Age',
    agePlaceholder: 'Example: 45',
    skinType: 'Skin Type',
    skinTypePlaceholder: 'Example: dry, sensitive, combination',
    sensitivity: 'Skin Sensitivity',
    sensitivityPlaceholder: 'Low, medium or high',
    concerns: 'Main Concerns',
    concernsPlaceholder:
      'Example: dryness, wrinkles, redness, pigmentation, acne',
    goal: 'Skincare Goal',
    goalPlaceholder:
      'Example: hydration, glow, anti-aging, calming the skin',
    create: '✨ Create Homecare Routine',

    empty: 'Fill in the skin description to create a routine.',
    strategyTitle: 'Care Strategy',
    strategyText:
      'For {gender}, {age} years old, with skin type “{skinType}”, sensitivity “{sensitivity}” and main concerns “{concerns}”, a gentle and consistent homecare routine is recommended, focused on barrier restoration, hydration and gradual correction of the main signs.',
    priorities: 'Priorities',
    priorityList: [
      'Restore and protect the skin barrier',
      'Stable hydration morning and evening',
      'Calm redness and reactivity',
      'Gradual correction of pigmentation and aging signs',
      'Avoid overloading the skin with too many active ingredients',
    ],

    morning: 'Morning',
    morningText:
      '1. Gentle cleansing — ESSENTIAL. \n2. Hydration step — GLACIAR. \n3. For sensitivity — NICELY. \n4. For pigmentation or dullness — CELL C / BECLARITY. \n5. Always SPF — SUMMESUN.',

    evening: 'Evening',
    eveningText:
      '1. Cleansing without drying — ESSENTIAL / BALANCE. \n2. Barrier support — NICELY. \n3. For inflammation — BALANCE. \n4. For aging signs — CELL / MYCODE. \n5. Finish with restorative care.',

    weekly: 'Weekly Care',
    weeklyText:
      '1–2 times per week: gentle skin renewal. \nFor sensitive skin, avoid aggressive peelings. \nFor dehydration, strengthen GLACIAR. \nFor inflammation, avoid overloading the skin with actives.',

    directions: 'Summecosmetics Directions',
    directionsText:
      'GLACIAR — hydration. \nNICELY — sensitivity and barrier. \nBALANCE — acne and sebum. \nBECLARITY — pigmentation. \nCELL C — glow and antioxidant support. \nCELL / MYCODE — aging signs.',
  },
}

export default function ClientHomecarePage() {
  const [lang, setLang] = useState('DE')
  const [gender, setGender] = useState('')
  const [age, setAge] = useState('')
  const [skinType, setSkinType] = useState('')
  const [sensitivity, setSensitivity] = useState('')
  const [concerns, setConcerns] = useState('')
  const [goal, setGoal] = useState('')
  const [done, setDone] = useState(false)

  const t = translations[lang]

  const canCreate =
    gender.trim() &&
    age.trim() &&
    skinType.trim() &&
    sensitivity.trim() &&
    concerns.trim() &&
    goal.trim()

  const createRoutine = () => {
    if (!canCreate) return
    setDone(true)
  }

  const strategyText = t.strategyText
    .replace('{gender}', gender)
    .replace('{age}', age)
    .replace('{skinType}', skinType)
    .replace('{sensitivity}', sensitivity)
    .replace('{concerns}', concerns)

  return (
    <main style={styles.main}>
      <div style={styles.wrap}>
        <div style={styles.topBar}>
          <Link href="/client" style={styles.back}>
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
            <h2 style={styles.h2}>{t.skinDescription}</h2>

            <Field
              label={t.gender}
              value={gender}
              setValue={setGender}
              placeholder={t.genderPlaceholder}
              setDone={setDone}
            />

            <Field
              label={t.age}
              value={age}
              setValue={setAge}
              placeholder={t.agePlaceholder}
              setDone={setDone}
            />

            <Field
              label={t.skinType}
              value={skinType}
              setValue={setSkinType}
              placeholder={t.skinTypePlaceholder}
              setDone={setDone}
            />

            <Field
              label={t.sensitivity}
              value={sensitivity}
              setValue={setSensitivity}
              placeholder={t.sensitivityPlaceholder}
              setDone={setDone}
            />

            <TextArea
              label={t.concerns}
              value={concerns}
              setValue={setConcerns}
              placeholder={t.concernsPlaceholder}
              setDone={setDone}
            />

            <TextArea
              label={t.goal}
              value={goal}
              setValue={setGoal}
              placeholder={t.goalPlaceholder}
              setDone={setDone}
            />

            <button
              onClick={createRoutine}
              disabled={!canCreate}
              style={{
                ...styles.primaryBtn,
                opacity: canCreate ? 1 : 0.45,
                cursor: canCreate ? 'pointer' : 'not-allowed',
              }}
            >
              {t.create}
            </button>
          </div>

          <div style={styles.panel}>
            {!done ? (
              <div style={styles.empty}>{t.empty}</div>
            ) : (
              <>
                <h2 style={styles.h2}>{t.strategyTitle}</h2>

                <p style={styles.text}>{strategyText}</p>

                <div style={styles.priorityBox}>
                  <h3 style={styles.infoTitle}>{t.priorities}</h3>

                  <ul style={styles.list}>
                    {t.priorityList.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </section>

        {done && (
          <section style={styles.resultGrid}>
            <Info title={t.morning}>{t.morningText}</Info>

            <Info title={t.evening}>{t.eveningText}</Info>

            <Info title={t.weekly}>{t.weeklyText}</Info>

            <Info title={t.directions}>{t.directionsText}</Info>
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
    maxWidth: '1300px',
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
    maxWidth: '900px',
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
    minHeight: '135px',
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
  empty: {
    minHeight: '620px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#888',
    fontSize: '22px',
    textAlign: 'center',
    lineHeight: 1.6,
  },
  text: {
    color: '#d4d4d4',
    lineHeight: 1.7,
    fontSize: '18px',
  },
  priorityBox: {
    marginTop: '26px',
    background: '#0d0d18',
    border: '1px solid #252525',
    borderRadius: '22px',
    padding: '24px',
  },
  list: {
    color: '#d4d4d4',
    lineHeight: 1.9,
    fontSize: '17px',
    paddingLeft: '22px',
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
