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
      <section className="hero">
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: "center", gap: "3rem" }}>
            <div>
              <h1>Musa & Musa Advocates</h1>
              <p>Excellence in Legal Services | Trusted Advocacy</p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "1.5rem" }}>
                <Link href="/contact" className="cta-button">
                  Schedule Consultation
                </Link>
                <Link href="/practice-areas" className="btn btn-secondary" style={{ borderColor: "white", color: "white" }}>
                  Our Practice Areas
                </Link>
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <Image
                src="/Moses.jpg"
                alt="Musa & Musa Advocates"
                width={450}
                height={450}
                style={{ borderRadius: "20px", maxWidth: "100%", height: "auto", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Firm Stats Section */}
      <section style={{ background: "#0a2540", color: "white", padding: "3rem 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem", textAlign: "center" }}>
            <div>
              <div style={{ fontSize: "3rem", fontWeight: "700", color: "#BDDDFC" }}>10+</div>
              <div style={{ fontSize: "1.1rem", opacity: 0.9 }}>Years of Experience</div>
            </div>
            <div>
              <div style={{ fontSize: "3rem", fontWeight: "700", color: "#BDDDFC" }}>500+</div>
              <div style={{ fontSize: "1.1rem", opacity: 0.9 }}>Cases Won</div>
            </div>
            <div>
              <div style={{ fontSize: "3rem", fontWeight: "700", color: "#BDDDFC" }}>200+</div>
              <div style={{ fontSize: "1.1rem", opacity: 0.9 }}>Happy Clients</div>
            </div>
            <div>
              <div style={{ fontSize: "3rem", fontWeight: "700", color: "#BDDDFC" }}>24/7</div>
              <div style={{ fontSize: "1.1rem", opacity: 0.9 }}>Legal Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: "center" }}>
            <div>
              <h2 className="section-title" style={{ textAlign: "left", marginBottom: "1.5rem" }}>
                About Musa & Musa Advocates
              </h2>
              <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem", color: "#64748b" }}>
                Musa & Musa Advocates is a premier law firm based in Nairobi, Kenya, dedicated to providing 
                exceptional legal services with integrity, professionalism, and a client-centered approach.
              </p>
              <p style={{ marginBottom: "1.5rem", color: "#64748b" }}>
                Our team of experienced advocates is committed to delivering personalized legal solutions 
                tailored to meet the unique needs of each client. Whether you need assistance with corporate law, 
                criminal defense, family law, or any other legal matter, we are here to help.
              </p>
              <ul style={{ listStyle: "none", padding: 0, marginBottom: "2rem" }}>
                {["Experienced Legal Team", "Client-Focused Approach", "Proven Track Record", "Professional Ethics"].map((item, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem", color: "#0a2540", fontWeight: 500 }}>
                    <span style={{ color: "#BDDDFC", fontSize: "1.2rem" }}>✓</span> {item}
                  </li>
                ))}
              </ul>
              <Link href="/about" className="btn btn-primary">
                Learn More About Us
              </Link>
            </div>
            <div style={{ position: "relative" }}>
              <Image
                src="/Musa.jpg"
                alt="Musa & Musa Advocates Office"
                width={450}
                height={350}
                style={{ borderRadius: "15px", width: "100%", height: "auto", boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
              />
              <div style={{ 
                position: "absolute", 
                bottom: "-20px", 
                right: "-20px", 
                background: "#BDDDFC", 
                padding: "1.5rem", 
                borderRadius: "10px",
                boxShadow: "0 10px 30px rgba(189, 221, 252, 0.4)"
              }}>
                <div style={{ fontSize: "2rem", fontWeight: "700", color: "#0a2540" }}>10+</div>
                <div style={{ fontSize: "0.9rem", color: "#0a2540" }}>Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Areas Preview */}
      <section className="section" style={{ background: "#f8fafc" }}>
        <div className="container">
          <h2 className="section-title">Practice Areas</h2>
          <p className="section-subtitle">Comprehensive legal services tailored to meet your specific needs</p>

          <div className="grid grid-3">
            {practiceAreas.map((area) => (
              <div key={area.id} className="card" style={{ textAlign: "center" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{area.icon || "⚖️"}</div>
                <h3 style={{ fontSize: "1.3rem", marginBottom: "1rem" }}>{area.title}</h3>
                <p style={{ color: "#64748b", lineHeight: "1.6" }}>{area.description}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <Link href="/practice-areas" className="btn btn-primary">
              View All Practice Areas
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Why Choose Musa & Musa Advocates?</h2>
          <p className="section-subtitle">We combine expertise with dedication to deliver exceptional legal outcomes</p>

          <div className="grid grid-3">
            <div className="card" style={{ textAlign: "center" }}>
              <div style={{ 
                width: "80px", 
                height: "80px", 
                background: "linear-gradient(135deg, #BDDDFC 0%, #8BC4F9 100%)", 
                borderRadius: "50%", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                margin: "0 auto 1.5rem",
                fontSize: "2rem"
              }}>
                🎯
              </div>
              <h3>Client-Centered Approach</h3>
              <p style={{ color: "#64748b" }}>We prioritize our clients' needs and work tirelessly to achieve the best possible outcomes for every case.</p>
            </div>
            <div className="card" style={{ textAlign: "center" }}>
              <div style={{ 
                width: "80px", 
                height: "80px", 
                background: "linear-gradient(135deg, #BDDDFC 0%, #8BC4F9 100%)", 
                borderRadius: "50%", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                margin: "0 auto 1.5rem",
                fontSize: "2rem"
              }}>
                💼
              </div>
              <h3>Experienced Advocates</h3>
              <p style={{ color: "#64748b" }}>Our team brings over 10 years of combined experience in various areas of Kenyan law.</p>
            </div>
            <div className="card" style={{ textAlign: "center" }}>
              <div style={{ 
                width: "80px", 
                height: "80px", 
                background: "linear-gradient(135deg, #BDDDFC 0%, #8BC4F9 100%)", 
                borderRadius: "50%", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                margin: "0 auto 1.5rem",
                fontSize: "2rem"
              }}>
                🏆
              </div>
              <h3>Proven Track Record</h3>
              <p style={{ color: "#64748b" }}>We have successfully handled hundreds of cases across Kenya with outstanding results.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Preview */}
      {teamMembers.length > 0 && (
        <section className="section" style={{ background: "#f8fafc" }}>
          <div className="container">
            <h2 className="section-title">Meet Our Attorneys</h2>
            <p className="section-subtitle">Our dedicated team of legal professionals is here to serve you</p>

            <div className="grid grid-3">
              {teamMembers.map((member) => (
                <div key={member.id} className="card team-card">
                  <Image
                    src={member.image || "/placeholder.svg?height=200&width=200"}
                    alt={member.name}
                    width={180}
                    height={180}
                    className="team-image"
                    style={{ width: "180px", height: "180px" }}
                  />
                  <h3>{member.name}</h3>
                  <p style={{ color: "#0a2540", fontWeight: "600", marginBottom: "1rem" }}>{member.title}</p>
                  <p style={{ fontSize: "0.95rem", lineHeight: "1.6" }}>{member.bio}</p>
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              <Link href="/team" className="btn btn-primary">
                View All Attorneys
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
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
      <section className="section">
        <div className="container">
          <div
            style={{
              background: "linear-gradient(135deg, #0a2540 0%, #1a3a5c 100%)",
              color: "white",
              padding: "4rem 2rem",
              borderRadius: "15px",
              textAlign: "center",
            }}
          >
            <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Ready to Get Started?</h2>
            <p style={{ fontSize: "1.2rem", marginBottom: "2rem", opacity: 0.9, maxWidth: "600px", margin: "0 auto 2rem" }}>
              Contact us today for a consultation and let our experienced team help you with your legal needs.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact" className="cta-button">
                Schedule Consultation
              </Link>
              <Link href="/about" className="btn btn-secondary" style={{ borderColor: "white", color: "white" }}>
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

