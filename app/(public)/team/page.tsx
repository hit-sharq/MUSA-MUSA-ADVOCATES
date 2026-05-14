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
      {/* SEO: render member list server-side so crawlers see the links */}

      {/* Hero Section (static markup; you can re-add animations later) */}
      <section className="team-hero">
        <div className="team-hero-content">
          <div className="team-hero-badge">
            <Users className="w-4 h-4" />
            <span>Our Team</span>
          </div>
          <h1 className="team-hero-title">
            Meet Our <span>Attorneys</span>
          </h1>
          <p className="team-hero-subtitle">
            A diverse team of seasoned legal professionals united by a shared commitment to justice,
            excellence, and client success.
          </p>
          <Link href="/contact" className="team-hero-btn-primary">
            <span>Schedule Consultation</span>
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Stats */}
      <section className="team-stats">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="team-stats-grid">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="team-stat-item">
                  <div className="team-stat-value">
                    <Icon className="w-6 h-6" />
                    {stat.value}
                  </div>
                  <div className="team-stat-label">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand/10 border border-brand/20 rounded-full mb-6">
              <Award className="w-4 h-4 text-brand-dark fill-brand-dark" />
              <span className="text-sm font-bold text-brand-dark uppercase tracking-wider">Our Attorneys</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-navy mb-5">Legal Experts You Can Trust</h2>
            <p className="text-xl text-navy/70 max-w-2xl mx-auto">
              Experienced advocates dedicated to protecting your rights and achieving the best outcomes
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
            <div className="team-grid">
              {teamMembers.map((member) => (
                <div key={member.id} className="team-card">
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

                  <div className="team-card-content">
                    <div className="team-card-bio">
                      <p className="line-clamp-3">{member.bio}</p>
                      <Link href={`/team/${member.slug}`} className="team-card-link">
                        <span>View Full Profile</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="team-cta">
            <Link href="/contact" className="team-cta-btn">
              <Star className="w-5 h-5" />
              <span>Join Our Team</span>
            </Link>
          </div>
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


