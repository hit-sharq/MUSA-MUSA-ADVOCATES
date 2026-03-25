import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth"
import { slugify } from "@/lib/slugify"

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

    const baseSlug = slugify(title)
    let slug = baseSlug
    let counter = 1
    while (await prisma.practiceArea.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter++}`
    }

    const practiceArea = await prisma.practiceArea.create({
      data: {
        title,
        slug,
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
