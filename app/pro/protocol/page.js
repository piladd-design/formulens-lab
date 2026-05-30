'use client'

import Link from 'next/link'
import { useState } from 'react'

const translations = {
  DE: {
    back: '← Professional Dashboard',
    title: 'Protokoll Builder',
    subtitle:
      'Erstellen Sie ein professionelles Behandlungsprotokoll anhand von Alter, Hauttyp, Sensibilität, Fototyp, Hautproblemen und Behandlungsziel.',

    clientData: 'Kundendaten',
    age: 'Alter',
    agePlaceholder: 'Zum Beispiel: 45',
    skinType: 'Hauttyp',
    skinTypePlaceholder: 'Zum Beispiel: trocken, sensibel, reaktiv',
    sensitivity: 'Hautsensibilität',
    sensitivityPlaceholder: 'Niedrig, mittel oder hoch',
    phototype: 'Fototyp',
    phototypePlaceholder: 'I, II, III, IV, V oder VI',
    concerns: 'Hauptprobleme',
    concernsPlaceholder:
      'Zum Beispiel: Couperose, Rötungen, Dehydratation, Falten, Pigmentierung',
    goal: 'Behandlungsziel',
    goalPlaceholder:
      'Zum Beispiel: Haut beruhigen, Barriere stärken, Feuchtigkeit und Ton verbessern',
    create: '✨ Protokoll erstellen',

    empty:
      'Füllen Sie die Kundendaten aus, um ein professionelles Behandlungsprotokoll zu erstellen.',
    strategyTitle: 'Professionelle Strategie',
    priorities: 'Behandlungsprioritäten',
    protocolTitle: 'Kabinenprotokoll',

    strategyText:
      'Für eine Kundin im Alter von {age} Jahren mit dem Hauttyp „{skinType}“, Sensibilität „{sensitivity}“, Fototyp „{phototype}“ und den Hauptproblemen „{concerns}“ empfiehlt sich ein strukturiertes, barriereorientiertes Protokoll. Das Ziel ist, die Haut zu stabilisieren, Reaktivität zu reduzieren, Komfort wiederherzustellen und die Haut auf weitere aktive Behandlungsschritte vorzubereiten.',

    priorityList: [
      'Reduktion von Reaktivität und Rötungen',
      'Stärkung der Hautbarriere',
      'Intensive Feuchtigkeitsversorgung',
      'Sanfte Behandlung ohne aggressive Stimulation',
      'Vorbereitung auf spätere aktive Protokolle',
    ],

    steps: [
      {
        title: 'Vorbereitung und Reinigung',
        text:
          'Sanfte Reinigung ohne Austrocknung. Empfohlene Richtung: ESSENTIAL CARE CONCEPT. Ziel: Haut reinigen, vorbereiten und Reaktivität nicht verstärken.',
      },
      {
        title: 'Toner und Stabilisierung',
        text:
          'Wiederherstellung des Hautkomforts nach der Reinigung. Bei Sensibilität: NICELY. Bei Dehydratation: GLACIAR.',
      },
      {
        title: 'Beruhigender Barriere-Schritt',
        text:
          'Kernphase des Protokolls: Reaktivität reduzieren, Barriere unterstützen und Hautstress mindern. Priorität: NICELY + GLACIAR.',
      },
      {
        title: 'Problemorientierte Korrektur',
        text:
          'Bei entzündlichen Elementen: BALANCE. Bei Pigmentierung nach Stabilisierung: BECLARITY / CELL C. Aggressive Säuren bei starker Reaktivität vermeiden.',
      },
      {
        title: 'Abschluss und Schutz',
        text:
          'Wiederherstellung, Schutz und Komfort. Bei Tagesbehandlung immer mit SPF-Richtung SUMMESUN abschließen.',
      },
    ],

    homecareTitle: 'Homecare-Protokoll',
    homecareText:
      'Morgens: sanfte Reinigung, GLACIAR für Feuchtigkeit, NICELY für Barriere, SUMMESUN SPF. \nAbends: Reinigung, NICELY zur Regeneration, bei Unreinheiten BALANCE lokal oder kurweise.',

    avoidTitle: 'Zu vermeiden',
    avoidText:
      'Aggressive Säuren, häufige Peelings, starke Retinoid-Belastung, Überhitzung und traumatische Behandlungen bis zur Stabilisierung der Hautbarriere.',

    directionsTitle: 'Summecosmetics-Richtung',
    directionsText:
      'ESSENTIAL — Reinigung und Vorbereitung. \nNICELY — Sensibilität und Barriere. \nGLACIAR — Feuchtigkeit. \nBALANCE — Unreinheiten und Sebum. \nBECLARITY / CELL C — Hautton und Pigmentierung nach Stabilisierung.',

    noteTitle: 'Professional Note',
    noteText:
      'Dieses Protokoll ist eine kosmetologische Strategie und keine medizinische Diagnose. Bei ausgeprägten dermatologischen Zuständen sollte eine ärztliche Abklärung empfohlen werden.',
  },

  RU: {
    back: '← Профессиональная панель',
    title: 'Конструктор протоколов',
    subtitle:
      'Создание профессионального протокола процедуры по возрасту, типу кожи, чувствительности, фототипу, проблемам кожи и цели процедуры.',

    clientData: 'Данные клиента',
    age: 'Возраст',
    agePlaceholder: 'Например: 45',
    skinType: 'Тип кожи',
    skinTypePlaceholder: 'Например: сухая, чувствительная, реактивная',
    sensitivity: 'Чувствительность кожи',
    sensitivityPlaceholder: 'Низкая, средняя или высокая',
    phototype: 'Фототип',
    phototypePlaceholder: 'I, II, III, IV, V или VI',
    concerns: 'Основные проблемы',
    concernsPlaceholder:
      'Например: купероз, покраснение, обезвоженность, морщины, пигментация',
    goal: 'Цель процедуры',
    goalPlaceholder:
      'Например: успокоить кожу, восстановить барьер, улучшить увлажнение и тон',
    create: '✨ Создать протокол',

    empty:
      'Заполните данные клиента, чтобы создать профессиональный протокол.',
    strategyTitle: 'Профессиональная стратегия',
    priorities: 'Приоритеты процедуры',
    protocolTitle: 'Кабинетный протокол',

    strategyText:
      'Для клиента {age} лет с типом кожи «{skinType}», чувствительностью «{sensitivity}», фототипом «{phototype}» и задачами «{concerns}» рекомендуется структурированный барьерно-восстанавливающий протокол. Основная цель — стабилизировать кожу, снизить реактивность, восстановить комфорт и подготовить кожу к дальнейшим активным этапам.',

    priorityList: [
      'Снижение реактивности и покраснения',
      'Восстановление барьерной функции',
      'Интенсивное увлажнение',
      'Мягкая работа без агрессивной стимуляции',
      'Подготовка кожи к последующим активным протоколам',
    ],

    steps: [
      {
        title: 'Подготовка и очищение',
        text:
          'Мягкое очищение кожи без пересушивания. Рекомендуемое направление: ESSENTIAL CARE CONCEPT. Цель — удалить загрязнения, подготовить кожу и не усилить реактивность.',
      },
      {
        title: 'Тонизация и стабилизация',
        text:
          'Восстановление комфорта кожи после очищения. При чувствительности приоритет — NICELY. При обезвоженности можно подключить GLACIAR.',
      },
      {
        title: 'Барьерно-успокаивающий этап',
        text:
          'Основной этап процедуры: снижение реактивности, поддержка барьера, уменьшение ощущения стресса кожи. Приоритетные линии: NICELY + GLACIAR.',
      },
      {
        title: 'Коррекция по проблеме',
        text:
          'Если есть воспалительные элементы — мягко подключить BALANCE. При пигментации после стабилизации — BECLARITY / CELL C. Избегать агрессивных кислот при выраженной реактивности.',
      },
      {
        title: 'Завершение процедуры',
        text:
          'Восстановление, защита и комфорт. При дневной процедуре обязательно завершить SPF-направлением SUMMESUN.',
      },
    ],

    homecareTitle: 'Домашний протокол',
    homecareText:
      'Утро: мягкое очищение, GLACIAR для увлажнения, NICELY для барьера, SUMMESUN SPF. \nВечер: очищение, NICELY для восстановления, при воспалениях — BALANCE локально или курсом.',

    avoidTitle: 'Чего избегать',
    avoidText:
      'Агрессивные кислоты, частые пилинги, сильная ретиноидная нагрузка, перегрев, травматичные процедуры до стабилизации барьера.',

    directionsTitle: 'Summecosmetics-направления',
    directionsText:
      'ESSENTIAL — очищение и подготовка. \nNICELY — чувствительность и барьер. \nGLACIAR — увлажнение. \nBALANCE — воспалительные элементы. \nBECLARITY / CELL C — тон и пигментация после стабилизации.',

    noteTitle: 'Профессиональное примечание',
    noteText:
      'Этот протокол является косметологической стратегией, а не медицинским диагнозом. При выраженных дерматологических состояниях клиенту следует рекомендовать консультацию врача.',
  },

  EN: {
    back: '← Professional Dashboard',
    title: 'Protocol Builder',
    subtitle:
      'Create a professional treatment protocol based on age, skin type, sensitivity, phototype, skin concerns and treatment goal.',

    clientData: 'Client Data',
    age: 'Age',
    agePlaceholder: 'Example: 45',
    skinType: 'Skin Type',
    skinTypePlaceholder: 'Example: dry, sensitive, reactive',
    sensitivity: 'Skin Sensitivity',
    sensitivityPlaceholder: 'Low, medium or high',
    phototype: 'Phototype',
    phototypePlaceholder: 'I, II, III, IV, V or VI',
    concerns: 'Main Concerns',
    concernsPlaceholder:
      'Example: couperose, redness, dehydration, wrinkles, pigmentation',
    goal: 'Treatment Goal',
    goalPlaceholder:
      'Example: calm the skin, restore barrier, improve hydration and tone',
    create: '✨ Create Protocol',

    empty:
      'Fill in the client data to create a professional treatment protocol.',
    strategyTitle: 'Professional Strategy',
    priorities: 'Treatment Priorities',
    protocolTitle: 'Treatment Protocol',

    strategyText:
      'For a client aged {age} with skin type “{skinType}”, sensitivity “{sensitivity}”, phototype “{phototype}” and concerns “{concerns}”, a structured barrier-restoring protocol is recommended. The main goal is to stabilize the skin, reduce reactivity, restore comfort and prepare the skin for further active treatment steps.',

    priorityList: [
      'Reduce reactivity and redness',
      'Restore barrier function',
      'Intensive hydration',
      'Gentle care without aggressive stimulation',
      'Prepare the skin for later active protocols',
    ],

    steps: [
      {
        title: 'Preparation and Cleansing',
        text:
          'Gentle cleansing without drying the skin. Recommended direction: ESSENTIAL CARE CONCEPT. Goal: remove impurities, prepare the skin and avoid increasing reactivity.',
      },
      {
        title: 'Toning and Stabilization',
        text:
          'Restore skin comfort after cleansing. For sensitivity: NICELY. For dehydration: GLACIAR.',
      },
      {
        title: 'Calming Barrier Step',
        text:
          'Core step of the protocol: reduce reactivity, support barrier function and reduce skin stress. Priority lines: NICELY + GLACIAR.',
      },
      {
        title: 'Concern-Oriented Correction',
        text:
          'For inflammatory elements: gently use BALANCE. For pigmentation after stabilization: BECLARITY / CELL C. Avoid aggressive acids with pronounced reactivity.',
      },
      {
        title: 'Completion and Protection',
        text:
          'Restore, protect and comfort the skin. For daytime treatments, always finish with SPF direction SUMMESUN.',
      },
    ],

    homecareTitle: 'Homecare Protocol',
    homecareText:
      'Morning: gentle cleansing, GLACIAR for hydration, NICELY for barrier support, SUMMESUN SPF. \nEvening: cleansing, NICELY for recovery, BALANCE locally or as a course when inflammatory elements are present.',

    avoidTitle: 'Avoid',
    avoidText:
      'Aggressive acids, frequent peelings, strong retinoid load, overheating and traumatic procedures until the barrier is stabilized.',

    directionsTitle: 'Summecosmetics Direction',
    directionsText:
      'ESSENTIAL — cleansing and preparation. \nNICELY — sensitivity and barrier. \nGLACIAR — hydration. \nBALANCE — inflammatory elements and sebum. \nBECLARITY / CELL C — tone and pigmentation after stabilization.',

    noteTitle: 'Professional Note',
    noteText:
      'This protocol is a cosmetic strategy, not a medical diagnosis. In case of pronounced dermatological conditions, medical consultation should be recommended.',
  },
}

