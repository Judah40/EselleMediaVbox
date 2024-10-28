import LiveCard from "@/src/app/components/buttons/LiveCard";
import HomeLayoutWrapper from "@/src/app/layouts/HomeLayoutWrapper";
import {
  Baby,
  ChevronRight,
  Church,
  FerrisWheel,
  Film,
  GraduationCap,
  Medal,
  Music,
  PersonStanding,
  Projector,
  Shell,
  Store,
} from "lucide-react";
import Link from "next/link";
import React from "react";

interface genre {
  name: String;
  icon: React.ReactNode;
}
function page() {
  const tvGenres: genre[] = [
    { name: "Entertainment", icon: <FerrisWheel /> },
    { name: "Music", icon: <Music /> },
    { name: "Sports", icon: <Medal /> },
    { name: "Children's", icon: <Baby /> },
    { name: "Documentary", icon: <Film /> },
    { name: "Religious", icon: <Church /> },
    { name: "Shopping", icon: <Store /> },
    { name: "Educational", icon: <GraduationCap /> },
    { name: "Lifestyle", icon: <Shell /> },
    { name: "Movie", icon: <Projector /> },
    { name: "Cultural", icon: <PersonStanding /> },
  ];
  return (
    <HomeLayoutWrapper>
      <div className="h-24 w-full bg-black" />
      {/* header */}
      <div className="w-full p-4  grid grid-cols-12">
        {/* first Banner */}
        <div className="grid col-span-12 md:col-span-4 h-80 p-4 rounded">
          <div
            style={{
              backgroundImage: `url('/backgrounds/BBCBackground.jpg')`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className="w-full h-full bg-yellow-500 rounded shadow-md shadow-white"
          >
            <div className="w-full h-full bg-black bg-opacity-50"></div>
          </div>
        </div>
        {/* secong banner */}
        <div className="grid col-span-12 md:col-span-8 h-80 p-4">
          <div
            style={{
              backgroundImage: `url('/backgrounds/aljazeeraBackground.jpg')`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className="w-full h-full bg-gray-500 rounded shadow-md shadow-white"
          >
            <div className="w-full h-full bg-black bg-opacity-50"></div>
          </div>
        </div>
      </div>

      {/* genre */}
      <div className="py-4 flex overflow-x-auto ml-8 gap-6 scrollbar-hide">
        {tvGenres.map((genre, index) => (
          <button
            key={index}
            className="w-full p-4 flex gap-2  rounded-lg  bg-gray-800 bg-opacity-50 hover:bg-gray-600 "
          >
            <p>{genre.name}</p>
            <div>{genre.icon}</div>
          </button>
        ))}
      </div>

      <div className="p-8">
        <div className="flex items-center gap-1">
          <p className="text-2xl font-semibold">Live Now</p>
          <Link href={{}} className="flex items-center gap-2 group ">
            <p className="text-cyan-500  text-sm hidden group-hover:block">
              View All
            </p>
            <ChevronRight color="#06b6d4" />{" "}
          </Link>
        </div>
        <div className=" grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2">
          <LiveCard />
          <LiveCard />
          <LiveCard />
          <LiveCard />
        </div>
      </div>
      <div className="p-8">
        <div className="flex items-center gap-1">
          <p className="text-2xl font-semibold">Live Now</p>
          <Link href={{}} className="flex items-center gap-2 group ">
            <p className="text-cyan-500  text-sm hidden group-hover:block">
              View All
            </p>
            <ChevronRight color="#06b6d4" />{" "}
          </Link>
        </div>
        <div className=" grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2">
          <LiveCard />
          <LiveCard />
          <LiveCard />
          <LiveCard />
        </div>
      </div>
      <div className="p-8">
        <div className="flex items-center gap-1">
          <p className="text-2xl font-semibold">Live Now</p>
          <Link href={{}} className="flex items-center gap-2 group ">
            <p className="text-cyan-500  text-sm hidden group-hover:block">
              View All
            </p>
            <ChevronRight color="#06b6d4" />{" "}
          </Link>
        </div>
        <div className=" grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2">
          <LiveCard />
          <LiveCard />
          <LiveCard />
          <LiveCard />
        </div>
      </div>
    </HomeLayoutWrapper>
  );
}

export default page;
