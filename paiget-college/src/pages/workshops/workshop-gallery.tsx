"use client"

import { motion } from "framer-motion"
import "../../styles/pages/workshop-gallery.css"
import Workshop1 from "../../assets/workshop1.jpeg"
import Workshop2 from "../../assets/workshop2.jpeg"
import Workshop3 from "../../assets/workshop3.jpeg"
import Workshop4 from "../../assets/workshop4.jpeg"
import Workshop5 from "../../assets/workshop5.jpeg"
import Workshop6 from "../../assets/workshop6.jpeg"

const galleryImages = [
  { url: Workshop1, caption: "Leadership Summit 2023" },
  { url: Workshop2, caption: "Teachers Training Workshop" },
  { url: Workshop3, caption: "Early Childhood Seminar" },
  { url: Workshop4, caption: "ICT Certification Program" },
  { url: Workshop5, caption: "Annual Educators Conference" },
  { url: Workshop6, caption: "Policy Development Session" },
]

const WorkshopGallery = () => {
  return (
    <section className="workshop-gallery">
      <div className="container">
        <div className="gallery-header">
          <span className="section-subtitle">Our Events</span>
          <h2>Experience Our Workshops</h2>
          <p>Glimpses into our past sessions, training programs, and educator summits.</p>
        </div>
        <div className="gallery-grid">
          {galleryImages.map((image, index) => (
            <motion.div
              className="gallery-item"
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <img src={image.url || "/placeholder.svg"} alt={image.caption} />
              <div className="gallery-overlay">
                <span>{image.caption}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WorkshopGallery