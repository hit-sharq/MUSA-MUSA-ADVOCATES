"use client"

import Image from "next/image"
import React from "react"

interface GalleryImage {
  id: string
  imageUrl: string | null
  title: string
  description: string | null
}

interface GalleryGridProps {
  images: GalleryImage[]
}

export default function GalleryGrid({ images }: GalleryGridProps) {
  return (
    <div
      className="gallery-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "1rem",
      }}
    >
      {images.map((image) => {
        const imageUrl = image.imageUrl?.includes("res.cloudinary.com")
          ? image.imageUrl.replace("/upload/", "/upload/w_300,h_240,c_fit/")
          : image.imageUrl || "/placeholder.svg"
        return (
          <div
            key={image.id}
            className="gallery-item"
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "0.5rem",
              boxSizing: "border-box",
            }}
          >
            <Image
              src={imageUrl}
              alt={image.title}
              width={300}
              height={240}
              style={{ objectFit: "contain", borderRadius: "8px" }}
              className="gallery-image"
            />
            <div
              className="gallery-overlay"
              style={{ textAlign: "center", marginTop: "0.5rem" }}
            >
              <h4 style={{ marginBottom: "0.5rem", fontSize: "0.9rem" }}>
                {image.title}
              </h4>
              {image.description && (
                <p style={{ fontSize: "0.8rem" }}>{image.description}</p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
