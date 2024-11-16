/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useEffect, useRef, useState } from "react";
import "react-chat-elements/dist/main.css";
// import Chatlist from "@/src/app/components/Chatlist";
import HomeLayoutWrapper from "@/app/layouts/HomeLayoutWrapper";
import SearchInput from "@/app/components/inputs/SearchInput";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { IoIosShareAlt } from "react-icons/io";
import Hls from "hls.js";
import { getCookie } from "@/app/api/config";
import { createSocketConnection } from "@/app/api/WebSocketApi/socketApi";
import { userAuth } from "@/useContext";
import Image from "next/image";
import {
  handleGetAllComments,
  handleGetStreamData,
  handleLikeLive,
  handleSendComment,
} from "@/app/api/messageApi/message";
import { aboutLive, commentType, data } from "@/app/types/watch.page";
import { Spinner } from "@nextui-org/react";
import { MdSearchOff } from "react-icons/md";
import { CopyToClipboard } from "react-copy-to-clipboard";

const page = () => {
  const { username, userProfilePicture } = userAuth();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const videoRef = useRef<HTMLVideoElement>(null);
  const [tokens, setToken] = useState<string>();
  const [socket, setSocket] = useState<unknown>(null);
  const [message, setMessage] = useState<string>("");
  const [comments, setComments] = useState<commentType[]>([]);
  const [aboutStream, setAboutStream] = useState<aboutLive | null>(null);
  const [videoIsPlaying, setVideoIsPlaying] = useState<boolean>(false);
  // const [inputValue, setInputValue] = useState<string>(""); // State for input value

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    getToken();

    if (videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        const video = videoRef.current;
        const hlsUrl = `http://localhost:8000/live/7267baed-6211-46f4-b3d4-134f22a8921c/index.m3u8`;

        hls.loadSource(hlsUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play();
          setVideoIsPlaying(true);
        });

        return () => {
          hls.destroy();
        };
      } else if (
        videoRef.current.canPlayType("application/vnd.apple.mpegurl")
      ) {
        videoRef.current.src = `http://localhost:8000/live/7267baed-6211-46f4-b3d4-134f22a8921c/index.m3u8`;
        videoRef.current.addEventListener("loadedmetadata", () => {
          if (videoRef.current) {
            videoRef.current.play();
            setVideoIsPlaying(true);
          }
        });
      }
    }
  }, []);

  const getToken = async () => {
    const token = await getCookie("token");
    setToken(token);
  };

  useEffect(() => {
    //GET ALL COMMENTS
    handleGetAllComments("157f2eba-7751-4336-872a-b834c5d39840")
      .then((comments) => {
        console.log(comments.data.data);
        setComments(comments.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    handleGetStreamData("157f2eba-7751-4336-872a-b834c5d39840")
      .then((data) => {
        console.log(data.data.data);
        setAboutStream(data.data.data);
      })
      .catch((error) => {
        console.log(error);
        setAboutStream({
          commentCount: 0,
          description: "",
          title: "",
          likeCount: 0,
          liveId: "",
          location: "",
          tags: [],
        });
      });
    if (tokens) {
      const socketInstance = createSocketConnection(tokens);
      setSocket(socketInstance);

      return () => {
        socketInstance.disconnect();
      };
    }
  }, [tokens]);

  const handleSendMessage = async () => {
    if (message.trim() && socket) {
      const chatMessage: commentType = {
        comment: message,
        createAt: new Date().toISOString(),
        liveId: "157f2eba-7751-4336-872a-b834c5d39840",
        updatedAt: new Date().toISOString(),
        userId: null,
        id: null,
      };

      const data: data = {
        comment: message,
        liveId: "157f2eba-7751-4336-872a-b834c5d39840",
      };
      await handleSendComment(data)
        .then((Response) => {
          setComments((previousComments) => [...previousComments, chatMessage]);
          setMessage("");
        })
        .catch((err) => {
          alert("Error sending message");
        });
    }
  };

  if (!aboutStream) {
    return (
      <HomeLayoutWrapper>
        <div className="h-24"></div>
        <div className="flex-1 flex justify-center flex-col items-center">
          <Spinner color="white" />
          <p>Loading...</p>
        </div>
      </HomeLayoutWrapper>
    );
  }
  if (aboutStream.title === "") {
    return (
      <HomeLayoutWrapper>
        <div className="h-24"></div>
        <div className="items-center flex justify-center flex-col gap-4 flex-1 h-screen">
          <MdSearchOff color="red" size={40} />
          <p className="text-2xl text-center">No stream found</p>
        </div>
      </HomeLayoutWrapper>
    );
  }
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
          <div className="col-span-1 lg:col-span-2 p-4 h-[400px] md:h-[500px] relative">
            <video ref={videoRef} controls autoPlay className="w-full h-full" />
            {/* Overlay text */}
            {!videoIsPlaying && (
              <div className="absolute top-0 bg-gray-500 bg-opacity-20 left-0 w-full h-full flex flex-col items-center justify-center text-white text-2xl font-bold">
                <Spinner color="white" />
                <p>Please Wait...</p>
              </div>
            )}
            {/* video details */}
            <div className=" justify-center flex md:justify-start  w-full ">
              {/* title && description */}
              <div className=" items-center flex md:items-start ">
                <p className="font-bold text-2xl ">{aboutStream?.title}</p>
              </div>
            </div>
            {/* views && likes */}
            <div className="flex-1 md:justify-end justify-center flex gap-4 items-center p-4">
              {/* likes */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    handleLikeLive("157f2eba-7751-4336-872a-b834c5d39840");
                    handleGetStreamData("157f2eba-7751-4336-872a-b834c5d39840")
                      .then((data) => {
                        console.log(data.data.data);
                        setAboutStream(data.data.data);
                      })
                      .catch((error) => {
                        console.log(error);
                        setAboutStream({
                          commentCount: 0,
                          description: "",
                          title: "",
                          likeCount: 0,
                          liveId: "",
                          location: "",
                          tags: [],
                        });
                      });
                  }}
                >
                  <ThumbsUp />
                </button>
                <p className="text-xs">{aboutStream?.likeCount} likes</p>
              </div>
              {/* dislikes */}
              {/* <div className="flex items-center gap-2">
                <button>
                  <ThumbsDown />
                </button>
                <p className="text-xs">1.2k dislikes</p>
              </div> */}
              {/* share */}
              <CopyToClipboard
                text={`http://localhost:3000/pages/Live/${"157f2eba-7751-4336-872a-b834c5d39840"}`}
                onCopy={() => {
                  alert("Copy to clipboard");
                }}
              >
                <button className="flex border-[0.2px] border-gray-400 rounded-full px-4 bg-gray-600 hover:bg-gray-700 py-1 gap-2 items-center justify-center">
                  <IoIosShareAlt size={18} />
                  <p className="text-xs">Share</p>
                </button>
              </CopyToClipboard>
            </div>
          </div>
          {/* chat section */}

          <div className="col-span-1 lg:col-span-1 lg:h-[600px] h-[400px] flex flex-col lg:border-l border-white">
            <div className="px-4">
              <p>
                <span className="text-lg font-bold">
                  {comments.length} Comments
                </span>
              </p>
            </div>
            <div className="flex-1 pt-4 overflow-y-auto flex-col gap-4 inline-flex scrollbar-hide px-4">
              {/* <Chatlist /> */}
              {comments.map((msg, index) => (
                <div
                  key={index}
                  className="bg-white p-2  text-gray-600 gap-8 rounded-lg"
                >
                  <div className=" flex items-center gap-2 w-80">
                    {userProfilePicture && (
                      <Image
                        src={userProfilePicture}
                        alt="profile picture"
                        width={30}
                        height={30}
                        className="rounded-full"
                      />
                    )}
                    <p className="font-bold text-sm">{username?.firstName}</p>
                  </div>
                  <div className="flex">
                    <div className="flex-1">
                      <p className="text-sm font-light">{msg.comment}</p>
                    </div>

                    <p className="text-xs">{msg.createAt}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Input and Button Section */}
            <div className="flex items-center p-2">
              <input
                type="text"
                className="flex-1 p-2 border border-gray-300 rounded-lg text-gray-500"
                placeholder="Type a message..."
                aria-multiline
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (
                    (e.key === "return" || e.key === "Enter") &&
                    message.trim()
                  ) {
                    handleSendMessage();
                    setMessage("");
                  }
                }}
              />
              <button
                onClick={handleSendMessage}
                className="ml-2 px-4 py-2 bg-blue-500  text-white rounded-lg"
              >
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
