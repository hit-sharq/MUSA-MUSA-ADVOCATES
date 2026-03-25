import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { prisma } from "@/lib/prisma"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const member = await prisma.teamMember.findUnique({ where: { slug } })
  if (!member) return {}
  const baseUrl = "https://www.musadvocates.co.ke"
  return {
    title: `${member.name} - ${member.title} | Musa & Musa Advocates`,
    description: member.bio.substring(0, 160),
    alternates: { canonical: `${baseUrl}/team/${member.slug}` },
    openGraph: {
      title: `${member.name} - ${member.title}`,
      description: member.bio.substring(0, 160),
      url: `${baseUrl}/team/${member.slug}`,
      type: "profile",
      locale: "en_KE",
      siteName: "Musa & Musa Advocates",
      images: member.image ? [{ url: member.image, alt: member.name }] : [],
    },
    robots: { index: true, follow: true },
  }
}

export async function generateStaticParams() {
  const members = await prisma.teamMember.findMany({ select: { slug: true } })
  return members.map((m) => ({ slug: m.slug }))
}

export default async function TeamMemberPage({ params }: Props) {
  const { slug } = await params
  const member = await prisma.teamMember.findUnique({ where: { slug } })
  if (!member) notFound()

  const otherMembers = await prisma.teamMember.findMany({
    where: { slug: { not: slug } },
    orderBy: { order: "asc" },
    take: 3,
  })

  const baseUrl = "https://www.musadvocates.co.ke"
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: member.name,
    jobTitle: member.title,
    description: member.bio,
    image: member.image || undefined,
    worksFor: {
      "@type": "LegalService",
      name: "Musa & Musa Advocates",
      url: baseUrl,
    },
    url: `${baseUrl}/team/${member.slug}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div style={{ background: "linear-gradient(135deg, #0a2540 0%, #1a365d 100%)", padding: "4rem 0 3rem" }}>
        <div className="container">
          <nav style={{ marginBottom: "2rem", fontSize: "0.9rem" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Home</Link>
            <span style={{ color: "rgba(255,255,255,0.5)", margin: "0 0.5rem" }}>›</span>
            <Link href="/team" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Our Team</Link>
            <span style={{ color: "rgba(255,255,255,0.5)", margin: "0 0.5rem" }}>›</span>
            <span style={{ color: "#BDDDFC" }}>{member.name}</span>
          </nav>
        </div>
      </div>

      <div className="section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "3rem", alignItems: "start" }}>
            <div>
              <div style={{ borderRadius: "16px", overflow: "hidden", marginBottom: "1.5rem", background: "#f8fafc" }}>
                <Image
                  src={member.image || "/placeholder.svg?height=300&width=300"}
                  alt={member.name}
                  width={300}
                  height={300}
                  style={{ width: "100%", height: "auto", objectFit: "cover" }}
                />
              </div>
              <div style={{ background: "linear-gradient(135deg, #0a2540 0%, #1a365d 100%)", color: "white", padding: "1.5rem", borderRadius: "12px" }}>
                <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "white", marginBottom: "0.25rem" }}>{member.name}</h1>
                <p style={{ color: "#BDDDFC", fontWeight: 600, marginBottom: "1.5rem" }}>{member.title}</p>
                <Link href="/contact" style={{
                  display: "block",
                  background: "linear-gradient(135deg, #BDDDFC 0%, #8BC4F9 100%)",
                  color: "#0a2540",
                  padding: "0.75rem 1rem",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: 700,
                  textAlign: "center",
                  fontSize: "0.9rem",
                }}>
                  Contact {member.name.split(" ")[0]}
                </Link>
              </div>
            </div>

            <div>
              <h2 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#0a2540", marginBottom: "0.5rem" }}>{member.name}</h2>
              <p style={{ color: "#d32f2f", fontWeight: 600, fontSize: "1.1rem", marginBottom: "2rem" }}>{member.title}</p>

              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0a2540", marginBottom: "1rem" }}>About</h3>
              <div style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "#444" }}>
                {member.bio.split("\n").map((para, i) => (
                  <p key={i} style={{ marginBottom: "1.25rem" }}>{para}</p>
                ))}
              </div>

              <div style={{ marginTop: "2rem", padding: "1.5rem", background: "#f8fafc", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                <p style={{ margin: 0, color: "#444", fontSize: "0.95rem" }}>
                  <strong>Firm:</strong> Musa & Musa Advocates &nbsp;·&nbsp; <strong>Location:</strong> Nairobi, Kenya
                </p>
              </div>
            </div>
          </div>

          {otherMembers.length > 0 && (
            <div style={{ marginTop: "4rem" }}>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#0a2540", marginBottom: "2rem" }}>Meet the Rest of Our Team</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.5rem" }}>
                {otherMembers.map((m) => (
                  <Link key={m.id} href={`/team/${m.slug}`} style={{ textDecoration: "none" }}>
                    <div style={{ background: "white", borderRadius: "12px", overflow: "hidden", border: "1px solid #e2e8f0", transition: "box-shadow 0.2s" }}>
                      <Image
                        src={m.image || "/placeholder.svg?height=180&width=220"}
                        alt={m.name}
                        width={220}
                        height={180}
                        style={{ width: "100%", height: "180px", objectFit: "cover" }}
                      />
                      <div style={{ padding: "1rem" }}>
                        <p style={{ fontWeight: 700, color: "#0a2540", margin: "0 0 0.25rem" }}>{m.name}</p>
                        <p style={{ color: "#64748b", fontSize: "0.85rem", margin: 0 }}>{m.title}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
