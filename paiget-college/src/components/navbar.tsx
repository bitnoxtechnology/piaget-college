"use client"

import { useState, useEffect } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import SecondaryLogo from "../assets/logo2.png"
import "../styles/navbar.css"

interface NavItem {
  label: string
  href: string
  submenu?: { label: string; href: string }[]
}

const navItems: NavItem[] = [
  { label: "ABOUT US", href: "/about" },
  {
    label: "ACADEMICS",
    href: "/academics",
    submenu: [
      { label: "Primary Education", href: "/academics/primary" },
      { label: "Secondary Education", href: "/academics/secondary" },
      { label: "Early Childhood", href: "/academics/early-childhood" },
      { label: "Languages (Yoruba & French)", href: "/academics/languages" },
    ],
  },
  { label: "ADMISSIONS", href: "/admissions" },
  { label: "E-LIBRARY", href: "/library" },
  { label: "WORKSHOPS", href: "/workshops" },
  { label: "CONTACT US", href: "/contact" },
  { label: "PDE", href: "/pde" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
      <img src={SecondaryLogo} alt="" />
        </Link>

        {/* Desktop Navigation */}
        <ul className="nav-menu desktop">
          {navItems.map((item) => (
            <li key={item.label} className="nav-item">
              <Link to={item.href} className="nav-link">
                {item.label}
              </Link>
              {item.submenu && (
                <div className="submenu">
                  {item.submenu.map((sub) => (
                    <Link key={sub.label} to={sub.href} className="submenu-item">
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="nav-menu mobile">
              {navItems.map((item) => (
                <li key={item.label} className="mobile-nav-item">
                  <button
                    className="mobile-nav-link"
                    onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                  >
                    {item.label}
                    {item.submenu && (
                      <ChevronDown size={18} className={`chevron ${activeDropdown === item.label ? "open" : ""}`} />
                    )}
                  </button>
                  {item.submenu && activeDropdown === item.label && (
                    <motion.div
                      className="mobile-submenu"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.label}
                          to={sub.href}
                          className="mobile-submenu-item"
                          onClick={() => setIsOpen(false)}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
