import React, { useEffect, useState } from "react";
import Sidebar from "./SideBar";
import Header from "./Header";
import {
  ThumbsUp,
  ThumbsDown,
  Share2,
  Flag,
  Eye,
  Calendar,
} from "lucide-react";
import { handleGetPostByGenre, handleGetSinglePost } from "../api/PostApi/api";
import { PostVideoData } from "../pages/Dashboard/Videos/videos.types";
import { StreamChat, Channel as StreamChannel } from "stream-chat";
import {
  Chat,
  Channel,
  // ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  Window,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";

type videoPlayerType = {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
  sidebarOpen: boolean;
  activeCategory: string;
  videoId: string;
  chatClient: StreamChat;
};

const VideoPlayer: React.FC<videoPlayerType> = ({
  setSidebarOpen,
  setActiveCategory,
  sidebarOpen,
  activeCategory,
  videoId,
  chatClient,
}) => {
  const [postData, setPostData] = useState<PostVideoData | null>(null);
  const [channel, setChannel] = useState<StreamChannel | null>(null);
  const [suggestedVideos, setSuggestedVideos] = useState<PostVideoData[]>([]);
  // Initialize channel
  useEffect(() => {
    const initializeChannel = async () => {
      try {
        // Create or get channel using videoId
        const videoChannel = chatClient.channel(
          "livestream",
          `video-${videoId}`
        );

        // Watch the channel
        await videoChannel.watch();
        setChannel(videoChannel);
      } catch (error) {
        console.error("Error initializing channel:", error);
      }
    };

    if (chatClient && videoId) {
      initializeChannel();
    }

    // Cleanup
    return () => {
      if (channel) {
        channel.stopWatching();
      }
    };
  }, [chatClient, videoId, postData?.thumbnailUrl]);

  const getVideoPost = async () => {
    const response = await handleGetSinglePost(videoId);
    setPostData(response.data.post);
    getSimilarVidoes(response.data.post.genre);
  };
  const getSimilarVidoes = async (genre: string) => {
    const response = await handleGetPostByGenre(genre);
    setSuggestedVideos(response.post);
    // return response.post;
  };
  useEffect(() => {
    getVideoPost();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-black">
      <Header
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        isMenuOpen={sidebarOpen}
      />

      <div className="flex">
        <Sidebar
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="pt-16 lg:pt-20 lg:pl-72 transition-all duration-300">
          <div className="flex flex-col lg:flex-row gap-6 p-4 max-w-[2000px] mx-auto">
            {/* Main Video Content */}
            <div className="flex-1 max-w-[1280px]">
              {/* Video Player */}
              <div className="bg-black rounded-xl overflow-hidden">
                {postData ? (
                  <video
                    src={postData.videoUrl}
                    controls
                    className="w-full aspect-video bg-black"
                    poster={postData.thumbnailUrl}
                  />
                ) : (
                  <div className="relative w-full aspect-video bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
                    <div className="text-6xl">🎬</div>
                  </div>
                )}
              </div>

              {/* Video Info */}
              <div className="mt-4 space-y-4">
                <h1 className="text-white text-xl lg:text-2xl font-semibold">
                  {postData?.title ||
                    "Complete Guide to Building Modern Web Applications"}
                </h1>

                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{postData?.likeCount || 0} views</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {postData
                          ? formatDate(postData.createdAt)
                          : "Jan 15, 2025"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full transition-colors">
                      <ThumbsUp className="w-5 h-5" />
                      <span className="font-medium">
                        {postData?.likeCount || 0}
                      </span>
                    </button>
                    <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full transition-colors">
                      <ThumbsDown className="w-5 h-5" />
                    </button>
                    <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full transition-colors">
                      <Share2 className="w-5 h-5" />
                      <span className="hidden sm:inline">Share</span>
                    </button>
                    <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full transition-colors">
                      <Flag className="w-5 h-5" />
                      <span className="hidden sm:inline">Report</span>
                    </button>
                  </div>
                </div>

                {/* Channel Info */}
                <div className="bg-gray-900 rounded-xl p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div>
                        <p className="text-gray-300 text-sm mt-2">
                          {postData?.description ||
                            "In this comprehensive tutorial, we'll explore modern web development techniques and best practices. Learn how to build scalable, performant applications from scratch."}
                        </p>
                        {postData?.genre && postData.genre.length > 0 && (
                          <div className="flex gap-2 mt-2">
                            {postData.genre.map((g: string, idx: number) => (
                              <span
                                key={idx}
                                className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded"
                              >
                                {g}
                              </span>
                            ))}
                          </div>
                        )}
                        {postData?.location && (
                          <p className="text-gray-400 text-xs mt-2">
                            📍 {postData.location}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comments Section with Stream Chat React */}
                <div className="mt-6">
                  <h2 className="text-white text-xl font-semibold mb-4">
                    Comments
                  </h2>

                  {channel ? (
                    <div className="stream-chat-custom-wrapper">
                      <Chat client={chatClient} theme="str-chat__theme-dark">
                        <Channel channel={channel}>
                          <Window>
                            <MessageList />
                            <MessageInput focus />
                          </Window>
                          <Thread />
                        </Channel>
                      </Chat>
                    </div>
                  ) : (
                    <div className="text-center text-gray-400 py-8">
                      Loading comments...
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Suggested Videos Sidebar */}
            <div className="lg:w-96 space-y-2">
              {suggestedVideos.map((video) => (
                <div
                  key={video.id}
                  className="flex gap-2 p-2 rounded-lg hover:bg-gray-900 cursor-pointer transition-colors group"
                >
                  <div className="relative w-40 flex-shrink-0">
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="aspect-video bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg object-cover w-full h-full"
                    />
                    <div className="absolute bottom-1 right-1 bg-black bg-opacity-90 text-white text-xs px-1.5 py-0.5 rounded">
                      {video.duration}min
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white text-sm font-medium line-clamp-2 group-hover:text-gray-300">
                      {video.title}
                    </h3>
                    <p className="text-gray-400 text-xs mt-1">{video.genre}</p>
                    <div className="flex items-center gap-1 text-gray-500 text-xs mt-0.5">
                      <span>{video.views || 0} views</span>
                      <span>•</span>
                      <span>{formatDate(video.updatedAt)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      <style>{`
        .stream-chat-custom-wrapper {
          background: #1a1a1a;
          border-radius: 12px;
          overflow: hidden;
          min-height: 500px;
        }
        
        .str-chat__channel {
          background: #1a1a1a;
        }
        
        .str-chat__list {
          background: #1a1a1a;
          padding: 20px;
        }
        
        .str-chat__message-simple {
          background: transparent;
        }
        
        .str-chat__message-simple-text-inner {
          background: #2d2d2d;
          color: #e5e5e5;
          border-radius: 12px;
          padding: 10px 14px;
        }
        
        .str-chat__input-flat {
          background: #2d2d2d;
          border: 1px solid #3d3d3d;
          border-radius: 24px;
          margin: 0 20px 20px 20px;
        }
        
        .str-chat__input-flat-wrapper {
          background: transparent;
        }
        
        .str-chat__textarea textarea {
          color: #e5e5e5;
          background: transparent;
        }
        
        .str-chat__textarea textarea::placeholder {
          color: #888;
        }
        
        .str-chat__message-simple__actions__action--reactions {
          background: #2d2d2d;
        }
        
        .str-chat__message-simple-name {
          color: #fff;
          font-weight: 600;
        }
        
        .str-chat__message-simple-timestamp {
          color: #888;
        }
        
        .str-chat__avatar {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .str-chat__send-button {
          background: #3b82f6;
        }
        
        .str-chat__send-button:hover {
          background: #2563eb;
        }
        
        /* Hide header if you don't want it */
        .str-chat__header-livestream {
          display: none;
        }
        
        /* Scrollbar styling */
        .str-chat__list::-webkit-scrollbar {
          width: 8px;
        }
        
        .str-chat__list::-webkit-scrollbar-track {
          background: #1a1a1a;
        }
        
        .str-chat__list::-webkit-scrollbar-thumb {
          background: #3d3d3d;
          border-radius: 4px;
        }
        
        .str-chat__list::-webkit-scrollbar-thumb:hover {
          background: #4d4d4d;
        }
      `}</style>
    </div>
  );
};

export default VideoPlayer;
