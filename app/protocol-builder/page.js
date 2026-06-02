'use client'

import { useState } from 'react'

const ui = {
  DE: {
    back: '← FORMULENS LAB',
    title: 'PROTOCOL BUILDER',
    subtitle: 'Professionelle Behandlungsprotokolle für Kosmetikerinnen & Institute.',
    formTitle: 'Kundendaten & Hautanalyse',
    language: 'Sprache',
    gender: 'Geschlecht',
    age: 'Alter',
    skinType: 'Hauttyp',
    sensitivity: 'Sensibilität',
    concerns: 'Hauptprobleme',
    goal: 'Behandlungsziel',
    button: 'PROTOKOLL ERSTELLEN',
    loading: 'Protokoll wird erstellt...',
    report: 'Professional Report',
    empty: 'Fülle die Analyse aus und erstelle ein personalisiertes Behandlungsprotokoll.',
    diagnosis: 'PROFESSIONAL DIAGNOSIS',
    summary: 'AI Summary',
    mainLine: 'Main line',
    variant: 'Variant',
    course: 'Course',
    equipment: 'Equipment',
    homecare: 'Homecare Support',
    strategy: 'FORMULENS STRATEGY',
    primaryStrategy: 'Primary Strategy',
    secondaryStrategies: 'Secondary Strategies',
    recommendedLines: 'Recommended Lines',
    activeFocus: 'Active Focus',
    amount: 'Menge',
    exposure: 'Einwirkzeit',
    removal: 'Entfernung',
    note: 'Hinweis',
  },
  RU: {
    back: '← FORMULENS LAB',
    title: 'КОНСТРУКТОР ПРОТОКОЛОВ',
    subtitle: 'Профессиональные протоколы процедур для косметологов и институтов.',
    formTitle: 'Данные клиента и анализ кожи',
    language: 'Язык',
    gender: 'Пол',
    age: 'Возраст',
    skinType: 'Тип кожи',
    sensitivity: 'Чувствительность',
    concerns: 'Основные проблемы',
    goal: 'Цель процедуры',
    button: 'СОЗДАТЬ ПРОТОКОЛ',
    loading: 'Протокол создаётся...',
    report: 'Профессиональный отчёт',
    empty: 'Заполните анализ и создайте персонализированный протокол процедуры.',
    diagnosis: 'ПРОФЕССИОНАЛЬНАЯ ДИАГНОСТИКА',
    summary: 'AI резюме',
    mainLine: 'Основная линия',
    variant: 'Вариант',
    course: 'Курс',
    equipment: 'Оборудование',
    homecare: 'Домашняя поддержка',
    strategy: 'СТРАТЕГИЯ FORMULENS',
    primaryStrategy: 'Основная стратегия',
    secondaryStrategies: 'Поддерживающие стратегии',
    recommendedLines: 'Рекомендуемые линии',
    activeFocus: 'Активный фокус',
    amount: 'Количество',
    exposure: 'Экспозиция',
    removal: 'Удаление',
    note: 'Примечание',
  },
  EN: {
    back: '← FORMULENS LAB',
    title: 'PROTOCOL BUILDER',
    subtitle: 'Professional treatment protocols for cosmetologists & institutes.',
    formTitle: 'Client data & skin analysis',
    language: 'Language',
    gender: 'Gender',
    age: 'Age',
    skinType: 'Skin type',
    sensitivity: 'Sensitivity',
    concerns: 'Main concerns',
    goal: 'Treatment goal',
    button: 'GENERATE PROTOCOL',
    loading: 'Generating protocol...',
    report: 'Professional Report',
    empty: 'Fill in the analysis and generate a personalized treatment protocol.',
    diagnosis: 'PROFESSIONAL DIAGNOSIS',
    summary: 'AI Summary',
    mainLine: 'Main line',
    variant: 'Variant',
    course: 'Course',
    equipment: 'Equipment',
    homecare: 'Homecare Support',
    strategy: 'FORMULENS STRATEGY',
    primaryStrategy: 'Primary Strategy',
    secondaryStrategies: 'Secondary Strategies',
    recommendedLines: 'Recommended Lines',
    activeFocus: 'Active Focus',
    amount: 'Amount',
    exposure: 'Exposure',
    removal: 'Removal',
    note: 'Note',
  },
}

