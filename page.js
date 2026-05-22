"use client";

import { useState } from "react";

export default function Home() {
  const [ingredients, setIngredients] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function analyzeFormula() {
    if (!ingredients.trim()) {
      setResult("Please insert an INCI list first.");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ingredients })
      });

      const data = await response.json();
      setResult(data.result || "No result returned.");
    } catch (error) {
      setResult("Error analyzing formula.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page">
      <section className="hero">
        <div className="eyebrow">FORMULENS LAB</div>
        <h1>AI Cosmetic Formula Analyzer</h1>
        <p>
          Insert an INCI list and receive a structured cosmetic intelligence report.
        </p>
      </section>

      <section className="card">
        <label>INCI list</label>
        <textarea
          rows="10"
          placeholder="Aqua, Glycerin, Niacinamide, Panthenol..."
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />

        <button onClick={analyzeFormula} disabled={loading}>
          {loading ? "Analyzing..." : "Analyze Formula"}
        </button>
      </section>

      {result && (
        <section className="report">
          <h2>FORMULENS Report</h2>
          <div>{result}</div>
        </section>
      )}
    </main>
  );
}
