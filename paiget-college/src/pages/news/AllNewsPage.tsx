"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { blogService } from "@/lib/services/blog-service";
import { toast } from "sonner";
import NewsCard, { NewsCardSkeleton } from "@/components/NewsCard";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Meta from "@/components/Meta";

const AllNewsPage = () => {
  const metaTitle = "Latest News & Updates | Piaget College of Education";
  const metaDescription =
    "Stay updated with the latest news, announcements, and updates from Piaget College of Education. Read articles about our programs, events, and college life.";
  const metaKeywords =
    "news, updates, announcements, Piaget College, education news, blog, articles";

  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);

  const itemsPerPage = 9;

  useEffect(() => {
    fetchBlogs(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  const fetchBlogs = async (page: number, query: string) => {
    setLoading(true);
    try {
      const res = await blogService.getAllBlogs({
        page,
        limit: itemsPerPage,
        isPublished: true,
        q: query || undefined,
      });

      if (res.success && res.data) {
        setBlogs(res.data.blogs);
        setTotal(res.data.total);
        setTotalPages(res.data.totalPages);
      } else {
        toast.error("Failed to fetch news articles");
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      toast.error("An error occurred while fetching news");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchBlogs(1, searchQuery);
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
      <Meta
        title={metaTitle}
        description={metaDescription}
        keywords={metaKeywords}
      />
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
                Latest News & Updates
              </h1>
              <p className="text-lg lg:text-xl text-red-100 max-w-3xl mx-auto!">
                Stay informed with the latest announcements, events, and
                insights from Piaget College
              </p>
            </motion.div>

            {/* Search Bar */}
            <motion.form
              onSubmit={handleSearch}
              className="mt-12! max-w-2xl mx-auto!"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search news articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6! py-4! pl-12! rounded-full bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-300 shadow-lg transition-all duration-300"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primarytext-primary-100 hover:bg-primary-300 text-white px-6! py-2! rounded-full font-semibold transition-colors duration-300 flex items-center gap-2"
                >
                  <span>Search</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.form>
          </div>
        </motion.section>

        {/* Main Content */}
        <section className="py-16! lg:py-20!">
          <div className="max-w-7xl mx-auto! px-4! sm:px-6! lg:px-8!">
            {/* Results Info */}
            {!loading && blogs.length > 0 && (
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

            {/* News Grid */}
            {loading ? (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {[...Array(9)].map((_, i) => (
                  <NewsCardSkeleton key={i} index={i} />
                ))}
              </motion.div>
            ) : blogs.length > 0 ? (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {blogs.map((blog) => (
                  <div key={blog._id}>
                    <NewsCard
                      title={blog.title}
                      excerpt={blog.excerpt}
                      coverImage={blog.coverImage as string}
                      slug={blog.slug}
                    />
                  </div>
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
                  No Articles Found
                </h3>
                <p className="text-gray-600 mb-6!">
                  {searchQuery
                    ? `No results found for "${searchQuery}". Try a different search.`
                    : "No news articles available at the moment."}
                </p>
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setCurrentPage(1);
                    }}
                    className="inline-flex items-center gap-2 px-6! py-3! bg-primarytext-primary-100 hover:bg-primary-300 text-white font-semibold rounded-lg transition-colors duration-300"
                  >
                    Clear Search
                  </button>
                )}
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

        {/* Stats Section */}
        {!loading && blogs.length > 0 && (
          <motion.section
            className="py-16! bg-linear-to-r from-primarytext-primary-100/5 to-primary-300/5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="max-w-7xl mx-auto! px-4! sm:px-6! lg:px-8!">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { label: "Total Articles", value: total },
                  {
                    label: "Current Page",
                    value: `${currentPage} of ${totalPages}`,
                  },
                  { label: "Articles Per Page", value: itemsPerPage },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="text-4xl font-bold text-primary-100 mb-2!">
                      {stat.value}
                    </div>
                    <p className="text-gray-600">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AllNewsPage;