const options = {
  DE: {
    gender: [
      ['female', 'Frau'],
      ['male', 'Mann'],
      ['diverse', 'Divers'],
    ],
    skinTypes: [
      ['dry', 'Trocken'],
      ['normal', 'Normal'],
      ['combination', 'Mischhaut'],
      ['oily', 'Fettig'],
    ],
    sensitivities: [
      ['low', 'Niedrig'],
      ['medium', 'Mittel'],
      ['high', 'Hoch'],
    ],
    concerns: [
      ['wrinkles', 'Falten'],
      ['lifting', 'Erschlaffung / Lifting'],
      ['pigmentation', 'Pigmentierung'],
      ['acne', 'Akne / Unreinheiten'],
      ['redness', 'Rötungen / Couperose'],
      ['dehydration', 'Dehydrierung'],
      ['dullness', 'Fahler Teint'],
      ['regeneration', 'Regeneration'],
    ],
  },
  RU: {
    gender: [
      ['female', 'Женщина'],
      ['male', 'Мужчина'],
      ['diverse', 'Другое'],
    ],
    skinTypes: [
      ['dry', 'Сухая'],
      ['normal', 'Нормальная'],
      ['combination', 'Комбинированная'],
      ['oily', 'Жирная'],
    ],
    sensitivities: [
      ['low', 'Низкая'],
      ['medium', 'Средняя'],
      ['high', 'Высокая'],
    ],
    concerns: [
      ['wrinkles', 'Морщины'],
      ['lifting', 'Дряблость / Лифтинг'],
      ['pigmentation', 'Пигментация'],
      ['acne', 'Акне / Высыпания'],
      ['redness', 'Покраснения / Купероз'],
      ['dehydration', 'Обезвоженность'],
      ['dullness', 'Тусклый тон'],
      ['regeneration', 'Регенерация'],
    ],
  },
  EN: {
    gender: [
      ['female', 'Female'],
      ['male', 'Male'],
      ['diverse', 'Diverse'],
    ],
    skinTypes: [
      ['dry', 'Dry'],
      ['normal', 'Normal'],
      ['combination', 'Combination'],
      ['oily', 'Oily'],
    ],
    sensitivities: [
      ['low', 'Low'],
      ['medium', 'Medium'],
      ['high', 'High'],
    ],
    concerns: [
      ['wrinkles', 'Wrinkles'],
      ['lifting', 'Sagging / Lifting'],
      ['pigmentation', 'Pigmentation'],
      ['acne', 'Acne / Impurities'],
      ['redness', 'Redness / Couperose'],
      ['dehydration', 'Dehydration'],
      ['dullness', 'Dull tone'],
      ['regeneration', 'Regeneration'],
    ],
  },
}

