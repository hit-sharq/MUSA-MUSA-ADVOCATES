import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const testimonial = await prisma.testimonials.findUnique({
      where: { id },
    })

    if (!testimonial) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 })
    }

    return NextResponse.json(testimonial)
  } catch (error) {
    console.error("Error fetching testimonial:", error)
    return NextResponse.json({ error: "Failed to fetch testimonial" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const adminIds = process.env.ADMIN_USER_IDS?.split(",") || []
    if (!adminIds.includes(userId)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { id } = await params
    const data = await request.json()

    const testimonial = await prisma.testimonials.update({
      where: { id },
      data: {
        client_name: data.clientName,
        client_title: data.clientTitle || null,
        content: data.content,
        rating: data.rating || 5,
        image: data.image || null,
        featured: data.featured || false,
        order: data.order || 0,
      },
    })

    return NextResponse.json(testimonial)
  } catch (error) {
    console.error("Error updating testimonial:", error)
    return NextResponse.json({ error: "Failed to update testimonial" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const adminIds = process.env.ADMIN_USER_IDS?.split(",") || []
    if (!adminIds.includes(userId)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { id } = await params
    await prisma.testimonials.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting testimonial:", error)
    return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 })
  }
}
