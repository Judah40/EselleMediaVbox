import { UserAuth } from "@/useContext";
import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Film, Play, Star, Clock, Flame, Award } from "lucide-react";
import { useRouter } from "next/navigation";

type modal = {
  onClose: (value: boolean) => void;
  postId: (value: number) => void;
};

// Enhanced Skeleton Loader Component
const ShowCardSkeleton = () => (
  <div className="min-w-[270px] flex-shrink-0 rounded-2xl overflow-hidden group">
    <div className="relative h-72 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-800/80 to-gray-900/80 animate-pulse" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" 
           style={{ backgroundSize: '200% 100%', animationDuration: '1.5s' }} />
    </div>
    <div className="p-5 space-y-3 bg-gradient-to-b from-black/80 to-gray-900/80 backdrop-blur-sm border-t border-white/5">
      <div className="h-4 bg-gray-800/70 rounded-full w-3/4" />
      <div className="flex gap-2">
        <div className="h-3 bg-gray-800/70 rounded-full w-16" />
        <div className="h-3 bg-gray-800/70 rounded-full w-12" />
      </div>
      <div className="flex justify-between pt-2">
        <div className="h-8 w-8 rounded-full bg-gray-800/70" />
        <div className="h-4 w-16 rounded-full bg-gray-800/70" />
      </div>
    </div>
  </div>
);

