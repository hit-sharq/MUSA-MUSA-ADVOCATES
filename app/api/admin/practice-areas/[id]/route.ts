import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAdmin()

    const practiceArea = await prisma.practiceArea.findUnique({
      where: { id: params.id },
    })

    if (!practiceArea) {
      return NextResponse.json({ error: "Practice area not found" }, { status: 404 })
    }

    return NextResponse.json(practiceArea)
  } catch (error) {
    console.error("Error fetching practice area:", error)
    return NextResponse.json({ error: "Failed to fetch practice area" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAdmin()

    const { title, description, icon, order } = await request.json()

    const practiceArea = await prisma.practiceArea.update({
      where: { id: params.id },
      data: {
        title,
        description,
        icon,
        order: order || 0,
      },
    })

    return NextResponse.json(practiceArea)
  } catch (error) {
    console.error("Error updating practice area:", error)
    return NextResponse.json({ error: "Failed to update practice area" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAdmin()

    await prisma.practiceArea.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "Practice area deleted successfully" })
  } catch (error) {
    console.error("Error deleting practice area:", error)
    return NextResponse.json({ error: "Failed to delete practice area" }, { status: 500 })
  }
}
