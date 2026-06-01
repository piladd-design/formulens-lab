'use client'

import { useState } from 'react'

export default function ProfessionalPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  async function runTest() {
    setLoading(true)

    try {
      const response = await fetch('/api/professional', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gender: 'female',
          age: 55,
          skinType: 'dry',
          sensitivity: 'low',
          concerns: ['wrinkles', 'lifting'],
          goal: 'firming',
          lang: 'RU',
        }),
      })

      const data = await response.json()

      setResult(data)
    } catch (error) {
      console.error(error)
    }

    setLoading(false)
  }

  const protocol = result?.protocol?.treatment

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-3">
          FORMULENS PROFESSIONAL
        </h1>

        <p className="text-gray-500">
          Für Kosmetikerinnen & Institute
        </p>
      </div>

      <button
        onClick={runTest}
        className="px-6 py-3 rounded-xl bg-black text-white"
      >
        {loading ? 'Loading...' : 'Run Professional Test'}
      </button>

      {protocol && (
        <div className="mt-10 space-y-8">

          <div className="border rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-4">
              {protocol.mainLine}
            </h2>

            <p>
              <strong>Protocol:</strong>{' '}
              {protocol.protocolType}
            </p>

            <p>
              <strong>Duration:</strong>{' '}
              {protocol.duration}
            </p>

            <p>
              <strong>Course:</strong>{' '}
              {protocol.course}
            </p>
          </div>

          {result.summary && (
            <div className="border rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-4">
                Professional Summary
              </h3>

              <p>{result.summary}</p>
            </div>
          )}

          {protocol.phases?.map((phase, index) => (
            <div
              key={index}
              className="border rounded-2xl p-6"
            >
              <h3 className="text-xl font-semibold mb-5">
                {phase.title}
              </h3>

              <div className="space-y-4">
                {phase.steps?.map((step, stepIndex) => (
                  <div
                    key={stepIndex}
                    className="border rounded-xl p-4"
                  >
                    <div className="font-semibold">
                      {step.name}
                    </div>

                    <div className="text-sm text-gray-500">
                      {step.line}
                    </div>

                    {step.category && (
                      <div className="text-sm mt-1">
                        {step.category}
                      </div>
                    )}

                    {step.instruction && (
                      <div className="text-sm mt-2">
                        {step.instruction}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {protocol.equipment?.length > 0 && (
            <div className="border rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-4">
                Equipment
              </h3>

              {protocol.equipment.map((item, index) => (
                <div key={index}>
                  <strong>{item.name}</strong>

                  <div>{item.usage}</div>
                </div>
              ))}
            </div>
          )}

          {protocol.homecareSupport?.length > 0 && (
            <div className="border rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-4">
                Homecare Support
              </h3>

              <ul className="list-disc pl-6">
                {protocol.homecareSupport.map(
                  (item, index) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>
            </div>
          )}
        </div>
      )}
    </main>
  )
}
