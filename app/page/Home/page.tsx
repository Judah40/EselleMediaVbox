import CardButton from "@/app/components/buttons/CardButton";
import HomeLayoutWrapper from "@/app/layouts/HomeLayoutWrapper";
import Link from "next/link";
import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

function page() {
  return (
    <HomeLayoutWrapper>
      {/* header */}
      <div
        style={{
          backgroundImage: `url('/backgrounds/homeBackground.jpg')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className="flex w-full h-[80vh]"
      >
        <div
          className={`w-full bg-black h-full  bg-opacity-60 flex md:flex-row    flex-col-reverse items-center justify-center gap-8 `}
        >
          <div className="w-full    px-6 md:px-14">
            <div className="md:w-96 gap-6 flex flex-col">
              <p className="text-4xl lg:text-5xl font-bold">
                Your World of Entertainment, Live and On-Demand
              </p>
              <p className="lg:text-lg">
                Discover exclusive events, stream the latest shows, and relive
                unforgettable moments – all in one place.
              </p>
              <button className="px-4 bg-yellow-700 py-4 rounded inline-block">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* preview of live gmae */}
      <div className="md:p-12 p-4 gap-4 flex-col flex">
        <p className="text-2xl font-semibold">Live Now</p>
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4 ">
          <CardButton isVideoLive={true} />
          <CardButton isVideoLive={true} />
          <CardButton isVideoLive={true} />
          <CardButton isVideoLive={true} />
        </div>
        <div className="w-full flex justify-end">
          <Link href={""} className="flex items-center gap-4">
            <p className="text-cyan-500 hover:text-cyan-700">View All</p>
            <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center border border-white">
              <FaLongArrowAltRight size={24} />
            </div>
          </Link>
        </div>
      </div>
      {/* advert section */}
      <div
        style={{
          backgroundImage: `url('/backgrounds/advert-background.png')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className="flex w-full h-[100vh] md:h-[60vh]"
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
              "Experience the thrill of live events as they happen, or enjoy the
              flexibility to catch up on what you missed at your own pace.
              Whether it's a high-energy concert, a thrilling sports match, or
              an exclusive talk show, you’re always in control. Tune in live or
              hit play when it suits you – the entertainment is always on, just
              for you."{" "}
            </p>
          </div>
        </div>
      </div>

      {/* subscriptions */}
      <div className="md:p-12 p-4 gap-4 flex-col flex bg-white text-black">
        <p className="text-2xl font-semibold">Subscribe to Various Channels</p>
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4 ">
          <CardButton isVideoLive={false} />
          <CardButton isVideoLive={false} />
          <CardButton isVideoLive={false} />
          <CardButton isVideoLive={false} />
        </div>
        <div className="w-full flex justify-end">
          <Link href={""} className="flex items-center gap-4">
            <p className="text-cyan-500 hover:text-cyan-700">View All</p>
            <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center border border-white">
              <FaLongArrowAltRight size={24} />
            </div>
          </Link>
        </div>
      </div>

      {/* FAQ */}
      <div className="md:p-12 p-4 gap-4 flex-col flex">
       
      </div>
    </HomeLayoutWrapper>
  );
}

export default page;
