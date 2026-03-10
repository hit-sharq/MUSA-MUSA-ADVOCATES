import Link from "next/link"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand-section">
            <div className="footer-brand">
              <h3>Musa & Musa Advocates</h3>
              <span className="footer-tagline">Advocates & Legal Consultants</span>
            </div>
            <p className="footer-description">
              Experienced Legal Representation You Can Trust. Providing professional legal services with integrity and dedication for over 15 years.
            </p>
            <div className="footer-contact">
              <a href="mailto:officialmutuku@gmail.com" className="footer-contact-item">
                <span className="contact-icon">✉️</span>
                <span>officialmutuku@gmail.com</span>
              </a>
              <a href="tel:+254758251399" className="footer-contact-item">
                <span className="contact-icon">📞</span>
                <span>+254 758 251 399</span>
              </a>
              <div className="footer-contact-item">
                <span className="contact-icon">📍</span>
                <span>6076 Rhapta Road, Nairobi</span>
              </div>
            </div>
          </div>

          <div className="footer-links-section">
            <h4 className="footer-heading">Practice Areas</h4>
            <ul className="footer-links">
              <li><Link href="/practice-areas">Civil Litigation</Link></li>
              <li><Link href="/practice-areas">Criminal Defense</Link></li>
              <li><Link href="/practice-areas">Family Law</Link></li>
              <li><Link href="/practice-areas">Corporate Law</Link></li>
              <li><Link href="/practice-areas">Property Law</Link></li>
              <li><Link href="/about">View All Areas →</Link></li>
            </ul>
          </div>

          <div className="footer-links-section">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/practice-areas">Practice Areas</Link></li>
              <li><Link href="/blog">Legal Blog</Link></li>
              <li><Link href="/gallery">Gallery</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div className="footer-links-section">
            <h4 className="footer-heading">Office Hours</h4>
            <ul className="footer-hours">
              <li><span>Monday - Friday</span><span>8:00 AM - 6:00 PM</span></li>
              <li><span>Saturday</span><span>9:00 AM - 2:00 PM</span></li>
              <li><span>Sunday</span><span>Closed</span></li>
            </ul>
            <div className="footer-social">
              <a href="https://facebook.com/mutukumoses" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
                �Fb
              </a>
              <Link href="https://x.com/musa_mutuku" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Twitter">
                𝕏
              </Link>
              <a href="https://www.linkedin.com/in/musa-mutuku-b4b3a6201/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                in
              </a>
              <a href="https://www.instagram.com/mwanamutuku/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                📷
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">&copy; 2025 Musa & Musa Advocates. All rights reserved.</p>
            <p className="footer-license">
              Licensed to practice law in Kenya | Subject to Law Society of Kenya regulations
            </p>
          </div>
          <div className="footer-legal">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <span className="divider">|</span>
            <Link href="/terms-of-use">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
