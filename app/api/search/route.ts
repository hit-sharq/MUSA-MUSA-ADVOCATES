import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")

    if (!query || query.length < 2) {
      return NextResponse.json([])
    }

    const searchTerm = `%${query.toLowerCase()}%`

    // Search blog posts
    const blogPosts = await prisma.blogPost.findMany({
      where: {
        published: true,
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { content: { contains: query, mode: "insensitive" } },
          { summary: { contains: query, mode: "insensitive" } },
        ],
      },
      select: {
        id: true,
        title: true,
        slug: true,
        summary: true,
      },
      take: 5,
    })

    // Search practice areas
    const practiceAreas = await prisma.practiceArea.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ],
      },
      select: {
        id: true,
        title: true,
        description: true,
      },
      take: 3,
    })

    // Search team members
    const teamMembers = await prisma.teamMember.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { title: { contains: query, mode: "insensitive" } },
          { bio: { contains: query, mode: "insensitive" } },
        ],
      },
      select: {
        id: true,
        name: true,
        title: true,
        bio: true,
      },
      take: 3,
    })

    // Format results
    const results = [
      ...blogPosts.map((post) => ({
        id: post.id,
        title: post.title,
        type: "blog" as const,
        url: `/blog/${post.slug}`,
        excerpt: post.summary || post.title,
      })),
      ...practiceAreas.map((area) => ({
        id: area.id,
        title: area.title,
        type: "practice-area" as const,
        url: "/practice-areas",
        excerpt: area.description.substring(0, 100) + "...",
      })),
      ...teamMembers.map((member) => ({
        id: member.id,
        title: member.name,
        type: "team" as const,
        url: "/team",
        excerpt: `${member.title} - ${member.bio.substring(0, 80)}...`,
      })),
    ]

    return NextResponse.json(results)
  } catch (error) {
    console.error("Search error:", error)
    return NextResponse.json({ error: "Search failed" }, { status: 500 })
  }
}
