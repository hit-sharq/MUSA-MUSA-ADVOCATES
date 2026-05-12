"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { useUser, SignInButton, UserButton } from "@clerk/nextjs"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import SearchBar from "./SearchBar"
import { Menu, X, Shield, Home, Briefcase, Users, Image, FileText, Building2, Phone } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { user, isSignedIn } = useUser()
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isSignedIn) {
      fetch("/api/admin/check")
        .then((res) => res.json())
        .then((data) => setIsAdmin(data.isAdmin))
        .catch(() => setIsAdmin(false))
    }
  }, [isSignedIn])

  // Track scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMenuOpen])

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/about", label: "About", icon: Shield },
    { href: "/practice-areas", label: "Practice Areas", icon: Briefcase },
    { href: "/team", label: "Our Team", icon: Users },
    { href: "/gallery", label: "Gallery", icon: Image },
    { href: "/blog", label: "Insights", icon: FileText },
    { href: "/careers", label: "Careers", icon: Building2 },
    { href: "/contact", label: "Contact", icon: Phone },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-brand/10"
          : "bg-white/90 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-20 gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand to-brand-800 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              <Shield className="w-5 h-5 text-navy" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-navy leading-none">
                Musa & Musa
              </span>
              <span className="text-xs font-semibold text-brand-800 tracking-wider leading-none mt-0.5">
                ADVOCATES
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 group ${
                    isActive
                      ? "text-navy bg-brand/10"
                      : "text-navy/80 hover:text-navy hover:bg-brand/10"
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>
                  <div className="absolute inset-0 rounded-lg bg-brand/0 group-hover:bg-brand/10 transition-colors duration-200" />
                </Link>
              )
            })}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Search - Hidden on mobile */}
            <div className="hidden md:block relative">
              <SearchBar />
            </div>

            {/* Admin/Sign In */}
            <div className="hidden md:flex items-center gap-2">
              {isAdmin && (
                <Link
                  href="/admin"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-navy to-navy-200 rounded-lg hover:from-navy-200 hover:to-navy transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Admin</span>
                </Link>
              )}
              {isSignedIn ? (
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-9 h-9 rounded-lg",
                      userButtonPopoverCard: "shadow-xl border border-brand/10",
                    },
                  }}
                />
              ) : (
                <SignInButton mode="modal">
                  <button className="px-4 py-2 text-sm font-semibold text-navy bg-brand/20 hover:bg-brand/30 rounded-lg transition-all duration-200 border border-brand/30 hover:border-brand/50">
                    Sign In
                  </button>
                </SignInButton>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden relative w-11 h-11 flex items-center justify-center rounded-lg transition-all duration-200 ${
                isMenuOpen
                  ? "bg-navy text-white"
                  : "bg-brand/10 text-navy hover:bg-brand/20"
              }`}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </div>

      {/* Simple Dropdown Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 bg-white border-t border-brand/10 shadow-xl z-40 lg:hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon || Shield
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? "bg-brand/15 text-navy"
                        : "text-navy/80 hover:text-navy hover:bg-brand/10"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
