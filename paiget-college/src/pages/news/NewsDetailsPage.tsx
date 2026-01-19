"use client";

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, User, Share2, ArrowLeft, Clock, Tag } from "lucide-react";
import { blogService } from "@/lib/services/blog-service";
import { toast } from "sonner";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const NewsDetailsPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<IBlog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogDetails = async (blogSlug: string) => {
      setLoading(true);
      try {
        const res = await blogService.getBlogBySlug(blogSlug);
        if (res.success && res.data?.blog) {
          setBlog(res.data.blog);
          console.log(res.data.blog);
        } else {
          toast.error("Failed to load article");
          navigate("/news");
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        toast.error("An error occurred while loading the article");
        navigate("/news");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlogDetails(slug);
    }
  }, [slug, navigate]);

  const handleShare = () => {
    if (navigator.share && blog) {
      navigator.share({
        title: blog.title,
        text: blog.excerpt,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    }
  };

  const handleGoBack = () => {
    navigate("/news");
  };

  // Loading skeleton
  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen bg-white p-8! lg:p-16!">
          <div className="max-w-4xl mx-auto!">
            {/* Back button skeleton */}
            <div className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse m-4! mb-8!"></div>

            {/* Image skeleton */}
            <div className="w-full h-96 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-xl animate-pulse m-12!"></div>

            {/* Title skeleton */}
            <div className="space-y-3! m-6!">
              <div className="h-8 bg-gray-200 rounded-lg w-3/4 animate-pulse"></div>
              <div className="h-8 bg-gray-200 rounded-lg w-2/3 animate-pulse"></div>
            </div>

            {/* Meta info skeleton */}
            <div className="flex flex-wrap gap-6 mb-8!">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-5 w-32 bg-gray-200 rounded animate-pulse"
                ></div>
              ))}
            </div>

            {/* Content skeleton */}
            <div className="space-y-3!">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="h-4 bg-gray-100 rounded w-full animate-pulse"
                ></div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!blog) {
    return (
      <div>
        <Navbar />

        <div className="min-h-screen bg-white flex items-center justify-center p-8!">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4!">
              Article Not Found
            </h2>
            <p className="text-gray-600 mb-8!">
              The article you're looking for doesn't exist.
            </p>
            <button
              onClick={handleGoBack}
              className="inline-flex items-center gap-2 px-6! py-3! bg-primary-100 hover:bg-primary-300 text-white font-semibold rounded-lg transition-colors duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to News
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const readTime = Math.ceil(blog.contentHtml.split(" ").length / 200);
  const publishDate = blog.publishedAt
    ? new Date(blog.publishedAt)
    : new Date(blog.createdAt);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-linear-to-b from-white to-gray-50 mt-17.5! md:mt-20!">
        {/* Hero Section */}
        <motion.section
          className="relative w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Back Button */}
          <div className="max-w-4xl mx-auto p-6! lg:p-8!">
            <motion.button
              onClick={handleGoBack}
              className="inline-flex items-center gap-2 text-primarybg-primary-100 hover:text-primary-300 font-semibold m-b-6 transition-colors duration-300 group"
              whileHover={{ x: -4 }}
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Back to News
            </motion.button>
          </div>

          {/* Cover Image */}
          <motion.div
            className="max-w-4xl mx-auto! px-6! lg:px-8! mb-8!"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <img
              src={blog.coverImage || "/placeholder.svg"}
              alt={blog.title}
              className="w-full h-96 lg:h-125 object-cover rounded-2xl shadow-2xl"
            />
          </motion.div>

          {/* Title and Meta */}
          <motion.div
            className="max-w-4xl mx-auto! px-6! lg:px-8! mb-8!"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4!">
              {blog.title}
            </h1>
            <p className="text-xl text-gray-600 mb-6!">{blog.excerpt}</p>

            {/* Meta Information */}
            <div className="flex flex-wrap gap-4 lg:gap-6 py-4! border-t border-b border-gray-200">
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-primary-100 to-primary-300  flex items-center justify-center text-white font-bold">
                  {blog.author.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 capitalize">
                    {blog.author.name}
                  </p>
                  <p className="text-xs text-gray-500">{blog.author.email}</p>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-5 h-5 text-primarybg-primary-100" />
                <span className="text-sm">
                  {publishDate.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>

              {/* Read Time */}
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-5 h-5 text-primarybg-primary-100" />
                <span className="text-sm">{readTime} min read</span>
              </div>

              {/* Share Button */}
              <button
                onClick={handleShare}
                className="flex items-center gap-2 text-gray-600 hover:text-primarybg-primary-100 transition-colors duration-300 ml-auto!"
              >
                <Share2 className="w-5 h-5" />
                <span className="text-sm font-semibold">Share</span>
              </button>
            </div>
          </motion.div>
        </motion.section>

        {/* Main Content */}
        <motion.section
          className="max-w-4xl mx-auto! px-6! lg:px-8! py-12!"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Rich Text Content */}
          <div className="prose prose-lg max-w-none mb-12!">
            <div
              className="prose-headings:text-gray-900 prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-700 prose-p:line-height-relaxed prose-strong:text-gray-900 prose-strong:font-bold prose-em:text-gray-700 prose-a:text-primarybg-primary-100 prose-a:underline hover:prose-a:text-primary-300 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-li:text-gray-700 prose-blockquote:border-primarybg-primary-100 prose-blockquote:text-gray-700 prose-img:rounded-lg prose-img:shadow-lg"
              dangerouslySetInnerHTML={{ __html: blog.contentHtml }}
            />
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <motion.div
              className="pt-8! border-t border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-wrap gap-3">
                {blog.tags.map((tag, index) => (
                  <motion.span
                    key={index}
                    className="inline-flex items-center gap-2 px-4! py-2! bg-red-50 text-primarybg-primary-100 rounded-full font-semibold text-sm hover:bg-red-100 transition-colors duration-300 cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Tag className="w-4 h-4" />
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}
        </motion.section>

        {/* Author Info Section */}
        <motion.section
          className="bg-linear-to-r from-primarybg-primary-100/10 to-primary-300/10 p-8! lg:p-12! my-12!"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto! flex flex-col lg:flex-row gap-8 items-center">
            <div className="w-24 h-24 rounded-full bg-linear-to-br from-primarybg-primary-100 to-primary-300 flex items-center justify-center text-white text-4xl font-bold shrink-0">
              {blog.author.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-2!">
                About the Author
              </h3>
              <p className="text-gray-700 mb-4!">
                <span className="font-semibold capitalize">
                  {blog.author.name}
                </span>{" "}
                is an author at Piaget College, dedicated to sharing insights
                and updates with our community.
              </p>
              <p className="text-sm text-gray-600">
                Email:{" "}
                <span className="font-semibold">{blog.author.email}</span>
              </p>
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="max-w-4xl mx-auto! px-6! lg:px-8! py-12!"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="bg-linear-to-r from-primarybg-primary-100 to-primary-300 text-white rounded-xl p-8! lg:p-12! text-center">
            <h2 className="text-3xl font-bold mb-4!">More to Explore</h2>
            <p className="text-red-100 mb-8! max-w-2xl mx-auto!">
              Discover more articles and stay updated with the latest news from
              Piaget College.
            </p>
            <button
              onClick={handleGoBack}
              className="inline-flex items-center gap-2 px-8! py-4! bg-white text-primary-100 hover:bg-red-50 font-semibold rounded-lg transition-all duration-300 hover:shadow-lg"
            >
              View All Articles
              <ArrowLeft className="w-5 h-5 rotate-180" />
            </button>
          </div>
        </motion.section>
      </div>
      <Footer />
    </div>
  );
};

export default NewsDetailsPage;
