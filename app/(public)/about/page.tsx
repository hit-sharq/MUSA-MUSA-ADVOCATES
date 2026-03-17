import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = {
title: "About Us | Musa & Musa Advocates",
  description: "Learn about Musa & Musa Advocates, a premier law firm in Nairobi, Kenya. Our mission is to provide accessible, high-quality legal services with integrity and excellence.",
  keywords: "about us, law firm, Nairobi, Kenya, legal services, advocates, Musa Musa",
  alternates: {
    canonical: "https://www.musadvocates.co.ke/about",
  },
  openGraph: {
    title: "About Us - Musa & Musa Advocates",
    description: "Learn about Musa & Musa Advocates, a premier law firm in Nairobi, Kenya.",
    url: "https://www.musadvocates.co.ke/about",
    type: "website",
    locale: "en_KE",
    siteName: "Musa & Musa Advocates",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us - Musa & Musa Advocates",
    description: "Learn about Musa & Musa Advocates, a premier law firm in Nairobi, Kenya.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

async function getAboutData() {
  const [teamMembers, practiceAreas] = await Promise.all([
    prisma.teamMember.findMany({
      orderBy: { order: "asc" },
    }),
    prisma.practiceArea.findMany({
      take: 6,
      orderBy: { order: "asc" },
    }),
  ])

  return { teamMembers, practiceAreas }
}

export default async function AboutPage() {
  const { teamMembers, practiceAreas } = await getAboutData()

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section style={{ 
        background: "linear-gradient(135deg, #0a2540 0%, #1a365d 50%, #0a2540 100%)",
        padding: "6rem 0",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(189, 221, 252, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(189, 221, 252, 0.08) 0%, transparent 50%)
          `
        }}></div>
        
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
            <span style={{
              background: "rgba(189, 221, 252, 0.15)",
              color: "#BDDDFC",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              fontSize: "0.85rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              border: "1px solid rgba(189, 221, 252, 0.3)",
              display: "inline-block",
              marginBottom: "1.5rem"
            }}>ABOUT US</span>
            <h1 style={{ 
              fontSize: "clamp(2.5rem, 5vw, 3.5rem)", 
              fontWeight: 700,
              color: "#ffffff",
              marginBottom: "1.5rem",
              lineHeight: 1.2
            }}>
              Musa & Musa Advocates
            </h1>
            <p style={{ 
              fontSize: "1.2rem", 
              color: "rgba(255,255,255,0.85)",
              marginBottom: "2rem",
              lineHeight: 1.7,
              maxWidth: "600px",
              margin: "0 auto 2rem"
            }}>
              A premier law firm committed to delivering exceptional legal services with integrity, professionalism, and an unwavering dedication to justice.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact" style={{
                background: "linear-gradient(135deg, #BDDDFC 0%, #8BC4F9 100%)",
                color: "#0a2540",
                padding: "1rem 2rem",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: "1rem",
                display: "inline-block"
              }}>
                Schedule Consultation
              </Link>
              <Link href="/practice-areas" style={{
                background: "transparent",
                color: "#ffffff",
                padding: "1rem 2rem",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "1rem",
                display: "inline-block",
                border: "2px solid rgba(255,255,255,0.5)"
              }}>
                Our Practice Areas
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Firm Overview */}
      <section className="section" style={{ background: "#ffffff" }}>
        <div className="container">
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "1fr 1fr", 
            gap: "4rem",
            alignItems: "center"
          }}>
            <div>
              <span style={{
                background: "rgba(189, 221, 252, 0.15)",
                color: "#0a2540",
                padding: "0.5rem 1rem",
                borderRadius: "4px",
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                display: "inline-block",
                marginBottom: "1rem"
              }}>WHO WE ARE</span>
              <h2 style={{ 
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)", 
                fontWeight: 700, 
                color: "#0a2540",
                marginBottom: "1.5rem",
                lineHeight: 1.2
              }}>
                Trusted Legal Counsel in Kenya
              </h2>
              <p style={{ fontSize: "1.05rem", marginBottom: "1.5rem", color: "#64748b", lineHeight: 1.8 }}>
                Musa & Musa Advocates is a distinguished law firm based in Nairobi, Kenya, 
                dedicated to providing exceptional legal services across a wide range of practice areas. 
                Our commitment to professional excellence and client satisfaction has established us 
                as a trusted legal partner for individuals, families, and businesses.
              </p>
              <p style={{ marginBottom: "2rem", color: "#64748b", lineHeight: 1.8 }}>
                We believe in building lasting relationships with our clients through transparent communication, 
                strategic thinking, and relentless advocacy. Our team works together to ensure that every client 
                receives personalized attention and the best possible legal representation.
              </p>
              
              <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "2rem", fontWeight: 700, color: "#0a2540" }}>⚖</div>
                  <div style={{ fontSize: "0.85rem", color: "#64748b" }}>Justice</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "2rem", fontWeight: 700, color: "#0a2540" }}>✦</div>
                  <div style={{ fontSize: "0.85rem", color: "#64748b" }}>Integrity</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "2rem", fontWeight: 700, color: "#0a2540" }}>★</div>
                  <div style={{ fontSize: "0.85rem", color: "#64748b" }}>Excellence</div>
                </div>
              </div>
            </div>
            
            <div style={{ position: "relative" }}>
              <div style={{
                position: "absolute",
                top: "20px",
                left: "20px",
                width: "100%",
                height: "100%",
                background: "linear-gradient(135deg, #BDDDFC 0%, #8BC4F9 100%)",
                borderRadius: "15px",
                opacity: 0.3
              }}></div>
              <Image
                src="/Musa.jpg"
                alt="Musa & Musa Advocates Office"
                width={500}
                height={400}
                style={{ 
                  borderRadius: "15px", 
                  width: "100%", 
                  height: "auto", 
                  boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                  position: "relative",
                  zIndex: 1
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section" style={{ background: "#f8fafc" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}>
            <div style={{ 
              background: "#ffffff",
              borderRadius: "12px",
              padding: "3rem 2rem",
              boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
              border: "1px solid #e2e8f0",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>🎯</div>
              <h3 style={{ color: "#0a2540", marginBottom: "1.5rem", fontSize: "1.5rem", fontWeight: 700 }}>Our Mission</h3>
              <p style={{ color: "#64748b", lineHeight: "1.8" }}>
                To provide accessible, high-quality legal services that protect our clients' interests 
                while upholding the highest standards of professional ethics and integrity. We strive 
                to be the legal partner our clients can trust, delivering personalized solutions that 
                meet their unique needs.
              </p>
            </div>
            <div style={{ 
              background: "#ffffff",
              borderRadius: "12px",
              padding: "3rem 2rem",
              boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
              border: "1px solid #e2e8f0",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>👁️</div>
              <h3 style={{ color: "#0a2540", marginBottom: "1.5rem", fontSize: "1.5rem", fontWeight: 700 }}>Our Vision</h3>
              <p style={{ color: "#64748b", lineHeight: "1.8" }}>
                To be recognized as one of Kenya's trusted law firms, known for excellence in legal 
                practice, commitment to justice, and unwavering dedication to our clients' success. 
                We aim to set the standard for professional legal services in East Africa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section" style={{ background: "#ffffff" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span style={{
              background: "rgba(189, 221, 252, 0.15)",
              color: "#0a2540",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              display: "inline-block",
              marginBottom: "1rem"
            }}>OUR VALUES</span>
            <h2 style={{ 
              fontSize: "clamp(1.8rem, 3vw, 2.5rem)", 
              fontWeight: 700, 
              color: "#0a2540",
              marginBottom: "1rem"
            }}>
              Principles That Guide Us
            </h2>
            <p style={{ 
              fontSize: "1.05rem", 
              color: "#64748b",
              maxWidth: "600px",
              margin: "0 auto"
            }}>
              The principles that guide everything we do
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
            <div style={{ textAlign: "center", padding: "2rem" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>⚖️</div>
              <h4 style={{ color: "#0a2540", marginBottom: "0.75rem", fontWeight: 600 }}>Integrity</h4>
              <p style={{ color: "#64748b", fontSize: "0.95rem" }}>We uphold the highest ethical standards in all our dealings</p>
            </div>
            <div style={{ textAlign: "center", padding: "2rem" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>💪</div>
              <h4 style={{ color: "#0a2540", marginBottom: "0.75rem", fontWeight: 600 }}>Dedication</h4>
              <p style={{ color: "#64748b", fontSize: "0.95rem" }}>We are committed to achieving the best outcomes for our clients</p>
            </div>
            <div style={{ textAlign: "center", padding: "2rem" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🎓</div>
              <h4 style={{ color: "#0a2540", marginBottom: "0.75rem", fontWeight: 600 }}>Excellence</h4>
              <p style={{ color: "#64748b", fontSize: "0.95rem" }}>We pursue excellence in every aspect of our legal practice</p>
            </div>
            <div style={{ textAlign: "center", padding: "2rem" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🤝</div>
              <h4 style={{ color: "#0a2540", marginBottom: "0.75rem", fontWeight: 600 }}>Client Focus</h4>
              <p style={{ color: "#64748b", fontSize: "0.95rem" }}>Our clients' needs are at the heart of everything we do</p>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Areas Overview */}
      <section className="section" style={{ background: "#f8fafc" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span style={{
              background: "rgba(189, 221, 252, 0.15)",
              color: "#0a2540",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              display: "inline-block",
              marginBottom: "1rem"
            }}>WHAT WE DO</span>
            <h2 style={{ 
              fontSize: "clamp(1.8rem, 3vw, 2.5rem)", 
              fontWeight: 700, 
              color: "#0a2540",
              marginBottom: "1rem"
            }}>
              Our Practice Areas
            </h2>
            <p style={{ 
              fontSize: "1.05rem", 
              color: "#64748b",
              maxWidth: "600px",
              margin: "0 auto 2rem"
            }}>
              We provide comprehensive legal services across various areas of law
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {practiceAreas.slice(0, 6).map((area) => (
              <div key={area.id} style={{ 
                background: "#ffffff",
                borderRadius: "12px",
                padding: "2rem",
                boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
                border: "1px solid #e2e8f0"
              }}>
                <div style={{ 
                  width: "50px", 
                  height: "50px", 
                  background: "linear-gradient(135deg, #BDDDFC 0%, #8BC4F9 100%)", 
                  borderRadius: "10px", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  marginBottom: "1rem",
                  fontSize: "1.5rem"
                }}>
                  {area.icon || "⚖️"}
                </div>
                <h3 style={{ fontSize: "1.1rem", marginBottom: "0.75rem", color: "#0a2540", fontWeight: 600 }}>{area.title}</h3>
                <p style={{ color: "#64748b", lineHeight: 1.6, fontSize: "0.9rem" }}>{area.description}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <Link href="/practice-areas" style={{
              background: "#0a2540",
              color: "#ffffff",
              padding: "1rem 2rem",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: 600,
              display: "inline-block"
            }}>
              View All Practice Areas
            </Link>
          </div>
        </div>
      </section>

      {/* Professional Memberships */}
      <section className="section" style={{ background: "#ffffff" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span style={{
              background: "rgba(189, 221, 252, 0.15)",
              color: "#0a2540",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              display: "inline-block",
              marginBottom: "1rem"
            }}>PROFESSIONAL AFFILIATIONS</span>
            <h2 style={{ 
              fontSize: "clamp(1.8rem, 3vw, 2.5rem)", 
              fontWeight: 700, 
              color: "#0a2540",
              marginBottom: "1rem"
            }}>
              Professional Memberships
            </h2>
          </div>

          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "2rem" }}>
            {[
              "Law Society of Kenya",
              "Kenya Association of Criminal Lawyers",
              "International Bar Association",
              "East Africa Law Society"
            ].map((membership, i) => (
              <div key={i} style={{ 
                background: "#f8fafc",
                borderRadius: "8px",
                padding: "1.5rem 2rem",
                border: "1px solid #e2e8f0",
                textAlign: "center",
                minWidth: "200px"
              }}>
                <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>🏛️</div>
                <p style={{ color: "#0a2540", fontWeight: 500, fontSize: "0.95rem" }}>{membership}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      {teamMembers.length > 0 && (
        <section className="section" style={{ background: "#f8fafc" }}>
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <span style={{
                background: "rgba(189, 221, 252, 0.15)",
                color: "#0a2540",
                padding: "0.5rem 1rem",
                borderRadius: "4px",
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                display: "inline-block",
                marginBottom: "1rem"
              }}>OUR TEAM</span>
              <h2 style={{ 
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)", 
                fontWeight: 700, 
                color: "#0a2540",
                marginBottom: "1rem"
              }}>
                Meet Our Legal Team
              </h2>
              <p style={{ 
                fontSize: "1.05rem", 
                color: "#64748b",
                maxWidth: "600px",
                margin: "0 auto"
              }}>
                Our dedicated team of legal professionals is committed to your success
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
              {teamMembers.map((member) => (
                <div key={member.id} style={{ 
                  background: "#ffffff",
                  borderRadius: "12px",
                  padding: "2rem",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
                  border: "1px solid #e2e8f0",
                  textAlign: "center"
                }}>
                  <Image
                    src={member.image || "/placeholder.svg?height=150&width=150"}
                    alt={member.name}
                    width={120}
                    height={120}
                    style={{ 
                      borderRadius: "50%", 
                      width: "120px", 
                      height: "120px",
                      objectFit: "cover",
                      marginBottom: "1.5rem"
                    }}
                  />
                  <h3 style={{ color: "#0a2540", marginBottom: "0.5rem", fontWeight: 600 }}>{member.name}</h3>
                  <p style={{ color: "#BDDDFC", fontWeight: 600, marginBottom: "1rem", fontSize: "0.9rem" }}>{member.title}</p>
                  <p style={{ color: "#64748b", fontSize: "0.9rem", lineHeight: 1.6 }}>{member.bio}</p>
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              <Link href="/team" style={{
                background: "#0a2540",
                color: "#ffffff",
                padding: "1rem 2rem",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: 600,
                display: "inline-block"
              }}>
                View Full Team
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="section" style={{ background: "#ffffff" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span style={{
              background: "rgba(189, 221, 252, 0.15)",
              color: "#0a2540",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              display: "inline-block",
              marginBottom: "1rem"
            }}>WHY CHOOSE US</span>
            <h2 style={{ 
              fontSize: "clamp(1.8rem, 3vw, 2.5rem)", 
              fontWeight: 700, 
              color: "#0a2540",
              marginBottom: "1rem"
            }}>
              Excellence in Legal Representation
            </h2>
            <p style={{ 
              fontSize: "1.05rem", 
              color: "#64748b",
              maxWidth: "600px",
              margin: "0 auto"
            }}>
              We combine expertise with dedication to deliver exceptional legal outcomes
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
            <div style={{ 
              background: "#f8fafc",
              borderRadius: "12px",
              padding: "2rem",
              border: "1px solid #e2e8f0"
            }}>
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🎯</div>
              <h3 style={{ color: "#0a2540", marginBottom: "1rem", fontWeight: 600 }}>Client-Centered Approach</h3>
              <p style={{ color: "#64748b", lineHeight: 1.7 }}>We prioritize our clients' needs and work tirelessly to achieve the best possible outcomes for every case.</p>
            </div>
            <div style={{ 
              background: "#f8fafc",
              borderRadius: "12px",
              padding: "2rem",
              border: "1px solid #e2e8f0"
            }}>
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>💼</div>
              <h3 style={{ color: "#0a2540", marginBottom: "1rem", fontWeight: 600 }}>Experienced Advocates</h3>
              <p style={{ color: "#64748b", lineHeight: 1.7 }}>Our team brings combined experience in various areas of Kenyan law.</p>
            </div>
            <div style={{ 
              background: "#f8fafc",
              borderRadius: "12px",
              padding: "2rem",
              border: "1px solid #e2e8f0"
            }}>
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🏆</div>
              <h3 style={{ color: "#0a2540", marginBottom: "1rem", fontWeight: 600 }}>Proven Track Record</h3>
              <p style={{ color: "#64748b", lineHeight: 1.7 }}>We have successfully handled numerous cases across Kenya with outstanding results.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ 
        background: "linear-gradient(135deg, #0a2540 0%, #1a365d 50%, #0a2540 100%)", 
        padding: "5rem 0",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(circle at 10% 90%, rgba(189, 221, 252, 0.15) 0%, transparent 40%),
            radial-gradient(circle at 90% 10%, rgba(189, 221, 252, 0.1) 0%, transparent 40%)
          `
        }}></div>
        
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto" }}>
            <h2 style={{ 
              fontSize: "clamp(2rem, 4vw, 2.75rem)", 
              fontWeight: 700, 
              color: "#ffffff",
              marginBottom: "1.5rem"
            }}>
              Ready to Discuss Your Legal Matters?
            </h2>
            <p style={{ 
              fontSize: "1.15rem", 
              color: "rgba(255,255,255,0.85)",
              marginBottom: "2.5rem",
              lineHeight: 1.7
            }}>
              Contact us today for a consultation and let our experienced team help you achieve the best possible outcome for your case.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact" style={{
                background: "linear-gradient(135deg, #BDDDFC 0%, #8BC4F9 100%)",
                color: "#0a2540",
                padding: "1rem 2.5rem",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: "1rem",
                display: "inline-block",
                boxShadow: "0 4px 15px rgba(189, 221, 252, 0.3)"
              }}>
                Schedule Consultation
              </Link>
              <Link href="/practice-areas" style={{
                background: "transparent",
                color: "#ffffff",
                padding: "1rem 2.5rem",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "1rem",
                display: "inline-block",
                border: "2px solid rgba(255,255,255,0.5)"
              }}>
                Our Practice Areas
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

