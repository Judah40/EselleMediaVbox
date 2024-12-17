import { ChevronLeft, ChevronRight } from "lucide-react";
// import { useRouter } from "next/navigation";
import React, { useRef } from "react";

interface MovieCategory {
  name: string;
  movies: string[];
}

const categories: MovieCategory[] = [
  {
    name: "Action",
    movies: [
      "/flash-background.jpeg",
      "/poison-background.jpeg",
      "/rainy-night-background.jpeg",
      "/flash-background.jpeg",
    ],
  },
  {
    name: "Adventure",
    movies: [
      "/flash-background.jpeg",
      "/poison-background.jpeg",
      "/rainy-night-background.jpeg",
      "/flash-background.jpeg",
    ],
  },
  {
    name: "Comedy",
    movies: [
      "/flash-background.jpeg",
      "/poison-background.jpeg",
      "/rainy-night-background.jpeg",
      "/flash-background.jpeg",
    ],
  },
  {
    name: "Drama",
    movies: [
      "/flash-background.jpeg",
      "/poison-background.jpeg",
      "/rainy-night-background.jpeg",
      "/flash-background.jpeg",
    ],
  },
  {
    name: "Horror",
    movies: [
      "/flash-background.jpeg",
      "/poison-background.jpeg",
      "/rainy-night-background.jpeg",
      "/flash-background.jpeg",
    ],
  },
  {
    name: "Horror",
    movies: [
      "/flash-background.jpeg",
      "/poison-background.jpeg",
      "/rainy-night-background.jpeg",
      "/flash-background.jpeg",
    ],
  },
  {
    name: "Horror",
    movies: [
      "/flash-background.jpeg",
      "/poison-background.jpeg",
      "/rainy-night-background.jpeg",
      "/flash-background.jpeg",
    ],
  },
  {
    name: "Horror",
    movies: [
      "/flash-background.jpeg",
      "/poison-background.jpeg",
      "/rainy-night-background.jpeg",
      "/flash-background.jpeg",
    ],
  },
];

const GenreSection: React.FC<{
  onClose: (value: boolean) => void;
}> = ({ onClose }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  // const router = useRouter();
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

  return (
    <section className="bg-black text-white py-10 px-4">
      <div className="container mx-auto">
        {/* Title Section */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-2">
            Explore our wide variety of categories
          </h2>
          <p className="text-gray-400">
            Browse our wide range of genres and uncover hidden gems tailored to
            your taste.
          </p>
        </div>

        {/* Scroll Buttons */}
        <div className="relative group">
          <div className="absolute left-0 top-0 bottom-0 flex items-center z-30">
            <button
              onClick={scrollLeft}
              className="p-2 bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-opacity-70 ml-2"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
          </div>

          <div className="absolute right-0 top-0 bottom-0 flex items-center z-30">
            <button
              onClick={scrollRight}
              className="p-2 bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-opacity-70 mr-2"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 scrollbar-hide py-4"
          >
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-neutral-950 border-[0.2px] border-gray-700 p-4 rounded-lg min-w-[240px] flex-shrink-0"
              >
                {/* Movie Cards */}
                <div className="grid grid-cols-2 gap-2">
                  {category.movies.map((movie, idx) => (
                    <button
                      onProgress={() => {
                        onClose(true);
                      }}
                      key={idx}
                      className="w-full hover:scale-110 transition ease-in-out h-24 bg-cover bg-center rounded-lg"
                      style={{ backgroundImage: `url(${movie})` }}
                    ></button>
                  ))}
                </div>

                <div className="flex justify-between mt-4">
                  <h3 className="text-sm mb-4">{category.name}</h3>
                  <button
                    onClick={() => {
                      // router.push({})
                    }}
                    className="text-white hover:underline"
                  >
                    →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenreSection;
