"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import // handleGetUserProfilePicture,
"../api/AuthApi/api";
import DropdownUi from "./dropdowns/HeaderIconDropwodn/dropdown";
import { data } from "../api/DummyData/data";
import { UserAuth } from "@/useContext";

function Header() {
  const { username } = UserAuth();
  const path = usePathname().split("/")[2];
  const router = useRouter();
  const handleScreenWidthResponsiveness = async () => {
    //get screen size

    const { innerWidth } = await window;

    //
    if (innerWidth > 768) {
      setIsMenuBarOpen(false);
    }
  };
  // states
  const [isMenuBarOpen, setIsMenuBarOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const pages = [
    { name: "Home", link: "/pages/Home", path: "Home" },
    { name: "VOD", link: "/pages/videoOnDemand", path: "videoOnDemand" },
    { name: "Categories", link: "" },
    { name: "Live Events", link: "/pages/Live", path: "Live" },
    { name: "Channels", link: "/pages/Channels", path: "Channels" },
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
    <div className="absolute z-50  w-full">
      <div className="flex w-full  md:px-6">
        <Image src={"/logo/vbox.png"} width={100} height={100} alt="logo" />
        <div className="hidden md:block md:flex-1  md:w-full  md:items-center md:justify-center ">
          <ul className="gap-8 flex flex-row items-center  h-full justify-end px-6">
            {pages.map((items, index) => (
              <li key={index} className="text-sm">
                <Link
                  href={items.link}
                  className={`hover:underline hover:decoration-white group peer ${
                    path === items.path && "underline decoration-white"
                  } flex-col`}
                >
                  <div className="flex flex-col">
                    <div className="flex items-center ">
                      <p className="text-white">{items.name} </p>
                      {items.name === "Categories" && (
                        <div>
                          <div className="group-hover:hidden block">
                            <ChevronUp size={18} color="white" />
                          </div>
                          <div className="hidden group-hover:block">
                            <ChevronDown size={18} color="white" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
                {items.name === "Categories" && (
                  <div className="p-2  absolute z-50 hidden hover:grid border-[0.2px] border-gray-700 rounded  bg-black peer-hover:grid grid-cols-2 gap-2">
                    {data.map((value, index) => (
                      <Link
                        href={`/pages/Category/${value.name}`}
                        key={index}
                        className={`text-white ${
                          path === items.path && "underline"
                        }  rounded hover:underline p-2 `}
                      >
                        {value.name}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
            {username ? (
              <DropdownUi />
            ) : (
              <Link
                href={"/pages/Auth/Signin"}
                className="bg-yellow-700 px-4 py-2 rounded text-sm hover:bg-yellow-500 text-white"
              >
                <p className="text-sm">Sign in</p>
              </Link>
            )}
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
          <ul className="gap-4 flex flex-col w-full ">
            {pages.map((items, index) => (
              <li key={index} className="w-full ">
                <button
                  onClick={() => {
                    if (items.name !== "Categories") {
                      router.push(items.link);
                    } else {
                      setIsDropDownOpen(!isDropDownOpen);
                    }
                  }}
                  className="hover:shadow border-b  w-full  rounded p-4  flex items-start justify-center flex-1"
                >
                  <p>{items.name}</p>
                  <div className="flex-1 flex justify-end ">
                    {items.name === "Categories" ? (
                      isDropDownOpen ? (
                        <ChevronUp size={18} color="black" />
                      ) : (
                        <ChevronDown size={18} color="black" />
                      )
                    ) : null}
                  </div>
                </button>
                {isDropDownOpen && items.name === "Categories" && (
                  <div className="flex flex-col bg-cyan-50 gap-2 my-2">
                    {data.map((value, index) => (
                      <Link
                        href={`/pages/Category/${value.name}`}
                        key={index}
                        className={`bg-cyan-100 ${
                          path === items.path && "underline"
                        }  rounded  shadow hover:shadow-l py-2 px-4 `}
                      >
                        {value.name}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
            <button
              onClick={() => {
                router.push("/pages/Auth/Signin");
              }}
              // href={"/pages/Auth/Signin"}
              className="bg-yellow-700 px-4 py-2 outline-none rounded hover:bg-yellow-500 w-auto"
            >
              <p>Sign in</p>
            </button>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Header;
