import { handleGetAllPostsByGenre } from "@/app/api/PostApi/api";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
// Skeleton component for loading state
const GenreSkeleton = () => {
  return (
    <div className="bg-neutral-950 border-[0.2px] border-gray-700/50 p-4 rounded-lg min-w-[240px] flex-shrink-0 animate-pulse">
      <div className="grid grid-cols-2 gap-2">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="w-full h-24 bg-gray-800 rounded-lg transition-all"
          />
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <div className="h-4 w-20 bg-gray-800 rounded" />
        <div className="h-4 w-4 bg-gray-800 rounded" />
      </div>
    </div>
  );
};

const GenreSection: React.FC<modal> = ({ onClose, postId }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [posts, setPosts] = useState<Data>();
  const [isLoading, setIsLoading] = useState(true);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  useEffect(() => {
    handleGetAllPostsByGenre()
      .then((response) => {
        setPosts(response.data.data);
      })
      .catch((error) => {
        console.error("Failed to fetch posts:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <section className="bg-gradient-to-b from-black to-neutral-950 text-white py-16 px-4">
      <div className="container mx-auto">
        {/* Title Section */}
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white via-gray-200 to-gray-400 text-transparent bg-clip-text">
            Discover Your Next Favorite
          </h2>
          <p className="text-gray-400 text-lg">
            Explore our curated collection of genres and uncover stories that
            resonate with you.
          </p>
        </div>

        {/* Scroll Buttons and Content */}
        <div className="relative group">
          {/* Scroll Buttons */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-3 bg-black/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black -translate-x-4 hover:scale-110 z-30"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-3 bg-black/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black translate-x-4 hover:scale-110 z-30"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 scrollbar-hide py-4 px-4"
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
                  className="bg-neutral-900/50 backdrop-blur-sm border border-gray-800 p-4 rounded-xl min-w-[240px] flex-shrink-0 hover:bg-neutral-800/50 transition-all duration-300 group/card"
                >
                  {/* Movie Cards Grid */}
                  <div className="grid grid-cols-2 gap-2">
                    {posts.map((movie, idx) => (
                      <button
                        onClick={() => {
                          onClose(true);
                          postId(movie.id);
                        }}
                        key={idx}
                        className="relative w-full overflow-hidden h-24 rounded-lg transform transition-all duration-300 hover:scale-105 group/image"
                      >
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover/image:scale-110"
                          style={{
                            backgroundImage: `url(${movie.thumbnailUrl})`,
                          }}
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300" />
                      </button>
                    ))}
                  </div>

                  {/* Genre Title and Arrow */}
                  <div className="flex justify-between items-center mt-4">
                    <h3 className="text-sm font-medium text-gray-200 group-hover/card:text-white transition-colors">
                      {tag.toUpperCase()}
                    </h3>
                    <button
                      className="text-gray-400 hover:text-white transform transition-all duration-300 hover:translate-x-1"
                      aria-label={`Explore ${tag}`}
                    >
                      →
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center w-full p-8">
                <p className="text-gray-400">
                  No genres available at the moment.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenreSection;
