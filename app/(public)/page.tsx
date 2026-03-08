import Link from "next/link"
import Image from "next/image"
import { prisma } from "@/lib/prisma"
import TestimonialsSection from "@/components/TestimonialsSection"

async function getHomeData() {
  const [practiceAreas, teamMembers, recentPosts] = await Promise.all([
    prisma.practiceArea.findMany({
      take: 6,
      orderBy: { order: "asc" },
    }),
    prisma.teamMember.findMany({
      take: 3,
      orderBy: { order: "asc" },
    }),
    prisma.blogPost.findMany({
      where: { published: true },
      take: 3,
      orderBy: { createdAt: "desc" },
    }),
  ])

  return { practiceAreas, teamMembers, recentPosts }
}

export default async function HomePage() {
  const { practiceAreas, teamMembers, recentPosts } = await getHomeData()

  return (
    <>
      {/* Hero Section */}
      <section className="hero" style={{
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
            radial-gradient(circle at 80% 20%, rgba(189, 221, 252, 0.08) 0%, transparent 50%),
            url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0 L100 50 L50 100 L0 50Z' fill='none' stroke='rgba(255,255,255,0.03)' stroke-width='1'/%3E%3C/svg%3E")
          `,
          backgroundSize: "cover, cover, 60px 60px"
        }}></div>
        
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="hero-grid">
            <div className="hero-content">
              <h1 style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)", 
                fontWeight: 700,
                color: "#ffffff",
                marginBottom: "1rem",
                lineHeight: 1.1,
                textShadow: "0 2px 20px rgba(0,0,0,0.3)"
              }}>
                MUSA & MUSA <span style={{ color: "#BDDDFC" }}>ADVOCATES</span>
              </h1>
              
              <p style={{ 
                fontSize: "1.4rem", 
                fontWeight: 600, 
                letterSpacing: "0.15em",
                color: "#BDDDFC",
                marginBottom: "2rem",
                textTransform: "uppercase"
              }}>DUTY. TRUST. PRECISION. JUSTICE</p>
              
              <p style={{ 
                fontSize: "1.1rem", 
                color: "rgba(255,255,255,0.85)",
                marginBottom: "2.5rem",
                maxWidth: "550px",
                lineHeight: 1.7
              }}>
                A premier law firm committed to delivering exceptional legal services with integrity, professionalism, and an unwavering dedication to justice.
              </p>
              
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "flex-start" }} className="hero-buttons">
                <Link href="/contact" className="cta-button" style={{
                  background: "linear-gradient(135deg, #BDDDFC 0%, #8BC4F9 100%)",
                  color: "#0a2540",
                  padding: "1rem 2rem",
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
              
              <div style={{ 
                display: "flex", 
                gap: "2rem", 
                marginTop: "3rem",
                paddingTop: "2rem",
                borderTop: "1px solid rgba(255,255,255,0.15)",
                justifyContent: "flex-start"
              }} className="hero-values">
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "1.8rem", fontWeight: 700, color: "#BDDDFC" }}>✦</div>
                  <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.7)" }}>Integrity</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "1.8rem", fontWeight: 700, color: "#BDDDFC" }}>⚖</div>
                  <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.7)" }}>Justice</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "1.8rem", fontWeight: 700, color: "#BDDDFC" }}>★</div>
                  <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.7)" }}>Excellence</div>
                </div>
              </div>
            </div>
            
            <div style={{ position: "relative" }} className="hero-image-container">
              <div style={{
                position: "absolute",
                top: "-20px",
                right: "-20px",
                width: "100%",
                height: "100%",
                background: "linear-gradient(135deg, #BDDDFC 0%, #8BC4F9 100%)",
                borderRadius: "20px",
                opacity: 0.2
              }}></div>
              <Image
                src="/favicon.ico"
                alt="Musa & Musa Advocates - Legal Excellence"
                width={500}
                height={600}
                style={{ 
                  borderRadius: "15px", 
                  width: "100%", 
                  maxWidth: "500px",
                  height: "auto", 
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.4)",
                  position: "relative",
                  zIndex: 1
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="section" style={{ background: "#ffffff" }}>
        <div className="container">
          <div className="about-grid">
            <div style={{ position: "relative" }} className="about-image-container">
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
              <div style={{
                position: "absolute",
                bottom: "30px",
                right: "-20px",
                background: "#0a2540",
                padding: "1.5rem 2rem",
                borderRadius: "10px",
                boxShadow: "0 10px 30px rgba(10, 37, 64, 0.3)",
                zIndex: 2,
                textAlign: "center"
              }} className="about-badge">
                <div style={{ fontSize: "2.5rem", fontWeight: 700, color: "#BDDDFC" }}>✦</div>
                <div style={{ fontSize: "0.9rem", color: "#ffffff", fontWeight: 500 }}>Excellence</div>
              </div>
            </div>
            
            <div className="about-content">
              <div style={{
                display: "inline-block",
                background: "rgba(189, 221, 252, 0.15)",
                color: "#0a2540",
                padding: "0.5rem 1rem",
                borderRadius: "4px",
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                marginBottom: "1rem"
              }}>
                ABOUT OUR FIRM
              </div>
              
              <h2 style={{ 
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)", 
                fontWeight: 700, 
                color: "#0a2540",
                marginBottom: "1.5rem",
                lineHeight: 1.2
              }}>
                A Tradition of <span style={{ color: "#BDDDFC" }}>Legal Excellence</span>
              </h2>
              
              <p style={{ fontSize: "1.05rem", marginBottom: "1.5rem", color: "#64748b", lineHeight: 1.8 }}>
                Musa & Musa Advocates is a premier law firm based in Nairobi, Kenya, dedicated to providing 
                exceptional legal services with integrity, professionalism, and a client-centered approach.
              </p>
              <p style={{ marginBottom: "2rem", color: "#64748b", lineHeight: 1.8 }}>
                Our team of experienced advocates is committed to delivering personalized legal solutions 
                tailored to meet the unique needs of each client. Whether you need assistance with corporate law, 
                criminal defense, family law, or any other legal matter, we are here to help.
              </p>
              
              <ul style={{ listStyle: "none", padding: 0, marginBottom: "2rem" }}>
                {[
                  { icon: "✓", text: "Experienced Legal Team" },
                  { icon: "✓", text: "Client-Focused Approach" },
                  { icon: "✓", text: "Proven Track Record" },
                  { icon: "✓", text: "Professional Ethics" }
                ].map((item, i) => (
                  <li key={i} style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: "0.75rem", 
                    marginBottom: "1rem", 
                    color: "#0a2540", 
                    fontWeight: 500 
                  }}>
                    <span style={{ 
                      color: "#ffffff", 
                      background: "#0a2540",
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.8rem"
                    }}>{item.icon}</span> 
                    {item.text}
                  </li>
                ))}
              </ul>
              
              <Link href="/about" style={{
                background: "#0a2540",
                color: "#ffffff",
                padding: "1rem 2rem",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: 600,
                display: "inline-block"
              }}>
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Areas Preview */}
      <section className="section" style={{ background: "#f8fafc" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={{
              display: "inline-block",
              background: "rgba(189, 221, 252, 0.15)",
              color: "#0a2540",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              marginBottom: "1rem"
            }}>
              OUR PRACTICE AREAS
            </div>
            <h2 style={{ 
              fontSize: "clamp(1.8rem, 3vw, 2.5rem)", 
              fontWeight: 700, 
              color: "#0a2540",
              marginBottom: "1rem"
            }}>
              Comprehensive Legal Services
            </h2>
            <p style={{ 
              fontSize: "1.05rem", 
              color: "#64748b",
              maxWidth: "600px",
              margin: "0 auto"
            }}>
              We provide expert legal representation across a wide range of practice areas
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
            {practiceAreas.map((area) => (
              <div key={area.id} style={{ 
                background: "#ffffff",
                borderRadius: "12px",
                padding: "2rem",
                boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
                transition: "all 0.3s ease",
                border: "1px solid #e2e8f0"
              }}>
                <div style={{ 
                  width: "60px", 
                  height: "60px", 
                  background: "linear-gradient(135deg, #BDDDFC 0%, #8BC4F9 100%)", 
                  borderRadius: "10px", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  marginBottom: "1.5rem",
                  fontSize: "1.75rem"
                }}>
                  {area.icon || "⚖️"}
                </div>
                <h3 style={{ fontSize: "1.25rem", marginBottom: "1rem", color: "#0a2540", fontWeight: 600 }}>{area.title}</h3>
                <p style={{ color: "#64748b", lineHeight: 1.7, fontSize: "0.95rem", marginBottom: "1rem" }}>{area.description}</p>
                <Link href="/practice-areas" style={{
                  color: "#0a2540",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}>
                  Learn More →
                </Link>
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

      {/* Why Choose Us */}
      <section className="section" style={{ background: "#ffffff" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={{
              display: "inline-block",
              background: "rgba(189, 221, 252, 0.15)",
              color: "#0a2540",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              marginBottom: "1rem"
            }}>
              WHY CHOOSE US
            </div>
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
              background: "#ffffff",
              borderRadius: "12px",
              padding: "2rem",
              boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
              border: "1px solid #e2e8f0",
              textAlign: "center"
            }}>
              <div style={{ 
                width: "70px", 
                height: "70px", 
                background: "linear-gradient(135deg, #BDDDFC 0%, #8BC4F9 100%)", 
                borderRadius: "12px", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                margin: "0 auto 1.5rem",
                fontSize: "1.75rem"
              }}>
                🎯
              </div>
              <h3 style={{ fontSize: "1.25rem", marginBottom: "1rem", color: "#0a2540", fontWeight: 600 }}>Client-Centered Approach</h3>
              <p style={{ color: "#64748b", lineHeight: 1.7 }}>We prioritize our clients' needs and work tirelessly to achieve the best possible outcomes for every case.</p>
            </div>
            <div style={{ 
              background: "#ffffff",
              borderRadius: "12px",
              padding: "2rem",
              boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
              border: "1px solid #e2e8f0",
              textAlign: "center"
            }}>
              <div style={{ 
                width: "70px", 
                height: "70px", 
                background: "linear-gradient(135deg, #BDDDFC 0%, #8BC4F9 100%)", 
                borderRadius: "12px", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                margin: "0 auto 1.5rem",
                fontSize: "1.75rem"
              }}>
                💼
              </div>
              <h3 style={{ fontSize: "1.25rem", marginBottom: "1rem", color: "#0a2540", fontWeight: 600 }}>Experienced Advocates</h3>
              <p style={{ color: "#64748b", lineHeight: 1.7 }}>Our team brings years of combined experience in various areas of Kenyan law.</p>
            </div>
            <div style={{ 
              background: "#ffffff",
              borderRadius: "12px",
              padding: "2rem",
              boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
              border: "1px solid #e2e8f0",
              textAlign: "center"
            }}>
              <div style={{ 
                width: "70px", 
                height: "70px", 
                background: "linear-gradient(135deg, #BDDDFC 0%, #8BC4F9 100%)", 
                borderRadius: "12px", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                margin: "0 auto 1.5rem",
                fontSize: "1.75rem"
              }}>
                🏆
              </div>
              <h3 style={{ fontSize: "1.25rem", marginBottom: "1rem", color: "#0a2540", fontWeight: 600 }}>Proven Track Record</h3>
              <p style={{ color: "#64748b", lineHeight: 1.7 }}>We have successfully handled numerous cases across Kenya with outstanding results.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Preview - Card Style with Events Pattern */}
      {teamMembers.length > 0 && (
        <section className="section" style={{ background: "#f8fafc" }}>
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <div style={{
                display: "inline-block",
                background: "rgba(189, 221, 252, 0.15)",
                color: "#0a2540",
                padding: "0.5rem 1rem",
                borderRadius: "4px",
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                marginBottom: "1rem"
              }}>
                OUR TEAM
              </div>
              <h2 style={{ 
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)", 
                fontWeight: 700, 
                color: "#0a2540",
                marginBottom: "1rem"
              }}>
                Meet Our Attorneys
              </h2>
              <p style={{ 
                fontSize: "1.05rem", 
                color: "#64748b",
                maxWidth: "600px",
                margin: "0 auto"
              }}>
                Our dedicated team of attorneys is ready to fight for your rights
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" }}>
              {teamMembers.map((member) => (
                <div key={member.id} style={{ 
                  background: "#ffffff",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
                  border: "1px solid #e2e8f0"
                }}>
                  <div style={{ 
                    position: "relative",
                    width: "100%",
                    height: "220px",
                    overflow: "hidden",
                    background: "#f8fafc"
                  }}>
                    <Image
                      src={member.image || "/placeholder.svg?height=200&width=200"}
                      alt={member.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div style={{ padding: "1.5rem", textAlign: "center" }}>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#0a2540", marginBottom: "0.5rem" }}>{member.name}</h3>
                    <p style={{ color: "#BDDDFC", fontWeight: 600, marginBottom: "1rem", fontSize: "1rem" }}>{member.title}</p>
                    <p style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "#666", marginBottom: "1rem", textAlign: "left", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{member.bio}</p>
                    <Link href="/team" style={{
                      color: "#0a2540",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      textDecoration: "none"
                    }}>
                      Read More →
                    </Link>
                  </div>
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
                View All Attorneys
              </Link>
            </div>
          </div>
        </section>
      )}

      <TestimonialsSection />

      {/* Recent Blog Posts */}
      {recentPosts.length > 0 && (
        <section className="section" style={{ background: "#f8fafc" }}>
          <div className="container">
            <h2 className="section-title">Latest Legal Insights</h2>
            <p className="section-subtitle">Stay informed with our latest legal insights and updates</p>

            <div className="grid grid-3">
              {recentPosts.map((post) => (
                <div key={post.id} className="card blog-card">
                  <Image
                    src={post.image || "/placeholder.svg?height=200&width=300"}
                    alt={post.title}
                    width={300}
                    height={200}
                    className="blog-image"
                  />
                  <div className="blog-meta">{new Date(post.createdAt).toLocaleDateString()}</div>
                  <h3 style={{ fontSize: "1.2rem", marginBottom: "0.75rem" }}>{post.title}</h3>
                  <p style={{ color: "#64748b", fontSize: "0.95rem" }}>{post.summary}</p>
                  <Link href={`/blog/${post.slug}`} className="btn btn-secondary" style={{ marginTop: "1rem", padding: "0.5rem 1rem", fontSize: "0.9rem" }}>
                    Read More
                  </Link>
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              <Link href="/blog" className="btn btn-primary">
                View All Posts
              </Link>
            </div>
          </div>
        </section>
      )}

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
              <Link href="/about" style={{
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
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

