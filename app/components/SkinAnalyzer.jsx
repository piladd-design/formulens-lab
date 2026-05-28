'use client'

import { useState } from 'react'

const mockSkinAnalysis = {
  overall:
    'Visible cosmetic signs suggest reduced moisture retention, mild barrier sensitivity and early texture irregularity. The skin would benefit from hydration restoration, barrier support and progressive professional care.',

  metrics: [
    {
      title: 'Hydration',
      level: 'Reduced',
      summary:
        'Visible signs indicate reduced hydration retention and possible dehydration-related texture imbalance.',
    },
    {
      title: 'Barrier Condition',
      level: 'Moderate',
      summary:
        'The skin appears slightly reactive, with signs that may indicate reduced barrier resilience.',
    },
    {
      title: 'Texture & Pores',
      level: 'Moderate',
      summary:
        'Mild texture irregularities and visible pore activity can be observed, especially in central facial areas.',
    },
    {
      title: 'Pigmentation',
      level: 'Balanced',
      summary:
        'Pigmentation appears relatively controlled, with only mild uneven tone tendencies.',
    },
    {
      title: 'Sebum Balance',
      level: 'Moderate',
      summary:
        'Sebum activity appears balanced to slightly increased, especially in the T-zone.',
    },
    {
      title: 'Aging Signs',
      level: 'Early Signs',
      summary:
        'Early visible aging signs may include fine lines, fatigue and reduced skin luminosity.',
    },
    {
      title: 'Firmness & Elasticity',
      level: 'Moderate',
      summary:
        'Visible firmness indicators suggest mild loss of elasticity and reduced structural support.',
    },
  ],

  interpretation:
    'The current skin profile suggests a barrier-first approach with hydration restoration, calming support and progressive anti-aging strategy. The goal is to improve skin comfort, moisture retention, texture quality and visible firmness without overstimulating the skin.',

  strategies: [
    'Hydration restoration',
    'Barrier resilience support',
    'Texture refinement',
    'Antioxidant protection',
    'Elasticity and firmness support',
  ],

  ingredients: [
    'Hyaluronic Acid',
    'Niacinamide',
    'Ectoin',
    'Peptides',
    'Vitamin C',
    'Ceramides',
  ],

  care: [
    'Hydration-focused facial treatments',
    'Barrier-support protocols',
    'Gentle renewal instead of aggressive exfoliation',
    'Firming and antioxidant professional care',
  ],
}

export default function SkinAnalyzer() {
  const [skinImage, setSkinImage] = useState(null)
  const [skinAnalysis, setSkinAnalysis] = useState(null)

  const handleSkinImageUpload = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const imageUrl = URL.createObjectURL(file)
    setSkinImage(imageUrl)
    setSkinAnalysis(null)
  }

  const analyzeSkin = () => {
    setSkinAnalysis(mockSkinAnalysis)
  }

  return (
    <section className="max-w-6xl mx-auto mt-24 px-4">
      <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-neutral-400">
            FORMULENS LAB
          </p>

          <h2 className="mt-4 text-4xl font-light text-white">
            AI Skin Analysis
          </h2>

          <p className="mt-4 text-neutral-400 max-w-2xl mx-auto">
            Upload a face photo and receive a professional cosmetic skin intelligence report.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
            <label className="block cursor-pointer">
              <div className="flex h-72 items-center justify-center rounded-2xl border border-dashed border-white/20 bg-white/[0.03] overflow-hidden">
                {skinImage ? (
                  <img
                    src={skinImage}
                    alt="Skin preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-neutral-400">
                    Upload Skin Photo
                  </span>
                )}
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={handleSkinImageUpload}
                className="hidden"
              />
            </label>

            <button
              onClick={analyzeSkin}
              disabled={!skinImage}
              className="mt-6 w-full rounded-full bg-white px-6 py-4 text-sm font-medium text-black disabled:opacity-40"
            >
              Analyze Skin
            </button>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
            {!skinAnalysis ? (
              <div className="flex h-full min-h-72 items-center justify-center text-neutral-500 text-center">
                Upload a photo to start professional skin analysis
              </div>
            ) : (
              <div>
                <h3 className="text-2xl font-light text-white mb-4">
                  Skin Analysis Result
                </h3>

                <p className="text-neutral-300 leading-relaxed">
                  {skinAnalysis.overall}
                </p>
              </div>
            )}
          </div>
        </div>

        {skinAnalysis && (
          <>
            <div className="grid md:grid-cols-3 gap-4 mt-8">
              {skinAnalysis.metrics.map((metric) => (
                <div
                  key={metric.title}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] p-5"
                >
                  <p className="text-sm text-neutral-400 mb-2">
                    {metric.title}
                  </p>

                  <h4 className="text-xl text-white mb-3">
                    {metric.level}
                  </h4>

                  <p className="text-sm text-neutral-300 leading-relaxed">
                    {metric.summary}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <InfoBlock
                title="Professional Interpretation"
                text={skinAnalysis.interpretation}
              />

              <ListBlock
                title="Recommended Skin Strategy"
                items={skinAnalysis.strategies}
              />

              <ListBlock
                title="Ingredient Priorities"
                items={skinAnalysis.ingredients}
              />

              <ListBlock
                title="Professional Care Direction"
                items={skinAnalysis.care}
              />
            </div>

            <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6 relative overflow-hidden">
              <div className="absolute inset-0 backdrop-blur-sm bg-black/30"></div>

              <div className="relative text-center">
                <p className="text-sm uppercase tracking-[0.3em] text-neutral-400">
                  PRO
                </p>

                <h3 className="mt-3 text-2xl text-white">
                  Advanced PRO Analysis
                </h3>

                <p className="mt-3 text-neutral-400">
                  Advanced protocol logic, premium PDF and professional ecosystem recommendations.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

function InfoBlock({ title, text }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
      <h3 className="text-xl text-white mb-4">{title}</h3>
      <p className="text-neutral-300 leading-relaxed">{text}</p>
    </div>
  )
}

function ListBlock({ title, items }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
      <h3 className="text-xl text-white mb-4">{title}</h3>

      <ul className="space-y-2 text-neutral-300">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  )
}
