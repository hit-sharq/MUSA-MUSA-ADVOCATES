import Link from "next/link"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="flex items-center gap-4 mb-4">
              <img
                src="/Musa.jpg"
                alt="Musa & Musa Advocates"
                className="w-16 h-16 object-cover rounded-full shadow-lg border-2 border-[#BDDDFC]"
              />
              <div>
                <h3>Musa & Musa Advocates</h3>
                <p className="text-sm opacity-90">Advocates & Legal Consultants</p>
              </div>
            </div>
            <p>Experienced Legal Representation You Can Trust</p>
            <p>Providing professional legal services with integrity and dedication.</p>
          </div>

          <div className="footer-section">
            <h3>Practice Areas</h3>
            <p>
              <Link href="/practice-areas">Civil Litigation</Link>
            </p>
            <p>
              <Link href="/practice-areas">Criminal Defense</Link>
            </p>
            <p>
              <Link href="/practice-areas">Family Law</Link>
            </p>
            <p>
              <Link href="/practice-areas">Corporate Law</Link>
            </p>
            <p>
              <Link href="/practice-areas">Property Law</Link>
            </p>
            <p>
              <Link href="/about">View All Areas</Link>
            </p>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <p>
              <Link href="/about">About Us</Link>
            </p>
            <p>
              <Link href="/practice-areas">Practice Areas</Link>
            </p>
            <p>
              <Link href="/team">Our Team</Link>
            </p>
            <p>
              <Link href="/blog">Legal Blog</Link>
            </p>
            <p>
              <Link href="/gallery">Gallery</Link>
            </p>
            <p>
              <Link href="/contact">Contact Us</Link>
            </p>
          </div>

          <div className="footer-section">
            <h3>Contact Info</h3>
            <p>📧 officialmutuku@gmail.com</p>
            <p>📞 +254 758 251 399</p>
            <p>📍 Nairobi, Kenya</p>
            <div className="mt-4">
              <h4 className="text-white font-semibold mb-2">Office Hours</h4>
              <p className="text-sm">Mon - Fri: 8:00 AM - 6:00 PM</p>
              <p className="text-sm">Saturday: 9:00 AM - 2:00 PM</p>
              <p className="text-sm">Sunday: Closed</p>
            </div>
          </div>

          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="flex flex-col space-y-2">
              <p>
                <a href="https://facebook.com/mutukumoses" target="_blank" rel="noopener noreferrer">
                  🄼 Facebook
                </a>
              </p>
              <p>
                <Link href="https://x.com/musa_mutuku" target="_blank" rel="noopener noreferrer">
                  🅄 Twitter
                </Link>
              </p>
              <p>
                <a href="https://www.linkedin.com/in/musa-mutuku-b4b3a6201/" target="_blank" rel="noopener noreferrer">
                  🅂 LinkedIn
                </a>
              </p>
              <p>
                <a href="https://www.instagram.com/mwanamutuku/" target="_blank" rel="noopener noreferrer">
                  🄰 Instagram
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 Musa & Musa Advocates. All rights reserved.</p>
          <p className="text-sm text-gray-400 mt-2">
            Licensed to practice law in Kenya | Subject to Law Society of Kenya regulations
          </p>
          <div className="flex justify-center gap-4 mt-2">
            <Link href="/privacy-policy" className="text-sm text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="text-gray-400">|</span>
            <Link href="/terms-of-use" className="text-sm text-gray-400 hover:text-white transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
