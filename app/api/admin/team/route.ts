import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth"

export async function GET() {
  try {
    await requireAdmin()

    const teamMembers = await prisma.teamMember.findMany({
      orderBy: { order: "asc" },
    })

    return NextResponse.json(teamMembers)
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin()

    const { name, title, bio, image, order } = await request.json()

    const teamMember = await prisma.teamMember.create({
      data: {
        name,
        title,
        bio,
        image,
        order: order || 0,
      },
    })

    return NextResponse.json(teamMember, { status: 201 })
  } catch (error) {
    console.error("Error creating team member:", error)
    return NextResponse.json({ error: "Failed to create team member" }, { status: 500 })
  }
}
