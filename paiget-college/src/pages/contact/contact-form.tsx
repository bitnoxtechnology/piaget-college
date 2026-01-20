import type React from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import "../../styles/pages/contact-form.css";
import { emailService } from "@/lib/services/email-service";
import { toast } from "sonner";
import { useState } from "react";

function ContactForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Handle form submission

    const formElement = e.target as HTMLFormElement;

    try {
      const response = await emailService.submitContactUsForm({
        name: (formElement.elements.namedItem("name") as HTMLInputElement)
          .value,
        email: (formElement.elements.namedItem("email") as HTMLInputElement)
          .value,
        phone: (formElement.elements.namedItem("phone") as HTMLInputElement)
          .value,
        subject: (formElement.elements.namedItem("subject") as HTMLInputElement)
          .value,
        message: (
          formElement.elements.namedItem("message") as HTMLTextAreaElement
        ).value,
      });
      if (response.success) {
        toast.success("Message sent successfully!");
        formElement.reset();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
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
            <input
              type="text"
              id="name"
              required
              placeholder="John Doe"
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Your Email *</label>
            <input
              type="email"
              id="email"
              required
              placeholder="john@example.com"
              disabled={loading}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <input
              type="tel"
              id="phone"
              required
              placeholder="+234..."
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              placeholder="How can we help?"
              disabled={loading}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="message">Your Message *</label>
          <textarea
            id="message"
            rows={6}
            required
            placeholder="Write your message here..."
            disabled={loading}
          ></textarea>
        </div>

        <button disabled={loading} type="submit" className="submit-btn">
          {loading ? (
            "Sending..."
          ) : (
            <>
              <span>Send Message</span>
              <Send size={16} />
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
}

export default ContactForm;
