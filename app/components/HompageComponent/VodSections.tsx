import React, { useState } from "react";

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
  // Add more movies as needed...
];

const VodSection: React.FC< { onClose: (value: boolean) => void;
}> = (
  // { onClose }

) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie>(movies[0]);

  return (
    <section
      className="relative bg-cover md:h-[600px] bg-center   text-white py-10 px-4"
      style={{
        backgroundImage: `url(${selectedMovie.background})`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60 bg-gradient-to-t from-black via-transparent to-black"></div>

      <div className="relative container mx-auto  justify-between h-full lg:justify-center flex flex-col lg:flex-row items-center lg:items-start">
        {/* Movie Details */}
        <div className="lg:w-1/2 flex flex-col items-start h-full justify-center z-10">
          <p className="text-sm text-gray-400 mb-2">Featured in MovieNest</p>
          <h1 className="text-4xl font-bold">{selectedMovie.title}</h1>
          <p className="text-gray-400 text-sm mt-2">
            {selectedMovie.rating} ★ | {selectedMovie.year} |{" "}
            {selectedMovie.duration} | {selectedMovie.genre}
          </p>
          <p className="mt-4 text-gray-300 max-w-md">
            {selectedMovie.description}{" "}
            <span className="text-red-500 cursor-pointer">See more</span>
          </p>
          <div className="flex items-center gap-4 mt-6">
            <button className="bg-red-600 text-white px-6 py-2 rounded-lg shadow hover:bg-red-700">
              Play Now
            </button>
            <button className="bg-gray-700 text-white px-6 py-2 rounded-lg shadow hover:bg-gray-600">
              Add Watchlist
            </button>
          </div>
        </div>

        {/* Movie Cards */}
        <div className="lg:w-1/2  h-full items-center  flex flex-wrap gap-4 justify-center  mt-8 lg:mt-0">
          {movies.map((movie, index) => (
            <div
              key={index}
              onClick={() => setSelectedMovie(movie)}
              className={`cursor-pointer bg-cover bg-center w-40 h-56 rounded-lg shadow-lg transition-transform transform ${
                selectedMovie.title === movie.title
                  ? "scale-110 border-4 border-red-500"
                  : "hover:scale-105"
              }`}
              style={{ backgroundImage: `url(${movie.poster})` }}
            >
              <div className="bg-black bg-opacity-60 p-2 rounded-b-lg">
                <p className="text-sm font-semibold">{movie.title}</p>
                <p className="text-xs text-gray-400">{movie.genre}</p>
                <p className="text-xs text-gray-400">{movie.rating} ★</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VodSection;
