/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  MessageSquare,
  ThumbsUp,
  Share2,
  BookmarkPlus,
  ChevronRight,
  Users,
  Trophy,
  PieChart,
} from "lucide-react";
import HomeLayoutWrapper from "@/app/layouts/HomeLayoutWrapper";
import { useParams } from "next/navigation";
import {
  handleGetLiveStreamUrl,
  handleLiveMatch,
} from "@/app/api/AdminApi/usersApi/api";
import { Match } from "../../Dashboard/LiveStream/Livedata/[key]/key.types";
import Hls from "hls.js";

export default function EnhancedFootballStream() {
  // State management
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [comment, setComment] = useState("");
  const [matchTime, setMatchTime] = useState(67); // Match time in minutes
  const [selectedQuality, setSelectedQuality] = useState("Auto");
  const [showControls, setShowControls] = useState(true);
  const [likes, setLikes] = useState(2347);
  const [isLiked, setIsLiked] = useState(false);
  const [viewerCount, setViewerCount] = useState(24632);
  const [LiveMatch, setLiveMatch] = useState<Match>();
  const [url, setUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoIsPlaying, setVideoIsPlaying] = useState<boolean>(false);
  const { watch } = useParams();
  // Auto hide controls after inactivity

  // Video streaming setup
  useEffect(() => {
    if (videoRef.current && url) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        const video = videoRef.current;
        const hlsUrl = url;

        hls.loadSource(hlsUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play();
          setVideoIsPlaying(true);
        });

        return () => {
          hls.destroy();
        };
      } else if (
        videoRef.current.canPlayType("application/vnd.apple.mpegurl")
      ) {
        videoRef.current.src = url;
        videoRef.current.addEventListener("loadedmetadata", () => {
          if (videoRef.current) {
            videoRef.current.play();
            setVideoIsPlaying(true);
          }
        });
      }
    }
  }, [watch, url]);


  useEffect(() => {
    handleLiveMatch({
      channelName: watch.toString(),
      date: new Date(),
    })
      .then((response) => {
        setLiveMatch(response.data.data);
      })
      .catch(() => {});

    handleGetLiveStreamUrl(watch.toString())
      .then((response) => {

        setUrl(response.data.data.url);
      })
      .catch(() => {});
  }, []);
  

  // Simulate fluctuating viewer count
  useEffect(() => {
    const timer = setInterval(() => {
      setViewerCount((current) =>
        Math.floor(current + (Math.random() * 20 - 10))
      );
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Video player controls handlers
  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleMute = () => setIsMuted(!isMuted);
  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);
  const toggleLike = () => {
    setLikes(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
  };

  // Chat and comment handlers
  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (chatMessage.trim()) {
      // In a real app, would send to backend
      setChatMessage("");
    }
  };

  const handlePostComment = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (comment.trim()) {
      // In a real app, would send to backend
      setComment("");
    }
  };

  // Format match time nicely
  interface MatchTime {
    minutes: number;
    seconds: number;
  }

  const formatMatchTime = (time: number): string => {
    const minutes: number = Math.floor(time);
    const seconds: number = Math.floor((time - minutes) * 60);
    return `${minutes}'${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Format large numbers with commas
  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <HomeLayoutWrapper>
      <div className="min-h-screen pt-20 bg-gradient-to-br from-gray-950 to-gray-900 text-white font-sans">
        {/* Video Player Section */}
        <div
          className="relative bg-black rounded-b-xl overflow-hidden cursor-pointer"
          onMouseMove={() => setShowControls(true)}
          onClick={togglePlay}
        >
          {/* Video Element */}
          <video
            className="w-full aspect-video object-cover"
            autoPlay
            muted={isMuted}
            ref={videoRef}
          >
            <source src="/sample-stream.m3u8" type="application/x-mpegURL" />
          </video>

          {/* Match Info */}
          <div className="absolute top-0 left-0 w-full bg-gradient-to-b from-black/80 to-black/0 p-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Badge className="bg-red-600 text-white px-3 py-1 flex items-center gap-1 shadow-lg">
                <span className="animate-pulse h-2 w-2 bg-white rounded-full"></span>
                LIVE
              </Badge>
              <span className="text-xl font-bold">
                {LiveMatch && LiveMatch.HomeTeam} vs{" "}
                {LiveMatch && LiveMatch.AwayTeam}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Badge
                variant="outline"
                className="bg-black/40 border-gray-600 px-3"
              >
                <Users className="h-4 w-4 mr-1" /> {formatNumber(viewerCount)}
              </Badge>
              <Badge variant="outline" className="bg-black/40 border-gray-600">
                {formatMatchTime(matchTime)}
              </Badge>
            </div>
          </div>

          {/* Video Controls */}
          {showControls && (
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-black/0 p-4">
              {/* Progress bar */}
              <div className="relative w-full h-1 bg-gray-600 rounded-full mb-4 cursor-pointer">
                <div
                  className="absolute top-0 left-0 h-full bg-red-600 rounded-full"
                  style={{ width: `${(matchTime / 90) * 100}%` }}
                ></div>
                <div
                  className="absolute top-0 left-0 h-3 w-3 bg-white rounded-full -mt-1 shadow-md"
                  style={{ left: `${(matchTime / 90) * 100}%` }}
                ></div>
              </div>

              {/* Control buttons */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20"
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay();
                    }}
                  >
                    {isPlaying ? (
                      <Pause className="h-5 w-5" />
                    ) : (
                      <Play className="h-5 w-5" />
                    )}
                  </Button>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMute();
                      }}
                    >
                      {isMuted ? (
                        <VolumeX className="h-5 w-5" />
                      ) : (
                        <Volume2 className="h-5 w-5" />
                      )}
                    </Button>
                    <Slider
                      defaultValue={[volume]}
                      max={100}
                      step={1}
                      className="w-24"
                      onClick={(e) => e.stopPropagation()}
                      onValueChange={(val) => {
                        setVolume(val[0]);
                        if (val[0] === 0) setIsMuted(true);
                        else setIsMuted(false);
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex gap-1 px-2 py-1 bg-black/30 rounded-md text-sm">
                    <span className="font-semibold">HD</span>
                    <select
                      className="bg-transparent outline-none cursor-pointer"
                      value={selectedQuality}
                      onChange={(e) => setSelectedQuality(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <option value="Auto">Auto</option>
                      <option value="1080p">1080p</option>
                      <option value="720p">720p</option>
                      <option value="480p">480p</option>
                    </select>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFullscreen();
                    }}
                  >
                    <Maximize className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Settings className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Layout */}
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Match Info, Chat and Comments */}
          <div className="lg:col-span-2 space-y-6">
            {/* Match Info and Engagement */}
            <div className="bg-gray-800/60 backdrop-blur-sm p-5 rounded-xl shadow-lg">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">
                    {LiveMatch && LiveMatch.leagueName} :{" "}
                    {LiveMatch && LiveMatch.HomeTeam} vs{" "}
                    {LiveMatch && LiveMatch.AwayTeam}
                  </h1>
                  <p className="text-gray-300 mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                    <span className="flex items-center">🏟️ Old Trafford</span>
                    <span className="flex items-center">
                      📅 {new Date().toLocaleDateString()}
                    </span>
                    <span className="flex items-center">
                      <Trophy className="h-4 w-4 mr-1" />{" "}
                      {LiveMatch && LiveMatch.leagueName}
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className={`flex items-center gap-1 ${
                      isLiked
                        ? "bg-blue-600/20 border-blue-500 text-blue-400"
                        : "bg-gray-700/40 border-gray-600"
                    }`}
                    onClick={toggleLike}
                  >
                    <ThumbsUp
                      className="h-4 w-4"
                      fill={isLiked ? "currentColor" : "none"}
                    />
                    {formatNumber(likes)}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-gray-700/40 border-gray-600 flex items-center gap-1"
                  >
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-gray-700/40 border-gray-600"
                  >
                    <BookmarkPlus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Tabs Section */}
            <Tabs defaultValue="chat" className="w-full">
              <TabsList className="bg-gray-800/60 backdrop-blur-sm rounded-lg w-full justify-start gap-1 p-1">
                <TabsTrigger
                  value="chat"
                  className="rounded-md data-[state=active]:bg-gray-700"
                >
                  <MessageSquare className="h-4 w-4 mr-2" /> Live Chat
                </TabsTrigger>
                <TabsTrigger
                  value="comments"
                  className="rounded-md data-[state=active]:bg-gray-700"
                >
                  <MessageSquare className="h-4 w-4 mr-2" /> Comments
                </TabsTrigger>
                <TabsTrigger
                  value="highlights"
                  className="rounded-md data-[state=active]:bg-gray-700"
                >
                  <Play className="h-4 w-4 mr-2" /> Highlights
                </TabsTrigger>
              </TabsList>

              {/* Chat Section */}
              <TabsContent value="chat" className="mt-4">
                <Card className="bg-gray-800/60 backdrop-blur-sm border-gray-700 rounded-xl shadow-lg">
                  <CardContent className="p-4">
                    <div className="h-64 overflow-y-auto space-y-3 mb-4 custom-scrollbar">
                      <div className="flex items-start gap-2">
                        <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold">
                          A
                        </div>
                        <div className="bg-gray-700/50 rounded-lg p-2 flex-1">
                          <p className="text-sm font-medium text-blue-400">
                            Alice
                          </p>
                          <p className="text-sm">
                            Let&apos;s go United! What a match so far!
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center text-sm font-bold">
                          B
                        </div>
                        <div className="bg-gray-700/50 rounded-lg p-2 flex-1">
                          <p className="text-sm font-medium text-green-400">
                            Bob
                          </p>
                          <p className="text-sm">
                            That goal from Rashford was absolutely world class!
                            🔥
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center text-sm font-bold">
                          M
                        </div>
                        <div className="bg-gray-700/50 rounded-lg p-2 flex-1">
                          <p className="text-sm font-medium text-purple-400">
                            Mia
                          </p>
                          <p className="text-sm">
                            Chelsea need to step up their defense, they&apos;re
                            getting dominated on the wings
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="h-8 w-8 rounded-full bg-yellow-600 flex items-center justify-center text-sm font-bold">
                          J
                        </div>
                        <div className="bg-gray-700/50 rounded-lg p-2 flex-1">
                          <p className="text-sm font-medium text-yellow-400">
                            Jack
                          </p>
                          <p className="text-sm">
                            Do you think they&apos;ll bring on Sancho soon?
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="h-8 w-8 rounded-full bg-red-600 flex items-center justify-center text-sm font-bold">
                          S
                        </div>
                        <div className="bg-gray-700/50 rounded-lg p-2 flex-1">
                          <p className="text-sm font-medium text-red-400">
                            Sarah
                          </p>
                          <p className="text-sm">
                            That referee decision was controversial! Should have
                            been a penalty!
                          </p>
                        </div>
                      </div>
                    </div>

                    <form onSubmit={handleSendMessage} className="flex gap-2">
                      <Input
                        className="bg-gray-700/50 border-gray-600 focus-visible:ring-blue-500"
                        placeholder="Type a message..."
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                      />
                      <Button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Send
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Comments Section */}
              <TabsContent value="comments" className="mt-4">
                <Card className="bg-gray-800/60 backdrop-blur-sm border-gray-700 rounded-xl shadow-lg">
                  <CardContent className="p-4">
                    <div className="space-y-4 mb-4 h-64 overflow-y-auto custom-scrollbar">
                      {[
                        {
                          name: "Charlie",
                          avatar: "C",
                          color: "orange",
                          comment:
                            "Manchester United playing with real intensity today. Their pressing has been outstanding, especially in the midfield.",
                          time: "15m ago",
                          likes: 34,
                        },
                        {
                          name: "Dana",
                          avatar: "D",
                          color: "teal",
                          comment:
                            "That second goal was absolute class! The build-up play and final finish were perfect.",
                          time: "23m ago",
                          likes: 27,
                        },
                        {
                          name: "Michael",
                          avatar: "M",
                          color: "indigo",
                          comment:
                            "Chelsea need to make some changes. Their midfield is getting overrun.",
                          time: "29m ago",
                          likes: 19,
                        },
                        {
                          name: "Sarah",
                          avatar: "S",
                          color: "pink",
                          comment:
                            "The referee has been inconsistent with his decisions today.",
                          time: "37m ago",
                          likes: 12,
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="border-t border-gray-700 pt-3"
                        >
                          <div className="flex gap-3 items-start">
                            <div
                              className={`h-8 w-8 rounded-full bg-${item.color}-600 flex items-center justify-center text-sm font-bold`}
                            >
                              {item.avatar}
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-center">
                                <p className="font-semibold">{item.name}</p>
                                <p className="text-xs text-gray-400">
                                  {item.time}
                                </p>
                              </div>
                              <p className="text-sm text-gray-300 mt-1">
                                {item.comment}
                              </p>
                              <div className="flex gap-3 mt-2 text-sm">
                                <button className="flex items-center gap-1 text-gray-400 hover:text-gray-200">
                                  <ThumbsUp className="h-3 w-3" /> {item.likes}
                                </button>
                                <button className="text-gray-400 hover:text-gray-200">
                                  Reply
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <form onSubmit={handlePostComment}>
                      <textarea
                        className="w-full bg-gray-700/50 border border-gray-600 p-3 rounded-lg text-sm text-white mb-3 resize-none"
                        rows={3}
                        placeholder="Leave a comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <Button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Post Comment
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Highlights Section */}
              <TabsContent value="highlights" className="mt-4">
                <Card className="bg-gray-800/60 backdrop-blur-sm border-gray-700 rounded-xl shadow-lg">
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      {[
                        { time: "12'", title: "Rashford Goal", views: "142K" },
                        {
                          time: "39'",
                          title: "Chelsea Penalty Miss",
                          views: "98K",
                        },
                        {
                          time: "45+2'",
                          title: "Incredible Save by De Gea",
                          views: "76K",
                        },
                        {
                          time: "58'",
                          title: "Bruno Fernandes Goal",
                          views: "124K",
                        },
                        {
                          time: "67'",
                          title: "Mount Goal for Chelsea",
                          views: "89K",
                        },
                      ].map((highlight, index) => (
                        <div
                          key={index}
                          className="relative bg-gray-700/30 rounded-lg overflow-hidden group cursor-pointer"
                        >
                          <div className="flex items-center p-3">
                            <div className="bg-gray-800 rounded px-2 py-1 mr-3 font-medium">
                              {highlight.time}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{highlight.title}</p>
                              <p className="text-xs text-gray-400">
                                {highlight.views} views
                              </p>
                            </div>
                            <Play className="h-5 w-5 text-white opacity-70 group-hover:opacity-100" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Stats and More */}
          <div className="space-y-6">
            {/* Live Score and Timeline */}
            <div className="bg-gray-800/60 backdrop-blur-sm p-5 rounded-xl shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Live Score</h2>
                <Badge className="bg-red-600">LIVE</Badge>
              </div>

              <div className="flex justify-between items-center mb-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-2 mx-auto">
                    <span className="text-xl font-bold">
                      {LiveMatch && LiveMatch.HomeTeam.slice(0, 2)}
                    </span>
                  </div>
                  <p className="font-medium">
                    {LiveMatch && LiveMatch.HomeTeam}
                  </p>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold">
                    {LiveMatch && LiveMatch.homeScore} -{" "}
                    {LiveMatch && LiveMatch.awayScore}
                  </div>
                  <p className="text-sm text-gray-400">
                    {formatMatchTime(matchTime)}
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-2 mx-auto">
                    <span className="text-xl font-bold">
                      {LiveMatch && LiveMatch.AwayTeam.slice(0, 2)}
                    </span>
                  </div>
                  <p className="font-medium">
                    {LiveMatch && LiveMatch.HomeTeam}
                  </p>
                </div>
              </div>

              {/* Timeline */}
              {/* <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="text-xs font-medium w-8">12'</div>
                  <div className="bg-gray-700 rounded-full h-1.5 flex-1 relative">
                    <div className="absolute left-[12%] w-3 h-3 bg-green-500 rounded-full -mt-0.5 border-2 border-gray-800"></div>
                  </div>
                  <div className="w-8 text-xs font-medium">⚽ 1-0</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-xs font-medium w-8">58'</div>
                  <div className="bg-gray-700 rounded-full h-1.5 flex-1 relative">
                    <div className="absolute left-[58%] w-3 h-3 bg-green-500 rounded-full -mt-0.5 border-2 border-gray-800"></div>
                  </div>
                  <div className="w-8 text-xs font-medium">⚽ 2-0</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-xs font-medium w-8">67'</div>
                  <div className="bg-gray-700 rounded-full h-1.5 flex-1 relative">
                    <div className="absolute left-[67%] w-3 h-3 bg-blue-500 rounded-full -mt-0.5 border-2 border-gray-800"></div>
                  </div>
                  <div className="w-8 text-xs font-medium">⚽ 2-1</div>
                </div>
              </div> */}
            </div>

            {/* Match Stats */}
            <div className="bg-gray-800/60 backdrop-blur-sm p-5 rounded-xl shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Match Stats</h2>
                <PieChart className="h-4 w-4 text-gray-400" />
              </div>

              {/* Possession */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>54%</span>
                  <span className="text-gray-400">Possession</span>
                  <span>46%</span>
                </div>
                <div className="flex h-2 rounded-full overflow-hidden">
                  <div className="bg-red-600" style={{ width: "54%" }}></div>
                  <div className="bg-blue-600" style={{ width: "46%" }}></div>
                </div>
              </div>

              {/* Shots on target */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>6</span>
                  <span className="text-gray-400">Shots on Target</span>
                  <span>3</span>
                </div>
                <div className="flex h-2 rounded-full overflow-hidden">
                  <div className="bg-red-600" style={{ width: "67%" }}></div>
                  <div className="bg-blue-600" style={{ width: "33%" }}></div>
                </div>
              </div>

              {/* More stats */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>10</span>
                  <span className="text-gray-400">Fouls</span>
                  <span>12</span>
                </div>
                <div className="flex justify-between">
                  <span>2</span>
                  <span className="text-gray-400">Yellow Cards</span>
                  <span>1</span>
                </div>
                <div className="flex justify-between">
                  <span>7</span>
                  <span className="text-gray-400">Corner Kicks</span>
                  <span>4</span>
                </div>
                <div className="flex justify-between">
                  <span>3</span>
                  <span className="text-gray-400">Offsides</span>
                  <span>2</span>
                </div>
              </div>
            </div>

            {/* Upcoming Fixtures */}
            <div className="bg-gray-800/60 backdrop-blur-sm p-5 rounded-xl shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Upcoming Fixtures</h2>
              <div className="space-y-3">
                {[
                  {
                    home: "Arsenal",
                    away: "Liverpool",
                    date: "Apr 20",
                    time: "15:00",
                  },
                  {
                    home: "Tottenham",
                    away: "Man City",
                    date: "Apr 21",
                    time: "20:00",
                  },
                  {
                    home: "Brighton",
                    away: "West Ham",
                    date: "Apr 22",
                    time: "19:45",
                  },
                ].map((match, index) => (
                  <div
                    key={index}
                    className="bg-gray-700/30 p-3 rounded-lg cursor-pointer hover:bg-gray-700/50 transition"
                  >
                    <div className="flex justify-between text-sm">
                      <span>{match.home}</span>
                      <span>vs</span>
                      <span>{match.away}</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-400">
                        {match.date}
                      </span>
                      <span className="text-xs text-gray-400">
                        {match.time}
                      </span>
                    </div>
                  </div>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-between mt-2"
                >
                  View all fixtures <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

       

        {/* Settings Panel (hidden by default) */}
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 hidden">
          <div className="bg-gray-900 rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Stream Settings</h3>
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-gray-800 rounded-full h-8 w-8 p-0"
              >
                &times;
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 block mb-1">
                  Video Quality
                </label>
                <select className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-sm">
                  <option value="auto">Auto (Recommended)</option>
                  <option value="1080p">1080p</option>
                  <option value="720p">720p</option>
                  <option value="480p">480p</option>
                  <option value="360p">360p</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-400 block mb-1">
                  Audio Language
                </label>
                <select className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-sm">
                  <option value="en">English (Default)</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>

              <div>
                <label className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-400">Playback Speed</span>
                  <span className="text-sm font-medium">1x</span>
                </label>
                <Slider
                  defaultValue={[50]}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400 block">
                  Preferences
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="autoplay"
                    className="rounded bg-gray-800 border-gray-700"
                  />
                  <label htmlFor="autoplay" className="text-sm">
                    Autoplay videos
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="notifications"
                    className="rounded bg-gray-800 border-gray-700"
                  />
                  <label htmlFor="notifications" className="text-sm">
                    Show notifications
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="chat"
                    className="rounded bg-gray-800 border-gray-700"
                    checked
                  />
                  <label htmlFor="chat" className="text-sm">
                    Show live chat
                  </label>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button variant="outline" className="flex-1 bg-transparent">
                Cancel
              </Button>
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                Save Settings
              </Button>
            </div>
          </div>
        </div>

        {/* Match Stats Detail Modal (hidden by default) */}
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 hidden">
          <div className="bg-gray-900 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Match Statistics</h3>
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-gray-800 rounded-full h-8 w-8 p-0"
              >
                &times;
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium border-b border-gray-700 pb-2">
                  Team Stats
                </h4>

                {/* Possession */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-red-400">54%</span>
                    <span className="text-gray-400">Possession</span>
                    <span className="text-blue-400">46%</span>
                  </div>
                  <div className="flex h-2 rounded-full overflow-hidden">
                    <div className="bg-red-600" style={{ width: "54%" }}></div>
                    <div className="bg-blue-600" style={{ width: "46%" }}></div>
                  </div>
                </div>

                {/* Shots */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-red-400">14</span>
                    <span className="text-gray-400">Total Shots</span>
                    <span className="text-blue-400">8</span>
                  </div>
                  <div className="flex h-2 rounded-full overflow-hidden">
                    <div className="bg-red-600" style={{ width: "64%" }}></div>
                    <div className="bg-blue-600" style={{ width: "36%" }}></div>
                  </div>
                </div>

                {/* Shots on Target */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-red-400">6</span>
                    <span className="text-gray-400">Shots on Target</span>
                    <span className="text-blue-400">3</span>
                  </div>
                  <div className="flex h-2 rounded-full overflow-hidden">
                    <div className="bg-red-600" style={{ width: "67%" }}></div>
                    <div className="bg-blue-600" style={{ width: "33%" }}></div>
                  </div>
                </div>

                {/* Passes */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-red-400">387</span>
                    <span className="text-gray-400">Passes</span>
                    <span className="text-blue-400">342</span>
                  </div>
                  <div className="flex h-2 rounded-full overflow-hidden">
                    <div className="bg-red-600" style={{ width: "53%" }}></div>
                    <div className="bg-blue-600" style={{ width: "47%" }}></div>
                  </div>
                </div>

                {/* Pass Accuracy */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-red-400">89%</span>
                    <span className="text-gray-400">Pass Accuracy</span>
                    <span className="text-blue-400">84%</span>
                  </div>
                  <div className="flex h-2 rounded-full overflow-hidden">
                    <div className="bg-red-600" style={{ width: "51%" }}></div>
                    <div className="bg-blue-600" style={{ width: "49%" }}></div>
                  </div>
                </div>

                {/* Other Stats */}
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="text-center p-2 bg-gray-800 rounded-lg">
                    <p className="text-gray-400">Corners</p>
                    <p className="font-medium">7 - 4</p>
                  </div>
                  <div className="text-center p-2 bg-gray-800 rounded-lg">
                    <p className="text-gray-400">Fouls</p>
                    <p className="font-medium">10 - 12</p>
                  </div>
                  <div className="text-center p-2 bg-gray-800 rounded-lg">
                    <p className="text-gray-400">Offsides</p>
                    <p className="font-medium">3 - 2</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium border-b border-gray-700 pb-2 mb-4">
                  Player Stats
                </h4>

                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-medium mb-2">Top Performers</h5>
                    <div className="space-y-2">
                      <div className="bg-gray-800/60 p-2 rounded-lg flex items-center">
                        <div className="w-8 h-8 bg-red-900 rounded-full flex items-center justify-center text-xs mr-2">
                          8
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Bruno Fernandes</p>
                          <p className="text-xs text-gray-400">
                            1 Goal, 1 Assist
                          </p>
                        </div>
                        <div className="bg-yellow-600/20 text-yellow-500 text-xs px-2 py-1 rounded">
                          9.2
                        </div>
                      </div>
                      <div className="bg-gray-800/60 p-2 rounded-lg flex items-center">
                        <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center text-xs mr-2">
                          19
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Mason Mount</p>
                          <p className="text-xs text-gray-400">1 Goal</p>
                        </div>
                        <div className="bg-yellow-600/20 text-yellow-500 text-xs px-2 py-1 rounded">
                          8.5
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-medium mb-2">Bookings</h5>
                    <div className="space-y-2">
                      <div className="bg-gray-800/60 p-2 rounded-lg flex items-center">
                        <div className="w-2 h-full bg-yellow-500 rounded mr-2"></div>
                        <div>
                          <p className="text-sm">Shaw (Man Utd) - 63&apos;</p>
                          <p className="text-xs text-gray-400">Tactical foul</p>
                        </div>
                      </div>
                      <div className="bg-gray-800/60 p-2 rounded-lg flex items-center">
                        <div className="w-2 h-full bg-yellow-500 rounded mr-2"></div>
                        <div>
                          <p className="text-sm">Kovacic (Chelsea) - 51&apos;</p>
                          <p className="text-xs text-gray-400">
                            Late challenge
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-medium mb-2">Substitutions</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between bg-gray-800/60 p-2 rounded-lg">
                        <span>Rashford ↔ Sancho</span>
                        <span className="text-gray-400">71&apos;</span>
                      </div>
                      <div className="flex justify-between bg-gray-800/60 p-2 rounded-lg">
                        <span>Pulisic ↔ Ziyech</span>
                        <span className="text-gray-400">65&apos;</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
              Download Match Report
            </Button>
          </div>
        </div>

        {/* Share Dialog (hidden by default) */}
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 hidden">
          <div className="bg-gray-900 rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Share This Match</h3>
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-gray-800 rounded-full h-8 w-8 p-0"
              >
                &times;
              </Button>
            </div>

            <p className="text-sm text-gray-400 mb-4">
              Share this exciting match with friends and fellow fans!
            </p>

            <div className="flex gap-3 mb-6">
              <Button
                variant="outline"
                className="flex-1 bg-gray-800/60 border-gray-700 hover:bg-gray-700"
              >
                Facebook
              </Button>
              <Button
                variant="outline"
                className="flex-1 bg-gray-800/60 border-gray-700 hover:bg-gray-700"
              >
                Twitter
              </Button>
              <Button
                variant="outline"
                className="flex-1 bg-gray-800/60 border-gray-700 hover:bg-gray-700"
              >
                WhatsApp
              </Button>
            </div>

            <div className="mb-4">
              <label className="text-sm text-gray-400 block mb-2">
                Share Link
              </label>
              <div className="flex gap-2">
                <Input
                  className="bg-gray-800 border-gray-700 text-sm"
                  value="https://footballstream.com/watch/premierleague-manutd-vs-chelsea-2025"
                  readOnly
                />
                <Button className="bg-blue-600 hover:bg-blue-700 whitespace-nowrap">
                  Copy
                </Button>
              </div>
            </div>

            <div className="mt-4 flex gap-2 text-sm">
              <input
                type="checkbox"
                id="timestamp"
                className="rounded bg-gray-800 border-gray-700"
              />
              <label htmlFor="timestamp">
                Include current timestamp ({formatMatchTime(matchTime)})
              </label>
            </div>
          </div>
        </div>

        {/* Subscription Modal (hidden by default) */}
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 hidden">
          <div className="bg-gray-900 rounded-xl p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Upgrade Your Experience</h3>
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-gray-800 rounded-full h-8 w-8 p-0"
              >
                &times;
              </Button>
            </div>

            <div className="bg-gradient-to-br from-blue-900 to-blue-800 p-4 rounded-lg mb-6">
              <p className="text-lg font-bold mb-2">
                Watch in Ultra HD without interruptions
              </p>
              <p className="text-sm text-blue-100 mb-4">
                Premium subscribers get access to 4K streaming, exclusive camera
                angles, and instant replays.
              </p>
              <div className="flex gap-2 text-sm">
                <span className="bg-green-600 text-white px-2 py-1 rounded">
                  ✓ No ads
                </span>
                <span className="bg-green-600 text-white px-2 py-1 rounded">
                  ✓ 4K quality
                </span>
                <span className="bg-green-600 text-white px-2 py-1 rounded">
                  ✓ All matches
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="border border-gray-700 rounded-lg p-4 hover:border-blue-500 cursor-pointer">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold">Monthly</h4>
                  <Badge className="bg-blue-600">Popular</Badge>
                </div>
                <p className="text-2xl font-bold mb-2">
                  $9.99
                  <span className="text-sm font-normal text-gray-400">
                    /month
                  </span>
                </p>
                <p className="text-sm text-gray-400">Cancel anytime</p>
              </div>
              <div className="border border-gray-700 rounded-lg p-4 hover:border-blue-500 cursor-pointer">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold">Annual</h4>
                  <Badge className="bg-green-600">20% Off</Badge>
                </div>
                <p className="text-2xl font-bold mb-2">
                  $95.88
                  <span className="text-sm font-normal text-gray-400">
                    /year
                  </span>
                </p>
                <p className="text-sm text-gray-400">
                  $7.99/month billed annually
                </p>
              </div>
            </div>

            <Button className="w-full bg-blue-600 hover:bg-blue-700 mb-4">
              Subscribe Now
            </Button>
            <p className="text-xs text-center text-gray-400">
              By subscribing, you agree to our Terms of Service and Privacy
              Policy.
            </p>
          </div>
        </div>
      </div>
    </HomeLayoutWrapper>
  );
}
