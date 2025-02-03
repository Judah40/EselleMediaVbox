/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { Bookmark, MessageSquare, Play, ThumbsUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { handleGetSinglePost } from "@/app/api/PostApi/api";
import { Post } from "./home.data";

// Dynamic imports for components
const HomeLayoutWrapper = dynamic(() => import("@/app/layouts/HomeLayoutWrapper"));
const Landingpage = dynamic(() => import("../../components/HompageComponent/Landingpage"));
const ChampionsLeague = dynamic(() => import("@/app/components/HompageComponent/FootballSection"));
const GenreSection = dynamic(() => import("@/app/components/HompageComponent/genresCards"));
const VodSection = dynamic(() => import("@/app/components/HompageComponent/VodSections"));
const ShowsSection = dynamic(() => import("@/app/components/HompageComponent/TrensingShowsSections"));
const TopShowsSection = dynamic(() => import("@/app/components/HompageComponent/TopShowsSections"));
const NewsSection = dynamic(() => import("@/app/components/HompageComponent/NewsSection"));
const Modal = dynamic(() => import("@/app/components/Modal"));

function Page() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [singlePost, setSinglePost] = useState<Post | null>(null);
  const [modalPost, setModalPost] = useState<Post | null>(null);
  const router = useRouter();

  const closeModal = (): void => {
    setIsModalOpen(false);
    setModalPost(null);
  };

  const openModal = (postId: number): void => {
    setIsModalOpen(true);
    handleGetSinglePost(postId)
      .then((post) => setModalPost(post.data.post))
      .catch(() => {});
  };

  useEffect(() => {
    handleGetSinglePost(4)
      .then((post) => setSinglePost(post.data.post))
      .catch(() => {});
  }, []);

  return (
    <HomeLayoutWrapper>
      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {modalPost && (
          <div
            style={{
              backgroundImage: `url(${modalPost.bannerUrl})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className="w-full h-screen rounded-t-lg bg-red-500"
          >
            <div className="w-full h-full bg-black bg-gradient-to-b from-transparent via-transparent to-black bg-opacity-50 relative">
              {/* Buttons */}
              <div className="absolute bottom-12 md:left-6 mx-auto left-0 right-0 px-4 flex flex-col md:flex-row gap-2">
                <button
                  onClick={() => router.push(`/pages/Player/${modalPost.id}`)}
                  className="px-4 py-2 flex items-center gap-2 border rounded md:w-48 bg-white text-black hover:bg-gray-100"
                >
                  <Play />
                  <p>Play</p>
                </button>
                <button className="px-4 py-2 flex items-center gap-2 border rounded md:w-48 text-white">
                  <Bookmark />
                  <p>Add To Watchlist</p>
                </button>
              </div>

              {/* Like & Comment Section */}
              <div className="absolute md:right-6 md:bottom-12 right-0 bottom-0 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <ThumbsUp />
                  <p>{modalPost.likeCount}</p>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare />
                  <p>{modalPost.commentCount}</p>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="w-full text-sm py-4 bg-black px-4 flex flex-col gap-3">
              <div className="flex md:flex-row flex-col w-full md:items-center">
                <div className="flex items-center gap-2">
                  <p className="font-bold">Title:</p>
                  <p className="text-gray-300">{modalPost.caption}</p>
                </div>
                <div className="flex-1 flex md:justify-end">
                  <p className="font-bold">Genre:</p>
                  {modalPost.tags.map((tag, index) => (
                    <p key={index} className="text-gray-300">
                      {tag}
                    </p>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-bold">Description:</p>
                <p className="text-gray-300">{modalPost.content}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Main Content */}
      <Landingpage
        playMainVideo={() => setIsModalOpen(true)}
        videoUrl={singlePost?.videoUrl}
        imageUrl={singlePost?.bannerUrl}
      />

      <ChampionsLeague />
      <GenreSection onClose={() => setIsModalOpen(true)} postId={openModal} />
      <ShowsSection onClose={() => setIsModalOpen(true)} postId={openModal} />
      <VodSection onClose={() => setIsModalOpen(true)} />
      <NewsSection />
      <TopShowsSection onClose={() => setIsModalOpen(true)} />
    </HomeLayoutWrapper>
  );
}

export default Page;
