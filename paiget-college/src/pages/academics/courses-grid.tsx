"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  GraduationCap,
  Languages,
  Microscope,
  Baby,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import "../../styles/pages/courses-grid.css";

const courseCategories = [
  {
    title: "General Education",
    icon: BookOpen,
    color: "#3b82f6",
    courses: [
      "Educational Foundation",
      "Psychology and Counseling",
      "Curriculum and Instructions",
      "Educational Technology",
      "Teaching Practice Unit",
    ],
  },
  {
    title: "Languages",
    icon: Languages,
    color: "#8b5cf6",
    courses: ["English/Yoruba", "French/English", "English/Social Studies"],
  },
  {
    title: "Early Childhood Care Education",
    icon: Baby,
    color: "#ec4899",
    note: "All programmes under this school are double major",
    courses: ["Early Childhood Education (Double Major)"],
  },
  {
    title: "Primary Education",
    icon: GraduationCap,
    color: "#f59e0b",
    note: "All programmes under this school are double major",
    courses: ["Primary Education (Double Major)"],
  },
  {
    title: "Sciences",
    icon: Microscope,
    color: "#10b981",
    courses: [
      "Integrated Science/Computer Education",
      "Computer Science (Certificate)",
    ],
  },
];

export default function CourseGrid() {
  return (
    <section className="course-grid-modern">
      <div className="course-container-modern">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Our Academic Programmes</h2>
          <p className="section-subtitle">
            Choose from a wide range of specialized programmes designed to equip
            you with the knowledge and skills for excellence in education
          </p>
        </motion.div>

        <div className="courses-grid">
          {courseCategories.map((category, index) => {
            const Icon = category.icon;

            return (
              <motion.div
                key={category.title}
                className="course-card-modern"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div
                  className="card-glow"
                  style={{ background: `${category.color}15` }}
                />

                <div className="card-header-courses">
                  <div
                    className="icon-wrapper-courses"
                    style={{ background: `${category.color}15` }}
                  >
                    <Icon size={28} style={{ color: category.color }} />
                  </div>
                  <h3 className="card-title-courses">{category.title}</h3>
                </div>

                {category.note && (
                  <div className="card-note-modern">
                    <CheckCircle size={16} />
                    <span>{category.note}</span>
                  </div>
                )}

                <ul className="courses-list-modern">
                  {category.courses.map((course, i) => (
                    <motion.li
                      key={course}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      <div
                        className="course-bullet"
                        style={{ background: category.color }}
                      />
                      <span>{course}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="cta-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="cta-content">
            <h3 className="cta-title">Ready to Begin Your Journey?</h3>
            <p className="cta-subtitle">
              Apply now or check your admission status
            </p>
          </div>

          <div className="cta-buttons">
            <motion.a
              href="/apply"
              className="cta-btn primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Apply Now
              <ArrowRight size={20} />
            </motion.a>

            <motion.a
              href="/contact-us"
              className="cta-btn secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Us
              <ArrowRight size={20} />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
