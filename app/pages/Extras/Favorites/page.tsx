"use client";

import { data } from "@/app/api/DummyData/data";
import Link from "next/link";
import React, { useState } from "react";

const Page = () => {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const handleButtonClick = (index: number, name: string) => {
    console.log(`Clicked on item: ${name}, index: ${index}`);
    setCheckedItems((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle the checkbox state
    }));
  };

  return (
    <div className="flex-1 w-full items-center h-full justify-center flex flex-col ">
      <div className="md:w-8/12 w-11/12">
        <p className="text-2xl font-bold">Favorites</p>
        <p className="text-lg text-gray-400">
          Select Favorite from the following list
        </p>
      </div>
      {/* multi select button */}
      <div className="md:w-8/12 w-11/12 ">
        {data.map((item, index) => (
          <button
            key={index}
            className={`bg-gray-500 px-4 py-1 rounded-full m-2 ${
              checkedItems[index] && "border-4 border-cyan-500"
            }`}
            onClick={() => handleButtonClick(index, item.name)}
          >
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                className="w-4 accent-cyan-500"
                checked={!!checkedItems[index]}
                onChange={() => handleButtonClick(index, item.name)}
              />
              <p>{item.name}</p>
            </div>
          </button>
        ))}
      </div>
      {/* separation */}
      <div className="w-11/12 md:w-8/12 flex justify-between">
        <Link
          href={""}
          className="px-4 py-2 rounded border border-cyan-500 text-cyan-500"
        >
          Skip
        </Link>
        <button className="px-4 py-2 rounded border border-cyan-500 text-cyan-500">
          Next
        </button>
      </div>
    </div>
  );
};

export default Page;
