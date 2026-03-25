"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

interface Career {
  id: string
  slug: string
  title: string
  department: string
  location: string
  type: string
  description: string
  requirements: string
  published: boolean
}

export default function CareersClient() {
  const [careers, setCareers] = useState<Career[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCareers()
  }, [])

  const fetchCareers = async () => {
    try {
      const response = await fetch("/api/careers")
      const data = await response.json()
      setCareers(data)
    } catch (error) {
      console.error("Error fetching careers:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="section">
      <div className="container">
        <h1 className="section-title">Careers</h1>
        <p className="section-subtitle">
          Join our team of dedicated legal professionals. We offer opportunities for growth, 
          professional development, and the chance to work on challenging legal matters.
        </p>

        {loading ? (
          <div className="text-center" style={{ padding: "4rem" }}>
            <div className="loading" style={{ margin: "0 auto" }}></div>
            <p style={{ marginTop: "1rem", color: "#64748b" }}>Loading career opportunities...</p>
          </div>
        ) : (
          <div className="careers-grid">
            {careers.map((career) => (
              <Link key={career.id} href={`/careers/${career.slug}`} style={{ textDecoration: "none" }}>
                <article className="career-card">
                  <div className="career-card-content">
                    <h3 className="career-card-title">{career.title}</h3>
                    <div className="career-card-meta">
                      <span className="career-badge department">{career.department}</span>
                      <span className="career-badge type">{career.type}</span>
                    </div>
                    <p className="career-card-location">📍 {career.location}</p>
                    <p className="career-card-description">
                      {career.description.substring(0, 150)}...
                    </p>
                    <span className="read-more-btn">View Details</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}

        {careers.length === 0 && !loading && (
          <div className="card" style={{ textAlign: "center", padding: "4rem 2rem" }}>
            <h3>No Current Openings</h3>
            <p>
              We don't have any open positions at the moment. Please check back later or 
              submit your resume for future consideration.
            </p>
            <Link href="/contact" className="cta-button" style={{ marginTop: "1rem" }}>
              Submit Your Resume
            </Link>
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
          <h3 style={{ fontSize: "2rem", marginBottom: "1rem", color: "white" }}>Why Join Us?</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem", marginTop: "2rem" }}>
            <div>
              <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>💼</div>
              <h4 style={{ color: "white", marginBottom: "0.5rem" }}>Professional Growth</h4>
              <p style={{ opacity: 0.9, fontSize: "0.9rem" }}>Continuous learning and career advancement opportunities</p>
            </div>
            <div>
              <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>⚖️</div>
              <h4 style={{ color: "white", marginBottom: "0.5rem" }}>Challenging Work</h4>
              <p style={{ opacity: 0.9, fontSize: "0.9rem" }}>Work on diverse and intellectually stimulating legal cases</p>
            </div>
            <div>
              <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🤝</div>
              <h4 style={{ color: "white", marginBottom: "0.5rem" }}>Team Culture</h4>
              <p style={{ opacity: 0.9, fontSize: "0.9rem" }}>Collaborative and supportive work environment</p>
            </div>
          </div>
        </div>

      </div>

      <style jsx>{`
        .careers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
        }

        .career-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          cursor: pointer;
          border: 1px solid #e2e8f0;
        }

        .career-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
        }

        .career-card-content {
          padding: 1.5rem;
        }

        .career-card-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #0a2540;
          margin-bottom: 1rem;
          line-height: 1.3;
        }

        .career-card-meta {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 1rem;
        }

        .career-badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .career-badge.department {
          background: #e0f2fe;
          color: #0369a1;
        }

        .career-badge.type {
          background: #dcfce7;
          color: #15803d;
        }

        .career-card-location {
          color: #64748b;
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }

        .career-card-description {
          font-size: 0.9rem;
          line-height: 1.6;
          color: #666;
          margin-bottom: 1rem;
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

        @media (max-width: 768px) {
          .careers-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}

