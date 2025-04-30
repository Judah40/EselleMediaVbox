"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Plus,
  Star,
  Info,
  Clock,
  Calendar,
  TrendingUp,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface Movie {
  title: string;
  year: number;
  duration: string;
  genre: string;
  rating: number;
  description: string;
  poster: string;
  background: string;
}

const movies: Movie[] = [
  {
    title: "The Flash (2023)",
    year: 2024,
    duration: "1 hour 55 minutes",
    genre: "Fantasy | Action",
    rating: 4.2,
    description:
      "Barry Allen, a forensic scientist with the Central City Police Department, is struck by lightning during a particle accelerator explosion, gaining superhuman speed. As The Flash, Barry uses his newfound powers to protect his city from metahuman threats.",
    poster: "/flash-poster.jpeg",
    background: "/flash-background.jpeg",
  },
  {
    title: "Rainy Night",
    year: 2023,
    duration: "2 hours",
    genre: "Fantasy | Action",
    rating: 4.5,
    description:
      "A gripping tale of survival on a stormy night that tests the limits of human endurance.",
    poster: "/rainy-night-poster.jpeg",
    background: "/rainy-night-background.jpeg",
  },
  {
    title: "Poison",
    year: 2022,
    duration: "1 hour 30 minutes",
    genre: "Fantasy | Action",
    rating: 4.2,
    description:
      "A thrilling journey of revenge and survival in a toxic world.",
    poster: "/poison-poster.jpeg",
    background: "/poison-background.jpeg",
  },
  // Additional movies for a more complete experience
  {
    title: "Midnight Echo",
    year: 2023,
    duration: "2 hours 15 minutes",
    genre: "Thriller | Mystery",
    rating: 4.7,
    description:
      "When a strange phenomenon causes echoes of the past to manifest at midnight, a detective must solve a decades-old mystery before time itself unravels.",
    poster: "/midnight-echo-poster.jpeg",
    background: "/midnight-echo-background.jpeg",
  },
  {
    title: "Emerald Horizon",
    year: 2024,
    duration: "1 hour 48 minutes",
    genre: "Sci-Fi | Adventure",
    rating: 4.3,
    description:
      "On a distant planet with emerald skies, colonists discover an ancient alien technology that might be their salvation—or humanity's doom.",
    poster: "/emerald-horizon-poster.jpeg",
    background: "/emerald-horizon-background.jpeg",
  },
];

// Placeholder backdrop component for movies without backgrounds
const ImageWithFallback = ({
  src,
  alt = "",
  className = "",
}: {
  src: string;
  alt: string;
  className: string;
}) => {
  const [error, setError] = useState(false);

  return (
    <div className={`${className} overflow-hidden`}>
      {error ? (
        <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
          <span className="text-gray-500 text-sm">Image unavailable</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={() => setError(true)}
          loading="lazy"
        />
      )}
    </div>
  );
};

// Rating stars component
const RatingStars = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star
          key={`full-${i}`}
          className="w-3 h-3 text-amber-400"
          fill="currentColor"
          strokeWidth={0}
        />
      ))}

      {hasHalfStar && (
        <div className="relative">
          <Star
            className="w-3 h-3 text-gray-500"
            fill="currentColor"
            strokeWidth={0}
          />
          <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
            <Star
              className="w-3 h-3 text-amber-400"
              fill="currentColor"
              strokeWidth={0}
            />
          </div>
        </div>
      )}

      {[...Array(emptyStars)].map((_, i) => (
        <Star
          key={`empty-${i}`}
          className="w-3 h-3 text-gray-500"
          fill="currentColor"
          strokeWidth={0}
        />
      ))}

      <span className="ml-1 text-xs font-medium">{rating.toFixed(1)}</span>
    </div>
  );
};

