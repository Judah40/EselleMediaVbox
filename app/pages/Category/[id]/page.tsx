"use client";

import HomeLayoutWrapper from "@/app/layouts/HomeLayoutWrapper";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { handleGetPostByGenre } from "@/app/api/PostApi/api";
import { post } from "./category.types";
import PostCard from "@/app/components/Category/Fashion";
import SkeletonPageWrapper from "@/app/components/Category/wrapper";
import SportsDashboard from "@/app/components/Category/sports";
import Fashion from "@/app/components/Category/Fashion";
import Image from "next/image";

const Page = () => {
  const { id } = useParams() as { id: string };
  const [videos, setVideos] = useState<post[] | undefined>(undefined);
  const [isVideoLoading, setIsVideoLoading] = useState<boolean>(true);

  const header = (type: string) => {
    return (
      <div className="px-8 bg-gradient-to-r from-yellow-600 via-yellow-600 to-yellow-800 flex justify-between items-center">
        <h1 className="text-4xl font-semibold text-gray-100">
          {type.toUpperCase()}
        </h1>
        <Image src={`/badge/${type}.png`} alt={type} width={100} height={100} />
      </div>
    );
  };
  useEffect(() => {
    handleGetPostByGenre(id as string)
      .then((posts) => {
        setVideos(posts.data.post);
        console.log(posts.data.post);
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
          {/* Banner */}
          <div className="p-12" />

          {id && header(id as string)}
          {id === "sports" ? (
            <SportsDashboard />
          ) : id === "fashion" || "comedy" ? (
            <Fashion contentypeCard={videos} />
          ) : (
            <div className="flex-1 flex items-center justify-center">
              Nothing to show for this category
            </div>
          )}
        </>
      )}
    </HomeLayoutWrapper>
  );
};

export default Page;
