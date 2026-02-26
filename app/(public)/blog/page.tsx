import Image from "next/image"
import Link from "next/link"
import { prisma } from "@/lib/prisma"

async function getBlogPosts() {
  return await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  })
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div className="section">
      <div className="container">
        <h1 className="section-title">Legal Insights & Updates</h1>
        <p className="section-subtitle">
          Stay informed with our latest legal insights, case studies, and updates on important legal developments that
          may affect you.
        </p>

        <div className="grid grid-3">
          {posts.map((post) => (
            <div key={post.id} className="card blog-card">
              <Image
                src={post.image || "/placeholder.svg?height=200&width=300"}
                alt={post.title}
                width={300}
                height={200}
                className="blog-image"
              />
              <div className="blog-meta">
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <h3>{post.title}</h3>
              <p>{post.summary}</p>
              <Link href={`/blog/${post.slug}`} className="btn btn-primary" style={{ marginTop: "1rem" }}>
                Read Full Article
              </Link>
            </div>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="card" style={{ textAlign: "center", padding: "4rem 2rem" }}>
            <h3>Blog Posts Coming Soon</h3>
            <p>We are currently working on our first blog posts. Check back soon for legal insights and updates.</p>
          </div>
        )}

        <div
          style={{
            background: "#f7fafc",
            padding: "3rem 2rem",
            borderRadius: "15px",
            textAlign: "center",
            marginTop: "4rem",
          }}
        >
          <h3 style={{ color: "#1a365d", marginBottom: "1rem" }}>Stay Updated</h3>
          <p style={{ marginBottom: "2rem", color: "#666" }}>
            Subscribe to our newsletter to receive the latest legal insights and updates directly in your inbox.
          </p>
          <a href="/contact" className="btn btn-primary">
            Contact Us to Subscribe
          </a>
        </div>
      </div>
    </div>
  )
}
