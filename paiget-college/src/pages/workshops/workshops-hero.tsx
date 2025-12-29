import { motion } from "framer-motion"
import "../../styles/pages/workshops-hero.css"

function WorkshopsHero() {
  return (
    <section className="workshops-hero">
      <div className="container">
        <motion.div
          className="workshops-hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="hero-badge">Professional Development</span>
          <h1>Professional Workshops</h1>
          <p className="hero-tagline">Curriculum Workshop Series for Early Childhood Education</p>
        </motion.div>
      </div>
    </section>
  )
}

export default WorkshopsHero