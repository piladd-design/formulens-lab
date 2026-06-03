'use client'

import { useState } from 'react'
import { getProductDetails } from '../../lib/product-resolver.js'

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
    mainGoal: 'Hauptziel',
    ageSubGoal: 'Was stört am meisten?',
    additionalGoal: 'Zusätzliches Ziel',
    button: 'PROTOKOLL ERSTELLEN',
    loading: 'Protokoll wird erstellt...',
    report: 'Professional Report',
    empty: 'Fülle die Analyse aus und erstelle ein personalisiertes Behandlungsprotokoll.',
    diagnosis: 'PROFESSIONAL DIAGNOSIS',
    summary: 'AI Summary',
    mainLine: 'Hauptlinie',
    variant: 'Variante',
    homecare: 'Heimpflege',
    strategy: 'FORMULENS STRATEGY',
    supportingLines: 'Unterstützende Linien',
    activeConcentrates: 'Aktive Konzentrate',
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
    mainGoal: 'Главная задача',
    ageSubGoal: 'Что беспокоит больше всего?',
    additionalGoal: 'Дополнительная задача',
    button: 'СОЗДАТЬ ПРОТОКОЛ',
    loading: 'Протокол создаётся...',
    report: 'Профессиональный отчёт',
    empty: 'Заполните анализ и создайте персонализированный протокол процедуры.',
    diagnosis: 'ПРОФЕССИОНАЛЬНАЯ ДИАГНОСТИКА',
    summary: 'AI резюме',
    mainLine: 'Основная линия',
    variant: 'Вариант',
    homecare: 'Домашняя поддержка',
    strategy: 'СТРАТЕГИЯ FORMULENS',
    supportingLines: 'Поддерживающие линии',
    activeConcentrates: 'Активные концентраты',
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
    mainGoal: 'Main goal',
    ageSubGoal: 'Main aging concern',
    additionalGoal: 'Additional goal',
    button: 'GENERATE PROTOCOL',
    loading: 'Generating protocol...',
    report: 'Professional Report',
    empty: 'Fill in the analysis and generate a personalized treatment protocol.',
    diagnosis: 'PROFESSIONAL DIAGNOSIS',
    summary: 'AI Summary',
    mainLine: 'Main line',
    variant: 'Variant',
    homecare: 'Homecare Support',
    strategy: 'FORMULENS STRATEGY',
    supportingLines: 'Supporting lines',
    activeConcentrates: 'Active concentrates',
    amount: 'Amount',
    exposure: 'Exposure',
    removal: 'Removal',
    note: 'Note',
  },
}

const options = {
  DE: {
    gender: [['female', 'Frau'], ['male', 'Mann'], ['diverse', 'Divers']],
    skinTypes: [['dry', 'Trocken'], ['normal', 'Normal'], ['combination', 'Mischhaut'], ['oily', 'Fettig']],
    sensitivities: [['low', 'Niedrig'], ['medium', 'Mittel'], ['high', 'Hoch']],
    mainGoals: [
      ['hydration', 'Feuchtigkeit'],
      ['sensitivity', 'Empfindlichkeit'],
      ['acne', 'Akne / Sebum'],
      ['pigmentation', 'Pigmentierung'],
      ['age', 'Altersveränderungen'],
      ['antioxidant', 'Antioxidativer Schutz / fahler Teint'],
      ['regeneration', 'Regeneration'],
    ],
    ageSubGoals: [
      ['wrinkles', 'Falten'],
      ['firmness', 'Festigkeitsverlust'],
      ['oval', 'Konturverlust'],
      ['age_pigmentation', 'Altersbedingte Pigmentierung'],
      ['dryness', 'Trockenheit'],
      ['dullness', 'Fahler Teint'],
    ],
    additionalGoals: [
      ['none', 'Nein'],
      ['dehydration', 'Dehydrierung'],
      ['sensitivity', 'Empfindlichkeit'],
      ['pigmentation', 'Pigmentierung'],
      ['regeneration', 'Regeneration'],
      ['antioxidant', 'Antioxidativer Schutz'],
    ],
  },
  RU: {
    gender: [['female', 'Женщина'], ['male', 'Мужчина'], ['diverse', 'Другое']],
    skinTypes: [['dry', 'Сухая'], ['normal', 'Нормальная'], ['combination', 'Комбинированная'], ['oily', 'Жирная']],
    sensitivities: [['low', 'Низкая'], ['medium', 'Средняя'], ['high', 'Высокая']],
    mainGoals: [
      ['hydration', 'Увлажнение'],
      ['sensitivity', 'Чувствительность'],
      ['acne', 'Акне / Себум'],
      ['pigmentation', 'Пигментация'],
      ['age', 'Возрастные изменения'],
      ['antioxidant', 'Антиоксидантная защита / Тусклая кожа'],
      ['regeneration', 'Регенерация'],
    ],
    ageSubGoals: [
      ['wrinkles', 'Морщины'],
      ['firmness', 'Потеря упругости'],
      ['oval', 'Потеря овала'],
      ['age_pigmentation', 'Возрастная пигментация'],
      ['dryness', 'Сухость'],
      ['dullness', 'Тусклая кожа'],
    ],
    additionalGoals: [
      ['none', 'Нет'],
      ['dehydration', 'Обезвоженность'],
      ['sensitivity', 'Чувствительность'],
      ['pigmentation', 'Пигментация'],
      ['regeneration', 'Регенерация'],
      ['antioxidant', 'Антиоксидантная защита'],
    ],
  },
  EN: {
    gender: [['female', 'Female'], ['male', 'Male'], ['diverse', 'Diverse']],
    skinTypes: [['dry', 'Dry'], ['normal', 'Normal'], ['combination', 'Combination'], ['oily', 'Oily']],
    sensitivities: [['low', 'Low'], ['medium', 'Medium'], ['high', 'High']],
    mainGoals: [
      ['hydration', 'Hydration'],
      ['sensitivity', 'Sensitivity'],
      ['acne', 'Acne / Sebum'],
      ['pigmentation', 'Pigmentation'],
      ['age', 'Age-related changes'],
      ['antioxidant', 'Antioxidant protection / Dull skin'],
      ['regeneration', 'Regeneration'],
    ],
    ageSubGoals: [
      ['wrinkles', 'Wrinkles'],
      ['firmness', 'Loss of firmness'],
      ['oval', 'Loss of facial oval'],
      ['age_pigmentation', 'Age-related pigmentation'],
      ['dryness', 'Dryness'],
      ['dullness', 'Dull skin'],
    ],
    additionalGoals: [
      ['none', 'None'],
      ['dehydration', 'Dehydration'],
      ['sensitivity', 'Sensitivity'],
      ['pigmentation', 'Pigmentation'],
      ['regeneration', 'Regeneration'],
      ['antioxidant', 'Antioxidant protection'],
    ],
  },
}

