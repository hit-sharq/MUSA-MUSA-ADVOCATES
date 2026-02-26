"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"

interface UserProfile {
  id: string
  name: string | null
  bio: string | null
  image: string | null
  phone: string | null
  location: string | null
}

export default function ProfileSettings() {
  const { user } = useUser()
  const router = useRouter()
  const [formData, setFormData] = useState<UserProfile>({
    id: "",
    name: "",
    bio: "",
    image: "",
    phone: "",
    location: "",
  })
  const [image, setImage] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/admin/profile")
        if (response.ok) {
          const profile = await response.json()
          setFormData({
            id: profile.id,
            name: profile.name || user?.fullName || "",
            bio: profile.bio || "",
            image: profile.image || user?.imageUrl || "",
            phone: profile.phone || "",
            location: profile.location || "",
          })
          setImageUrl(profile.image || user?.imageUrl || "")
        } else {
          // If no profile exists yet, use Clerk user data
          setFormData({
            id: "",
            name: user?.fullName || "",
            bio: "",
            image: user?.imageUrl || "",
            phone: "",
            location: "",
          })
          setImageUrl(user?.imageUrl || "")
        }
      } catch (error) {
        console.error("Error fetching profile:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (user) {
      fetchProfile()
    }
  }, [user])

  const uploadImageFile = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append("file", file)

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error("Failed to upload image")
    }

    const result = await response.json()
    return result.url
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      let finalImageUrl = imageUrl

      if (image) {
        setIsUploading(true)
        finalImageUrl = await uploadImageFile(image)
        setIsUploading(false)
      }

      const response = await fetch("/api/admin/profile", {
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
        alert("Profile updated successfully!")
        setImage(null) // Clear the selected file
      }
    } catch (error) {
      console.error("Error updating profile:", error)
      alert("Failed to update profile. Please try again.")
    } finally {
      setIsSubmitting(false)
      setIsUploading(false)
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
          <h1 className="admin-title">Profile Settings</h1>
        </div>
        <div className="card">
          <p>Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Profile Settings</h1>
      </div>

      <div className="grid grid-2" style={{ gap: "2rem" }}>
        <div className="card">
          <h3 style={{ marginBottom: "1.5rem" }}>Personal Information</h3>
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name || ""}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                className="form-input"
                placeholder="Your full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="bio" className="form-label">
                Bio
              </label>
              <textarea
                id="bio"
                value={formData.bio || ""}
                onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
                className="form-textarea"
                placeholder="Write a brief bio about yourself..."
                rows={6}
              />
              <small style={{ color: "#666", marginTop: "0.5rem", display: "block" }}>
                This bio will be displayed on the About page.
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone || ""}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                className="form-input"
                placeholder="+254 700 000 000"
              />
            </div>

            <div className="form-group">
              <label htmlFor="location" className="form-label">
                Location
              </label>
              <input
                type="text"
                id="location"
                value={formData.location || ""}
                onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                className="form-input"
                placeholder="Nairobi, Kenya"
              />
            </div>

            <button type="submit" disabled={isSubmitting || isUploading} className="btn btn-primary">
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: "1.5rem" }}>Profile Photo</h3>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
            <div
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                overflow: "hidden",
                border: "3px solid #e2e8f0",
              }}
            >
              <img
                src={imageUrl || "/placeholder.svg?height=150&width=150"}
                alt="Profile"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            <div className="form-group" style={{ width: "100%" }}>
              <label htmlFor="profile-image" className="form-label">
                Upload New Photo
              </label>
              <input
                type="file"
                id="profile-image"
                accept="image/*"
                onChange={handleImageChange}
                className="form-input"
              />
              <small style={{ color: "#666", marginTop: "0.5rem", display: "block" }}>
                Recommended size: 400x400 pixels. Max file size: 5MB.
              </small>
            </div>

            {isUploading && <div style={{ color: "#0066cc", fontWeight: "500" }}>Uploading image...</div>}

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting || !image || isUploading}
              className="btn btn-primary"
              style={{ width: "100%" }}
            >
              {isUploading ? "Uploading..." : isSubmitting ? "Saving..." : "Update Profile Photo"}
            </button>
          </div>

          <div style={{ marginTop: "2rem", padding: "1rem", background: "#f7fafc", borderRadius: "8px" }}>
            <h4 style={{ marginBottom: "0.5rem" }}>Account Information</h4>
            <p style={{ margin: "0.25rem 0" }}>
              <strong>Email:</strong> {user?.primaryEmailAddress?.emailAddress}
            </p>
            <p style={{ margin: "0.25rem 0" }}>
              <strong>Account Created:</strong>{" "}
              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
            </p>
            <p style={{ margin: "0.25rem 0", color: "#666", fontSize: "0.9rem" }}>
              To change your email or password, please use the Clerk account settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
