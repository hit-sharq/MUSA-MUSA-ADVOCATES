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
            <div style={{ display: isMenuOpen ? "none" : "block" }}>
              <SearchBar />
            </div>

            <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              ☰
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}
