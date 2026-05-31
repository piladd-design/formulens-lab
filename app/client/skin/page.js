'use client'

import { useState } from 'react'

const ui = {
  DE: {
    back: '← Home Care Dashboard',
    title: 'Hautanalyse',
    subtitle:
      'AI-Analyse für Homecare: Feuchtigkeit, Pigmentierung, Falten und Akne / Entzündungen.',
    photo: 'Foto der Haut',
    uploadHint: 'Laden Sie ein klares Gesichtsfoto hoch.',
    uploadClick: 'Klicken zum Hochladen',
    analyze: '✨ Haut analysieren',
    analyzing: 'Analyse läuft...',
    uploadFirst: 'Bitte zuerst ein Foto hochladen.',
    score: 'Hautindex Homecare',
    hydration: 'Feuchtigkeit',
    pigmentation: 'Pigmentierung',
    wrinkles: 'Falten',
    acne: 'Akne / Entzündungen',
    priorities: 'Prioritäten',
    skinType: 'Hauttyp',
    professionalNote: 'Professionelle Empfehlung',
    protocol: 'Summecosmetics Homecare-Protokoll',
    mainLine: 'Hauptlinie',
    secondaryLine: 'Unterstützende Linie',
    morning: 'Morgenroutine',
    evening: 'Abendroutine',
    extra: 'Extra-Produkte',
    noResult: 'Laden Sie ein Foto hoch und starten Sie die Analyse.',
    noExtra: 'Keine zusätzlichen Produkte erforderlich.',
  },
  RU: {
    back: '← Домашний уход',
    title: 'Анализ кожи',
    subtitle:
      'AI-диагностика для домашнего ухода: увлажнение, пигментация, морщины и акне / воспалительные элементы.',
    photo: 'Фото кожи',
    uploadHint: 'Загрузите чёткое фото лица.',
    uploadClick: 'Нажмите для загрузки фото',
    analyze: '✨ Анализировать кожу',
    analyzing: 'Анализ...',
    uploadFirst: 'Сначала загрузите фото.',
    score: 'Индекс кожи Homecare',
    hydration: 'Увлажнение',
    pigmentation: 'Пигментация',
    wrinkles: 'Морщины',
    acne: 'Акне / воспаления',
    priorities: 'Приоритеты',
    skinType: 'Тип кожи',
    professionalNote: 'Профессиональная рекомендация',
    protocol: 'Протокол Summecosmetics Homecare',
    mainLine: 'Основная линия',
    secondaryLine: 'Поддерживающая линия',
    morning: 'Утренний уход',
    evening: 'Вечерний уход',
    extra: 'Дополнительно',
    noResult: 'Загрузите фото и запустите анализ.',
    noExtra: 'Дополнительные продукты не требуются.',
  },
  EN: {
    back: '← Home Care Dashboard',
    title: 'Skin Analysis',
    subtitle:
      'AI homecare analysis: hydration, pigmentation, wrinkles and acne / inflammatory elements.',
    photo: 'Skin photo',
    uploadHint: 'Upload a clear face photo.',
    uploadClick: 'Click to upload photo',
    analyze: '✨ Analyze skin',
    analyzing: 'Analyzing...',
    uploadFirst: 'Please upload a photo first.',
    score: 'Homecare Skin Index',
    hydration: 'Hydration',
    pigmentation: 'Pigmentation',
    wrinkles: 'Wrinkles',
    acne: 'Acne / inflammation',
    priorities: 'Priorities',
    skinType: 'Skin type',
    professionalNote: 'Professional recommendation',
    protocol: 'Summecosmetics Homecare Protocol',
    mainLine: 'Main line',
    secondaryLine: 'Secondary line',
    morning: 'Morning routine',
    evening: 'Evening routine',
    extra: 'Extra products',
    noResult: 'Upload a photo and start the analysis.',
    noExtra: 'No additional products required.',
  },
}

