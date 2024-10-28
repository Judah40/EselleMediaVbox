"use client";

import React from "react";
import ReactPlayer from "react-player";
import "react-chat-elements/dist/main.css";
import Chatlist from "@/src/app/components/Chatlist";
import HomeLayoutWrapper from "@/src/app/layouts/HomeLayoutWrapper";
import SearchInput from "@/src/app/components/inputs/SearchInput";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { IoIosShareAlt } from "react-icons/io";

const page = () => {
  return (
    <HomeLayoutWrapper>
      <div className="h-24"></div>
      <div className="w-full p-6 ">
        <div>
          <SearchInput />
        </div>
      </div>
      <div className="w-full flex-1 ">
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:h-[600px] h-[1000px] ">
          {/* video player */}
          <div className="col-span-1 lg:col-span-2 p-4 h-[400px] md:h-[500px]">
            <ReactPlayer
              controls
              light
              pip
              width="100%"
              height="100%"
              url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
              style={{
                border: 1,
                borderColor: "white",
              }}
            />
            {/* video details */}
            <div className=" justify-center flex md:justify-start  w-full ">
              {/* title && description */}
              <div className=" items-center flex md:items-start ">
                <p className="font-bold text-2xl ">
                  Snake in the Monkey Shadow
                </p>
              </div>
            </div>
            {/* views && likes */}
            <div className="flex-1 md:justify-end justify-center flex gap-4 items-center p-4">
              {/* likes */}
              <div className="flex items-center gap-2">
                <button>
                  <ThumbsUp />
                </button>
                <p className="text-xs">1.2k likes</p>
              </div>
              {/* dislikes */}
              <div className="flex items-center gap-2">
                <button>
                  <ThumbsDown />
                </button>
                <p className="text-xs">1.2k dislikes</p>
              </div>
              {/* share */}
              <button className="flex border rounded-full px-2 gap-2 items-center justify-center">
                <IoIosShareAlt size={18} />
                <p className="text-xs">Share</p>
              </button>
            </div>
          </div>
          {/* chat section */}
          <div className="col-span-1 lg:col-span-1 lg:h-[600px] h-[400px] flex flex-col lg:border-l border-white">
            <div className="px-4">
              <p>
                <span className="text-lg font-bold">277 Comments</span>
              </p>
            </div>
            <div className="flex-1 pt-4 overflow-y-auto scrollbar-hide">
              <Chatlist />
            </div>
            {/* Input and Button Section */}
            <div className="flex items-center p-2">
              <input
                type="text"
                className="flex-1 p-2 border border-gray-300 rounded-lg text-gray-500"
                placeholder="Type a message..."
                aria-multiline
              />
              <button className="ml-2 px-4 py-2 bg-blue-500  text-white rounded-lg">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </HomeLayoutWrapper>
  );
};

export default page;
