"use client";
import Header from "@/app/components/Header";
import Sidebar from "@/app/components/SideBar";
import React, { useState } from "react";

const Movies = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>("home");

  return (
    <div className="min-h-screen bg-black">
      <Header
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        isMenuOpen={sidebarOpen}
      />
      <div className="flex pt-16">
        <Sidebar
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 min-h-screen transition-all flex item-center justify-center duration-300 lg:pl-72 overflow-x-hidden">
          <span>No Movie Available</span>
        </main>
      </div>
    </div>
  );
};

export default Movies;
