"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users, CheckCircle } from "lucide-react";

interface WorkshopProps {
  workshop: IWorkshop;
  index: number;
}

const WorkshopCard = ({
  workshop: {
    title,
    date,
    description,
    startTime,
    location,
    endTime,
    programs,
  },
  index,
}: WorkshopProps) => {
  return (
    <motion.div
      className="workshop-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="workshop-card-header">
        <h3>{title}</h3>
      </div>
      <div className="workshop-card-body">
        <div className="workshop-info-grid">
          <div className="info-item">
            <Calendar size={18} />
            <span>
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              }).format(new Date(date))}
            </span>
          </div>
          <div className="info-item">
            <Clock size={18} />
            <div className="flex">
              <span>{startTime}</span> -<span>{endTime}</span>
            </div>
          </div>
          <div className="info-item">
            <Users size={18} />
            <span>{description}</span>
          </div>
          <div className="info-item">
            <MapPin size={18} />
            <span>{location}</span>
          </div>
        </div>

        <div className="workshop-topics">
          <h4>Key Focus Areas:</h4>
          <ul>
            {programs.map((program, i) => (
              <li key={i}>
                <CheckCircle size={14} className="text-maroon" />
                <span>{program}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="workshop-card-footer">
        <p className="certificate-notice">
          Certificate of Participation Included
        </p>
      </div>
    </motion.div>
  );
};

// Skeleton Loader Component
export const WorkshopCardSkeleton = ({ index = 0 }: { index?: number }) => {
  return (
    <motion.div
      className="workshop-card bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      {/* Header Skeleton */}
      <div className="p-6 border-b border-gray-200">
        <div className="h-6 bg-linear-to from-gray-200 via-gray-100 to-gray-200 rounded-md w-3/4 animate-pulse"></div>
      </div>

      {/* Body Skeleton */}
      <div className="p-6 space-y-6">
        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-5 h-5 bg-gray-300 rounded-full animate-pulse shrink-0"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                <div className="h-3 bg-gray-100 rounded w-32 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200"></div>

        {/* Topics Section */}
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-300 rounded-full animate-pulse shrink-0"></div>
                <div className="h-3 bg-gray-100 rounded flex-1 max-w-xs animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Skeleton */}
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
      </div>
    </motion.div>
  );
};

export default WorkshopCard;
