"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import "../styles/herosection.css"
import Hero1 from "../assets/Hero1.jpeg"
import Hero2 from "../assets/Hero2.jpeg"
import Hero3 from "../assets/Hero3.jpeg"

const slides = [
  {
    image:Hero1,
    title: "Piaget College of Education",
    subtitle: "At Piaget College, we nurture future leaders with quality education and professional growth.",
  },
  {
    image: Hero2,
    title: "Quality Education",
    subtitle: "Excellence in learning through dedicated faculty and world-class programs.",
  },
  {
    image: Hero3,
    title: "Nurturing Future Leaders",
    subtitle: "Building tomorrow's educators with passion, integrity, and innovation.",
  },
]

function AnimatedText({ text }: { text: string }) {
  const characters = text.split("")

  return (
    <motion.div className="animated-text-container">
      {characters.map((char, index) => (
        <motion.span
          key={index}
          className="animated-character"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.04,
            delay: index * 0.03,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  )
}

export default function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay])

  const goToSlide = (index: number) => {
    setCurrent(index)
    setAutoplay(false)
    setTimeout(() => setAutoplay(true), 8000)
  }

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length)
    setAutoplay(false)
    setTimeout(() => setAutoplay(true), 8000)
  }

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
    setAutoplay(false)
    setTimeout(() => setAutoplay(true), 8000)
  }

  return (
    <div className="hero-section">
      <div className="carousel-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="carousel-slide"
            style={{
              backgroundImage: `url(${slides[current].image})`,
            }}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="carousel-overlay" />
            <motion.div
              className="hero-content"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.h1
                className="home-hero-title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {slides[current].title}
              </motion.h1>
              <motion.div
                className="hero-subtitle-animated"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                <AnimatedText text={slides[current].subtitle} />
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <button className="carousel-btn prev" onClick={prevSlide} aria-label="Previous slide">
          <ChevronLeft size={32} />
        </button>
        <button className="carousel-btn next" onClick={nextSlide} aria-label="Next slide">
          <ChevronRight size={32} />
        </button>

        {/* Carousel Indicators */}
        <div className="carousel-indicators">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              className={`indicator ${current === index ? "active" : ""}`}
              onClick={() => goToSlide(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
