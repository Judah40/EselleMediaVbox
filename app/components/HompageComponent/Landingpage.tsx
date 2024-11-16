"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

interface BackgroundMeduaProps {
  videoUrl: string;
  imageUrl: string;
}
const Landingpage: React.FC<BackgroundMeduaProps> = ({
  videoUrl,
  imageUrl,
}) => {
  const [showBanner, setShowBanner] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  //SHOW AND HIDE BANNER
  useEffect(() => {
    const bannerTimeout = setTimeout(() => {
      setShowBanner(false);
    }, 5000);
    return () => clearTimeout(bannerTimeout);
  }, []);

  //SHOW AND HIDE VIDEO
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entries]) => {
        if (entries.isIntersecting) {
          videoRef.current?.play();
        } else {
          setShowBanner(true);
          videoRef.current?.pause();
        }
      },
      {
        threshold: 0.5,
      }
    );

    if (videoRef.current) observer.observe(videoRef.current);
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  });

  const handleVideoEnd = () => setShowBanner(true);
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
      ) : (
        <video
          ref={videoRef}
          src={videoUrl}
          onEnded={handleVideoEnd}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <div
        className={`w-full bg-black h-full  bg-opacity-60 flex md:flex-row z-10   flex-col-reverse items-center justify-center gap-8 `}
      >
        <div className="w-full    px-6 md:px-14">
          <div className="md:w-96 gap-6 flex flex-col">
            <p className="text-4xl lg:text-5xl font-bold">
              Your World of Entertainment, Live and On-Demand
            </p>
            <p className="lg:text-lg">
              Discover exclusive events, stream the latest shows, and relive
              unforgettable moments – all in one place.
            </p>
            <button
              onClick={() => {
                router.push("/pages/Auth/Signup");
              }}
              className="px-4 bg-yellow-700 py-4 hover:bg-yellow-600 rounded inline-block"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landingpage;
