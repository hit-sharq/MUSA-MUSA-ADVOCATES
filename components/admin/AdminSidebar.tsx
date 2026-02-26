"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { UserButton } from "@clerk/nextjs"
import { useState, useEffect } from "react"

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/blog", label: "Blog Manager", icon: "📝" },
  { href: "/admin/team", label: "Team Manager", icon: "👥" },
  { href: "/admin/gallery", label: "Gallery Manager", icon: "🖼️" },
  { href: "/admin/practice-areas", label: "Practice Areas", icon: "⚖️" },
  { href: "/admin/contact-requests", label: "Contact Requests", icon: "📧" },
  { href: "/admin/testimonials", label: "Testimonials", icon: "💬" },
  { href: "/admin/profile", label: "Profile Settings", icon: "⚙️" },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileOpen(false)
      }
    }

    if (isMobileOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isMobileOpen])

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="mobile-admin-toggle"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label="Toggle admin menu"
      >
        {isMobileOpen ? "✕" : "☰"}
      </button>

      {/* Mobile Overlay */}
      <div className={`admin-mobile-overlay ${isMobileOpen ? "active" : ""}`} onClick={() => setIsMobileOpen(false)} />

      <div className={`admin-sidebar ${isMobileOpen ? "mobile-open" : ""}`}>
        <div className="admin-sidebar-header">
          <h2>Admin Panel</h2>
        </div>

        <nav className="admin-nav">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? "active" : ""}
              onClick={() => setIsMobileOpen(false)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-user-info">
            <UserButton />
            <span>Admin User</span>
          </div>
          <Link
            href="/"
            className="back-to-website"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              textAlign: "center",
            }}
          >
            🌐 Back to Website
          </Link>
        </div>
      </div>
    </>
  )
}
