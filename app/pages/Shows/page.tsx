/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Header from "@/app/components/Header";
import Sidebar from "@/app/components/SideBar";
import { UserAuth } from "@/useContext";
import React, { Suspense, useEffect, useState } from "react";
import { PostVideoData } from "../Dashboard/Videos/videos.types";
import { handleGetPostByGenre } from "@/app/api/PostApi/api";
import HeroSection from "@/app/components/HompageComponent/HeroSection";
import Footer from "@/app/components/Footer";
import ContentRow from "@/app/components/HompageComponent/ContentRow";

const useVideos = () => {
  const [state, setState] = useState<{
    videos: PostVideoData[];
    filteredVideos: PostVideoData[];
    loading: boolean;
    error: string | null;
  }>({
    videos: [],
    filteredVideos: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    let mounted = true;

    const fetchVideos = async () => {
      try {
        const values = await handleGetPostByGenre("comedy");
        if (mounted) {
          setState((prev) => ({
            ...prev,
            videos: values.post || [],
            filteredVideos: values.post || [],
            loading: false,
          }));
        }
      } catch (error) {
        console.error(error);

        if (mounted) {
          setState((prev) => ({
            ...prev,
            loading: false,
            error: "Failed to fetch videos",
          }));
        }
      }
    };

    fetchVideos();

    return () => {
      mounted = false;
    };
  }, []);

  return state;
};
const Shows = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>("home");
  const { username } = UserAuth();
  const { videos, filteredVideos, loading } = useVideos();
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

        <main className="flex-1 min-h-screen transition-all duration-300 lg:pl-72 overflow-x-hidden">
          <Suspense
            fallback={<div className="h-[85vh] bg-gray-800 animate-pulse" />}
          >
            {videos[1] && <HeroSection User={username!} content={videos[1]} />}
          </Suspense>

          <div className="space-y-6 lg:space-y-10 pb-12 lg:pb-20 relative z-10">
            <Suspense
              fallback={
                <div className="h-64 bg-gray-800 animate-pulse rounded" />
              }
            >
              <ContentRow
                title="Comedy Videos"
                items={videos.filter((p) => p.genre.includes("comedy"))}
              />
            </Suspense>
          </div>

          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Shows;
