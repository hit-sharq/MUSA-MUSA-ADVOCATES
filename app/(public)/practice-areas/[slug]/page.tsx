import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import { ArrowLeft, Calendar, Scale, Users, Award, Clock, CheckCircle } from "lucide-react"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const area = await prisma.practiceArea.findUnique({ where: { slug } })
  if (!area) return {}
  const baseUrl = "https://www.musadvocates.co.ke"
  return {
    title: `${area.title} | Musa & Musa Advocates`,
    description: area.description.substring(0, 160),
    alternates: { canonical: `${baseUrl}/practice-areas/${area.slug}` },
    openGraph: {
      title: `${area.title} - Musa & Musa Advocates`,
      description: area.description.substring(0, 160),
      url: `${baseUrl}/practice-areas/${area.slug}`,
      type: "website",
      locale: "en_KE",
      siteName: "Musa & Musa Advocates",
    },
    robots: { index: true, follow: true },
  }
}

export async function generateStaticParams() {
  const areas = await prisma.practiceArea.findMany({ select: { slug: true } })
  return areas.map((a) => ({ slug: a.slug }))
}

export default async function PracticeAreaPage({ params }: Props) {
  const { slug } = await params
  const area = await prisma.practiceArea.findUnique({ where: { slug } })
  if (!area) notFound()

  const allAreas = await prisma.practiceArea.findMany({
    where: { slug: { not: slug } },
    orderBy: { order: "asc" },
    take: 5,
  })

  const features = [
    "Experienced attorneys with deep knowledge of Kenyan law",
    "Personalised approach to every client and case",
    "Transparent communication throughout the process",
    "Proven track record across Kenya's courts",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy-50/30 via-white to-white">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-navy via-navy-200 to-navy overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/practice-areas"
            className="inline-flex items-center gap-2 text-white/80 hover:text-brand transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Practice Areas</span>
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-brand/30 to-brand/10 border border-brand/20">
              <span className="text-4xl">{area.icon || "⚖️"}</span>
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                {area.title}
              </h1>
              <p className="text-brand mt-2 text-lg">
                Expert legal representation across Kenya
              </p>
            </div>
          </div>

          <p className="text-white/80 text-lg max-w-3xl leading-relaxed">
            {area.description.substring(0, 200)}...
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Main Content Card */}
      <section className="py-16 md:py-24 -mt-8 relative z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-card border border-brand/10 p-8 md:p-12">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center">
                    <Scale className="w-5 h-5 text-brand-800" />
                  </div>
                  <h2 className="text-2xl font-bold text-navy">
                    About Our {area.title} Practice
                  </h2>
                </div>

                <div className="text-base text-navy/70 leading-relaxed space-y-4">
                  {area.description.split("\n").map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                <div className="mt-10 p-6 md:p-8 bg-gradient-to-br from-navy-50/50 to-brand/5 rounded-2xl border border-brand/10">
                  <h3 className="text-xl font-bold text-navy mb-6 flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-brand-800" />
                    Why Choose Musa & Musa?
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 text-navy/70">
                        <span className="w-5 h-5 rounded-full bg-brand/20 text-brand-800 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                          ✓
                        </span>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Other Practice Areas */}
              {allAreas.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-2xl font-bold text-navy mb-6">Other Practice Areas</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {allAreas.map((a) => (
                      <Link
                        key={a.id}
                        href={`/practice-areas/${a.slug}`}
                        className="group bg-white rounded-2xl p-6 shadow-sm border border-brand/10 hover:border-brand/30 hover:shadow-card transition-all duration-300"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-brand/20 to-brand/10">
                            <span className="text-2xl">{a.icon || "⚖️"}</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-navy group-hover:text-brand-800 transition-colors">
                              {a.title}
                            </h4>
                            <p className="text-sm text-navy/60 line-clamp-2 mt-1">
                              {a.description.substring(0, 80)}...
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* CTA Card */}
                <div className="bg-gradient-to-br from-navy to-navy-200 rounded-3xl p-8 text-white shadow-elevated border border-white/10">
                  <h3 className="text-xl font-bold mb-4">Get Legal Help Today</h3>
                  <p className="text-white/80 mb-6 leading-relaxed">
                    Schedule a consultation with our {area.title.toLowerCase()} specialists.
                  </p>
                  <Link
                    href="/contact"
                    className="block w-full text-center py-4 px-6 bg-gradient-to-r from-brand to-brand-600 text-navy font-bold rounded-xl hover:shadow-lg transition-all duration-300"
                  >
                    Book Consultation
                  </Link>
                </div>

                {/* Quick Info Card */}
                <div className="bg-white rounded-3xl p-8 shadow-card border border-brand/10">
                  <h4 className="font-bold text-navy mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-brand-800" />
                    Quick Info
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-navy/70">
                      <Calendar className="w-4 h-4 text-brand-800" />
                      <span className="text-sm">Available Mon–Sat, 8am–6pm</span>
                    </div>
                    <div className="flex items-center gap-3 text-navy/70">
                      <Users className="w-4 h-4 text-brand-800" />
                      <span className="text-sm">10+ years average experience</span>
                    </div>
                    <div className="flex items-center gap-3 text-navy/70">
                      <Award className="w-4 h-4 text-brand-800" />
                      <span className="text-sm">500+ successful cases</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-navy via-navy-200 to-navy relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Discuss Your {area.title} Needs?
          </h2>
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
            Contact us today for a free consultation and let our experienced team guide you through your legal journey with confidence.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-brand to-brand-800 text-navy font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span>Schedule Consultation</span>
            </Link>
            <Link
              href="/practice-areas"
              className="inline-flex items-center gap-3 px-10 py-4 text-white font-semibold border-2 border-white/30 hover:border-brand rounded-xl hover:bg-white/5 backdrop-blur-sm transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Areas</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
