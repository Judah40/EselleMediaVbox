import React, { useRef, useEffect, useState, useCallback, memo } from "react";
import { ChevronLeft, ChevronRight, Radio } from "lucide-react";

// Interface matching your channel JSON structure
interface Channel {
  channelLogo: string;
  channelId: string;
  channelName: string;
  lastBroadcast: string | null;
}

interface ChannelCardProps {
  channel: Channel;
}

const ChannelCard = memo(({ channel }: ChannelCardProps) => {
  const [imageError, setImageError] = useState(false);
  const isLive = channel.lastBroadcast !== null;

  return (
    <div className="flex-shrink-0 w-40 lg:w-48 group cursor-pointer">
      <div className="relative aspect-square rounded-xl overflow-hidden mb-3 bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10">
        {!imageError ? (
          <img
            src={channel.channelLogo}
            alt={channel.channelName}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Radio className="h-12 w-12 text-gray-600" />
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-3 left-3 right-3">
            <button className="w-full bg-white/90 hover:bg-white text-black py-2 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center space-x-2">
              <Radio className="h-4 w-4" />
              <span>Tune In</span>
            </button>
          </div>
        </div>

        {/* Live indicator */}
        {isLive && (
          <div className="absolute top-2 right-2 px-2 py-1 bg-red-600 text-white text-xs font-bold rounded flex items-center space-x-1 shadow-lg">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            <span>LIVE</span>
          </div>
        )}

        {/* Channel logo corner badge */}
        <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs text-white/80 font-medium">
          CH
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-white font-semibold text-sm lg:text-base group-hover:text-[#1ABC9C] transition-colors">
          {channel.channelName}
        </h3>
        <p className="text-gray-400 text-xs mt-1">
          {isLive ? "Broadcasting Now" : "Available"}
        </p>
      </div>
    </div>
  );
});

ChannelCard.displayName = "ChannelCard";

interface ChannelListProps {
  title?: string;
  channels: Channel[];
}

const ChannelList = memo(
  ({ title = "Live Channels", channels }: ChannelListProps) => {
    const rowRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    const checkScrollButtons = useCallback(() => {
      if (rowRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
        setShowLeftArrow(scrollLeft > 10);
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
      }
    }, []);

    const scroll = useCallback((direction: "left" | "right") => {
      if (rowRef.current) {
        const scrollAmount = rowRef.current.clientWidth * 0.75;
        rowRef.current.scrollBy({
          left: direction === "left" ? -scrollAmount : scrollAmount,
          behavior: "smooth",
        });
      }
    }, []);

    useEffect(() => {
      checkScrollButtons();
      const handleResize = () => checkScrollButtons();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, [checkScrollButtons]);

    if (!channels || channels.length === 0) {
      return null;
    }

    return (
      <section className="py-6 lg:py-8 overflow-hidden">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4 lg:mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-1 h-8 bg-[#1ABC9C] rounded-full" />
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                {title}
              </h2>
              <div className="hidden sm:flex items-center space-x-2 bg-[#1ABC9C]/10 px-3 py-1.5 rounded-full">
                <div className="w-2 h-2 bg-[#1ABC9C] rounded-full animate-pulse" />
                <span className="text-[#1ABC9C] text-sm font-semibold">
                  {channels.filter((c) => c.lastBroadcast !== null).length} Live
                </span>
              </div>
            </div>
            <button className="text-[#1ABC9C] hover:text-[#16A085] text-sm lg:text-base font-semibold transition-colors flex-shrink-0">
              Browse All →
            </button>
          </div>

          <div className="relative group">
            {showLeftArrow && (
              <button
                onClick={() => scroll("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 lg:w-12 lg:h-12 bg-black/80 hover:bg-black/90 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 border border-white/10"
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </button>
            )}

            {showRightArrow && (
              <button
                onClick={() => scroll("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 lg:w-12 lg:h-12 bg-black/80 hover:bg-black/90 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 border border-white/10"
                aria-label="Scroll right"
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </button>
            )}

            <div
              ref={rowRef}
              className="flex space-x-4 lg:space-x-6 overflow-x-scroll scrollbar-hide scroll-smooth pb-4"
              onScroll={checkScrollButtons}
            >
              {channels.map((channel) => (
                <ChannelCard key={channel.channelId} channel={channel} />
              ))}
            </div>
          </div>
        </div>

        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </section>
    );
  }
);

ChannelList.displayName = "ChannelList";

export default ChannelList;
