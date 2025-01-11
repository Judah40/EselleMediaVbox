"use client";

// import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { FlipWord } from "../TextAnimation/headerText";
import {  Info, Play } from "lucide-react";

interface BackgroundMediaProps {
  videoUrl?: string;
  imageUrl?: string;
  playMainVideo: (video: boolean) => void;
}

const LandingPage: React.FC<BackgroundMediaProps> = ({
  videoUrl,
  imageUrl,
  playMainVideo,
}) => {
  const [showBanner, setShowBanner] = useState<boolean>(true);
  const [isVideoReady, setIsVideoReady] = useState<boolean>(false);
  // const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  // const router = useRouter();

  // Existing handlers remain unchanged
  const handleVideoLoad = useCallback(() => {
    setIsVideoReady(true);
  }, []);

  const playVideo = useCallback(() => {
    if (videoRef.current && isVideoReady) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setShowBanner(false);
            // setIsPlaying(true);
          })
          .catch((error) => {
            console.error("Video playback failed:", error);
            setShowBanner(true);
            // setIsPlaying(false);
          });
      }
    }
  }, [isVideoReady]);

  const pauseVideo = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      setShowBanner(true);
      // setIsPlaying(false);
    }
  }, []);

  useEffect(() => {
    if (!isVideoReady) return;
    const bannerTimeout = setTimeout(() => {
      playVideo();
    }, 5000);
    return () => clearTimeout(bannerTimeout);
  }, [isVideoReady, playVideo]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          playVideo();
        } else {
          pauseVideo();
        }
      },
      {
        threshold: 0.5,
        rootMargin: "0px",
      }
    );

    if (videoRef.current) {
      observerRef.current.observe(videoRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [playVideo, pauseVideo]);

  const handleVideoEnd = useCallback(() => {
    setShowBanner(true);
    // setIsPlaying(false);
  }, []);

  const handleVideoError = useCallback(() => {
    console.error("Video error occurred");
    setShowBanner(true);
    setIsVideoReady(false);
    // setIsPlaying(false);
  }, []);

  const handlePlay = useCallback(() => {
     (true);
  }, []);

  const handlePause = useCallback(() => {
    // setIsPlaying(false);
  }, []);

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {/* Background Image/Video Container */}
      <div className="absolute inset-0">
        {showBanner ? (
          <div
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className="absolute inset-0 w-full h-full"
          />
        ) : null}
        <video
          ref={videoRef}
          src={videoUrl}
          onEnded={handleVideoEnd}
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
          onPlay={handlePlay}
          onPause={handlePause}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            showBanner ? "opacity-0" : "opacity-100"
          }`}
          playsInline
          preload="auto"
        />
        
        {/* Multiple gradient overlays for better text protection */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
      </div>

      {/* Content Container with backdrop protection */}
      <div className="relative h-full z-10 flex flex-col justify-end pb-16 px-8 md:px-16">
        {/* Main Content Container */}
        <div className="max-w-2xl space-y-8">
          {/* Title Animation with text protection */}
          <div className="relative">
            <div className="transform translate-y-0 transition-transform duration-500">
              <FlipWord />
            </div>
          </div>

          {/* Description with enhanced visibility */}
          <p className="text-gray-100 text-sm md:text-base max-w-xl leading-relaxed drop-shadow-lg">
            Experience the story that captivated audiences worldwide. Immerse yourself in a journey of wonder and excitement.
          </p>

          {/* Buttons Container with improved contrast */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            {/* Play Button */}
            <button
              onClick={() => playMainVideo(true)}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="group relative flex items-center gap-3 bg-yellow-600 hover:bg-yellow-500 px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Play className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              <span className="font-medium text-white">Play Now</span>
              <div className={`absolute inset-0 bg-yellow-400/20 rounded-lg transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
            </button>


            {/* More Info Button */}
            <button className="group flex items-center gap-3 bg-black/40 backdrop-blur-sm hover:bg-black/60 px-6 py-3 rounded-lg transition-all duration-300 shadow-lg">
              <Info className="w-5 h-5" />
              <span className="font-medium text-white">More Info</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;