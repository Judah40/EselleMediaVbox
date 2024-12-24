import { movie } from "@/app/api/DummyData/Movies";
import { handleGetAllPosts } from "@/app/api/PostApi/api";
import { UserAuth } from "@/useContext";
import React, { useEffect, useState } from "react";

const ShowsSection: React.FC<{ onClose: (value: boolean) => void }> = ({
  onClose,
}) => {
  const [values, setValues] = useState();
  const { posts } = UserAuth();

  return (
    <section className="bg-neutral-950 text-white py-10 px-4 ">
      <div className="px-4 mx-auto container">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-2">Shows</h2>
          <p className="text-gray-400">
            Get your latest shows on Vbox. with a wide range of options
            available at your comfort
          </p>
        </div>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide ">
          {posts.map((movie, index) => (
            <button
              onClick={() => {
                // onClose(true);
                //
              }}
              key={index}
              className="min-w-[200px] z-20 flex-shrink-0 bg-gray-800 rounded-lg shadow-lg hover:scale-105 transition-transform"
            >
              <div
                className="h-60 bg-cover bg-center rounded-t-lg"
                style={{ backgroundImage: `url(${movie.bannerUrl})` }}
              ></div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">{movie.caption}</h3>
                <div className="flex items-center  justify-center gap-1">
                  {JSON.parse(movie.tags[0])
                    .slice(0, 2)
                    .map((values, index) => {
                      return (
                        <p key={index} className="text-sm text-gray-400">
                          {values}
                        </p>
                      );
                    })}
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
