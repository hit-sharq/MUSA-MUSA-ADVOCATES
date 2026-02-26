import { prisma } from "@/lib/prisma"

async function getPracticeAreas() {
  return await prisma.practiceArea.findMany({
    orderBy: { order: "asc" },
  })
}

export default async function PracticeAreasPage() {
  const practiceAreas = await getPracticeAreas()

  return (
    <div className="section">
      <div className="container">
        <h1 className="section-title">Practice Areas</h1>
        <p className="section-subtitle">
          Comprehensive legal services tailored to meet your specific needs. With years of experience and a commitment
          to excellence, our experienced team provides expert representation across various areas of law.
        </p>

        <div className="grid grid-2" style={{ gap: "2rem" }}>
          {practiceAreas.map((area) => (
            <div key={area.id} className="card">
              <div
                style={{
                  fontSize: "3rem",
                  marginBottom: "1.5rem",
                  textAlign: "center",
                }}
              >
                {area.icon || "⚖️"}
              </div>
              <h3 style={{ textAlign: "center", marginBottom: "1.5rem" }}>{area.title}</h3>
              <p style={{ textAlign: "center", lineHeight: "1.8" }}>{area.description}</p>
            </div>
          ))}
        </div>

        {practiceAreas.length === 0 && (
          <div className="card" style={{ textAlign: "center", padding: "4rem 2rem" }}>
            <h3>Practice Areas Coming Soon</h3>
            <p>
              We are currently updating our practice areas. Please contact us directly for information about our legal
              services.
            </p>
          </div>
        )}

        <div
          style={{
            background: "linear-gradient(135deg, #0a2540 0%, #1a3a5c 100%)",
            color: "white",
            padding: "3rem 2rem",
            borderRadius: "15px",
            textAlign: "center",
            marginTop: "4rem",
          }}
        >
          <h3 style={{ color: "white", marginBottom: "1rem" }}>Don't See Your Legal Issue Listed?</h3>
          <p style={{ marginBottom: "2rem", opacity: 0.9 }}>
            We handle a wide range of legal matters beyond those listed above. Contact us to discuss your specific
            situation and how we can assist you.
          </p>
          <a href="/contact" className="cta-button">
            Contact Us Today
          </a>
        </div>
      </div>
    </div>
  )
}
