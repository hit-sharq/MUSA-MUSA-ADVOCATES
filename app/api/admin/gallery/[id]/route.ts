import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth"

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin()
    const params = await context.params

    const galleryImage = await prisma.galleryImage.findUnique({
      where: { id: params.id },
    })

    if (!galleryImage) {
      return NextResponse.json({ error: "Gallery image not found" }, { status: 404 })
    }

    return NextResponse.json(galleryImage)
  } catch (error) {
    console.error("Error fetching gallery image:", error)
    return NextResponse.json({ error: "Failed to fetch gallery image" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin()
    const params = await context.params

    const { title, description, imageUrl, order } = await request.json()

    const galleryImage = await prisma.galleryImage.update({
      where: { id: params.id },
      data: {
        title,
        description,
        imageUrl,
        order: order || 0,
      },
    })

    return NextResponse.json(galleryImage)
  } catch (error) {
    console.error("Error updating gallery image:", error)
    return NextResponse.json({ error: "Failed to update gallery image" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin()
    const params = await context.params

    await prisma.galleryImage.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "Gallery image deleted successfully" })
  } catch (error) {
    console.error("Error deleting gallery image:", error)
    return NextResponse.json({ error: "Failed to delete gallery image" }, { status: 500 })
  }
}