const VodSection: React.FC = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie>(movies[0]);
  const [isChanging, setIsChanging] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [genres, setGenres] = useState<string[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>("All");

  // Extract unique genres on component mount
  useEffect(() => {
    const allGenres = movies.flatMap((movie) =>
      movie.genre.split("|").map((g) => g.trim())
    );
    const uniqueGenres = Array.from(new Set(allGenres));
    setGenres(["All", ...uniqueGenres]);
  }, []);

  // Handle movie selection with smooth transition
  const handleSelectMovie = (movie: Movie, index: number) => {
    if (movie.title === selectedMovie.title) return;

    setIsChanging(true);
    setActiveIndex(index);

    setTimeout(() => {
      setSelectedMovie(movie);
      setIsChanging(false);
    }, 300);
  };

  // Scroll carousel by a fixed amount
  const scrollCarousel = (direction: "left" | "right") => {
    if (!carouselRef.current) return;

    const scrollAmount = direction === "left" ? -230 : 230;
    carouselRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  // Filter movies by selected genre
  const filteredMovies =
    selectedGenre === "All"
      ? movies
      : movies.filter((movie) => movie.genre.includes(selectedGenre));

  return (
    <section className="relative overflow-hidden bg-black text-white">
      {/* Dynamic background with transition effect */}
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-in-out"
        style={{ opacity: isChanging ? 0 : 1 }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${selectedMovie.background})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent"></div>
      </div>

      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{ backgroundImage: "url(/noise.png)" }}
      ></div>

      {/* Content container */}
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-20 min-h-[700px] md:min-h-[600px] flex flex-col">
        {/* Featured label */}
        <div className="flex items-center space-x-2 mb-6">
          <TrendingUp className="w-4 h-4 text-red-500" />
          <div className="text-sm uppercase tracking-wider text-gray-400 font-medium">
            Featured on MovieNest
          </div>
        </div>

        {/* Main content area */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-16">
          {/* Movie details - Left side */}
          <div className="w-full md:w-7/12 lg:w-1/2 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedMovie.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Title with year */}
                <div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500">
                    {selectedMovie.title}
                  </h1>
                </div>

                {/* Meta information */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-300">
                  <RatingStars rating={selectedMovie.rating} />

                  <div className="w-1 h-1 rounded-full bg-gray-600"></div>

                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1.5" />
                    <span>{selectedMovie.year}</span>
                  </div>

                  <div className="w-1 h-1 rounded-full bg-gray-600"></div>

                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1.5" />
                    <span>{selectedMovie.duration}</span>
                  </div>

                  <div className="w-1 h-1 rounded-full bg-gray-600"></div>

                  <div className="px-2 py-0.5 rounded-sm bg-red-600/20 border border-red-600/30 text-red-400 text-xs">
                    {selectedMovie.genre}
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 max-w-xl leading-relaxed">
                  {selectedMovie.description}
                  <button className="ml-1 text-red-500 hover:text-red-400 transition-colors font-medium">
                    Read more
                  </button>
                </p>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-4 pt-2">
                  <button className="flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 rounded-lg hover:from-red-500 hover:to-red-600 transition-all shadow-lg shadow-red-900/30 group">
                    <Play
                      className="w-5 h-5 mr-2 transform group-hover:scale-110 transition-transform"
                      fill="currentColor"
                    />
                    <span className="font-medium">Play Now</span>
                  </button>

                  <button className="flex items-center px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg hover:bg-white/15 transition-all">
                    <Plus className="w-5 h-5 mr-2" />
                    <span className="font-medium">My List</span>
                  </button>

                  <button className="flex items-center p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg hover:bg-white/15 transition-all">
                    <Info className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Movie carousel - Right side */}
          <div className="w-full md:w-5/12 lg:w-1/2 flex flex-col">
            {/* Genre filter tabs */}
            <div className="mb-6 overflow-x-auto hide-scrollbar">
              <div className="flex space-x-3 pb-2">
                {genres.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => setSelectedGenre(genre)}
                    className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                      selectedGenre === genre
                        ? "bg-red-600 text-white"
                        : "bg-white/10 text-gray-400 hover:bg-white/15"
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            {/* Movie cards carousel with navigation */}
            <div className="relative group">
              {/* Navigation buttons */}
              <button
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-black/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                onClick={() => scrollCarousel("left")}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-black/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                onClick={() => scrollCarousel("right")}
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Cards container */}
              <div
                ref={carouselRef}
                className="flex overflow-x-auto pb-6 gap-4 hide-scrollbar"
              >
                {filteredMovies.map((movie, index) => (
                  <div
                    key={movie.title}
                    onClick={() => handleSelectMovie(movie, index)}
                    className={`relative flex-shrink-0 cursor-pointer group/card transition-all duration-300 ${
                      activeIndex === index
                        ? "w-44 h-72"
                        : "w-40 h-64 opacity-70 hover:opacity-100"
                    }`}
                  >
                    {/* Card with gradient overlay */}
                    <div
                      className={`
                      absolute inset-0 rounded-xl overflow-hidden transition-all duration-500
                      ${
                        activeIndex === index
                          ? "ring-2 ring-red-500 shadow-lg shadow-red-900/40"
                          : ""
                      }
                    `}
                    >
                      <ImageWithFallback
                        src={movie.poster}
                        alt={movie.title}
                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover/card:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                    </div>

                    {/* Movie info with play button */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 flex flex-col">
                      <div
                        className={`
                        flex items-center justify-center w-10 h-10 rounded-full bg-red-600 mb-3 
                        opacity-0 group-hover/card:opacity-100 transition-opacity duration-300
                        ${activeIndex === index ? "opacity-100" : ""}
                        self-center transform translate-y-2 group-hover/card:translate-y-0 transition-all
                      `}
                      >
                        <Play className="w-5 h-5" fill="currentColor" />
                      </div>

                      <h3 className="font-medium text-sm truncate">
                        {movie.title}
                      </h3>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-400">
                          {movie.year}
                        </span>
                        <div className="flex items-center">
                          <Star
                            className="w-3 h-3 text-amber-400 mr-1"
                            fill="currentColor"
                          />
                          <span className="text-xs">{movie.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VodSection;
