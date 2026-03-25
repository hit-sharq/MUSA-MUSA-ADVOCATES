import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { prisma } from "@/lib/prisma"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const area = await prisma.practiceArea.findUnique({ where: { slug } })
  if (!area) return {}
  const baseUrl = "https://www.musadvocates.co.ke"
  return {
    title: `${area.title} | Musa & Musa Advocates`,
    description: area.description.substring(0, 160),
    alternates: { canonical: `${baseUrl}/practice-areas/${area.slug}` },
    openGraph: {
      title: `${area.title} - Musa & Musa Advocates`,
      description: area.description.substring(0, 160),
      url: `${baseUrl}/practice-areas/${area.slug}`,
      type: "website",
      locale: "en_KE",
      siteName: "Musa & Musa Advocates",
    },
    robots: { index: true, follow: true },
  }
}

export async function generateStaticParams() {
  const areas = await prisma.practiceArea.findMany({ select: { slug: true } })
  return areas.map((a) => ({ slug: a.slug }))
}

export default async function PracticeAreaPage({ params }: Props) {
  const { slug } = await params
  const area = await prisma.practiceArea.findUnique({ where: { slug } })
  if (!area) notFound()

  const allAreas = await prisma.practiceArea.findMany({
    where: { slug: { not: slug } },
    orderBy: { order: "asc" },
    take: 5,
  })

  const baseUrl = "https://www.musadvocates.co.ke"
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: area.title,
    description: area.description,
    provider: {
      "@type": "LegalService",
      name: "Musa & Musa Advocates",
      url: baseUrl,
    },
    url: `${baseUrl}/practice-areas/${area.slug}`,
    areaServed: { "@type": "Country", name: "Kenya" },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div style={{ background: "linear-gradient(135deg, #0a2540 0%, #1a365d 100%)", padding: "4rem 0 3rem" }}>
        <div className="container">
          <nav style={{ marginBottom: "1.5rem", fontSize: "0.9rem" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Home</Link>
            <span style={{ color: "rgba(255,255,255,0.5)", margin: "0 0.5rem" }}>›</span>
            <Link href="/practice-areas" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Practice Areas</Link>
            <span style={{ color: "rgba(255,255,255,0.5)", margin: "0 0.5rem" }}>›</span>
            <span style={{ color: "#BDDDFC" }}>{area.title}</span>
          </nav>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>{area.icon || "⚖️"}</div>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#fff", marginBottom: "1rem", lineHeight: 1.2 }}>
            {area.title}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.1rem", maxWidth: "600px" }}>
            Expert legal representation in {area.title.toLowerCase()} across Kenya.
          </p>
        </div>
      </div>

      <div className="section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "3rem", alignItems: "start" }}>
            <div>
              <h2 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#0a2540", marginBottom: "1.5rem" }}>
                About Our {area.title} Practice
              </h2>
              <div style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "#444" }}>
                {area.description.split("\n").map((para, i) => (
                  <p key={i} style={{ marginBottom: "1.25rem" }}>{para}</p>
                ))}
              </div>

              <div style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                padding: "2rem",
                marginTop: "2.5rem",
              }}>
                <h3 style={{ color: "#0a2540", fontWeight: 700, marginBottom: "1rem" }}>Why Choose Musa & Musa?</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {["Experienced attorneys with deep knowledge of Kenyan law", "Personalised approach to every client and case", "Transparent communication throughout the process", "Proven track record across Kenya's courts"].map((point) => (
                    <li key={point} style={{ display: "flex", gap: "0.75rem", marginBottom: "0.75rem", color: "#444", fontSize: "0.95rem" }}>
                      <span style={{ color: "#d32f2f", fontWeight: 700, flexShrink: 0 }}>✓</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div style={{ position: "sticky", top: "2rem" }}>
              <div style={{
                background: "linear-gradient(135deg, #0a2540 0%, #1a365d 100%)",
                color: "white",
                padding: "2rem",
                borderRadius: "12px",
                marginBottom: "1.5rem",
              }}>
                <h3 style={{ color: "white", fontWeight: 700, marginBottom: "1rem" }}>Get Legal Help Today</h3>
                <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.95rem", marginBottom: "1.5rem", lineHeight: 1.6 }}>
                  Schedule a consultation with our {area.title.toLowerCase()} specialists.
                </p>
                <Link href="/contact" style={{
                  display: "block",
                  background: "linear-gradient(135deg, #BDDDFC 0%, #8BC4F9 100%)",
                  color: "#0a2540",
                  padding: "0.875rem 1.5rem",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: 700,
                  textAlign: "center",
                }}>
                  Book Consultation
                </Link>
              </div>

              {allAreas.length > 0 && (
                <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "1.5rem" }}>
                  <h4 style={{ color: "#0a2540", fontWeight: 700, marginBottom: "1rem", fontSize: "1rem" }}>Other Practice Areas</h4>
                  {allAreas.map((a) => (
                    <Link key={a.id} href={`/practice-areas/${a.slug}`} style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.6rem 0",
                      color: "#444",
                      textDecoration: "none",
                      borderBottom: "1px solid #f1f5f9",
                      fontSize: "0.9rem",
                    }}>
                      <span>{a.icon || "⚖️"}</span>
                      {a.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div style={{ background: "linear-gradient(135deg, #0a2540 0%, #1a3a5c 100%)", color: "white", padding: "3rem 0", textAlign: "center" }}>
        <div className="container">
          <h2 style={{ color: "white", fontWeight: 700, marginBottom: "1rem" }}>Ready to Get Started?</h2>
          <p style={{ color: "rgba(255,255,255,0.85)", marginBottom: "2rem" }}>
            Contact us today and let our {area.title.toLowerCase()} team help you.
          </p>
          <Link href="/contact" className="cta-button">Schedule a Free Consultation</Link>
        </div>
      </div>
    </>
  )
}
