import Link from "next/link";

export default function ClientDashboard() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#050510",
        color: "white",
        padding: "40px",
      }}
    >
      <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>
        CLIENT DASHBOARD
      </h1>

      <p style={{ color: "#aaa", marginBottom: "40px" }}>
        Домашний уход и персональные рекомендации.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
        }}
      >
        <Link href="/client/formula">
          <div className="card">🔬 Анализ формулы</div>
        </Link>

        <Link href="/client/skin">
          <div className="card">📷 Анализ кожи</div>
        </Link>

        <Link href="/client/homecare">
          <div className="card">🏠 Домашняя рутина</div>
        </Link>

        <Link href="/client/history">
          <div className="card">📊 История анализов</div>
        </Link>
      </div>

      <style jsx>{`
        .card {
          background: #0a0a22;
          border: 1px solid #222;
          border-radius: 20px;
          padding: 30px;
          text-align: center;
          cursor: pointer;
          font-size: 22px;
          transition: 0.3s;
        }

        .card:hover {
          border-color: #ff00aa;
          transform: translateY(-3px);
        }
      `}</style>
    </main>
  );
}
