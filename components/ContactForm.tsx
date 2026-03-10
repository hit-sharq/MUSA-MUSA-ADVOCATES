"use client"

import type React from "react"
import { useState } from "react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", phone: "", company: "", subject: "", message: "" })
      } else {
        setSubmitStatus("error")
        setErrorMessage(data.error || "Failed to send message")
      }
    } catch (error) {
      setSubmitStatus("error")
      setErrorMessage("Network error. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="card" style={{ position: "relative" }}>
      {isSubmitting && (
        <div className="loading-overlay">
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                border: "4px solid #f3f3f3",
                borderTop: "4px solid #1a365d",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                margin: "0 auto 1rem",
              }}
            ></div>
            <p style={{ color: "#1a365d", fontWeight: "600" }}>Sending your message...</p>
          </div>
        </div>
      )}

      <div className={isSubmitting ? "form-disabled" : ""}>
        <div style={{ marginBottom: "2rem" }}>
          <h3 style={{ color: "#1a365d", marginBottom: "0.5rem" }}>Send Us a Message</h3>
          <p style={{ color: "#666" }}>Fill out the form below and we'll get back to you within 24 hours.</p>
        </div>

        {/* Success Message */}
        {submitStatus === "success" && (
          <div
            style={{
              background: "linear-gradient(135deg, #48bb78 0%, #38a169 100%)",
              color: "white",
              padding: "1.5rem",
              borderRadius: "10px",
              marginBottom: "2rem",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>✅</div>
            <h4 style={{ marginBottom: "0.5rem" }}>Message Sent Successfully!</h4>
            <p style={{ margin: 0, opacity: 0.9 }}>
              Thank you for contacting us. We'll review your message and respond within 24 hours.
            </p>
          </div>
        )}

        {/* Error Message */}
        {submitStatus === "error" && (
          <div
            style={{
              background: "linear-gradient(135deg, #f56565 0%, #e53e3e 100%)",
              color: "white",
              padding: "1.5rem",
              borderRadius: "10px",
              marginBottom: "2rem",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>❌</div>
            <h4 style={{ marginBottom: "0.5rem" }}>Error Sending Message</h4>
            <p style={{ margin: 0, opacity: 0.9 }}>
              {errorMessage ||
                "There was an error sending your message. Please try again or contact us directly."}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="form">
          <div className="grid grid-2" style={{ gap: "1rem" }}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="Enter your full name"
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="Enter your email address"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="grid grid-2" style={{ gap: "1rem" }}>
            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
                placeholder="+254 700 000 000"
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="company" className="form-label">
                Company/Organization
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="form-input"
                placeholder="Your company name (optional)"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="subject" className="form-label">
              Legal Matter *
            </label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="form-input"
              disabled={isSubmitting}
            >
              <option value="">Select your legal matter</option>
              <option value="Criminal Law">Criminal Law</option>
              <option value="Family Law">Family Law</option>
              <option value="Corporate Law">Corporate Law</option>
              <option value="Real Estate Law">Real Estate Law</option>
              <option value="Personal Injury">Personal Injury</option>
              <option value="Immigration Law">Immigration Law</option>
              <option value="Employment Law">Employment Law</option>
              <option value="Contract Disputes">Contract Disputes</option>
              <option value="General Consultation">General Consultation</option>
              <option value="Other">Other Legal Matter</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="message" className="form-label">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="form-textarea"
              placeholder="Please describe your legal situation in detail. Include any relevant dates, parties involved, and specific questions you have..."
              rows={6}
              disabled={isSubmitting}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="form-button"
            style={{
              width: "100%",
              position: "relative",
              background: isSubmitting ? "#a0aec0" : "#1a365d",
            }}
          >
            {isSubmitting ? (
              <>
                <span style={{ opacity: 0.7 }}>Sending Message...</span>
                <div
                  style={{
                    position: "absolute",
                    right: "1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "20px",
                    height: "20px",
                    border: "2px solid #ffffff40",
                    borderTop: "2px solid #ffffff",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                  }}
                ></div>
              </>
            ) : (
              "Send Message"
            )}
          </button>
        </form>

        <div
          style={{
            marginTop: "1.5rem",
            padding: "1rem",
            background: "#f7fafc",
            borderRadius: "8px",
            fontSize: "0.9rem",
            color: "#666",
          }}
        >
          <p style={{ margin: 0 }}>
            🔒 Your information is secure and confidential. We respect attorney-client privilege and will never
            share your details with third parties.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: translateY(-50%) rotate(0deg); }
          100% { transform: translateY(-50%) rotate(360deg); }
        }
        
        .loading-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          z-index: 10;
        }
        
        .form-disabled {
          opacity: 0.6;
          pointer-events: none;
        }
      `}</style>
    </div>
  )
}

