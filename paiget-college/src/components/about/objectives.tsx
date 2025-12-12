"use client"

import { motion } from "framer-motion"
import { Target, Users, BookOpen, TrendingUp } from "lucide-react"
import "../../styles/pages/objectives.css"

function Objectives() {
  const strategies = [
    {
      icon: BookOpen,
      title: "Learning-Centered Approach",
      description: "Our approach puts learning and teaching at the center of everything we do.",
    },
    {
      icon: Users,
      title: "Comprehensive Resources",
      description: "Access to unequalled resources and a stimulating educational environment.",
    },
    {
      icon: Target,
      title: "Tailored Excellence",
      description: "Programs designed to exceed expectations and help students achieve their highest potential.",
    },
    {
      icon: TrendingUp,
      title: "Broad Curriculum",
      description: "Study across design, implementation, and research to prepare for leadership careers.",
    },
  ]

  return (
    <section className="objectives-section">
      <div className="objectives-container">
        <motion.div
          className="objectives-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="objectives-title">Our Objectives</h2>
          <p className="objectives-description">
            PIAGET COLLEGE OF EDUCATION, Abeokuta, is an autonomous private institution charged with the responsibility
            of providing quality higher education and encouraging the advancement of learning throughout Nigeria. We aim
            to prepare students with solid background that will enhance the present educational standard in terms of
            skills and knowledge in the pursuit of the NCE programme.
          </p>
        </motion.div>

        <div className="strategies-header">
          <h3>Strategies for Achieving our Objectives</h3>
        </div>

        <div className="strategies-grid">
          {strategies.map((strategy, index) => (
            <motion.div
              key={index}
              className="strategy-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="strategy-icon">
                <strategy.icon size={32} />
              </div>
              <h4 className="strategy-title">{strategy.title}</h4>
              <p className="strategy-description">{strategy.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Objectives
