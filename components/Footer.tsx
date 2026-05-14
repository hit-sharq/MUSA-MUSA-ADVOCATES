"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Shield, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowRight } from "lucide-react"

interface PracticeArea {
  id: string
  slug: string
  title: string
}

export default function Footer() {
  const [practiceAreas, setPracticeAreas] = useState<PracticeArea[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPracticeAreas()
  }, [])

  const fetchPracticeAreas = async () => {
    try {
      const response = await fetch("/api/practice-areas")
      const data = await response.json()
      setPracticeAreas(data.slice(0, 5))
    } catch (error) {
      console.error("Error fetching practice areas:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <footer className="relative bg-gradient-to-b from-navy to-navy-800 pt-20 pb-8 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-0 left-0 w-full h-full bg-center"
          style={{
            backgroundImage: `url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand to-brand-800 flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white leading-none">Musa & Musa</h3>
                <span className="text-sm font-semibold text-brand tracking-wider leading-none mt-1 block">
                  ADVOCATES
                </span>
              </div>
            </div>
            <p className="text-white/70 leading-relaxed mb-6 text-sm">
              Premier law firm delivering exceptional legal services with integrity, professionalism, and an unwavering dedication to justice.
            </p>
            <div className="space-y-3">
              <a
                href="mailto:info@musadvocates.co.ke"
                className="flex items-center gap-3 text-white/70 hover:text-brand transition-colors text-sm"
              >
                <Mail className="w-4 h-4 text-brand" />
                <span>info@musadvocates.co.ke</span>
              </a>
              <a
                href="tel:+254758251399"
                className="flex items-center gap-3 text-white/70 hover:text-brand transition-colors text-sm"
              >
                <Phone className="w-4 h-4 text-brand" />
                <span>+254 758 251 399</span>
              </a>
              <div className="flex items-center gap-3 text-white/70 text-sm">
                <MapPin className="w-4 h-4 text-brand" />
                <span>6076 Rhapta Road, Nairobi</span>
              </div>
            </div>
          </div>

          {/* Practice Areas */}
          <div>
            <h4 className="text-lg font-bold text-brand mb-6 uppercase tracking-wider">Practice Areas</h4>
            {loading ? (
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-5 bg-white/10 rounded animate-pulse" />
                ))}
              </div>
            ) : (
              <>
                <ul className="space-y-3">
                  {practiceAreas.map((area) => (
                    <li key={area.id}>
                      <Link
                        href={`/practice-areas/${area.slug}`}
                        className="text-white/70 hover:text-white transition-colors flex items-center gap-2 group uppercase text-sm tracking-wide"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-brand/50 group-hover:bg-brand transition-colors" />
                        {area.title.toUpperCase()}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/practice-areas"
                  className="inline-flex items-center gap-2 text-brand hover:text-white transition-colors font-semibold text-sm mt-4 group"
                >
                  <span>View All Areas</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-brand mb-6 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { href: "/about", label: "About Us" },
                { href: "/practice-areas", label: "Practice Areas" },
                { href: "/team", label: "Our Team" },
                { href: "/blog", label: "Legal Insights" },
                { href: "/careers", label: "Careers" },
                { href: "/contact", label: "Contact Us" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors flex items-center gap-2 group uppercase text-sm tracking-wide"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand/50 group-hover:bg-brand transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Office Hours */}
          <div>
            <h4 className="text-lg font-bold text-brand mb-6 uppercase tracking-wider">Office Hours</h4>
            <ul className="space-y-3 mb-8 text-sm">
              <li className="flex justify-between text-white/70 border-b border-white/10 pb-2">
                <span>Monday - Friday</span>
                <span className="text-white">8:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between text-white/70 border-b border-white/10 pb-2">
                <span>Saturday</span>
                <span className="text-white">9:00 AM - 2:00 PM</span>
              </li>
              <li className="flex justify-between text-white/70 pb-2">
                <span>Sunday</span>
                <span className="text-white">Closed</span>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-lg font-bold text-brand mb-6 uppercase tracking-wider">Connect With Us</h4>
            <p className="text-white/70 text-sm mb-6">
              Follow us on social media for legal updates and firm news.
            </p>
            <div className="flex gap-3 mb-8">
              {[
                { href: "https://facebook.com/mutukumoses", icon: Facebook, label: "Facebook" },
                { href: "https://x.com/musa_mutuku", icon: Twitter, label: "Twitter" },
                { href: "https://www.linkedin.com/in/musa-mutuku-b4b3a6201/", icon: Linkedin, label: "LinkedIn" },
                { href: "https://www.instagram.com/mwanamutuku/", icon: Instagram, label: "Instagram" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/10 hover:bg-brand/20 flex items-center justify-center text-white/70 hover:text-brand transition-all duration-300 border border-white/10 hover:border-brand/30"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-white/60 text-sm">
                © {new Date().getFullYear()} Musa & Musa Advocates. All rights reserved.
              </p>
              <p className="text-white/40 text-xs mt-1">
                Licensed to practice law in Kenya | Subject to Law Society of Kenya regulations
              </p>
              <p className="text-white/40 text-xs mt-1">
                System managed by{" "}
                <a
                  href="https://lumyn-tech.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand/80 hover:text-brand transition-colors"
                >
                  Lumyn Tech
                </a>
              </p>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/privacy-policy" className="text-white/60 hover:text-brand transition-colors">
                Privacy Policy
              </Link>
              <span className="text-white/30">|</span>
              <Link href="/terms-of-use" className="text-white/60 hover:text-brand transition-colors">
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent" />
    </footer>
  )
}
