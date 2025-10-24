import { Content } from "@/app/types/Home";
import { Star, Check, Play, Plus } from "lucide-react";
import Image from "next/image";
import React, { useCallback, useState } from "react";

// Optimized ContentCard with memoization
const ContentCard = React.memo(
  ({
    content,
    size = "default",
  }: {
    content: Content;
    size?: "small" | "default" | "large";
  }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [inMyList, setInMyList] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const sizeClasses = {
      small: "w-40 sm:w-44",
      default: "w-48 sm:w-56 md:w-64",
      large: "w-56 sm:w-64 md:w-80",
    };

    const handleMyListToggle = useCallback((e: React.MouseEvent) => {
      e.stopPropagation();
      setInMyList((prev) => !prev);
    }, []);

    return (
      <div
        className={`${sizeClasses[size]} flex-shrink-0 group cursor-pointer`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-[2/3] rounded-xl lg:rounded-2xl overflow-hidden bg-gray-800 shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-[#087e66]">
          <div className="relative w-full h-full">
            <Image
              src={content.thumbnail}
              alt={content.title}
              fill
              sizes={`(max-width: 768px) ${
                size === "small"
                  ? "176px"
                  : size === "large"
                  ? "256px"
                  : "224px"
              }, ${
                size === "small"
                  ? "176px"
                  : size === "large"
                  ? "320px"
                  : "256px"
              }`}
              className={`object-cover transition-transform duration-500 group-hover:scale-110 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-700 animate-pulse" />
            )}
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

          {content.isNew && (
            <div className="absolute top-2 lg:top-3 left-2 lg:left-3 z-10">
              <span className="bg-gradient-to-r from-[#1ABC9C] to-[#087e66] text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-lg">
                NEW
              </span>
            </div>
          )}

          <div
            className={`absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <button className="w-14 h-14 lg:w-16 lg:h-16 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 border border-white/20">
              <Play className="h-6 w-6 lg:h-7 lg:w-7 text-white fill-white ml-1" />
            </button>
          </div>

          {isHovered && (
            <div className="absolute top-2 lg:top-3 right-2 lg:right-3 space-y-2 z-10">
              <button
                onClick={handleMyListToggle}
                className={`w-8 h-8 lg:w-9 lg:h-9 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-md border ${
                  inMyList
                    ? "bg-[#1ABC9C] border-[#087e66]"
                    : "bg-black/50 hover:bg-black/70 border-white/20"
                }`}
              >
                {inMyList ? (
                  <Check className="h-4 w-4 text-white" />
                ) : (
                  <Plus className="h-4 w-4 text-white" />
                )}
              </button>
            </div>
          )}

          {content.progress && content.progress > 0 && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
              <div
                className="h-full bg-[#1ABC9C] transition-all duration-500"
                style={{ width: `${content.progress * 100}%` }}
              />
            </div>
          )}
        </div>

        <div className="pt-3 space-y-1.5">
          <h3 className="text-white font-semibold text-sm lg:text-base line-clamp-2 group-hover:text-[#1ABC9C] transition-colors leading-snug">
            {content.title}
          </h3>
          <div className="flex items-center space-x-2 text-xs lg:text-sm text-gray-400">
            <span>{content.duration}</span>
            <span>•</span>
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
              <span>{content.rating}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ContentCard.displayName = "ContentCard";

export default ContentCard;
