"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useCallback, useEffect, useState } from "react";
import { ThumbsUp, ThumbsDown, Share, MessageSquare } from "lucide-react";
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
import { handleGetSingleUser } from "@/app/api/AdminApi/usersApi/api";
import { User } from "../../Dashboard/types/users.types";
import { AxiosError } from "axios";
type vodcomment = {
  comment: string;
  vodId: string;
};
type Comment = {
  id: number;
  user: User;
  comment: string;
  // likes: number;
  timestamp: string;
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
  const [singlePost, setSinglePost] = useState<Post>();
  const [videos, setVideos] = useState<post[] | null>(null);
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);
  const router = useRouter();
  const handleGetSinglePostOnly = async (id: number) => {
    setIsLoading(true);
    //GET POST
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
        //GET COMMENTS
        handleGetAllVodComments(response.data.post.postId)
          .then((response) => {
            const fetchedComments = response.data.data;

            // Create a promise for each user fetch
            const commentsWithUsersPromises: Promise<Comment>[] =
              fetchedComments.map(async (comment: any): Promise<Comment> => {
                try {
                  const userResponse = await handleGetSingleUser(
                    comment.userId
                  );

                  return { ...comment, user: userResponse.data.data }; // Add user data to the comment
                } catch (error) {
                  console.error("Error fetching user data:", error);
                  return { ...comment, user: null }; // Handle errors gracefully
                }
              });

            // Wait for all promises to resolve
            Promise.all(commentsWithUsersPromises).then((resolvedComments) => {
              setComments(resolvedComments);
            });
          })
          .catch(() => {})
          .finally(() => {});
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  const sendComment = useCallback(async () => {
    if (singlePost && comment.trim()) {
      // Ensure singlePost exists and comment isn't empty
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
          const commentsWithUsersPromises: Promise<Comment>[] =
            fetchedComments.data.data.map(
              async (comment: any): Promise<Comment> => {
                try {
                  const userResponse = await handleGetSingleUser(
                    comment.userId
                  );
                  return { ...comment, user: userResponse.data.data };
                } catch (error) {
                  console.error("Error fetching user:", error);
                  return { ...comment, user: null };
                }
              }
            );

          const resolvedComments = await Promise.all(commentsWithUsersPromises);
          setComments(resolvedComments);
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
                    <button
                      onClick={() => {
                        setComment("");
                        sendComment();
                      }}
                      className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                      {commentLoading ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Commenting...</span>
                        </div>
                      ) : (
                        "Comment"
                      )}
                    </button>
                  </div>

                  {/* Comment List */}
                  <div className="space-y-4">
                    {comments &&
                      comments.map((comment) => (
                        <div key={comment.id} className="flex space-x-3">
                          <div className="w-10 h-10 rounded-full bg-gray-700">
                            {comment && comment.user.profile_picture && (
                              <img
                                src={comment.user.profile_picture}
                                alt="Profile"
                                className="w-full h-full object-cover rounded-full"
                              />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">
                                {comment.user.firstName} {comment.user.lastName}
                              </span>
                              <span className="text-gray-400 text-sm">
                                {comment.timestamp}
                              </span>
                            </div>
                            <p className="mt-1">{comment.comment}</p>
                            <div className="flex items-center space-x-2 mt-2">
                              <button className="flex items-center space-x-1 text-gray-400 hover:text-gray-300">
                                <ThumbsUp className="w-4 h-4" />
                                {/* <span>{comment.likes}</span> */}
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
                    <button
                      key={video.id}
                      onClick={() => router.push(`/pages/Player/${video.id}`)}
                      className="flex space-x-2 p-2 rounded hover:bg-gray-900 hover:cursor-pointer"
                    >
                      <div className="w-40 h-24 bg-gray-800 rounded-lg">
                        <img
                          src={video.thumbnailUrl}
                          alt="Thumbnail"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className=" flex flex-col items-start">
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
                    </button>
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
