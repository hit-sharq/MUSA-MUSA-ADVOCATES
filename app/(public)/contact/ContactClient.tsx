"use client"

import ContactForm from "@/components/ContactForm"

export default function ContactClient() {
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
          <ContactForm />

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
                      6076 Rhapta Road
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
                  height: "300px",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.819469367092!2d36.79876907347002!3d-1.256827998707519!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1715e2e96eed%3A0x8064a5c24a30b2d!2sRhapta%20Rd%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1706745600000!5m2!1sen!2ske"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location Map"
                ></iframe>
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
      `}</style>
    </div>
  )
}

