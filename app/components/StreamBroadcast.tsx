import {
  Call,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";
import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import Sidebar from "./SideBar";
import Header from "./Header";
import { Send, Clock, Eye, ThumbsUp } from "lucide-react";

type broadCastType = {
  client: StreamVideoClient;
  call: Call;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
  sidebarOpen: boolean;
  activeCategory: string;
};

// Dummy chat data
const dummyChats = [
  {
    id: 1,
    user: "Sarah Wilson",
    message: "This stream is amazing! 🔥",
    time: "2m ago",
    avatar: "SW",
  },
  {
    id: 2,
    user: "Mike Chen",
    message: "Great content as always!",
    time: "3m ago",
    avatar: "MC",
  },
  {
    id: 3,
    user: "Emma Davis",
    message: "Can you explain that last part again?",
    time: "5m ago",
    avatar: "ED",
  },
  {
    id: 4,
    user: "James Brown",
    message: "Loving the energy today!",
    time: "7m ago",
    avatar: "JB",
  },
  {
    id: 5,
    user: "Lisa Anderson",
    message: "Thanks for the tips!",
    time: "8m ago",
    avatar: "LA",
  },
  {
    id: 6,
    user: "Alex Kim",
    message: "This is exactly what I needed 💯",
    time: "10m ago",
    avatar: "AK",
  },
  {
    id: 7,
    user: "Rachel Green",
    message: "Amazing stream!",
    time: "12m ago",
    avatar: "RG",
  },
  {
    id: 8,
    user: "Tom Harris",
    message: "Keep it up! 👏",
    time: "15m ago",
    avatar: "TH",
  },
];

// Dummy video recommendations
const dummyVideos = [
  {
    id: 1,
    title: "Advanced React Patterns for 2025",
    channel: "Tech Mastery",
    views: "125K",
    thumbnail: "🎯",
    duration: "15:24",
  },
  {
    id: 2,
    title: "Building Scalable Applications",
    channel: "Code Academy",
    views: "89K",
    thumbnail: "🚀",
    duration: "22:15",
  },
  {
    id: 3,
    title: "Modern CSS Techniques",
    channel: "Design Pro",
    views: "234K",
    thumbnail: "🎨",
    duration: "18:45",
  },
  {
    id: 4,
    title: "JavaScript Performance Tips",
    channel: "Dev Insights",
    views: "156K",
    thumbnail: "⚡",
    duration: "12:30",
  },
  {
    id: 5,
    title: "TypeScript Best Practices",
    channel: "Code Masters",
    views: "198K",
    thumbnail: "📘",
    duration: "25:18",
  },
  {
    id: 6,
    title: "Web Security Essentials",
    channel: "Security First",
    views: "267K",
    thumbnail: "🔒",
    duration: "19:42",
  },
];

const StreamBroadcast: React.FC<broadCastType> = ({
  client,
  call,
  setSidebarOpen,
  setActiveCategory,
  sidebarOpen,
  activeCategory,
}) => {
  const [streamUrl, setStreamUrl] = useState<string | null>(null);
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [chatMessage, setChatMessage] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const joinCallAsViewer = async () => {
      try {
        setIsLoading(true);
        await call.join({ create: false });
      } catch (error) {
        console.error("Error joining call as viewer:", error);
      } finally {
        setIsLoading(false);
      }
    };

    joinCallAsViewer();

    const subscription = call.state.egress$.subscribe((egress) => {
      if (egress?.hls?.playlist_url) {
        setStreamUrl(egress.hls.playlist_url);
        setIsBroadcasting(true);
      } else {
        setIsBroadcasting(false);
      }
    });

    return () => {
      subscription.unsubscribe();
      call.leave().catch(console.error);
    };
  }, [call]);

  useEffect(() => {
    if (!streamUrl || !videoRef.current) return;

    const video = videoRef.current;

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 90,
      });

      hls.loadSource(streamUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch((err) => {
          console.error("Error playing video:", err);
        });
      });

      hls.on(Hls.Events.LEVEL_LOADED, (event, data) => {
        console.error("HLS level loaded:", data);
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error("HLS error:", data);
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError();
              break;
            default:
              console.error("Fatal HLS error");
              hls.destroy();
              break;
          }
        }
      });

      hlsRef.current = hls;

      return () => {
        if (hlsRef.current) {
          hlsRef.current.destroy();
          hlsRef.current = null;
        }
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = streamUrl;
      video.addEventListener("loadedmetadata", () => {
        video.play().catch((err) => {
          console.error("Error playing video:", err);
        });
      });
    } else {
      console.error("HLS not supported in this browser");
    }
  }, [streamUrl]);

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      setChatMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <div className="min-h-screen bg-black">
          <Header
            onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
            isMenuOpen={sidebarOpen}
          />

          <Sidebar
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          {/* Main content with padding to account for fixed sidebar */}
          <main className="pt-16 lg:pt-20 lg:pl-72 transition-all duration-300">
            <div className="flex flex-col lg:flex-row gap-4 p-4 max-w-[2000px] mx-auto">
              {/* Main Content Area */}
              <div className="flex-1 flex flex-col lg:flex-row gap-4">
                {/* Video Player Section */}
                <div className="flex-1">
                  <div className="bg-gray-900 rounded-xl overflow-hidden">
                    {/* Loading State with Spinner */}
                    {isLoading && (
                      <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center">
                        <div className="flex flex-col items-center gap-4">
                          <div className="relative w-20 h-20">
                            <div className="absolute inset-0 border-4 border-gray-700 rounded-full"></div>
                            <div className="absolute inset-0 border-4 bg-[#1ABC9C] rounded-full border-t-transparent animate-spin"></div>
                          </div>
                          <div className="text-white text-lg font-medium">
                            Connecting to stream...
                          </div>
                          <div className="text-gray-400 text-sm">
                            Please wait
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Waiting State */}
                    {!isLoading && !isBroadcasting && (
                      <div className="relative w-full aspect-video bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
                        <div className="flex flex-col items-center gap-4 text-center px-4">
                          <div className="relative">
                            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center">
                              <Clock className="w-12 h-12 text-gray-500" />
                            </div>
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#1ABC9C] rounded-full flex items-center justify-center">
                              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                            </div>
                          </div>
                          <div className="text-white text-xl font-semibold">
                            Stream Starting Soon
                          </div>
                          <div className="text-gray-400 text-sm max-w-md">
                            The broadcast will begin shortly. Stay tuned!
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Live Stream */}
                    {isBroadcasting && streamUrl && (
                      <div className="relative">
                        <video
                          ref={videoRef}
                          controls
                          className="w-full aspect-video bg-black"
                          playsInline
                          muted={false}
                          autoPlay
                        >
                          Your browser does not support the video tag.
                        </video>
                        <div className="absolute top-4 left-4 px-3 py-1.5 bg-[#1ABC9C] text-white text-sm font-semibold rounded-md flex items-center gap-2 shadow-lg">
                          <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                          LIVE
                        </div>
                      </div>
                    )}

                    {/* Video Info */}
                    <div className="p-4 space-y-3">
                      <h1 className="text-white text-xl font-semibold">
                        Live Broadcast - Amazing Content Stream
                      </h1>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>2,847 watching</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="w-4 h-4" />
                          <span>1.2K likes</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Related Videos Section */}
                  <div className="mt-6">
                    <h2 className="text-white text-lg font-semibold mb-4 px-1">
                      Up Next
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {dummyVideos.map((video) => (
                        <div
                          key={video.id}
                          className="bg-gray-900 rounded-lg overflow-hidden cursor-pointer hover:bg-gray-800 transition-colors group"
                        >
                          <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center">
                            <span className="text-5xl">{video.thumbnail}</span>
                            <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-0.5 rounded">
                              {video.duration}
                            </div>
                          </div>
                          <div className="p-3">
                            <h3 className="text-white text-sm font-medium line-clamp-2 group-hover:text-gray-300">
                              {video.title}
                            </h3>
                            <p className="text-gray-400 text-xs mt-1">
                              {video.channel}
                            </p>
                            <p className="text-gray-500 text-xs mt-0.5">
                              {video.views} views
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Live Chat Section */}
                <div className="lg:w-96 flex flex-col bg-gray-900 rounded-xl overflow-hidden h-[600px] lg:h-auto lg:min-h-[600px]">
                  <div className="bg-gray-800 px-4 py-3 border-b border-gray-700">
                    <h2 className="text-white font-semibold">Live Chat</h2>
                    <p className="text-gray-400 text-xs mt-0.5">
                      2,847 participants
                    </p>
                  </div>

                  {/* Chat Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                    {dummyChats.map((chat) => (
                      <div
                        key={chat.id}
                        className="flex gap-3 hover:bg-gray-800 p-2 rounded-lg transition-colors"
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1ABC9C] to-[#087e66] flex items-center justify-center flex-shrink-0 text-white text-xs font-semibold">
                          {chat.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-2">
                            <span className="text-gray-300 text-sm font-medium truncate">
                              {chat.user}
                            </span>
                            <span className="text-gray-500 text-xs whitespace-nowrap">
                              {chat.time}
                            </span>
                          </div>
                          <p className="text-gray-100 text-sm mt-0.5 break-words">
                            {chat.message}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Chat Input */}
                  <div className="p-4 border-t border-gray-700 bg-gray-800">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Say something..."
                        className="flex-1 bg-gray-900 text-white px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#087e66] text-sm placeholder-gray-500"
                      />
                      <button
                        onClick={handleSendMessage}
                        className="bg-[#1ABC9C] hover:bg-[#087e66] text-white p-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!chatMessage.trim()}
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </StreamCall>
    </StreamVideo>
  );
};

export default StreamBroadcast;
