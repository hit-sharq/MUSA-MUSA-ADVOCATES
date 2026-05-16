import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Shield, ArrowLeft, Calendar, Mail } from "lucide-react"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const teamMember = await prisma.teamMember.findUnique({
    where: { slug },
  })

  if (!teamMember) {
    return {
      title: "Team Member Not Found | Musa & Musa Advocates",
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.musadvocates.co.ke"

  return {
    title: `${teamMember.name} | Musa & Musa Advocates`,
    description: teamMember.bio.substring(0, 160),
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `${baseUrl}/team/${teamMember.slug}`,
    },
    openGraph: {
      title: teamMember.name,
      description: teamMember.bio.substring(0, 160),
      type: "profile",
      url: `${baseUrl}/team/${teamMember.slug}`,
    },
  }
}


export default async function TeamMemberPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const teamMember = await prisma.teamMember.findUnique({
    where: { slug },
  })

  if (!teamMember) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center bg-gradient-to-br from-navy via-navy-200 to-navy overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-full h-full opacity-10">
            <div className="absolute top-20 right-20 w-64 h-64 border-4 border-brand rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-20 w-48 h-48 border-4 border-brand rounded-lg rotate-45 blur-2xl" />
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <div className="absolute -top-8 -left-8 w-full h-full bg-gradient-to-br from-brand/30 to-brand/10 rounded-3xl blur-xl" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10">
                <Image
                  src={teamMember.image || "/placeholder.svg?height=600&width=600"}
                  alt={teamMember.name}
                  width={600}
                  height={600}
                  className="w-full h-auto object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl border border-brand/10 p-4">
                <div className="flex items-center gap-2 text-navy">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-semibold">Est. 2010</span>
                </div>
              </div>
            </div>

            {/* Info */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand/15 border border-brand/20 rounded-full mb-6">
                <Shield className="w-4 h-4 text-brand-dark fill-brand-dark" />
                <span className="text-sm font-bold text-brand-dark uppercase tracking-wider">Our Team</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                {teamMember.name}
              </h1>

              <p className="text-xl text-brand font-semibold mb-8">
                {teamMember.title}
              </p>

              <p className="text-lg text-white/90 leading-relaxed mb-8">
                <span dangerouslySetInnerHTML={{ __html: teamMember.bio }} />
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-brand to-brand-dark text-navy font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Mail className="w-5 h-5" />
                  <span>Schedule Consultation</span>
                </Link>
                <Link
                  href="/team"
                  className="inline-flex items-center gap-3 px-6 py-3 text-white font-semibold border-2 border-white/20 hover:border-brand hover:bg-white/5 backdrop-blur-sm rounded-xl transition-all duration-300"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back to Team</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10" />
      </section>

      {/* Practice Areas */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 md:p-12 shadow-xl border border-brand/10">
            <h2 className="text-2xl font-bold text-navy mb-6">Practice Areas</h2>
            <div className="flex flex-wrap gap-3">
              {["Corporate Law", "Litigation", "Family Law", "Real Estate", "Criminal Defense"].map((area) => (
                <span
                  key={area}
                  className="px-4 py-2 bg-white rounded-full text-sm font-medium text-navy/80 border border-brand/10 shadow-sm"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Need Legal Assistance?
          </h2>
          <p className="text-white/85 mb-8 text-lg">
            Contact us today to schedule a consultation with {teamMember.name.split(' ')[0]}.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand to-brand-dark text-navy font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Mail className="w-5 h-5" />
              <span>Get Your Free Consultation</span>
            </Link>
            <Link
              href="/team"
              className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold border-2 border-white/20 hover:border-brand rounded-xl transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>View All Attorneys</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
