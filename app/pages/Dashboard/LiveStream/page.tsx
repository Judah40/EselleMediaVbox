"use client";

import React, { useEffect, useState } from "react";
import { Radio, Search, Plus, X } from "lucide-react";
import { handleGetAllLiveStreams } from "@/app/api/LiveApi/api";
import { ResponseCardProps } from "./live.types";
import { motion, AnimatePresence } from "framer-motion";
import LiveModal from "../(component)/Modals/LiveModal";
import { useRouter } from "next/navigation";

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [liveStreams, setLiveStreams] = useState<ResponseCardProps[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    handleGetAllLiveStreams()
      .then((values) => {
        setLiveStreams(values.data.data);
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const filteredStreams = liveStreams?.filter((stream) =>
    stream.channelName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen overflow-y-scroll bg-gradient-to-br from-gray-900 to-black w-full">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-lg bg-black/70 border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative flex-1 max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search channels and streams..."
              className="bg-gray-800/50 w-full pl-10 pr-4 py-3 rounded-xl border border-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none text-gray-100"
            />
          </div>

          {/* Go Live Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-500 px-5 py-3 rounded-xl font-medium shadow-lg shadow-purple-900/20 hover:shadow-purple-600/30 transition-all"
          >
            <Radio className="h-5 w-5" />
            <span>Create Channel</span>
          </motion.button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8">
        {/* Section Title */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
            Live Channels
          </h2>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              {filteredStreams?.length || 0} Channel
            </span>
          </div>
        </div>

        {/* Stream Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <StreamCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredStreams?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {filteredStreams.map((stream, index) => (
              <StreamCard
                key={index}
                channelId={stream.channelId}
                channelName={stream.channelName}
                status={stream.status}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <div className="w-16 h-16 mb-4 rounded-full bg-gray-800 flex items-center justify-center">
              <Radio className="h-8 w-8 text-gray-600" />
            </div>
            <h3 className="text-xl font-medium text-gray-300 mb-2">
              No streams found
            </h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your search or go live yourself
            </p>
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Create Channel</span>
            </button>
          </div>
        )}
      </main>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-800">
                <h3 className="text-xl font-bold">Go Live</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-1 hover:bg-gray-800 transition-colors"
                >
                  <X className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
                </button>
              </div>
              <div className="p-6">
                <LiveModal
                //  onClose={() => setIsOpen(false)} 
                 />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Stream Card Component
const StreamCard = ({
  channelName,
  status,
  channelId,
  // viewerCount,
}: ResponseCardProps) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/pages/Dashboard/LiveStream/Livedata/${channelName}`);
  };
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      onClick={handleClick}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all shadow-lg hover:shadow-purple-900/20"
    >
      <div className="relative aspect-video">
        <img
          src={"/backgrounds/streamPic.jpg"}
          alt={channelName}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1">
          <span
            className={`h-2 w-2 rounded-full ${
              status === "RUNNING" ? "bg-green-500" : "bg-red-500"
            } animate-pulse`}
          ></span>
          {status === "RUNNING" ? "Live" : "Idle"}
        </div>
        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-lg text-xs">
          { 0} viewers
        </div>
      </div>
      <div className="p-4">
        <div className="flex gap-3">
          <div className="h-10 w-10 rounded-full bg-gray-700 overflow-hidden">
            <img
              src={"/logo/vbox.png"}
              alt={channelName}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-100 truncate">{channelName}</h3>
            <p className="text-gray-400 text-sm mt-1">{channelId}</p>
          </div>
        </div>
        {/* <div className="mt-3 flex flex-wrap gap-2">
          {stream.tags?.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div> */}
      </div>
    </motion.div>
  );
};

// Loading Skeleton
const StreamCardSkeleton = () => {
  return (
    <div className="bg-gray-800/30 rounded-xl overflow-hidden border border-gray-800/50 animate-pulse">
      <div className="aspect-video bg-gray-700/30"></div>
      <div className="p-4">
        <div className="flex gap-3">
          <div className="h-10 w-10 rounded-full bg-gray-700/50"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-700/50 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-700/50 rounded w-1/2"></div>
          </div>
        </div>
        <div className="mt-3 flex gap-2">
          <div className="h-6 w-16 bg-gray-700/50 rounded"></div>
          <div className="h-6 w-12 bg-gray-700/50 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default Page;
