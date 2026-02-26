import Link from "next/link"

export default function NotFound() {
  return (
    <div className="section" style={{ minHeight: "60vh", display: "flex", alignItems: "center" }}>
      <div className="container">
        <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto" }}>
          <div style={{ fontSize: "8rem", fontWeight: "bold", color: "#1a365d", marginBottom: "1rem" }}>404</div>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "#1a365d" }}>Page Not Found</h1>
          <p style={{ fontSize: "1.2rem", color: "#666", marginBottom: "2rem" }}>
            Sorry, we couldn't find the page you're looking for. The page may have been moved, deleted, or the URL may
            be incorrect.
          </p>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/" className="btn btn-primary">
              🏠 Go Home
            </Link>
            <Link href="/contact" className="btn btn-secondary">
              📞 Contact Us
            </Link>
            <Link href="/practice-areas" className="btn btn-secondary">
              ⚖️ Our Services
            </Link>
          </div>

          <div style={{ marginTop: "3rem", padding: "2rem", background: "#f7fafc", borderRadius: "10px" }}>
            <h3 style={{ color: "#1a365d", marginBottom: "1rem" }}>Need Legal Help?</h3>
            <p style={{ color: "#666", marginBottom: "1.5rem" }}>
              Even if you can't find what you're looking for, we're here to help with your legal needs.
            </p>
            <Link href="/contact" className="cta-button">
              Schedule a Consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
