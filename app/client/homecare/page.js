'use client'

import { useState } from 'react'

const ui = {
  DE: {
    back: '← Home Care Dashboard',
    title: 'Homecare Routine',
    subtitle:
      'Erstellen Sie eine personalisierte Homecare-Strategie nach Geschlecht, Alter, Hauttyp, Sensibilität, Hauptproblemen und Pflegeziel.',
    formTitle: 'Hautbeschreibung',
    resultTitle: 'Strategie ухода',
    gender: 'Geschlecht',
    age: 'Alter',
    skinType: 'Hauttyp',
    sensitivity: 'Hautsensibilität',
    concerns: 'Hauptprobleme',
    goal: 'Pflegeziel',
    generate: '✨ Routine erstellen',
    generating: 'Routine wird erstellt...',
    placeholderGender: 'Zum Beispiel: Frau',
    placeholderAge: 'Zum Beispiel: 45',
    placeholderSkinType: 'trocken, sensibel, Mischhaut',
    placeholderSensitivity: 'niedrig, mittel oder hoch',
    placeholderConcerns: 'Falten, Pigmentierung, Rötungen',
    placeholderGoal: 'Feuchtigkeit, Anti-Aging, Glow',
    empty: 'Füllen Sie die Hautbeschreibung aus, um eine Routine zu erstellen.',
    summary: 'Zusammenfassung',
    advice: 'Professionelle Empfehlung',
    lines: 'Empfohlene Linien',
    priorities: 'Prioritäten',
    morning: 'Morgenroutine',
    evening: 'Abendroutine',
    weekly: 'Wöchentliche Unterstützung',
    avoid: 'Vermeiden',
  },

  RU: {
    back: '← Домашний уход',
    title: 'Домашняя рутина',
    subtitle:
      'Создайте персональную стратегию домашнего ухода по полу, возрасту, типу кожи, чувствительности, основным проблемам и цели ухода.',
    formTitle: 'Описание кожи',
    resultTitle: 'Стратегия ухода',
    gender: 'Пол',
    age: 'Возраст',
    skinType: 'Тип кожи',
    sensitivity: 'Чувствительность кожи',
    concerns: 'Основные проблемы',
    goal: 'Цель ухода',
    generate: '✨ Создать рутину',
    generating: 'Создаём рутину...',
    placeholderGender: 'Например: женщина',
    placeholderAge: 'Например: 45',
    placeholderSkinType: 'сухая, чувствительная, комбинированная',
    placeholderSensitivity: 'низкая, средняя или высокая',
    placeholderConcerns: 'морщины, пигментация, покраснения',
    placeholderGoal: 'увлажнение, anti-age, glow',
    empty: 'Заполните описание кожи, чтобы создать рутину.',
    summary: 'Резюме',
    advice: 'Профессиональная рекомендация',
    lines: 'Рекомендуемые линии',
    priorities: 'Приоритеты',
    morning: 'Утренний уход',
    evening: 'Вечерний уход',
    weekly: 'Еженедельная поддержка',
    avoid: 'Избегать',
  },

  EN: {
    back: '← Home Care Dashboard',
    title: 'Homecare Routine',
    subtitle:
      'Create a personalized homecare strategy based on gender, age, skin type, sensitivity, main concerns and skincare goal.',
    formTitle: 'Skin Description',
    resultTitle: 'Care Strategy',
    gender: 'Gender',
    age: 'Age',
    skinType: 'Skin type',
    sensitivity: 'Skin sensitivity',
    concerns: 'Main concerns',
    goal: 'Care goal',
    generate: '✨ Create routine',
    generating: 'Creating routine...',
    placeholderGender: 'For example: woman',
    placeholderAge: 'For example: 45',
    placeholderSkinType: 'dry, sensitive, combination',
    placeholderSensitivity: 'low, medium or high',
    placeholderConcerns: 'wrinkles, pigmentation, redness',
    placeholderGoal: 'hydration, anti-aging, glow',
    empty: 'Fill in the skin description to create a routine.',
    summary: 'Summary',
    advice: 'Professional advice',
    lines: 'Recommended lines',
    priorities: 'Priorities',
    morning: 'Morning routine',
    evening: 'Evening routine',
    weekly: 'Weekly support',
    avoid: 'Avoid',
  },
}

