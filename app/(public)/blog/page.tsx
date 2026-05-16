
import type { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import BlogClient from "./BlogClient"
import "./blog.css"

interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  summary: string | null
  image: string | null
  category: string | null
  published: boolean
  createdAt: Date
  updatedAt?: Date
}

async function getBlogPosts(): Promise<BlogPost[]> {
  return prisma.blogPost.findMany({
    where: {
      published: true
    },
    orderBy: {
      createdAt: "desc"
    }
  })
}

export const metadata = {
  title: "Blog | Musa & Musa Advocates",
  description: "Latest legal insights, case studies, and updates from Musa & Musa Advocates law firm in Nairobi, Kenya.",
  alternates: {
    canonical: "https://www.musadvocates.co.ke/blog",
  },
  robots: {
    index: true,
    follow: true,
  },
} satisfies Metadata

export default async function BlogPage() {
  return (
    <BlogClient posts={await getBlogPosts()} />
  )
}
