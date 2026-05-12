"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"

interface Testimonial {
  id: string
  clientName: string
  clientTitle?: string
  content: string
  rating: number
  image?: string
  featured: boolean
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const response = await fetch("/api/testimonials")
      if (response.ok) {
        const data = await response.json()
        setTestimonials(data.slice(0, 6))
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? "text-amber-400 fill-amber-400" : "text-gray-300"
        }`}
      />
    ))
  }

  if (isLoading) {
    return (
      <section className="py-24 bg-gradient-to-b from-brand/5 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand/10 rounded-full mb-6">
              <Star className="w-4 h-4 text-brand-800" />
              <span className="text-sm font-bold text-brand-800 uppercase tracking-wider">
                Client Testimonials
              </span>
            </div>
            <div className="flex justify-center items-center h-40">
              <div className="spinner" />
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (testimonials.length === 0) {
    return null
  }

  // Featured testimonial (first one)
  const featured = testimonials[0]
  const rest = testimonials.slice(1)

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-b from-brand/5 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-brand rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-brand-800 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand/10 border border-brand/20 rounded-full mb-6">
            <Star className="w-4 h-4 text-brand-800 fill-brand-800" />
            <span className="text-sm font-bold text-brand-800 uppercase tracking-wider">
              What Our Clients Say
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-5">
            Trusted by Clients Across Kenya
          </h2>

          <p className="text-xl text-navy/70 max-w-2xl mx-auto">
            Don&apos;t just take our word for it - hear from clients who have experienced our legal expertise firsthand
          </p>
        </motion.div>

        {/* Featured Testimonial */}
        {featured && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
            }}
            className="mb-16"
          >
            <div className="relative max-w-4xl mx-auto">
              {/* Gradient background card */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand/10 to-brand/5 rounded-3xl transform rotate-1 scale-105" />

              <div className="relative bg-white rounded-3xl p-10 md:p-14 shadow-2xl border border-brand/10">
                {/* Quote icon */}
                <div className="absolute -top-8 left-10 w-16 h-16 bg-gradient-to-br from-brand to-brand-800 rounded-2xl flex items-center justify-center shadow-lg">
                  <Quote className="w-8 h-8 text-white" />
                </div>

                <div className="pt-8">
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {renderStars(featured.rating)}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-xl md:text-2xl text-navy/90 leading-relaxed font-serif italic mb-8">
                    &ldquo;{featured.content}&rdquo;
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-5">
                    {featured.image ? (
                      <div className="relative w-16 h-16 rounded-full overflow-hidden border-4 border-brand/20">
                        <Image
                          src={featured.image}
                          alt={featured.clientName}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-navy to-navy-200 flex items-center justify-center text-2xl font-bold text-white border-4 border-brand/20">
                        {featured.clientName?.charAt(0) || "?"}
                      </div>
                    )}
                    <div>
                      <div className="text-lg font-bold text-navy">
                        {featured.clientName || "Anonymous Client"}
                      </div>
                      {featured.clientTitle && (
                        <div className="text-base text-brand-800">{featured.clientTitle}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Other Testimonials Grid */}
        {rest.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.2 },
              },
            }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {rest.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-3xl p-8 shadow-lg border border-brand/10 hover:border-brand/30 hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex gap-1 mb-5">
                  {renderStars(testimonial.rating)}
                </div>

                <blockquote className="text-navy/90 leading-relaxed mb-6 line-clamp-4">
                  &ldquo;{testimonial.content}&rdquo;
                </blockquote>

                <div className="flex items-center gap-4 border-t border-brand/10 pt-5">
                  {testimonial.image ? (
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-brand/20">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.clientName}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-navy to-navy-200 flex items-center justify-center text-lg font-bold text-white border-2 border-brand/20">
                      {testimonial.clientName?.charAt(0) || "?"}
                    </div>
                  )}
                  <div>
                    <div className="font-semibold text-navy">
                      {testimonial.clientName || "Anonymous"}
                    </div>
                    {testimonial.clientTitle && (
                      <div className="text-sm text-brand-800">{testimonial.clientTitle}</div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* View More Button */}
        {testimonials.length >= 4 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-center mt-16"
          >
            <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-navy to-navy-200 text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300 group">
              <span>Read More Success Stories</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
