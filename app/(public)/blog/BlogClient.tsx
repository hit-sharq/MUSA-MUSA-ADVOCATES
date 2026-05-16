"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, ArrowRight, BookOpen, Mail, Send, Clock, Tag } from "lucide-react"

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

interface BlogClientProps {
  posts: BlogPost[]
}

const categories = [
  "All Posts",
  "Criminal Law",
  "Family Law",
  "Corporate Law",
  "Real Estate",
  "Personal Injury",
  "Immigration",
  "Employment",
]

const categoryColors: Record<string, string> = {
  "Criminal Law": "from-red-500 to-orange-500",
  "Family Law": "from-pink-500 to-rose-500",
  "Corporate Law": "from-blue-500 to-indigo-500",
  "Real Estate": "from-green-500 to-emerald-500",
  "Personal Injury": "from-yellow-500 to-amber-500",
  "Immigration": "from-purple-500 to-violet-500",
  "Employment": "from-cyan-500 to-teal-500",
}

export default function BlogClient({ posts }: BlogClientProps) {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [activeCategory, setActiveCategory] = useState("All Posts")
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const filteredPosts = activeCategory === "All Posts"
    ? posts
    : posts.filter(post => post.category === activeCategory)

  const featuredPost = posts[0]
  const regularPosts = filteredPosts.slice(1)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail("")
    }
  }

  return (
    <div className="blog-page">
      {/* HERO SECTION */}
      <section className="blog-hero">
        <div className="blog-hero-orb" />
        <div className="blog-hero-orb" />

        <div className="blog-hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="blog-hero-badge">
              <BookOpen className="w-4 h-4" fill="currentColor" />
              <span>Legal Insights</span>
            </div>

            <h1>
              Expert <span className="highlight">Legal Insights</span> & Updates
            </h1>

            <p>
              Stay informed with our latest legal insights, case studies, and updates on important legal developments that may affect you.
            </p>

            <div className="blog-hero-stats">
              <div className="blog-hero-stat">
                <div className="blog-hero-stat-value">
                  <BookOpen className="w-5 h-5" />
                  {posts.length}
                </div>
                <div className="blog-hero-stat-label">Articles</div>
              </div>
              <div className="blog-hero-stat">
                <div className="blog-hero-stat-value">
                  <Tag className="w-5 h-5" />
                  8
                </div>
                <div className="blog-hero-stat-label">Practice Areas</div>
              </div>
              <div className="blog-hero-stat">
                <div className="blog-hero-stat-value">
                  <Clock className="w-5 h-5" />
                  24h
                </div>
                <div className="blog-hero-stat-label">Response Time</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FILTER SECTION */}
      <section className="blog-filters">
        <div className="blog-filters-wrapper">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="blog-filter-tabs">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`filter-tab ${activeCategory === category ? "active" : ""}`}
                >
                  {category}
                </button>
              ))}
            </div>
            <p className="blog-results-count">
              {filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"} {activeCategory !== "All Posts" && `in ${activeCategory}`}
            </p>
          </motion.div>
        </div>
      </section>

      {/* BLOG CONTENT */}
      <section className="blog-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="blog-empty"
            >
              <div className="blog-empty-icon">
                <BookOpen className="w-10 h-10" />
              </div>
              <h3>Blog Posts Coming Soon</h3>
              <p>
                We are currently working on our first blog posts. Check back soon for legal insights and updates.
              </p>
            </motion.div>
          ) : (
            <div className="blog-grid">
              {/* Featured Post */}
              {activeCategory === "All Posts" && featuredPost && (
                <motion.article
                  key={`featured-${featuredPost.id}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="blog-card featured"
                >
                  <Link href={`/blog/${featuredPost.slug}`}>
                    <div className="blog-card-image">
                      <Image
                        src={featuredPost.image || "/placeholder.svg?height=400&width=800"}
                        alt={featuredPost.title}
                        fill
                        className="object-cover"
                      />
                      <div className="blog-card-image-overlay" />
                      <span className="blog-card-category">Featured</span>
                    </div>
                    <div className="blog-card-content">
                      <div className="blog-card-date">
                        <Calendar className="w-4 h-4" />
                        {formatDate(featuredPost.createdAt)}
                      </div>
                      <h2 className="blog-card-title">{featuredPost.title}</h2>
                      <p className="blog-card-excerpt">
                        {featuredPost.summary || featuredPost.content.substring(0, 180) + "..."}
                      </p>
                      <div className="blog-card-footer">
                        <div className="blog-card-author">
                          <div className="blog-card-author-avatar">MM</div>
                          <span className="blog-card-author-name">Musa & Musa</span>
                        </div>
                        <span className="blog-card-read-more">
                          Read Article
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              )}

              {/* Regular Posts */}
              {regularPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="blog-card"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="blog-card-image">
                      <Image
                        src={post.image || "/placeholder.svg?height=300&width=500"}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                      <div className="blog-card-image-overlay" />
<span className="blog-card-category">
                         {post.category || "General"}
                       </span>
                    </div>
                    <div className="blog-card-content">
                      <div className="blog-card-date">
                        <Calendar className="w-4 h-4" />
                        {formatDate(post.createdAt)}
                      </div>
                      <h2 className="blog-card-title">{post.title}</h2>
                      <p className="blog-card-excerpt">
                        {post.summary || post.content.substring(0, 150) + "..."}
                      </p>
                      <div className="blog-card-footer">
                        <div className="blog-card-author">
                          <div className="blog-card-author-avatar">MM</div>
                          <span className="blog-card-author-name">Musa & Musa</span>
                        </div>
                        <span className="blog-card-read-more">
                          Read Article
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* NEWSLETTER SECTION */}
      <section className="blog-newsletter">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="blog-newsletter-content">
            <div className="blog-newsletter-icon">
              <Mail className="w-8 h-8" />
            </div>

            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="blog-newsletter-title" style={{ color: "#10b981" }}>You&apos;re Subscribed! 🎉</h2>
                <p className="blog-newsletter-text" style={{ color: "rgba(255,255,255,0.8)" }}>
                  Thank you for subscribing! Check your email for a confirmation message.
                </p>
              </motion.div>
            ) : (
              <>
                <h2 className="blog-newsletter-title">Stay Updated on Legal News</h2>
                <p className="blog-newsletter-text">
                  Get the latest legal insights, firm updates, and helpful resources delivered directly to your inbox.
                </p>
                <form className="blog-newsletter-form" onSubmit={handleSubscribe}>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="blog-newsletter-input"
                    required
                  />
                  <button type="submit" className="blog-newsletter-button blog-newsletter-btn-primary">
                    <span>Subscribe</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </section>

      {/* ARTICLE MODAL */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 bg-black/70 z-50 flex" onClick={() => setSelectedPost(null)}>
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="ml-auto w-full max-w-4xl bg-white h-full overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white hover:bg-gray-50 shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-900 transition-all z-10"
              >
                ✕
              </button>

              <div className="relative">
                <div className="relative h-80">
                  <Image
                    src={selectedPost.image || "/placeholder.svg?height=400&width=800"}
                    alt={selectedPost.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
<span className="inline-block px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-navy mb-3">
                       {selectedPost.category || "General"}
                     </span>
                    <h2 className="text-3xl font-bold text-white leading-tight">
                      {selectedPost.title}
                    </h2>
                  </div>
                </div>

                <div className="p-8 -mt-8 relative bg-white">
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white to-transparent" />
                  <div className="relative">
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand to-brand-dark flex items-center justify-center">
                        <span className="text-navy font-bold text-sm">MM</span>
                      </div>
                      <div>
                        <div className="font-semibold text-navy">Musa & Musa Advocates</div>
                        <div className="text-sm text-gray-500 flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {formatDate(selectedPost.createdAt)}
                        </div>
                      </div>
                    </div>

                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-8">
                      {selectedPost.summary && (
                        <p className="text-xl text-gray-600 italic border-l-4 border-brand pl-4 mb-6">
                          {selectedPost.summary}
                        </p>
                      )}
                      {selectedPost.content.split("\n").map((paragraph, index) => (
                        paragraph.trim() && <p key={index} className="mb-4">{paragraph}</p>
                      ))}
                    </div>

                    <div className="flex items-center gap-4">
                      <Link
                        href={`/blog/${selectedPost.slug}`}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-navy to-navy-800 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <span>Read Full Article</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => setSelectedPost(null)}
                        className="text-gray-500 hover:text-gray-700 font-medium"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
