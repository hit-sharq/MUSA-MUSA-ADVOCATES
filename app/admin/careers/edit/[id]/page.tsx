
"use client"

import type React from "react"

import { use, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import RichTextEditor from "@/components/RichTextEditor"

export default function EditCareer({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const unwrappedParams = use(params)
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    type: "Full-time",
    description: "",
    requirements: "",
    published: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCareer = async () => {
      try {
        const response = await fetch(`/api/admin/careers/${unwrappedParams.id}`)
        if (response.ok) {
          const career = await response.json()
          setFormData({
            title: career.title,
            department: career.department,
            location: career.location,
            type: career.type || "Full-time",
            description: career.description,
            requirements: career.requirements,
            published: career.published,
          })
        } else {
          router.push("/admin/careers")
        }
      } catch (error) {
        console.error("Error fetching career:", error)
        router.push("/admin/careers")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCareer()
  }, [unwrappedParams.id, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/admin/careers/${unwrappedParams.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push("/admin/careers")
      }
    } catch (error) {
      console.error("Error updating career:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div>
        <div className="admin-header">
          <h1 className="admin-title">Edit Career</h1>
        </div>
        <div className="card">
          <p>Loading career...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Edit Career</h1>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Job Title *
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              required
              className="form-input"
              placeholder="e.g., Senior Associate Attorney"
            />
          </div>

          <div className="form-group">
            <label htmlFor="department" className="form-label">
              Department *
            </label>
            <input
              type="text"
              id="department"
              value={formData.department}
              onChange={(e) => setFormData((prev) => ({ ...prev, department: e.target.value }))}
              required
              className="form-input"
              placeholder="e.g., Corporate Law, Litigation"
            />
          </div>

          <div className="form-group">
            <label htmlFor="location" className="form-label">
              Location *
            </label>
            <input
              type="text"
              id="location"
              value={formData.location}
              onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
              required
              className="form-input"
              placeholder="e.g., Nairobi, Kenya"
            />
          </div>

          <div className="form-group">
            <label htmlFor="type" className="form-label">
              Employment Type
            </label>
            <select
              id="type"
              value={formData.type}
              onChange={(e) => setFormData((prev) => ({ ...prev, type: e.target.value }))}
              className="form-input"
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Job Description *
            </label>
            <RichTextEditor
              content={formData.description}
              onChange={(description) => setFormData((prev) => ({ ...prev, description }))}
              placeholder="Describe the role and responsibilities..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="requirements" className="form-label">
              Requirements *
            </label>
            <RichTextEditor
              content={formData.requirements}
              onChange={(requirements) => setFormData((prev) => ({ ...prev, requirements }))}
              placeholder="List the required qualifications and skills..."
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
              {isSubmitting ? "Updating..." : "Update Career"}
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