export default function ProtocolBuilderPage() {
  const [form, setForm] = useState({
    gender: 'female',
    age: 55,
    skinType: 'dry',
    sensitivity: 'medium',
    concerns: ['wrinkles', 'lifting'],
    goal: 'увлажнение',
    lang: 'RU',
  })

  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const text = ui[form.lang] || ui.DE
  const opt = options[form.lang] || options.DE

  function updateField(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }))
    setResult(null)
    setError('')
  }

  function toggleConcern(value) {
    setForm((prev) => ({
      ...prev,
      concerns: prev.concerns.includes(value)
        ? prev.concerns.filter((item) => item !== value)
        : [...prev.concerns, value],
    }))
    setResult(null)
    setError('')
  }

  async function generateProtocol() {
    setLoading(true)
    setResult(null)
    setError('')

    try {
      const response = await fetch('/api/professional', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Protocol generation failed')
      }

      setResult(data)
    } catch (error) {
      console.error(error)
      setError(error.message || 'Protocol generation failed')
    } finally {
      setLoading(false)
    }
  }

  const treatment = result?.protocol?.treatment || result?.protocol?.protocol
  const decision = result?.protocol?.decision
  const variant = result?.protocol?.variant
  const strategy = result?.strategy

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <a href="/" className="text-sm text-white/60 hover:text-white">
          {text.back}
        </a>

        <div className="mt-10 mb-10">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight">
            {text.title}
          </h1>

          <p className="mt-5 max-w-3xl text-lg text-white/70">
            {text.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-2xl font-bold mb-6">{text.formTitle}</h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm text-white/60 mb-2">
                  {text.language}
                </label>

                <div className="flex gap-2">
                  {['DE', 'RU', 'EN'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => updateField('lang', lang)}
                      className={`px-4 py-2 rounded-xl border ${
                        form.lang === lang
                          ? 'bg-fuchsia-600 border-fuchsia-500'
                          : 'border-white/15 bg-black'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              <SelectField
                label={text.gender}
                value={form.gender}
                onChange={(value) => updateField('gender', value)}
                items={opt.gender}
              />

              <div>
                <label className="block text-sm text-white/60 mb-2">
                  {text.age}
                </label>
                <input
                  type="number"
                  value={form.age}
                  onChange={(e) => updateField('age', e.target.value)}
                  className="w-full rounded-xl bg-black border border-white/15 px-4 py-3"
                />
              </div>

              <SelectField
                label={text.skinType}
                value={form.skinType}
                onChange={(value) => updateField('skinType', value)}
                items={opt.skinTypes}
              />

              <SelectField
                label={text.sensitivity}
                value={form.sensitivity}
                onChange={(value) => updateField('sensitivity', value)}
                items={opt.sensitivities}
              />

              <div>
                <label className="block text-sm text-white/60 mb-3">
                  {text.concerns}
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {opt.concerns.map(([value, label]) => {
                    const active = form.concerns.includes(value)

                    return (
                      <button
                        key={value}
                        onClick={() => toggleConcern(value)}
                        className={`text-left rounded-xl border px-4 py-3 ${
                          active
                            ? 'bg-fuchsia-600/30 border-fuchsia-500 text-white'
                            : 'bg-black border-white/15 text-white/70'
                        }`}
                      >
                        {label}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm text-white/60 mb-2">
                  {text.goal}
                </label>

                <textarea
                  value={form.goal}
                  onChange={(e) => updateField('goal', e.target.value)}
                  rows={4}
                  className="w-full rounded-xl bg-black border border-white/15 px-4 py-3"
                />
              </div>

              <button
                onClick={generateProtocol}
                disabled={loading}
                className="w-full rounded-2xl bg-white text-black font-bold px-6 py-4 hover:bg-white/90 disabled:opacity-60"
              >
                {loading ? text.loading : text.button}
              </button>
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 min-h-[500px]">
            {!treatment && !error && (
              <div className="h-full flex flex-col justify-center text-white/50">
                <h2 className="text-2xl font-bold text-white mb-3">
                  {text.report}
                </h2>
                <p>{text.empty}</p>
              </div>
            )}

            {error && (
              <div className="rounded-2xl bg-red-600/10 border border-red-500/30 p-5 text-red-200">
                {error}
              </div>
            )}

            {treatment && (
              <div className="space-y-6">
                <div>
                  <div className="text-sm text-fuchsia-300 font-bold mb-2">
                    {text.diagnosis}
                  </div>

                  <h2 className="text-3xl font-black">
                    {treatment.mainLine}
                  </h2>

                  <p className="text-white/60 mt-2">
                    {treatment.protocolType}
                  </p>
                </div>

                {result.summary && (
                  <div className="rounded-2xl bg-black border border-white/10 p-5">
                    <h3 className="font-bold mb-3">{text.summary}</h3>
                    <p className="text-white/75 leading-relaxed">
                      {result.summary}
                    </p>
                  </div>
                )}

                {strategy && (
                  <div className="rounded-2xl bg-black border border-fuchsia-500/30 p-5">
                    <h3 className="font-bold mb-4 text-fuchsia-300">
                      {text.strategy}
                    </h3>

                    <div className="space-y-5">
                      <div>
                        <div className="text-xs text-white/40 mb-1">
                          {text.primaryStrategy}
                        </div>

                        <div className="font-bold text-xl">
                          {strategy.primaryStrategy?.name || '—'}
                        </div>

                        {strategy.primaryStrategy?.reason && (
                          <p className="text-white/65 mt-2">
                            {strategy.primaryStrategy.reason}
                          </p>
                        )}
                      </div>

                      {strategy.secondaryStrategies?.length > 0 && (
                        <div>
                          <div className="text-xs text-white/40 mb-2">
                            {text.secondaryStrategies}
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {strategy.secondaryStrategies.map((item, index) => (
                              <span
                                key={index}
                                className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-sm"
                              >
                                {item.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {strategy.recommendedLines?.length > 0 && (
                        <div>
                          <div className="text-xs text-white/40 mb-2">
                            {text.recommendedLines}
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {strategy.recommendedLines.map((line) => (
                              <span
                                key={line}
                                className="rounded-full bg-fuchsia-600/20 border border-fuchsia-500/30 px-3 py-1 text-sm"
                              >
                                {line}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {strategy.activeIngredients?.length > 0 && (
                        <div>
                          <div className="text-xs text-white/40 mb-2">
                            {text.activeFocus}
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {strategy.activeIngredients.map((item) => (
                              <span
                                key={item}
                                className="rounded-full bg-emerald-600/20 border border-emerald-500/30 px-3 py-1 text-sm"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <InfoCard label={text.mainLine} value={decision?.mainLine || treatment.mainLine} />
                  <InfoCard label={text.variant} value={variant?.variantName || treatment.variantName} />
                  <InfoCard label={text.course} value={treatment.course} />
                </div>

                {treatment.courseNote && (
                  <div className="rounded-2xl bg-fuchsia-600/10 border border-fuchsia-500/30 p-5 text-white/80">
                    {treatment.courseNote}
                  </div>
                )}

                {treatment.phases?.map((phase, index) => (
                  <div
                    key={index}
                    className="rounded-2xl bg-black border border-white/10 p-5"
                  >
                    <h3 className="text-xl font-bold mb-4">{phase.title}</h3>

                    <div className="space-y-3">
                      {phase.steps?.map((step, stepIndex) => (
                        <div
                          key={stepIndex}
                          className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
                        >
                          <div className="font-bold">{step.name}</div>

                          <div className="text-xs text-white/45 mt-1">
                            {step.line}
                          </div>

                          <div className="text-sm text-fuchsia-200 mt-2">
                            {step.category}
                          </div>

                          {step.instruction && (
                            <p className="text-sm text-white/70 mt-2">
                              {step.instruction}
                            </p>
                          )}

                          {(step.amount || step.exposure || step.removal) && (
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3">
                              {step.amount && (
                                <MiniCard label={text.amount} value={step.amount} />
                              )}

                              {step.exposure && (
                                <MiniCard label={text.exposure} value={step.exposure} />
                              )}

                              {step.removal && (
                                <MiniCard label={text.removal} value={step.removal} />
                              )}
                            </div>
                          )}

                          {step.note && (
                            <p className="text-xs text-white/50 mt-3">
                              <strong>{text.note}: </strong>
                              {step.note}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {treatment.equipment?.length > 0 && (
                  <div className="rounded-2xl bg-black border border-white/10 p-5">
                    <h3 className="text-xl font-bold mb-3">{text.equipment}</h3>
                    {treatment.equipment.map((item, index) => (
                      <div key={index}>
                        <div className="font-bold">{item.name}</div>
                        {item.usage && (
                          <p className="text-white/70">{item.usage}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {treatment.homecareSupport?.length > 0 && (
                  <div className="rounded-2xl bg-black border border-white/10 p-5">
                    <h3 className="text-xl font-bold mb-3">{text.homecare}</h3>
                    <ul className="list-disc pl-5 text-white/75">
                      {treatment.homecareSupport.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}

function SelectField({ label, value, onChange, items }) {
  return (
    <div>
      <label className="block text-sm text-white/60 mb-2">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl bg-black border border-white/15 px-4 py-3"
      >
        {items.map(([itemValue, itemLabel]) => (
          <option key={itemValue} value={itemValue}>
            {itemLabel}
          </option>
        ))}
      </select>
    </div>
  )
}

function InfoCard({ label, value }) {
  return (
    <div className="rounded-2xl bg-black border border-white/10 p-4">
      <div className="text-xs text-white/40 mb-1">{label}</div>
      <div className="font-bold">{value || '—'}</div>
    </div>
  )
}

function MiniCard({ label, value }) {
  return (
    <div className="rounded-lg bg-black border border-white/10 p-3">
      <div className="text-xs text-white/40">{label}</div>
      <div className="font-bold text-sm">{value}</div>
    </div>
  )
}
