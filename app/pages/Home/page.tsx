/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  lazy,
  Suspense,
} from "react";
import {
  Play,
  Plus,
  Star,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Info,
  Check,
} from "lucide-react";
import Header from "@/app/components/Header";
import { PostVideoData } from "../Dashboard/Videos/videos.types";
import { handleGetAllPosts } from "@/app/api/PostApi/api";
import Sidebar from "@/app/components/SideBar";
import { UserAuth } from "@/useContext";

type data = {
  channelLogo: string;
  channelId: string;
  channelName: string;
  lastBroadcast: string | null;
};

const data: data[] = [
  {
    channelLogo:
      "https://zxiuogzmxtfmtitzvdwu.supabase.co/storage/v1/object/sign/vbox_bucket/channel/3cf51db9-18df-4c34-954e-377b2d4bf8fe?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83NzIwY2E4YS1mMjBhLTQ0ZmMtYTRiMi01ZGRkMGY5OWU2MjMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ2Ym94X2J1Y2tldC9jaGFubmVsLzNjZjUxZGI5LTE4ZGYtNGMzNC05NTRlLTM3N2IyZDRiZjhmZSIsImlhdCI6MTc2MTEwMTg5MywiZXhwIjoxNzYxMTA1MDkzfQ.LZcivcG4-NirCtPhDEMeHrM1cESHuVfPUXJwjk2CYGI",
    channelId: "53788771-62da-48f6-a794-283d1df596ba",
    channelName: "Sports",
    lastBroadcast: null,
  },
  {
    channelLogo:
      "https://zxiuogzmxtfmtitzvdwu.supabase.co/storage/v1/object/sign/vbox_bucket/channel/5786139b-5585-44ba-b028-0beffd04602e?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83NzIwY2E4YS1mMjBhLTQ0ZmMtYTRiMi01ZGRkMGY5OWU2MjMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ2Ym94X2J1Y2tldC9jaGFubmVsLzU3ODYxMzliLTU1ODUtNDRiYS1iMDI4LTBiZWZmZDA0NjAyZSIsImlhdCI6MTc2MTEwMTg5MywiZXhwIjoxNzYxMTA1MDkzfQ.YgvE7yGZv836pDoZieUycnSmRJvmpAM8JYZilSiG45g",
    channelId: "69e88b5f-811a-41da-b3de-c9ada9d447f9",
    channelName: "Movie",
    lastBroadcast: null,
  },
  {
    channelLogo:
      "https://zxiuogzmxtfmtitzvdwu.supabase.co/storage/v1/object/sign/vbox_bucket/channel/507b8226-8609-4bd2-8f73-157c3e993784?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83NzIwY2E4YS1mMjBhLTQ0ZmMtYTRiMi01ZGRkMGY5OWU2MjMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ2Ym94X2J1Y2tldC9jaGFubmVsLzUwN2I4MjI2LTg2MDktNGJkMi04ZjczLTE1N2MzZTk5Mzc4NCIsImlhdCI6MTc2MTEwMTg5MywiZXhwIjoxNzYxMTA1MDkzfQ.3D9FFoPlhMn6pfkvam_vnHalUnyXhSX893myVDAx-CM",
    channelId: "7a127a63-ce2e-491e-84b9-dfd4aa7cc08a",
    channelName: "Music",
    lastBroadcast: null,
  },
  {
    channelLogo:
      "https://zxiuogzmxtfmtitzvdwu.supabase.co/storage/v1/object/sign/vbox_bucket/channel/79b09583-dd4f-4390-9e60-30aa7c3909a7?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83NzIwY2E4YS1mMjBhLTQ0ZmMtYTRiMi01ZGRkMGY5OWU2MjMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ2Ym94X2J1Y2tldC9jaGFubmVsLzc5YjA5NTgzLWRkNGYtNDM5MC05ZTYwLTMwYWE3YzM5MDlhNyIsImlhdCI6MTc2MTEwMTg5MywiZXhwIjoxNzYxMTA1MDkzfQ.xR9GBZGLlV7l5XL8cark1SAobwu9b0sskMtTLZM3UtU",
    channelId: "efdce3d0-d0d6-4d14-9d0a-dbac4b4adabf",
    channelName: "Comedy",
    lastBroadcast: null,
  },
  {
    channelLogo:
      "https://zxiuogzmxtfmtitzvdwu.supabase.co/storage/v1/object/sign/vbox_bucket/channel/dfa20cc7-74ee-4c6f-b1f9-f894e6b5b06b?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83NzIwY2E4YS1mMjBhLTQ0ZmMtYTRiMi01ZGRkMGY5OWU2MjMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ2Ym94X2J1Y2tldC9jaGFubmVsL2RmYTIwY2M3LTc0ZWUtNGM2Zi1iMWY5LWY4OTRlNmI1YjA2YiIsImlhdCI6MTc2MTEwMTg5MywiZXhwIjoxNzYxMTA1MDkzfQ.JwQhjYc9X7sguFTFkFdByGn4MpDSSZRvoGTaiQuB0wA",
    channelId: "b57168d4-22f3-4129-bff4-3d02a3b6a3a0",
    channelName: "Comedy",
    lastBroadcast: null,
  },
];
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
            videos: values.post || [],
            filteredVideos: values.post || [],
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

// Main Component
const StreamingPlatform = () => {
  const [activeCategory, setActiveCategory] = useState("Home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { username } = UserAuth();
  const { videos, filteredVideos, loading } = useVideos();

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

              <ChannelList channels={data} />

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
