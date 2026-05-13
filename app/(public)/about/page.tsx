"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Shield, Target, Eye, Heart, Award, Users, Clock, Globe, Briefcase } from "lucide-react"

interface PracticeArea {
  id: string
  slug: string
  title: string
  description: string
  icon: string | null
  order: number
}

const values = [
  {
    icon: Shield,
    title: "Integrity",
    description: "We uphold the highest ethical standards in all our dealings, building lasting trust with every client.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We pursue excellence in every aspect of our legal practice, delivering outstanding results consistently.",
  },
  {
    icon: Eye,
    title: "Justice",
    description: "We are committed to justice and fairness, protecting our clients' rights with unwavering dedication.",
  },
  {
    icon: Heart,
    title: "Client Focus",
    description: "Our clients' needs are at the heart of everything we do, ensuring personalized, responsive service.",
  },
]

const memberships = [
  { name: "Law Society of Kenya", icon: "⚖️" },
  { name: "Kenya Association of Criminal Lawyers", icon: "🏛️" },
  { name: "International Bar Association", icon: "🌍" },
  { name: "East Africa Law Society", icon: "🌐" },
]

const stats = [
  { value: "15+", label: "Years Experience", icon: Clock },
  { value: "500+", label: "Cases Won", icon: Award },
  { value: "98%", label: "Client Satisfaction", icon: Users },
  { value: "24/7", label: "Support Available", icon: Globe },
]

