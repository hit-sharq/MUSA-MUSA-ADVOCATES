"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface PracticeArea {
  id: string
  title: string
  description: string
  icon: string | null
  order: number
}

export default function PracticeAreasPage() {
  const [practiceAreas, setPracticeAreas] = useState<PracticeArea[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedArea, setSelectedArea] = useState<PracticeArea | null>(null)

  useEffect(() => {
    fetchPracticeAreas()
  }, [])

  const fetchPracticeAreas = async () => {
    try {
      const response = await fetch("/api/practice-areas")
      const data = await response.json()
      setPracticeAreas(data)
    } catch (error) {
      console.error("Error fetching practice areas:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="section">
      <div className="container">
        <h1 className="section-title">Practice Areas</h1>
        <p className="section-subtitle">
          Comprehensive legal services tailored to meet your specific needs. With experience and a commitment
          to excellence, our dedicated team provides expert representation across various areas of law.
        </p>

        {loading ? (
          <div className="text-center" style={{ padding: "4rem" }}>
            <div className="loading" style={{ margin: "0 auto" }}></div>
            <p style={{ marginTop: "1rem", color: "#64748b" }}>Loading practice areas...</p>
          </div>
        ) : (
          <div className="practice-areas-grid">
            {practiceAreas.map((area) => (
              <article 
                key={area.id} 
                className="practice-area-card"
                onClick={() => setSelectedArea(area)}
              >
                <div className="practice-area-icon">
                  {area.icon || "⚖️"}
                </div>
                <h3 className="practice-area-title">{area.title}</h3>
                <p className="practice-area-description">{area.description}</p>
                <button 
                  className="read-more-btn"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedArea(area)
                  }}
                >
                  Read More
                </button>
              </article>
            ))}
          </div>
        )}

        {practiceAreas.length === 0 && !loading && (
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

      {/* Slide-in Panel */}
      {selectedArea && (
        <div className="slide-overlay" onClick={() => setSelectedArea(null)}>
          <div className="slide-panel" onClick={(e) => e.stopPropagation()}>
            <button 
              className="slide-close-btn"
              onClick={() => setSelectedArea(null)}
            >
              ×
            </button>
            <div className="slide-panel-icon">
              {selectedArea.icon || "⚖️"}
            </div>
            <h2 className="slide-panel-title">{selectedArea.title}</h2>
            <p className="slide-panel-description">{selectedArea.description}</p>
            <a href="/contact" className="slide-panel-cta">
              Get Consultation
            </a>
          </div>
        </div>
      )}

      <style jsx>{`
        .practice-areas-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }

        .practice-area-card {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          cursor: pointer;
          border: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .practice-area-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
        }

        .practice-area-icon {
          font-size: 3rem;
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .practice-area-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #0a2540;
          margin-bottom: 1rem;
          line-height: 1.3;
        }

        .practice-area-description {
          font-size: 0.95rem;
          line-height: 1.6;
          color: #666;
          margin-bottom: 1.5rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
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
          padding: 3rem 2rem;
          box-shadow: -4px 0 20px rgba(0, 0, 0, 0.15);
          z-index: 1001;
          overflow-y: auto;
          animation: slideInFromRight 0.4s ease;
        }

        .slide-close-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(255, 255, 255, 0.9);
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
          transition: background 0.3s ease;
        }

        .slide-close-btn:hover {
          background: white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .slide-panel-icon {
          font-size: 4rem;
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .slide-panel-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: #0a2540;
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .slide-panel-description {
          font-size: 1rem;
          line-height: 1.8;
          color: #333;
          margin-bottom: 2rem;
          text-align: center;
        }

        .slide-panel-cta {
          display: inline-block;
          background: linear-gradient(135deg, #BDDDFC 0%, #8BC4F9 100%);
          color: #0a2540;
          padding: 1rem 2rem;
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
          .practice-areas-grid {
            grid-template-columns: 1fr;
          }

          .slide-panel {
            width: 90vw;
            max-width: 90vw;
            padding: 2.5rem 1.5rem;
          }
        }
      `}</style>
    </div>
  )
}

