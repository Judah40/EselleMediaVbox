"use client";

import HomeLayoutWrapper from "@/app/layouts/HomeLayoutWrapper";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { handleGetPostByGenre } from "@/app/api/PostApi/api";
import { Post } from "./category.types";
import PostCard from "@/app/components/Category/card";
import SkeletonPageWrapper from "@/app/components/Category/wrapper";

const Page = () => {
  const { id } = useParams();
  const [videos, setVideos] = useState<Post[] | null>(null);
  const [isVideoLoading, setIsVideoLoading] = useState<boolean>(true);

  useEffect(() => {
    handleGetPostByGenre(id as string)
      .then((posts) => {
        setVideos(posts.data.post);
        setIsVideoLoading(false);
      })
      .catch(() => {
        setVideos([]);
        setIsVideoLoading(false);
      });
  }, [id]);

  return (
    <HomeLayoutWrapper>
      {isVideoLoading ? (
        <SkeletonPageWrapper />
      ) : (
        <>
          <div className="h-24 w-full bg-black" />
          <div className="p-4">
            <p className="text-3xl">{id}</p>
          </div>

          <section className="py-10">
            <div className="relative">
              <div className="overflow-x-auto pb-6">
                <div className="flex gap-4 px-4">
                  {videos?.map((video, index) => (
                    <div key={index} className="min-w-[280px] w-[280px]">
                      <PostCard post={video} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </HomeLayoutWrapper>
  );
};

export default Page;