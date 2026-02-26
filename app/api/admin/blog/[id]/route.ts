import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin()

    const unwrappedParams = await params

    const post = await prisma.blogPost.findUnique({
      where: { id: unwrappedParams.id },
    })

    if (!post) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return NextResponse.json({ error: "Failed to fetch blog post" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin()

    const unwrappedParams = await params

    const { title, content, summary, image, published } = await request.json()

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")

    const post = await prisma.blogPost.update({
      where: { id: unwrappedParams.id },
      data: {
        title,
        slug,
        content,
        summary,
        image,
        published,
      },
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error("Error updating blog post:", error)
    return NextResponse.json({ error: "Failed to update blog post" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin()

    const unwrappedParams = await params

    await prisma.blogPost.delete({
      where: { id: unwrappedParams.id },
    })

    return NextResponse.json({ message: "Blog post deleted successfully" })
  } catch (error) {
    console.error("Error deleting blog post:", error)
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 })
  }
}
