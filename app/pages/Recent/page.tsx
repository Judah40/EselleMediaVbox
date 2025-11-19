"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
import Header from "@/app/components/Header";
import React, { useCallback, useEffect, useState } from "react";
import { PostVideoData } from "../Dashboard/Videos/videos.types";
import { handleGetMyWatchList } from "@/app/api/PostApi/api";
import Sidebar from "@/app/components/SideBar";
import { ContentCard } from "@/app/components/HompageComponent/ContentRow";
import { UserAuth } from "@/useContext";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";

// Loading component for Suspense
const LoadingSkeleton = () => (
  <div className="min-h-screen bg-black">
    <div className="h-[85vh] bg-gray-800 animate-pulse" />
    <div className="space-y-6 lg:space-y-10 pb-12 lg:pb-20">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="px-4 sm:px-6 lg:px-8">
          <div className="h-8 bg-gray-800 rounded mb-4 w-1/4 animate-pulse" />
          <div className="flex space-x-4 overflow-hidden">
            {[...Array(6)].map((_, j) => (
              <div
                key={j}
                className="w-48 h-72 bg-gray-800 rounded-xl animate-pulse"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);
// Custom hook for API calls
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
        const values = await handleGetMyWatchList();
        if (mounted) {
          setState((prev) => ({
            ...prev,
            videos: values.posts || [],
            filteredVideos: values.posts || [],
            loading: false,
          }));
        }
      } catch (error) {
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
const Page = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Home");
  const { username } = UserAuth();
  const router = useRouter();
  const { videos, loading } = useVideos();
  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const handleLogin = () => {
    router.push("/pages/Auth/Signin");
  };
  if (loading) {
    return <LoadingSkeleton />;
  }

  if (!username) {
    return (
      <div className="min-h-screen bg-black">
        <Header
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          isMenuOpen={sidebarOpen}
        />
        <div className="flex-1">
          <Sidebar
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
          <main className="flex-1 gap-2 min-h-screen transition-all duration-300 lg:pl-72 overflow-x-hidden h-screen flex items-center justify-center flex-col">
            <div className="text-center flex flex-col items-center space-y-4">
              <p className="text-white text-lg">
                Please login to access watchlist
              </p>
              <button
                onClick={handleLogin}
                className="flex items-center space-x-2 bg-[#1ABC9C] hover:bg-[#087e66] text-white px-6 py-3 rounded-lg transition-colors font-medium"
              >
                <User className="h-5 w-5" />
                <span>Login</span>
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }
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
          <div className="pt-20">
            {videos.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[80vh]">
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                  No Recent Videos
                </h2>
                <p className="text-gray-400 text-center max-w-md">
                  You haven&apos;t watched any videos recently. Start exploring
                  and enjoy our content!
                </p>
              </div>
            ) : (
              <div className="space-y-6 lg:space-y-10 pb-12 lg:pb-20">
                <div className="px-4 sm:px-6 lg:px-8">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4">
                    Recently Watched
                  </h2>
                  <div className="flex space-x-4 overflow-x-scroll scrollbar-hide">
                    {videos.map((video) => (
                      <ContentCard key={video.postId} content={video} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Page;
