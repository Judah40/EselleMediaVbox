"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  CircleX,
  HardDriveUpload,
  Search,
  Filter,
  X,
  PlayCircle,
  Calendar,
  Tags,
  MoreVertical,
} from "lucide-react";
import Link from "next/link";
import VideoForm from "../(component)/Forms/videoForm/videoForm";
import { handleGetAllPosts } from "@/app/api/PostApi/api";
import { PostVideoData } from "./videos.types";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [videosPosted, setVideosPosted] = useState<PostVideoData[]>([]);
  const [isVideoLoading, setIsVideoLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredVideos, setFilteredVideos] = useState<PostVideoData[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<PostVideoData | null>(
    null
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<{
    genre: string;
    uploadDate: Date | null;
  }>({
    genre: "",
    uploadDate: null,
  });
  const router = useRouter();
  // Fetch all videos
  useEffect(() => {
    handleGetAllPosts()
      .then((values) => {
        setVideosPosted(values.post);
        setFilteredVideos(values.post);
        setIsVideoLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching videos:", error);
        setIsVideoLoading(false);
      });
  }, []);

  // Advanced filtering logic
  const applyFilters = useCallback(() => {
    let result = videosPosted;

    if (searchTerm) {
      result = result.filter((video) =>
        video.caption.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.genre) {
      result = result.filter((video) =>
        JSON.parse(video.tags[0]).includes(filters.genre)
      );
    }

    if (filters.uploadDate) {
      result = result.filter(
        (video) =>
          new Date(video.createdAt).toDateString() ===
          (filters.uploadDate ? filters.uploadDate.toDateString() : "")
      );
    }

    setFilteredVideos(result);
  }, [videosPosted, searchTerm, filters]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const resetFilters = () => {
    setFilters({ genre: "", uploadDate: null });
    setSearchTerm("");
  };

  return (
    <div className=" bg-zinc-950 text-gray-100 p-6">
      {/* Upload Video Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 h-[900px]  overflow-y-scroll bg-black bg-opacity-60 flex justify-center"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-zinc-900 w-11/12  max-w-2xl rounded-2xl shadow-2xl border border-zinc-800"
            >
              <div className="flex justify-between  items-center p-6 border-b border-zinc-800">
                <h2 className="text-2xl font-bold">Upload Video</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-zinc-800 p-2 rounded-full transition-colors"
                >
                  <CircleX className="text-red-500" size={24} />
                </button>
              </div>
              <div className="">
                <VideoForm isComplete={setIsOpen} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Videos</h1>
          <p className="text-gray-400">
            Upload, manage, and explore your videos
          </p>
        </div>
        <button
          onClick={() => router.push("/pages/Dashboard/Videos/upload")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <HardDriveUpload />
          <span>Upload Video</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex space-x-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search videos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-900 rounded-lg border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
              <Search />
            </button>
          </div>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="bg-zinc-900 border border-zinc-800 px-4 py-3 rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <Filter />
          </button>
        </div>

        {/* Advanced Filters */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 bg-zinc-900 rounded-lg border border-zinc-800 p-6"
            >
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-gray-400 flex items-center">
                    <Tags className="mr-2" size={16} /> Genre
                  </label>
                  <select
                    value={filters.genre}
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, genre: e.target.value }))
                    }
                    className="w-full px-4 py-3 bg-zinc-800 rounded-lg border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Genre</option>
                    <option value="music">Music</option>
                    <option value="gaming">Gaming</option>
                    <option value="education">Education</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-gray-400 flex items-center">
                    <Calendar className="mr-2" size={16} /> Upload Date
                  </label>
                  <input
                    type="date"
                    value={
                      filters.uploadDate
                        ? filters.uploadDate.toISOString().split("T")[0]
                        : ""
                    }
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        uploadDate: new Date(e.target.value),
                      }))
                    }
                    className="w-full px-4 py-3 bg-zinc-800 rounded-lg border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={resetFilters}
                  className="bg-zinc-800 text-gray-400 px-6 py-3 rounded-lg hover:bg-zinc-700 transition-colors"
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Apply
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Video Grid */}
      <section>
        {isVideoLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="bg-zinc-900 animate-pulse rounded-2xl overflow-hidden"
              >
                <div className="h-48 bg-zinc-800"></div>
                <div className="p-4">
                  <div className="h-4 bg-zinc-800 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-zinc-800 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredVideos.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {filteredVideos.map((video) => (
                <motion.div
                  key={video.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="bg-zinc-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group"
                >
                  <div className="relative">
                    <img
                      src={video.bannerUrl}
                      alt={video.caption}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                      <PlayCircle
                        className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        size={48}
                      />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                      {video.caption}
                    </h3>
                    <div className="flex justify-between items-center">
                      <Link
                        href={`/pages/Dashboard/Videos/video/${video.id}`}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        View Details
                      </Link>
                      <button
                        onClick={() => setSelectedVideo(video)}
                        className="text-gray-400 hover:text-white"
                      >
                        <MoreVertical />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-12 bg-zinc-900 rounded-2xl">
            <p className="text-gray-500 text-xl">No videos found</p>
            <p className="text-gray-600 mt-2">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </section>

      {/* Video Quick View Modal */}
      {selectedVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="bg-zinc-900 w-11/12 max-w-md rounded-2xl shadow-2xl border border-zinc-800 overflow-hidden"
          >
            <div className="relative">
              <img
                src={selectedVideo.bannerUrl}
                alt={selectedVideo.caption}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-70"
              >
                <X className="text-white" />
              </button>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">
                {selectedVideo.caption}
              </h2>
              <div className="flex justify-between items-center mt-4">
                <Link
                  href={`/pages/Dashboard/Videos/video/${selectedVideo.id}`}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View Full Details
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Page;
