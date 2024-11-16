/* eslint-disable @next/next/no-img-element */
"use client";
import { CircleX, HardDriveUpload, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { DatePicker, Select, SelectItem } from "@nextui-org/react";
import { data } from "@/app/api/DummyData/data";
import VideoForm from "../(component)/Forms/videoForm/videoForm";
import { handleGetAllPosts } from "@/app/api/PostApi/api";
import { PostVideoData } from "./videos.types";
import Link from "next/link";

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [vidoesPosted, setVideoPosted] = useState<PostVideoData[]>([]);
  ////////////////////////////////////////////////////////////////////////
  //GET ALL VIDEOS
  useEffect(() => {
    handleGetAllPosts()
      .then((values) => {
        console.log(values.post);
        const { post } = values;
        setVideoPosted(post);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="flex-1">
      {/* video uploading Modal Opening  */}
      {isOpen && (
        <div className="inset-0 z-50 bg-black overflow-y-auto md:justify-center items-center flex flex-col fixed w-full flex-1 bg-opacity-50">
          <div className="bg-black flex border w-11/12 lg:w-6/12 border-gray-700 shadow shadow-white items-center flex-col py-12 rounded">
            <div className="w-11/12 font-bold flex items-center py-4">
              <p className="text-xl">Go LIve</p>
              <div className="flex-1 flex justify-end">
                <button
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  <CircleX color="red" />
                </button>
              </div>
            </div>

            <VideoForm isComplete={setIsOpen} />
          </div>
        </div>
      )}

      <div className="flex-1  flex items-center w-full  p-4">
        <div>
          <p className="md:text-2xl font-bold">Videos</p>
          <p className="text-sm">Upload and View Videos here</p>
        </div>
        {/* upload */}
        <div className="flex-1 justify-end flex">
          <button
            onClick={() => {
              setIsOpen(true);
            }}
            className="md:px-4 md:py-2 px-2 py-1 bg-white flex rounded items-center text-sm gap-2"
          >
            <HardDriveUpload color="black" />{" "}
            <p className="text-black text-xs">Upload Video</p>
          </button>
        </div>
      </div>
      <div className="p-3 flex lg:gap-2 gap-6 w-full  items-center  lg:flex-row flex-col">
        {/* search bar  */}
        <div className="flex flex-1 w-full ">
          <input className="flex-1 p-3 rounded-l" />
          <button className="bg-black rounded-r border border-gray-700 hover:bg-gray-800 px-6">
            <Search />
          </button>
        </div>

        {/* filter */}
        <div className="flex  items-center gap-2 justify-center">
          {/* genre dropdown */}
          <Select
            items={data}
            label="Select Genre"
            placeholder="Select an animal"
            className="w-52 text-black"
          >
            {(values) => (
              <SelectItem key={values.name} className="text-black">
                {values.name}
              </SelectItem>
            )}
          </Select>
          {/* date picker */}
          <DatePicker label="Birth date" className="w-52 text-white" />
        </div>
      </div>
      {/* body */}
      <div className="grid  grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
        {vidoesPosted.map((video, index) => (
          <div
            key={index}
            className="rounded-lg bg-white  flex flex-col items-center justify-center h-64 w-full sm:w-48 md:w-56 lg:w-64"
          >
            <img
              className="object-cover w-full h-4/6"
              src={video.thumbnailUrl}
              alt="thumbnail"
            />
            <div>
              <p className="text-sm text-gray-600">{video.caption}</p>
            </div>
            <Link
              href={{
                pathname: `/pages/Dashboard/Videos/video/${video.id}`,
              }}
              className="w-11/12 p-2 rounded hover:bg-cyan-600 bg-cyan-500"
            >
              View More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
