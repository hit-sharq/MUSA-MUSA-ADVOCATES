"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { use } from "react"

export default function EditGalleryImage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const unwrappedParams = use(params)
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    order: 0,
  })
  const [image, setImage] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchGalleryImage = async () => {
      try {
        const response = await fetch(`/api/admin/gallery/${unwrappedParams.id}`)
        if (response.ok) {
          const galleryImage = await response.json()
          setFormData({
            title: galleryImage.title,
            description: galleryImage.description || "",
            order: galleryImage.order,
          })
          setImageUrl(galleryImage.imageUrl || "")
        } else {
          router.push("/admin/gallery")
        }
      } catch (error) {
        console.error("Error fetching gallery image:", error)
        router.push("/admin/gallery")
      } finally {
        setIsLoading(false)
      }
    }

    fetchGalleryImage()
  }, [unwrappedParams.id, router])

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

      const response = await fetch(`/api/admin/gallery/${unwrappedParams.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          imageUrl: finalImageUrl,
        }),
      })

      if (response.ok) {
        router.push("/admin/gallery")
      }
    } catch (error) {
      console.error("Error updating gallery image:", error)
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

  if (isLoading) {
    return (
      <div>
        <div className="admin-header">
          <h1 className="admin-title">Edit Gallery Image</h1>
        </div>
        <div className="card">
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Edit Gallery Image</h1>
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
              placeholder="Enter image title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              className="form-textarea"
              placeholder="Optional description for this image"
              rows={3}
            />
          </div>

          <div className="form-group">
            <label htmlFor="image" className="form-label">
              Image
            </label>
            <input type="file" id="image" accept="image/*" onChange={handleImageChange} className="form-input" />
            {imageUrl && (
              <img
                src={imageUrl || "/placeholder.svg"}
                alt="Preview"
                style={{ marginTop: "1rem", maxWidth: "300px", borderRadius: "5px" }}
              />
            )}
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
              Lower numbers will appear first in the gallery. Use this to control the order of images.
            </small>
          </div>

          <div style={{ display: "flex", gap: "1rem" }}>
            <button type="submit" disabled={isSubmitting} className="btn btn-primary">
              {isSubmitting ? "Updating..." : "Update Gallery Image"}
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
