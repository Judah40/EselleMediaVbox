"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import LiveFootballCard from "../cards/FootballCard";
import { Match } from "@/app/pages/Dashboard/LiveStream/Livedata/[key]/key.types";
import {
  handleGetAllChannels,
  handleLiveMatch,
} from "@/app/api/AdminApi/usersApi/api";
import { useRouter } from "next/navigation";

// Skeleton loader component
const SkeletonCard = () => (
  <div className="bg-gray-800/60 rounded-xl overflow-hidden flex-shrink-0 animate-pulse h-[380px] relative">
    <div className="h-36 bg-gray-700/60"></div>
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-700/60 rounded w-3/4"></div>
      <div className="h-4 bg-gray-700/60 rounded w-1/2"></div>
      <div className="flex justify-between pt-2">
        <div className="flex items-center space-x-2">
          <div className="h-10 w-10 bg-gray-700/60 rounded-full"></div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-700/60 rounded w-16"></div>
            <div className="h-3 bg-gray-700/60 rounded w-12"></div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="h-10 w-10 bg-gray-700/60 rounded-full"></div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-700/60 rounded w-16"></div>
            <div className="h-3 bg-gray-700/60 rounded w-12"></div>
          </div>
        </div>
      </div>
      <div className="pt-4 flex space-x-2">
        <div className="h-8 bg-gray-700/60 rounded w-20"></div>
        <div className="h-8 bg-gray-700/60 rounded w-20"></div>
      </div>
    </div>
  </div>
);

// Screen configuration based on breakpoints
const getScreenConfig = (width: number) => {
  if (width < 640)
    return {
      cardWidth: 260,
      cardSpacing: 16,
      visibleCards: 1,
      containerPadding: 16,
    };
  if (width < 768)
    return {
      cardWidth: 280,
      cardSpacing: 16,
      visibleCards: 2,
      containerPadding: 24,
    };
  if (width < 1024)
    return {
      cardWidth: 280,
      cardSpacing: 20,
      visibleCards: 2,
      containerPadding: 24,
    };
  if (width < 1280)
    return {
      cardWidth: 300,
      cardSpacing: 24,
      visibleCards: 3,
      containerPadding: 32,
    };
  return {
    cardWidth: 320,
    cardSpacing: 24,
    visibleCards: 4,
    containerPadding: 32,
  };
};

