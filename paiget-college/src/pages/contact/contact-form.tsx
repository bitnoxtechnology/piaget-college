import type React from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import "../../styles/pages/contact-form.css";

function ContactForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="contact-form-wrapper"
    >
      <div className="section-header">
        <h2>Send us a Message</h2>
        <p>Fill out the form below and we'll get back to you shortly.</p>
      </div>

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Your Name *</label>
            <input type="text" id="name" required placeholder="John Doe" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Your Email *</label>
            <input
              type="email"
              id="email"
              required
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <input type="tel" id="phone" required placeholder="+234..." />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input type="text" id="subject" placeholder="How can we help?" />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="message">Your Message *</label>
          <textarea
            id="message"
            rows={6}
            required
            placeholder="Write your message here..."
          ></textarea>
        </div>

        <button type="submit" className="submit-btn">
          <span>Send Message</span>
          <Send size={18} />
        </button>
      </form>
    </motion.div>
  );
}

export default ContactForm;
