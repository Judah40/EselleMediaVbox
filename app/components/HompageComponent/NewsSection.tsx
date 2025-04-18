import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import NewsLiveCard from "../cards/NewsLiveCard";
import { movies } from "@/app/api/DummyData/Movies";

const NewsSection = (
  // { onClose }: { onClose: (value: boolean) => void }
) => {
  const scroll = (direction: string) => {
    const container = document.getElementById("netflix-row");
    const scrollAmount = direction === "left" ? -800 : 800;
    container?.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };
  return (
    <div className=" py-4 gap-4 flex-col relative flex">
      <div className="p-12 ">
        <div className="mb-8">
          <h2 className="text-white text-2xl font-bold"> News and Reports </h2>
        </div>
        <div className="relative group">
          {/* Scroll Buttons */}
          <div className="absolute left-0 top-0 bottom-0 flex items-center z-30">
            <button
              onClick={() => scroll("left")}
              className="p-2 bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-opacity-70 ml-2"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
          </div>

          <div className="absolute right-0 top-0 bottom-0 flex items-center z-30">
            <button
              onClick={() => scroll("right")}
              className="p-2 bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-opacity-70 mr-2"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Added padding to ensure full card visibility */}
          <div
            id="netflix-row"
            className="flex overflow-x-auto scrollbar-hide scroll-smooth gap-6 py-8 -my-8"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {movies.map((movie) => (
              <NewsLiveCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsSection;
