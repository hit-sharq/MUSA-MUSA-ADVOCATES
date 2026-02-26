"use client"

import type React from "react"

import { use, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function EditBlogPost({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const unwrappedParams = use(params)
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
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/admin/blog/${unwrappedParams.id}`)
        if (response.ok) {
          const post = await response.json()
          setFormData({
            title: post.title,
            content: post.content,
            summary: post.summary || "",
            published: post.published,
          })
          setImageUrl(post.image || "")
        } else {
          router.push("/admin/blog")
        }
      } catch (error) {
        console.error("Error fetching post:", error)
        router.push("/admin/blog")
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
  }, [unwrappedParams.id, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      let finalImageUrl = imageUrl

      if (image) {
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

      const response = await fetch(`/api/admin/blog/${unwrappedParams.id}`, {
        method: "PUT",
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
      console.error("Error updating post:", error)
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
          <h1 className="admin-title">Edit Blog Post</h1>
        </div>
        <div className="card">
          <p>Loading post...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Edit Blog Post</h1>
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
              {isSubmitting ? "Updating..." : "Update Post"}
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
