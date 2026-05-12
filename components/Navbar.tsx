"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useUser, SignInButton, UserButton } from "@clerk/nextjs"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import SearchBar from "./SearchBar"
import { Menu, X, Shield, Home, Briefcase, Users, Image, FileText, Building2, Phone, Star } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { user, isSignedIn } = useUser()

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

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsMenuOpen(false)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/about", label: "About", icon: Shield },
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

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-navy/20 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-sm bg-white z-50 lg:hidden shadow-2xl overflow-y-auto"
            >
              <div className="h-full flex flex-col">
                {/* Header with logo and close button */}
                <div className="flex items-center justify-between p-4 border-b border-brand/10 flex-shrink-0">
                  <Link href="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand to-brand-800 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-navy" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-navy leading-none">Musa & Musa</div>
                      <div className="text-xs font-semibold text-brand-800 leading-none">ADVOCATES</div>
                    </div>
                  </Link>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-brand/10 text-navy hover:bg-brand/20 transition-colors flex-shrink-0"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Navigation Links - now takes most of screen */}
                <nav className="flex-1 overflow-y-auto py-2">
                  <div className="flex flex-col">
                    {navLinks.map((link, index) => {
                      const Icon = link.icon || Shield
                      const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
                      return (
                        <motion.div
                          key={link.href}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Link
                            href={link.href}
                            onClick={() => setIsMenuOpen(false)}
                            className={`flex items-center gap-3 px-5 py-3.5 text-base font-medium rounded-lg transition-all duration-200 mx-2 ${
                              isActive
                                ? "bg-brand/15 text-navy"
                                : "text-navy/80 hover:text-navy hover:bg-brand/10"
                            }`}
                          >
                            <Icon className="w-5 h-5 flex-shrink-0" />
                            <span className="truncate">{link.label}</span>
                          </Link>
                        </motion.div>
                      )
                    })}
                  </div>
                </nav>

                {/* Mobile Auth Section */}
                <div className="p-4 border-t border-brand/10 flex-shrink-0">
                  <div className="flex flex-col gap-2">
                    {isAdmin && (
                      <Link
                        href="/admin"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-navy to-navy-200 rounded-lg"
                      >
                        <Shield className="w-4 h-4" />
                        Admin Panel
                      </Link>
                    )}
                    {isSignedIn ? (
                      <div className="flex items-center justify-center gap-3 px-4 py-2">
                        <UserButton
                          afterSignOutUrl="/"
                          appearance={{
                            elements: {
                              avatarBox: "w-9 h-9 rounded-lg",
                              userButtonPopoverCard: "shadow-xl border border-brand/10",
                            },
                          }}
                        />
                        <span className="text-sm text-navy/70">Signed in</span>
                      </div>
                    ) : (
                      <SignInButton mode="modal">
                        <button className="w-full px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-brand to-brand-800 rounded-lg hover:from-brand-800 hover:to-brand transition-all duration-200 shadow-md">
                          Sign In
                        </button>
                      </SignInButton>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
