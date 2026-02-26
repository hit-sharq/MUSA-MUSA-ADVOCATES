import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth"

export async function GET() {
  try {
    await requireAdmin()

    const galleryImages = await prisma.galleryImage.findMany({
      orderBy: { order: "asc" },
    })

    return NextResponse.json(galleryImages)
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin()

    const { title, description, imageUrl, order } = await request.json()

    const galleryImage = await prisma.galleryImage.create({
      data: {
        title,
        description,
        imageUrl,
        order: order || 0,
      },
    })

    return NextResponse.json(galleryImage, { status: 201 })
  } catch (error) {
    console.error("Error creating gallery image:", error)
    return NextResponse.json({ error: "Failed to create gallery image" }, { status: 500 })
  }
}
