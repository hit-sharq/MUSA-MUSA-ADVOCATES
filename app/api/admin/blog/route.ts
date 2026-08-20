import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth"
import { slugify } from "@/lib/slugify"
import { revalidatePath } from "next/cache"

export async function GET() {
  try {
    await requireAdmin()

    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin()

    const { title, content, summary, image, published, category, slug: providedSlug } = await request.json()

    // Generate a unique, URL-friendly slug
    const baseSlug = slugify(providedSlug || title)
    let slug = baseSlug
    let counter = 1
    while (await prisma.blogPost.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter++}`
    }

    const post = await prisma.blogPost.create({
      data: {
        title,
        slug,
        content,
        summary,
        image,
        published: published || false,
        category,
      },
    })

    // Invalidate cached public blog pages so the new post shows up immediately
    revalidatePath("/blog")
    revalidatePath(`/blog/${slug}`)
    revalidatePath("/blog/[slug]")

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error("Error creating blog post:", error)
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 })
  }
}
