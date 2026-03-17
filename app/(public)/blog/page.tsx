import type { Metadata } from "next"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  summary: string | null
  image: string | null
  published: boolean
  createdAt: string
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

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBlogPosts()
  }, [])

  const fetchBlogPosts = async () => {
    try {
      const response = await fetch("/api/blog-posts")
      const data = await response.json()
      setPosts(data)
    } catch (error) {
      console.error("Error fetching blog posts:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <h1 className="section-title">Legal Insights & Updates</h1>
          <p className="section-subtitle">
            Stay informed with our latest legal insights, case studies, and updates on important legal developments that
            may affect you.
          </p>

          {loading ? (
            <div className="text-center" style={{ padding: "4rem" }}>
              <div className="loading" style={{ margin: "0 auto" }}></div>
              <p style={{ marginTop: "1rem", color: "#64748b" }}>Loading blog posts...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="card" style={{ textAlign: "center", padding: "4rem 2rem" }}>
              <h3>Blog Posts Coming Soon</h3>
              <p>We are currently working on our first blog posts. Check back soon for legal insights and updates.</p>
            </div>
          ) : (
            <div className="blog-grid">
              {posts.map((post) => (
                <article key={post.id} className="blog-card">
                  <div className="blog-image-wrapper">
                    <Image
                      src={post.image || "/placeholder.svg?height=200&width=400"}
                      alt={post.title}
                      fill
                      className="blog-card-image"
                    />
                  </div>
                  <div className="blog-card-content">
                    <div className="blog-card-date">{formatDate(post.createdAt)}</div>
                    <h3 className="blog-card-title">{post.title}</h3>
                    <p className="blog-card-excerpt">
                      {post.summary || post.content.substring(0, 120) + "..."}
                    </p>
                    <Link href={`/blog/${post.slug}`} className="read-more-btn">
                      Read More
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="blog-cta">
            <h3>Stay Updated</h3>
            <p>Subscribe to our newsletter to receive the latest legal insights and updates directly in your inbox.</p>
            <a href="/contact" className="btn btn-primary">Contact Us to Subscribe</a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .blog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
        }

        .blog-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          border: 1px solid #e2e8f0;
        }

        .blog-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
        }

        .blog-image-wrapper {
          position: relative;
          height: 180px;
          overflow: hidden;
        }

        .blog-card-image {
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .blog-card:hover .blog-card-image {
          transform: scale(1.05);
        }

        .blog-card-content {
          padding: 1.5rem;
        }

        .blog-card-date {
          font-size: 0.85rem;
          color: #888;
          margin-bottom: 0.75rem;
          font-weight: 500;
        }

        .blog-card-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #0a2540;
          margin-bottom: 0.75rem;
          line-height: 1.3;
        }

        .blog-card-excerpt {
          font-size: 0.95rem;
          line-height: 1.6;
          color: #666;
          margin-bottom: 1rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .read-more-btn {
          color: #d32f2f;
          font-weight: 600;
          font-size: 0.9rem;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .read-more-btn:hover {
          color: #b71c1c;
        }

        .blog-cta {
          background: #f7fafc;
          padding: 3rem 2rem;
          border-radius: 15px;
          text-align: center;
          margin-top: 4rem;
        }

        .blog-cta h3 {
          color: #1a365d;
          margin-bottom: 1rem;
        }

        .blog-cta p {
          margin-bottom: 2rem;
          color: #666;
        }
      `}</style>
    </>
  )
}
