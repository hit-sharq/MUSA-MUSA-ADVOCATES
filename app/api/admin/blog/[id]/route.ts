import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth"
import { slugify } from "@/lib/slugify"
import { revalidatePath } from "next/cache"

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

    const { title, content, summary, image, published, category, slug: providedSlug } = await request.json()

    // Only change the slug when the editor provides one or the title changed,
    // so existing shareable URLs don't break on every edit.
    const existing = await prisma.blogPost.findUnique({
      where: { id: unwrappedParams.id },
      select: { slug: true, title: true },
    })

    let slug = existing?.slug ?? ""

    const slugChanged = providedSlug && slugify(providedSlug) !== existing?.slug
    const titleChanged = title && title !== existing?.title

    if (slugChanged || (titleChanged && !providedSlug)) {
      const baseSlug = slugify(providedSlug || title)
      slug = baseSlug
      let counter = 1
      while (await prisma.blogPost.findFirst({ where: { slug, NOT: { id: unwrappedParams.id } } })) {
        slug = `${baseSlug}-${counter++}`
      }
    }

    const post = await prisma.blogPost.update({
      where: { id: unwrappedParams.id },
      data: {
        title,
        slug,
        content,
        summary,
        image,
        published,
        category,
      },
    })

    // Revalidate the public blog pages
    revalidatePath('/blog')
    revalidatePath(`/blog/${slug}`)
    
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

    // Revalidate the public blog pages
    revalidatePath("/blog")

    // In this app the blog list and blog post pages are rendered from server components
    // so revalidating /blog is the critical part. Additional revalidation is safe.
    revalidatePath("/blog/[slug]")

    return NextResponse.json({ message: "Blog post deleted successfully" })
  } catch (error) {
    console.error("Error deleting blog post:", error)
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 })
  }
}
