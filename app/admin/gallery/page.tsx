"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

interface GalleryImage {
  id: string
  title: string
  description: string | null
  imageUrl: string
  order: number
  createdAt: string
  updatedAt: string
}

export default function GalleryManager() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGalleryImages()
  }, [])

  const fetchGalleryImages = async () => {
    try {
      const response = await fetch("/api/admin/gallery")
      if (response.ok) {
        const data = await response.json()
        setImages(data)
      }
    } catch (error) {
      console.error("Error fetching gallery images:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this gallery image?")) return

    try {
      const response = await fetch(`/api/admin/gallery/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setImages(images.filter((image) => image.id !== id))
      }
    } catch (error) {
      console.error("Error deleting gallery image:", error)
    }
  }

  if (loading) {
    return (
      <div>
        <div className="admin-header">
          <h1 className="admin-title">Gallery Manager</h1>
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
        <h1 className="admin-title">Gallery Manager</h1>
        <Link href="/admin/gallery/new" className="btn btn-primary">
          Add Gallery Image
        </Link>
      </div>

      <div className="card">
        {images.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem" }}>
            <h3>No gallery images yet</h3>
            <p>Add your first gallery image to get started.</p>
            <Link href="/admin/gallery/new" className="btn btn-primary">
              Add First Gallery Image
            </Link>
          </div>
          ) : (
            <div className="grid grid-3" style={{ gap: "1rem", gridTemplateColumns: "repeat(3, 1fr)" }}>
              {images.map((image) => (
                <div key={image.id} className="card" style={{ padding: "0", overflow: "hidden", borderRadius: "8px", width: "280px", margin: "0 auto" }}>
                  <div style={{ position: "relative", width: "280px", height: "220px" }}>
                    <Image
                      src={image.imageUrl || "/placeholder.svg"}
                      alt={image.title}
                      width={280}
                      height={220}
                      style={{ objectFit: "contain", borderRadius: "8px" }}
                    />
                  </div>
                  <div style={{ padding: "1rem" }}>
                    <h3 style={{ marginBottom: "0.5rem" }}>{image.title}</h3>
                    {image.description && <p style={{ color: "#666", marginBottom: "1rem" }}>{image.description}</p>}
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <Link href={`/admin/gallery/edit/${image.id}`} className="btn btn-secondary">
                        Edit
                      </Link>
                      <button onClick={() => handleDelete(image.id)} className="btn btn-danger">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
        )}
      </div>
    </div>
  )
}
