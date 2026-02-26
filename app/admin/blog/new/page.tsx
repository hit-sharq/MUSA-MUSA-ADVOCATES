"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function NewBlogPost() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    summary: "",
    published: false,
  })
  const [image, setImage] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // New function to upload image via API route
  const uploadImageToApi = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append("file", file)

    const response = await fetch("/api/admin/upload-image", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error("Image upload failed")
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
        finalImageUrl = await uploadImageToApi(image)
      }

      const response = await fetch("/api/admin/blog", {
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
        router.push("/admin/blog")
      }
    } catch (error) {
      console.error("Error creating post:", error)
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
        <h1 className="admin-title">Create New Blog Post</h1>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Title *
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              required
              className="form-input"
              placeholder="Enter blog post title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="summary" className="form-label">
              Summary
            </label>
            <input
              type="text"
              id="summary"
              value={formData.summary}
              onChange={(e) => setFormData((prev) => ({ ...prev, summary: e.target.value }))}
              className="form-input"
              placeholder="Brief summary of the post"
            />
          </div>

          <div className="form-group">
            <label htmlFor="image" className="form-label">
              Featured Image
            </label>
            <input type="file" id="image" accept="image/*" onChange={handleImageChange} className="form-input" />
            {imageUrl && (
              <img
                src={imageUrl || "/placeholder.svg"}
                alt="Preview"
                style={{ marginTop: "1rem", maxWidth: "200px", borderRadius: "5px" }}
              />
            )}
          </div>

          <div className="form-group">
            <label htmlFor="content" className="form-label">
              Content *
            </label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
              required
              className="form-textarea"
              placeholder="Write your blog post content here..."
              rows={15}
            />
          </div>

          <div className="form-group">
            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData((prev) => ({ ...prev, published: e.target.checked }))}
              />
              Publish immediately
            </label>
          </div>

          <div style={{ display: "flex", gap: "1rem" }}>
            <button type="submit" disabled={isSubmitting} className="btn btn-primary">
              {isSubmitting ? "Creating..." : "Create Post"}
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
