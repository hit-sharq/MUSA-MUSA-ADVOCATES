"use client"

import { useState, useEffect } from "react"

interface ContactRequest {
  id: string
  name: string
  email: string
  phone: string | null
  subject: string
  message: string
  read: boolean
  createdAt: string
  updatedAt: string
}

export default function ContactRequestsManager() {
  const [requests, setRequests] = useState<ContactRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedRequest, setSelectedRequest] = useState<ContactRequest | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    fetchContactRequests()
  }, [])

  const fetchContactRequests = async () => {
    try {
      const response = await fetch("/api/admin/contact-requests")
      if (response.ok) {
        const data = await response.json()
        setRequests(data)
      }
    } catch (error) {
      console.error("Error fetching contact requests:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this contact request?")) return

    try {
      const response = await fetch(`/api/admin/contact-requests/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setRequests(requests.filter((request) => request.id !== id))
        if (selectedRequest?.id === id) {
          setSelectedRequest(null)
          setShowModal(false)
        }
      }
    } catch (error) {
      console.error("Error deleting contact request:", error)
    }
  }

  const markAsRead = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/contact-requests/${id}/read`, {
        method: "PUT",
      })

      if (response.ok) {
        setRequests(requests.map((request) => (request.id === id ? { ...request, read: true } : request)))
        if (selectedRequest?.id === id) {
          setSelectedRequest({ ...selectedRequest, read: true })
        }
      }
    } catch (error) {
      console.error("Error marking contact request as read:", error)
    }
  }

  const viewRequest = (request: ContactRequest) => {
    setSelectedRequest(request)
    setShowModal(true)
    if (!request.read) {
      markAsRead(request.id)
    }
  }

  if (loading) {
    return (
      <div>
        <div className="admin-header">
          <h1 className="admin-title">Contact Requests</h1>
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
        <h1 className="admin-title">Contact Requests</h1>
      </div>

      <div className="card">
        {requests.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem" }}>
            <h3>No contact requests yet</h3>
            <p>When clients submit the contact form, their requests will appear here.</p>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Status</th>
                <th>Name</th>
                <th>Subject</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request.id} style={{ background: request.read ? "" : "#f7fafc" }}>
                  <td>
                    <span
                      style={{
                        padding: "0.25rem 0.5rem",
                        borderRadius: "3px",
                        fontSize: "0.8rem",
                        fontWeight: "600",
                        background: request.read ? "#e2e8f0" : "#c6f6d5",
                        color: request.read ? "#4a5568" : "#276749",
                      }}
                    >
                      {request.read ? "Read" : "New"}
                    </span>
                  </td>
                  <td>
                    <strong>{request.name}</strong>
                    <div style={{ fontSize: "0.9rem", color: "#666" }}>{request.email}</div>
                  </td>
                  <td>{request.subject}</td>
                  <td>{new Date(request.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button onClick={() => viewRequest(request)} className="btn btn-secondary">
                        View
                      </button>
                      <button onClick={() => handleDelete(request.id)} className="btn btn-danger">
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

      {/* Modal for viewing contact request details */}
      {showModal && selectedRequest && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: "10px",
              padding: "2rem",
              width: "90%",
              maxWidth: "600px",
              maxHeight: "90vh",
              overflow: "auto",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem" }}>
              <h2 style={{ margin: 0 }}>Contact Request Details</h2>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                }}
              >
                &times;
              </button>
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <h3 style={{ marginBottom: "0.5rem" }}>From</h3>
              <p style={{ margin: "0.25rem 0" }}>
                <strong>Name:</strong> {selectedRequest.name}
              </p>
              <p style={{ margin: "0.25rem 0" }}>
                <strong>Email:</strong>{" "}
                <a href={`mailto:${selectedRequest.email}`} style={{ color: "#1a365d" }}>
                  {selectedRequest.email}
                </a>
              </p>
              {selectedRequest.phone && (
                <p style={{ margin: "0.25rem 0" }}>
                  <strong>Phone:</strong>{" "}
                  <a href={`tel:${selectedRequest.phone}`} style={{ color: "#1a365d" }}>
                    {selectedRequest.phone}
                  </a>
                </p>
              )}
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <h3 style={{ marginBottom: "0.5rem" }}>Subject</h3>
              <p style={{ margin: 0 }}>{selectedRequest.subject}</p>
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <h3 style={{ marginBottom: "0.5rem" }}>Message</h3>
              <div
                style={{
                  background: "#f7fafc",
                  padding: "1rem",
                  borderRadius: "5px",
                  whiteSpace: "pre-wrap",
                }}
              >
                {selectedRequest.message}
              </div>
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <h3 style={{ marginBottom: "0.5rem" }}>Details</h3>
              <p style={{ margin: "0.25rem 0" }}>
                <strong>Received:</strong> {new Date(selectedRequest.createdAt).toLocaleString()}
              </p>
              <p style={{ margin: "0.25rem 0" }}>
                <strong>Status:</strong> {selectedRequest.read ? "Read" : "New"}
              </p>
            </div>

            <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
              <a
                href={`mailto:${selectedRequest.email}?subject=Re: ${selectedRequest.subject}`}
                className="btn btn-primary"
              >
                Reply via Email
              </a>
              <button onClick={() => handleDelete(selectedRequest.id)} className="btn btn-danger">
                Delete
              </button>
              <button onClick={() => setShowModal(false)} className="btn btn-secondary">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
