/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  lazy,
  Suspense,
} from "react";
import { Play } from "lucide-react";
import Header from "@/app/components/Header";
import { PostVideoData } from "../Dashboard/Videos/videos.types";
import { handleGetAllPosts } from "@/app/api/PostApi/api";
import Sidebar from "@/app/components/SideBar";
import { UserAuth } from "@/useContext";
import { getAllChannel } from "@/app/api/ChannelApi/api";

// Lazy load heavy components
const ContentRow = lazy(
  () => import("../../components/HompageComponent/ContentRow")
);
const HeroSection = lazy(
  () => import("../../components/HompageComponent/HeroSection")
);

const ChannelList = lazy(
  () => import("../../components/HompageComponent/ChannelList")
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
        const values = await handleGetAllPosts();
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

// Footer component
const Footer = React.memo(() => (
  <footer className="bg-gradient-to-t from-black to-transparent border-t border-white/5 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
        {[
          { title: "Company", links: ["About Us", "Careers", "Press"] },
          { title: "Support", links: ["Help Center", "Contact Us", "FAQ"] },
          {
            title: "Legal",
            links: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
          },
          { title: "Follow Us", links: ["Twitter", "Facebook", "Instagram"] },
        ].map((section, index) => (
          <div key={section.title}>
            <h3 className="text-white font-semibold mb-4">{section.title}</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {section.links.map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <div className="w-8 h-8 bg-gradient-to-br from-[#1ABC9C] to-[#087e66] rounded-lg flex items-center justify-center">
            <Play className="h-4 w-4 text-white fill-white" />
          </div>
          <span className="text-white font-bold text-lg">StreamMax</span>
        </div>
        <p className="text-gray-400 text-sm">
          © 2024 StreamMax. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
));

Footer.displayName = "Footer";

interface Channel {
  channelId: string;
  channelName: string;
  channelLogo: string;
  lastBroadcast: string;
  lastTotalViewers: number;
}
// Main Component
const StreamingPlatform = () => {
  const [activeCategory, setActiveCategory] = useState("Home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { username } = UserAuth();
  const { videos, filteredVideos, loading } = useVideos();
  const [channels, setChannels] = useState<Channel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const getChannelsData = async () => {
    const response = await getAllChannel()
      .catch((error) => {})
      .finally(() => {
        setIsLoading(false);
      });
    // console.log(response.data);
    setChannels(response.data);
  };
  // Simulate data fetching
  useEffect(() => {
    getChannelsData();

    // ✅ Refetch when new channel is created
    const refreshListener = () => getChannelsData();
    window.addEventListener("refresh-channels", refreshListener);
    return () => {
      window.removeEventListener("refresh-channels", refreshListener);
    };
  }, []);
  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  if (loading) {
    return <LoadingSkeleton />;
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
          <Suspense
            fallback={<div className="h-[85vh] bg-gray-800 animate-pulse" />}
          >
            {videos[5] && <HeroSection User={username!} content={videos[5]} />}
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

              <ChannelList channels={channels} />

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

          <Footer />
        </main>
      </div>
    </div>
  );
};

export default React.memo(StreamingPlatform);