export default function ProProtocolPage() {
  const [lang, setLang] = useState('DE')
  const [clientAge, setClientAge] = useState('')
  const [skinType, setSkinType] = useState('')
  const [sensitivity, setSensitivity] = useState('')
  const [phototype, setPhototype] = useState('')
  const [concerns, setConcerns] = useState('')
  const [goal, setGoal] = useState('')
  const [done, setDone] = useState(false)

  const t = translations[lang]

  const canCreate =
    clientAge.trim() &&
    skinType.trim() &&
    sensitivity.trim() &&
    phototype.trim() &&
    concerns.trim() &&
    goal.trim()

  const createProtocol = () => {
    if (!canCreate) return
    setDone(true)
  }

  const strategyText = t.strategyText
    .replace('{age}', clientAge)
    .replace('{skinType}', skinType)
    .replace('{sensitivity}', sensitivity)
    .replace('{phototype}', phototype)
    .replace('{concerns}', concerns)

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

        <section style={styles.grid}>
          <div style={styles.panel}>
            <h2 style={styles.h2}>{t.clientData}</h2>

            <Field
              label={t.age}
              value={clientAge}
              setValue={setClientAge}
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

            <Field
              label={t.phototype}
              value={phototype}
              setValue={setPhototype}
              placeholder={t.phototypePlaceholder}
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
              onClick={createProtocol}
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
          <>
            <section style={styles.protocolSection}>
              <h2 style={styles.h2}>{t.protocolTitle}</h2>

              <div style={styles.steps}>
                {t.steps.map((step, index) => (
                  <Step
                    key={step.title}
                    number={`0${index + 1}`}
                    title={step.title}
                    text={step.text}
                  />
                ))}
              </div>
            </section>

            <section style={styles.resultGrid}>
              <Info title={t.homecareTitle}>{t.homecareText}</Info>

              <Info title={t.avoidTitle}>{t.avoidText}</Info>

              <Info title={t.directionsTitle}>{t.directionsText}</Info>

              <Info title={t.noteTitle}>{t.noteText}</Info>
            </section>
          </>
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

function Step({ number, title, text }) {
  return (
    <div style={styles.step}>
      <div style={styles.stepNumber}>{number}</div>
      <div>
        <h3 style={styles.stepTitle}>{title}</h3>
        <p style={styles.stepText}>{text}</p>
      </div>
    </div>
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
    maxWidth: '1400px',
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
    maxWidth: '920px',
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
  protocolSection: {
    marginTop: '34px',
    background: 'rgba(12,12,24,0.92)',
    border: '1px solid #242424',
    borderRadius: '30px',
    padding: '34px',
  },
  steps: {
    display: 'grid',
    gap: '18px',
  },
  step: {
    display: 'grid',
    gridTemplateColumns: '80px 1fr',
    gap: '20px',
    background: '#0d0d18',
    border: '1px solid #252525',
    borderRadius: '22px',
    padding: '22px',
  },
  stepNumber: {
    width: '62px',
    height: '62px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg,#7b2cff,#ff00aa)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 900,
    fontSize: '18px',
  },
  stepTitle: {
    fontSize: '22px',
    marginBottom: '10px',
  },
  stepText: {
    color: '#d4d4d4',
    lineHeight: 1.7,
    fontSize: '17px',
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
