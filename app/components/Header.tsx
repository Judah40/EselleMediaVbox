"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { UserAuth } from "@/useContext";
import { data } from "../api/DummyData/data";

const Header = () => {
  const { username, userProfilePicture, logout } = UserAuth();
  const path = usePathname().split("/")[2];
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pages = [
    { name: "Home", link: "/pages/Home", path: "Home" },
    { name: "VOD", link: "/pages/videoOnDemand", path: "videoOnDemand" },
    { name: "Categories", link: "", categories: data },
    { name: "Live Events", link: "/pages/Live", path: "Live" },
    { name: "Channels", link: "/pages/Channels", path: "Channels" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/90 backdrop-blur-sm shadow-lg"
          : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/pages/Home">
              <Image
                src="/logo/vbox.png"
                width={100}
                height={100}
                alt="logo"
                className="h-8 w-auto transition-transform hover:scale-105"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                {pages.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    {item.categories ? (
                      <>
                        <NavigationMenuTrigger className="text-white hover:text-yellow-400 transition-colors">
                          {item.name}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="grid grid-cols-2 gap-3 p-4 w-[400px] bg-black/95 backdrop-blur-sm rounded-lg border border-gray-800">
                            {item.categories.map((category) => (
                              <Link
                                key={category.name}
                                href={`/pages/Category/${category.name}`}
                                className="block p-3 hover:bg-white/10 rounded-md transition-colors text-white hover:text-yellow-400"
                              >
                                {category.name}
                              </Link>
                            ))}
                          </div>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <Link
                        href={item.link}
                        className={`text-white hover:text-yellow-400 transition-colors px-3 py-2 text-sm ${
                          path === item.path
                            ? "border-b-2 border-yellow-400"
                            : ""
                        }`}
                      >
                        {item.name}
                      </Link>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            {username ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-yellow-700 hover:bg-yellow-600"
                  >
                    {userProfilePicture ? (
                      <Image
                        src={userProfilePicture}
                        width={30}
                        height={30}
                        alt="profile picture"
                      />
                    ) : (
                      <User className="h-5 w-5 text-white" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48 bg-black/95 backdrop-blur-sm border-gray-800"
                >
                  <DropdownMenuItem
                    onClick={() => router.push("/pages/Settings")}
                    className="text-white hover:text-yellow-400"
                  >
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => router.push("/pages/Settings")}
                    className="text-white hover:text-yellow-400"
                  >
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-white hover:text-yellow-400">
                    <button
                      onClick={() => {
                        logout();
                      }}
                    >
                      Sign out
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={() => router.push("/pages/Auth/Signin")}
                className="bg-yellow-700 hover:bg-yellow-600 text-white px-6"
              >
                Sign in
              </Button>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white hover:text-yellow-400 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden bg-black/95 backdrop-blur-sm`}
      >
        <div className="px-4 pt-2 pb-4 space-y-2">
          {pages.map((item) => (
            <div key={item.name} className="py-2">
              {item.categories ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="w-full text-left px-4 py-2 text-white hover:text-yellow-400 transition-colors">
                    <div className="flex justify-between items-center">
                      {item.name}
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full bg-gray-900/95 backdrop-blur-sm">
                    {item.categories.map((category) => (
                      <DropdownMenuItem key={category.name}>
                        <Link
                          href={`/pages/Category/${category.name}`}
                          className="w-full text-white hover:text-yellow-400"
                        >
                          {category.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  href={item.link}
                  className={`block px-4 py-2 text-white hover:text-yellow-400 transition-colors ${
                    path === item.path
                      ? "border-l-4 border-yellow-400 pl-3"
                      : ""
                  }`}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}

          {!username ? (
            <div className="pt-4">
              <Button
                onClick={() => router.push("/pages/Auth/Signin")}
                className="w-full bg-yellow-700 hover:bg-yellow-600 text-white"
              >
                Sign in
              </Button>
            </div>
          ) : (
            <div className="pt-4 gap-2 flex flex-col">
              <Link
                href={"/pages/Settings"}
                className="w-full bg-yellow-700 hover:bg-yellow-600 text-white"
              >
                Setting{" "}
              </Link>
              <Button
                onClick={() => logout()}
                className="w-full bg-red-700 hover:bg-red-600 text-white"
              >
                Sign out
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
