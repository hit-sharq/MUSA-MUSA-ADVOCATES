import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth"

export async function GET() {
  try {
    await requireAdmin()

    const careers = await prisma.career.findMany({
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(careers)
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin()

    const { title, department, location, type, description, requirements, published } = await request.json()

    const career = await prisma.career.create({
      data: {
        title,
        department,
        location,
        type: type || "Full-time",
        description,
        requirements,
        published: published || false,
      },
    })

    return NextResponse.json(career, { status: 201 })
  } catch (error) {
    console.error("Error creating career:", error)
    return NextResponse.json({ error: "Failed to create career" }, { status: 500 })
  }
}

