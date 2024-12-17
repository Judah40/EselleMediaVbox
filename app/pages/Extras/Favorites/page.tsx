"use client";

import FavoritesSelector from "@/app/components/AuthComponents/FavoritesSelector";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const Page = () => {
  return (
    <div className="flex-1 w-full items-center h-screen  flex flex-col gap-6">
      <Link href={"/"} className="absolute md:top-4 md:left-4">
        <Image src={"/logo/vbox.png"} width={100} height={100} alt="logo" />
      </Link>
      <div className="md:w-8/12 w-11/12 p-4 rounded pt-24 md:pt-12">
        <FavoritesSelector />
      </div>
    </div>
  );
};

export default Page;
