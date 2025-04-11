"use client";

import React, { useState } from "react";
import {
  Play,
  Info,
  Calendar,
  Clock,
  Award,
  ChevronRight,
  Heart,
} from "lucide-react";

// Define the props interface for the LiveFootballCard component
interface LiveFootballCardProps {
  match: {
    id: string;
    isLive: boolean;
    league: {
      name: string;
    };
    homeTeam: {
      name: string;
      logo?: string;
      score?: number;
    };
    awayTeam: {
      name: string;
      logo?: string;
      score?: number;
    };
    dateTime: string;
    matchPercentage?: number;
    stadium?: string;
    round: string;
  };
  onPlay?: (id: string) => void;
  onInfo?: (id: string) => void;
}

const LiveFootballCard: React.FC<LiveFootballCardProps> = ({
  match,
  onPlay = () => {},
  onInfo = () => {},
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPlay(match.id);
  };

  const handleInfoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onInfo(match.id);
  };

  const toggleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className="group relative w-full max-w-[320px] mx-auto transform transition-all duration-500 perspective-1000">
      <div
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-b from-gray-900 to-black border border-gray-800 hover:border-indigo-500/50 transition-all duration-300 shadow-xl hover:shadow-indigo-500/20 ${
          isHovered ? "scale-[1.02] z-10" : "scale-100"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ margin: "0 8px" }} // Add margin between cards
      >
        {/* Background image with overlay and blur effect */}
        <div className="relative h-44 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{
              backgroundImage: `url(/backgrounds/streamPic.jpg)`,
            }}
          />

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />

          {/* Live indicator */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <div
              className={`flex items-center gap-2 px-3 py-1.5 ${
                match.isLive ? "bg-red-500" : "bg-gray-700"
              } bg-opacity-90 backdrop-blur-md rounded-full`}
            >
              <div
                className={`${
                  match.isLive ? "animate-pulse" : ""
                } h-2 w-2 rounded-full bg-white`}
              />
              <span className="text-xs font-medium text-white">
                {match.isLive ? "LIVE" : "UPCOMING"}
              </span>
            </div>
          </div>

          {/* League badge */}
          <div className="absolute top-4 right-4">
            <div className="h-8 w-8 bg-white bg-opacity-10 backdrop-blur-md rounded-full flex items-center justify-center">
              <img
                src={"/logo/vbox.png"}
                alt={match.league.name}
                className="h-full w-full object-contain"
              />
            </div>
          </div>

          {/* Teams section */}
          <div className="absolute bottom-0 inset-x-0 p-4">
            <div className="flex items-center justify-between mb-2">
              {/* Home team */}
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <img
                    src={match.homeTeam.logo || "/logos/team-placeholder.png"}
                    alt={match.homeTeam.name}
                    className="h-6 w-6 object-contain"
                  />
                </div>
                <span className="text-white font-medium text-sm truncate max-w-[80px]">
                  {match.homeTeam.name}
                </span>
              </div>

              {/* Score or VS */}
              <div className="px-3">
                {match.isLive &&
                match.homeTeam.score !== undefined &&
                match.awayTeam.score !== undefined ? (
                  <div className="text-white font-bold">
                    {match.homeTeam.score} - {match.awayTeam.score}
                  </div>
                ) : (
                  <div className="text-gray-400 font-medium text-sm">VS</div>
                )}
              </div>

              {/* Away team */}
              <div className="flex items-center gap-2">
                <span className="text-white font-medium text-sm truncate max-w-[80px]">
                  {match.awayTeam.name}
                </span>
                <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <img
                    src={match.awayTeam.logo || "/logos/team-placeholder.png"}
                    alt={match.awayTeam.name}
                    className="h-6 w-6 object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/80 to-black/40 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
          >
            <button
              className="w-12 h-12 bg-indigo-600 hover:bg-indigo-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-indigo-600/50"
              onClick={handlePlayClick}
            >
              <Play className="w-5 h-5 text-white fill-white ml-0.5" />
            </button>

            <button
              className="w-10 h-10 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/30 rounded-full flex items-center justify-center transition-all duration-300"
              onClick={handleInfoClick}
            >
              <Info className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Card content */}
        <div className="p-4">
          {/* League and round info */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-indigo-400" />
              <p className="text-xs text-indigo-400 font-medium truncate max-w-[100px]">
                {match.league.name}
              </p>
            </div>
            <div className="text-gray-400 text-xs font-medium">
              {match.round}
            </div>
          </div>

          {/* Match title */}
          <h3 className="text-white font-medium text-sm mb-2 truncate">
            {match.homeTeam.name} vs {match.awayTeam.name}
          </h3>

          {/* Match details */}
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              <p className="text-xs text-gray-400">{match.dateTime}</p>
            </div>

            {match.matchPercentage && (
              <div className="text-xs text-indigo-400 font-medium">
                {match.matchPercentage}% Match
              </div>
            )}
          </div>

          {/* Stadium info */}
          {match.stadium && (
            <div className="flex items-center gap-1.5 mb-2">
              <Calendar className="w-3.5 h-3.5 text-gray-400" />
              <p className="text-xs text-gray-400 truncate">{match.stadium}</p>
            </div>
          )}

          {/* Action bar */}
          <div
            className={`mt-3 pt-3 border-t border-gray-800 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 ${
              isHovered ? "translate-y-0" : "translate-y-4"
            }`}
          >
            <button
              className="text-gray-400 hover:text-white text-xs flex items-center gap-1 transition-colors"
              onClick={handleInfoClick}
            >
              Match Details <ChevronRight className="w-3 h-3" />
            </button>

            <button
              className={`p-1.5 rounded-full transition-colors ${
                isBookmarked ? "text-red-500" : "text-gray-400 hover:text-white"
              }`}
              onClick={toggleBookmark}
            >
              <Heart
                className={`w-4 h-4 ${isBookmarked ? "fill-red-500" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Focus/active state outline */}
        <div className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-2 ring-indigo-500/50 transition-all duration-300 pointer-events-none"></div>

        {/* Reflection effect */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-white/5 rounded-b-2xl transform translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
      </div>

      {/* Card shadow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/0 via-indigo-500/10 to-indigo-500/0 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
    </div>
  );
};

export default LiveFootballCard;
