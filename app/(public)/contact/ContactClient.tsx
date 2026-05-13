"use client"

import ContactForm from "@/components/ContactForm"
import { Mail, Phone, MapPin, Clock, Shield, ArrowRight, Send } from "lucide-react"
import { motion } from "framer-motion"

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "info@musadvocates.co.ke",
    href: "mailto:info@musadvocates.co.ke",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+254 758 251 399",
    href: "tel:+254758251399",
  },
  {
    icon: MapPin,
    title: "Office",
    value: "6076 Rhapta Road, Nairobi",
    href: "https://maps.google.com",
  },
  {
    icon: Clock,
    title: "Hours",
    value: "Mon-Fri: 8AM-6PM, Sat: 9AM-2PM",
    href: "#",
  },
]

const faqs = [
  {
    question: "How quickly will you respond to my inquiry?",
    answer: "We typically respond to all inquiries within 2-4 hours during business days. For urgent matters, please call our emergency line.",
  },
  {
    question: "Do you offer free consultations?",
    answer: "Yes, we offer a free 30-minute initial consultation to discuss your legal needs and determine how we can best assist you.",
  },
  {
    question: "What information should I include in my message?",
    answer: "Please provide as much detail as possible about your legal situation, including relevant dates, parties involved, and any specific questions you have.",
  },
  {
    question: "Is my information confidential?",
    answer: "Absolutely. All communications are protected by attorney-client privilege and we maintain strict confidentiality of all client information.",
  },
]

export default function ContactClient() {
  return (
    <div className="contact-page">
      {/* HERO SECTION */}
      <section className="contact-hero">
        <div className="contact-hero-orb" />
        <div className="contact-hero-orb" />
        <div className="contact-hero-geometric" style={{ top: "10%", left: "5%", width: "200px", height: "200px", borderStyle: "solid" }} />
        <div className="contact-hero-geometric" style={{ bottom: "15%", right: "8%", width: "150px", height: "150px", borderStyle: "dashed", transform: "rotate(45deg)" }} />

        <div className="contact-hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="contact-badge">
              <Shield className="w-4 h-4" fill="currentColor" />
              <span>Contact Us</span>
            </div>

            <h1>
              Let&apos;s Discuss Your <span className="highlight">Legal Needs</span>
            </h1>

            <p>
              Ready to take the first step? Get in touch with us today to schedule a consultation and learn how our experienced team can help you achieve the best possible outcome.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <a href="tel:+254758251399" className="contact-btn contact-btn-primary">
                <Phone className="w-5 h-5" />
                <span>Call Now</span>
              </a>
              <a href="mailto:info@musadvocates.co.ke" className="contact-btn contact-btn-secondary">
                <Mail className="w-5 h-5" />
                <span>Send Email</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CONTACT INFO SECTION */}
      <section className="contact-info-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="section-header">
              <MapPin className="w-4 h-4" fill="currentColor" />
              <span>Get In Touch</span>
            </div>
            <h2 className="section-title">Multiple Ways to Reach Us</h2>
            <p className="section-subtitle">
              Choose the most convenient way to contact us. We&apos;re here to help with all your legal needs.
            </p>
          </motion.div>

          <div className="contact-info-grid">
            {contactInfo.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.a
                  key={item.title}
                  href={item.href}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="contact-info-card"
                >
                  <div className="contact-info-icon">
                    <Icon />
                  </div>
                  <div className="contact-info-content">
                    <h3>{item.title}</h3>
                    <p>{item.value}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-brand ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              )
            })}
          </div>
        </div>
      </section>

      {/* CONTACT FORM SECTION */}
      <section className="contact-form-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="contact-form-wrapper">
              <div className="contact-form-header">
                <div className="section-header">
                  <Send className="w-4 h-4" fill="currentColor" />
                  <span>Send a Message</span>
                </div>
                <h3>Let&apos;s Start a Conversation</h3>
                <p>Fill out the form below and we&apos;ll get back to you within 24 hours. All information is kept strictly confidential.</p>
              </div>
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </section>

      {/* MAP SECTION */}
      <section className="map-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="section-header">
              <MapPin className="w-4 h-4" fill="currentColor" />
              <span>Our Location</span>
            </div>
            <h2 className="section-title">Find Us in Nairobi</h2>
            <p className="section-subtitle">
              Located in the heart of Nairobi, we are easily accessible for all your legal needs.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="map-container">
              <div className="map-overlay" />
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.819469367092!2d36.79876907347002!3d-1.256827998707519!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1715e2e96eed%3A0x8064a5c24a30b2d!2sRhapta%20Rd%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1706745600000!5m2!1sen!2ske"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Musa & Musa Advocates Office Location"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="faq-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="section-header">
              <Shield className="w-4 h-4" fill="currentColor" />
              <span>FAQ</span>
            </div>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">
              Quick answers to common questions about contacting our firm
            </p>
          </motion.div>

          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="faq-item"
              >
                <div className="faq-question">
                  <div className="faq-q-mark">Q</div>
                  <h3>{faq.question}</h3>
                </div>
                <p className="faq-answer">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER SECTION */}
      <section className="newsletter-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="newsletter-wrapper">
              <div className="newsletter-icon">
                <Mail className="w-8 h-8" />
              </div>
              <h2 className="newsletter-title">Stay Updated</h2>
              <p className="newsletter-text">
                Subscribe to our newsletter for legal insights, firm updates, and helpful resources delivered directly to your inbox.
              </p>
              <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="newsletter-button newsletter-btn-primary">
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* EMERGENCY SECTION */}
      <section className="emergency-section">
        <div className="emergency-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="emergency-icon">🚨</div>
            <h2 className="emergency-title">Legal Emergency?</h2>
            <p className="emergency-description">
              If you&apos;re facing an urgent legal matter that requires immediate attention, don&apos;t wait. Our emergency line is available 24/7.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="tel:+254758251399" className="emergency-btn emergency-btn-primary">
                <Phone className="w-5 h-5" fill="currentColor" />
                <span>Emergency: +254 758 251 399</span>
              </a>
              <a href="tel:+254758251399" className="emergency-btn emergency-btn-secondary">
                <Phone className="w-5 h-5" />
                <span>Call Now</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
