import { Phone, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import "../styles/programmeinfo.css"

const ProgrammeInfo = () => {
  return (
    <section className="programme-info">
      <div className="programme-container">
        <p className="programme-subtitle">
          For Proprietors, Head Teachers, Teachers of Nursery/ Primary School, Day Care Centres, and Junior Secondary
        </p>

        <h2 className="programme-title">Piaget College of Education</h2>

        <div className="programme-year">NCE PROGRAMME</div>

        <div className="programme-focus">
          <h3>We Focus on:</h3>
          <ul className="focus-list">
            <li>PRIMARY EDUCATION</li>
            <li>EARLY CHILDHOOD EDUCATION</li>
            <li>LANGUAGES (YORUBA, ENGLISH & FRENCH)</li>
          </ul>
        </div>

        <div className="programme-contact">
          <Phone size={24} />
          <span>0809 772 9616</span>
        </div>

        <div className="programme-actions">
          <Link to="/academics/available-courses" className="programme-btn programme-btn-primary">
            View Our Programmes
            <ArrowRight size={18} />
          </Link>
          <Link to="/apply" className="programme-btn programme-btn-secondary">
            Apply Now
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ProgrammeInfo
