import WorkshopCard from "./workshops-card"
import "../../styles/pages/workshop-cards.css"

const workshopData = [
  {
    title: "School Owners & Head Teachers Summit",
    date: "August 15, 2024",
    time: "9:00 AM - 3:00 PM",
    location: "Main Auditorium, Piaget College",
    audience: "Proprietors & School Administrators",
    topics: ["Institutional Leadership", "Policy Development", "Financial Sustainability"],
  },
  {
    title: "Modern Pedagogy Workshop",
    date: "September 10, 2024",
    time: "10:00 AM - 4:00 PM",
    location: "Education Block, Room 102",
    audience: "Primary & Secondary School Teachers",
    topics: ["Active Learning Strategies", "Digital Classroom Tools", "Inclusive Education"],
  },
  {
    title: "Early Childhood Seminar",
    date: "October 05, 2024",
    time: "9:00 AM - 2:00 PM",
    location: "ECCE Center, Piaget College",
    audience: "Nursery & Daycare Educators",
    topics: ["Child Psychology", "Play-Based Learning", "Developmental Milestones"],
  },
]

const WorkshopCards = () => {
  return (
    <section className="workshop-cards-section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">What We Offer</span>
          <h2>Upcoming Workshops & Seminars</h2>
          <p>Empowering educators through professional development and specialized training.</p>
        </div>
        <div className="workshop-grid">
          {workshopData.map((workshop, index) => (
            <WorkshopCard key={index} {...workshop} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default WorkshopCards