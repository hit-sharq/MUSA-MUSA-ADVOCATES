import Link from "next/link"
import { Shield, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react"

export default function Footer() {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
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
            <p className="text-white/70 leading-relaxed mb-6">
              Premier law firm delivering exceptional legal services with integrity, professionalism, and an unwavering dedication to justice.
            </p>
            <div className="space-y-4">
              <a
                href="mailto:info@musadvocates.co.ke"
                className="flex items-center gap-3 text-white/70 hover:text-brand transition-colors"
              >
                <Mail className="w-5 h-5 text-brand" />
                <span>info@musadvocates.co.ke</span>
              </a>
              <a
                href="tel:+254758251399"
                className="flex items-center gap-3 text-white/70 hover:text-brand transition-colors"
              >
                <Phone className="w-5 h-5 text-brand" />
                <span>+254 758 251 399</span>
              </a>
              <div className="flex items-center gap-3 text-white/70">
                <MapPin className="w-5 h-5 text-brand" />
                <span>6076 Rhapta Road, Nairobi</span>
              </div>
            </div>
          </div>

          {/* Practice Areas */}
          <div>
            <h4 className="text-lg font-bold text-brand mb-6">Practice Areas</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/practice-areas" className="text-white/70 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand/50 group-hover:bg-brand transition-colors" />
                  Civil Litigation
                </Link>
              </li>
              <li>
                <Link href="/practice-areas" className="text-white/70 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand/50 group-hover:bg-brand transition-colors" />
                  Criminal Defense
                </Link>
              </li>
              <li>
                <Link href="/practice-areas" className="text-white/70 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand/50 group-hover:bg-brand transition-colors" />
                  Family Law
                </Link>
              </li>
              <li>
                <Link href="/practice-areas" className="text-white/70 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand/50 group-hover:bg-brand transition-colors" />
                  Corporate Law
                </Link>
              </li>
              <li>
                <Link href="/practice-areas" className="text-white/70 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand/50 group-hover:bg-brand transition-colors" />
                  Property Law
                </Link>
              </li>
              <li>
                <Link href="/practice-areas" className="text-brand hover:text-white transition-colors font-semibold flex items-center gap-2 mt-2">
                  View All Areas →
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-brand mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-white/70 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand/50 group-hover:bg-brand transition-colors" />
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/practice-areas" className="text-white/70 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand/50 group-hover:bg-brand transition-colors" />
                  Practice Areas
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-white/70 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand/50 group-hover:bg-brand transition-colors" />
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-white/70 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand/50 group-hover:bg-brand transition-colors" />
                  Legal Insights
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-white/70 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand/50 group-hover:bg-brand transition-colors" />
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/70 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand/50 group-hover:bg-brand transition-colors" />
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Office Hours & Social */}
          <div>
            <h4 className="text-lg font-bold text-brand mb-6">Office Hours</h4>
            <ul className="space-y-3 mb-8">
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

            <h4 className="text-lg font-bold text-brand mb-4">Follow Us</h4>
            <div className="flex gap-3">
              <a
                href="https://facebook.com/mutukumoses"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-brand/20 flex items-center justify-center text-white/70 hover:text-brand transition-all duration-300 border border-white/10 hover:border-brand/30"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/musa_mutuku"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-brand/20 flex items-center justify-center text-white/70 hover:text-brand transition-all duration-300 border border-white/10 hover:border-brand/30"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/musa-mutuku-b4b3a6201/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-brand/20 flex items-center justify-center text-white/70 hover:text-brand transition-all duration-300 border border-white/10 hover:border-brand/30"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/mwanamutuku/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-brand/20 flex items-center justify-center text-white/70 hover:text-brand transition-all duration-300 border border-white/10 hover:border-brand/30"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
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
                System managed by <a href="https://lumyn-tech.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-brand/80 hover:text-brand transition-colors">Lumyn Tech</a>
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
