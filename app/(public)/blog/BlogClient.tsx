"use client"

import { useState } from "react"
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
  createdAt: Date
  updatedAt?: Date
}

interface BlogClientProps {
  posts: BlogPost[]
}

export default function BlogClient({ posts }: BlogClientProps) {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="section">
      <div className="container">
        <h1 className="section-title">Legal Insights & Updates</h1>
        <p className="section-subtitle">
          Stay informed with our latest legal insights, case studies, and updates on important legal developments that
          may affect you.
        </p>

        {posts.length === 0 ? (
          <div className="card" style={{ textAlign: "center", padding: "4rem 2rem" }}>
            <h3>Blog Posts Coming Soon</h3>
            <p>We are currently working on our first blog posts. Check back soon for legal insights and updates.</p>
          </div>
        ) : (
          <div className="blog-grid">
            {posts.map((post: BlogPost) => (
              <article 
                key={post.id} 
                className="blog-card"
                onClick={() => setSelectedPost(post)}
              >
                <div className="blog-image-wrapper">
                  <Image
                    src={post.image || "/placeholder.svg?height=200&width=400"}
                    alt={post.title}
                    fill
                    className="blog-card-image"
                  />
                </div>
                <div className="blog-card-content">
                  <div className="blog-card-date">
                    {formatDate(post.createdAt)}
                  </div>
                  <h3 className="blog-card-title">{post.title}</h3>
                  <p className="blog-card-excerpt">
                    {post.summary || post.content.substring(0, 120) + "..."}
                  </p>
                  <button 
                    className="read-more-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedPost(post)
                    }}
                  >
                    Read More
                  </button>
                </div>
              </article>
            ))}
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

      {/* Slide-in Panel */}
      {selectedPost && (
        <div className="slide-overlay" onClick={() => setSelectedPost(null)}>
          <div className="slide-panel" onClick={(e) => e.stopPropagation()}>
            <button 
              className="slide-close-btn"
              onClick={() => setSelectedPost(null)}
            >
              ×
            </button>
            <div className="slide-panel-image-wrapper">
              <Image
                src={selectedPost.image || "/placeholder.svg?height=250&width=500"}
                alt={selectedPost.title}
                fill
                className="slide-panel-image"
              />
            </div>
            <div className="slide-panel-body">
              <div className="slide-panel-date">{formatDate(selectedPost.createdAt)}</div>
              <h2 className="slide-panel-title">{selectedPost.title}</h2>
              <div className="slide-panel-content">
                {selectedPost.content.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              <Link href={`/blog/${selectedPost.slug}`} className="slide-panel-cta">
                View Full Article
              </Link>
            </div>
          </div>
        </div>
      )}

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
          cursor: pointer;
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
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.3s ease;
          padding: 0;
        }

        .read-more-btn:hover {
          color: #b71c1c;
        }

        /* Slide-in Panel Styles */
        .slide-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          z-index: 1000;
          animation: fadeIn 0.3s ease;
        }

        .slide-panel {
          position: fixed;
          top: 0;
          right: 0;
          width: 500px;
          max-width: 90vw;
          height: 100vh;
          background: white;
          z-index: 1001;
          overflow-y: auto;
          animation: slideInFromRight 0.4s ease;
          display: flex;
          flex-direction: column;
        }

        .slide-close-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(255, 255, 255, 0.95);
          border: none;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          cursor: pointer;
          color: #666;
          z-index: 10;
          transition: all 0.3s ease;
        }

        .slide-close-btn:hover {
          background: white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        .slide-panel-image-wrapper {
          position: relative;
          height: 220px;
          flex-shrink: 0;
        }

        .slide-panel-image {
          object-fit: cover;
        }

        .slide-panel-body {
          padding: 2rem;
          flex: 1;
          overflow-y: auto;
        }

        .slide-panel-date {
          font-size: 0.875rem;
          color: #888;
          margin-bottom: 0.75rem;
          font-weight: 500;
        }

        .slide-panel-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #0a2540;
          margin-bottom: 1.5rem;
          line-height: 1.3;
        }

        .slide-panel-content {
          font-size: 1rem;
          line-height: 1.8;
          color: #333;
          margin-bottom: 2rem;
        }

        .slide-panel-content p {
          margin-bottom: 1rem;
        }

        .slide-panel-cta {
          display: inline-block;
          background: #0a2540;
          color: white;
          padding: 0.875rem 1.5rem;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .slide-panel-cta:hover {
          background: #1a3a5c;
          transform: translateY(-2px);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideInFromRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        @media (max-width: 768px) {
          .blog-grid {
            grid-template-columns: 1fr;
          }

          .slide-panel {
            width: 90vw;
            max-width: 90vw;
          }
        }
      `}</style>
      </div>
  )
}
