/* eslint-disable react-hooks/rules-of-hooks */
"use client";
// import CardButton from "@/app/components/buttons/CardButton";
import HomeLayoutWrapper from "@/app/layouts/HomeLayoutWrapper";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";
import { handleUserAuthentication } from "../../api/AuthApi/api";
import Landingpage from "../../components/HompageComponent/Landingpage";
import LiveCards from "../../components/cards/LiveCards";

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

      {/* preview of live gmae */}
      <div className="md:p-12 p-4 gap-4 flex-col relative flex">
        <div className="flex items-center gap-4">
          <p className="text-2xl font-semibold">Live Now</p>
          <Link href={{}} className="flex items-center gap-2 group ">
            <p className="text-cyan-500  text-sm hidden group-hover:block">
              View All
            </p>
            <ChevronRight color="#06b6d4" />{" "}
          </Link>
        </div>
        <LiveCards />
      </div>
      {/* advert section */}


      <div
        style={{
          backgroundImage: `url('/backgrounds/advert-background.png')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className="flex w-full h-[100vh] md:h-[60vh] bg-red-500"
      >
        <div
          className={`w-full bg-black h-full  bg-opacity-60 flex flex-col items-center justify-center gap-4 `}
        >
          <div className="w-11/12">
            <p className="text-4xl  text-center font-medium">
              Join the Action Live or Rewind the Fun Anytime!
            </p>
          </div>
          <div className="w-10/12">
            <p className="text-center font-medium italic">
              &quot;Experience the thrill of live events as they happen, or
              enjoy the flexibility to catch up on what you missed at your own
              pace. Whether it&quot;s a high-energy concert, a thrilling sports
              match, or an exclusive talk show, you’re always in control. Tune
              in live or hit play when it suits you – the entertainment is
              always on, just for you.&quot;
            </p>
          </div>
        </div>
      </div>

      {/* subscriptions */}
      <div className="md:p-12 p-4 gap-4 flex-col flex bg-white text-black">
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
        <LiveCards />
      </div>

      {/* FAQ */}
      <div className="md:p-12 p-4 gap-4 flex-col flex"></div>
    </HomeLayoutWrapper>
  );
}

export default page;
