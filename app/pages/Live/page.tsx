import LiveCard from "@/app/components/buttons/LiveCard";
import { MUIdropdown } from "@/app/components/dropdowns/MUIdropdown";
import SearchInput from "@/app/components/inputs/SearchInput";
import HomeLayoutWrapper from "@/app/layouts/HomeLayoutWrapper";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";
function page() {
  return (
    <HomeLayoutWrapper>
      <div className="h-24 w-full bg-black" />
      {/* search */}
      <div className="flex px-4 w-full items-center">
        <div className="w-[80%]">
          <SearchInput />
        </div>
        {/* filter */}
        <div className="flex gap-2 flex-1 justify-between px-2">
          <MUIdropdown />
          <MUIdropdown />
          <MUIdropdown />
        </div>
      </div>

      {/* content 1 */}
      <div className="p-4">
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

      {/* content 2 */}

      <div className="p-4">
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
      {/* content 3 */}

      <div className="p-4">
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