export default function HomecarePage() {
  const [lang, setLang] = useState('DE')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const [form, setForm] = useState({
    gender: '',
    age: '',
    skinType: '',
    sensitivity: '',
    concerns: '',
    goal: '',
  })

  const t = ui[lang]

  function updateField(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  async function generateRoutine() {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetch('/api/homecare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          lang,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Homecare generation failed')
      }

      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const recommendation = result?.recommendation

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#221033_0%,#060606_42%,#000_100%)] px-6 py-12 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex items-center justify-between">
          <div className="text-sm text-white/70">{t.back}</div>

          <div className="flex gap-3">
            {['DE', 'RU', 'EN'].map((item) => (
              <button
                key={item}
                onClick={() => setLang(item)}
                className={`rounded-xl border px-5 py-3 text-sm font-bold ${
                  lang === item
                    ? 'border-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600'
                    : 'border-white/20 bg-black/30'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <section className="mb-12">
          <h1 className="max-w-5xl text-6xl font-black tracking-tight md:text-7xl">
            {t.title}
          </h1>

          <p className="mt-8 max-w-4xl text-xl leading-9 text-white/75">
            {t.subtitle}
          </p>
        </section>

        <section className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-[#0b0b16]/90 p-8">
            <h2 className="mb-8 text-3xl font-bold">{t.formTitle}</h2>

            <div className="space-y-5">
              <Field
                label={t.gender}
                value={form.gender}
                placeholder={t.placeholderGender}
                onChange={(value) => updateField('gender', value)}
              />

              <Field
                label={t.age}
                value={form.age}
                placeholder={t.placeholderAge}
                onChange={(value) => updateField('age', value)}
              />

              <Field
                label={t.skinType}
                value={form.skinType}
                placeholder={t.placeholderSkinType}
                onChange={(value) => updateField('skinType', value)}
              />

              <Field
                label={t.sensitivity}
                value={form.sensitivity}
                placeholder={t.placeholderSensitivity}
                onChange={(value) => updateField('sensitivity', value)}
              />

              <Field
                label={t.concerns}
                value={form.concerns}
                placeholder={t.placeholderConcerns}
                onChange={(value) => updateField('concerns', value)}
              />

              <Field
                label={t.goal}
                value={form.goal}
                placeholder={t.placeholderGoal}
                onChange={(value) => updateField('goal', value)}
              />
            </div>

            <button
              onClick={generateRoutine}
              disabled={loading}
              className="mt-8 w-full rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-5 text-lg font-black transition hover:opacity-90 disabled:opacity-50"
            >
              {loading ? t.generating : t.generate}
            </button>

            {error && (
              <div className="mt-5 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
                {error}
              </div>
            )}
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-[#0b0b16]/90 p-8">
            {!result ? (
              <div className="flex h-full min-h-[560px] items-center justify-center text-center text-xl leading-9 text-white/45">
                {t.empty}
              </div>
            ) : (
              <div>
                <h2 className="mb-8 text-3xl font-bold">{t.resultTitle}</h2>

                <Section title={t.summary}>
                  <p className="leading-8 text-white/75">{result.summary}</p>
                </Section>

                <Section title={t.advice}>
                  <p className="leading-8 text-white/75">
                    {result.professionalAdvice}
                  </p>
                </Section>

                {recommendation?.lines?.length > 0 && (
                  <Section title={t.lines}>
                    <div className="flex flex-wrap gap-3">
                      {recommendation.lines.map((line) => (
                        <span
                          key={line}
                          className="rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-3 text-sm font-bold"
                        >
                          {line}
                        </span>
                      ))}
                    </div>
                  </Section>
                )}

                {recommendation?.priorities?.length > 0 && (
                  <Section title={t.priorities}>
                    <List items={recommendation.priorities} />
                  </Section>
                )}
              </div>
            )}
          </div>
        </section>

        {recommendation && (
          <section className="mt-10 rounded-[2rem] border border-white/10 bg-[#0b0b16]/90 p-8">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-fuchsia-300">
              FORMULENS HOMECARE PROTOCOL
            </p>

            <h2 className="text-4xl font-black">
              {recommendation.strategy || t.resultTitle}
            </h2>

            <div className="mt-9 grid gap-6 lg:grid-cols-4">
              <RoutineCard title={t.morning} items={recommendation.morning} />
              <RoutineCard title={t.evening} items={recommendation.evening} />
              <RoutineCard title={t.weekly} items={recommendation.weeklySupport} />
              <RoutineCard title={t.avoid} items={recommendation.avoid} />
            </div>
          </section>
        )}
      </div>
    </main>
  )
}

function Field({ label, value, placeholder, onChange }) {
  return (
    <div>
      <label className="mb-2 block text-sm text-white/70">{label}</label>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 text-white outline-none transition placeholder:text-white/45 focus:border-fuchsia-500"
      />
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div className="mb-6 rounded-3xl border border-white/10 bg-black/20 p-6">
      <h3 className="mb-4 text-sm uppercase tracking-[0.25em] text-white/50">
        {title}
      </h3>

      {children}
    </div>
  )
}

function List({ items = [] }) {
  return (
    <ul className="space-y-3 text-white/75">
      {items.map((item, index) => (
        <li key={index} className="flex gap-3">
          <span className="text-fuchsia-300">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function RoutineCard({ title, items = [] }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-black/25 p-6">
      <h3 className="mb-6 text-2xl font-bold">{title}</h3>

      <div className="space-y-4">
        {items?.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl bg-white/10 px-5 py-4 text-sm leading-6 text-white/75"
          >
            <span className="mr-2 font-black text-fuchsia-300">
              {index + 1}.
            </span>
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
