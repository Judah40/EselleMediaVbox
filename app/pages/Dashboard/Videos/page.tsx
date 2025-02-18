"use client";

import React, { useEffect, useState } from "react";
import { CircleX, HardDriveUpload, Search } from "lucide-react";
import VideoForm from "../(component)/Forms/videoForm/videoForm";
import { handleGetAllPosts } from "@/app/api/PostApi/api";
import { PostVideoData } from "./videos.types";
import Link from "next/link";
import SkeletonCard from "../(component)/Skeleton";

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [videosPosted, setVideosPosted] = useState<PostVideoData[]>([]);
  const [isVideoLoading, setIsVideoLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  // const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  // const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Fetch all videos
  useEffect(() => {
    handleGetAllPosts()
      .then((values) => {
        setVideosPosted(values.post);
        setIsVideoLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching videos:", error);
        setIsVideoLoading(false);
      });
  }, []);

  // Filter logic
  const filteredVideos = videosPosted.filter((video) => {
    const matchesSearch = searchTerm
      ? video.caption.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    // const matchesGenre = selectedGenre
    //   ? JSON.parse(video.tags[0]).includes(selectedGenre)
    //   : true;
    // const matchesDate = selectedDate
    //   ? new Date(video.uploadDate).toDateString() ===
    //     selectedDate.toDateString()
    //   : true;

    return matchesSearch 
  });

  return (
    <div className="flex-1">
      {/* Modal for uploading video */}
      {isOpen && (
        <div className="inset-0 z-50 bg-black overflow-y-auto md:justify-center items-center flex flex-col fixed w-full flex-1 bg-opacity-50">
          <div className="bg-black flex border w-11/12 lg:w-6/12 border-gray-700 shadow shadow-white items-center flex-col py-12 rounded">
            <div className="w-11/12 font-bold flex items-center py-4">
              <p className="text-xl">Upload Video</p>
              <div className="flex-1 flex justify-end">
                <button onClick={() => setIsOpen(false)}>
                  <CircleX color="red" />
                </button>
              </div>
            </div>
            <VideoForm isComplete={setIsOpen} />
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex-1 flex items-center w-full p-4">
        <div>
          <p className="md:text-2xl font-bold">Videos</p>
          <p className="text-sm">Upload and View Videos here</p>
        </div>
        <div className="flex-1 justify-end flex">
          <button
            onClick={() => setIsOpen(true)}
            className="md:px-4 md:py-2 px-2 py-1 bg-white flex rounded items-center text-sm gap-2"
          >
            <HardDriveUpload color="black" />
            <p className="text-black text-xs">Upload Video</p>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="p-3 flex lg:gap-2 gap-6 w-full items-center lg:flex-row flex-col">
        <div className="flex flex-1 w-full">
          <input
            className="flex-1 p-3 rounded-l text-black"
            type="text"
            placeholder="Search videos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="bg-black rounded-r border border-gray-700 hover:bg-gray-800 px-6">
            <Search />
          </button>
        </div>
        {/* <div className="flex items-center gap-2 justify-center">
          <Select
            items={dummyData}
            label="Select Genre"
            placeholder="Select a genre"
            className="w-52 text-black"
            selectedKey={selectedGenre}
            onSelectionChange={(key) => setSelectedGenre(key as string)}
          >
            {(values) => (
              <SelectItem key={values.name} className="text-black">
                {values.name}
              </SelectItem>
            )}
          </Select>
          <DatePicker
            label="Upload Date"
            className="w-52 text-white"
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date as Date)}
          />
        </div> */}
      </div>

      {/* Body */}
      <section className="py-10">
        {isVideoLoading ? (
          <SkeletonCard />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
            {filteredVideos.map((video, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300"
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
    </div>
  );
};

export default Page;
