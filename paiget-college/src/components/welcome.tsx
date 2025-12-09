"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"
import "../styles/welcome.css"
import WelcomeImage from "../assets/welcometo-piagetcoe.jpg"

export default function Welcome() {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const tl = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !imageRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const scrollPercentage = Math.max(
        0,
        Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)),
      )

      const scale = 1 + scrollPercentage * 0.15
      gsap.to(imageRef.current, {
        scale: scale,
        duration: 0.1,
        overwrite: "auto",
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (!contentRef.current) return

    tl.current = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "center center",
        scrub: 1,
      },
    })

    tl.current.fromTo(
      contentRef.current,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
      },
    )

    return () => {
      tl.current?.kill()
    }
  }, [])

  return (
    <section className="welcome-section" ref={containerRef}>
      <div className="welcome-bg" ref={imageRef}>
        <img src={WelcomeImage} alt="Welcome background" />
      </div>

      <div className="welcome-overlay" />

      <motion.div className="welcome-container" ref={contentRef}>
        <div className="welcome-content">
          <motion.h2
            className="welcome-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Welcome to Piaget College of Education
          </motion.h2>

          <motion.div
            className="welcome-text"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p>
              Welcome to Piaget College of Education — we’re truly glad you’re here.
            </p>

            <p>
              On behalf of everyone in our community, I’m pleased to welcome you to a place we’re incredibly proud of — our people, our values, and the programs that shape future educators.
            </p>

            <p>
              Students come to Piaget College of Education because they want to transform their lives, and it’s our mission to help make that happen. Everything we do is centered on one goal: providing exceptional teacher training for the future. We aim to be your first choice for meaningful learning, genuine support, and open opportunities.
            </p>

            <p>
              At Piaget, we work together to build an environment that celebrates people, respect, diversity, and excellence. Our faculty, staff, and administrators bring outstanding qualifications and real-world experience — all to ensure you receive an education that truly empowers you.
            </p>

            <p>
              We understand the trust you place in us, and we don’t take it lightly. Your time here is valuable, and your education is one of the most important investments you’ll ever make. In today’s competitive world, individuals with strong, quality training stand out — and that’s exactly what we provide.
            </p>

            <p>
              We invite you to experience the human side of success here at Piaget College of Education. May your journey with us be richer than you expected, and may it equip you to achieve everything you are determined to pursue.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}