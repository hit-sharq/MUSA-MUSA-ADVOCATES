"use client"

export default function Loading() {
  return (
    <div className="section" style={{ minHeight: "60vh", display: "flex", alignItems: "center" }}>
      <div className="container">
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "60px",
              height: "60px",
              border: "4px solid #f3f3f3",
              borderTop: "4px solid #1a365d",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 2rem",
            }}
          ></div>
          <h2 style={{ color: "#1a365d", marginBottom: "1rem" }}>Loading...</h2>
          <p style={{ color: "#666" }}>Please wait while we prepare your content.</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
