"use client";

import React, { useEffect, useState } from "react";
import { ThumbsUp, ThumbsDown, Share, MessageSquare } from "lucide-react";
import ReactPlayer from "react-player";
import HomeLayoutWrapper from "@/app/layouts/HomeLayoutWrapper";
import {
  handleGetPostByGenre,
  handleGetSinglePost,
} from "@/app/api/PostApi/api";
import { useParams } from "next/navigation";
import { Post } from "../../Home/home.data";
import { post } from "../../Category/[id]/category.types";
import { formatDate } from "@/lib/utils/dateFormatter";
import VideoPlayerSkeleton from "./VideoPlayerSkeleton ";
const VideoPlayer = () => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [comment, setComment] = useState("");

  const handleLike = () => {
    setLiked(!liked);
    if (disliked) setDisliked(false);
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    if (liked) setLiked(false);
  };

  const comments = [
    {
      id: 1,
      user: "User123",
      comment: "Great video!",
      likes: 45,
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      user: "VideoFan",
      comment: "Very informative!",
      likes: 32,
      timestamp: "5 hours ago",
    },
  ];

  const { id } = useParams();
  const [singlePost, setSinglePost] = useState<Post>();
  const [videos, setVideos] = useState<post[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleGetSinglePostOnly = async (id: number) => {
    setIsLoading(true);

    await handleGetSinglePost(Number(id))
      .then((response) => {
        const arr = JSON.parse(response.data.post.tags[0]);
        handleGetPostByGenre(arr[0])
          .then((response) => {
            setVideos(response.data.post);
          })
          .catch(() => {})
          .finally(() => {
            setIsLoading(false);
          });
        setSinglePost(response.data.post);
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    // Fetch data from an API
    handleGetSinglePostOnly(Number(id));
  }, [id]);

  return (
    <HomeLayoutWrapper>
      {isLoading ? (
        <VideoPlayerSkeleton />
      ) : (
        // Your existing JSX
        <div className="min-h-screen bg-black text-gray-100 ">
          {/* Banner Section */}
          <div className="w-full bg-gradient-to-r  p-8  text-white text-center"></div>

          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Video Section */}
              <div className="lg:col-span-2">
                {/* Video Player */}
                <div className="aspect-video bg-gray-800 rounded-lg mb-4">
                  <ReactPlayer
                    url={singlePost?.videoUrl}
                    width="640"
                    height="360"
                    controls
                  />
                </div>

                {/* Video Info */}
                <div className="mb-4">
                  <h1 className="text-2xl font-bold mb-2">
                    {singlePost?.caption}
                  </h1>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span>125K views</span>
                      <span>2 days ago</span>
                    </div>
                    <div className="flex items-center space-x-6">
                      <button
                        onClick={handleLike}
                        className={`flex items-center space-x-1 ${
                          liked ? "text-blue-500" : ""
                        }`}
                      >
                        <ThumbsUp className="w-5 h-5" />
                        <span>{singlePost?.likeCount}</span>
                      </button>
                      <button
                        onClick={handleDislike}
                        className={`flex items-center space-x-1 ${
                          disliked ? "text-blue-500" : ""
                        }`}
                      >
                        <ThumbsDown className="w-5 h-5" />
                      </button>
                      <button className="flex items-center space-x-1">
                        <Share className="w-5 h-5" />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Comments Section */}
                <div className="mt-6">
                  <h3 className="text-xl font-bold mb-4">Comments</h3>
                  <div className="flex items-center space-x-2 mb-6">
                    <input
                      type="text"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Add a comment..."
                      className="flex-1 bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700">
                      Comment
                    </button>
                  </div>

                  {/* Comment List */}
                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <div key={comment.id} className="flex space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gray-700" />
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{comment.user}</span>
                            <span className="text-gray-400 text-sm">
                              {comment.timestamp}
                            </span>
                          </div>
                          <p className="mt-1">{comment.comment}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <button className="flex items-center space-x-1 text-gray-400 hover:text-gray-300">
                              <ThumbsUp className="w-4 h-4" />
                              <span>{comment.likes}</span>
                            </button>
                            <button className="text-gray-400 hover:text-gray-300">
                              <MessageSquare className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Suggested Videos Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold mb-4">More </h3>
                {videos &&
                  videos.map((video) => (
                    <div key={video.id} className="flex space-x-2">
                      <div className="w-40 h-24 bg-gray-800 rounded-lg">
                        <img
                          src={video.thumbnailUrl}
                          alt="Thumbnail"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">
                          {video.caption.slice(0, 20)}...
                        </h4>
                        <p className="text-gray-400 text-sm">
                          {video.commentCount} views
                        </p>
                        <p className="text-gray-400 text-sm">
                          {formatDate(video.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </HomeLayoutWrapper>
  );
};

export default VideoPlayer;
