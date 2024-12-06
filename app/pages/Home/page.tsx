/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import HomeLayoutWrapper from "@/app/layouts/HomeLayoutWrapper";
import React, { useEffect } from "react";
import { handleUserAuthentication } from "../../api/AuthApi/api";
import Landingpage from "../../components/HompageComponent/Landingpage";
import { Movie } from "@/app/components/cards/cards.types";
import ChampionsLeague from "@/app/components/HompageComponent/FootballSection";
import GenreSection from "@/app/components/HompageComponent/genresCards";
import VodSection from "@/app/components/HompageComponent/VodSections";
import ShowsSection from "@/app/components/HompageComponent/TrensingShowsSections";
import TopShowsSection from "@/app/components/HompageComponent/TopShowsSections";
import NewsSection from "@/app/components/HompageComponent/NewsSection";
import LeagueTableSection from "@/app/components/HompageComponent/LeagueTableSection";

function page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    handleUserAuthentication()
      .then(() => {
        // console.log(user);
      })
      .catch(() => {
        // console.log(err.response.data);
      });
  }, []);

  return (
    <HomeLayoutWrapper>
      {/* header */}
      <Landingpage
        videoUrl="/backgrounds/backgroundVidoe.mp4"
        imageUrl="/backgrounds/homeBackground.jpg"
      />
      {/* mutiple genre section */}
      <GenreSection />
      {/* vod section */}
      <VodSection />
      {/* Shows section */}
      <ShowsSection />
      {/* preview of live gmae */}
      {/* fooball */}
      <ChampionsLeague />
      {/* FAQ */}
      {/* preview of live gmae */}
      <NewsSection />
      {/* league table */}
      <LeagueTableSection />
      {/* top shows section */}
      <TopShowsSection />
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
