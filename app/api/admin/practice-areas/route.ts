import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth"

export async function GET() {
  try {
    await requireAdmin()

    const practiceAreas = await prisma.practiceArea.findMany({
      orderBy: { order: "asc" },
    })

    return NextResponse.json(practiceAreas)
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin()

    const { title, description, icon, order } = await request.json()

    const practiceArea = await prisma.practiceArea.create({
      data: {
        title,
        description,
        icon,
        order: order || 0,
      },
    })

    return NextResponse.json(practiceArea, { status: 201 })
  } catch (error) {
    console.error("Error creating practice area:", error)
    return NextResponse.json({ error: "Failed to create practice area" }, { status: 500 })
  }
}