export default function ProtocolBuilderPage() {
  const [form, setForm] = useState({
    gender: 'female',
    age: 55,
    skinType: 'dry',
    sensitivity: 'medium',
    mainGoal: 'hydration',
    ageSubGoal: '',
    additionalGoal: 'none',
    lang: 'RU',
  })

  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const text = ui[form.lang] || ui.DE
  const opt = options[form.lang] || options.DE

  function updateField(name, value) {
    setForm((prev) => {
      const next = { ...prev, [name]: value }

      if (name === 'mainGoal' && value !== 'age') next.ageSubGoal = ''
      if (name === 'mainGoal' && value === 'age' && !prev.ageSubGoal) next.ageSubGoal = 'wrinkles'

      return next
    })

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

  const protocolBuilder = result?.protocol?.protocolBuilder
  const treatment =
    result?.protocol?.treatment ||
    result?.protocol?.protocol ||
    protocolBuilder?.protocol

  const protocolStrategy = protocolBuilder?.strategy
  const strategy = result?.strategy

  const mainLine =
    protocolStrategy?.mainLineLabel ||
    treatment?.mainLine ||
    treatment?.line ||
    treatment?.mainLineLabel ||
    '—'

  const variant =
    protocolStrategy?.mycodeVariant ||
    treatment?.variantName ||
    treatment?.variant ||
    '—'

  const protocolSteps = treatment?.steps || []
  const protocolPhases = treatment?.phases || []

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
                      type="button"
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

              <SelectField label={text.gender} value={form.gender} onChange={(value) => updateField('gender', value)} items={opt.gender} />

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

              <SelectField label={text.skinType} value={form.skinType} onChange={(value) => updateField('skinType', value)} items={opt.skinTypes} />

              <SelectField label={text.sensitivity} value={form.sensitivity} onChange={(value) => updateField('sensitivity', value)} items={opt.sensitivities} />

              <SelectField label={text.mainGoal} value={form.mainGoal} onChange={(value) => updateField('mainGoal', value)} items={opt.mainGoals} />

              {form.mainGoal === 'age' && (
                <SelectField label={text.ageSubGoal} value={form.ageSubGoal} onChange={(value) => updateField('ageSubGoal', value)} items={opt.ageSubGoals} />
              )}

              <SelectField label={text.additionalGoal} value={form.additionalGoal} onChange={(value) => updateField('additionalGoal', value)} items={opt.additionalGoals} />

              <button
                type="button"
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

                  <h2 className="text-3xl font-black">{mainLine}</h2>

                  <p className="text-white/60 mt-2">
                    {treatment?.name || treatment?.protocolType || 'Professional Protocol'}
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

                <div className="rounded-2xl bg-black border border-fuchsia-500/30 p-5">
                  <h3 className="font-bold mb-4 text-fuchsia-300">
                    {text.strategy}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <InfoCard label={text.mainLine} value={mainLine} />
                    <InfoCard label={text.variant} value={variant} />
                  </div>

                  {protocolStrategy?.supportingLineLabels?.length > 0 && (
                    <div className="mt-5">
                      <div className="text-xs text-white/40 mb-2">
                        {text.supportingLines}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {protocolStrategy.supportingLineLabels.map((line) => (
                          <span key={line} className="rounded-full bg-fuchsia-600/20 border border-fuchsia-500/30 px-3 py-1 text-sm">
                            {line}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {protocolBuilder?.activeConcentrates?.length > 0 && (
                    <div className="mt-5">
                      <div className="text-xs text-white/40 mb-2">
                        {text.activeConcentrates}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {protocolBuilder.activeConcentrates.map((item) => (
                          <span key={item} className="rounded-full bg-emerald-600/20 border border-emerald-500/30 px-3 py-1 text-sm">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {strategy?.primaryStrategy?.name && (
                    <div className="mt-5 text-white/70">
                      <div className="font-bold text-white">
                        {strategy.primaryStrategy.name}
                      </div>

                      {strategy.primaryStrategy.reason && (
                        <p className="mt-2">{strategy.primaryStrategy.reason}</p>
                      )}
                    </div>
                  )}
                </div>

                {protocolPhases.length > 0 &&
                  protocolPhases.map((phase, index) => (
                    <div key={index} className="rounded-2xl bg-black border border-white/10 p-5">
                      <h3 className="text-xl font-bold mb-4">{phase.title}</h3>

                      <div className="space-y-3">
                        {phase.steps?.map((step, stepIndex) => (
                          <ProtocolStep key={stepIndex} step={step} text={text} />
                        ))}
                      </div>
                    </div>
                  ))}

                {protocolSteps.length > 0 && (
                  <div className="rounded-2xl bg-black border border-white/10 p-5">
                    <h3 className="text-xl font-bold mb-4">
                      {treatment?.name || 'Protocol steps'}
                    </h3>

                    <div className="space-y-3">
                      {protocolSteps.map((step, index) => (
                        <ProtocolStep key={index} step={step} text={text} />
                      ))}
                    </div>
                  </div>
                )}

                {protocolBuilder?.homecare?.length > 0 && (
                  <div className="rounded-2xl bg-black border border-white/10 p-5">
                    <h3 className="text-xl font-bold mb-3">{text.homecare}</h3>

                    <div className="space-y-3">
                      {protocolBuilder.homecare.map((item, index) => (
                        <div key={index} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                          <div className="font-bold">
                            {item.title || item.line}
                          </div>

                          {item.role && (
                            <p className="text-white/65 mt-2">{item.role}</p>
                          )}

                          {(item.morning?.length > 0 || item.evening?.length > 0) && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                              {item.morning?.length > 0 && (
                                <HomecareColumn title="Утро" products={item.morning} />
                              )}

                              {item.evening?.length > 0 && (
                                <HomecareColumn title="Вечер" products={item.evening} />
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
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

function ProtocolStep({ step, text }) {
  const title = step.title || step.name || '—'
  const description = step.description || step.instruction || ''
  const products = step.products || []

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <div className="font-bold">{title}</div>

      {description && (
        <p className="text-sm text-white/70 mt-2">{description}</p>
      )}

      {products.length > 0 && (
        <div className="space-y-3 mt-4">
          {products.map((productId, index) => {
            const product = getProductDetails(productId)

            return (
              <div key={index} className="rounded-xl border border-white/10 bg-black p-4">
                <div className="font-bold text-white">{product.name}</div>

                {product.line && (
                  <div className="text-xs text-fuchsia-300 mt-1">{product.line}</div>
                )}

                {product.category && (
                  <div className="text-xs text-white/40 mt-1">{product.category}</div>
                )}

                {product.application && (
                  <p className="text-sm text-white/70 mt-3">{product.application}</p>
                )}

                {(product.amount || product.exposure || product.removal) && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3">
                    {product.amount && <MiniCard label={text.amount} value={product.amount} />}
                    {product.exposure && <MiniCard label={text.exposure} value={product.exposure} />}
                    {product.removal && <MiniCard label={text.removal} value={product.removal} />}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {(step.amount || step.exposure || step.removal) && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3">
          {step.amount && <MiniCard label={text.amount} value={step.amount} />}
          {step.exposure && <MiniCard label={text.exposure} value={step.exposure} />}
          {step.removal && <MiniCard label={text.removal} value={step.removal} />}
        </div>
      )}

      {step.note && (
        <p className="text-xs text-white/50 mt-3">
          <strong>{text.note}: </strong>
          {step.note}
        </p>
      )}
    </div>
  )
}

function HomecareColumn({ title, products }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black p-4">
      <div className="font-bold mb-3">{title}</div>

      <div className="space-y-2">
        {products.map((productId, index) => {
          const product = getProductDetails(productId)

          return (
            <div key={index} className="text-sm text-white/75">
              {product.name}
            </div>
          )
        })}
      </div>
    </div>
  )
}
