"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { uploadImage } from "@/lib/cloudinary"

export default function NewTeamMember() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    bio: "",
    order: 0,
  })
  const [image, setImage] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      let finalImageUrl = imageUrl

      if (image) {
        // Upload image via API route
        const formData = new FormData()
        formData.append("file", image)

        const uploadResponse = await fetch("/api/admin/upload-image", {
          method: "POST",
          body: formData,
        })

        if (!uploadResponse.ok) {
          throw new Error("Image upload failed")
        }

        const uploadData = await uploadResponse.json()
        finalImageUrl = uploadData.imageUrl
      }

      const response = await fetch("/api/admin/team", {
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
        router.push("/admin/team")
      }
    } catch (error) {
      console.error("Error creating team member:", error)
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
        <h1 className="admin-title">Add New Team Member</h1>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name *
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              required
              className="form-input"
              placeholder="Enter team member's name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Title/Position *
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              required
              className="form-input"
              placeholder="E.g., Senior Associate, Legal Assistant, etc."
            />
          </div>

          <div className="form-group">
            <label htmlFor="image" className="form-label">
              Profile Photo
            </label>
            <input type="file" id="image" accept="image/*" onChange={handleImageChange} className="form-input" />
            {imageUrl && (
              <img
                src={imageUrl || "/placeholder.svg"}
                alt="Preview"
                style={{ marginTop: "1rem", maxWidth: "150px", borderRadius: "50%" }}
              />
            )}
          </div>

          <div className="form-group">
            <label htmlFor="bio" className="form-label">
              Bio *
            </label>
            <textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
              required
              className="form-textarea"
              placeholder="Write a brief bio for this team member..."
              rows={8}
            />
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
            <small style={{ color: "#666", marginTop: "0.5rem", display: "block" }}>
              Lower numbers will appear first on the team page. Use this to control the order of team members.
            </small>
          </div>

          <div style={{ display: "flex", gap: "1rem" }}>
            <button type="submit" disabled={isSubmitting} className="btn btn-primary">
              {isSubmitting ? "Creating..." : "Add Team Member"}
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
