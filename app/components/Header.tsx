"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";

function Header() {
  //get screen size
  const { innerWidth } = window;
  const handleScreenWidthResponsiveness = () => {
    if (innerWidth < 768) {
      setIsMenuBarOpen(false);
    }
  };
  // states
  const [isMenuBarOpen, setIsMenuBarOpen] = useState(false);
  const pages = [
    { name: "Home", link: "/page/Home" },
    { name: "VOD", link: "/page/videoOnDemand" },
    { name: "Categories", link: {
      dropDown1:{
        name:"", 
        link:""
      },
      dropDown2:{
        name:"", 
        link:""
      },
      dropDown3:{
        name:"", 
        link:""
      },
    } },
    { name: "Live Events", link: "/" },
    { name: "Channels", link: "/" },
  ];

  useEffect(() => {
    handleScreenWidthResponsiveness();

    // Attach the event listener to handle window resize
    window.addEventListener("resize", handleScreenWidthResponsiveness);

    // Cleanup the event listener on component unmount
    return () =>
      window.removeEventListener("resize", handleScreenWidthResponsiveness);
  }, []);
  return (
    <div className="absolute   w-full">
      <div className="flex w-full">
        <Image src={"/logo/vbox.png"} width={100} height={100} alt="logo" />
        <div className="hidden md:block md:flex-1  md:w-full  md:items-center md:justify-center h-[100px]">
          <ul className="gap-16 flex flex-row items-center  h-full justify-end px-6">
            {pages.map((items, index) => (
              <li key={index}>
                <Link href={""} className="hover:underline">
                  {items.name}
                </Link>
              </li>
            ))}
            <Link
              href={"/page/Auth/Signin"}
              className="bg-yellow-700 px-4 py-2 rounded hover:bg-yellow-500"
            >
              Sign in
            </Link>
          </ul>
        </div>

        <div className="md:hidden flex justify-end flex-1 px-4">
          {/* menu bar */}
          {!isMenuBarOpen ? (
            <button
              onClick={() => {
                setIsMenuBarOpen(true);
              }}
            >
              <IoMenu color="white" size={36} />
            </button>
          ) : (
            <button
              onClick={() => {
                setIsMenuBarOpen(false);
              }}
            >
              <IoClose color="white" size={36} />
            </button>
          )}
        </div>
      </div>

      {isMenuBarOpen && (
        <div className="w-full p-6 bg-white text-black">
          <ul className="gap-20 flex flex-col items-center">
            {pages.map((items, index) => (
              <li key={index}>
                <Link href={""} className="hover:underline">
                  {items.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Header;
