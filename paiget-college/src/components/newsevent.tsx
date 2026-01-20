"use client";

import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "../styles/newsevent.css";
import { blogService } from "@/lib/services/blog-service";
import { toast } from "sonner";
import NewsCard, { NewsCardSkeleton } from "./NewsCard";
import { Link } from "react-router-dom";

const NewsEvents = () => {
  const [posts, setPosts] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWorkshops();
  }, []);

  const fetchWorkshops = async () => {
    setLoading(true);
    try {
      const res = await blogService.getAllBlogs({
        page: 1,
        limit: 3,
        isPublished: true,
      });
      if (res.success && res.data?.blogs) {
        setPosts(res.data.blogs);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast.error("Failed to fetch posts.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="news-events-section">
      <div className="news-container">
        <h2 className="news-section-title">News & Events</h2>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            // Skeleton Loading State
            <>
              {[...Array(3)].map((_, i) => (
                <NewsCardSkeleton key={i} index={i} />
              ))}
            </>
          ) : posts.length > 0 ? (
            // Actual News Cards
            posts.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <NewsCard
                  title={item.title}
                  excerpt={item.excerpt}
                  coverImage={item.coverImage as string}
                  slug={item.slug}
                />
              </motion.div>
            ))
          ) : (
            // Empty State
            <motion.div
              className="col-span-full py-16!"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4!">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2!">
                  No News Available
                </h3>
                <p className="text-gray-600">
                  Check back soon for the latest updates and events.
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* CTA Button */}
        {posts.length > 3 && (
          <motion.div
            className="mt-12! text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Link to={"/news"}>
              <button className="inline-flex items-center gap-2 px-8! py-4! bg-primary-100 hover:bg-primary-200 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer duration-300 group">
                <span>View All News</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default NewsEvents;
