import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import coverPlaceholder from "../assets/cover-placeholder.png";

const NewsCard = ({
  title,
  excerpt,
  coverImage,
  slug,
}: {
  title: string;
  excerpt: string;
  coverImage: string;
  slug: string;
}) => {
  return (
    <div className="group bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300">
      {/* Image Wrapper */}
      <div className="relative h-56 overflow-hidden bg-gray-100">
        <img
          src={coverImage || coverPlaceholder}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-linear-to from-transparent via-transparent to-black/30 group-hover:to-black/50 transition-all duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-6! flex flex-col">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-3! group-hover:text-blue-600 transition-colors duration-300">
          {title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4! grow">
          {excerpt}
        </p>

        {/* Button */}
        <Link to={`/news/${slug}`}>
          <button className="inline-flex items-center gap-2 cursor-pointer text-primary-200 hover:text-primary font-semibold text-sm group/btn transition-all duration-300">
            <span>Read More</span>
            <ArrowRight
              size={18}
              className="group-hover/btn:translate-x-1 transition-transform duration-300"
            />
          </button>
        </Link>
      </div>
    </div>
  );
};

// Skeleton Loader Component
export const NewsCardSkeleton = ({ index = 0 }: { index?: number }) => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      {/* Image Skeleton */}
      <div className="w-full h-56 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse"></div>

      {/* Content Skeleton */}
      <div className="p-6! space-y-4 h-80 flex flex-col">
        {/* Title Skeleton */}
        <div className="space-y-2">
          <div className="h-5 bg-gray-200 rounded-lg w-full animate-pulse"></div>
          <div className="h-5 bg-gray-200 rounded-lg w-4/5 animate-pulse"></div>
        </div>

        {/* Description Skeleton */}
        <div className="space-y-2 grow">
          <div className="h-4 bg-gray-100 rounded-lg w-full animate-pulse"></div>
          <div className="h-4 bg-gray-100 rounded-lg w-full animate-pulse"></div>
          <div className="h-4 bg-gray-100 rounded-lg w-3/4 animate-pulse"></div>
        </div>

        {/* Button Skeleton */}
        <div className="pt-2!">
          <div className="h-5 bg-gray-200 rounded-lg w-28 animate-pulse"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsCard;
