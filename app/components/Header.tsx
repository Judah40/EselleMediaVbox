"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";

type data = {
  name: string;
};
const data: data[] = [
  {
    name: "sports",
  },
  {
    name: "lifestyle",
  },
  {
    name: "documentaries",
  },
  {
    name: "tech",
  },
  {
    name: "news",
  },
  {
    name: "films",
  },
  {
    name: "fashion",
  },
  {
    name: "tv shows",
  },
  {
    name: "podcasts",
  },
  {
    name: "personal development ",
  },
  {
    name: "adult education",
  },
  {
    name: "health & fitness",
  },
  {
    name: "comedy",
  },
  {
    name: "tv series",
  },
  {
    name: "kids entertainment",
  },
  {
    name: "kids education",
  },
  {
    name: "culture and tradition",
  },
  {
    name: "international",
  },
];
function Header() {
  const handleScreenWidthResponsiveness = async () => {
    //get screen size
    const { innerWidth } = await window;
    console.log(innerWidth);
    if (innerWidth > 768) {
      setIsMenuBarOpen(false);
    }
  };
  // states
  const [isMenuBarOpen, setIsMenuBarOpen] = useState(false);
  const pages = [
    { name: "Home", link: "/page/Home" },
    { name: "VOD", link: "/page/videoOnDemand" },
    { name: "Categories", link: "" },
    { name: "Live Events", link: "/page/Live" },
    { name: "Channels", link: "/" },
  ];

  useEffect(() => {
    handleScreenWidthResponsiveness();

    // Attach the event listener to handle window resize
    window.addEventListener("resize", handleScreenWidthResponsiveness);

    // Cleanup the event listener on component unmount
    return () =>
      window.removeEventListener("resize", handleScreenWidthResponsiveness);
  }, [isMenuBarOpen]);
  return (
    <div className="absolute   w-full">
      <div className="flex w-full">
        <Image src={"/logo/vbox.png"} width={100} height={100} alt="logo" />
        <div className="hidden md:block md:flex-1  md:w-full  md:items-center md:justify-center ">
          <ul className="gap-10 flex flex-row items-center  h-full justify-end px-6">
            {pages.map((items, index) => (
              <li key={index} className="">
                <Link
                  href={items.link}
                  className="hover:underline group peer  flex-col"
                >
                  <div className="flex flex-col">
                    <div className="flex items-center ">
                      <p>{items.name} </p>
                      {items.name === "Categories" && (
                        <div>
                          <div className="group-hover:hidden block">
                            <ChevronUp size={18} />
                          </div>
                          <div className="hidden group-hover:block">
                            <ChevronDown size={18} />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
                {items.name === "Categories" && (
                  <div className="p-2  absolute z-50 hidden hover:grid  bg-black peer-hover:grid grid-cols-2 gap-2">
                    {data.map((value, index) => (
                      <Link
                        href={""}
                        key={index}
                        className="text-white rounded hover:underline p-2 "
                      >
                        {value.name}
                      </Link>
                    ))}
                  </div>
                )}
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
        <div className="w-full p-6 bg-white text-black z-50 absolute">
          <ul className="gap-16 flex flex-col items-center">
            {pages.map((items, index) => (
              <li key={index}>
                <Link href={items.link} className="hover:underline ">
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
      )}
    </div>
  );
}

export default Header;
