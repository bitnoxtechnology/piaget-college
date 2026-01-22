"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonialService } from "@/lib/services/testimonial-service";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import userPlacehoder from "@/assets/user.png";

const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState<ITestimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);

  const itemsPerPage = 9;

  useEffect(() => {
    fetchTestimonials(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  const fetchTestimonials = async (page: number, query: string) => {
    setLoading(true);
    try {
      const res = await testimonialService.getAllTestimonials({
        page,
        limit: itemsPerPage,
        isPublished: true,
        q: query || undefined,
      });

      if (res.success && res.data) {
        setTestimonials(res.data.testimonials);
        setTotal(res.data.total);
        setTotalPages(res.data.totalPages);
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      // toast.error("An error occurred while fetching news");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-linear-to-b from-white via-gray-50 to-white mt-17.5! md:mt-20!">
        {/* Hero Section */}
        <motion.section
          className="py-16! lg:py-20 bg-linear-to-r from-primary-100 to-primary-300 text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto! px-4! sm:px-6! lg:px-8!">
            <motion.div
              className="text-center mb-8!"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h1 className="text-5xl lg:text-6xl font-bold mb-4!">
                What Our Alumni Are Saying
              </h1>
              <p className="text-lg lg:text-xl text-red-100 max-w-3xl mx-auto!">
                Hear directly from our alumni about their experiences and how
                Piaget College has impacted their careers and lives.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Main Content */}
        <section className="py-16! lg:py-20!">
          <div className="max-w-7xl mx-auto! px-4! sm:px-6! lg:px-8!">
            {/* Results Info */}
            {!loading && testimonials.length > 0 && (
              <motion.div
                className="mb-8!"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-gray-600">
                  Showing{" "}
                  <span className="font-semibold text-primary-100">
                    {(currentPage - 1) * itemsPerPage + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-semibold text-primary-100">
                    {Math.min(currentPage * itemsPerPage, total)}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-primary-100">
                    {total}
                  </span>{" "}
                  results
                </p>
              </motion.div>
            )}

            {/* Testimonials Grid */}
            {loading ? (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="h-78 w-90"></div>
                ))}
              </motion.div>
            ) : testimonials.length > 0 ? (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {testimonials.map((testimonial, index) => (
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
                      <p className="testimonial-text">
                        "{testimonial.content}"
                      </p>
                    </div>

                    <div className="testimonial-footer">
                      <div className="testimonial-avatar">
                        <img
                          src={testimonial.image || userPlacehoder}
                          alt={testimonial.name}
                        />
                      </div>
                      <div className="testimonial-info">
                        <h4 className="testimonial-name">{testimonial.name}</h4>
                        <p className="testimonial-role">
                          {testimonial.position}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                className="py-20! text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6!">
                  <Search className="w-10 h-10 text-primary-100" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2!">
                  No Testimonials Found
                </h3>
              </motion.div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                className="mt-16! flex items-center justify-center gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 hover:border-primarytext-primary-100 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-gray-700 hover:text-primary-100"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .slice(
                      Math.max(0, currentPage - 2),
                      Math.min(totalPages, currentPage + 1)
                    )
                    .map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-10 h-10 rounded-lg font-semibold transition-all duration-300 ${
                          page === currentPage
                            ? "bg-primarytext-primary-100 text-white shadow-lg"
                            : "border border-gray-300 text-gray-700 hover:border-primarytext-primary-100 hover:bg-red-50"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 hover:border-primarytext-primary-100 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-gray-700 hover:text-primary-100"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default TestimonialsPage;
