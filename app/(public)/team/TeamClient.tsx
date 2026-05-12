"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

interface TeamMember {
  id: string
  slug: string
  name: string
  title: string
  bio: string
  image: string | null
  order: number
}

export default function TeamClient() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTeamMembers()
  }, [])

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch("/api/team-members")
      const data = await response.json()
      setTeamMembers(data)
    } catch (error) {
      console.error("Error fetching team members:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="section">
      <div className="container">
        <h1 className="section-title">Our Attorneys</h1>
        <p className="section-subtitle">
          Meet the dedicated professionals who make up our legal team. Each member brings unique expertise and a shared
          commitment to providing exceptional legal representation.
        </p>

        {loading ? (
          <div className="text-center" style={{ padding: "4rem" }}>
            <div className="spinner mx-auto mb-4" />
            <p className="text-navy/70">Loading team members...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                <div className="p-6 -mt-16 relative">
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-brand/10">
                    <h3 className="text-xl font-bold text-navy mb-1">{member.name}</h3>
                    <p className="text-brand-800 font-semibold mb-3 text-sm">{member.title}</p>
                    <p className="text-navy/70 text-sm line-clamp-3 leading-relaxed mb-4">{member.bio}</p>
<Link
  href="/team"
  className="inline-flex items-center text-brand-800 font-semibold text-sm group"
>
  <span>View Profile</span>
  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
</Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {teamMembers.length === 0 && !loading && (
          <div className="card text-center py-16">
            <h3 className="text-navy mb-3">Team Information Coming Soon</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              We are currently updating our team information. Please contact us directly to learn more about our legal professionals.
            </p>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="relative inline-block">
            <div className="absolute -top-8 -right-8 w-full h-full bg-gradient-to-br from-brand to-brand-800 rounded-3xl opacity-20 blur-xl" />
            <Link
              href="/contact"
              className="relative inline-block bg-gradient-to-r from-navy to-navy-800 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Join Our Team
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
