import { ChevronLeft, ChevronRight } from "lucide-react";
import LiveFootballCards from "../cards/FootballCard";
import { movies } from "@/app/api/DummyData/Movies";

// type Match = {
//   id: number;
//   title: string;
//   subtitle: string;
//   image: string;
// };

// const Matches: Match[] = [
//   {
//     id: 1,
//     title: "Barcelona vs Royal Antwerp",
//     subtitle: "Group Stage",
//     image: "/path-to-image-1.jpg",
//   },
//   {
//     id: 2,
//     title: "Newcastle United vs PSG",
//     subtitle: "Group Stage",
//     image: "/path-to-image-2.jpg",
//   },
//   {
//     id: 3,
//     title: "FC Bayern vs Manchester United",
//     subtitle: "Group Stage",
//     image: "/path-to-image-3.jpg",
//   },
// ];

const scroll = (direction: string) => {
  const container = document.getElementById("netflix-row");
  const scrollAmount = direction === "left" ? -800 : 800;
  container?.scrollBy({ left: scrollAmount, behavior: "smooth" });
};

export default function ChampionsLeague(
//   {
//   onClose,
// }: {
//   onClose: (value: boolean) => void;
// }
) {
  return (
    <div
      className="relative bg-cover bg-center h-[80vh] md:h-[600px]"
      style={{
        backgroundImage:
          "url(/backgrounds/tim-bechervaise-_hjsopbklZ0-unsplash.jpg)",
      }}
    >
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>

      {/* Content Section */}
      <div className="relative z-10 text-white px-8 py-16">
        {/* Title */}
        <h1 className="text-4xl font-bold">Sierra Leone League</h1>
        <p className="mt-4 max-w-lg text-lg">
          Watch the world-class matches presented in the 2023-2024 Sierra Leone
          Premier League.
        </p>

        {/* Match Cards */}
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
              <LiveFootballCards key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