export default function AboutPage() {
  const [mounted, setMounted] = useState(false)
  const [practiceAreas, setPracticeAreas] = useState<PracticeArea[]>([])
  const statsRef = useRef(null)
  const valuesRef = useRef(null)
  const areStatsInView = useInView(statsRef, { once: true, margin: "-100px" })
  const areValuesInView = useInView(valuesRef, { once: true, margin: "-100px" })

  useEffect(() => {
    setMounted(true)
    fetchPracticeAreas()
  }, [])

  const fetchPracticeAreas = async () => {
    try {
      const response = await fetch("/api/practice-areas")
      const data = await response.json()
      setPracticeAreas(data.slice(0, 6))
    } catch (error) {
      console.error("Error fetching practice areas:", error)
    }
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white">
        <section className="min-h-[80vh] bg-navy flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-brand/30 border-t-brand rounded-full animate-spin" />
        </section>
      </div>
    )
  }

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-orb" />
        <div className="about-hero-orb" />

        <div className="about-hero-content">
          <div className="about-badge">
            <div className="about-badge-dot" />
            <span>Est. 2010</span>
          </div>

          <h1>
            Musa & Musa <span>Advocates</span>
          </h1>

          <p>
            A premier law firm committed to delivering exceptional legal services with integrity, professionalism, and an unwavering dedication to justice.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link href="/contact" className="about-btn-primary">
              <span>Schedule Consultation</span>
              <span>→</span>
            </Link>
            <Link href="/practice-areas" className="about-btn-secondary">
              <span>Our Practice Areas</span>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Stats Counter */}
      <motion.section
        ref={statsRef}
        className="about-stats"
        initial={{ opacity: 0 }}
        animate={areStatsInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="about-stats-bg" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="about-stats-grid">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={areStatsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="about-stat-item"
                >
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Icon className="w-5 h-5 text-brand" />
                    <motion.div
                      className="about-stat-value"
                      initial={{ scale: 0.5 }}
                      animate={areStatsInView ? { scale: 1 } : {}}
                      transition={{ duration: 0.8, delay: index * 0.1 + 0.2, type: "spring" }}
                    >
                      {stat.value}
                    </motion.div>
                  </div>
                  <div className="about-stat-label">{stat.label}</div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.section>

      {/* Firm Overview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="about-overview-grid">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="about-section-header">
                <Shield className="w-4 h-4" />
                <span>Who We Are</span>
              </div>

              <h2 className="about-section-title">
                Trusted Legal Counsel in Kenya
              </h2>

              <p className="about-content-text">
                At Musa & Musa Advocates, legal practice is defined by meticulous responsibility, precision, and trust. Our work is predicated on a simple principle: providing clear, strategic legal counsel to protect our clients' interests and advance their objectives.
              </p>
              <p className="about-content-text">
                Based in the heart of Nairobi, we advise and partner with corporations, financial institutions, public bodies, and private clients across a broad range of complex legal matters. Our team brings deep experience in Corporate and Commercial Law, Dispute Resolution, Real Estate, Banking and Finance, and Regulatory Advisory.
              </p>
              <p className="about-content-text font-medium text-navy">
                Our clients trust us with matters that demand sound judgment, discretion, and exacting legal standards. We take that responsibility seriously.
              </p>

              <div className="about-values-row">
                {[
                  { icon: "⚖️", label: "Justice" },
                  { icon: "✦", label: "Integrity" },
                  { icon: "★", label: "Excellence" },
                ].map((pillar) => (
                  <div key={pillar.label} className="about-value-item">
                    <span className="about-value-icon">{pillar.icon}</span>
                    <div className="about-value-label">{pillar.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="about-overview-image"
            >
              <div className="about-overview-image-accent" />
              <Image
                src="/Musa.jpg"
                alt="Musa & Musa Advocates Office"
                width={600}
                height={450}
                className="w-full h-auto object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-sm px-6 py-3 rounded-xl shadow-lg border border-brand/10 z-10">
                <p className="text-sm font-semibold text-navy">Est. 2010</p>
                <p className="text-xs text-navy/70">Nairobi, Kenya</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="about-mission-vision">
            {[
              {
                title: "Our Mission",
                description: "To provide accessible, high-quality legal services that protect our clients' interests while upholding the highest standards of professional ethics and integrity. We strive to be the legal partner our clients can trust.",
                icon: Target,
                color: "from-brand to-brand-dark",
              },
              {
                title: "Our Vision",
                description: "To be recognized as one of Kenya's trusted law firms, known for excellence in legal practice, commitment to justice, and unwavering dedication to our clients' success.",
                icon: Eye,
                color: "from-navy to-navy-200",
              },
            ].map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                whileHover={{ y: -8 }}
                className="about-mv-card"
              >
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className={`about-mv-icon bg-gradient-to-br ${card.color}`}
                >
                  <card.icon className="w-8 h-8 text-white" />
                </motion.div>

                <h3 className="about-mv-title">{card.title}</h3>
                <p className="about-mv-text">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-white" ref={valuesRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="about-section-header">
              <Shield className="w-4 h-4" />
              <span>Our Values</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-navy mb-5">
              Principles That Guide Us
            </h2>
            <p className="text-xl text-navy/70 max-w-2xl mx-auto">
              The core values that drive every decision we make and every case we handle
            </p>
          </motion.div>

          <div className="about-values-grid">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={areValuesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -12, scale: 1.02 }}
                  className="about-value-card"
                >
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                    className="about-value-card-icon"
                  >
                    <Icon className="w-8 h-8 text-brand-dark" />
                  </motion.div>

                  <h3 className="about-value-card-title">{value.title}</h3>
                  <p className="about-value-card-text">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Practice Areas Overview */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-brand/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-brand-dark/5 rounded-full blur-2xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="about-section-header">
              <span>What We Do</span>
            </div>
            <h2 className="about-section-title">
              Our Practice Areas
            </h2>
            <p className="about-section-subtitle">
              Comprehensive legal services tailored to meet your specific needs with expertise and precision
            </p>
          </motion.div>

          <div className="about-practice-grid">
            {practiceAreas.map((area, index) => (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                whileHover={{ y: -8 }}
                className="about-practice-card"
              >
                <div className="about-practice-icon">
                  {area.icon || "⚖️"}
                </div>
                <h3 className="about-practice-title">{area.title}</h3>
                <p className="about-practice-desc">{area.description}</p>
                <div className="mt-4 h-1 w-12 bg-brand/30 rounded-full group-hover:w-full transition-all duration-300" />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-12"
          >
            <Link href="/practice-areas" className="about-btn-primary">
              <span>View All Practice Areas</span>
              <span>→</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Professional Memberships */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="about-section-header">
              <span>Professional Affiliations</span>
            </div>
            <h2 className="about-section-title">
              Recognized & Accredited
            </h2>
            <p className="about-section-subtitle">
              We are proud members of Kenya's and Africa's leading legal professional bodies
            </p>
          </motion.div>

          <div className="about-memberships-grid">
            {memberships.map((membership, index) => (
              <motion.div
                key={membership.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ scale: 1.05 }}
                className="about-membership-item"
              >
                <span className="about-membership-icon">{membership.icon}</span>
                <p className="about-membership-name">{membership.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="about-cta-pattern" />

        <div className="about-cta-content">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="about-cta-title">
              Ready to Discuss Your Legal Needs?
            </h2>
            <p className="about-cta-text">
              Contact us today for a free consultation and let our experienced team guide you through your legal journey with confidence.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Link href="/contact" className="about-btn-primary">
                <span>Schedule Consultation</span>
                <span>→</span>
              </Link>
              <Link href="/practice-areas" className="about-btn-secondary">
                <span>Explore Practice Areas</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
