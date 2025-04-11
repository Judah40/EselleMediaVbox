import React from "react";
import { ResponseCardProps } from "../../LiveStream/live.types";
import { MoreVertical, ArrowRight, Play, Pause } from "lucide-react";

const StatusIndicator = ({ status }: { status: "RUNNING" | "IDLE" }) => {
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${
        status === "RUNNING"
          ? "bg-emerald-50 text-emerald-600"
          : "bg-amber-50 text-amber-600"
      }`}
    >
      {status === "RUNNING" ? (
        <>
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-400 rounded-full opacity-75 animate-ping"></div>
            <Play className="w-4 h-4 fill-current relative" />
          </div>
          <span className="text-sm font-medium">Live</span>
        </>
      ) : (
        <>
          <Pause className="w-4 h-4 fill-current" />
          <span className="text-sm font-medium">Idle</span>
        </>
      )}
    </div>
  );
};

const ResponseCard: React.FC<ResponseCardProps> = ({
  channelId,
  channelName,
  status,
}) => {
  return (
    <div className="group relative bg-white h-80 shadow-sm rounded-xl p-6 max-w-md w-full border border-gray-100 hover:border-blue-100 hover:shadow-lg transition-all duration-300 ease-in-out overflow-hidden">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Card content */}
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="font-bold text-gray-900 text-lg tracking-tight line-clamp-1">
              {channelName || "Untitled Channel"}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Channel ID: {channelId || "N/A"}
            </p>
          </div>
          <button className="text-gray-400 hover:text-gray-600 p-1 -mr-1 transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        {/* Status badge */}
        <div className="mt-2 mb-6">
          <StatusIndicator status={status || "IDLE"} />
        </div>

        {/* Stats/metrics placeholder */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-gray-50 rounded-lg p-2 text-center">
            <p className="text-xs text-gray-500">Views</p>
            <p className="font-semibold text-gray-900">1.2K</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-2 text-center">
            <p className="text-xs text-gray-500">Engagement</p>
            <p className="font-semibold text-gray-900">78%</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-2 text-center">
            <p className="text-xs text-gray-500">Uptime</p>
            <p className="font-semibold text-gray-900">99.8%</p>
          </div>
        </div>

        {/* Action button */}
        <div className="mt-auto">
          <button className="w-full flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-300 group/button">
            <span>View Analytics</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/button:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Hover effect */}
      <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-200/50 group-hover:ring-blue-200 transition-all duration-300 pointer-events-none"></div>
    </div>
  );
};

export default ResponseCard;
