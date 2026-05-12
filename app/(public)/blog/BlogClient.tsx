"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  summary: string | null
  image: string | null
  published: boolean
  createdAt: Date
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
          <div className="card text-center py-16">
            <h3 className="text-navy mb-3">Blog Posts Coming Soon</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              We are currently working on our first blog posts. Check back soon for legal insights and updates.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-brand/10 transition-all duration-300"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg?height=300&width=500"}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-navy">
                    {formatDate(post.createdAt)}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-navy mb-3 line-clamp-2 group-hover:text-brand-800 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-navy/70 text-sm leading-relaxed line-clamp-3 mb-6">
                    {post.summary || post.content.substring(0, 120) + "..."}
                  </p>
<Link
  href={`/blog/${post.slug}`}
  className="inline-flex items-center text-brand-800 font-semibold group"
>
  <span>Read Article</span>
  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
</Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="relative inline-block">
            <div className="absolute -top-8 -right-8 w-full h-full bg-gradient-to-br from-brand to-brand-800 rounded-3xl opacity-20 blur-xl" />
            <Link
              href="/blog"
              className="relative inline-block bg-gradient-to-r from-navy to-navy-800 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              View All Articles
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Slide-in Panel */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/70 z-50 flex" onClick={() => setSelectedPost(null)}>
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="ml-auto w-full max-w-3xl bg-white h-full overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-900 transition-all"
            >
              ✕
            </button>
            <div className="relative h-64">
              <Image
                src={selectedPost.image || "/placeholder.svg?height=400&width=800"}
                alt={selectedPost.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-8 -mt-16 relative bg-white">
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white to-transparent" />
              <div className="relative">
                <div className="text-sm text-brand-800 font-semibold mb-2">{formatDate(selectedPost.createdAt)}</div>
                <h2 className="text-3xl font-bold text-navy mb-6 leading-tight">{selectedPost.title}</h2>
                <div className="prose prose-navy max-w-none text-navy/80 leading-relaxed">
                  {selectedPost.content.split("\n").map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
                <div className="mt-8">
                  <Link href={`/blog/${selectedPost.slug}`} className="inline-flex items-center bg-gradient-to-r from-navy to-navy-800 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    Read Full Article
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
