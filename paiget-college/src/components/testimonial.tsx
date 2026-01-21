"use client";

import { motion } from "framer-motion";
import { ArrowRight, Quote } from "lucide-react";
import "../styles/testimonial.css";
import { testimonialService } from "@/lib/services/testimonial-service";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Testimonials() {
  const [testimonials, setTestimonials] = useState<ITestimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWorkshops();
  }, []);

  const fetchWorkshops = async () => {
    setLoading(true);
    try {
      const res = await testimonialService.getAllTestimonials({
        page: 1,
        limit: 3,
        isPublished: true,
      });
      if (res.success && res.data?.testimonials) {
        setTestimonials(res.data.testimonials);
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      // toast.error("Failed to fetch testimonials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="testimonials-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <span className="subtitle">Alumni Stories</span>
          <h2 className="title">What Our Alumni Are Saying</h2>
        </motion.div>

        <div className="testimonials-grid">
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="h-80 w-90 bg-gray-200 rounded-lg animate-pulse"
                ></div>
              ))
            : testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial._id}
                  className="testimonial-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="quote-icon">
                    <Quote size={28} strokeWidth={2.5} />
                  </div>

                  <div className="testimonial-content">
                    <p className="testimonial-text">"{testimonial.content}"</p>
                  </div>

                  <div className="testimonial-footer">
                    <div className="testimonial-avatar">
                      <img
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                      />
                    </div>
                    <div className="testimonial-info">
                      <h4 className="testimonial-name">{testimonial.name}</h4>
                      <p className="testimonial-role">{testimonial.position}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
        </div>

        {/* CTA Button */}
        {testimonials.length > 3 && (
          <motion.div
            className="mt-12! text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Link to={"/testimonials"}>
              <button className="inline-flex items-center gap-2 px-8! py-4! bg-primary-100 hover:bg-primary-200 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer duration-300 group">
                <span>Read More</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default Testimonials;
