import { data } from "@/app/api/DummyData/data";
import { handleGetPostByGenre } from "@/app/api/PostApi/api";
import { Post } from "@/app/pages/Home/home.data";
import { UserAuth } from "@/useContext";
import { Spinner } from "@nextui-org/react";
import React, { useEffect, useState } from "react";


const TopShowsSection: React.FC<{ onClose: (value: boolean) => void }> = (
//   {
//   onClose,
// }
) => {
  const { posts } = UserAuth();
  const [selectedGenre, setSelectedGenre] = useState("comedy");
  const [selectedMovie, setSelectedMovie] = useState<Post | null>(posts[0]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [Posts, setPosts] = useState<Post[]>();
  const handleGetPost = async (genre: string) => {
    setIsLoading(true);
    handleGetPostByGenre(genre)
      .then((response) => {
        setPosts(response.data.post)
        setSelectedGenre(genre)
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
  }, [posts]);
  return (
    <section className="bg-black text-white py-10 px-4">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-6">Top 5 of the Week</h2>

        {/* Genres */}
        <div className="flex gap-4 mb-6">
          {data.slice(0, 3).map((genre) => (
            <button
              key={genre.name}
              onClick={() => handleGetPost(genre.name)}
              className={`px-4 py-2 rounded-full ${
                selectedGenre === genre.name
                  ? "bg-white text-black"
                  : "bg-gray-800 text-gray-400"
              }`}
            >
              {genre.name}
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row flex-wrap gap-6">
          {/* Left Grid */}
          <div className="flex-1 grid grid-cols-2 gap-2">
            {(selectedMovie || posts[0]) && (
              <>
                <div
                  className="h-60 bg-cover bg-center rounded-lg"
                  style={{
                    backgroundImage: `url(${
                      selectedMovie?.thumbnailUrl || posts[0].thumbnailUrl
                    })`,
                  }}
                ></div>
                <div
                  className="h-60 bg-cover bg-center rounded-lg"
                  style={{
                    backgroundImage: `url(${
                      selectedMovie?.thumbnailUrl || posts[0].thumbnailUrl
                    })`,
                  }}
                ></div>
                <div
                  className="h-60 bg-cover bg-center rounded-lg"
                  style={{
                    backgroundImage: `url(${
                      selectedMovie?.thumbnailUrl || posts[0].thumbnailUrl
                    })`,
                  }}
                ></div>
                <div
                  className="h-60 bg-cover bg-center rounded-lg"
                  style={{
                    backgroundImage: `url(${
                      selectedMovie?.thumbnailUrl || posts[0].thumbnailUrl
                    })`,
                  }}
                ></div>
              </>
            )}
          </div>

          {/* Right List */}
          <div className="flex-1">
            {isLoading && <Spinner color="white" size="sm" />}
            {Posts ?Posts.slice(0, 4).map((movie, index) => (
              <div
                key={movie.id}
                className={`p-4 rounded-lg mb-4 cursor-pointer ${
                  selectedMovie?.id === movie.id
                    ? "bg-gray-800 text-white"
                    : "bg-gray-700 text-gray-400"
                }`}
                onClick={() => setSelectedMovie(movie)}
              >
                <h3 className="font-bold">
                  #{index + 1} {movie.caption}
                </h3>
                <p className="text-sm">{/* {movie.genre.join(" | ")} */}</p>
              </div>
            )) :
              posts.slice(0, 4).map((movie, index) => (
                <div
                  key={movie.id}
                  className={`p-4 rounded-lg mb-4 cursor-pointer ${
                    selectedMovie?.id === movie.id
                      ? "bg-gray-800 text-white"
                      : "bg-gray-700 text-gray-400"
                  }`}
                  onClick={() => setSelectedMovie(movie)}
                >
                  <h3 className="font-bold">
                    #{index + 1} {movie.caption}
                  </h3>
                  <p className="text-sm">{/* {movie.genre.join(" | ")} */}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopShowsSection;
