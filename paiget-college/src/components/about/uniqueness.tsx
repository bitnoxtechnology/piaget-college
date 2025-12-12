"use client"

import { motion } from "framer-motion"
import { Laptop, GraduationCap, Award, Lightbulb } from "lucide-react"
import "../../styles/pages/uniqueness.css"

function Uniqueness() {
  const features = [
    {
      icon: Laptop,
      title: "ICT Integration",
      description:
        "We invest in ICT NOW, recognizing it as the key to unlocking skills and knowledge for future generations.",
    },
    {
      icon: GraduationCap,
      title: "Computer Literacy Certification",
      description:
        "Optional quality competency certificate in computer literacy alongside professional teaching credentials.",
    },
    {
      icon: Award,
      title: "Internship Program",
      description:
        "Three-year NCE certification combining coursework with paid teaching positions for practical experience.",
    },
    {
      icon: Lightbulb,
      title: "Teacher-Educator Partnership",
      description: "Meaningful connections between fieldwork and coursework through collaborative partnerships.",
    },
  ]

  return (
    <section className="uniqueness-section">
      <div className="uniqueness-container">
        <motion.div
          className="uniqueness-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="uniqueness-title">What Sets Us Apart</h2>
          <p className="uniqueness-intro">
            Our goal at PIAGET COLLEGE OF EDUCATION is to produce well-grounded, skilled and well-informed professional
            teachers who gain competency in their areas of specialization while having opportunities to excel in
            computer literacy.
          </p>
        </motion.div>

        <div className="uniqueness-content">
          <motion.div
            className="uniqueness-quote"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="quote-mark">&ldquo;</div>
            <p>
              ICT is not only the future of our children's education, it is the present. We are making the investment in
              ICT NOW. ICT in education is the key to unlocking the skills and knowledge of our future generations.
            </p>
            <div className="quote-source">- UNESCO Statement on ICT in Education</div>
          </motion.div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="feature-icon-wrapper">
                  <feature.icon size={28} />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="uniqueness-footer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3>Raising the Bar for Teacher Preparation</h3>
            <p>
              The bar must be raised for successful teacher preparation programs because we ask much more of teachers
              today. We achieve this through our innovative Internship Teacher Preparation program that combines
              theoretical knowledge with practical teaching experience.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Uniqueness
