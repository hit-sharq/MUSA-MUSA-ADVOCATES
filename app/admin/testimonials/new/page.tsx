"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function NewTestimonial() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    clientName: "",
    clientTitle: "",
    content: "",
    rating: 5,
    featured: false,
    order: 0,
  })
  const [image, setImage] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const uploadImageToServer = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append("file", file)

    const response = await fetch("/api/admin/upload-image", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error("Failed to upload image")
    }

    const data = await response.json()
    return data.imageUrl
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      let finalImageUrl = imageUrl

      if (image) {
        finalImageUrl = await uploadImageToServer(image)
      }

      const response = await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          image: finalImageUrl,
        }),
      })

      if (response.ok) {
        router.push("/admin/testimonials")
      }
    } catch (error) {
      console.error("Error creating testimonial:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      const url = URL.createObjectURL(file)
      setImageUrl(url)
    }
  }

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Add New Testimonial</h1>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit} className="form">
          <div className="grid grid-2" style={{ gap: "1rem" }}>
            <div className="form-group">
              <label htmlFor="clientName" className="form-label">
                Client Name *
              </label>
              <input
                type="text"
                id="clientName"
                value={formData.clientName}
                onChange={(e) => setFormData((prev) => ({ ...prev, clientName: e.target.value }))}
                required
                className="form-input"
                placeholder="Enter client's name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="clientTitle" className="form-label">
                Client Title/Position
              </label>
              <input
                type="text"
                id="clientTitle"
                value={formData.clientTitle}
                onChange={(e) => setFormData((prev) => ({ ...prev, clientTitle: e.target.value }))}
                className="form-input"
                placeholder="E.g., CEO, Business Owner, etc."
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="content" className="form-label">
              Testimonial Content *
            </label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
              required
              className="form-textarea"
              placeholder="Enter the client's testimonial..."
              rows={6}
            />
          </div>

          <div className="grid grid-2" style={{ gap: "1rem" }}>
            <div className="form-group">
              <label htmlFor="rating" className="form-label">
                Rating
              </label>
              <select
                id="rating"
                value={formData.rating}
                onChange={(e) => setFormData((prev) => ({ ...prev, rating: Number.parseInt(e.target.value) }))}
                className="form-input"
              >
                <option value={5}>⭐⭐⭐⭐⭐ (5 stars)</option>
                <option value={4}>⭐⭐⭐⭐ (4 stars)</option>
                <option value={3}>⭐⭐⭐ (3 stars)</option>
                <option value={2}>⭐⭐ (2 stars)</option>
                <option value={1}>⭐ (1 star)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="order" className="form-label">
                Display Order
              </label>
              <input
                type="number"
                id="order"
                value={formData.order}
                onChange={(e) => setFormData((prev) => ({ ...prev, order: Number.parseInt(e.target.value) }))}
                className="form-input"
                placeholder="Lower numbers appear first"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="image" className="form-label">
              Client Photo (Optional)
            </label>
            <input type="file" id="image" accept="image/*" onChange={handleImageChange} className="form-input" />
            {imageUrl && (
              <img
                src={imageUrl || "/placeholder.svg"}
                alt="Preview"
                style={{ marginTop: "1rem", maxWidth: "100px", borderRadius: "50%" }}
              />
            )}
          </div>

          <div className="form-group">
            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData((prev) => ({ ...prev, featured: e.target.checked }))}
              />
              Feature this testimonial (will appear prominently on homepage)
            </label>
          </div>

          <div style={{ display: "flex", gap: "1rem" }}>
            <button type="submit" disabled={isSubmitting} className="btn btn-primary">
              {isSubmitting ? "Creating..." : "Add Testimonial"}
            </button>
            <button type="button" onClick={() => router.back()} className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
