"use client"

import { ArrowRight } from "lucide-react"
import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import "../styles/newsevent.css"
import News1 from "../assets/news1.jpg"
import News2 from "../assets/news2.webp"
import News3 from "../assets/new3.webp"

interface NewsItem {
  id: number
  image: string
  title: string
  description: string
  link: string
}

const NewsEvents = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  const newsItems: NewsItem[] = [
    {
      id: 1,
      image: News1,
      title: "Campus Event 1",
      description:
        "Join us for an exciting campus event featuring student performances, workshops, and networking opportunities with faculty and peers.",
      link: "/news/event-1",
    },
    {
      id: 2,
      image: News2,
      title: "Campus Event 2",
      description:
        "Discover new academic programs and career opportunities. Meet with department heads and learn about our latest educational initiatives.",
      link: "/news/event-2",
    },
    {
      id: 3,
      image:News3,
      title: "Campus Event 3",
      description:
        "Celebrate student achievements and connect with the Piaget College community. Experience the culture and excellence of our institution.",
      link: "/news/event-3",
    },
  ]

  useEffect(() => {
    // Trigger animation on component mount
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll(".news-card")
      cards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add("animate-in")
        }, index * 150)
      })
    }
  }, [])

  const handleReadMore = (link: string) => {
    // Navigate to news page or open link
    window.location.href = link
  }

  return (
    <section className="news-events-section">
      <div className="news-container">
        <h2 className="section-title">News & Events</h2>

        <div className="news-grid" ref={containerRef}>
          {newsItems.map((item) => (
            <motion.div key={item.id} className="news-card" whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
              <div className="card-image-wrapper">
                <img src={item.image || "/placeholder.svg"} alt={item.title} className="card-image" />
                <div className="card-overlay"></div>
              </div>

              <div className="card-content">
                <h3 className="card-title">{item.title}</h3>
                <p className="card-description">{item.description}</p>

                <button className="read-more-btn" onClick={() => handleReadMore(item.link)}>
                  <span>Read More</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default NewsEvents
