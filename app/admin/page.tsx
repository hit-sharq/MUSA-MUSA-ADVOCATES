import Link from "next/link"
import { prisma } from "@/lib/prisma"

async function getAdminStats() {
  const [blogCount, teamCount, galleryCount, practiceAreaCount, contactCount, testimonialCount] = await Promise.all([
    prisma.blogPost.count(),
    prisma.teamMember.count(),
    prisma.galleryImage.count(),
    prisma.practiceArea.count(),
    prisma.contactRequest.count(),
    prisma.testimonials.count(),
  ])

  return {
    blogCount,
    teamCount,
    galleryCount,
    practiceAreaCount,
    contactCount,
    testimonialCount,
  }
}

export default async function AdminDashboard() {
  const stats = await getAdminStats()

  return (
    <div className="admin-main">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <Link href="/" className="back-to-website">
          🌐 Back to Website
        </Link>
      </div>

      <div className="admin-stats">
        <div className="stat-card">
          <div className="stat-number">{stats.blogCount}</div>
          <div className="stat-label">Blog Posts</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.teamCount}</div>
          <div className="stat-label">Team Members</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.galleryCount}</div>
          <div className="stat-label">Gallery Images</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.practiceAreaCount}</div>
          <div className="stat-label">Practice Areas</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.contactCount}</div>
          <div className="stat-label">Contact Requests</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.testimonialCount}</div>
          <div className="stat-label">Testimonials</div>
        </div>
      </div>

      <div className="admin-card">
        <h2>Quick Actions</h2>
        <div className="grid grid-3" style={{ marginTop: "2rem" }}>
          <Link href="/admin/blog/new" className="btn btn-primary" style={{ textAlign: "center", padding: "1.5rem" }}>
            📝 Create New Blog Post
          </Link>
          <Link href="/admin/team/new" className="btn btn-primary" style={{ textAlign: "center", padding: "1.5rem" }}>
            👥 Add Team Member
          </Link>
          <Link
            href="/admin/gallery/new"
            className="btn btn-primary"
            style={{ textAlign: "center", padding: "1.5rem" }}
          >
            🖼️ Upload Gallery Image
          </Link>
          <Link
            href="/admin/practice-areas/new"
            className="btn btn-primary"
            style={{ textAlign: "center", padding: "1.5rem" }}
          >
            ⚖️ Add Practice Area
          </Link>
          <Link
            href="/admin/contact-requests"
            className="btn btn-secondary"
            style={{ textAlign: "center", padding: "1.5rem" }}
          >
            📧 View Contact Requests
          </Link>
          <Link href="/admin/profile" className="btn btn-secondary" style={{ textAlign: "center", padding: "1.5rem" }}>
            ⚙️ Profile Settings
          </Link>
          <Link
            href="/admin/testimonials/new"
            className="btn btn-primary"
            style={{ textAlign: "center", padding: "1.5rem" }}
          >
            💬 Add Testimonial
          </Link>
        </div>
      </div>

      <div className="admin-card">
        <h2>Recent Activity</h2>
        <p style={{ color: "#666", marginBottom: "2rem" }}>
          Welcome to your admin dashboard. From here you can manage all aspects of your law firm website including blog
          posts, team members, gallery images, and more.
        </p>

        <div style={{ background: "#f8fafc", padding: "2rem", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
          <h3 style={{ color: "#1a365d", marginBottom: "1rem" }}>Getting Started</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li style={{ marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ color: "#d4af37" }}>✓</span>
              <span>Add your practice areas to showcase your legal expertise</span>
            </li>
            <li style={{ marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ color: "#d4af37" }}>✓</span>
              <span>Upload team member profiles and photos</span>
            </li>
            <li style={{ marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ color: "#d4af37" }}>✓</span>
              <span>Create engaging blog posts to attract clients</span>
            </li>
            <li style={{ marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ color: "#d4af37" }}>✓</span>
              <span>Add gallery images to showcase achievements</span>
            </li>
            <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ color: "#d4af37" }}>✓</span>
              <span>Monitor and respond to contact requests</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
