/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Header from "@/app/components/Header";
import Sidebar from "@/app/components/SideBar";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import { PostVideoData } from "../Dashboard/Videos/videos.types";
import { handleGetAllList } from "@/app/api/MyListApi/api";
import HeroSection from "@/app/components/HompageComponent/HeroSection";
import { UserAuth } from "@/useContext";
import ContentRow from "@/app/components/HompageComponent/ContentRow";

// ✅ Custom hook for API calls
const useVideos = (username?: string) => {
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
    if (!username) return; // wait for user context

    const fetchVideos = async () => {
      try {
        const response = await handleGetAllList();
        // check if response has .data or is direct data
        const data = response?.data || response;

        setState({
          videos: data || [],
          filteredVideos: data || [],
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error("Failed to fetch videos:", error);
        setState((prev) => ({
          ...prev,
          loading: false,
          error: "Failed to fetch videos",
        }));
      }
    };

    fetchVideos();
  }, [username]);

  return state;
};

const MyList = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Home");
  const { username } = UserAuth();

  const { videos, filteredVideos, loading } = useVideos();

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Header onMenuToggle={toggleSidebar} isMenuOpen={sidebarOpen} />

      <div className="flex">
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
            {videos.length > 0 && (
              <HeroSection User={username!} content={videos[0]} />
            )}
          </Suspense>

          <div className="space-y-6 lg:space-y-10 pb-12 lg:pb-20 relative z-10">
            <Suspense
              fallback={
                <div className="h-64 bg-gray-800 animate-pulse rounded" />
              }
            >
              <ContentRow
                title="Music Videos"
                items={videos.filter((p) => p.genre.includes("Music"))}
              />

              <ContentRow
                title="Comedy Videos"
                items={videos.filter((p) => p.genre.includes("comedy"))}
              />
              <ContentRow
                title="Sports Videos"
                items={videos.filter((p) => p.genre.includes("sports"))}
              />
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MyList;
