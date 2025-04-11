"use client";

import React, { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import LiveFootballCard from "../cards/FootballCard";
import { movies } from "@/app/api/DummyData/Movies";

const sampleMatches = [
  {
    id: 1,
    league: {
      name: "SL Premier League",
      logo: "/logos/premier-league.png",
    },
    homeTeam: {
      name: "Bo Rangers",
      logo: "/logos/bo-rangers.png",
      score: 2,
    },
    awayTeam: {
      name: "FC Kallon",
      logo: "/logos/fc-kallon.png",
      score: 1,
    },
    round: "Round 13",
    dateTime: "12:00 (GMT)",
    stadium: "National Stadium",
    isLive: true,
    matchPercentage: 95,
  },
  // For testing purposes, I'm duplicating the sample match with different IDs
  {
    id: 2,
    league: {
      name: "SL Premier League",
      logo: "/logos/premier-league.png",
    },
    homeTeam: {
      name: "East End Lions",
      logo: "/logos/bo-rangers.png",
      score: 0,
    },
    awayTeam: {
      name: "Mighty Blackpool",
      logo: "/logos/fc-kallon.png",
      score: 0,
    },
    round: "Round 13",
    dateTime: "14:30 (GMT)",
    stadium: "National Stadium",
    isLive: false,
    matchPercentage: 88,
  },
];
export default function ChampionsLeague() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const [screenConfig, setScreenConfig] = useState({
    cardWidth: 280,
    cardSpacing: 16,
    visibleCards: 1,
    containerPadding: 16,
  });

  useEffect(() => {
    const updateScreenConfig = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setScreenConfig({
          cardWidth: 260,
          cardSpacing: 16,
          visibleCards: 1,
          containerPadding: 16,
        });
      } else if (width < 768) {
        setScreenConfig({
          cardWidth: 280,
          cardSpacing: 16,
          visibleCards: 2,
          containerPadding: 24,
        });
      } else if (width < 1024) {
        setScreenConfig({
          cardWidth: 280,
          cardSpacing: 20,
          visibleCards: 2,
          containerPadding: 24,
        });
      } else if (width < 1280) {
        setScreenConfig({
          cardWidth: 300,
          cardSpacing: 24,
          visibleCards: 3,
          containerPadding: 32,
        });
      } else {
        setScreenConfig({
          cardWidth: 320,
          cardSpacing: 24,
          visibleCards: 4,
          containerPadding: 32,
        });
      }
    };

    updateScreenConfig();
    window.addEventListener("resize", updateScreenConfig);
    return () => window.removeEventListener("resize", updateScreenConfig);
  }, []);

  const checkScrollPosition = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setShowLeftArrow(scrollLeft > 5);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("scroll", checkScrollPosition);
      checkScrollPosition();
      return () => carousel.removeEventListener("scroll", checkScrollPosition);
    }
  }, []);

  const scroll = (direction: string) => {
    if (carouselRef.current) {
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
    }
  };

  const matchData = movies.map((movie, index) => {
    const matchIndex = index % sampleMatches.length;
    return {
      ...sampleMatches[matchIndex],
      id: (index + 1).toString(),
    };
  });

  const handlePlayMatch = (id: string) => {
      // console.log(`Play match ${id}`);
      if (id) {
      }
    };

  const handleViewMatchInfo = (id: string) => {
    // console.log(`View info for match ${id}`);
    if (id) {
    }
  };

  return (
    <div
      className="relative bg-cover bg-center h-auto min-h-[500px] md:min-h-[600px] w-full"
      style={{
        backgroundImage:
          "url(/backgrounds/tim-bechervaise-_hjsopbklZ0-unsplash.jpg)",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>

      <div className="relative z-10 text-white px-4 md:px-8 py-8 md:py-16 w-full">
        <h1 className="text-2xl md:text-4xl font-bold">Sierra Leone League</h1>
        <p className="mt-2 md:mt-4 max-w-lg text-sm md:text-lg">
          Watch the world-class matches presented in the 2023-2024 Sierra Leone
          Premier League.
        </p>

        <div className="relative group mt-6 md:mt-8 w-full">
          {showLeftArrow && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 z-30">
              <button
                onClick={() => scroll("left")}
                className="p-1 md:p-2 bg-black/70 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/90 ml-1 md:ml-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 text-white" />
              </button>
            </div>
          )}

          {showRightArrow && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 z-30">
              <button
                onClick={() => scroll("right")}
                className="p-1 md:p-2 bg-black/70 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/90 mr-1 md:mr-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-white" />
              </button>
            </div>
          )}

          {/* Updated Carousel Container */}
          <div
            className="w-full"
            style={{
              paddingLeft: `${screenConfig.containerPadding}px`,
              paddingRight: `${screenConfig.containerPadding}px`,
            }}
          >
            <div
              ref={carouselRef}
              className="flex overflow-x-auto scrollbar-hide scroll-smooth py-4"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
                gap: `${screenConfig.cardSpacing}px`,
                paddingLeft: `calc(${screenConfig.containerPadding}px - ${screenConfig.cardSpacing}px)`,
              }}
            >
              {matchData.map((match) => (
                <div
                  key={match.id}
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
