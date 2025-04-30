/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { Clock, User, Video, Signal, Shield } from "lucide-react";
import { Match } from "../../LiveStream/Livedata/[key]/key.types";

type live = {
  LiveMatch: Match | undefined;
};
export default function MatchInterface({ LiveMatch }: live) {
  const [elapsedTime, setElapsedTime] = useState("01:24:36");
  const [viewerCount, setViewerCount] = useState(2453);

  // Simulated viewer count increase for dynamic feel
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount((prev) => prev + Math.floor(Math.random() * 3));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 shadow-xl w-full">
      {/* Header with League Info */}
      <div className="flex items-center space-x-4 mb-6">
        {LiveMatch?.leagueLogo && (
          <div className="w-16 h-16 bg-gray-800 rounded-lg p-2 flex items-center justify-center border-2 border-blue-500">
            <img
              src={LiveMatch?.leagueLogo}
              alt="League"
              className="w-full h-full object-contain"
            />
          </div>
        )}
        <div>
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
            <span className="text-green-400 text-sm font-medium">LIVE NOW</span>
          </div>
          <h2 className="text-white text-2xl font-bold">
            {LiveMatch?.leagueName}
          </h2>
          <p className="text-gray-400">{LiveMatch?.round}</p>
        </div>
        <div className="ml-auto flex items-center bg-gray-800 px-4 py-2 rounded-lg">
          <User size={18} className="text-blue-400 mr-2" />
          <span className="text-white font-bold">
            {viewerCount.toLocaleString()}
          </span>
          <span className="text-green-500 text-xs ml-2">+3</span>
        </div>
      </div>

      {/* Teams Section */}
      <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 rounded-xl p-6 mb-6 relative overflow-hidden border border-gray-700">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-red-500"></div>

        <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
          {/* Home Team */}
          <div className="flex flex-col items-center md:items-start w-full md:w-2/5 mb-6 md:mb-0">
            {LiveMatch?.HomeTeamLogo && (
              <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-800 p-3 shadow-lg border-2 border-blue-500">
                <img
                  src={LiveMatch?.HomeTeamLogo}
                  alt="Home Team"
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            <h3 className="text-2xl font-bold text-white mt-4">
              {LiveMatch?.HomeTeam}
            </h3>
            <div className="flex items-center mt-1">
              <Shield size={14} className="text-blue-400 mr-1" />
              <span className="text-blue-400 text-sm">Home</span>
            </div>
          </div>

          {/* Center Score */}
          <div className="flex flex-col items-center justify-center w-full md:w-1/5">
            <div className="relative">
              <div className="bg-gray-800 text-white px-8 py-4 rounded-xl font-bold text-3xl border-2 border-gray-700 shadow-lg">
                VS
              </div>
              <div className="absolute -top-2 -right-2">
                <span className="flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
                </span>
              </div>
            </div>
            <div className="mt-4 bg-gray-800 px-4 py-1 rounded-full">
              <span className="text-gray-300 text-sm">
                {LiveMatch?.Date?.toString()}
              </span>
            </div>
          </div>

          {/* Away Team */}
          <div className="flex flex-col items-center md:items-end w-full md:w-2/5">
            {LiveMatch?.AwayTeamLogo && (
              <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-800 p-3 shadow-lg border-2 border-red-500">
                <img
                  src={LiveMatch?.AwayTeamLogo}
                  alt="Away Team"
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            <h3 className="text-2xl font-bold text-white mt-4">
              {LiveMatch?.AwayTeam}
            </h3>
            <div className="flex items-center mt-1">
              <Shield size={14} className="text-red-400 mr-1" />
              <span className="text-red-400 text-sm">Away</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 shadow-lg border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 font-medium">Viewers</span>
            <User size={18} className="text-blue-400" />
          </div>
          <p className="text-white font-bold text-2xl">
            {viewerCount.toLocaleString()}
          </p>
          <div className="h-2 w-full bg-gray-700 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full w-3/4"></div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 shadow-lg border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 font-medium">Duration</span>
            <Clock size={18} className="text-purple-400" />
          </div>
          <p className="text-white font-bold text-2xl">{elapsedTime}</p>
          <div className="h-2 w-full bg-gray-700 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-purple-500 rounded-full w-1/2"></div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 shadow-lg border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 font-medium">Quality</span>
            <Video size={18} className="text-green-400" />
          </div>
          <p className="text-white font-bold text-2xl">1080p</p>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>720p</span>
            <span>1080p</span>
            <span>4K</span>
          </div>
          <div className="h-2 w-full bg-gray-700 rounded-full mt-1 overflow-hidden">
            <div className="h-full bg-green-500 rounded-full w-2/3"></div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 shadow-lg border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 font-medium">Stream</span>
            <Signal size={18} className="text-green-400" />
          </div>
          <div className="flex items-center">
            <span className="text-green-500 font-bold text-2xl">LIVE</span>
            <span className="flex h-3 w-3 ml-2">
              <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
          </div>
          <div className="h-2 w-full bg-gray-700 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full w-full"></div>
          </div>
        </div>
      </div>

      {/* Match Location */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 mb-6 border border-gray-700">
        <h3 className="text-blue-400 font-medium mb-2">Location</h3>
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <p className="text-white font-medium text-lg">
            {LiveMatch?.location}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4 border-t border-gray-700">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2"></div>
          <span className="text-green-400 font-medium">Broadcasting live</span>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg text-white font-medium transition-all shadow-lg hover:shadow-red-900/30">
            End Stream
          </button>
          <button className="px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg text-white font-medium transition-all shadow-lg hover:shadow-blue-900/30">
            Update Details
          </button>
        </div>
      </div>
    </div>
  );
}
