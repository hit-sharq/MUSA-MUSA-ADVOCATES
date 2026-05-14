"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Shield, Scale, Gavel, FileText, Users, Heart } from "lucide-react"
import TestimonialsSection from "@/components/TestimonialsSection"

interface PracticeArea {
  id: string
  title: string
  description: string
  slug: string
}

interface TeamMember {
  id: string
  name: string
  title: string
  bio: string
  image?: string | null
}

interface BlogPost {
  id: string
  title: string
  slug: string
  summary: string
  image?: string | null
  createdAt: string
  published: boolean
}

export default function HomePage() {
  const [practiceAreas, setPracticeAreas] = useState<PracticeArea[]>([])
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [areasRes, teamRes, postsRes] = await Promise.all([
          fetch("/api/practice-areas"),
          fetch("/api/team-members"),
          fetch("/api/blog-posts"),
        ])

        if (areasRes.ok) {
          const areas = await areasRes.json()
          setPracticeAreas(areas.slice(0, 6))
        }
        if (teamRes.ok) {
          const team = await teamRes.json()
          setTeamMembers(team.slice(0, 3))
        }
        if (postsRes.ok) {
          const posts = await postsRes.json()
          setRecentPosts(posts.filter((p: BlogPost) => p.published).slice(0, 3))
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-brand/30 border-t-brand rounded-full mx-auto mb-4"
          />
          <p className="text-navy/70">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden bg-gradient-to-br from-navy via-navy-200 to-navy pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand/10 rounded-full blur-3xl"
            animate={{ x: [0, 30, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-800/10 rounded-full blur-3xl"
            animate={{ x: [0, -20, 0], y: [0, 20, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand/10 border border-brand/20 rounded-full mb-8">
                <Shield className="w-4 h-4 text-brand" />
                <span className="text-sm font-semibold text-brand-800 uppercase tracking-wider">
                  Excellence in Legal Practice
                </span>
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
              >
                <span className="block">MUSA & MUSA</span>
                <span className="block text-brand">ADVOCATES</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg md:text-xl text-white/70 font-semibold tracking-widest uppercase mb-8"
              >
                Duty • Trust • Precision • Justice
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-lg md:text-xl text-white/80 leading-relaxed max-w-xl mb-10"
              >
                A premier law firm committed to delivering exceptional legal services with integrity, professionalism, and an unwavering dedication to justice.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-wrap gap-4 mb-16"
              >
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-brand to-brand-800 text-navy font-bold rounded-xl shadow-lg hover:shadow-brand/50 transition-all duration-300 overflow-hidden"
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
                  className="inline-flex items-center gap-3 px-8 py-4 text-white font-semibold border-2 border-white/30 hover:border-brand rounded-xl hover:bg-white/5 backdrop-blur-sm transition-all duration-300"
                >
                  <span>Our Practice Areas</span>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex items-center gap-12 pt-8 border-t border-white/10"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand mb-1">✦</div>
                  <div className="text-xs text-white/60 uppercase tracking-wider font-medium">Integrity</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand mb-1">⚖</div>
                  <div className="text-xs text-white/60 uppercase tracking-wider font-medium">Justice</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand mb-1">✦</div>
                  <div className="text-xs text-white/60 uppercase tracking-wider font-medium">Excellence</div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                <div className="absolute -top-8 -right-8 w-full h-full bg-gradient-to-br from-brand to-brand-800 rounded-3xl opacity-20 blur-xl" />
                <div className="absolute -bottom-4 -left-4 w-48 h-48 bg-brand/20 rounded-full blur-2xl" />

                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10">
                  <Image
                    src="/mm.jpg"
                    alt="Musa & Musa Advocates"
                    width={600}
                    height={700}
                    className="w-full h-auto object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ABOUT SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/favicon.ico"
                  alt="Musa & Musa Advocates Office"
                  width={600}
                  height={450}
                  className="w-full h-auto object-cover"
                />
              </div>

              <div className="absolute -bottom-8 -right-8 bg-gradient-to-br from-brand to-brand-800 p-6 rounded-2xl shadow-2xl border border-white/10">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-1">⚖</div>
                    <div className="text-xs text-white/80 uppercase tracking-wider font-semibold">Integrity</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-1">★</div>
                    <div className="text-xs text-white/80 uppercase tracking-wider font-semibold">Justice</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-1">✦</div>
                    <div className="text-xs text-white/80 uppercase tracking-wider font-semibold">Excellence</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand/10 rounded-full mb-6">
                <span className="text-sm font-bold text-brand-800 uppercase tracking-wider">
                  About Our Firm
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6 leading-tight">
                A Tradition of <span className="text-brand-800">Legal Excellence</span>
              </h2>

              <p className="text-lg text-navy/70 leading-relaxed mb-5">
                Musa & Musa Advocates is a premier law firm based in Nairobi, Kenya, dedicated to providing exceptional legal services with integrity, professionalism, and a client-centered approach.
              </p>

              <p className="text-lg text-navy/70 leading-relaxed mb-8">
                Our team of experienced advocates is committed to delivering personalized legal solutions tailored to meet the unique needs of each client.
              </p>

              <div className="grid grid-cols-2 gap-5 mb-10">
                {[
                  { icon: "✓", title: "Experienced Team" },
                  { icon: "✓", title: "Client-Focused" },
                  { icon: "✓", title: "Proven Track Record" },
                  { icon: "✓", title: "Ethical Standards" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand to-brand-800 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">{item.icon}</span>
                    </div>
                    <span className="font-semibold text-navy">{item.title}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/about"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-navy to-navy-200 text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300 group"
              >
                <span>Learn More About Us</span>
                <motion.span
                  className="inline-block"
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  →
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* PRACTICE AREAS */}
      <section className="py-24 bg-gradient-to-b from-white to-brand/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand/10 border border-brand/20 rounded-full mb-6">
              <Scale className="w-4 h-4 text-brand-800" />
              <span className="text-sm font-bold text-brand-800 uppercase tracking-wider">
                Our Practice Areas
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-navy mb-5">
              Comprehensive Legal Services
            </h2>

            <p className="text-xl text-navy/70 max-w-2xl mx-auto">
              We provide expert legal representation across a wide range of practice areas
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {practiceAreas.map((area, index) => (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Link href={`/practice-areas/${area.slug}`} className="group block h-full">
                  <div className="h-full bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl border border-brand/10 hover:border-brand/30 transition-all duration-300">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand/20 to-brand/10 flex items-center justify-center text-brand-800 mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Scale className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-navy mb-3 group-hover:text-brand-800 transition-colors">
                      {area.title}
                    </h3>
                    <p className="text-navy/70 leading-relaxed line-clamp-3">
                      {area.description}
                    </p>
                    <div className="mt-6 inline-flex items-center text-brand-800 font-semibold text-sm group-hover:gap-2 transition-all">
                      <span>Learn More</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-center mt-16"
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

      {/* WHY CHOOSE US */}
      <section className="py-24 bg-brand/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand/10 border border-brand/20 rounded-full mb-6">
              <Shield className="w-4 h-4 text-brand-800" />
              <span className="text-sm font-bold text-brand-800 uppercase tracking-wider">
                Why Choose Us
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-navy mb-5">
              Excellence in Legal Representation
            </h2>

            <p className="text-xl text-navy/70 max-w-2xl mx-auto">
              We combine expertise with dedication to deliver exceptional legal outcomes
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="w-6 h-6" />,
                title: "Client-Centered Approach",
                description: "We prioritize our clients' needs and work tirelessly to achieve the best possible outcomes.",
              },
              {
                icon: <Scale className="w-6 h-6" />,
                title: "Experienced Advocates",
                description: "Our team brings years of combined experience in various areas of Kenyan law.",
              },
              {
                icon: <Gavel className="w-6 h-6" />,
                title: "Proven Track Record",
                description: "Successfully handled numerous cases across Kenya with outstanding results.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-3xl p-10 shadow-lg border border-brand/10 hover:border-brand/30 hover:shadow-2xl transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand to-brand-800 flex items-center justify-center text-white mb-6 shadow-lg">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-navy mb-4">{item.title}</h3>
                <p className="text-navy/70 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      {teamMembers.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand/10 border border-brand/20 rounded-full mb-6">
                <Users className="w-4 h-4 text-brand-800" />
                <span className="text-sm font-bold text-brand-800 uppercase tracking-wider">
                  Our Legal Team
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-navy mb-5">
                Meet Our Attorneys
              </h2>

              <p className="text-xl text-navy/70 max-w-2xl mx-auto">
                Our dedicated team of attorneys is ready to fight for your rights
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  whileHover={{ y: -10 }}
                  className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-brand/10 transition-all duration-300"
                >
                  <div className="relative h-72 overflow-hidden">
                    <Image
                      src={member.image || "/placeholder.svg?height=300&width=300"}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
                  </div>
                  <div className="p-8 -mt-16 relative">
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-brand/10">
                      <h3 className="text-2xl font-bold text-navy mb-2">
                        {member.name}
                      </h3>
                      <p className="text-brand-800 font-semibold mb-3">
                        {member.title}
                      </p>
                      <p className="text-navy/70 text-sm line-clamp-3 leading-relaxed mb-4">
                        {member.bio}
                      </p>
                      <Link
                        href="/team"
                        className="inline-flex items-center text-brand-800 font-semibold text-sm group/link"
                      >
                        <span>View Profile</span>
                        <span className="ml-2 group-hover/link:translate-x-1 transition-transform">→</span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="text-center mt-16"
            >
              <Link
                href="/team"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-navy to-navy-200 text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300"
              >
                <span>View All Attorneys</span>
                <span>→</span>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA SECTION */}
      <section className="relative py-32 bg-gradient-to-br from-navy via-navy-200 to-navy overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/2 left-1/4 w-96 h-96 bg-brand/20 rounded-full blur-3xl"
            animate={{ x: [0, 40, 0], y: [0, -40, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Ready to Discuss Your
              <br />
              <span className="text-brand">Legal Matters?</span>
            </h2>

            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
              Contact us today for a consultation and let our experienced team help you achieve the best possible outcome for your case.
            </p>

            <div className="flex flex-wrap justify-center gap-5">
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-brand to-brand-800 text-navy font-bold text-lg rounded-xl shadow-2xl hover:shadow-brand/50 transition-all duration-300 overflow-hidden"
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
                href="/about"
                className="inline-flex items-center gap-4 px-10 py-5 text-white font-semibold border-2 border-white/20 hover:border-brand hover:bg-white/5 rounded-xl backdrop-blur-sm transition-all duration-300"
              >
                <span>Learn More About Us</span>
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* TESTIMONIALS */}
      <TestimonialsSection />
    </>
  )
}