const ShowsSection: React.FC<modal> = ({ onClose, postId }) => {
  const { posts } = UserAuth();
  const isLoading = !posts || posts.length === 0;
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [featured, setFeatured] = useState<number>(0);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -350, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 350, behavior: "smooth" });
    }
  };

  // Generate random rating between 4.1 and 5.0
  const getRandomRating = () => {
    return (Math.random() * 0.9 + 4.1).toFixed(1);
  };

  return (
    <section className="relative bg-black text-white py-24 px-4 overflow-hidden">
      {/* Ambient background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-violet-950/10 via-black to-black z-0" />
      <div className="absolute top-0 right-0 w-1/3 h-96 bg-violet-600/10 blur-3xl rounded-full transform translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-1/3 h-96 bg-indigo-600/10 blur-3xl rounded-full transform -translate-x-1/2 translate-y-1/2" />
      
      {/* Light beams */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 3 }).map((_, i) => (
          <div 
            key={i}
            className="absolute w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent transform rotate-45 animate-beam"
            style={{ 
              top: `${20 + i * 30}%`, 
              left: `-100%`,
              animationDelay: `${i * 2}s`,
              animationDuration: '8s'
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Featured Show - New Addition */}
        {!isLoading && posts && posts.length > 0 && (
          <div className="mb-20">
            <div className="flex justify-between items-end mb-6">
              <div>
                <h3 className="text-sm font-medium text-indigo-400 mb-2 flex items-center">
                  <Award className="w-4 h-4 mr-2" />
                  FEATURED SHOW
                </h3>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {posts[featured].caption}
                </h2>
              </div>
              <div className="flex space-x-2">
                {posts.slice(0, 5).map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setFeatured(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      featured === idx ? 'bg-indigo-500 w-6' : 'bg-gray-600 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <div className="relative h-96 rounded-3xl overflow-hidden group">
              <div
                className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${posts[featured].bannerUrl})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-10">
                <div className="flex gap-3 mb-4">
                  {JSON.parse(posts[featured].tags[0])
                    .slice(0, 3)
                    .map((value: string, index: number) => (
                      <span
                        key={index}
                        className="text-xs px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/10"
                      >
                        {value}
                      </span>
                    ))}
                </div>
                
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => {
                      onClose(true);
                      postId(posts[featured].id);
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full hover:from-indigo-500 hover:to-violet-500 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-indigo-900/30 hover:shadow-indigo-900/50 transform hover:translate-y-[-2px]"
                  >
                    <Play className="w-5 h-5" />
                    <span className="font-medium">Watch Now</span>
                  </button>
                  
                  <button 
                    className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all duration-300"
                    onClick={() => router.push(`/pages/Player/${posts[featured].id}`)}
                  >
                    <Clock className="w-5 h-5" />
                  </button>
                  
                  <div className="ml-auto flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-md border border-yellow-500/30">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-yellow-100 font-medium">{getRandomRating()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Shows Section Header */}
        <div className="mb-12">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center mb-2">
                <div className="w-6 h-[2px] bg-gradient-to-r from-indigo-500 to-violet-500" />
                <div className="px-2">
                  <Flame className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="text-sm text-indigo-400 font-medium tracking-wider">TRENDING NOW</div>
              </div>
              
              <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-indigo-100 to-gray-300 bg-clip-text text-transparent">
                Latest Shows
              </h2>
            </div>
            
            {/* Desktop Show All & Navigation */}
            <div className="hidden md:flex items-center gap-4">
              <button className="text-sm text-gray-400 hover:text-white transition-colors">
                View All Shows <span className="ml-1">→</span>
              </button>
              
              <div className="flex gap-2">
                <button
                  onClick={scrollLeft}
                  className="p-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full hover:bg-indigo-600/30 transition-all duration-300"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={scrollRight}
                  className="p-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full hover:bg-indigo-600/30 transition-all duration-300"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          
          <p className="text-gray-400 text-lg mt-4 max-w-2xl">
            Discover the newest and most exciting shows, carefully curated for your entertainment experience
          </p>
        </div>

        {/* Shows Carousel */}
        <div className="relative group">
          {/* Mobile scroll buttons - appear on hover */}
          <button
            onClick={scrollLeft}
            className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 p-3 bg-black/70 backdrop-blur-xl border border-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-indigo-900/50 -translate-x-4 hover:scale-110 z-30"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={scrollRight}
            className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 p-3 bg-black/70 backdrop-blur-xl border border-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-indigo-900/50 translate-x-4 hover:scale-110 z-30"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Shows Grid with enhanced styling */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-8 pt-2"
          >
            {isLoading
              ? Array(5).fill(0).map((_, index) => <ShowCardSkeleton key={index} />)
              : posts.map((movie, index) => (
                  <div
                    key={index}
                    className="min-w-[270px] group/card relative flex-shrink-0 rounded-2xl overflow-hidden bg-gradient-to-b from-gray-900/80 to-black/80 backdrop-blur-lg border border-white/5 hover:border-indigo-500/30 transition-all duration-500 transform hover:-translate-y-1"
                    onMouseEnter={() => setHoverIndex(index)}
                    onMouseLeave={() => setHoverIndex(null)}
                  >
                    {/* Image Container */}
                    <div className="relative h-72 overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 group-hover/card:scale-110"
                        style={{ backgroundImage: `url(${movie.bannerUrl})` }}
                      />
                      
                      {/* Top badge */}
                      {index < 3 && (
                        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-xs font-bold flex items-center gap-1 shadow-lg shadow-orange-900/30">
                          <Flame className="w-3 h-3" />
                          {index === 0 ? "HOT" : index === 1 ? "TRENDING" : "POPULAR"}
                        </div>
                      )}
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover/card:opacity-80 transition-opacity duration-300" />
                      
                      {/* Hover Play Button */}
                      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${hoverIndex === index ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                        <button
                          onClick={() => {
                            onClose(true);
                            postId(movie.id);
                          }}
                          className="w-16 h-16 flex items-center justify-center rounded-full bg-indigo-600/80 backdrop-blur-md hover:bg-indigo-500 transition-all duration-300 transform hover:scale-110 border border-white/30 shadow-lg shadow-indigo-900/50"
                        >
                          <Play className="w-7 h-7 ml-1" />
                        </button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 space-y-3">
                      <h3 className="text-xl font-semibold line-clamp-1 group-hover/card:text-indigo-300 transition-colors">
                        {movie.caption.split(" ")[0]}
                      </h3>
                      
                      <div className="flex items-center gap-2 flex-wrap">
                        {Array.isArray(movie.tags) && movie.tags[0] && (() => {
                          try {
                            return JSON.parse(movie.tags[0]);
                          } catch {
                            return [];
                          }
                        })()
                          .slice(0, 2)
                          .map((value: string, tagIndex: number) => (
                            <span
                              key={tagIndex}
                              className="text-xs px-3 py-1 rounded-full bg-white/5 text-gray-300 border border-white/5 hover:border-indigo-500/30 transition-colors"
                            >
                              {value}
                            </span>
                          ))}
                      </div>
                      
                      {/* Bottom Action Bar */}
                      <div className="pt-3 flex items-center justify-between">
                        <button
                          className="p-2 rounded-full bg-white/5 hover:bg-indigo-600/20 border border-white/5 hover:border-indigo-500/30 transition-all duration-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/pages/Player/${movie.id}`);
                          }}
                        >
                          <Film className="w-4 h-4" />
                        </button>
                        
                        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/5">
                          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                          <span className="text-xs text-gray-200">{getRandomRating()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowsSection;