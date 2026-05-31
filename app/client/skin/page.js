'use client'

import { useState } from 'react'

export default function SkinAnalysisPage() {
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [lang, setLang] = useState('DE')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  function handleImageUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()

    reader.onloadend = () => {
      setImage(reader.result)
      setPreview(reader.result)
      setResult(null)
      setError(null)
    }

    reader.readAsDataURL(file)
  }

  async function analyzeSkin() {
    if (!image) {
      setError('Please upload an image first.')
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetch('/api/skin-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image, lang }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Skin analysis failed')
      }

      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const analysis = result?.analysis
  const protocol = result?.protocol

  return (
    <main className="min-h-screen bg-[#f7f4ef] px-6 py-10 text-[#1f1f1f]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.35em] text-[#9a856c]">
            FORMULENS LAB
          </p>

          <h1 className="text-4xl font-light tracking-tight md:text-6xl">
            AI Skin Analysis
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#6f6a63]">
            Cosmetic homecare analysis with personalized Summecosmetics protocol.
            This is not a medical diagnosis.
          </p>
        </div>

        <section className="grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] bg-white p-6 shadow-sm">
            <label className="mb-4 block text-sm font-medium uppercase tracking-[0.2em] text-[#9a856c]">
              Upload skin photo
            </label>

            <div className="mb-5 overflow-hidden rounded-[1.5rem] border border-[#e7ded2] bg-[#fbfaf8]">
              {preview ? (
                <img
                  src={preview}
                  alt="Skin preview"
                  className="h-[420px] w-full object-cover"
                />
              ) : (
                <div className="flex h-[420px] items-center justify-center px-6 text-center text-sm text-[#8a8176]">
                  Upload a clear face photo to start the cosmetic analysis.
                </div>
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mb-5 w-full rounded-xl border border-[#ddd2c4] bg-white p-3 text-sm"
            />

            <div className="mb-5">
              <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-[#9a856c]">
                Language
              </label>

              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="w-full rounded-xl border border-[#ddd2c4] bg-white p-3 text-sm"
              >
                <option value="DE">Deutsch</option>
                <option value="RU">Русский</option>
                <option value="EN">English</option>
              </select>
            </div>

            <button
              onClick={analyzeSkin}
              disabled={loading}
              className="w-full rounded-full bg-[#1f1f1f] px-6 py-4 text-sm uppercase tracking-[0.25em] text-white transition hover:bg-[#3a342d] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Analyzing...' : 'Analyze skin'}
            </button>

            {error && (
              <p className="mt-4 rounded-xl bg-red-50 p-4 text-sm text-red-700">
                {error}
              </p>
            )}
          </div>

          <div className="rounded-[2rem] bg-white p-6 shadow-sm">
            {!analysis ? (
              <div className="flex h-full min-h-[520px] items-center justify-center rounded-[1.5rem] border border-dashed border-[#ddd2c4] px-8 text-center text-sm leading-7 text-[#8a8176]">
                Your analysis result and personalized Summecosmetics protocol
                will appear here.
              </div>
            ) : (
              <div>
                <div className="mb-8 rounded-[1.5rem] bg-[#f7f4ef] p-6">
                  <p className="mb-2 text-xs uppercase tracking-[0.25em] text-[#9a856c]">
                    Overall Skin Score
                  </p>

                  <div className="flex items-end gap-3">
                    <span className="text-6xl font-light">
                      {analysis.overallScore}
                    </span>
                    <span className="mb-2 text-sm text-[#8a8176]">/ 100</span>
                  </div>

                  <p className="mt-5 text-sm leading-7 text-[#5f5a53]">
                    {analysis.summary}
                  </p>
                </div>

                <div className="mb-8 grid gap-4 sm:grid-cols-2">
                  <Score label="Hydration" value={analysis.hydration} />
                  <Score label="Pigmentation" value={analysis.pigmentation} />
                  <Score label="Wrinkles" value={analysis.wrinkles} />
                  <Score label="Acne / Redness" value={analysis.acne} />
                </div>

                <div className="mb-8">
                  <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[#9a856c]">
                    Top priorities
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {analysis.priorities?.map((item, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-[#f7f4ef] px-4 py-2 text-xs text-[#5f5a53]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-8 rounded-[1.5rem] border border-[#eee5da] p-5">
                  <p className="mb-2 text-xs uppercase tracking-[0.25em] text-[#9a856c]">
                    Skin type
                  </p>
                  <p className="text-sm leading-7 text-[#5f5a53]">
                    {analysis.skinType}
                  </p>
                </div>

                <div className="mb-8 rounded-[1.5rem] border border-[#eee5da] p-5">
                  <p className="mb-2 text-xs uppercase tracking-[0.25em] text-[#9a856c]">
                    Professional note
                  </p>
                  <p className="text-sm leading-7 text-[#5f5a53]">
                    {analysis.professionalNote}
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {protocol?.mainProtocol && (
          <section className="mt-10 rounded-[2rem] bg-white p-6 shadow-sm">
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#9a856c]">
              Personalized Summecosmetics Protocol
            </p>

            <h2 className="mb-2 text-3xl font-light">
              Main line: {protocol.mainLine}
            </h2>

            <p className="mb-8 text-sm text-[#6f6a63]">
              {protocol.mainProtocol.concern}
            </p>

            <div className="grid gap-6 md:grid-cols-3">
              <RoutineBlock
                title="Morning Routine"
                products={protocol.mainProtocol.morning}
              />

              <RoutineBlock
                title="Evening Routine"
                products={protocol.mainProtocol.evening}
              />

              <RoutineBlock
                title="Extra Products"
                products={protocol.mainProtocol.extra}
              />
            </div>
          </section>
        )}

        {protocol?.secondaryProtocol && (
          <section className="mt-8 rounded-[2rem] bg-[#1f1f1f] p-6 text-white shadow-sm">
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#c7b59b]">
              Secondary Support Line
            </p>

            <h2 className="mb-2 text-3xl font-light">
              {protocol.secondaryLine}
            </h2>

            <p className="mb-8 text-sm text-[#d8d0c5]">
              {protocol.secondaryProtocol.concern}
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              <RoutineBlockDark
                title="Morning Support"
                products={protocol.secondaryProtocol.morning}
              />

              <RoutineBlockDark
                title="Evening Support"
                products={protocol.secondaryProtocol.evening}
              />
            </div>
          </section>
        )}
      </div>
    </main>
  )
}

function Score({ label, value }) {
  return (
    <div className="rounded-[1.25rem] border border-[#eee5da] p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs uppercase tracking-[0.2em] text-[#9a856c]">
          {label}
        </span>
        <span className="text-sm text-[#5f5a53]">{value}/100</span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-[#eee5da]">
        <div
          className="h-full rounded-full bg-[#9a856c]"
          style={{ width: `${Math.min(Math.max(value || 0, 0), 100)}%` }}
        />
      </div>
    </div>
  )
}

function RoutineBlock({ title, products = [] }) {
  return (
    <div className="rounded-[1.5rem] border border-[#eee5da] p-5">
      <h3 className="mb-5 text-lg font-light">{title}</h3>

      {products?.length ? (
        <div className="space-y-4">
          {products.filter(Boolean).map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-[#8a8176]">
          No additional products required.
        </p>
      )}
    </div>
  )
}

function RoutineBlockDark({ title, products = [] }) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 p-5">
      <h3 className="mb-5 text-lg font-light">{title}</h3>

      {products?.length ? (
        <div className="space-y-4">
          {products.filter(Boolean).map((product, index) => (
            <ProductCardDark key={index} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-white/60">
          No additional products required.
        </p>
      )}
    </div>
  )
}

function ProductCard({ product }) {
  return (
    <div className="rounded-[1rem] bg-[#f7f4ef] p-4">
      <p className="text-sm font-medium">{product.name}</p>

      {product.line && (
        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#9a856c]">
          {product.line}
        </p>
      )}

      {product.description && (
        <p className="mt-3 text-sm leading-6 text-[#6f6a63]">
          {product.description}
        </p>
      )}
    </div>
  )
}

function ProductCardDark({ product }) {
  return (
    <div className="rounded-[1rem] bg-white/5 p-4">
      <p className="text-sm font-medium">{product.name}</p>

      {product.line && (
        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#c7b59b]">
          {product.line}
        </p>
      )}

      {product.description && (
        <p className="mt-3 text-sm leading-6 text-white/70">
          {product.description}
        </p>
      )}
    </div>
  )
}
