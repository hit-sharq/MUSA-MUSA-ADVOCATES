"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
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
}

export default function EditTestimonial({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [testimonial, setTestimonial] = useState<Testimonial | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [formData, setFormData] = useState({
    clientName: "",
    clientTitle: "",
    content: "",
    rating: 5,
    image: "",
    featured: false,
    order: 0,
  })

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params
      fetchTestimonial(resolvedParams.id)
    }
    getParams()
  }, [params])

  const fetchTestimonial = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/testimonials/${id}`)
      if (response.ok) {
        const data = await response.json()
        setTestimonial(data)
        setFormData({
          clientName: data.clientName || "",
          clientTitle: data.clientTitle || "",
          content: data.content || "",
          rating: data.rating || 5,
          image: data.image || "",
          featured: data.featured || false,
          order: data.order || 0,
        })
      } else {
        alert("Testimonial not found")
        router.push("/admin/testimonials")
      }
    } catch (error) {
      console.error("Error fetching testimonial:", error)
      alert("Error loading testimonial")
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    const uploadFormData = new FormData()
    uploadFormData.append("file", file)

    try {
      const response = await fetch("/api/admin/upload-image", {
        method: "POST",
        body: uploadFormData,
      })

      if (response.ok) {
        const data = await response.json()
        setFormData({ ...formData, image: data.url })
      } else {
        alert("Failed to upload image")
      }
    } catch (error) {
      console.error("Error uploading image:", error)
      alert("Error uploading image")
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!testimonial) return

    setIsSaving(true)

    try {
      const response = await fetch(`/api/admin/testimonials/${testimonial.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push("/admin/testimonials")
      } else {
        const error = await response.json()
        alert(error.error || "Failed to update testimonial")
      }
    } catch (error) {
      console.error("Error updating testimonial:", error)
      alert("Error updating testimonial")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div>
        <div className="admin-header">
          <h1 className="admin-title">Edit Testimonial</h1>
        </div>
        <div className="card">
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <div className="loading-spinner"></div>
            <p>Loading testimonial...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!testimonial) {
    return (
      <div>
        <div className="admin-header">
          <h1 className="admin-title">Edit Testimonial</h1>
        </div>
        <div className="card">
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <h3>Testimonial not found</h3>
            <Link href="/admin/testimonials" className="btn btn-primary">
              Back to Testimonials
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Edit Testimonial</h1>
        <Link href="/admin/testimonials" className="btn btn-secondary">
          Back to Testimonials
        </Link>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="clientName">Client Name *</label>
              <input
                type="text"
                id="clientName"
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                required
                placeholder="Enter client's full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="clientTitle">Client Title/Position</label>
              <input
                type="text"
                id="clientTitle"
                value={formData.clientTitle}
                onChange={(e) => setFormData({ ...formData, clientTitle: e.target.value })}
                placeholder="e.g., CEO, Business Owner, etc."
              />
            </div>

            <div className="form-group">
              <label htmlFor="rating">Rating *</label>
              <select
                id="rating"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: Number.parseInt(e.target.value) })}
                required
              >
                <option value={5}>⭐⭐⭐⭐⭐ (5 stars)</option>
                <option value={4}>⭐⭐⭐⭐ (4 stars)</option>
                <option value={3}>⭐⭐⭐ (3 stars)</option>
                <option value={2}>⭐⭐ (2 stars)</option>
                <option value={1}>⭐ (1 star)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="order">Display Order</label>
              <input
                type="number"
                id="order"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: Number.parseInt(e.target.value) || 0 })}
                placeholder="0"
                min="0"
              />
              <small>Lower numbers appear first</small>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="content">Testimonial Content *</label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
              rows={6}
              placeholder="Enter the client's testimonial..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Client Photo</label>
            <input type="file" id="image" accept="image/*" onChange={handleImageUpload} disabled={isUploading} />
            {isUploading && <p>Uploading image...</p>}
            {formData.image && (
              <div style={{ marginTop: "1rem" }}>
                <img
                  src={formData.image || "/placeholder.svg"}
                  alt="Client photo preview"
                  style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "50%" }}
                />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, image: "" })}
                  style={{ marginLeft: "1rem", color: "#dc3545" }}
                >
                  Remove Image
                </button>
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              />
              <span className="checkmark"></span>
              Featured Testimonial
            </label>
            <small>Featured testimonials are highlighted on the homepage</small>
          </div>

          <div className="form-actions">
            <Link href="/admin/testimonials" className="btn btn-secondary">
              Cancel
            </Link>
            <button type="submit" className="btn btn-primary" disabled={isSaving}>
              {isSaving ? (
                <>
                  <span className="loading-spinner small"></span>
                  Updating...
                </>
              ) : (
                "Update Testimonial"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
