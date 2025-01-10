"use client";

/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { Play, Info } from "lucide-react";

interface Post {
  id: number;
  thumbnailUrl: string;
  bannerUrl: string;
  caption: string;
  likeCount: number;
  commentCount: number;
}

interface NewsLiveCardProps {
  post: Post;
}

const NewsLiveCard: React.FC<NewsLiveCardProps> = ({ post }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative p-8 -m-8 ">
      <div
        className={`transition-all duration-300 ease-in-out ${
          isHovered ? "scale-110 z-10 relative" : "scale-100"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Card Container */}
        <div className="w-64 rounded-md overflow-hidden shadow-lg">
          <div className="relative h-44 border-[0.2px] rounded-md">
            <img
              src={post.thumbnailUrl}
              alt={post.caption}
              className="w-full h-full object-cover rounded-md"
            />

            {isHovered && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center gap-4">
                <button
                  className="p-2 bg-white rounded-full hover:bg-opacity-80"
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                  }}
                >
                  <Play className="w-6 h-6 text-black" />
                </button>
                <button
                  className="p-2 border-2 border-white rounded-full hover:bg-white hover:bg-opacity-20"
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                  }}
                >
                  <Info className="w-6 h-6 text-white" />
                </button>
              </div>
            )}
          </div>

          <div className="p-4 gap-1">
            <p className="text-xs text-gray-400">We Yus</p>
            <p>{post.caption}</p>
            <div className="flex items-center gap-2">
              <span>{post.likeCount} Likes</span>
              <span>{post.commentCount} Comments</span>
            </div>
            {isHovered && (
              <div className="text-gray-400 text-sm">
                {/* Additional post info can be added here if needed */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLiveCard;
