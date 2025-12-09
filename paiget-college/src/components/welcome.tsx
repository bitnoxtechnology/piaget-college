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

      // Parallax zoom effect: scale from 1 to 1.15 as you scroll through the section
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

      {/* Content Box */}
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
              I am pleased to welcome you on behalf of all the members of our Piaget College of Education community. We
              are proud of our personnel and programs.
            </p>

            <p>
              People come to Piaget College of Education to change their lives. Our chosen goal is to help them, and
              you, achieve that. We have one objective: providing quality teacher training for the future. We aim to be
              the college of choice for successful student learning, caring student services and open access.
            </p>

            <p>
              We will work together to create an environment that emphasizes people, respect, diversity and excellence.
              Members of our faculty, staff and administration have come to Piaget College of Education with the highest
              credentials and professional accomplishments.
            </p>

            <p>
              Our college aims to be a leader in demonstrating quality education and accountability to our community
              with the belief that, as teachers, <strong>you matter</strong>.
            </p>

            <p>
              We take your trust in us seriously. We view your time here as valuable and your education one of the most
              important investments you can make. In today's highly competitive world, candidates with quality education
              are in high demand and that is what we provide.
            </p>

            <p>
              We invite you to let Piaget College of Education put you in touch with the human side of success. May what
              you will take from your college experience exceed all your expectations and help you achieve all that you
              will work diligently towards.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
