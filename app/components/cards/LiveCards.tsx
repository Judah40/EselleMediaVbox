"use client";

/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
// import CardButton from "../buttons/CardButton";
import { Play, Info} from "lucide-react";


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

const LiveCards: React.FC<NetflixCardProps> = ({movie}) => {
  const [isHovered, setIsHovered] = useState(false);


  return (
    <div className="relative p-8 -m-8">
    <div
      className={`transition-all duration-300 ease-in-out ${
        isHovered ? 'scale-110 z-10 relative' : 'scale-100'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Container */}
      <div className="w-64 rounded-md overflow-hidden shadow-lg">
        {/* Rest of card content remains the same */}
        <div className="relative h-36">
          <img
            src="/api/placeholder/256/144"
            alt={`${movie.title} thumbnail`}
            className="w-full h-full object-cover"
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

        <div className="bg-gray-800 p-4">
          <h3 className="text-white font-semibold mb-2">{movie.title}</h3>
          {isHovered && (
            <div className="text-gray-400 text-sm">
              <p>{movie.match}% Match</p>
              <p>{movie.duration} • {movie.genres.join(', ')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
  );
};

export default LiveCards;
