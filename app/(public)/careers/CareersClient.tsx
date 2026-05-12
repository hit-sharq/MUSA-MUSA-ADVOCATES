"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

interface Career {
  id: string
  slug: string
  title: string
  department: string
  location: string
  type: string
  description: string
  requirements: string
  published: boolean
}

export default function CareersClient() {
  const [careers, setCareers] = useState<Career[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCareers()
  }, [])

  const fetchCareers = async () => {
    try {
      const response = await fetch("/api/careers")
      const data = await response.json()
      setCareers(data)
    } catch (error) {
      console.error("Error fetching careers:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="section">
      <div className="container">
        <h1 className="section-title">Careers</h1>
        <p className="section-subtitle">
          Join our team of dedicated legal professionals. We offer opportunities for growth,
          professional development, and the chance to work on challenging legal matters.
        </p>

        {loading ? (
          <div className="text-center" style={{ padding: "4rem" }}>
            <div className="spinner mx-auto mb-4" />
            <p className="text-navy/70">Loading career opportunities...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {careers.map((career, index) => (
              <motion.div
                key={career.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-brand/10 transition-all duration-300"
              >
                <div className="p-8">
                  <div className="flex gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full bg-brand/10 text-brand-800 text-xs font-semibold">
                      {career.department}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-navy/10 text-navy text-xs font-semibold">
                      {career.type}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-2 group-hover:text-brand-800 transition-colors">
                    {career.title}
                  </h3>
                  <p className="text-brand-800 text-sm mb-3 flex items-center gap-2">
                    📍 {career.location}
                  </p>
                  <p className="text-navy/70 text-sm leading-relaxed line-clamp-3 mb-6">
                    {career.description}
                  </p>
<Link
  href={`/careers/${career.slug}`}
  className="inline-flex items-center text-brand-800 font-semibold text-sm group"
>
  <span>View Details</span>
  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
</Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {careers.length === 0 && !loading && (
          <div className="card text-center py-16">
            <h3 className="text-navy mb-3">No Current Openings</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              We don&apos;t have any open positions at the moment. Please check back later or
              submit your resume for future consideration.
            </p>
            <Link href="/contact" className="inline-block bg-gradient-to-r from-navy to-navy-800 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              Submit Your Resume
            </Link>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="relative inline-block">
            <div className="absolute -top-10 -right-10 w-full h-full bg-gradient-to-br from-brand to-brand-800 rounded-3xl opacity-20 blur-xl" />
            <div className="relative bg-gradient-to-br from-navy to-navy-800 rounded-3xl p-10 text-white max-w-4xl">
              <h3 className="text-2xl font-bold mb-6">Why Join Us?</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <div className="text-3xl mb-2">💼</div>
                  <h4 className="font-bold mb-2">Professional Growth</h4>
                  <p className="opacity-80 text-sm">Continuous learning and career advancement opportunities</p>
                </div>
                <div>
                  <div className="text-3xl mb-2">⚖️</div>
                  <h4 className="font-bold mb-2">Challenging Work</h4>
                  <p className="opacity-80 text-sm">Work on diverse and intellectually stimulating legal cases</p>
                </div>
                <div>
                  <div className="text-3xl mb-2">🤝</div>
                  <h4 className="font-bold mb-2">Team Culture</h4>
                  <p className="opacity-80 text-sm">Collaborative and supportive work environment</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
