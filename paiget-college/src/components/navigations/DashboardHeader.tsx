"use client";

import React from "react";
import { useSidebar } from "@/components/ui/sidebar";
import { ExternalLink, Menu } from "lucide-react";
import { Link } from "react-router-dom";

const DashboardHeader = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <div className="w-full px-4! sm:px-8! py-3! border-b z-10">
      <div className="flex justify-between items-center w-full">
        <Link
          to="/"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ExternalLink size={14} />
          <span>View Site</span>
        </Link>

        <div className="flex items-center gap-4">
          <div className="md:hidden">
            <button
              title="toggle"
              type="button"
              className="bg-transparent text-foreground"
              data-sidebar="trigger"
              onClick={() => toggleSidebar()}
            >
              <Menu />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
