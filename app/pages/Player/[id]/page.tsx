"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  ThumbsUp,
  ThumbsDown,
  Share,
  MessageSquare,
  ChevronRight,
} from "lucide-react";
import ReactPlayer from "react-player";
import HomeLayoutWrapper from "@/app/layouts/HomeLayoutWrapper";
import {
  handleGetPostByGenre,
  handleGetSinglePost,
} from "@/app/api/PostApi/api";
import { useParams, useRouter } from "next/navigation";
import { Post } from "../../Home/home.data";
import { post } from "../../Category/[id]/category.types";
import { formatDate } from "@/lib/utils/dateFormatter";
import VideoPlayerSkeleton from "./VideoPlayerSkeleton ";
import {
  handleGetAllVodComments,
  handleSendvodComment,
} from "@/app/api/messageApi/message";
import { AxiosError } from "axios";
import { UserAuth } from "@/useContext";
import Image from "next/image";

type vodcomment = {
  comment: string;
  vodId: string;
};
type Comment = {
  id: number;
  username: string;
  comment: string;
  timestamp: string;
  profile_picture: string;
};

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

  const { id } = useParams();
  const { username } = UserAuth();
  const [singlePost, setSinglePost] = useState<Post>();
  const [videos, setVideos] = useState<post[] | null>(null);
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);
  const router = useRouter();

  const handleGetSinglePostOnly = async (id: number) => {
    setIsLoading(true);
    try {
      const response = await handleGetSinglePost(Number(id));
      const arr = JSON.parse(response.data.post.tags[0]);

      const [postResponse, commentsResponse] = await Promise.all([
        handleGetPostByGenre(arr[0]),
        handleGetAllVodComments(response.data.post.postId),
      ]);

      setVideos(postResponse.data.post);
      setSinglePost(response.data.post);

      const fetchedComments = commentsResponse.data.data;

      setComments(fetchedComments);
    } catch (error) {
      console.error("Error fetching post data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendComment = useCallback(async () => {
    if (singlePost && comment.trim()) {
      setCommentLoading(true);
      const data: vodcomment = {
        comment: comment.trim(),
        vodId: singlePost.postId,
      };

      try {
        const response = await handleSendvodComment(data);
        if (response.data) {
          const fetchedComments = await handleGetAllVodComments(
            singlePost.postId
          );

          setComments(fetchedComments.data.data);
          setComment("");
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error(
            "Error sending comment:",
            error.response?.data || error
          );
        }
      } finally {
        setCommentLoading(false);
      }
    }
  }, [singlePost, comment]);

  useEffect(() => {
    handleGetSinglePostOnly(Number(id));
  }, [id]);

  if (isLoading) return <VideoPlayerSkeleton />;

  return (
    <HomeLayoutWrapper>
      <div className="min-h-screen pt-12 bg-zinc-950 text-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Video Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Video Player */}
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <ReactPlayer
                  url={singlePost?.videoUrl}
                  width="100%"
                  height="auto"
                  controls
                  className="aspect-video"
                />
              </div>

              {/* Video Info */}
              <div className="bg-zinc-900 rounded-2xl p-6 shadow-lg">
                <h1 className="text-3xl font-bold mb-4 text-white">
                  {singlePost?.caption}
                </h1>
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="flex items-center space-x-4 text-gray-400 mb-4 md:mb-0">
                    <span>125K views</span>
                    <span className="h-2 w-2 bg-gray-500 rounded-full"></span>
                    {/* <span>{formatDate(singlePost?.createdAt || "")}</span> */}
                  </div>
                  <div className="flex items-center space-x-6">
                    <button
                      onClick={handleLike}
                      className={`flex items-center space-x-2 transition-colors ${
                        liked
                          ? "text-blue-500"
                          : "text-gray-400 hover:text-blue-400"
                      }`}
                    >
                      <ThumbsUp className="w-5 h-5" />
                      <span>{singlePost?.likeCount}</span>
                    </button>
                    <button
                      onClick={handleDislike}
                      className={`flex items-center space-x-2 transition-colors ${
                        disliked
                          ? "text-red-500"
                          : "text-gray-400 hover:text-red-400"
                      }`}
                    >
                      <ThumbsDown className="w-5 h-5" />
                    </button>
                    <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                      <Share className="w-5 h-5" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Comments Section */}
              <div className="bg-zinc-900 rounded-2xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold mb-6 text-white">Comments</h3>

                {username && (
                  <div className="flex items-center space-x-4 mb-8">
                    <input
                      type="text"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Add a comment..."
                      className="flex-1 bg-zinc-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
                    />
                    <button
                      onClick={sendComment}
                      disabled={commentLoading}
                      className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                      {commentLoading ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        </div>
                      ) : (
                        "Comment"
                      )}
                    </button>
                  </div>
                )}

                {/* Comment List */}
                <div className="space-y-6">
                  {comments && comments.length > 0 ? (
                    comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="flex space-x-4 bg-zinc-800 rounded-xl p-4 hover:bg-zinc-700 transition-colors"
                      >
                        <div className="w-12 h-12 flex-shrink-0">
                          <Image
                            src={
                              comment.profile_picture || "/default-avatar.png"
                            }
                            alt="Profile"
                            width={48} // Adjust width as needed
                            height={48} // Adjust height as needed
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <span className="font-semibold text-white">
                                {comment.username}{" "}
                              </span>
                              <span className="text-gray-400 text-sm">
                                {formatDate(comment.timestamp)}
                              </span>
                            </div>
                          </div>
                          <p className="text-gray-300">{comment.comment}</p>
                          <div className="flex items-center space-x-4 mt-3 text-gray-400">
                            <button className="flex items-center space-x-1 hover:text-blue-400 transition-colors">
                              <ThumbsUp className="w-4 h-4" />
                            </button>
                            <button className="flex items-center space-x-1 hover:text-gray-200 transition-colors">
                              <MessageSquare className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-500">
                      No comments yet. Be the first to comment!
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Suggested Videos Section */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-4">
                More Videos
              </h3>
              {videos &&
                videos.map((video) => (
                  <button
                    key={video.id}
                    onClick={() => router.push(`/pages/Player/${video.id}`)}
                    className="w-full group"
                  >
                    <div className="flex items-center space-x-4 bg-zinc-900 rounded-xl p-4 hover:bg-zinc-800 transition-colors">
                      <div className="w-36 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={video.thumbnailUrl}
                          alt="Thumbnail"
                          width={144} // Adjust width as needed
                          height={96} // Adjust height as needed
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="flex-1 text-left">
                        <h4 className="font-semibold text-white mb-1 line-clamp-2">
                          {video.caption}
                        </h4>
                        <div className="flex items-center space-x-2 text-gray-400 text-sm">
                          <span>{video.commentCount} views</span>
                          <span className="h-1 w-1 bg-gray-500 rounded-full"></span>
                          <span>{formatDate(video.createdAt)}</span>
                        </div>
                      </div>
                      <ChevronRight className="text-gray-400 group-hover:text-white transition-colors" />
                    </div>
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </HomeLayoutWrapper>
  );
};

export default VideoPlayer;
