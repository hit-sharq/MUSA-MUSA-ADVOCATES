"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface Testimonial {
  id: string
  clientName: string
  clientTitle?: string
  content: string
  rating: number
  image?: string
  featured: boolean
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const response = await fetch("/api/testimonials")
      if (response.ok) {
        const data = await response.json()
        setTestimonials(data.slice(0, 6)) // Show only first 6
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} style={{ color: i < rating ? "#ffd700" : "#e0e0e0" }}>
        ⭐
      </span>
    ))
  }

  if (isLoading) {
    return (
      <section className="section" style={{ background: "#f7fafc" }}>
        <div className="container">
          <h2 className="section-title">What Our Clients Say</h2>
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <p>Loading testimonials...</p>
          </div>
        </div>
      </section>
    )
  }

  if (testimonials.length === 0) {
    return null // Don't show section if no testimonials
  }

  return (
    <section className="section" style={{ background: "#f7fafc" }}>
      <div className="container">
        <h2 className="section-title">What Our Clients Say</h2>
        <p className="section-subtitle">
          Don't just take our word for it - hear from clients who have experienced our legal expertise firsthand
        </p>

        <div className="grid grid-3" style={{ gap: "2rem" }}>
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="card"
              style={{
                position: "relative",
                padding: "2rem",
                background: testimonial.featured ? "linear-gradient(135deg, #fff 0%, #f8fafc 100%)" : "white",
                border: testimonial.featured ? "2px solid #d4af37" : "1px solid #e2e8f0",
              }}
            >
              {testimonial.featured && (
                <div
                  style={{
                    position: "absolute",
                    top: "-10px",
                    right: "20px",
                    background: "#d4af37",
                    color: "white",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "12px",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                  }}
                >
                  Featured
                </div>
              )}

              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ fontSize: "3rem", color: "#d4af37", lineHeight: "1" }}>"</div>
                <p style={{ fontStyle: "italic", color: "#555", lineHeight: "1.6", margin: "0.5rem 0" }}>
                  {testimonial.content}
                </p>
                <div style={{ fontSize: "3rem", color: "#d4af37", lineHeight: "1", textAlign: "right" }}>"</div>
              </div>

              <div style={{ marginBottom: "1rem" }}>{renderStars(testimonial.rating)}</div>

              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                {testimonial.image ? (
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.clientName}
                    width={50}
                    height={50}
                    style={{ borderRadius: "50%", objectFit: "cover" }}
                  />
                ) : (
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      background: "#1a365d",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.2rem",
                      fontWeight: "600",
                    }}
                  >
                    {testimonial.clientName ? testimonial.clientName.charAt(0) : "?"}
                  </div>
                )}
                <div>
                  <div style={{ fontWeight: "600", color: "#1a365d" }}>{testimonial.clientName || "Anonymous"}</div>
                  {testimonial.clientTitle && (
                    <div style={{ fontSize: "0.9rem", color: "#666" }}>{testimonial.clientTitle}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {testimonials.length >= 6 && (
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <button
              className="btn btn-primary"
              onClick={() => {
                // Could expand to show more testimonials
                alert("More testimonials feature coming soon!")
              }}
            >
              View More Testimonials
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
