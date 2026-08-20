import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import type { Metadata } from "next"
import BlogPostClient from "../BlogPostClient"
import "../blog-post.css"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.musadvocates.co.ke"

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
    alternates: {
      canonical: `${SITE_URL}/blog/${post.slug}`,
    },
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

  const articleUrl = `${SITE_URL}/blog/${post.slug}`
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary || post.content.replace(/<[^>]+>/g, "").slice(0, 200),
    image: post.image || undefined,
    datePublished: post.createdAt.toISOString(),
    dateModified: post.updatedAt ? post.updatedAt.toISOString() : post.createdAt.toISOString(),
    author: { "@type": "Organization", name: "Musa & Musa Advocates" },
    publisher: {
      "@type": "Organization",
      name: "Musa & Musa Advocates",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/og-image.jpg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
    keywords: post.category || undefined,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostClient post={post} relatedPosts={relatedPosts} />
    </>
  )
}
