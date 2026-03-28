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

    if (!member) {
      return {
        title: "Team Member Not Found"
      }
    }

    return {
      title: `${member.name} | Musa & Musa Advocates`,
      description: `${member.bio.substring(0, 160)}...`,
      openGraph: {
        title: `${member.name} - ${member.title}`,
        description: `${member.bio.substring(0, 160)}...`,
        images: member.image ? [member.image] : undefined,
      },
    }
  } catch {
    return {
      title: "Team Member | Musa & Musa Advocates"
    }
  }
}

export default async function TeamMemberPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  let member: TeamMember | null = null

  try {
    member = await prisma.teamMember.findUnique({
      where: { slug: resolvedParams.slug }
    })
  } catch (error) {
    console.error("Error fetching team member:", error)
  }

  if (!member) {
    notFound()
  }

  return (
    <div className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Link 
            href="/team" 
            className="inline-flex items-center gap-2 px-6 py-3 text-lg font-semibold text-slate-700 bg-white border-2 border-slate-200 rounded-xl hover:bg-slate-700 hover:text-white hover:border-slate-700 transition-all duration-300 mb-6 shadow-lg"
          >
            ← Back to Team
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-1 text-center lg:text-left">
            <div className="w-64 h-64 mx-auto lg:mx-0 mb-8 rounded-full overflow-hidden bg-slate-100 shadow-2xl border-8 border-white">
              <Image
                src={member.image || "/placeholder.svg?height=256&width=256"}
                alt={member.name}
                width={256}
                height={256}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 mb-4 leading-tight">
              {member.name}
            </h1>
            <p className="text-2xl font-semibold text-blue-400 mb-8 tracking-wide">
              {member.title}
            </p>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div className="bg-slate-50 p-8 rounded-2xl border-l-8 border-blue-900 shadow-xl">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Professional Bio
              </h2>
              <div className="prose prose-lg max-w-none leading-relaxed text-slate-700">
                <p className="text-xl">{member.bio}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link 
                href="/contact" 
                className="px-10 py-5 text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl hover:from-slate-800 hover:to-slate-700 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 shadow-xl flex-1 text-center min-w-[200px]"
              >
                Schedule Consultation
              </Link>
              <Link 
                href="/team" 
                className="px-10 py-5 text-xl font-bold bg-transparent text-slate-900 border-3 border-slate-900 rounded-2xl hover:bg-slate-900 hover:text-white hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 min-w-[200px] flex-1 text-center"
              >
                Meet the Team
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-20 border-t-4 border-slate-100">
          <div className="text-center">
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-6">
              Ready to Discuss Your Legal Needs?
            </h2>
            <p className="text-xl lg:text-2xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Contact {member.name} or any member of our team for expert legal guidance tailored to your situation.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-4 px-12 py-6 text-2xl font-bold bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 text-slate-900 rounded-full hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] transition-all duration-500 shadow-2xl border border-blue-300"
            >
              Get In Touch →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

