import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const testimonials = await prisma.testimonials.findMany({
      orderBy: [{ featured: "desc" }, { order: "asc" }, { created_at: "desc" }],
    })

    // Map snake_case fields to camelCase for frontend compatibility
    const mappedTestimonials = testimonials.map((t) => ({
      id: t.id,
      clientName: t.client_name,
      clientTitle: t.client_title,
      content: t.content,
      rating: t.rating,
      image: t.image,
      featured: t.featured,
      order: t.order,
      created_at: t.created_at,
    }))

    return NextResponse.json(mappedTestimonials)
  } catch (error) {
    console.error("Error fetching testimonials:", error)
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 })
  }
}
