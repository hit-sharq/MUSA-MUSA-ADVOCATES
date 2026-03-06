"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

interface Career {
  id: string
  title: string
  department: string
  location: string
  type: string
  published: boolean
  createdAt: string
}

export default function CareersManager() {
  const [careers, setCareers] = useState<Career[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCareers()
  }, [])

  const fetchCareers = async () => {
    try {
      const response = await fetch("/api/admin/careers")
      if (response.ok) {
        const data = await response.json()
        setCareers(data)
      }
    } catch (error) {
      console.error("Error fetching careers:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this career?")) return

    try {
      const response = await fetch(`/api/admin/careers/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setCareers(careers.filter((career) => career.id !== id))
      }
    } catch (error) {
      console.error("Error deleting career:", error)
    }
  }

  if (loading) {
    return (
      <div>
        <div className="admin-header">
          <h1 className="admin-title">Careers Manager</h1>
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
        <h1 className="admin-title">Careers Manager</h1>
        <Link href="/admin/careers/new" className="btn btn-primary">
          Create New Career
        </Link>
      </div>

      <div className="card">
        {careers.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem" }}>
            <h3>No careers yet</h3>
            <p>Create your first career posting to get started.</p>
            <Link href="/admin/careers/new" className="btn btn-primary">
              Create First Career
            </Link>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Department</th>
                <th>Location</th>
                <th>Type</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {careers.map((career) => (
                <tr key={career.id}>
                  <td>
                    <strong>{career.title}</strong>
                  </td>
                  <td>{career.department}</td>
                  <td>{career.location}</td>
                  <td>{career.type}</td>
                  <td>
                    <span
                      style={{
                        padding: "0.25rem 0.5rem",
                        borderRadius: "3px",
                        fontSize: "0.8rem",
                        fontWeight: "600",
                        background: career.published ? "#c6f6d5" : "#fed7d7",
                        color: career.published ? "#276749" : "#c53030",
                      }}
                    >
                      {career.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td>{new Date(career.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <Link href={`/admin/careers/edit/${career.id}`} className="btn btn-secondary">
                        Edit
                      </Link>
                      <button onClick={() => handleDelete(career.id)} className="btn btn-danger">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
