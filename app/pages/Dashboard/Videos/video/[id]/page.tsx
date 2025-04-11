"use client";

import React, { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  ThumbsUp, 
  MapPin, 
  Calendar, 
  Eye, 
  Clock,
  Play,
  Pause,
  Volume2,
  VolumeX
} from "lucide-react";
import { Spinner } from "@nextui-org/react";
import { handleGetSinglePost } from "@/app/api/PostApi/api";
import { Post } from "./video.types";
import { formatDate } from "@/lib/utils/dateFormatter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";

const VideoPage = () => {
  const { id } = useParams();
  const [singlePost, setSinglePost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    handleGetSinglePost(Number(id))
      .then((posts) => {
        setSinglePost(posts.data.post);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [id]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    setCurrentTime(video.currentTime);
    setDuration(video.duration);
  };

  const handleSeek = (value: number[]) => {
    if (videoRef.current) {
      videoRef.current.currentTime = (value[0] / 100) * duration;
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0] / 100;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMuteState = !isMuted;
      setIsMuted(newMuteState);
      videoRef.current.muted = newMuteState;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!id) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1 flex justify-center items-center min-h-[50vh]"
      >
        <Card className="p-6 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
          <p className="text-red-600 dark:text-red-400">No Video Available</p>
        </Card>
      </motion.div>
    );
  }

  if (isLoading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1 flex justify-center items-center min-h-[50vh]"
      >
        <Spinner color="white" size="lg" />
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 p-4 max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-12 gap-6">
        {/* Main Content */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {/* Video Player */}
          <div 
            className="relative rounded-lg overflow-hidden bg-gray-900"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
          >
            <video
              ref={videoRef}
              src={singlePost?.videoUrl}
              className="w-full aspect-video object-cover"
              onTimeUpdate={handleTimeUpdate}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
            <AnimatePresence>
              {showControls && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/30 flex items-center justify-center"
                >
                  <div className="flex flex-col items-center space-y-4">
                    <Button 
                      variant="ghost" 
                      size="lg" 
                      className="text-white hover:bg-white/20"
                      onClick={handlePlayPause}
                    >
                      {isPlaying ? <Pause size={48} /> : <Play size={48} />}
                    </Button>
                    <div className="flex items-center space-x-4 w-full px-8">
                      <span className="text-white text-sm">
                        {formatTime(currentTime)}
                      </span>
                      <Slider
                        defaultValue={[0]}
                        max={100}
                        step={1}
                        value={[(currentTime / duration) * 100]}
                        onValueChange={handleSeek}
                        className="flex-grow"
                      />
                      <span className="text-white text-sm">
                        {formatTime(duration)}
                      </span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-white hover:bg-white/20"
                        onClick={toggleMute}
                      >
                        {isMuted ? <VolumeX /> : <Volume2 />}
                      </Button>
                      <Slider
                        defaultValue={[volume * 100]}
                        max={100}
                        step={1}
                        onValueChange={handleVolumeChange}
                        className="w-24"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Video Info */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {singlePost?.caption}
                </h1>
                <div className="flex items-center gap-4 mt-2 text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {Math.floor(Math.random() * 10000)} views
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {singlePost && formatDate(singlePost.createdAt)}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Bookmark className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </div>
            </div>

            {/* Engagement Stats */}
            <div className="flex gap-6 py-4 border-t border-b dark:border-gray-800">
              <Button variant="ghost" className="flex items-center gap-2">
                <ThumbsUp className="w-5 h-5" />
                <span>{singlePost?.likeCount || 0}</span>
              </Button>
              <Button variant="ghost" className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                <span>{singlePost?.commentCount || 0}</span>
              </Button>
              <Button variant="ghost" className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                <span>Add to favorites</span>
              </Button>
            </div>

            {/* Description */}
            <Card className="bg-gray-50 dark:bg-gray-800/50">
              <CardContent className="p-4 space-y-3">
                <h2 className="font-semibold text-lg">Description</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {singlePost?.content}
                </p>
                <div className="flex flex-wrap gap-3 pt-3">
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    <MapPin className="w-3 h-3" />
                    {singlePost?.location || "No location"}
                  </Badge>
                  <Badge variant="secondary">
                    {singlePost?.commentCount} comments
                  </Badge>
                  <Badge variant="secondary">
                    {singlePost?.likeCount} likes
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar */}
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="col-span-12 lg:col-span-4 space-y-4"
        >
          {singlePost?.bannerUrl && (
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-video">
                  <Image
                    src={singlePost.bannerUrl}
                    alt="Video banner"
                    fill
                    className="object-cover"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {singlePost?.thumbnailUrl && (
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-video">
                  <Image
                    src={singlePost.thumbnailUrl}
                    alt="Video thumbnail"
                    fill
                    className="object-cover"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Additional Info */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Video Details</h3>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Published: {singlePost && formatDate(singlePost.createdAt)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>
                    Location: {singlePost?.location || "Not specified"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default VideoPage;