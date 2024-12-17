"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { FlipWord } from "../TextAnimation/headerText";
import { Bookmark, Play } from "lucide-react";

interface BackgroundMediaProps {
  videoUrl?: string;
  imageUrl?: string;
}

const LandingPage: React.FC<BackgroundMediaProps> = ({
  videoUrl,
  imageUrl,
}) => {
  const [showBanner, setShowBanner] = useState<boolean>(true);
  const [isVideoReady, setIsVideoReady] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const router = useRouter();

  // Handle video loading
  const handleVideoLoad = useCallback(() => {
    setIsVideoReady(true);
  }, []);

  // Handle video playback
  const playVideo = useCallback(() => {
    if (videoRef.current && isVideoReady) {
      const playPromise = videoRef.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setShowBanner(false);
            setIsPlaying(true); // Set playing state to true when video starts
          })
          .catch((error) => {
            console.error("Video playback failed:", error);
            setShowBanner(true);
            setIsPlaying(false); // Ensure playing state is false on error
          });
      }
    }
  }, [isVideoReady]);

  // Handle video pause
  const pauseVideo = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      setShowBanner(true);
      setIsPlaying(false); // Set playing state to false when video pauses
    }
  }, []);

  // Initial banner timeout
  useEffect(() => {
    if (!isVideoReady) return;

    const bannerTimeout = setTimeout(() => {
      playVideo();
    }, 5000);

    return () => clearTimeout(bannerTimeout);
  }, [isVideoReady, playVideo]);

  // Intersection Observer setup
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

  // Video event handlers
  const handleVideoEnd = useCallback(() => {
    setShowBanner(true);
    setIsPlaying(false); // Set playing state to false when video ends
  }, []);

  const handleVideoError = useCallback(() => {
    console.error("Video error occurred");
    setShowBanner(true);
    setIsVideoReady(false);
    setIsPlaying(false); // Set playing state to false on error
  }, []);

  // Additional video event handlers for play state
  const handlePlay = useCallback(() => {
    setIsPlaying(true);
    console.log("Video is playing"); // Debug log
  }, []);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
    console.log("Video is paused"); // Debug log
  }, []);

  return (
    <div className="flex w-full h-[600px] relative">
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
        className={`absolute inset-0 w-full h-full object-contain ${
          showBanner ? "hidden" : "block"
        }`}
        playsInline
        preload="auto"
      />
      {/* Optional: Display play state indicator */}
      {/* <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded bg-black bg-opacity-50">
        <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
          isPlaying ? 'bg-green-500' : 'bg-red-500'
        }`}></span>
        <span className="text-white text-sm">
          {isPlaying ? 'Playing' : 'Stopped'}
        </span>
      </div> */}
      <div
        className={`w-full bg-black h-full pt-16 bg-opacity-60 flex md:flex-row z-10 bg-gradient-to-t ${
          isPlaying ? "from-transparent" : "from-black"
        } via-transparent to-black flex-col-reverse items-center justify-center gap-8`}
      >
        <div className="w-full px-6 md:px-14">
          <div className="md:w-96 gap-6 flex flex-col ">
            <div className="">
              <FlipWord />
            </div>
            <div className="flex items-center space-x-6">
              <button
                onClick={() => router.push("/pages/Auth/Signup")}
                className="px-4 text-xs flex items-center justify-center gap-2 bg-yellow-700 py-4 hover:bg-yellow-600 rounded w-40"
              >
                <Play />
                <p>Play Now</p>
              </button>
              <button
                onClick={() => router.push("/pages/Auth/Signup")}
                className="px-4 flex items-center justify-center text-xs gap-2 py-4 border rounded w-48"
              >
                <Bookmark />
                <p>Add To Watchlist</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
