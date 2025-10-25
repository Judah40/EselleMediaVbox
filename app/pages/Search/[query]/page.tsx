"use client";

import React, { useEffect, useState } from "react";

import { Eye, MapPin } from "lucide-react";
import { handleGetAllPosts } from "@/app/api/PostApi/api";
import Header from "@/app/components/Header";
import Sidebar from "@/app/components/SideBar";
import Link from "next/link";

interface ChannelPageProps {
  params: {
    query: string;
  };
}

interface PostVideoData {
  id: number;
  postId: string;
  description: string;
  thumbnailUrl: string;
  duration: number;
  rating: string | null;
  bannerUrl: string;
  title: string;
  likeCount: number;
  genre: string[];
  location: string;
  isPartOfMyList: boolean;
  createdAt?: string;
}

const useVideos = () => {
  const [state, setState] = useState<{
    videos: PostVideoData[];
    filteredVideos: PostVideoData[];
    loading: boolean;
    error: string | null;
  }>({
    videos: [],
    filteredVideos: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    let mounted = true;

    const fetchVideos = async () => {
      try {
        const values = await handleGetAllPosts();
        if (mounted) {
          setState((prev) => ({
            ...prev,
            videos: values.posts || [],
            filteredVideos: values.posts || [],
            loading: false,
          }));
        }
      } catch (error) {
        console.error(error);
        if (mounted) {
          setState((prev) => ({
            ...prev,
            loading: false,
            error: "Failed to fetch videos",
          }));
        }
      }
    };

    fetchVideos();

    return () => {
      mounted = false;
    };
  }, []);

  return state;
};

const Search = ({ params }: ChannelPageProps) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>("home");
  const { videos, error, loading } = useVideos();
  const [searchResults, setSearchResults] = useState<PostVideoData[]>([]);

  useEffect(() => {
    if (videos.length > 0 && params.query) {
      const query = decodeURIComponent(params.query).toLowerCase();
      const filtered = videos.filter((video) =>
        video.title.toLowerCase().includes(query)
      );
      setSearchResults(filtered);
    } else {
      setSearchResults(videos);
    }
  }, [videos, params.query]);

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    }
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const formatViews = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const getTimeAgo = (dateString?: string) => {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  };

  return (
    <div className="min-h-screen bg-black">
      <Header
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        isMenuOpen={sidebarOpen}
      />
      <div className="flex pt-16">
        <Sidebar
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 min-h-screen transition-all duration-300 lg:pl-72 overflow-x-hidden">
          <div className="max-w-[1600px] mx-auto px-4 py-6">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 border-4 border-gray-700 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-red-600 rounded-full border-t-transparent animate-spin"></div>
                </div>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="text-red-500 text-xl mb-2">⚠️ Error</div>
                <div className="text-gray-400">{error}</div>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h2 className="text-white text-2xl font-semibold mb-2">
                  No results found
                </h2>
                <p className="text-gray-400">
                  Try different keywords or remove search filters
                </p>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <p className="text-gray-400 text-sm">
                    About {searchResults.length} result
                    {searchResults.length !== 1 ? "s" : ""}
                  </p>
                </div>

                <div className="space-y-4">
                  {searchResults.map((video) => (
                    <Link
                      href={`/pages/Player/${video.postId}`}
                      key={video.id}
                      className="flex flex-col sm:flex-row gap-4 p-2 rounded-lg hover:bg-gray-900 transition-colors cursor-pointer group"
                    >
                      {/* Thumbnail */}
                      <div className="relative sm:w-96 w-full flex-shrink-0">
                        <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-800">
                          <img
                            src={video.thumbnailUrl}
                            alt={video.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                          />
                          <div className="absolute bottom-2 right-2 bg-black bg-opacity-90 text-white text-xs px-2 py-1 rounded font-semibold">
                            {formatDuration(video.duration)}
                          </div>
                        </div>
                      </div>

                      {/* Video Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white text-lg font-medium line-clamp-2 group-hover:text-gray-300 mb-1">
                          {video.title}
                        </h3>

                        <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{formatViews(video.likeCount)} views</span>
                          </div>
                          <span>•</span>
                          <span>{getTimeAgo(video.createdAt)}</span>
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs font-semibold">
                              {video.title.substring(0, 2).toUpperCase()}
                            </span>
                          </div>
                          <span className="text-gray-400 text-sm">
                            Channel Name
                          </span>
                        </div>

                        <p className="text-gray-400 text-sm line-clamp-2 mb-2">
                          {video.description}
                        </p>

                        <div className="flex items-center gap-3 flex-wrap">
                          {video.genre && video.genre.length > 0 && (
                            <div className="flex gap-2">
                              {video.genre.map((g, idx) => (
                                <span
                                  key={idx}
                                  className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-full"
                                >
                                  {g}
                                </span>
                              ))}
                            </div>
                          )}
                          {video.location && (
                            <div className="flex items-center gap-1 text-gray-500 text-xs">
                              <MapPin className="w-3 h-3" />
                              <span>{video.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Search;
