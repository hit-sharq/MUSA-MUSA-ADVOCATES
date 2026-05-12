"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"

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
    <div className="card relative">
      {isSubmitting && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-xl">
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-10 h-10 border-4 border-brand/30 border-t-brand rounded-full mx-auto mb-3"
            />
            <p className="text-navy font-semibold">Sending your message...</p>
          </div>
        </div>
      )}

      <div className={isSubmitting ? "opacity-60 pointer-events-none" : ""}>
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-navy mb-2">Send Us a Message</h3>
          <p className="text-gray-600">Fill out the form below and we&apos;ll get back to you within 24 hours.</p>
        </div>

        {submitStatus === "success" && (
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl mb-6 text-center">
            <div className="text-3xl mb-2">✅</div>
            <h4 className="text-xl font-bold mb-2">Message Sent Successfully!</h4>
            <p className="opacity-90">
              Thank you for contacting us. We&apos;ll review your message and respond within 24 hours.
            </p>
          </div>
        )}

        {submitStatus === "error" && (
          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-xl mb-6 text-center">
            <div className="text-3xl mb-2">❌</div>
            <h4 className="text-xl font-bold mb-2">Error Sending Message</h4>
            <p className="opacity-90">
              {errorMessage || "There was an error sending your message. Please try again or contact us directly."}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-navy/80 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-brand/20 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all bg-white"
                placeholder="Enter your full name"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-navy/80 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-brand/20 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all bg-white"
                placeholder="Enter your email address"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-navy/80 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-brand/20 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all bg-white"
                placeholder="+254 700 000 000"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-semibold text-navy/80 mb-2">
                Company/Organization
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-brand/20 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all bg-white"
                placeholder="Your company name (optional)"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-semibold text-navy/80 mb-2">
              Legal Matter *
            </label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-brand/20 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all bg-white"
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

          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-navy/80 mb-2">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-brand/20 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all resize-none bg-white"
              placeholder="Please describe your legal situation in detail. Include any relevant dates, parties involved, and specific questions you have..."
              rows={6}
              disabled={isSubmitting}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-navy to-navy-800 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <span>Sending Message...</span>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
              </>
            ) : (
              "Send Message"
            )}
          </button>
        </form>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
          <p className="mb-0">
            🔒 Your information is secure and confidential. We respect attorney-client privilege and will never share your details with third parties.
          </p>
        </div>
      </div>
    </div>
  )
}
