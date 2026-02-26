import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const testimonials = await prisma.testimonials.findMany({
      orderBy: [{ featured: "desc" }, { order: "asc" }, { created_at: "desc" }],
    })
    return NextResponse.json(testimonials)
  } catch (error) {
    console.error("Error fetching testimonials:", error)
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const adminIds = process.env.ADMIN_USER_IDS?.split(",") || []
    if (!adminIds.includes(userId)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const data = await request.json()
    const testimonial = await prisma.testimonials.create({
      data: {
        client_name: data.clientName,
        client_title: data.clientTitle || null,
        content: data.content,
        rating: data.rating || 5,
        image: data.image || null,
        featured: data.featured || false,
        order: data.order || 0,
        updated_at: new Date(),
      },
    })

    return NextResponse.json(testimonial)
  } catch (error) {
    console.error("Error creating testimonial:", error)
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 })
  }
}
