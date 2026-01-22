"use client";

import React from "react";
import { useSidebar } from "@/components/ui/sidebar";
import { BookOpen, Menu } from "lucide-react";
import { Link } from "react-router-dom";

const DashboardHeader = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <div className="w-full mb-6! px-4! sm:px-8! pt-4! z-10">
      <div className="flex justify-between items-center w-full my-3">
        <div className="dashboard-header__search">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <Link to="/news" className="flex gap-3 items-center">
                <span className="font-bold">Posts</span>
                <BookOpen />
              </Link>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="md:hidden">
            <button
              title="toggle"
              type="button"
              className="bg-transparent text-foreground"
              data-sidebar="trigger"
              onClick={() => toggleSidebar()}
            >
              <Menu className="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