export default function ChampionsLeague() {
  const router = useRouter();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [liveMatches, setLiveMatches] = useState<Match[]>([]);
  const [screenConfig, setScreenConfig] = useState(
    getScreenConfig(typeof window !== "undefined" ? window.innerWidth : 1024)
  );

  // Optimized screen configuration update
  useEffect(() => {
    const updateScreenConfig = () => {
      setScreenConfig(getScreenConfig(window.innerWidth));
    };

    updateScreenConfig();
    window.addEventListener("resize", updateScreenConfig);
    return () => window.removeEventListener("resize", updateScreenConfig);
  }, []);

  // Optimized scroll position check
  const checkScrollPosition = useCallback(() => {
    if (!carouselRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setShowLeftArrow(scrollLeft > 5);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("scroll", checkScrollPosition);
      checkScrollPosition();
      return () => carousel.removeEventListener("scroll", checkScrollPosition);
    }
  }, [checkScrollPosition]);

  // Optimized data fetching
  useEffect(() => {
    const fetchLiveMatches = async () => {
      try {
        setIsLoading(true);
        const channelsResponse = await handleGetAllChannels();
        const channels = channelsResponse.data.data;

        const liveChannels = channels.filter((channel: { isLive: boolean }) => channel.isLive);

        if (liveChannels.length === 0) {
          setLiveMatches([]);
          setIsLoading(false);
          return;
        }
        const matchPromises = await Promise.all(
          liveChannels.map(async (channel: { channelName: string; isLive: boolean }) => {
            const match = await handleLiveMatch({
              channelName: channel.channelName,
              date: new Date(),
            });
            return { ...match.data.data, channel: channel.channelName };
          })
        );

        const results = await Promise.all(matchPromises);
        // console.log(results);

        const validMatches = results.filter((match) => match !== null);
        // console.log(validMatches);

        setLiveMatches(validMatches);
      } catch (err) {
        console.error("Failed to fetch live matches:", err);
        setError("Failed to load live matches. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLiveMatches();
  }, []);

  // Optimized scroll function
  // interface ScrollConfig {
  //   cardWidth: number;
  //   cardSpacing: number;
  //   visibleCards: number;
  // }

  const scroll = useCallback(
    (direction: "left" | "right") => {
      if (!carouselRef.current) return;

      const itemWidth = screenConfig.cardWidth + screenConfig.cardSpacing;
      const scrollItems =
        window.innerWidth < 640 ? 1 : Math.min(screenConfig.visibleCards, 2);
      const scrollAmount =
        direction === "left"
          ? -itemWidth * scrollItems
          : itemWidth * scrollItems;

      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    },
    [screenConfig]
  );

  const handlePlayMatch = (id: string) => {
    if (id) {
      router.push(`/pages/Live/${id}`);
    }
  };

  const handleViewMatchInfo = (id: string) => {
    if (id) {
      router.push(`/match-info/${id}`);
    }
  };

  // Create skeleton loaders based on visible cards
  const renderSkeletons = () => {
    return Array(screenConfig.visibleCards + 1)
      .fill(0)
      .map((_, index) => (
        <div
          key={`skeleton-${index}`}
          className="flex-shrink-0"
          style={{ width: `${screenConfig.cardWidth}px` }}
        >
          <SkeletonCard />
        </div>
      ));
  };

  return (
    <div
      className="relative bg-cover bg-center h-auto min-h-[500px] md:min-h-[600px] w-full"
      style={{
        backgroundImage:
          "url(/backgrounds/tim-bechervaise-_hjsopbklZ0-unsplash.jpg)",
      }}
    >
      {/* Enhanced gradient overlay for better text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/80"></div>

      <div className="relative z-10 text-white px-4 md:px-8 py-8 md:py-16 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">
              Sierra Leone League
            </h1>
            <p className="mt-2 md:mt-1 max-w-lg text-sm md:text-lg text-gray-300">
              Watch world-class matches from the 2023-2024 Sierra Leone Premier
              League
            </p>
          </div>

          {!isLoading && liveMatches.length > 0 && (
            <div className="hidden md:flex items-center mt-4 md:mt-0 space-x-2">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <span className="text-sm font-medium">
                {liveMatches.length} Live Matches
              </span>
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-900/50 border border-red-700 text-white px-4 py-3 rounded-lg mb-6">
            <p>{error}</p>
          </div>
        )}

        <div className="relative group mt-6 md:mt-8 w-full">
          {showLeftArrow && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 z-30">
              <button
                onClick={() => scroll("left")}
                className="p-2 md:p-3 bg-black/70 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-amber-500 hover:text-black ml-1 md:ml-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
              </button>
            </div>
          )}

          {showRightArrow && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 z-30">
              <button
                onClick={() => scroll("right")}
                className="p-2 md:p-3 bg-black/70 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-amber-500 hover:text-black mr-1 md:mr-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
              </button>
            </div>
          )}

          <div
            className="w-full"
            style={{
              paddingLeft: `${screenConfig.containerPadding}px`,
              paddingRight: `${screenConfig.containerPadding}px`,
            }}
          >
            <div
              ref={carouselRef}
              className="flex overflow-x-auto scrollbar-hide scroll-smooth py-4 pb-8"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
                gap: `${screenConfig.cardSpacing}px`,
              }}
            >
              {isLoading ? (
                renderSkeletons()
              ) : liveMatches.length > 0 ? (
                liveMatches.map((match, idx) => (
                  <div
                    key={idx}
                    className="flex-shrink-0"
                    style={{
                      width: `${screenConfig.cardWidth}px`,
                    }}
                  >
                    <LiveFootballCard
                      match={match}
                      onPlay={handlePlayMatch}
                      onInfo={handleViewMatchInfo}
                    />
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center w-full min-h-[300px]">
                  <div className="text-center">
                    <p className="text-gray-400 text-lg">
                      No live matches available
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                      Check back later for upcoming matches
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Scroll indicators */}
            <div className="flex justify-center mt-4 space-x-1">
              {!isLoading &&
                liveMatches.length > screenConfig.visibleCards &&
                Array(Math.ceil(liveMatches.length / screenConfig.visibleCards))
                  .fill(0)
                  .map((_, index) => (
                    <div
                      key={`indicator-${index}`}
                      className="w-2 h-2 rounded-full bg-gray-500 transition-colors duration-300"
                    ></div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
