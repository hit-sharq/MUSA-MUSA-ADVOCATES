import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin()

    const unwrappedParams = await params

    const career = await prisma.career.findUnique({
      where: { id: unwrappedParams.id },
    })

    if (!career) {
      return NextResponse.json({ error: "Career not found" }, { status: 404 })
    }

    return NextResponse.json(career)
  } catch (error) {
    console.error("Error fetching career:", error)
    return NextResponse.json({ error: "Failed to fetch career" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin()

    const unwrappedParams = await params

    const { title, department, location, type, description, requirements, published } = await request.json()

    const career = await prisma.career.update({
      where: { id: unwrappedParams.id },
      data: {
        title,
        department,
        location,
        type,
        description,
        requirements,
        published,
      },
    })

    return NextResponse.json(career)
  } catch (error) {
    console.error("Error updating career:", error)
    return NextResponse.json({ error: "Failed to update career" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin()

    const unwrappedParams = await params

    await prisma.career.delete({
      where: { id: unwrappedParams.id },
    })

    return NextResponse.json({ message: "Career deleted successfully" })
  } catch (error) {
    console.error("Error deleting career:", error)
    return NextResponse.json({ error: "Failed to delete career" }, { status: 500 })
  }
}

