import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import type { Metadata } from "next"
import BlogPostClient from "../BlogPostClient"
import "../blog-post.css"

export async function generateStaticParams() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    select: { slug: true },
  })
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await prisma.blogPost.findUnique({
    where: { slug, published: true },
  })

  if (!post) {
    return {
      title: "Article Not Found | Musa & Musa Advocates",
    }
  }

  return {
    title: `${post.title} | Musa & Musa Advocates Blog`,
    description: post.summary || post.content.substring(0, 160),
    openGraph: {
      title: post.title,
      description: post.summary || post.content.substring(0, 160),
      type: "article",
      publishedTime: post.createdAt.toISOString(),
    },
    robots: { index: true, follow: true },
  }
}

async function getBlogPost(slug: string) {
  return await prisma.blogPost.findUnique({
    where: {
      slug,
      published: true,
    },
  })
}

async function getRelatedPosts(currentSlug: string, limit: number = 3) {
  return await prisma.blogPost.findMany({
    where: {
      published: true,
      slug: { not: currentSlug }
    },
    orderBy: {
      createdAt: "desc"
    },
    take: limit
  })
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getBlogPost(slug)
  const relatedPosts = post ? await getRelatedPosts(slug) : []

  if (!post) {
    notFound()
  }

  return <BlogPostClient post={post} relatedPosts={relatedPosts} />
}
