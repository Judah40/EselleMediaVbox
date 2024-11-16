"use client";

import HomeLayoutWrapper from "@/app/layouts/HomeLayoutWrapper";
import React from "react";
import { useParams } from "next/navigation";
const page = () => {
  const { id } = useParams();
  return (
    <HomeLayoutWrapper>
      <div className="h-24 w-full bg-black" />
      <div className="p-4">
        <p className="text-3xl">{id}</p>
      </div>
    </HomeLayoutWrapper>
  );
};

export default page;
