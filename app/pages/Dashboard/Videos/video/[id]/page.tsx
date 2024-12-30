/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { handleGetSinglePost } from "@/app/api/PostApi/api";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Post } from "./video.types";
import Image from "next/image";
import { Spinner } from "@nextui-org/react";
import { formatDate } from "@/lib/utils/dateFormatter";
const Page = () => {
  const { id } = useParams();
  const [singlePost, setSinglePost] = useState<Post | null>(null);
  useEffect(() => {
    handleGetSinglePost(Number(id))
      .then((posts) => {
        setSinglePost(posts.data.post);
      })
      .catch(() => {});
  }, []);
  if (!id) {
    return <div>No Video Available</div>;
  }
  if (!singlePost)
    return (
      <div className="flex-1 flex justify-center">
        <Spinner color="white" />
      </div>
    );
  return (
    <div className="flex-1 p-4">
      <div className="grid grid-cols-12 gap-2">
        {/* videos */}
        <div className="col-span-12 lg:col-span-8 ">
          <div>
            <video
              src={singlePost?.videoUrl}
              className="w-full h-[500px] bg-gray-300"
              controls
            />
            <p className="text-xl font-bold">{singlePost?.caption}</p>
            <p className="text-sm font-light ">
              <span className="text-gray-500"> Details: </span>

              {singlePost?.content}
            </p>
            <div>
              <p className="text-sm font-light ">
                <span className="text-gray-500"> Number of Comments: </span>

                {singlePost?.commentCount}
              </p>
              <p className="text-sm font-light ">
                <span className="text-gray-500"> Number of Likes: </span>

                {singlePost?.likeCount}
              </p>
              <p className="text-sm font-light">
                <span className="text-gray-500"> Location: </span>
                {singlePost?.location}
              </p>
              <p className="text-sm font-light ">
                <span className="text-gray-500">Posted On: </span>{" "}
                {formatDate(singlePost?.createdAt)}
              </p>
            </div>
          </div>
        </div>
        {/* banner and thumbnail */}
        <div className="col-span-12 lg:col-span-4">
          {/* banner */}
          {singlePost?.bannerUrl && (
            <Image
              src={singlePost?.bannerUrl}
              width={200}
              height={200}
              alt="banner"
              className="w-full "
            />
          )}
          {/* banner */}
          {singlePost?.thumbnailUrl && (
            <Image
              src={singlePost?.thumbnailUrl}
              width={200}
              height={200}
              alt="banner"
              className="w-full"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
