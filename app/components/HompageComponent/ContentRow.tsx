import React, { useRef, useEffect, useState, useCallback, memo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

// Updated interface to match your JSON structure
interface Post {
  id: number;
  postId: string;
  description: string;
  thumbnailUrl: string;
  duration: number;
  rating: null | number;
  bannerUrl: string;
  title: string;
  likeCount: number;
  genre: string[];
  location: string;
}

interface ContentCardProps {
  content: Post;
}

export const ContentCard = memo(({ content }: ContentCardProps) => {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Link
      href={`/pages/Player/${content.postId}`}
      className="flex-shrink-0 w-48 lg:w-64 group cursor-pointer"
    >
      <div className="relative aspect-video rounded-lg overflow-hidden mb-2">
        <img
          src={content.thumbnailUrl}
          alt={content.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs text-white">
          {formatDuration(content.duration)}
        </div>
      </div>
      <h3 className="text-white font-semibold text-sm lg:text-base mb-1 line-clamp-2">
        {content.title}
      </h3>
      <p className="text-gray-400 text-xs lg:text-sm line-clamp-2">
        {content.description}
      </p>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-xs text-gray-500">{content.location}</span>
        <span className="text-xs text-[#1ABC9C]">
          {content.genre.join(", ")}
        </span>
      </div>
    </Link>
  );
});

ContentCard.displayName = "ContentCard";

const ContentRow = memo(
  ({ title, items }: { title: string; items: Post[]; priority?: boolean }) => {
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

    return (
      <section className="py-6 lg:py-8 overflow-hidden">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4 lg:mb-6">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
              {title}
            </h2>
            <button className="text-[#1ABC9C] hover:text-[#16A085] text-sm lg:text-base font-semibold transition-colors flex-shrink-0">
              See All →
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
              className="flex space-x-3 lg:space-x-4 overflow-x-scroll scrollbar-hide scroll-smooth pb-4"
              onScroll={checkScrollButtons}
            >
              {items.map((item) => (
                <ContentCard key={item.postId} content={item} />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
);

ContentRow.displayName = "ContentRow";

export default ContentRow;
