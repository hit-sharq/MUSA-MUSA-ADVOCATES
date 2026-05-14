
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Users, Award, Star } from "lucide-react"

export const metadata: Metadata = {
  title: "Our Team | Musa & Musa Advocates",
  description:
    "Meet the experienced attorneys and legal professionals at Musa & Musa Advocates in Nairobi, Kenya. Our team is dedicated to providing exceptional legal representation.",
  keywords:
    "our team, attorneys, lawyers, advocates, Nairobi, Kenya, legal professionals, Musa Musa",
  openGraph: {
    title: "Our Team - Musa & Musa Advocates",
    description:
      "Meet the experienced attorneys and legal professionals at Musa & Musa Advocates.",
    type: "website",
    locale: "en_KE",
    siteName: "Musa & Musa Advocates",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.musadvocates.co.ke/team",
  },
}

const stats = [
  { value: "12", label: "Expert Attorneys", icon: Users },
  { value: "50+", label: "Years Combined", icon: Award },
  { value: "15+", label: "Practice Areas", icon: Star },
]

export default async function TeamPage() {
  const teamMembers = await prisma.teamMember.findMany({
    orderBy: { order: "asc" },
    select: {
      id: true,
      slug: true,
      name: true,
      title: true,
      bio: true,
      image: true,
    },
  })

  return (
    <div className="team-page">
      {/* Compact server-rendered page with small profile cards */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand/10 border border-brand/20 rounded-full mb-6">
              <Users className="w-4 h-4 text-brand-800" />
              <span className="text-sm font-bold text-brand-800 uppercase tracking-wider">Our Legal Team</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-navy mb-5">Meet Our Attorneys</h1>

            <p className="text-xl text-navy/70 max-w-2xl mx-auto">
              Our dedicated team of attorneys is ready to help you with legal matters.
            </p>
          </div>

          {teamMembers.length === 0 ? (
            <div className="card text-center py-16">
              <h3 className="text-navy mb-3">Team Coming Soon</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                We are currently updating our team profiles. Please check back soon or contact us directly.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={member.id}
                  className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-brand/10 transition-all duration-300"
                >
                  <div className="relative h-72 overflow-hidden">
                    <Image
                      src={member.image || "/placeholder.svg?height=300&width=300"}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
                  </div>

                  <div className="p-8 -mt-16 relative">
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-brand/10">
                      <h3 className="text-2xl font-bold text-navy mb-2">{member.name}</h3>
                      <p className="text-brand-800 font-semibold mb-3">{member.title}</p>
                      <p className="text-navy/70 text-sm line-clamp-3 leading-relaxed mb-4">{member.bio}</p>

                      <Link
                        href={`/team/${member.slug}`}
                        className="inline-flex items-center text-brand-800 font-semibold text-sm group/link"
                      >
                        <span>View Profile</span>
                        <span className="ml-2 group-hover/link:translate-x-1 transition-transform">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>




      {/* Bottom CTA */}
      <section className="team-bottom-cta">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">Need Legal Assistance?</h2>
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


