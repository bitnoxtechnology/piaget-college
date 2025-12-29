"use client"

import { motion } from "framer-motion"
import "../../styles/pages/rsvp-form.css"

const RSVPForm = () => {
  return (
    <section className="workshop-rsvp-section">
      <div className="container">
        <div className="rsvp-grid">
          <motion.div
            className="rsvp-info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Reserve Your Seat</h2>
            <p>
              This is a high-quality and interactive training session. Spots are limited to ensure personalized
              attention.
            </p>

            <div className="payment-details">
              <h3>Registration Fee</h3>
              <div className="fee-badge">₦10,000 per session</div>

              <div className="bank-info">
                <h4>Bank Transfer Details</h4>
                <p>
                  <strong>Bank:</strong> UBA Bank
                </p>
                <p>
                  <strong>Account Name:</strong> We Teach Inc.
                </p>
                <p>
                  <strong>Account Number:</strong> 2115474493
                </p>
              </div>

              <a href="https://www.piagetcoe.edu.ng/workshop-payment/" className="pay-online-btn">
                Pay Online Now
              </a>
            </div>
          </motion.div>

          <motion.div
            className="rsvp-form-container"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form className="rsvp-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="Enter your name" required />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="email@example.com" required />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" placeholder="080 0000 0000" required />
              </div>
              <div className="form-group">
                <label>Session Date(s)</label>
                <select required>
                  <option value="">Select a session</option>
                  <option value="eyfs">EYFS Workshop</option>
                  <option value="montessori">Montessori Workshop</option>
                  <option value="blended">Blended Curriculum Workshop</option>
                </select>
              </div>
              <button type="submit" className="submit-rsvp-btn">
                R.S.V.P. Now
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default RSVPForm