import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/navigations/AppSidebar";
import DashboardHeader from "@/components/navigations/DashboardHeader";

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background">
        <DashboardHeader />
        <main className="w-full px-6! sm:px-8! py-1!">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
