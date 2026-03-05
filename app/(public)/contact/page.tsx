"use client"

import type React from "react"
import { useState } from "react"

export default function ContactPage() {
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
    <div className="section">
      <div className="container">
        {/* Hero Section */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h1 className="section-title">Contact Musa & Musa Advocates</h1>
          <p className="section-subtitle">
            Ready to discuss your legal needs? Get in touch with us today to schedule a consultation and learn how our experienced team can help you achieve the best possible outcome for your case.
          </p>
        </div>

        <div className="grid grid-2" style={{ gap: "4rem", alignItems: "start" }}>
          {/* Contact Form */}
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
          </div>

          {/* Contact Information */}
          <div>
            {/* Office Info Card */}
            <div className="card" style={{ marginBottom: "2rem" }}>
              <h3 style={{ color: "#1a365d", marginBottom: "2rem" }}>Get in Touch</h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                  <div
                    style={{
                      background: "#1a365d",
                      color: "white",
                      padding: "0.75rem",
                      borderRadius: "50%",
                      fontSize: "1.2rem",
                      minWidth: "50px",
                      textAlign: "center",
                    }}
                  >
                    📧
                  </div>
                  <div>
                    <h4 style={{ color: "#1a365d", marginBottom: "0.5rem" }}>Email</h4>
                    <p style={{ margin: 0, marginBottom: "0.25rem" }}>
                      <a href="mailto:officialmutuku@gmail.com" style={{ color: "#1a365d", textDecoration: "none" }}>
                        officialmutuku@gmail.com
                      </a>
                    </p>
                    <p style={{ margin: 0, color: "#666", fontSize: "0.9rem" }}>
                      We typically respond within 2-4 hours
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                  <div
                    style={{
                      background: "#1a365d",
                      color: "white",
                      padding: "0.75rem",
                      borderRadius: "50%",
                      fontSize: "1.2rem",
                      minWidth: "50px",
                      textAlign: "center",
                    }}
                  >
                    📞
                  </div>
                  <div>
                    <h4 style={{ color: "#1a365d", marginBottom: "0.5rem" }}>Phone</h4>
                    <p style={{ margin: 0, marginBottom: "0.25rem" }}>
                      <a href="tel:+254700123456" style={{ color: "#1a365d", textDecoration: "none" }}>
                        +254 758 251 399
                      </a>
                    </p>
                    <p style={{ margin: 0, color: "#666", fontSize: "0.9rem" }}>Available 24/7 for emergencies</p>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                  <div
                    style={{
                      background: "#0a2540",
                      color: "white",
                      padding: "0.75rem",
                      borderRadius: "50%",
                      fontSize: "1.2rem",
                      minWidth: "50px",
                      textAlign: "center",
                    }}
                  >
                    📍
                  </div>
                  <div>
                    <h4 style={{ color: "#0a2540", marginBottom: "0.5rem" }}>Office Location</h4>
                    <p style={{ margin: 0, lineHeight: "1.6" }}>
                      Musa & Musa Advocates
                      <br />
                      ABC Place, 5th Floor
                      <br />
                      Waiyaki Way, Westlands
                      <br />
                      Nairobi, Kenya
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                  <div
                    style={{
                      background: "#1a365d",
                      color: "white",
                      padding: "0.75rem",
                      borderRadius: "50%",
                      fontSize: "1.2rem",
                      minWidth: "50px",
                      textAlign: "center",
                    }}
                  >
                    🕒
                  </div>
                  <div>
                    <h4 style={{ color: "#1a365d", marginBottom: "0.5rem" }}>Office Hours</h4>
                    <div style={{ color: "#666", fontSize: "0.95rem" }}>
                      <p style={{ margin: "0.25rem 0" }}>Monday - Friday: 8:00 AM - 6:00 PM</p>
                      <p style={{ margin: "0.25rem 0" }}>Saturday: 9:00 AM - 2:00 PM</p>
                      <p style={{ margin: "0.25rem 0" }}>Sunday: Closed</p>
                      <p style={{ margin: "0.5rem 0 0", fontSize: "0.85rem", fontStyle: "italic" }}>
                        Emergency consultations available by appointment
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Card */}
            <div className="card">
              <h3 style={{ color: "#1a365d", marginBottom: "1rem" }}>Find Our Office</h3>
              <div
                style={{
                  background: "linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)",
                  height: "250px",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#666",
                  border: "2px dashed #cbd5e0",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div style={{ textAlign: "center", zIndex: 1 }}>
                  <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🗺️</div>
                  <h4 style={{ color: "#1a365d", marginBottom: "0.5rem" }}>Interactive Map</h4>
                  <p style={{ margin: 0, fontSize: "0.9rem" }}>
                    ABC Place, Waiyaki Way
                    <br />
                    Westlands, Nairobi
                  </p>
                  <button
                    style={{
                      marginTop: "1rem",
                      padding: "0.5rem 1rem",
                      background: "#1a365d",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                    onClick={() => window.open("https://maps.google.com/?q=ABC+Place+Waiyaki+Way+Nairobi", "_blank")}
                  >
                    Open in Google Maps
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contact Section */}
        <div
          style={{
            background: "linear-gradient(135deg, #e53e3e 0%, #c53030 100%)",
            color: "white",
            padding: "3rem 2rem",
            borderRadius: "15px",
            textAlign: "center",
            marginTop: "4rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🚨</div>
            <h3 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Legal Emergency?</h3>
            <p style={{ fontSize: "1.1rem", marginBottom: "2rem", opacity: "0.9" }}>
              If you're facing an urgent legal matter that requires immediate attention, don't wait. Our emergency line
              is available 24/7.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }} className="emergency-buttons">
              <a
                href="tel:+254711000999"
                style={{
                  background: "white",
                  color: "#e53e3e",
                  padding: "1rem 2rem",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: "600",
                  fontSize: "1.1rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                📞 Emergency: +254 758 251 399
              </a>
              <a
                href="mailto:officialmutuku@gmail.com"
                style={{
                  background: "rgba(255,255,255,0.2)",
                  color: "white",
                  padding: "1rem 2rem",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: "600",
                  border: "2px solid white",
                }}
              >
                📧 Emergency Email
              </a>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div style={{ marginTop: "4rem" }}>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="grid grid-2" style={{ gap: "2rem" }}>
            <div className="card">
              <h4 style={{ color: "#1a365d", marginBottom: "1rem" }}>How quickly will you respond to my inquiry?</h4>
              <p style={{ color: "#666", margin: 0 }}>
                We typically respond to all inquiries within 2-4 hours during business days. For urgent matters, please
                call our emergency line.
              </p>
            </div>

            <div className="card">
              <h4 style={{ color: "#1a365d", marginBottom: "1rem" }}>Do you offer free consultations?</h4>
              <p style={{ color: "#666", margin: 0 }}>
                Yes, we offer a free 30-minute initial consultation to discuss your legal needs and determine how we can
                best assist you.
              </p>
            </div>

            <div className="card">
              <h4 style={{ color: "#1a365d", marginBottom: "1rem" }}>
                What information should I include in my message?
              </h4>
              <p style={{ color: "#666", margin: 0 }}>
                Please provide as much detail as possible about your legal situation, including relevant dates, parties
                involved, and any specific questions you have.
              </p>
            </div>

            <div className="card">
              <h4 style={{ color: "#1a365d", marginBottom: "1rem" }}>Is my information confidential?</h4>
              <p style={{ color: "#666", margin: 0 }}>
                Absolutely. All communications are protected by attorney-client privilege and we maintain strict
                confidentiality of all client information.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .contact-grid {
            gap: 2rem !important;
          }
          
          .form-grid,
          .form-grid-2 {
            grid-template-columns: 1fr !important;
          }
          
          .emergency-buttons {
            flex-direction: column;
            align-items: center;
          }
          
          .emergency-buttons a {
            width: 100%;
            max-width: 300px;
            justify-content: center;
          }
          
          .faq-grid {
            grid-template-columns: 1fr !important;
          }
        }
        
        @media (max-width: 480px) {
          .emergency-buttons a {
            font-size: 1rem !important;
            padding: 0.875rem 1.5rem !important;
          }
        }
        
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
