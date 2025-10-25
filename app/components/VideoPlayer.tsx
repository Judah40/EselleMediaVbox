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
import { handleGetSinglePost } from "../api/PostApi/api";
import { PostVideoData } from "../pages/Dashboard/Videos/videos.types";

type videoPlayerType = {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
  sidebarOpen: boolean;
  activeCategory: string;
  videoId: string;
};

// Dummy video suggestions
const suggestedVideos = [
  {
    id: 1,
    title: "Advanced React Patterns You Must Know in 2025",
    channel: "Tech Mastery",
    views: "125K",
    time: "2 weeks ago",
    thumbnail: "🎯",
    duration: "15:24",
  },
  {
    id: 2,
    title: "Building Scalable Applications with Next.js",
    channel: "Code Academy",
    views: "89K",
    time: "1 month ago",
    thumbnail: "🚀",
    duration: "22:15",
  },
  {
    id: 3,
    title: "Modern CSS Techniques That Will Blow Your Mind",
    channel: "Design Pro",
    views: "234K",
    time: "3 days ago",
    thumbnail: "🎨",
    duration: "18:45",
  },
  {
    id: 4,
    title: "JavaScript Performance Optimization Tips",
    channel: "Dev Insights",
    views: "156K",
    time: "1 week ago",
    thumbnail: "⚡",
    duration: "12:30",
  },
  {
    id: 5,
    title: "TypeScript Best Practices for Large Projects",
    channel: "Code Masters",
    views: "198K",
    time: "2 weeks ago",
    thumbnail: "📘",
    duration: "25:18",
  },
  {
    id: 6,
    title: "Web Security Essentials Every Developer Needs",
    channel: "Security First",
    views: "267K",
    time: "5 days ago",
    thumbnail: "🔒",
    duration: "19:42",
  },
  {
    id: 7,
    title: "Docker and Kubernetes Crash Course",
    channel: "DevOps Hub",
    views: "312K",
    time: "1 month ago",
    thumbnail: "🐳",
    duration: "28:15",
  },
  {
    id: 8,
    title: "Database Design Patterns Explained",
    channel: "Data Science Pro",
    views: "178K",
    time: "2 days ago",
    thumbnail: "💾",
    duration: "16:50",
  },
];

// Dummy comments
const dummyComments = [
  {
    id: 1,
    user: "Sarah Wilson",
    avatar: "SW",
    time: "2 days ago",
    comment:
      "This is exactly what I was looking for! Great explanation of the concepts. The examples really helped me understand the implementation.",
    likes: 1200,
  },
  {
    id: 2,
    user: "Mike Chen",
    avatar: "MC",
    time: "1 week ago",
    comment:
      "Amazing content! Could you make a follow-up video covering the advanced use cases?",
    likes: 856,
  },
  {
    id: 3,
    user: "Emma Davis",
    avatar: "ED",
    time: "3 days ago",
    comment:
      "I've been struggling with this for weeks. Your tutorial made everything click! Thank you so much! 🙏",
    likes: 642,
  },
  {
    id: 4,
    user: "James Brown",
    avatar: "JB",
    time: "5 days ago",
    comment: "The production quality is top-notch. Keep up the great work!",
    likes: 421,
  },
  {
    id: 5,
    user: "Lisa Anderson",
    avatar: "LA",
    time: "1 day ago",
    comment:
      "Best tutorial on this topic I've found on YouTube. Clear, concise, and practical.",
    likes: 1580,
  },
];

const VideoPlayer: React.FC<videoPlayerType> = ({
  setSidebarOpen,
  setActiveCategory,
  sidebarOpen,
  activeCategory,
  videoId,
}) => {
  const [commentText, setCommentText] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [postData, setPostData] = useState<PostVideoData | null>(null);

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      setCommentText("");
      setShowCommentInput(false);
    }
  };

  const getVideoPost = async () => {
    const response = await handleGetSinglePost(videoId);
    // console.log(response.data.post);
    setPostData(response.data.post);
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

  // const formatDuration = (seconds: number) => {
  //   const mins = Math.floor(seconds / 60);
  //   const secs = seconds % 60;
  //   return `${mins}:${secs.toString().padStart(2, '0')}`;
  // };

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
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center flex-shrink-0 text-white font-semibold">
                        TM
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">
                          Tech Mastery
                        </h3>
                        <p className="text-gray-400 text-sm">
                          1.2M subscribers
                        </p>
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
                    <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-medium transition-colors whitespace-nowrap">
                      Subscribe
                    </button>
                  </div>
                </div>

                {/* Comments Section */}
                <div className="mt-6">
                  <div className="flex items-center gap-4 mb-6">
                    <h2 className="text-white text-xl font-semibold">
                      2,847 Comments
                    </h2>
                    <button className="text-gray-400 hover:text-white text-sm flex items-center gap-1">
                      <span>Sort by</span>
                    </button>
                  </div>

                  {/* Add Comment */}
                  <div className="flex gap-3 mb-8">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center flex-shrink-0 text-white font-semibold">
                      YU
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        onFocus={() => setShowCommentInput(true)}
                        placeholder="Add a comment..."
                        className="w-full bg-transparent text-white border-b border-gray-700 focus:border-gray-500 pb-2 focus:outline-none placeholder-gray-500"
                      />
                      {showCommentInput && (
                        <div className="flex items-center justify-end gap-2 mt-3">
                          <button
                            onClick={() => {
                              setShowCommentInput(false);
                              setCommentText("");
                            }}
                            className="px-4 py-2 text-gray-400 hover:text-white rounded-full transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleCommentSubmit}
                            disabled={!commentText.trim()}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:text-gray-500 text-white rounded-full transition-colors"
                          >
                            Comment
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Comments List */}
                  <div className="space-y-6">
                    {dummyComments.map((comment) => (
                      <div key={comment.id} className="flex gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center flex-shrink-0 text-white text-sm font-semibold">
                          {comment.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-white font-medium text-sm">
                              {comment.user}
                            </span>
                            <span className="text-gray-500 text-xs">
                              {comment.time}
                            </span>
                          </div>
                          <p className="text-gray-200 text-sm mt-1">
                            {comment.comment}
                          </p>
                          <div className="flex items-center gap-4 mt-2">
                            <button className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors">
                              <ThumbsUp className="w-4 h-4" />
                              <span className="text-xs">{comment.likes}</span>
                            </button>
                            <button className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors">
                              <ThumbsDown className="w-4 h-4" />
                            </button>
                            <button className="text-gray-400 hover:text-white text-xs font-medium">
                              Reply
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
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
                    <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg flex items-center justify-center">
                      <span className="text-3xl">{video.thumbnail}</span>
                    </div>
                    <div className="absolute bottom-1 right-1 bg-black bg-opacity-90 text-white text-xs px-1.5 py-0.5 rounded">
                      {video.duration}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white text-sm font-medium line-clamp-2 group-hover:text-gray-300">
                      {video.title}
                    </h3>
                    <p className="text-gray-400 text-xs mt-1">
                      {video.channel}
                    </p>
                    <div className="flex items-center gap-1 text-gray-500 text-xs mt-0.5">
                      <span>{video.views} views</span>
                      <span>•</span>
                      <span>{video.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default VideoPlayer;
