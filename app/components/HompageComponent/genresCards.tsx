import { handleGetAllPostsByGenre } from "@/app/api/PostApi/api";
import { ChevronLeft, ChevronRight, Film, Sparkles } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

type Data = {
  [tag: string]: Array<{
    id: number;
    postId: string;
    content: string;
    thumbnailUrl: string;
    bannerUrl: string;
    caption: string;
    likeCount: number;
    commentCount: number;
    location: string;
  }>;
};

type modal = {
  onClose: (value: boolean) => void;
  postId: (value: number) => void;
};

// Improved skeleton component with gradient pulse animation
const GenreSkeleton = () => {
  return (
    <div className="bg-black/30 backdrop-blur-md border border-indigo-500/10 p-6 rounded-2xl min-w-[280px] flex-shrink-0">
      <div className="grid grid-cols-2 gap-3">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="w-full h-28 rounded-xl overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 via-purple-900/20 to-indigo-900/20 animate-pulse" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" 
                 style={{ backgroundSize: '200% 100%', animationDuration: '1.5s' }} />
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-5">
        <div className="h-5 w-24 bg-gradient-to-r from-indigo-900/30 to-purple-900/30 rounded-md animate-pulse" />
        <div className="h-5 w-5 bg-indigo-900/30 rounded-md animate-pulse" />
      </div>
    </div>
  );
};

const GenreSection: React.FC<modal> = ({ onClose, postId }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [posts, setPosts] = useState<Data>();
  const [isLoading, setIsLoading] = useState(true);
  const [activeGenre, setActiveGenre] = useState<string | null>(null);

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

  useEffect(() => {
    handleGetAllPostsByGenre()
      .then((response) => {
        setPosts(response.data.data);
        if (response.data.data && Object.keys(response.data.data).length > 0) {
          setActiveGenre(Object.keys(response.data.data)[0]);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch posts:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <section className="relative bg-black text-white py-20 overflow-hidden">
      {/* Ambient background elements */}
      <div className="absolute inset-0 bg-gradient-radial from-indigo-900/10 to-transparent opacity-40" />
      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-indigo-900/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-purple-900/20 to-transparent" />
      
      {/* Animated dots/stars background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 rounded-full bg-indigo-500/30 animate-float"
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%`,
              animationDuration: `${5 + Math.random() * 10}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto relative z-10">
        {/* Title Section with enhanced styling */}
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center mb-3">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-indigo-500" />
            <div className="px-3">
              <Sparkles className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-indigo-500" />
          </div>
          
          <h2 className="text-5xl font-bold mb-5 bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-300 text-transparent bg-clip-text">
            Discover Your Imagination
          </h2>
          
          <p className="text-gray-300 text-lg font-light max-w-xl mx-auto leading-relaxed">
            Explore our curated collection of immersive stories and experiences 
            designed to transport you to new worlds.
          </p>
        </div>

        {/* Genre Tabs - New Component */}
        {!isLoading && posts && Object.keys(posts).length > 0 && (
          <div className="flex justify-center mb-10 overflow-x-auto scrollbar-hide">
            <div className="flex space-x-2 p-1 bg-white/5 backdrop-blur-lg rounded-full">
              {Object.keys(posts).map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveGenre(tag)}
                  className={`px-5 py-2 rounded-full text-sm transition-all duration-300 ${
                    activeGenre === tag
                      ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-600/20"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {tag.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Scroll Buttons and Content with enhanced styling */}
        <div className="relative group">
          {/* Redesigned scroll buttons */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-3 bg-black/50 backdrop-blur-xl border border-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-indigo-900/50 -translate-x-4 hover:scale-110 z-30 shadow-lg shadow-indigo-900/20"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-3 bg-black/50 backdrop-blur-xl border border-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-indigo-900/50 translate-x-4 hover:scale-110 z-30 shadow-lg shadow-indigo-900/20"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Scrollable Container with enhanced styling */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 scrollbar-hide py-6 px-6"
          >
            {isLoading ? (
              // Skeleton loading state
              Array(5)
                .fill(0)
                .map((_, index) => <GenreSkeleton key={index} />)
            ) : posts && Object.keys(posts).length > 0 ? (
              Object.entries(posts).map(([tag, posts]) => (
                <div
                  key={tag}
                  className={`bg-gradient-to-br from-gray-950/80 to-gray-900/30 backdrop-blur-lg border border-gray-800/50 p-6 rounded-2xl min-w-[280px] flex-shrink-0 transition-all duration-500 group/card ${
                    activeGenre === tag ? 'ring-2 ring-indigo-500/50 shadow-xl shadow-indigo-500/10 scale-105' : 'hover:bg-black/70 hover:border-indigo-500/30'
                  }`}
                >
                  {/* Movie Cards Grid with enhanced styling */}
                  <div className="grid grid-cols-2 gap-3">
                    {posts.slice(0, 4).map((movie, idx) => (
                      <button
                        onClick={() => {
                          onClose(true);
                          postId(movie.id);
                        }}
                        key={idx}
                        className="relative w-full overflow-hidden h-28 rounded-xl transform transition-all duration-500 hover:scale-105 group/image"
                      >
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover/image:scale-110"
                          style={{
                            backgroundImage: `url(${movie.thumbnailUrl})`,
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover/image:opacity-30 transition-opacity duration-300" />
                        
                        {/* Play indicator on hover */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-all duration-300">
                          <div className="w-10 h-10 rounded-full bg-indigo-600/80 backdrop-blur-sm flex items-center justify-center">
                            <Film className="w-5 h-5 text-white" />
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Genre Title and Arrow with enhanced styling */}
                  <div className="flex justify-between items-center mt-5">
                    <h3 className="text-sm font-medium text-gray-200 group-hover/card:text-white transition-colors">
                      <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent font-bold">
                        {tag.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-400 ml-2">{posts.length} items</span>
                    </h3>
                    <button
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-indigo-600/30 transform transition-all duration-300 hover:translate-x-1 border border-white/10"
                      aria-label={`Explore ${tag}`}
                    >
                      →
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center w-full p-8 bg-black/30 backdrop-blur-lg rounded-2xl border border-gray-800/50">
                <div className="text-center">
                  <div className="bg-gray-800/50 p-4 rounded-full inline-flex mb-4">
                    <Film className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-gray-400">
                    No genres available at the moment.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenreSection;