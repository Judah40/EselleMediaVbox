"use client";

import LiveCard from "@/app/components/buttons/LiveCard";
import HomeLayoutWrapper from "@/app/layouts/HomeLayoutWrapper";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

function page() {
  // sports, lifestyle , documentaries, tech, news, films , fashion, tv shows, podcasts, personal development , adult education, health &fitness , comedy , tv series, kids entertainment, kids education, culture and tradition, international

  return (
    <HomeLayoutWrapper>
      {/* header */}
      <div
        style={{
          backgroundImage: `url('/backgrounds/moviesPosterBackground.jpg')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className="flex w-full h-[600px]"
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

      <div className="p-8">
        <div className="flex items-center gap-1">
          <p className="text-2xl font-semibold">Live Now</p>
          <Link href={{}} className="flex items-center gap-2 group ">
            <p className="text-cyan-500  text-sm hidden group-hover:block">
              View All
            </p>
            <ChevronRight color="#06b6d4" />{" "}
          </Link>
        </div>
        <div className=" grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2">
          <LiveCard />
          <LiveCard />
          <LiveCard />
          <LiveCard />
        </div>
      </div>
    </HomeLayoutWrapper>
  );
}

export default page;
