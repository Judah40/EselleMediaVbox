"use client";

/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
// import CardButton from "../buttons/CardButton";
import { Play, Info } from "lucide-react";

interface Movie {
  id: number;
  title: string;
  match: number;
  duration: string;
  genres: string[];
}

interface NetflixCardProps {
  movie: Movie;
}

const LiveFootballCards: React.FC<NetflixCardProps> = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative p-8 -m-8 mt-12">
      <div
        className={`transition-all duration-300 ease-in-out ${
          isHovered ? "scale-110 z-10 relative" : "scale-100"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Card Container */}
        <div className="w-64 rounded-md overflow-hidden shadow-lg">
          {/* Rest of card content remains the same */}
          <div className="relative h-40 ">
            <img
              src="/backgrounds/football-background.jpg"
              alt={`${movie.title} thumbnail`}
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

          <div className="p-4">
            <p className="text-xs text-gray-400">SL Premier League</p>
            <p>
              <span>Bo Rangers vs Fc Kallon |</span>
              <span> Round 13</span>
            </p>
            <div className="px-2 py-1 rounded-full items-center gap-2 bg-white inline-flex ">
              <div className="animate-pulse bg-red-500 w-1 h-1 rounded-full" />
              <p className="text-red-500 text-xs">Live</p>
            </div>
            {isHovered && (
              <div className="text-gray-400 text-sm">
                <p>{movie.match}% Match</p>
                <p>12:00 (GMT)</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveFootballCards;
