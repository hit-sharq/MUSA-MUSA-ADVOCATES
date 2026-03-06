"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface TeamMember {
  id: string
  name: string
  title: string
  bio: string
  image: string | null
  order: number
}

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)

  useEffect(() => {
    fetchTeamMembers()
  }, [])

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch("/api/team-members")
      const data = await response.json()
      setTeamMembers(data)
    } catch (error) {
      console.error("Error fetching team members:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="section">
      <div className="container">
        <h1 className="section-title">Our Attorneys</h1>
        <p className="section-subtitle">
          Meet the dedicated professionals who make up our legal team. Each member brings unique expertise and a shared
          commitment to providing exceptional legal representation.
        </p>

        {loading ? (
          <div className="text-center" style={{ padding: "4rem" }}>
            <div className="loading" style={{ margin: "0 auto" }}></div>
            <p style={{ marginTop: "1rem", color: "#64748b" }}>Loading team members...</p>
          </div>
        ) : (
          <div className="team-grid">
            {teamMembers.map((member) => (
              <article 
                key={member.id} 
                className="team-card"
                onClick={() => setSelectedMember(member)}
              >
                <div className="team-card-image-wrapper">
                  <Image
                    src={member.image || "/placeholder.svg?height=200&width=200"}
                    alt={member.name}
                    width={200}
                    height={200}
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="team-card-content">
                  <h3 className="team-card-name">{member.name}</h3>
                  <p className="team-card-title">{member.title}</p>
                  <p className="team-card-bio">{member.bio}</p>
                  <button 
                    className="read-more-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedMember(member)
                    }}
                  >
                    Read More
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {teamMembers.length === 0 && !loading && (
          <div className="card" style={{ textAlign: "center", padding: "4rem 2rem" }}>
            <h3>Team Information Coming Soon</h3>
            <p>
              We are currently updating our team information. Please contact us directly to learn more about our legal
              professionals.
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
          <h3 style={{ fontSize: "2rem", marginBottom: "1rem", color: "white" }}>Join Our Firm</h3>
          <p style={{ fontSize: "1.1rem", marginBottom: "2rem", opacity: "0.9" }}>
            We are always looking for talented legal professionals to join our growing firm. If you are passionate about
            the law and committed to client service, we'd love to hear from you.
          </p>
          <a href="/contact" className="cta-button">
            Contact Us About Opportunities
          </a>
        </div>
      </div>

      {/* Slide-in Panel */}
      {selectedMember && (
        <div className="slide-overlay" onClick={() => setSelectedMember(null)}>
          <div className="slide-panel" onClick={(e) => e.stopPropagation()}>
            <button 
              className="slide-close-btn"
              onClick={() => setSelectedMember(null)}
            >
              ×
            </button>
            <div className="slide-panel-image-wrapper">
              <Image
                src={selectedMember.image || "/placeholder.svg?height=250&width=250"}
                alt={selectedMember.name}
                width={250}
                height={250}
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="slide-panel-body">
              <h2 className="slide-panel-name">{selectedMember.name}</h2>
              <p className="slide-panel-title">{selectedMember.title}</p>
              <div className="slide-panel-bio">
                {selectedMember.bio.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              <a href="/contact" className="slide-panel-cta">
                Contact {selectedMember.name.split(' ')[0]}
              </a>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }

        .team-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          cursor: pointer;
          border: 1px solid #e2e8f0;
        }

        .team-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
        }

        .team-card-image-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 1;
          overflow: hidden;
          background: #f8fafc;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        .team-card-image {
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .team-card:hover .team-card-image {
          transform: scale(1.05);
        }

        .team-card-content {
          padding: 1.5rem;
          text-align: center;
        }

        .team-card-name {
          font-size: 1.25rem;
          font-weight: 700;
          color: #0a2540;
          margin-bottom: 0.5rem;
          line-height: 1.3;
        }

        .team-card-title {
          color: #BDDDFC;
          font-weight: 600;
          margin-bottom: 1rem;
          font-size: 1rem;
        }

        .team-card-bio {
          font-size: 0.9rem;
          line-height: 1.6;
          color: #666;
          margin-bottom: 1rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-align: left;
        }

        .read-more-btn {
          color: #d32f2f;
          font-weight: 600;
          font-size: 0.9rem;
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.3s ease;
          padding: 0;
        }

        .read-more-btn:hover {
          color: #b71c1c;
        }

        /* Slide-in Panel Styles */
        .slide-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          z-index: 1000;
          animation: fadeIn 0.3s ease;
        }

        .slide-panel {
          position: fixed;
          top: 0;
          right: 0;
          width: 450px;
          max-width: 90vw;
          height: 100vh;
          background: white;
          z-index: 1001;
          overflow-y: auto;
          animation: slideInFromRight 0.4s ease;
          display: flex;
          flex-direction: column;
        }

        .slide-close-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(255, 255, 255, 0.95);
          border: none;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          cursor: pointer;
          color: #666;
          z-index: 10;
          transition: all 0.3s ease;
        }

        .slide-close-btn:hover {
          background: white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        .slide-panel-image-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 1;
          max-height: 350px;
          flex-shrink: 0;
          background: #f8fafc;
        }

        .slide-panel-image {
          object-fit: cover;
        }

        .slide-panel-body {
          padding: 2rem;
          flex: 1;
          overflow-y: auto;
          text-align: center;
        }

        .slide-panel-name {
          font-size: 1.75rem;
          font-weight: 700;
          color: #0a2540;
          margin-bottom: 0.5rem;
          line-height: 1.3;
        }

        .slide-panel-title {
          color: #BDDDFC;
          font-weight: 600;
          margin-bottom: 1.5rem;
          font-size: 1.1rem;
        }

        .slide-panel-bio {
          font-size: 1rem;
          line-height: 1.8;
          color: #333;
          margin-bottom: 2rem;
          text-align: left;
        }

        .slide-panel-bio p {
          margin-bottom: 1rem;
        }

        .slide-panel-cta {
          display: inline-block;
          background: linear-gradient(135deg, #BDDDFC 0%, #8BC4F9 100%);
          color: #0a2540;
          padding: 0.875rem 1.5rem;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 700;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(189, 221, 252, 0.4);
        }

        .slide-panel-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(189, 221, 252, 0.6);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideInFromRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        @media (max-width: 768px) {
          .team-grid {
            grid-template-columns: 1fr;
          }

          .slide-panel {
            width: 90vw;
            max-width: 90vw;
          }
        }
      `}</style>
    </div>
  )
}

