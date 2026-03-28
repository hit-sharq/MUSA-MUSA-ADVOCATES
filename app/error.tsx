"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="section" style={{ minHeight: "60vh", display: "flex", alignItems: "center" }}>
      <div className="container">
        <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto" }}>
          <div style={{ fontSize: "6rem", marginBottom: "1rem" }}>⚠️</div>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "#e53e3e" }}>Something Went Wrong</h1>
          <p style={{ fontSize: "1.2rem", color: "#666", marginBottom: "2rem" }}>
            We apologize for the inconvenience. An unexpected error has occurred. Our team has been notified and is
            working to resolve the issue.
          </p>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={reset} className="btn btn-primary">
              🔄 Try Again
            </button>
            <Link href="/" className="btn btn-secondary">
              🏠 Go Home
            </Link>
            <Link href="/contact" className="btn btn-secondary">
              📞 Report Issue
            </Link>
          </div>

          <div
            style={{
              marginTop: "3rem",
              padding: "2rem",
              background: "#fff5f5",
              border: "1px solid #fed7d7",
              borderRadius: "10px",
            }}
          >
            <h3 style={{ color: "#e53e3e", marginBottom: "1rem" }}>Need Immediate Legal Assistance?</h3>
            <p style={{ color: "#666", marginBottom: "1.5rem" }}>
              If you have an urgent legal matter, please contact us directly using the information below.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <a href="tel:+254758251399" className="btn btn-primary">
                📞 Call Now: +254 758 251 399
              </a>
              <a href="mailto:info@musadvocates.co.ke" className="btn btn-secondary">
                📧 Email Us
              </a>
            </div>
          </div>

          {process.env.NODE_ENV === "development" && (
            <details style={{ marginTop: "2rem", textAlign: "left" }}>
              <summary style={{ cursor: "pointer", color: "#666" }}>Error Details (Development)</summary>
              <pre
                style={{
                  background: "#f7fafc",
                  padding: "1rem",
                  borderRadius: "5px",
                  overflow: "auto",
                  fontSize: "0.8rem",
                  marginTop: "1rem",
                }}
              >
                {error.message}
                {error.stack && `\n\n${error.stack}`}
              </pre>
            </details>
          )}
        </div>
      </div>
    </div>
  )
}
