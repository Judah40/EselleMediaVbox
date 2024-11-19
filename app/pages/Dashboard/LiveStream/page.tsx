"use client";

import React, { useState } from "react";
import LiveModal from "../(component)/Modals/LiveModal";
import { CircleX, Radio, Search } from "lucide-react";

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex-1 w-full  flex items-center  flex-col ">
      {/* Modal Opening  */}
      {isOpen && (
        <div className="inset-0 z-50 bg-black overflow-y-auto md:justify-center items-center flex flex-col fixed w-full flex-1 bg-opacity-50">
          <div className="bg-black flex border border-gray-700 shadow shadow-white items-center flex-col py-12 rounded">
            <div className="w-11/12 font-bold flex items-center py-4">
              <p className="text-xl">Go LIve</p>
              <div className="flex-1 flex justify-end">
                <button
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  <CircleX color="red" />
                </button>
              </div>
            </div>
            <LiveModal />
          </div>
        </div>
      )}

      {/* Search bar */}
      <div className="w-full flex-row flex p-4 gap-4">
        {/* search bar  */}
        <div className="flex  w-full ">
          <input placeholder="Search" className="flex-1 p-3 rounded-l" />
          <button className="bg-black rounded-r border border-gray-700 hover:bg-gray-800 px-6">
            <Search />
          </button>
        </div>

        <button
          onClick={() => {
            setIsOpen(true);
          }}
          className="w-40 justify-center py-1 bg-white hover:bg-gray-200 flex rounded items-center text-sm gap-2"
        >
          <Radio color="black" />
          <p className="text-black text-xs">Go Live</p>
        </button>
      </div>
    </div>
  );
};

export default Page;
