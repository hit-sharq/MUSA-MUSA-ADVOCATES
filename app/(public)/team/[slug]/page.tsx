import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import Image from "next/image"
import Link from "next/link"

interface TeamMember {
  id: string
  slug: string
  name: string
  title: string
  bio: string
  image: string | null
  order: number
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  try {
    const member = await prisma.teamMember.findUnique({
      where: { slug: resolvedParams.slug }
    })

    if (!member) return { title: "Team Member Not Found" }

    return {
      title: `${member.name} - ${member.title} | Musa & Musa Advocates`,
      description: member.bio.slice(0, 160) + '...'
    }
  } catch {
    return { title: "Team Member | Musa & Musa Advocates" }
  }
}

export default async function TeamMemberPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const member = await prisma.teamMember.findUnique({
    where: { slug }
  })

  if (!member) notFound()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <Link 
          href="/team"
          className="inline-flex items-center gap-2 mb-12 px-6 py-3 bg-white shadow-lg border border-slate-200 rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-slate-700 font-semibold"
        >
          ← Back to Team
        </Link>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Profile Image */}
          <div className="text-center md:text-left">
            <div className="w-72 h-72 mx-auto md:mx-0 rounded-3xl shadow-2xl overflow-hidden bg-white ring-4 ring-white/50">
              <Image
                src={member.image || '/placeholder-user.jpg'}
                alt={member.name}
                width={288}
                height={288}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Name & Title */}
          <div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 leading-tight bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent">
              {member.name}
            </h1>
            <p className="text-2xl font-bold text-blue-600 uppercase tracking-wide mb-12">
              {member.title}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Link 
                href="/contact"
                className="flex-1 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white font-bold py-6 px-10 rounded-2xl text-xl shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-300 text-center"
              >
                Schedule Consultation
              </Link>
              <Link 
                href="/practice-areas"
                className="flex-1 bg-white border-3 border-slate-200 hover:border-slate-900 hover:bg-slate-900 hover:text-white text-slate-900 font-bold py-6 px-10 rounded-2xl text-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center"
              >
                Our Services
              </Link>
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/50">
          <h2 className="text-4xl font-bold text-slate-900 mb-8 border-b-4 border-slate-200 pb-6">
            Professional Bio
          </h2>
          <div className="prose prose-2xl prose-slate max-w-none leading-relaxed text-lg">
            <div dangerouslySetInnerHTML={{ __html: member.bio.replace(/\n/g, '<br/>') }} />
          </div>
        </div>
      </div>
    </div>
  )
}

