"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

interface TeamMember {
  id: string
  name: string
  title: string
  bio: string
  image: string | null
  order: number
  createdAt: string
  updatedAt: string
}

export default function TeamManager() {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTeamMembers()
  }, [])

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch("/api/admin/team")
      if (response.ok) {
        const data = await response.json()
        setMembers(data)
      }
    } catch (error) {
      console.error("Error fetching team members:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this team member?")) return

    try {
      const response = await fetch(`/api/admin/team/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setMembers(members.filter((member) => member.id !== id))
      }
    } catch (error) {
      console.error("Error deleting team member:", error)
    }
  }

  if (loading) {
    return (
      <div>
        <div className="admin-header">
          <h1 className="admin-title">Team Manager</h1>
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
        <h1 className="admin-title">Team Manager</h1>
        <Link href="/admin/team/new" className="btn btn-primary">
          Add Team Member
        </Link>
      </div>

      <div className="card">
        {members.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem" }}>
            <h3>No team members yet</h3>
            <p>Add your first team member to get started.</p>
            <Link href="/admin/team/new" className="btn btn-primary">
              Add First Team Member
            </Link>
          </div>
        ) : (
          <div className="grid grid-2" style={{ gap: "2rem" }}>
            {members.map((member) => (
              <div key={member.id} className="card" style={{ display: "flex", gap: "1.5rem" }}>
                <div style={{ width: "100px", height: "100px", flexShrink: 0 }}>
                  <Image
                    src={member.image || "/placeholder.svg?height=100&width=100"}
                    alt={member.name}
                    width={100}
                    height={100}
                    style={{ borderRadius: "50%", objectFit: "cover" }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ marginBottom: "0.5rem" }}>{member.name}</h3>
                  <p style={{ color: "#1a365d", fontWeight: "600", marginBottom: "0.5rem" }}>{member.title}</p>
                  <p style={{ color: "#666", marginBottom: "1rem", fontSize: "0.9rem" }}>
                    {member.bio.substring(0, 100)}...
                  </p>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <Link href={`/admin/team/edit/${member.id}`} className="btn btn-secondary">
                      Edit
                    </Link>
                    <button onClick={() => handleDelete(member.id)} className="btn btn-danger">
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
