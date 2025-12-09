"use client"

import { useRef, useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import "../styles/newsevent.css"
import News1 from "../assets/news1.jpg"
import News2 from "../assets/news2.webp"
import News3 from "../assets/new3.webp"

interface NewsItem {
  id: number
  image: string
  title: string
  link: string
}

const NewsEvents = () => {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  const newsItems: NewsItem[] = [
    {
      id: 1,
      image: News1,
      title: "Campus Event 1",
      link: "https://www.piagetcoe.edu.ng/admission/",
    },
    {
      id: 2,
      image:News2,
      title: "Campus Event 2",
      link: "#",
    },
    {
      id: 3,
      image: News3,
      title: "Campus Event 3",
      link: "#",
    },
  ]

  // News carousel
  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % newsItems.length)
    }, 2500)

    return () => clearInterval(interval)
  }, [isAutoPlay, newsItems.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlay(false)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % newsItems.length)
    setIsAutoPlay(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + newsItems.length) % newsItems.length)
    setIsAutoPlay(false)
  }

  const handleImageClick = (link: string) => {
    window.open(link, "_blank")
  }

  return (
    <section className="news-events-section">
      <div className="news-container">
        <h2 className="section-title">News & Events</h2>

        <div className="carousel-wrapper">
          <div className="carousel" ref={carouselRef}>
            {newsItems.map((item, index) => (
              <div
                key={item.id}
                className={`carousel-slide ${index === currentSlide ? "active" : ""}`}
                onClick={() => handleImageClick(item.link)}
              >
                <img src={item.image || "/placeholder.svg"} alt={item.title} className="carousel-image" />
                <div className="carousel-overlay">
                  <p className="carousel-text">Click to view</p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button className="carousel-btn prev-btn" onClick={prevSlide}>
            <ChevronLeft size={32} />
          </button>
          <button className="carousel-btn next-btn" onClick={nextSlide}>
            <ChevronRight size={32} />
          </button>

          {/* Dot Indicators */}
          <div className="carousel-dots">
            {newsItems.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentSlide ? "active" : ""}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewsEvents
