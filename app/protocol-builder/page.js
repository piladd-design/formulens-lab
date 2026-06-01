'use client'

import { useState } from 'react'

const skinTypes = [
  { value: 'dry', label: 'Trocken' },
  { value: 'normal', label: 'Normal' },
  { value: 'combination', label: 'Mischhaut' },
  { value: 'oily', label: 'Fettig' },
]

const sensitivities = [
  { value: 'low', label: 'Niedrig' },
  { value: 'medium', label: 'Mittel' },
  { value: 'high', label: 'Hoch' },
]

const concernOptions = [
  { value: 'wrinkles', label: 'Falten' },
  { value: 'lifting', label: 'Erschlaffung / Lifting' },
  { value: 'pigmentation', label: 'Pigmentierung' },
  { value: 'acne', label: 'Akne / Unreinheiten' },
  { value: 'redness', label: 'Rötungen / Couperose' },
  { value: 'dehydration', label: 'Dehydrierung' },
  { value: 'dullness', label: 'Fahler Teint' },
  { value: 'regeneration', label: 'Regeneration' },
]

export default function ProtocolBuilderPage() {
  const [form, setForm] = useState({
    gender: 'female',
    age: 55,
    skinType: 'dry',
    sensitivity: 'medium',
    concerns: ['wrinkles', 'lifting'],
    goal: 'Anti-Aging, Lifting und Hautfestigung',
    lang: 'DE',
  })

  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  function updateField(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function toggleConcern(value) {
    setForm((prev) => {
      const exists = prev.concerns.includes(value)

      return {
        ...prev,
        concerns: exists
          ? prev.concerns.filter((item) => item !== value)
          : [...prev.concerns, value],
      }
    })
  }

  async function generateProtocol() {
    setLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/professional', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error(error)
    }

    setLoading(false)
  }

  const treatment = result?.protocol?.treatment
  const decision = result?.protocol?.decision
  const variant = result?.protocol?.variant

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <a href="/" className="text-sm text-white/60 hover:text-white">
          ← FORMULENS LAB
        </a>

        <div className="mt-10 mb-10">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight">
            PROTOCOL BUILDER
          </h1>

          <p className="mt-5 max-w-3xl text-lg text-white/70">
            Professionelle Behandlungsprotokolle für Kosmetikerinnen & Institute.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-2xl font-bold mb-6">
              Kundendaten & Hautanalyse
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm text-white/60 mb-2">
                  Sprache
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

              <div>
                <label className="block text-sm text-white/60 mb-2">
                  Geschlecht
                </label>

                <select
                  value={form.gender}
                  onChange={(e) => updateField('gender', e.target.value)}
                  className="w-full rounded-xl bg-black border border-white/15 px-4 py-3"
                >
                  <option value="female">Frau</option>
                  <option value="male">Mann</option>
                  <option value="diverse">Divers</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-white/60 mb-2">
                  Alter
                </label>

                <input
                  type="number"
                  value={form.age}
                  onChange={(e) => updateField('age', e.target.value)}
                  className="w-full rounded-xl bg-black border border-white/15 px-4 py-3"
                />
              </div>

              <div>
                <label className="block text-sm text-white/60 mb-2">
                  Hauttyp
                </label>

                <select
                  value={form.skinType}
                  onChange={(e) => updateField('skinType', e.target.value)}
                  className="w-full rounded-xl bg-black border border-white/15 px-4 py-3"
                >
                  {skinTypes.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-white/60 mb-2">
                  Sensibilität
                </label>

                <select
                  value={form.sensitivity}
                  onChange={(e) => updateField('sensitivity', e.target.value)}
                  className="w-full rounded-xl bg-black border border-white/15 px-4 py-3"
                >
                  {sensitivities.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-white/60 mb-3">
                  Hauptprobleme
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {concernOptions.map((item) => {
                    const active = form.concerns.includes(item.value)

                    return (
                      <button
                        key={item.value}
                        onClick={() => toggleConcern(item.value)}
                        className={`text-left rounded-xl border px-4 py-3 ${
                          active
                            ? 'bg-fuchsia-600/30 border-fuchsia-500 text-white'
                            : 'bg-black border-white/15 text-white/70'
                        }`}
                      >
                        {item.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm text-white/60 mb-2">
                  Behandlungsziel
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
                {loading ? 'Protokoll wird erstellt...' : 'PROTOKOLL ERSTELLEN'}
              </button>
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 min-h-[500px]">
            {!treatment && (
              <div className="h-full flex flex-col justify-center text-white/50">
                <h2 className="text-2xl font-bold text-white mb-3">
                  Professional Report
                </h2>

                <p>
                  Fülle die Analyse aus und erstelle ein personalisiertes
                  Behandlungsprotokoll.
                </p>
              </div>
            )}

            {treatment && (
              <div className="space-y-6">
                <div>
                  <div className="text-sm text-fuchsia-300 font-bold mb-2">
                    PROFESSIONAL DIAGNOSIS
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
                    <h3 className="font-bold mb-3">AI Summary</h3>
                    <p className="text-white/75 leading-relaxed">
                      {result.summary}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <InfoCard label="Main line" value={decision?.mainLine} />
                  <InfoCard label="Variant" value={variant?.variantName} />
                  <InfoCard label="Course" value={treatment.course} />
                </div>

                {treatment.courseNote && (
                  <div className="rounded-2xl bg-fuchsia-600/10 border border-fuchsia-500/30 p-5 text-white/80">
                    {treatment.courseNote}
                  </div>
                )}

                {treatment.phases?.map((phase, index) => (
                  <div key={index} className="rounded-2xl bg-black border border-white/10 p-5">
                    <h3 className="text-xl font-bold mb-4">
                      {phase.title}
                    </h3>

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
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {treatment.equipment?.length > 0 && (
                  <div className="rounded-2xl bg-black border border-white/10 p-5">
                    <h3 className="text-xl font-bold mb-3">Equipment</h3>
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
                    <h3 className="text-xl font-bold mb-3">
                      Homecare Support
                    </h3>

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

function InfoCard({ label, value }) {
  return (
    <div className="rounded-2xl bg-black border border-white/10 p-4">
      <div className="text-xs text-white/40 mb-1">{label}</div>
      <div className="font-bold">{value || '—'}</div>
    </div>
  )
}
