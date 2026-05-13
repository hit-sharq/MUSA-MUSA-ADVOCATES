"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Users, Award, Star } from "lucide-react"
import "./team.css"
import { TeamMemberSkeleton } from "@/components/Skeleton"

interface TeamMember {
  id: string
  slug: string
  name: string
  title: string
  bio: string
  image: string | null
  order: number
}

const stats = [
  { value: "12", label: "Expert Attorneys", icon: Users },
  { value: "50+", label: "Years Combined", icon: Award },
  { value: "15+", label: "Practice Areas", icon: Star },
]

export default function TeamClient() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const teamRef = useRef(null)
  const isTeamInView = useInView(teamRef, { once: true, margin: "-100px" })

  useEffect(() => {
    fetchTeamMembers()
  }, [])

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch("/api/team-members")
      const data = await response.json()
      setTeamMembers(data.sort((a: TeamMember, b: TeamMember) => a.order - b.order))
    } catch (error) {
      console.error("Error fetching team members:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="team-page">
      {/* Hero Section */}
      <section className="team-hero">
        <motion.div
          className="team-hero-orb"
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <div className="team-hero-content">
          <div className="team-hero-badge">
            <Users className="w-4 h-4" />
            <span>Our Team</span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="team-hero-title"
          >
            Meet Our <span>Attorneys</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="team-hero-subtitle"
          >
            A diverse team of seasoned legal professionals united by a shared commitment to justice, excellence, and client success.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link href="/contact" className="team-hero-btn-primary">
              <span>Schedule Consultation</span>
            </Link>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Stats */}
      <motion.section
        ref={teamRef}
        className="team-stats"
        initial={{ opacity: 0 }}
        animate={isTeamInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="team-stats-grid">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isTeamInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="team-stat-item"
                >
                  <div className="team-stat-value">
                    <Icon className="w-6 h-6" />
                    {stat.value}
                  </div>
                  <div className="team-stat-label">{stat.label}</div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.section>

      {/* Team Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand/10 border border-brand/20 rounded-full mb-6">
              <Award className="w-4 h-4 text-brand-dark fill-brand-dark" />
              <span className="text-sm font-bold text-brand-dark uppercase tracking-wider">Our Attorneys</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-navy mb-5">
              Legal Experts You Can Trust
            </h2>
            <p className="text-xl text-navy/70 max-w-2xl mx-auto">
              Experienced advocates dedicated to protecting your rights and achieving the best outcomes
            </p>
          </motion.div>

          {loading ? (
            <div className="team-grid">
              {[...Array(6)].map((_, i) => (
                <TeamMemberSkeleton key={i} />
              ))}
            </div>
          ) : teamMembers.length === 0 ? (
            <div className="card text-center py-16">
              <h3 className="text-navy mb-3">Team Coming Soon</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                We are currently updating our team profiles. Please check back soon or contact us directly.
              </p>
            </div>
          ) : (
            <div className="team-grid">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  whileHover={{ y: -10 }}
                  className="team-card"
                >
                  {/* Image */}
                  <div className="team-card-image">
                    <Image
                      src={member.image || "/placeholder.svg?height=300&width=300"}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="team-card-image-overlay" />
                    <div className="team-card-name">
                      <h3>{member.name}</h3>
                      <p className="team-card-title">{member.title}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="team-card-content">
                    <div className="team-card-bio">
                      <p className="line-clamp-3">{member.bio}</p>
                      <Link href={`/team/${member.slug}`} className="team-card-link">
                        <span>View Full Profile</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="team-cta"
          >
            <Link href="/contact" className="team-cta-btn">
              <Star className="w-5 h-5" />
              <span>Join Our Team</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="team-bottom-cta">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            Need Legal Assistance?
          </h2>
          <p className="text-navy/70 mb-8 text-lg">
            Our team is ready to help you navigate your legal challenges with expertise and care.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-brand to-brand-dark text-navy font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <span>Get Your Free Consultation</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
