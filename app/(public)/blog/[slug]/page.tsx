import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"

async function getBlogPost(slug: string) {
  return await prisma.blogPost.findUnique({
    where: {
      slug,
      published: true,
    },
  })
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="section">
      <div className="container">
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <Link href="/blog" className="btn btn-secondary" style={{ marginBottom: "2rem" }}>
            ← Back to Blog
          </Link>

          <article>
            <header style={{ marginBottom: "3rem", textAlign: "center" }}>
              <h1
                style={{
                  fontSize: "2.5rem",
                  marginBottom: "1rem",
                  color: "#1a365d",
                  lineHeight: "1.2",
                }}
              >
                {post.title}
              </h1>

              <div
                style={{
                  color: "#666",
                  fontSize: "1.1rem",
                  marginBottom: "2rem",
                }}
              >
                Published on{" "}
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>

              {post.image && (
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  width={800}
                  height={400}
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "10px",
                    marginBottom: "2rem",
                  }}
                />
              )}
            </header>

            <div
              style={{
                fontSize: "1.1rem",
                lineHeight: "1.8",
                color: "#333",
              }}
            >
              {post.content.split("\n").map((paragraph, index) => (
                <p key={index} style={{ marginBottom: "1.5rem" }}>
                  {paragraph}
                </p>
              ))}
            </div>
          </article>

          <div
            style={{
              background: "#f7fafc",
              padding: "2rem",
              borderRadius: "10px",
              marginTop: "3rem",
              textAlign: "center",
            }}
          >
            <h3 style={{ color: "#1a365d", marginBottom: "1rem" }}>Need Legal Assistance?</h3>
            <p style={{ marginBottom: "2rem", color: "#666" }}>
              If you have questions about this topic or need legal representation, don't hesitate to contact us for a
              consultation.
            </p>
            <Link href="/contact" className="btn btn-primary">
              Schedule Consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
