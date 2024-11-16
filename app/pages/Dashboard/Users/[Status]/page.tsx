"use client";

// import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Table from "../../(component)/Table/Table";
import { PiExportBold } from "react-icons/pi";
import { Plus } from "lucide-react";
import { Spinner } from "@nextui-org/react";


const Page = () => {
  // const { Status } = useParams();
  const [screenSize, setScreenSize] = useState<number | null>(null);
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  const getScreenWidth = () => {
    const screenWidth = window.innerWidth;
    setScreenSize(screenWidth);
  };

  ////////////////////////////////////////////////////////////////
  //SCREEN SIZE USEFFECT

  useEffect(() => {
    // Set up the resize event listener
    window.addEventListener("resize", getScreenWidth);

    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", getScreenWidth);
  }, []);
  useEffect(() => {
    getScreenWidth();
  });

  return (
    <div className="flex-1  ">
      {/* header */}
      <div className=" w-full md:p-4 py-4 flex items-center">
        <div>
          <p className="md:text-2xl font-bold">Users</p>
          <p className="text-sm">Find all users here</p>
        </div>
        <div className="flex-1 p-2  flex justify-end gap-4">
          <button className="md:px-4 md:py-2 px-2 py-1 border flex rounded items-center text-sm gap-2">
            <PiExportBold color="white" size={24} />
            <p className="text-xs">Export CSV</p>
          </button>
          <button className="md:px-4 md:py-2 px-2 py-1 bg-white flex rounded items-center text-sm gap-2">
            <Plus color="black" />
            <p className="text-black text-xs">Invite User</p>
          </button>
        </div>
      </div>
      <div className="w-full flex justify-center">
        {!screenSize && <Spinner color="white" />}
      </div>
      {screenSize && (
        <div
          className={`overflow-x-auto bg-red-500 flex-1 flex justify-center`}
          style={{
            width:
              screenSize < 768
                ? `${screenSize - 40}px`
                : `${screenSize - 300}px`,
          }}
        >
          <Table  />
        </div>
      )}
    </div>
  );
};

export default Page;
