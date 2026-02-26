import Image from "next/image"
import { prisma } from "@/lib/prisma"

async function getAboutData() {
  // Get team members
  const teamMembers = await prisma.teamMember.findMany({
    orderBy: { order: "asc" },
  })

  return { teamMembers }
}

export default async function AboutPage() {
  const { teamMembers } = await getAboutData()

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <div className="about-hero-text">
              <h1>About Musa & Musa Advocates</h1>
              <p className="about-hero-subtitle">Advocates & Legal Consultants</p>
              <p className="about-hero-description">
                Dedicated to providing exceptional legal services with integrity, expertise, 
                and a client-centered approach. Your trusted partners in justice.
              </p>
            </div>
            <div className="about-hero-image">
              <Image
                src="/Moses.jpg"
                alt="Musa & Musa Advocates"
                width={400}
                height={400}
                className="hero-profile-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="about-intro section">
        <div className="container">
          <div className="intro-content">
            <h2>A Legacy of Legal Excellence</h2>
            <div className="intro-text">
              <p>
                Musa & Musa Advocates is a distinguished law firm based in Nairobi, Kenya, 
                with a reputation for delivering exceptional legal services across a wide 
                range of practice areas. Our commitment to professional excellence and 
                client satisfaction has established us as one of the most trusted law firms in the region.
              </p>
              <p>
                Founded on the principles of integrity, dedication, and professionalism, our firm 
                has grown to become a leading provider of legal solutions for individuals, 
                families, and businesses. We pride ourselves on our ability to handle complex 
                legal matters with skill and precision while maintaining a personal touch that 
                our clients appreciate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2" style={{ gap: "3rem" }}>
            <div className="card" style={{ textAlign: "center", padding: "3rem 2rem" }}>
              <div style={{ fontSize: "4rem", marginBottom: "1.5rem" }}>🎯</div>
              <h3 style={{ color: "#0a2540", marginBottom: "1.5rem" }}>Our Mission</h3>
              <p style={{ color: "#64748b", lineHeight: "1.8" }}>
                To provide accessible, high-quality legal services that protect our clients' interests 
                while upholding the highest standards of professional ethics and integrity. We strive 
                to be the legal partner our clients can trust, delivering personalized solutions that 
                meet their unique needs.
              </p>
            </div>
            <div className="card" style={{ textAlign: "center", padding: "3rem 2rem" }}>
              <div style={{ fontSize: "4rem", marginBottom: "1.5rem" }}>👁️</div>
              <h3 style={{ color: "#0a2540", marginBottom: "1.5rem" }}>Our Vision</h3>
              <p style={{ color: "#64748b", lineHeight: "1.8" }}>
                To be recognized as one of Kenya's premier law firms, known for excellence in legal 
                practice, commitment to justice, and unwavering dedication to our clients' success. 
                We aim to set the standard for professional legal services in East Africa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section" style={{ background: "#f8fafc" }}>
        <div className="container">
          <h2 className="section-title">Our Core Values</h2>
          <p className="section-subtitle">The principles that guide everything we do</p>
          
          <div className="grid grid-4">
            <div className="card" style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>⚖️</div>
              <h4 style={{ color: "#0a2540", marginBottom: "0.75rem" }}>Integrity</h4>
              <p style={{ color: "#64748b", fontSize: "0.95rem" }}>We uphold the highest ethical standards in all our dealings</p>
            </div>
            <div className="card" style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>💪</div>
              <h4 style={{ color: "#0a2540", marginBottom: "0.75rem" }}>Dedication</h4>
              <p style={{ color: "#64748b", fontSize: "0.95rem" }}>We are committed to achieving the best outcomes for our clients</p>
            </div>
            <div className="card" style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🎓</div>
              <h4 style={{ color: "#0a2540", marginBottom: "0.75rem" }}>Excellence</h4>
              <p style={{ color: "#64748b", fontSize: "0.95rem" }}>We pursue excellence in every aspect of our legal practice</p>
            </div>
            <div className="card" style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🤝</div>
              <h4 style={{ color: "#0a2540", marginBottom: "0.75rem" }}>Client Focus</h4>
              <p style={{ color: "#64748b", fontSize: "0.95rem" }}>Our clients' needs are at the heart of everything we do</p>
            </div>
          </div>
        </div>
      </section>

      {/* Education & Experience Section */}
      <section className="about-credentials section">
        <div className="container">
          <h2>Our Qualifications & Experience</h2>
          <div className="credentials-grid">
            <div className="credential-card">
              <div className="credential-icon">🎓</div>
              <h3>Education & Qualifications</h3>
              <div className="credential-list">
                <div className="credential-item">
                  <h4>Bachelor of Laws (LLB)</h4>
                  <p>University of Nazarene, 2019</p>
                </div>
                <div className="credential-item">
                  <h4>Post Graduate in Legal Practice</h4>
                  <p>Kenya School of Law</p>
                </div>
                <div className="credential-item">
                  <h4>Law Intern (CPS)</h4>
                  <p>Makadara Law Courts</p>
                </div>
                <div className="credential-item">
                  <h4>Advocates Training</h4>
                  <p>Law Society of Kenya</p>
                </div>
              </div>
            </div>

            <div className="credential-card">
              <div className="credential-icon">⚖️</div>
              <h3>Professional Experience</h3>
              <div className="experience-timeline">
                <div className="experience-item">
                  <h4>Pupil</h4>
                  <p className="experience-company">F.M Muteti & Company Advocates</p>
                  <div className="experience-details">
                    <p>• Drafting Pleadings and Legal Documents</p>
                    <p>• Land and Commercial Agreements</p>
                    <p>• Legal Research and Advocacy</p>
                    <p>• Constitutional and Regulatory Issues</p>
                  </div>
                </div>
                <div className="experience-item">
                  <h4>Legal Intern</h4>
                  <p className="experience-company">Morris Maina & Company Advocates</p>
                  <div className="experience-details">
                    <p>• Contract Drafting and Review</p>
                    <p>• Legal Research and Correspondence</p>
                    <p>• Regulatory Advocacy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Areas of Expertise Section */}
      <section className="about-expertise section">
        <div className="container">
          <h2>Areas of Expertise</h2>
          <div className="expertise-grid">
            <div className="expertise-card">
              <div className="expertise-icon">⚖️</div>
              <h3>Criminal Law</h3>
              <ul>
                <li>Criminal Defense</li>
                <li>White Collar Crime</li>
                <li>Appeals</li>
                <li>Bail Applications</li>
              </ul>
            </div>
            <div className="expertise-card">
              <div className="expertise-icon">👨‍👩‍👧‍👦</div>
              <h3>Family Law</h3>
              <ul>
                <li>Divorce Proceedings</li>
                <li>Child Custody</li>
                <li>Matrimonial Property</li>
                <li>Adoption</li>
              </ul>
            </div>
            <div className="expertise-card">
              <div className="expertise-icon">🏢</div>
              <h3>Corporate Law</h3>
              <ul>
                <li>Business Formation</li>
                <li>Contract Law</li>
                <li>Employment Law</li>
                <li>Compliance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Memberships & Recognition Section */}
      <section className="about-memberships section">
        <div className="container">
          <h2>Professional Memberships & Recognition</h2>
          <div className="memberships-grid">
            <div className="membership-card">
              <div className="membership-icon">🏛️</div>
              <h3>Professional Memberships</h3>
              <ul>
                <li>Law Society of Kenya</li>
                <li>Kenya Association of Criminal Lawyers</li>
                <li>International Bar Association</li>
                <li>East Africa Law Society</li>
              </ul>
            </div>
            <div className="membership-card">
              <div className="membership-icon">🏆</div>
              <h3>Awards & Recognition</h3>
              <ul>
                <li>Outstanding Legal Firm Award 2022</li>
                <li>Pro Bono Service Recognition 2021</li>
                <li>Client Choice Award 2020</li>
                <li>Rising Star in Law 2018</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-team section">
        <div className="container">
          <h2>Our Attorneys</h2>
          <p className="section-subtitle">Meet the dedicated professionals committed to your legal success</p>

          <div className="team-grid">
            {teamMembers.map((member) => (
              <div key={member.id} className="team-member-card">
                <div className="team-member-image">
                  <Image
                    src={member.image || "/placeholder.svg?height=100&width=100"}
                    alt={member.name}
                    width={100}
                    height={100}
                    className="member-photo"
                  />
                </div>
                <div className="team-member-info">
                  <h3>{member.name}</h3>
                  <p className="member-title">{member.title}</p>
                  <p className="member-bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="about-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Work With Us?</h2>
            <p>
              Contact us today to discuss your legal needs and how our experienced 
              team can help you achieve the best possible outcome for your case.
            </p>
            <a href="/contact" className="cta-button">
              Schedule a Consultation
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