export default function SkinAnalysisPage() {
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [fileName, setFileName] = useState('')
  const [lang, setLang] = useState('DE')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const t = ui[lang]

  function handleImageUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return

    setFileName(file.name)

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
      setError(t.uploadFirst)
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
          <h1 className="max-w-4xl text-6xl font-black tracking-tight md:text-7xl">
            {t.title}
          </h1>

          <p className="mt-8 max-w-3xl text-xl leading-9 text-white/75">
            {t.subtitle}
          </p>
        </section>

        <section className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-[#0b0b16]/90 p-8">
            <h2 className="mb-7 text-2xl font-bold">{t.photo}</h2>

            <div className="mb-7 overflow-hidden rounded-3xl bg-black">
              {preview ? (
                <img
                  src={preview}
                  alt="Skin preview"
                  className="h-[420px] w-full object-cover"
                />
              ) : (
                <div className="flex h-[420px] items-center justify-center text-center text-white/45">
                  {t.uploadHint}
                </div>
              )}
            </div>

            <label className="mb-4 flex h-28 cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-fuchsia-500/40 bg-black/30 transition hover:border-fuchsia-500 hover:bg-black/50">
              <span className="text-3xl">📷</span>
              <span className="mt-2 text-sm text-white/80">
                {t.uploadClick}
              </span>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>

            {fileName && (
              <div className="mb-6 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/70">
                {fileName}
              </div>
            )}

            <button
              onClick={analyzeSkin}
              disabled={loading}
              className="w-full rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-5 text-lg font-black transition hover:opacity-90 disabled:opacity-50"
            >
              {loading ? t.analyzing : t.analyze}
            </button>

            {error && (
              <div className="mt-5 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
                {error}
              </div>
            )}
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-[#0b0b16]/90 p-8">
            {!analysis ? (
              <div className="flex h-full min-h-[560px] items-center justify-center text-center text-xl text-white/45">
                {t.noResult}
              </div>
            ) : (
              <div>
                <div className="mb-8 flex items-center gap-7">
                  <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 text-5xl font-black">
                    {analysis.overallScore}
                  </div>

                  <div>
                    <div className="text-5xl font-black">
                      {analysis.overallScore}/100
                    </div>
                    <div className="mt-3 text-white/60">{t.score}</div>
                  </div>
                </div>

                <p className="mb-8 leading-8 text-white/70">
                  {analysis.summary}
                </p>

                <div className="space-y-4">
                  <Score label={t.hydration} value={analysis.hydration} />
                  <Score label={t.pigmentation} value={analysis.pigmentation} />
                  <Score label={t.wrinkles} value={analysis.wrinkles} />
                  <Score label={t.acne} value={analysis.acne} />
                </div>

                <div className="mt-8">
                  <h3 className="mb-4 text-sm uppercase tracking-[0.25em] text-white/50">
                    {t.priorities}
                  </h3>

                  <div className="flex flex-wrap gap-3">
                    {analysis.priorities?.map((item, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-white/10 px-4 py-2 text-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <InfoBlock title={t.skinType} text={analysis.skinType} />

                <InfoBlock
                  title={t.professionalNote}
                  text={analysis.professionalNote}
                />
              </div>
            )}
          </div>
        </section>

        {protocol?.mainProtocol && (
          <section className="mt-10 rounded-[2rem] border border-white/10 bg-[#0b0b16]/90 p-8">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-fuchsia-300">
              {t.protocol}
            </p>

            <h2 className="text-4xl font-black">
              {t.mainLine}: {protocol.mainLine}
            </h2>

            <p className="mt-4 text-white/65">
              {protocol.mainProtocol.concern}
            </p>

            <div className="mt-9 grid gap-6 lg:grid-cols-3">
              <RoutineBlock
                title={t.morning}
                products={protocol.mainProtocol.morning}
                empty={t.noExtra}
              />

              <RoutineBlock
                title={t.evening}
                products={protocol.mainProtocol.evening}
                empty={t.noExtra}
              />

              <RoutineBlock
                title={t.extra}
                products={protocol.mainProtocol.extra}
                empty={t.noExtra}
              />
            </div>
          </section>
        )}

        {protocol?.secondaryProtocol && (
          <section className="mt-8 rounded-[2rem] border border-white/10 bg-[#111111] p-8">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-fuchsia-300">
              {t.secondaryLine}
            </p>

            <h2 className="text-4xl font-black">{protocol.secondaryLine}</h2>

            <p className="mt-4 text-white/65">
              {protocol.secondaryProtocol.concern}
            </p>

            <div className="mt-9 grid gap-6 lg:grid-cols-2">
              <RoutineBlock
                title={t.morning}
                products={protocol.secondaryProtocol.morning}
                empty={t.noExtra}
              />

              <RoutineBlock
                title={t.evening}
                products={protocol.secondaryProtocol.evening}
                empty={t.noExtra}
              />
            </div>
          </section>
        )}
      </div>
    </main>
  )
}

function Score({ label, value }) {
  const safeValue = Math.min(Math.max(value || 0, 0), 100)

  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
      <div className="mb-3 flex justify-between text-sm font-bold">
        <span>{label}</span>
        <span>{safeValue}/100</span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600"
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  )
}

function InfoBlock({ title, text }) {
  if (!text) return null

  return (
    <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
      <h3 className="mb-3 text-sm uppercase tracking-[0.25em] text-white/50">
        {title}
      </h3>
      <p className="leading-7 text-white/75">{text}</p>
    </div>
  )
}

function RoutineBlock({ title, products = [], empty }) {
  const list = products.filter(Boolean)

  return (
    <div className="rounded-3xl border border-white/10 bg-black/25 p-6">
      <h3 className="mb-6 text-2xl font-bold">{title}</h3>

      {list.length ? (
        <div className="space-y-4">
          {list.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-white/50">{empty}</p>
      )}
    </div>
  )
}

function ProductCard({ product }) {
  return (
    <div className="rounded-2xl bg-white/10 p-5">
      <div className="text-sm font-black">{product.name}</div>

      {product.line && (
        <div className="mt-2 text-xs uppercase tracking-[0.25em] text-fuchsia-300">
          {product.line}
        </div>
      )}

      {product.step && (
        <div className="mt-3 text-sm text-white/55">{product.step}</div>
      )}

      {product.purpose && (
        <p className="mt-3 text-sm leading-6 text-white/70">
          {product.purpose}
        </p>
      )}
    </div>
  )
}
