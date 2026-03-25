import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { prisma } from "@/lib/prisma"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const career = await prisma.career.findUnique({ where: { slug } })
  if (!career) return {}
  const baseUrl = "https://www.musadvocates.co.ke"
  return {
    title: `${career.title} - ${career.department} | Musa & Musa Advocates`,
    description: career.description.substring(0, 160),
    alternates: { canonical: `${baseUrl}/careers/${career.slug}` },
    openGraph: {
      title: `${career.title} at Musa & Musa Advocates`,
      description: career.description.substring(0, 160),
      url: `${baseUrl}/careers/${career.slug}`,
      type: "website",
      locale: "en_KE",
      siteName: "Musa & Musa Advocates",
    },
    robots: { index: true, follow: true },
  }
}

export async function generateStaticParams() {
  const careers = await prisma.career.findMany({ where: { published: true }, select: { slug: true } })
  return careers.map((c) => ({ slug: c.slug }))
}

export default async function CareerPage({ params }: Props) {
  const { slug } = await params
  const career = await prisma.career.findUnique({ where: { slug, published: true } })
  if (!career) notFound()

  const baseUrl = "https://www.musadvocates.co.ke"
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: career.title,
    description: career.description,
    hiringOrganization: {
      "@type": "Organization",
      name: "Musa & Musa Advocates",
      sameAs: baseUrl,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: career.location,
        addressCountry: "KE",
      },
    },
    employmentType: career.type.toUpperCase().replace("-", "_"),
    datePosted: career.createdAt.toISOString().split("T")[0],
    department: career.department,
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
            <Link href="/careers" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Careers</Link>
            <span style={{ color: "rgba(255,255,255,0.5)", margin: "0 0.5rem" }}>›</span>
            <span style={{ color: "#BDDDFC" }}>{career.title}</span>
          </nav>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1rem" }}>
            <span style={{ background: "rgba(189,221,252,0.2)", color: "#BDDDFC", padding: "0.25rem 0.75rem", borderRadius: "20px", fontSize: "0.85rem", fontWeight: 600 }}>{career.department}</span>
            <span style={{ background: "rgba(189,221,252,0.2)", color: "#BDDDFC", padding: "0.25rem 0.75rem", borderRadius: "20px", fontSize: "0.85rem", fontWeight: 600 }}>{career.type}</span>
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#fff", marginBottom: "0.75rem", lineHeight: 1.2 }}>
            {career.title}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem" }}>📍 {career.location}</p>
        </div>
      </div>

      <div className="section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "3rem", alignItems: "start" }}>
            <div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#0a2540", marginBottom: "1.25rem" }}>Job Description</h2>
              <div style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "#444", marginBottom: "2.5rem" }}>
                {career.description.split("\n").map((para, i) => (
                  <p key={i} style={{ marginBottom: "1rem" }}>{para}</p>
                ))}
              </div>

              <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#0a2540", marginBottom: "1.25rem" }}>Requirements</h2>
              <div style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "#444" }}>
                {career.requirements.split("\n").map((para, i) => (
                  <p key={i} style={{ marginBottom: "1rem" }}>{para}</p>
                ))}
              </div>
            </div>

            <div style={{ position: "sticky", top: "2rem" }}>
              <div style={{ background: "linear-gradient(135deg, #0a2540 0%, #1a365d 100%)", color: "white", padding: "2rem", borderRadius: "12px", marginBottom: "1.5rem" }}>
                <h3 style={{ color: "white", fontWeight: 700, marginBottom: "1.5rem" }}>Apply for This Role</h3>
                <div style={{ marginBottom: "1rem", fontSize: "0.9rem", color: "rgba(255,255,255,0.8)" }}>
                  <p style={{ marginBottom: "0.5rem" }}><strong style={{ color: "white" }}>Department:</strong> {career.department}</p>
                  <p style={{ marginBottom: "0.5rem" }}><strong style={{ color: "white" }}>Type:</strong> {career.type}</p>
                  <p style={{ marginBottom: "0" }}><strong style={{ color: "white" }}>Location:</strong> {career.location}</p>
                </div>
                <Link href="/contact" style={{
                  display: "block",
                  background: "linear-gradient(135deg, #BDDDFC 0%, #8BC4F9 100%)",
                  color: "#0a2540",
                  padding: "0.875rem 1rem",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: 700,
                  textAlign: "center",
                  marginTop: "1.5rem",
                }}>
                  Apply Now
                </Link>
              </div>
              <Link href="/careers" style={{ display: "block", textAlign: "center", color: "#64748b", textDecoration: "none", fontSize: "0.9rem" }}>
                ← View All Openings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
