"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, Clock, ArrowLeft, Twitter, Linkedin, Mail, Phone, Tag } from "lucide-react"

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
}

interface RelatedPost {
  id: string
  title: string
  slug: string
  content: string
  summary: string | null
  image: string | null
  category: string | null
  createdAt: Date
}

interface BlogPostClientProps {
  post: BlogPost
  relatedPosts: RelatedPost[]
}

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default function BlogPostClient({ post, relatedPosts }: BlogPostClientProps) {

  return (
    <div className="blog-post-page">
      {/* HERO SECTION */}
      <section className="blog-post-hero">
        <div className="blog-post-hero-orb" />
        <div className="blog-post-hero-orb" />

        <motion.div
          className="blog-post-hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="blog-post-badge">
            <Tag className="w-4 h-4" fill="currentColor" />
            <span>{post.category || "General"}</span>
          </div>

          <h1>{post.title}</h1>

          <div className="blog-post-meta">
            <div className="blog-post-meta-item">
              <Calendar className="w-5 h-5" />
              <span>{formatDate(post.createdAt)}</span>
            </div>
            <div className="blog-post-meta-item">
              <Clock className="w-5 h-5" />
              <span>8 min read</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ARTICLE SECTION */}
      <section className="blog-article-section">
        <div className="blog-article-wrapper">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Back Button */}
            <Link href="/blog" className="blog-back-button">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Blog</span>
            </Link>

            {/* Article Card */}
            <article className="blog-article-card">
              {post.image && (
                <div className="blog-article-image">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="blog-article-image-overlay" />
                </div>
              )}

              <div className="blog-article-content">
<div className="article-category-badge">
                   <Tag className="w-4 h-4" fill="currentColor" />
                   <span>{post.category || "General"}</span>
                 </div>

                <h1 className="article-title">{post.title}</h1>

                <div className="article-meta">
                  <div className="article-author">
                    <div className="article-author-avatar">MM</div>
                    <span className="article-author-name">Musa & Musa Advocates</span>
                  </div>
                  <div className="article-meta-item">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(post.createdAt)}</span>
                  </div>
                  <div className="article-meta-item">
                    <Clock className="w-4 h-4" />
                    <span>8 min read</span>
                  </div>
                </div>

                <div className="article-body">
                  {post.summary && (
                    <p style={{ fontSize: "1.15rem", color: "var(--text-secondary)", fontStyle: "italic", borderLeft: "4px solid var(--brand)", paddingLeft: "1.5rem", marginBottom: "2rem" }}>
                      {post.summary}
                    </p>
                  )}
                  {post.content.split("\n").map((paragraph, index) => (
                    paragraph.trim() && <p key={index}>{paragraph}</p>
                  ))}
                </div>

                {/* Share Buttons */}
                <div className="article-actions">
                  <div>
                    <span className="article-share-label">Share this article:</span>
                    <div className="article-share-buttons">
                      <button className="share-button" title="Share on Twitter">
                        <Twitter className="w-5 h-5" />
                      </button>
                      <button className="share-button" title="Share on LinkedIn">
                        <Linkedin className="w-5 h-5" />
                      </button>
                      <button className="share-button" title="Share via Email">
                        <Mail className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="blog-cta-section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="blog-cta-content">
            <div className="blog-cta-icon">
              <Phone className="w-8 h-8" fill="currentColor" />
            </div>
            <h2 className="blog-cta-title">Need Legal Assistance?</h2>
            <p className="blog-cta-text">
              If you have questions about this topic or need legal representation, don&apos;t hesitate to contact us for a consultation.
            </p>
            <Link href="/contact" className="blog-cta-button blog-cta-btn-primary">
              <span>Schedule a Consultation</span>
              <ArrowLeft className="w-5 h-5" style={{ transform: "rotate(180deg)" }} />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* RELATED ARTICLES */}
      {relatedPosts.length > 0 && (
        <section className="blog-related-section">
          <div className="blog-related-wrapper">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="blog-related-header">
                <h2 className="blog-related-title">Related Articles</h2>
                <p className="blog-related-text">Explore more insights on similar topics</p>
              </div>

              <div className="blog-related-grid">
                {relatedPosts.map((relatedPost, index) => (
                  <motion.article
                    key={relatedPost.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link href={`/blog/${relatedPost.slug}`} className="related-card">
                      <div className="related-card-image">
                        <Image
                          src={relatedPost.image || "/placeholder.svg?height=300&width=500"}
                          alt={relatedPost.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="related-card-content">
<span className="related-card-category">
                           {relatedPost.category || "General"}
                         </span>
                        <h3 className="related-card-title">{relatedPost.title}</h3>
                        <p className="related-card-excerpt">
                          {relatedPost.summary || relatedPost.content.substring(0, 120) + "..."}
                        </p>
                        <div className="related-card-footer">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(relatedPost.createdAt)}</span>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  )
}
