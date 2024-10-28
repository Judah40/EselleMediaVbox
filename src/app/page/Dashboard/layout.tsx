import React from "react";
import DashboardSideBar from "./(component)/DashboardSideBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <SidebarProvider>
      <DashboardSideBar />
      <main className="bg-white flex-1 text-gray-700">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default layout;
