"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Scale } from "lucide-react"

interface PracticeArea {
  id: string
  slug: string
  title: string
  description: string
  icon: string | null
  order: number
}

export default function PracticeAreasClient() {
  const [practiceAreas, setPracticeAreas] = useState<PracticeArea[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPracticeAreas()
  }, [])

  const fetchPracticeAreas = async () => {
    try {
      const response = await fetch("/api/practice-areas")
      const data = await response.json()
      setPracticeAreas(data)
    } catch (error) {
      console.error("Error fetching practice areas:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="section">
      <div className="container">
        <h1 className="section-title">Our Practice Areas</h1>
        <p className="section-subtitle">
          Comprehensive legal services tailored to meet your specific needs. With experience and a commitment
          to excellence, our dedicated team provides expert representation across various areas of law.
        </p>

        {loading ? (
          <div className="text-center" style={{ padding: "4rem" }}>
            <div className="spinner mx-auto mb-4" />
            <p className="text-navy/70">Loading practice areas...</p>
          </div>
        ) : (
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
                      {area.icon ? (
                        <span className="text-3xl">{area.icon}</span>
                      ) : (
                        <Scale className="w-8 h-8" />
                      )}
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
        )}

        {practiceAreas.length === 0 && !loading && (
          <div className="card text-center py-16">
            <h3 className="text-navy mb-3">Practice Areas Coming Soon</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              We are currently updating our practice areas. Please contact us directly for information about our legal services.
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
              Discuss Your Case
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
