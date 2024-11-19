/* eslint-disable @next/next/no-img-element */
"use client";

import HomeLayoutWrapper from "@/app/layouts/HomeLayoutWrapper";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { handleGetPostByGenre } from "@/app/api/PostApi/api";
import { Post } from "./category.types";
import SkeletonCard from "../../Dashboard/(component)/Skeleton";
import Link from "next/link";
const Page = () => {
  const { id } = useParams();
  const [videos, setVideos] = useState<Post[] | null>(null);
  const [isLVideoLoading, setIsVideoLoading] = useState<boolean>(true);

  useEffect(() => {
    //+
    handleGetPostByGenre(id as string)
      .then((posts) => {
        console.log(posts.data.post);
        setVideos(posts.data.post);
        setIsVideoLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data);
        setVideos([]);
        setIsVideoLoading(false);
      }); //+
  }, [id]); //+
  return (
    <HomeLayoutWrapper>
      <div className="h-24 w-full bg-black" />
      <div className="p-4">
        <p className="text-3xl">{id}</p>
      </div>

      <section className="py-10 ">
        {isLVideoLoading ? (
          <SkeletonCard />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
            {videos &&
              videos.map((video, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 "
                >
                  <img
                    src={video.bannerUrl}
                    alt="videos"
                    className="rounded-t-lg w-full h-48 object-cover"
                  />
                  <div className="p-4 text-center">
                    <h3 className="text-lg text-black font-semibold mb-2">
                      {video.caption}
                    </h3>
                    <Link
                      href={`/pages/Dashboard/Videos/video/${video.id}`}
                      className="bg-[#189AA7] text-white px-4 py-2 rounded-lg hover:bg-[#F9ECE4] transition duration-400"
                    >
                      View More
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        )}
      </section>
    </HomeLayoutWrapper>
  );
};

export default Page;
