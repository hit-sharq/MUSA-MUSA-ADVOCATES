"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

interface BlogPost {
  id: string
  title: string
  slug: string
  summary: string | null
  published: boolean
  createdAt: string
  updatedAt: string
}

export default function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/admin/blog")
      if (response.ok) {
        const data = await response.json()
        setPosts(data)
      }
    } catch (error) {
      console.error("Error fetching posts:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return

    try {
      const response = await fetch(`/api/admin/blog/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setPosts(posts.filter((post) => post.id !== id))
      }
    } catch (error) {
      console.error("Error deleting post:", error)
    }
  }

  if (loading) {
    return (
      <div>
        <div className="admin-header">
          <h1 className="admin-title">Blog Manager</h1>
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
        <h1 className="admin-title">Blog Manager</h1>
        <Link href="/admin/blog/new" className="btn btn-primary">
          Create New Post
        </Link>
      </div>

      <div className="card">
        {posts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem" }}>
            <h3>No blog posts yet</h3>
            <p>Create your first blog post to get started.</p>
            <Link href="/admin/blog/new" className="btn btn-primary">
              Create First Post
            </Link>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td>
                    <strong>{post.title}</strong>
                    {post.summary && (
                      <div style={{ fontSize: "0.9rem", color: "#666", marginTop: "0.25rem" }}>
                        {post.summary.substring(0, 100)}...
                      </div>
                    )}
                  </td>
                  <td>
                    <span
                      style={{
                        padding: "0.25rem 0.5rem",
                        borderRadius: "3px",
                        fontSize: "0.8rem",
                        fontWeight: "600",
                        background: post.published ? "#c6f6d5" : "#fed7d7",
                        color: post.published ? "#276749" : "#c53030",
                      }}
                    >
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <Link href={`/admin/blog/edit/${post.id}`} className="btn btn-secondary">
                        Edit
                      </Link>
                      <button onClick={() => handleDelete(post.id)} className="btn btn-danger">
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
