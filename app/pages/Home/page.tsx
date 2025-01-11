/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import HomeLayoutWrapper from "@/app/layouts/HomeLayoutWrapper";
import React, { useEffect, useState } from "react";
// import { handleUserAuthentication } from "../../api/AuthApi/api";
import Landingpage from "../../components/HompageComponent/Landingpage";
import ChampionsLeague from "@/app/components/HompageComponent/FootballSection";
import GenreSection from "@/app/components/HompageComponent/genresCards";
import VodSection from "@/app/components/HompageComponent/VodSections";
import ShowsSection from "@/app/components/HompageComponent/TrensingShowsSections";
import TopShowsSection from "@/app/components/HompageComponent/TopShowsSections";
import NewsSection from "@/app/components/HompageComponent/NewsSection";
// import LeagueTableSection from "@/app/components/HompageComponent/LeagueTableSection";
import Modal from "@/app/components/Modal";
import { Bookmark, MessageSquare, Play, ThumbsUp } from "lucide-react";
import { handleGetSinglePost } from "@/app/api/PostApi/api";
import { Post } from "./home.data";
// import { UserAuth } from "@/useContext";

function page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [singlePost, setSinglePost] = useState<Post>();
  const closeModal = (open: boolean): void => {
    setIsModalOpen(open);
  };
  const OpenModal = (open: boolean): void => {
    setIsModalOpen(open);
  };
  const playVideo = (open: boolean): void => {
    setIsModalOpen(open);
  };
  // const { posts } = UserAuth();

  useEffect(() => {
    // if (posts && posts[0].id) {
    handleGetSinglePost(1)
      .then((post) => {
        setSinglePost(post.data.post);
      })
      .catch(() => {})
      .finally(() => {});
    // }
  }, []);

  return (
    <HomeLayoutWrapper>
      {/* header */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div
          style={{
            backgroundImage: `url(${singlePost?.bannerUrl})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          className="w-full bg-red-500 h-screen rounded-t-lg "
        >
          <div className="w-full h-full bg-black bg-gradient-to-b from-transparent via-transparent to-black bg-opacity-50 relative">
            <div className="bottom-12 md:left-6 mx-auto left-0 right-0  px-4 absolute flex flex-col md:flex-row gap-2">
              <button className="px-4 flex hover:bg-gray-100 items-centerm justify-center gap-2   py-2  border rounded md:w-48  bg-white text-black">
                <Play color="black" />

                <p>Play</p>
              </button>
              <button className="px-4 flex text-white items-centerm justify-center gap-2  py-2  border rounded md:w-48  ">
                <div className="">
                  <Bookmark />
                </div>
                <p>Add To Watchlist</p>
              </button>
            </div>
            <div className="absolute md:right-6 md:bottom-12 right-0   bottom-0 flex mx-auto items-center gap-4">
              <div className="flex items-center gap-2">
                <ThumbsUp />
                <p>{singlePost?.likeCount}</p>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare /> <p>{singlePost?.commentCount}</p>
              </div>
            </div>
          </div>

          <div className="w-full  text-sm py-4 bg-black px-4 gap-3 flex flex-col">
            <div className="flex md:items-center w-full md:flex-row flex-col">
              <div className="flex items-center gap-2">
                <p className="font-bold">Title:</p>
                <p className="text-gray-300">{singlePost?.caption}</p>
              </div>
              <div className="flex-1 flex md:justify-end">
                <p className="font-bold">Genre:</p>
                {singlePost?.tags.map((tag, index) => (
                  <p key={index} className="text-gray-300">
                    {tag}
                  </p>
                ))}
              </div>
            </div>
            <div>
              <p className="font-bold"> Description:</p>
              <p className="text-gray-300">{singlePost?.content}</p>
            </div>
          </div>
        </div>
      </Modal>
      <Landingpage
        playMainVideo={playVideo}
        videoUrl={singlePost?.videoUrl}
        imageUrl={singlePost?.bannerUrl}
      />
        {/* fooball */}
        <ChampionsLeague
      // onClose={OpenModal}
      />
      {/* mutiple genre section */}
      <GenreSection onClose={OpenModal} />
      {/* vod section */}
    
      <ShowsSection onClose={OpenModal} />
      {/* preview of live gmae */}
      <VodSection onClose={OpenModal} />
      {/* Shows section */}
      {/* FAQ */}
      {/* preview of live gmae */}
      <NewsSection
      //  onClose={OpenModal}
      />
      {/* league table */}
      {/* <LeagueTableSection
      //  onClose={OpenModal}
      /> */}
      {/* top shows section */}
      <TopShowsSection onClose={OpenModal} />
    </HomeLayoutWrapper>
  );
}

export default page;

{
  /* <div className="md:p-12 p-4 gap-4 flex-col flex bg-white text-black">
<div className="flex items-center gap-4">
  <p className="text-2xl font-semibold">
    Subscribe to Various Channels
  </p>
  <Link href={{}} className="flex items-center gap-2 group ">
    <p className="text-cyan-500  text-sm hidden group-hover:block">
      View All
    </p>
    <ChevronRight color="#06b6d4" />{" "}
  </Link>
</div>
{/* <LiveCards /> */
}
// </div> */}
