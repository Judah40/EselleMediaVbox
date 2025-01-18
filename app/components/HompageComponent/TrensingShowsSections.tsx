import { UserAuth } from "@/useContext";
import React from "react";
import { Play, Star } from "lucide-react";
import { useRouter } from "next/navigation";

// Skeleton Loader Component
const ShowCardSkeleton = () => (
  <div className="min-w-[200px] flex-shrink-0 rounded-xl overflow-hidden animate-pulse">
    <div className="h-60 bg-gray-800/50" />
    <div className="p-4 space-y-3 bg-gray-900/50">
      <div className="h-4 bg-gray-800 rounded w-3/4" />
      <div className="flex gap-2">
        <div className="h-3 bg-gray-800 rounded w-16" />
        <div className="h-3 bg-gray-800 rounded w-16" />
      </div>
    </div>
  </div>
);

const ShowsSection: React.FC<{
  onClose: (value: boolean) => void;
}> = ({ onClose }) => {
  const { posts } = UserAuth();
  const isLoading = !posts || posts.length === 0;
  const router = useRouter();

  return (
    <section className="bg-gradient-to-b from-neutral-950 to-black text-white py-16 px-4">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Latest Shows
          </h2>
          <p className="text-gray-400 text-lg">
            Discover the newest and most exciting shows on Vbox, carefully
            curated for your entertainment
          </p>
        </div>

        {/* Shows Grid */}
        <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
          {isLoading
            ? // Skeleton Loading State
              Array(5)
                .fill(0)
                .map((_, index) => <ShowCardSkeleton key={index} />)
            : posts.map((movie, index) => (
                <button
                  onClick={() => {
                    onClose(true);
                  }}
                  key={index}
                  className="min-w-[200px] group relative flex-shrink-0 rounded-xl overflow-hidden bg-neutral-900/50 backdrop-blur-sm hover:bg-neutral-800/50 transition-all duration-300"
                >
                  {/* Image Container */}
                  <div className="relative h-60 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transform transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url(${movie.bannerUrl})` }}
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                        <button
                          className="p-2 bg-yellow-600 rounded-full hover:bg-yellow-500 transform hover:scale-110 transition-all duration-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            // onClose(true);
                            router.push(`/pages/Player/${movie.id}`);
                          }}
                        >
                          <Play className="w-4 h-4" />
                        </button>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm">4.5</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-3">
                    <h3 className="text-lg font-semibold line-clamp-1 group-hover:text-yellow-500 transition-colors">
                      {movie.caption.split(" ")[0]}
                    </h3>
                    <div className="flex items-center gap-2">
                      {JSON.parse(movie.tags[0])
                        .slice(0, 2)
                        .map((value: string, index: number) => (
                          <span
                            key={index}
                            className="text-sm px-2 py-1 rounded-full bg-neutral-800 text-gray-300"
                          >
                            {value}
                          </span>
                        ))}
                    </div>
                  </div>
                </button>
              ))}
        </div>
      </div>
    </section>
  );
};

export default ShowsSection;
