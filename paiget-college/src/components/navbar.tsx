"use client";

import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SecondaryLogo from "../assets/logo2.png";
import "../styles/navbar.css";
import { useAuth } from "@/hooks/use-auth";

interface NavItem {
  label: string;
  href: string;
  submenu?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
  { label: "ABOUT US", href: "/about" },
  {
    label: "ACADEMICS",
    href: "#", // Changed from "/" to "#" to prevent homepage conflict
    submenu: [
      { label: "Schools", href: "/academics/schools" },
      { label: "Available Courses", href: "/academics/available-courses" },
      { label: "Sandwich Programme", href: "/academics/sandwich-programme" },
      { label: "Apply Now", href: "/apply" },
    ],
  },
  { label: "E-LIBRARY", href: "https://library.piagetcoe.edu.ng" },
  {
    label: "EVENTS",
    href: "#",
    submenu: [
      { label: "Workshops", href: "/workshops" },
      { label: "News", href: "/news" },
    ],
  },

  { label: "GALLERY", href: "/gallery" },
  { label: "CONTACT US", href: "/contact" },
  { label: "DASHBOARD", href: "/admin/overview" },
];

export default function Navbar() {
  const { user } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (item: NavItem) => {
    // Only check exact match if href is not "#"
    if (item.href !== "#" && location.pathname === item.href) return true;

    // Check if any submenu item is active
    if (item.submenu) {
      return item.submenu.some((sub) => location.pathname === sub.href);
    }

    return false;
  };

  const whatToRender = (item: NavItem) => {
    if (item.href === "/admin/overview") {
      return (
        <>
          {user && (
            <Link
              to={item.href}
              className="nav-link bg-primary-100 text-white!"
            >
              Dashboard
            </Link>
          )}
        </>
      );
    } else
      return (
        <Link
          to={item.href}
          className={`nav-link ${isActive(item) ? "active" : ""}`}
        >
          {item.label}
        </Link>
      );
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <img src={SecondaryLogo} alt="Piaget College Logo" />
        </Link>

        {/* Desktop Nav */}
        <ul className="nav-menu desktop">
          {navItems.map((item) => (
            <li key={item.label} className="nav-item">
              {item.submenu ? (
                <span
                  className={`nav-link ${isActive(item) ? "active" : ""}`}
                  style={{ cursor: "default" }}
                >
                  {item.label}
                </span>
              ) : (
                whatToRender(item)
              )}
              {item.submenu && (
                <div className="submenu">
                  {item.submenu.map((sub) => (
                    <Link
                      key={sub.label}
                      to={sub.href}
                      className={`submenu-item ${
                        location.pathname === sub.href ? "active" : ""
                      }`}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
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
                  {item.submenu ? (
                    <>
                      <button
                        className={`mobile-nav-link ${
                          isActive(item) ? "active" : ""
                        }`}
                        onClick={() =>
                          setActiveDropdown(
                            activeDropdown === item.label ? null : item.label
                          )
                        }
                      >
                        {item.label}
                        <ChevronDown
                          size={18}
                          className={`chevron ${
                            activeDropdown === item.label ? "open" : ""
                          }`}
                        />
                      </button>
                      {activeDropdown === item.label && (
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
                              className={`mobile-submenu-item ${
                                location.pathname === sub.href ? "active" : ""
                              }`}
                              onClick={() => setIsOpen(false)}
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.href}
                      className={`mobile-nav-link ${
                        isActive(item) ? "active" : ""
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
