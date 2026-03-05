"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useUser, SignInButton, UserButton } from "@clerk/nextjs"
import SearchBar from "./SearchBar"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const { user, isSignedIn } = useUser()

  useEffect(() => {
    if (isSignedIn) {
      fetch("/api/admin/check")
        .then((res) => res.json())
        .then((data) => setIsAdmin(data.isAdmin))
        .catch(() => setIsAdmin(false))
    }
  }, [isSignedIn])

  // Close menu when clicking outside
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <header className="header">
      <div className="container">
        <nav
          className="nav"
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "2rem" }}
        >
          <Link href="/" className="logo">
            MUSA & MUSA <span style={{ color: '#BDDDFC' }}>ADVOCATES</span>
          </Link>

          <ul className={`nav-links ${isMenuOpen ? "mobile-open" : ""}`}>
            <li>
              <Link href="/" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
            </li>
            <li>
              <Link href="/practice-areas" onClick={() => setIsMenuOpen(false)}>
                Practice Areas
              </Link>
            </li>

            <li>
              <Link href="/blog" onClick={() => setIsMenuOpen(false)}>
                Blog
              </Link>
            </li>
            <li>
              <Link href="/gallery" onClick={() => setIsMenuOpen(false)}>
                Gallery
              </Link>
            </li>
            <li>
              <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link>
            </li>
            {isAdmin && (
              <li>
                <Link href="/admin" className="admin-link" onClick={() => setIsMenuOpen(false)}>
                  Admin Panel
                </Link>
              </li>
            )}
            {isSignedIn ? (
              <li>
                <UserButton />
              </li>
            ) : (
              <li>
                <SignInButton mode="modal" />
              </li>
            )}
          </ul>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ display: isMenuOpen ? "none" : "block" }} className="navbar-search">
              <SearchBar />
            </div>

            <button 
              className={`mobile-menu-btn ${isMenuOpen ? "active" : ""}`} 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </nav>
      </div>
      
      {/* Mobile overlay */}
      {isMenuOpen && <div className="mobile-overlay" onClick={() => setIsMenuOpen(false)}></div>}
      
      <style jsx>{`
        .mobile-menu-btn.active {
          background: #0a2540;
          color: white;
        }
        
        @media (max-width: 768px) {
          .navbar-search {
            display: none !important;
          }
        }
        
        .mobile-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 999;
        }
      `}</style>
    </header>
  )
}
