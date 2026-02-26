"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

interface Testimonial {
  id: string
  clientName: string
  clientTitle?: string
  content: string
  rating: number
  image?: string
  featured: boolean
  order: number
  createdAt: string
}

export default function TestimonialsAdmin() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const response = await fetch("/api/admin/testimonials")
      if (response.ok) {
        const data = await response.json()
        setTestimonials(data)
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return

    try {
      const response = await fetch(`/api/admin/testimonials/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setTestimonials(testimonials.filter((t) => t.id !== id))
      }
    } catch (error) {
      console.error("Error deleting testimonial:", error)
    }
  }

  const renderStars = (rating: number) => {
    return "⭐".repeat(rating)
  }

  if (isLoading) {
    return (
      <div>
        <div className="admin-header">
          <h1 className="admin-title">Testimonials</h1>
        </div>
        <div className="card">
          <p>Loading testimonials...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Testimonials</h1>
        <Link href="/admin/testimonials/new" className="btn btn-primary">
          Add New Testimonial
        </Link>
      </div>

      <div className="card">
        {testimonials.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>💬</div>
            <h3>No testimonials yet</h3>
            <p style={{ color: "#666", marginBottom: "2rem" }}>
              Start building trust by adding client testimonials to showcase your legal expertise.
            </p>
            <Link href="/admin/testimonials/new" className="btn btn-primary">
              Add Your First Testimonial
            </Link>
          </div>
        ) : (
          <div className="table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Content</th>
                  <th>Rating</th>
                  <th>Featured</th>
                  <th>Order</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {testimonials.map((testimonial) => (
                  <tr key={testimonial.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        {testimonial.image && (
                          <img
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.clientName}
                            style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }}
                          />
                        )}
                        <div>
                          <div style={{ fontWeight: "600" }}>{testimonial.clientName}</div>
                          {testimonial.clientTitle && (
                            <div style={{ fontSize: "0.85rem", color: "#666" }}>{testimonial.clientTitle}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={{ maxWidth: "300px" }}>
                        {testimonial.content.length > 100
                          ? `${testimonial.content.substring(0, 100)}...`
                          : testimonial.content}
                      </div>
                    </td>
                    <td>{renderStars(testimonial.rating)}</td>
                    <td>
                      <span
                        style={{
                          padding: "0.25rem 0.5rem",
                          borderRadius: "4px",
                          fontSize: "0.75rem",
                          fontWeight: "600",
                          background: testimonial.featured ? "#d4edda" : "#f8f9fa",
                          color: testimonial.featured ? "#155724" : "#6c757d",
                        }}
                      >
                        {testimonial.featured ? "Featured" : "Regular"}
                      </span>
                    </td>
                    <td>{testimonial.order}</td>
                    <td>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <Link
                          href={`/admin/testimonials/edit/${testimonial.id}`}
                          className="btn btn-secondary"
                          style={{ fontSize: "0.8rem", padding: "0.25rem 0.5rem" }}
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(testimonial.id)}
                          className="btn btn-danger"
                          style={{ fontSize: "0.8rem", padding: "0.25rem 0.5rem" }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
