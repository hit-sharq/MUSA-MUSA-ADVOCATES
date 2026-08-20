"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Shield,
  Target,
  Eye,
  Heart,
  Award,
  Users,
  Clock,
  Globe,
  Building2,
  Scale,
  Map,
  ChevronRight,
} from "lucide-react"

interface PracticeArea {
  id: string
  slug: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }> | null
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
  {
    icon: Users,
    title: "Collaboration",
    description: "We work together as a team and with our clients to achieve the best possible outcomes.",
  },
  {
    icon: Clock,
    title: "Reliability",
    description: "Our clients can count on us to deliver consistent, dependable legal representation.",
  },
]

const memberships = [
  { name: "Law Society of Kenya", icon: Building2 },
  { name: "Kenya Association of Criminal Lawyers", icon: Scale },
  { name: "International Bar Association", icon: Globe },
  { name: "East Africa Law Society", icon: Map },
]

export default function AboutPage() {
  const [practiceAreas, setPracticeAreas] = useState<PracticeArea[]>([])
  const [areasLoading, setAreasLoading] = useState(true)

  useEffect(() => {
    fetchPracticeAreas()
  }, [])

  const fetchPracticeAreas = async () => {
    try {
      const response = await fetch("/api/practice-areas")
      const data = await response.json()
      setPracticeAreas(data.slice(0, 6))
    } catch (error) {
      console.error("Error fetching practice areas:", error)
    } finally {
      setAreasLoading(false)
    }
  }

  return (
    <div className="overflow-x-hidden">
      {/* HERO — distinct, editorial About hero */}
      <section className="relative bg-gradient-to-b from-brand/10 via-white to-white pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-sm text-navy/50 mb-8"
          >
            <Link href="/" className="hover:text-brand-800 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-navy/80 font-medium">About</span>
          </motion.nav>

          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand/15 border border-brand/25 rounded-full mb-6">
                <Shield className="w-4 h-4 text-brand-800" />
                <span className="text-sm font-bold text-brand-800 uppercase tracking-wider">Our Firm</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy leading-tight mb-6">
                About Musa &amp; Musa <span className="text-brand-800">Advocates</span>
              </h1>

              <p className="text-lg text-navy/70 leading-relaxed mb-8 max-w-xl">
                A premier Nairobi law firm built on a simple principle: clear, strategic counsel delivered with
                integrity, precision, and an unwavering dedication to our clients&apos; success.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-navy to-navy-200 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Schedule Consultation
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/team"
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-navy font-semibold border-2 border-navy/15 hover:border-brand rounded-xl transition-all duration-300"
                >
                  Meet The Team
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-white/60">
                <Image
                  src="/mm.jpg"
                  alt="Musa & Musa Advocates"
                  width={640}
                  height={720}
                  className="w-full h-auto object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent" />
              </div>

              <div className="absolute -bottom-5 left-6 bg-white rounded-2xl shadow-xl border border-brand/15 px-6 py-4">
                <p className="text-2xl font-extrabold text-navy leading-none">Est. 2010</p>
                <p className="text-xs font-medium text-navy/60 mt-1">Nairobi, Kenya</p>
              </div>

              <div className="absolute -top-5 -right-3 w-28 h-28 rounded-full bg-brand/20 blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-brand/10">
                <Image
                  src="/favicon.ico"
                  alt="Musa & Musa Advocates Office"
                  width={600}
                  height={450}
                  className="w-full h-auto object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent" />
              </div>
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-5 py-3 rounded-xl shadow-lg border border-brand/10">
                <p className="text-sm font-semibold text-navy">Trusted Counsel</p>
                <p className="text-xs text-navy/60">Since 2010</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand/10 border border-brand/20 rounded-full mb-6">
                <Shield className="w-4 h-4" />
                <span className="text-sm font-semibold text-navy">Who We Are</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6 leading-tight">Our Story</h2>

              <p className="text-lg text-navy/70 leading-relaxed mb-5">
                At Musa &amp; Musa Advocates, legal practice is defined by meticulous responsibility, precision, and
                trust. Our work is predicated on a simple principle: providing clear, strategic legal counsel to
                protect our clients&apos; interests and advance their objectives.
              </p>
              <p className="text-lg text-navy/70 leading-relaxed mb-5">
                Based in the heart of Nairobi, we advise and partner with corporations, financial institutions,
                public bodies, and private clients across a broad range of complex legal matters — from Corporate and
                Commercial Law to Dispute Resolution, Real Estate, Banking and Finance, and Regulatory Advisory.
              </p>
              <p className="text-lg font-medium text-navy">
                Our clients trust us with matters that demand sound judgment, discretion, and exacting legal
                standards. We take that responsibility seriously.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Our Mission",
                description:
                  "To provide accessible, high-quality legal services that protect our clients' interests while upholding the highest standards of professional ethics and integrity. We strive to be the legal partner our clients can trust.",
                icon: Target,
                color: "from-brand to-brand-800",
              },
              {
                title: "Our Vision",
                description:
                  "To be recognized as one of Kenya's trusted law firms, known for excellence in legal practice, commitment to justice, and unwavering dedication to our clients' success.",
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
                className="bg-gradient-to-br from-white to-brand/5 rounded-3xl p-10 shadow-lg border border-brand/10 hover:border-brand/30 hover:shadow-2xl transition-all duration-300"
              >
                <motion.div
                  whileHover={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.5 }}
                  className={`w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br ${card.color} mb-6`}
                >
                  <card.icon className="w-6 h-6 text-white" />
                </motion.div>

                <h3 className="text-2xl font-bold text-navy mb-4">{card.title}</h3>
                <p className="text-base text-navy/70 leading-relaxed">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-24 bg-brand/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand/10 border border-brand/20 rounded-full mb-6">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-bold text-brand-800 uppercase tracking-wider">Our Values</span>
            </div>
            <h2 className="text-4xl font-bold text-navy tracking-tight mb-4">Principles That Guide Us</h2>
            <p className="text-xl text-navy/70 max-w-2xl mx-auto">
              The core values that drive every decision we make and every case we handle
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -12, scale: 1.02 }}
                  className="bg-white rounded-3xl p-8 shadow-lg border border-brand/10 hover:border-brand/30 hover:shadow-2xl transition-all duration-300 text-center"
                >
                  <motion.div
                    whileHover={{ rotate: [0, -8, 8, 0] }}
                    transition={{ duration: 0.5 }}
                    className="w-14 h-14 flex items-center justify-center rounded-xl bg-brand/10 mb-5 mx-auto"
                  >
                    <Icon className="w-6 h-6 text-brand-800" />
                  </motion.div>

                  <h3 className="text-xl font-bold text-navy mb-3">{value.title}</h3>
                  <p className="text-base text-navy/60 leading-relaxed">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* PRACTICE AREAS OVERVIEW */}
      <section className="py-24 bg-gradient-to-b from-brand/5 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand/10 border border-brand/20 rounded-full mb-6">
              <Scale className="w-4 h-4" />
              <span className="text-sm font-bold text-brand-800 uppercase tracking-wider">What We Do</span>
            </div>
            <h2 className="text-3xl font-bold text-navy tracking-tight mb-4">Our Practice Areas</h2>
            <p className="text-base text-navy/60 max-w-xl mx-auto">
              Comprehensive legal services tailored to meet your specific needs with expertise and precision
            </p>
          </motion.div>

          {areasLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-44 bg-white rounded-3xl p-8 shadow-lg border border-brand/10 animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {practiceAreas.map((area, index) => (
                <motion.div
                  key={area.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  whileHover={{ y: -8 }}
                  className="group flex flex-col h-full bg-white rounded-3xl p-8 shadow-lg border border-brand/10 hover:border-brand/30 hover:shadow-2xl transition-all duration-300"
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-brand/20 to-brand/10 mb-4 group-hover:scale-110 transition-transform duration-300">
                    {area.icon ? <area.icon className="w-6 h-6 text-brand-800" /> : <span className="text-xl">⚖️</span>}
                  </div>
                  <h3 className="text-lg font-semibold text-navy mb-2 group-hover:text-brand-800 transition-colors">
                    {area.title}
                  </h3>
                  <p className="text-base text-navy/60 leading-relaxed mb-6 flex-grow line-clamp-3">{area.description}</p>
                  <Link
                    href={`/practice-areas/${area.slug}`}
                    className="inline-flex items-center text-brand-800 font-semibold text-sm group/link mt-auto"
                  >
                    <span>Read More</span>
                    <span className="ml-2 group-hover/link:translate-x-1 transition-transform">→</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-12"
          >
            <Link
              href="/practice-areas"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-navy to-navy-200 text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300"
            >
              <span>View All Practice Areas</span>
              <span>→</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* PROFESSIONAL MEMBERSHIPS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand/10 border border-brand/20 rounded-full mb-6">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-bold text-brand-800 uppercase tracking-wider">
                Professional Affiliations
              </span>
            </div>
            <h2 className="text-3xl font-bold text-navy tracking-tight mb-4">Recognized &amp; Accredited</h2>
            <p className="text-base text-navy/60 max-w-xl mx-auto">
              We are proud members of Kenya&apos;s and Africa&apos;s leading legal professional bodies
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-6">
            {memberships.map((membership, index) => (
              <motion.div
                key={membership.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-brand/10 min-w-[200px] text-center transition-all duration-300"
              >
                <membership.icon className="w-8 h-8 text-brand-800 mx-auto mb-3" />
                <p className="font-medium text-navy text-sm">{membership.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative py-28 bg-gradient-to-br from-navy via-navy-200 to-navy overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to Discuss Your Legal Needs?
            </h2>
            <p className="text-lg text-white/80 max-w-xl mx-auto mb-10 leading-relaxed">
              Contact us today for a free consultation and let our experienced team guide you through your legal
              journey with confidence.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-brand to-brand-800 text-navy font-bold text-lg rounded-xl shadow-2xl hover:shadow-brand/50 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10">Schedule Consultation</span>
                <motion.span
                  className="relative z-10"
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  →
                </motion.span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </Link>

              <Link
                href="/practice-areas"
                className="inline-flex items-center gap-3 px-10 py-5 text-white font-semibold border-2 border-white/20 hover:border-brand hover:bg-white/5 rounded-xl backdrop-blur-sm transition-all duration-300"
              >
                <span>Explore Practice Areas</span>
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>
    </div>
  )
}
