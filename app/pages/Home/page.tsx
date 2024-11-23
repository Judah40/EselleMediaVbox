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
import Image from "next/image";
import leagueTable from "./home.data";

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

      {/* football advert */}
      <div
        style={{
          backgroundImage: `url('/backgrounds/football-background.jpg')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className="flex w-full h-[80vh] md:h-[600px] bg-red-500 relative"
      >
        {/* Diagonal Line */}
        <div className="w-full md:w-6/12 gap-6 px-4 flex-col h-full bg-black bg-opacity-50 flex items-center justify-center">
          <p>
            <span className="text-5xl font-bold text-white">
              Get Ready for the Big Match
            </span>
            <br />
            <br />
            <span>
              Sign up now to stay ahead of the game. Access live updates,
              exclusive content, and so much more. Football is better when
              you&apos;re in the heart of it—don’t miss out!
            </span>
          </p>
          <div className="w-full">
            <button className="bg-cyan-500 p-4 rounded">Subscribe</button>
          </div>
        </div>
      </div>

      {/* league table */}
      <div className="w-full p-4 bg-white flex flex-col items-center">
        <div className="w-11/12 p-4 bg-black justify-between px-4  bg-opacity-60 rounded flex flex-col md:flex-row">
          <div className="flex items-center flex-col">
            <p className=" font-light">June 11, 2024</p>
            <div className="flex items-center">
              <Image
                src={"/badge/barcelona.png"}
                alt="badge"
                width={60}
                height={60}
              />
              <p>
                <span className="text-3xl font-bold">4:30pm</span>
              </p>
              <Image
                src={"/badge/madrid.png"}
                alt="badge"
                width={60}
                height={60}
              />
            </div>
          </div>
          <div className="flex items-center flex-col">
            <p className=" font-light">June 11, 2024</p>
            <div className="flex items-center">
              <Image
                src={"/badge/barcelona.png"}
                alt="badge"
                width={60}
                height={60}
              />
              <p>
                <span className="text-3xl font-bold">4:30pm</span>
              </p>
              <Image
                src={"/badge/madrid.png"}
                alt="badge"
                width={60}
                height={60}
              />
            </div>
          </div>
          <div className="flex items-center flex-col">
            <p className=" font-light">June 11, 2024</p>
            <div className="flex items-center">
              <Image
                src={"/badge/barcelona.png"}
                alt="badge"
                width={60}
                height={60}
              />
              <p>
                <span className="text-3xl font-bold">4:30pm</span>
              </p>
              <Image
                src={"/badge/madrid.png"}
                alt="badge"
                width={60}
                height={60}
              />
            </div>
          </div>
        </div>

        {/* table */}
        <div className="w-full p-4 flex flex-col md:flex-row">
          <div className="text-gray-700 md:w-6/12 w-full p-8">
            <div className="w-full p-4 border-l-8 border-cyan-500 border-b-4 rounded">
              <p className="text-lg font-bold ">League Table</p>
            </div>
            <table className="w-full  border rounded">
              <thead className="border">
                <tr className="flex justify-between p-2">
                  <th>Pos</th>
                  <th>Club</th>
                  <th>P</th>
                  <th>W</th>
                  <th>D</th>
                  <th>L</th>
                  <th>Pts</th>
                </tr>
              </thead>
              <tbody>
                {leagueTable.map((value, index) => (
                  <tr key={index} className="flex justify-between p-2">
                    <td>{value.position}</td>
                    <td>
                      <Image
                        src={"/badge/barcelona.png"}
                        height={40}
                        width={50}
                        alt="badge"
                      />
                    </td>
                    <td>{value.played}</td>
                    <td>{value.won}</td>
                    <td>{value.draw}</td>
                    <td>{value.lost}</td>
                    <td>{value.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="w-full md:w-6/12 p-8 text-black">
            <p className="text-xl font-bold text-cyan-500">Our Story</p>
            <p className="text-3xl font-bold ">SLFA STORY</p>
            <hr className="bg-cyan-500" />
            <p className="text-gray-500">
              The Sierra Leone Football Association (SLFA) is the governing body
              for football in Sierra Leone and has a history that dates back to
              the 1920s:
              <br />
              1923: The Sierra Leone Football League (SLFL) is founded.
              <br />
              1926: The SLFL is renamed the Sierra Leone Amateur Football
              Association (SLAFA).
              <br />
              1960: The current SLFA is established and affiliated with FIFA.
              1967: The SLAFA is refounded.
              <br />
              1992: The SLAFA is renamed the Sierra Leone Football Association
              (SLFA).
            </p>
            <p className="text-gray-500">
              The SLFA is responsible for managing and administering football in
              Sierra Leone, including organizing competitions and running the
              national football teams. The SLFA is a member of the West African
              Football Union (WAFU), Confederation of African Football (CAF),
              and FIFA.{" "}
            </p>
            <p className="text-gray-500">
              The SLFA&apos;s goals include improving the game of football,
              regulating it, and promoting its unifying, educational, cultural,
              and humanitarian values. The SLFA does this through youth and
              development programs.{" "}
            </p>
          </div>
        </div>
      </div>
    </HomeLayoutWrapper>
  );
}

export default page;
