import React, { useCallback, useState } from "react";
import { Play, Plus, Check, Info, VolumeX, Volume2, Star } from "lucide-react";
import { PostVideoData } from "@/app/pages/Dashboard/Videos/videos.types";
import { users } from "@/app/types/context";
import { useRouter } from "next/navigation";

const HeroSection = ({
  content,
  User,
}: {
  content: PostVideoData;
  User: users;
}) => {
  const [isMuted, setIsMuted] = useState(true);
  const [inMyList, setInMyList] = useState(false);
  const router = useRouter();

  const AddToMyList = useCallback(() => {
    if (User.firstName) {
      setInMyList(!inMyList);
    } else {
      router.push("/pages/Auth/Login");
    }
  }, [inMyList]);

  // Format duration from seconds to readable format
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <section className="relative h-[85vh] lg:h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${content.bannerUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 lg:via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      <div className="relative h-full flex items-end lg:items-center overflow-hidden">
        <div className="w-full px-4 sm:px-6 lg:px-8 pb-16 lg:pb-0 max-w-7xl mx-auto">
          <div className="max-w-2xl lg:max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 lg:mb-6 leading-tight animate-fade-in-up break-words">
              {content.title}
            </h1>

            <div
              className="flex flex-wrap items-center gap-3 lg:gap-4 mb-4 lg:mb-6 text-white/90 text-sm lg:text-base animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              {content.rating && (
                <div className="flex items-center space-x-1.5 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500 flex-shrink-0" />
                  <span className="font-semibold whitespace-nowrap">
                    {content.rating}
                  </span>
                </div>
              )}

              <span className="text-white/70 whitespace-nowrap">
                {formatDuration(content.duration)}
              </span>

              <div className="flex items-center space-x-1.5 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <span className="font-semibold whitespace-nowrap">
                  ❤️ {content.likeCount}
                </span>
              </div>

              {content.genre.slice(0, 3).map((g, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm whitespace-nowrap capitalize"
                >
                  {g}
                </span>
              ))}
            </div>

            <p
              className="text-base lg:text-lg text-white/90 mb-6 lg:mb-8 leading-relaxed max-w-xl animate-fade-in-up break-words"
              style={{ animationDelay: "0.2s" }}
            >
              {content.description}
            </p>

            <div
              className="flex items-center gap-2 mb-6 text-white/70 text-sm animate-fade-in-up"
              style={{ animationDelay: "0.25s" }}
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="capitalize">{content.location}</span>
            </div>

            <div
              className="flex flex-wrap items-center gap-3 lg:gap-4 animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              <button className="flex items-center space-x-2 bg-white hover:bg-white/90 text-black px-6 lg:px-8 py-3 lg:py-4 rounded-xl font-bold transition-all duration-200 hover:scale-105 shadow-lg whitespace-nowrap">
                <Play className="h-5 w-5 fill-black flex-shrink-0" />
                <span>Play Now</span>
              </button>

              <button
                onClick={() => AddToMyList()}
                className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-5 lg:px-6 py-3 lg:py-4 rounded-xl font-medium transition-all duration-200 border border-white/20 whitespace-nowrap"
              >
                {inMyList ? (
                  <Check className="h-5 w-5 flex-shrink-0" />
                ) : (
                  <Plus className="h-5 w-5 flex-shrink-0" />
                )}
                <span className="hidden sm:inline">
                  {inMyList ? "In My List" : "My List"}
                </span>
              </button>

              <button className="p-3 lg:p-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-xl transition-all duration-200 border border-white/20 flex-shrink-0">
                <Info className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => setIsMuted(!isMuted)}
        className="absolute bottom-20 lg:bottom-8 right-4 lg:right-8 p-3 lg:p-4 bg-black/30 hover:bg-black/50 backdrop-blur-md text-white rounded-full border border-white/20 transition-all duration-200 hover:scale-105"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? (
          <VolumeX className="h-5 w-5" />
        ) : (
          <Volume2 className="h-5 w-5" />
        )}
      </button>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
