"use client"

import { Facebook, Instagram, Mail, Phone, MapPin, ArrowUp } from "lucide-react"
import { useState } from "react"
import { useEffect } from "react"
import "../styles/footer.css"

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const footerSections = [
    {
      title: "New Students",
      links: [
        { text: "Check Admission Status", href: "#" },
        { text: "Entry Requirements", href: "#" },
        { text: "Prospective Students", href: "#" },
        { text: "Available Courses", href: "#" },
        { text: "How To Apply", href: "#" },
      ],
    },
    {
      title: "Quick Links",
      links: [
        { text: "Make Enquiries", href: "#" },
        { text: "News and More Information", href: "#" },
        { text: "Professional Diploma in Education", href: "#" },
        { text: "About us", href: "#" },
        { text: "Academic Calendar", href: "#" },
        { text: "Available Courses", href: "#" },
        { text: "Privacy Policy", href: "#" },
      ],
    },
    {
      title: "Follow us on Social Media",
      social: true,
      links: [
        { icon: Facebook, href: "#", label: "Facebook" },
        { icon: Instagram, href: "#", label: "Instagram" },
      ],
    },
  ]

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {footerSections.map((section, idx) => (
            <div key={idx} className="footer-section">
              <h3 className="footer-title">{section.title}</h3>
              {section.social ? (
                <div className="social-links">
                  {section.links.map((link, i) => {
                    const Icon = link.icon
                    return (
                      <a
                        key={i}
                        href={link.href}
                        className="social-icon"
                        aria-label={link.label}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon size={24} />
                      </a>
                    )
                  })}
                </div>
     ) : (
                <ul className="footer-links">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a href={link.href}>{'text' in link ? link.text : ''}</a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* Admission Office Section */}
          <div className="footer-section admission-section">
            <h3 className="footer-title">Admission Office</h3>
            <div className="admission-info">
              <h4>PIAGET College of Education</h4>
              <div className="info-item">
                <MapPin size={18} />
                <div>
                  <p>34, Quarry Road,</p>
                  <p>Ibara, Abeokuta,</p>
                  <p>Ogun State, Nigeria.</p>
                </div>
              </div>
              <div className="info-item">
                <Phone size={18} />
                <div>
                  <p>Phone Numbers:</p>
                  <a href="tel:+2348097729616">08097729616</a>
                  <a href="tel:+2349036002738">09036002738</a>
                </div>
              </div>
              <div className="info-item">
                <Mail size={18} />
                <a href="mailto:info@piagetcoe.edu.ng">info@piagetcoe.edu.ng</a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>&copy; 2025 PIAGET College of Education. All rights reserved.</p>
          <button
            className={`scroll-top-btn ${showScrollTop ? "visible" : ""}`}
            onClick={scrollToTop}
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  )
}
