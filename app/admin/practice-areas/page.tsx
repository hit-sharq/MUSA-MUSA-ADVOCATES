"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

interface PracticeArea {
  id: string
  title: string
  description: string
  icon: string | null
  order: number
  createdAt: string
  updatedAt: string
}

export default function PracticeAreasManager() {
  const [areas, setAreas] = useState<PracticeArea[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPracticeAreas()
  }, [])

  const fetchPracticeAreas = async () => {
    try {
      const response = await fetch("/api/admin/practice-areas")
      if (response.ok) {
        const data = await response.json()
        setAreas(data)
      }
    } catch (error) {
      console.error("Error fetching practice areas:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this practice area?")) return

    try {
      const response = await fetch(`/api/admin/practice-areas/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setAreas(areas.filter((area) => area.id !== id))
      }
    } catch (error) {
      console.error("Error deleting practice area:", error)
    }
  }

  if (loading) {
    return (
      <div>
        <div className="admin-header">
          <h1 className="admin-title">Practice Areas Manager</h1>
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
        <h1 className="admin-title">Practice Areas Manager</h1>
        <Link href="/admin/practice-areas/new" className="btn btn-primary">
          Add Practice Area
        </Link>
      </div>

      <div className="card">
        {areas.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem" }}>
            <h3>No practice areas yet</h3>
            <p>Add your first practice area to get started.</p>
            <Link href="/admin/practice-areas/new" className="btn btn-primary">
              Add First Practice Area
            </Link>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Icon</th>
                <th>Title</th>
                <th>Description</th>
                <th>Order</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {areas.map((area) => (
                <tr key={area.id}>
                  <td>
                    <div
                      style={{
                        fontSize: "2rem",
                        width: "50px",
                        height: "50px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {area.icon || "⚖️"}
                    </div>
                  </td>
                  <td>
                    <strong>{area.title}</strong>
                  </td>
                  <td>{area.description.substring(0, 100)}...</td>
                  <td>{area.order}</td>
                  <td>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <Link href={`/admin/practice-areas/edit/${area.id}`} className="btn btn-secondary">
                        Edit
                      </Link>
                      <button onClick={() => handleDelete(area.id)} className="btn btn-danger">
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
