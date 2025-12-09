"use client"

import { motion } from "framer-motion"
import { Target, GraduationCap, FileText, ArrowRight } from "lucide-react"
import "../styles/services.css"

const Services = () => {
  const services = [
    {
      id: 1,
      icon: Target,
      title: "Discover Piaget College of Education",
      description: "Our trained staff provide quality education in a rich and nurturing learning environment.",
      buttonText: "Learn More",
      link: "#",
    },
    {
      id: 2,
      icon: GraduationCap,
      title: "Explore a Program that Fits You",
      description: "Our unique college offers a stimulating combination of learning & professional growth.",
      buttonText: "Learn More",
      link: "#",
    },
    {
      id: 3,
      icon: FileText,
      title: "Apply",
      description: "Apply online right now and start your journey with us.",
      buttonText: "Apply Now",
      link: "#",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <section className="services-section">
      <div className="services-container">
        <motion.div
          className="services-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>Why Choose Piaget?</h2>
          <p>Experience quality education with professional growth opportunities</p>
        </motion.div>

        <motion.div
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service) => {
            const IconComponent = service.icon
            return (
              <motion.div
                key={service.id}
                className="service-card"
                variants={cardVariants}
                whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(160, 30, 30, 0.15)" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <motion.div
                  className="service-icon"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <IconComponent size={48} />
                </motion.div>

                <h3>{service.title}</h3>
                <p>{service.description}</p>

                <motion.a
                  href={service.link}
                  className="service-button"
                  whileHover={{ gap: "12px" }}
                  transition={{ duration: 0.3 }}
                >
                  <span>{service.buttonText}</span>
                  <ArrowRight size={18} />
                </motion.a>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default Services