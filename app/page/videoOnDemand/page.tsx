"use client";

import HomeLayoutWrapper from "@/app/layouts/HomeLayoutWrapper";
import React from "react";

// type data = {
//   name: string;
// };
function page() {

  // sports, lifestyle , documentaries, tech, news, films , fashion, tv shows, podcasts, personal development , adult education, health &fitness , comedy , tv series, kids entertainment, kids education, culture and tradition, international
  // const data: data[] = [
  //   {
  //     name: "sports",
  //   },
  //   {
  //     name: "lifestyle",
  //   },
  //   {
  //     name: "documentaries",
  //   },
  //   {
  //     name: "tech",
  //   },
  //   {
  //     name: "news",
  //   },
  //   {
  //     name: "films",
  //   },
  //   {
  //     name: "fashion",
  //   },
  //   {
  //     name: "tv shows",
  //   },
  //   {
  //     name: "podcasts",
  //   },
  //   {
  //     name: "personal development ",
  //   },
  //   {
  //     name: "adult education",
  //   },
  //   {
  //     name: "health & fitness",
  //   },
  //   {
  //     name: "comedy",
  //   },
  //   {
  //     name: "tv series",
  //   },
  //   {
  //     name: "kids entertainment",
  //   },
  //   {
  //     name: "kids education",
  //   },
  //   {
  //     name: "culture and tradition",
  //   },
  //   {
  //     name: "international",
  //   },
  // ];
  return (
    <HomeLayoutWrapper>
      {/* header */}
      <div
        style={{
          backgroundImage: `url('/backgrounds/moviesPosterBackground.jpg')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className="flex w-full h-[60vh]"
      >
        <div
          className={`w-full bg-black h-full  bg-opacity-60 flex md:flex-row    flex-col-reverse items-center justify-center gap-8 `}
        >
          <div className="w-full    px-6 md:px-14">
            <div className="md:w-96 gap-6 flex flex-col items-start justify-start  ">
              <p className="  font-bold">Captain Marvel</p>
              <div className="flex items-center gap-4">
                <div className="inline-block bg-yellow-700 rounded-lg px-4 text-sm">
                  HD
                </div>
                <p>9</p>
                <p>180min</p>
                <p>Biography</p>
                <p>Drama, History</p>
              </div>
              <p className="lg:text-lg">
                Captain Mar-Vell is an alien military officer of the Kree
                Imperial Militia sent to observe the planet Earth, as it is
                developing technology to travel into space.
              </p>
              <button className="px-4 bg-cyan-700 py-4 rounded inline-block">
                Watch Now
              </button>
            </div>
          </div>
        </div>
      </div>

     
    </HomeLayoutWrapper>
  );
}

export default page;
