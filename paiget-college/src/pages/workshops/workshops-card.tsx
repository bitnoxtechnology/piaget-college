"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, MapPin, Users, CheckCircle } from "lucide-react"

interface WorkshopProps {
  title: string
  date: string
  time: string
  location: string
  audience: string
  topics: string[]
  index: number
}

const WorkshopCard = ({ title, date, time, location, audience, topics, index }: WorkshopProps) => {
  return (
    <motion.div
      className="workshop-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="workshop-card-header">
        <h3>{title}</h3>
      </div>
      <div className="workshop-card-body">
        <div className="workshop-info-grid">
          <div className="info-item">
            <Calendar size={18} />
            <span>{date}</span>
          </div>
          <div className="info-item">
            <Clock size={18} />
            <span>{time}</span>
          </div>
          <div className="info-item">
            <Users size={18} />
            <span>{audience}</span>
          </div>
          <div className="info-item">
            <MapPin size={18} />
            <span>{location}</span>
          </div>
        </div>

        <div className="workshop-topics">
          <h4>Key Focus Areas:</h4>
          <ul>
            {topics.map((topic, i) => (
              <li key={i}>
                <CheckCircle size={14} className="text-maroon" />
                <span>{topic}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="workshop-card-footer">
        <p className="certificate-notice">Certificate of Participation Included</p>
      </div>
    </motion.div>
  )
}

export default WorkshopCard
