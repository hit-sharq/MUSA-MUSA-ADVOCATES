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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-navy via-navy-200 to-navy">
        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <motion.div
            animate={{ x: [0, 30, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 -left-20 w-96 h-96 bg-brand/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ x: [0, -20, 0], y: [0, 20, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 -right-20 w-80 h-80 bg-brand-dark/20 rounded-full blur-3xl"
          />
        </div>

        {/* Geometric patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border-2 border-brand rounded-lg rotate-12" />
          <div className="absolute bottom-32 right-32 w-24 h-24 border-2 border-brand rounded-full" />
          <div className="absolute top-1/2 left-1/3 w-16 h-16 border-2 border-brand rotate-45" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="text-center max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand/15 border border-brand/20 rounded-full mb-8 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-brand animate-pulse" />
              <span className="text-sm font-bold text-brand-dark uppercase tracking-[0.2em]">Est. 2010</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              <span className="block">Musa & Musa</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand via-brand-dark to-brand">Advocates</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="text-xl md:text-2xl text-white/90 leading-relaxed mb-12 max-w-3xl mx-auto">
              A premier law firm committed to delivering exceptional legal services with integrity, professionalism, and an unwavering dedication to justice.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }} className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Link href="/contact" className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-brand to-brand-dark text-navy font-bold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <span className="relative z-10">Schedule Consultation</span>
                <motion.span initial={{ x: 0 }} whileHover={{ x: 3 }} transition={{ duration: 0.2 }} className="relative z-10">→</motion.span>
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
              </Link>
              <Link href="/practice-areas" className="inline-flex items-center gap-3 px-8 py-4 text-white font-semibold border-2 border-white/20 hover:border-brand hover:bg-white/5 backdrop-blur-sm rounded-xl transition-all duration-300">
                <span>Our Practice Areas</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10" />
      </section>

      {/* Stats Counter */}
      <motion.section ref={statsRef} className="py-16 bg-navy relative overflow-hidden" initial={{ opacity: 0 }} animate={areStatsInView ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 0.6 }}>
        <div className="absolute inset-0 bg-gradient-to-br from-brand/5 via-transparent to-brand-dark/5" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 30 }} animate={areStatsInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: index * 0.1 }} className="text-center group">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Icon className="w-5 h-5 text-brand" />
                    <motion.div className="text-4xl md:text-5xl font-bold text-white" initial={{ scale: 0.5 }} animate={areStatsInView ? { scale: 1 } : {}} transition={{ duration: 0.8, delay: index * 0.1 + 0.2, type: "spring" }}>
                      {stat.value}
                    </motion.div>
                  </div>
                  <div className="text-sm text-white/70 uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.section>

      {/* Firm Overview */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 px-5 py-2 bg-brand/10 rounded-full mb-6">
                <Shield className="w-4 h-4 text-brand-dark fill-brand-dark" />
                <span className="text-sm font-bold text-brand-dark uppercase tracking-wider">Who We Are</span>
              </motion.div>

              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="text-4xl md:text-5xl font-bold text-navy mb-8 leading-tight">
                Trusted Legal Counsel in Kenya
              </motion.h2>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="space-y-6 text-lg text-navy/70 leading-relaxed">
                <p>
                  At Musa & Musa Advocates, legal practice is defined by meticulous responsibility, precision, and trust. Our work is predicated on a simple principle: providing clear, strategic legal counsel to protect our clients' interests and advance their objectives.
                </p>
                <p>
                  Based in the heart of Nairobi, we advise and partner with corporations, financial institutions, public bodies, and private clients across a broad range of complex legal matters. Our team brings deep experience in Corporate and Commercial Law, Dispute Resolution, Real Estate, Banking and Finance, and Regulatory Advisory.
                </p>
                <p className="font-medium text-navy">
                  Our clients trust us with matters that demand sound judgment, discretion, and exacting legal standards. We take that responsibility seriously.
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }} className="mt-10 pt-8 border-t border-brand/10">
                <div className="flex items-center justify-between gap-8">
                  {[
                    { icon: "⚖️", label: "Justice" },
                    { icon: "✦", label: "Integrity" },
                    { icon: "★", label: "Excellence" },
                  ].map((pillar) => (
                    <div key={pillar.label} className="text-center flex-1">
                      <div className="text-3xl mb-2">{pillar.icon}</div>
                      <div className="text-sm font-bold text-navy uppercase tracking-wider">{pillar.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
              <div className="absolute -top-8 -right-8 w-full h-full bg-gradient-to-br from-brand/30 via-brand/10 to-transparent rounded-3xl blur-xl" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-brand/10 group">
                <Image src="/Musa.jpg" alt="Musa & Musa Advocates Office" width={600} height={500} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.6 }} className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-sm px-6 py-3 rounded-xl shadow-lg border border-brand/10">
                  <p className="text-sm font-semibold text-navy">Est. 2010</p>
                  <p className="text-xs text-navy/70">Nairobi, Kenya</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Our Mission",
                description: "To provide accessible, high-quality legal services that protect our clients' interests while upholding the highest standards of professional ethics and integrity.",
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
              <motion.div key={card.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: index * 0.15 }} whileHover={{ y: -8 }} className="group relative bg-white rounded-3xl p-10 shadow-xl border border-brand/10 hover:border-brand/30 transition-all duration-300 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                <div className="relative">
                  <motion.div whileHover={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 0.5 }} className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-6 shadow-lg`}>
                    <card.icon className="w-8 h-8 text-white" />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-navy mb-4">{card.title}</h3>
                  <p className="text-navy/70 leading-relaxed text-lg">{card.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-white" ref={valuesRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand/10 border border-brand/20 rounded-full mb-6">
              <Shield className="w-4 h-4 text-brand-dark fill-brand-dark" />
              <span className="text-sm font-bold text-brand-dark uppercase tracking-wider">Our Values</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold text-navy mb-5">
              Principles That Guide Us
            </h2>
            <p className="text-xl text-navy/70 max-w-2xl mx-auto">
              The core values that drive every decision we make and every case we handle
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div key={value.title} initial={{ opacity: 0, y: 40 }} animate={areValuesInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: index * 0.1 }} whileHover={{ y: -12, scale: 1.02 }} className="group relative bg-gradient-to-b from-white to-gray-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl border border-brand/10 hover:border-brand/30 transition-all duration-300 text-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative">
                    <motion.div whileHover={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 0.5 }} className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand/20 to-brand/10 flex items-center justify-center mx-auto mb-6 group-hover:from-brand/30 group-hover:to-brand/20 transition-all">
                      <Icon className="w-8 h-8 text-brand-dark" />
                    </motion.div>

                    <h3 className="text-xl font-bold text-navy mb-3">{value.title}</h3>
                    <p className="text-navy/70 leading-relaxed text-sm">{value.description}</p>
                  </div>
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
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand/10 border border-brand/20 rounded-full mb-6">
              <span className="text-sm font-bold text-brand-dark uppercase tracking-wider">What We Do</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-navy mb-5">
              Our Practice Areas
            </h2>
            <p className="text-xl text-navy/70 max-w-2xl mx-auto">
              Comprehensive legal services tailored to meet your specific needs with expertise and precision
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {practiceAreas.map((area, index) => (
              <motion.div key={area.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.08 }} whileHover={{ y: -8 }} className="group bg-white rounded-2xl p-6 shadow-md border border-brand/10 hover:border-brand/30 hover:shadow-2xl transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand/20 to-brand/10 flex items-center justify-center mb-4 text-2xl group-hover:scale-110 transition-transform duration-300">
                  {area.icon || "⚖️"}
                </div>
                <h3 className="text-lg font-bold text-navy mb-2">{area.title}</h3>
                <p className="text-navy/70 text-sm leading-relaxed line-clamp-3">{area.description}</p>
                <div className="mt-4 h-1 w-12 bg-brand/30 rounded-full group-hover:w-full transition-all duration-300" />
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.5 }} className="text-center mt-12">
            <Link href="/practice-areas" className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-navy to-navy-800 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <span>View All Practice Areas</span>
              <motion.span initial={{ x: 0 }} whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>→</motion.span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Professional Memberships */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand/10 border border-brand/20 rounded-full mb-6">
              <span className="text-sm font-bold text-brand-dark uppercase tracking-wider">Professional Affiliations</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-navy mb-5">
              Recognized & Accredited
            </h2>
            <p className="text-xl text-navy/70 max-w-2xl mx-auto">
              We are proud members of Kenya's and Africa's leading legal professional bodies
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {memberships.map((membership, index) => (
              <motion.div key={membership.name} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.08 }} whileHover={{ scale: 1.05 }} className="group bg-gradient-to-b from-white to-gray-50 rounded-2xl p-8 shadow-md border border-brand/10 hover:border-brand/30 hover:shadow-xl transition-all duration-300 text-center">
                <motion.div initial={{ scale: 0.8 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.08 + 0.2 }} className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-300">
                  {membership.icon}
                </motion.div>
                <p className="font-bold text-navy text-sm leading-tight">{membership.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-28 bg-gradient-to-br from-navy via-navy-200 to-navy overflow-hidden">
        <div className="absolute inset-0">
          <motion.div animate={{ x: [0, 50, 0], y: [0, 30, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} className="absolute top-10 right-10 w-72 h-72 bg-brand/20 rounded-full blur-3xl" />
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
              Ready to Discuss Your Legal Needs?
            </h2>
            <p className="text-xl text-white/85 mb-12 max-w-2xl mx-auto leading-relaxed">
              Contact us today for a free consultation and let our experienced team guide you through your legal journey with confidence.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Link href="/contact" className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-brand to-brand-dark text-navy font-bold rounded-xl shadow-2xl hover:shadow-brand/50 transition-all duration-300 overflow-hidden">
                <span className="relative z-10">Schedule Consultation</span>
                <motion.span whileHover={{ x: 3 }} transition={{ duration: 0.2 }} className="relative z-10">→</motion.span>
                <div className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
              </Link>

              <Link href="/practice-areas" className="inline-flex items-center gap-3 px-8 py-4 text-white font-semibold border-2 border-white/20 hover:border-brand hover:bg-white/5 backdrop-blur-sm rounded-xl transition-all duration-300">
                <span>Explore Practice Areas</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
