import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth"
import { slugify } from "@/lib/slugify"

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin()
    const params = await context.params

    const teamMember = await prisma.teamMember.findUnique({
      where: { id: params.id },
    })

    if (!teamMember) {
      return NextResponse.json({ error: "Team member not found" }, { status: 404 })
    }

    return NextResponse.json(teamMember)
  } catch (error) {
    console.error("Error fetching team member:", error)
    return NextResponse.json({ error: "Failed to fetch team member" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin()
    const params = await context.params

    const { name, title, bio, image, order } = await request.json()

    const existing = await prisma.teamMember.findUnique({
      where: { id: params.id },
      select: { name: true },
    })

    const data: Record<string, unknown> = { name, title, bio, image, order: order || 0 }

    if (existing && existing.name !== name) {
      const baseSlug = slugify(name)
      let slug = baseSlug
      let counter = 1
      while (await prisma.teamMember.findFirst({ where: { slug, NOT: { id: params.id } } })) {
        slug = `${baseSlug}-${counter++}`
      }
      data.slug = slug
    }

    const teamMember = await prisma.teamMember.update({
      where: { id: params.id },
      data,
    })

    return NextResponse.json(teamMember)
  } catch (error) {
    console.error("Error updating team member:", error)
    return NextResponse.json({ error: "Failed to update team member" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin()
    const params = await context.params

    await prisma.teamMember.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "Team member deleted successfully" })
  } catch (error) {
    console.error("Error deleting team member:", error)
    return NextResponse.json({ error: "Failed to delete team member" }, { status: 500 })
  }
}
