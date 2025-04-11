"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown, User, Search, Bell, BookmarkIcon } from "lucide-react";
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
  DropdownMenuSeparator,
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
  const [showSearchBar, setShowSearchBar] = useState(false);

  const pages = [
    { name: "Home", link: "/pages/Home", path: "Home", icon: "home" },
    { name: "Categories", link: "", categories: data, icon: "grid" },
    { name: "Live Events", link: "/pages/Live", path: "Live", icon: "radio" },
    { name: "Channels", link: "/pages/Channels", path: "Channels", icon: "tv" },
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
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-black/85 backdrop-blur-md shadow-lg shadow-yellow-900/10"
          : "bg-gradient-to-b from-black/95 to-transparent"
      } border-b ${isScrolled ? "border-yellow-900/20" : "border-transparent"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <div className="flex-shrink-0 group">
            <Link href="/pages/Home">
              <div className="relative overflow-hidden">
                <Image
                  src="/logo/vbox.png"
                  width={100}
                  height={100}
                  alt="logo"
                  className="h-10 w-auto transition-all duration-300 group-hover:scale-110 group-hover:brightness-125"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out" />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                {pages.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    {item.categories ? (
                      <>
                        <NavigationMenuTrigger className={`text-white hover:text-yellow-400 transition-all px-3 py-2 rounded-lg hover:bg-white/5 ${
                          path === item.path ? "text-yellow-400 font-medium" : ""
                        }`}>
                          {item.name}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="grid grid-cols-2 gap-2 p-4 w-[450px] bg-black/95 backdrop-blur-xl rounded-xl border border-yellow-900/30 shadow-xl shadow-black/50">
                            {item.categories.map((category) => (
                              <Link
                                key={category.name}
                                href={`/pages/Category/${category.name}`}
                                className="block p-3 hover:bg-yellow-950/40 rounded-lg transition-all text-white hover:text-yellow-400 group"
                                prefetch={true}
                              >
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-yellow-600 opacity-0 group-hover:opacity-100 transition-all"></div>
                                  <span>{category.name}</span>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <Link
                        href={item.link}
                        className={`text-white hover:text-yellow-400 transition-all px-3 py-2 rounded-lg hover:bg-yellow-950/20 flex items-center gap-2 ${
                          path === item.path
                            ? "bg-yellow-950/30 text-yellow-400 font-medium"
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

            {/* Action buttons */}
            <div className="flex items-center gap-4">
              {/* Search button */}
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-white hover:text-yellow-400 hover:bg-yellow-950/30"
                onClick={() => setShowSearchBar(!showSearchBar)}
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* Notifications button - only when logged in */}
              {username && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-white hover:text-yellow-400 hover:bg-yellow-950/30 relative"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-yellow-500 rounded-full"></span>
                </Button>
              )}

              {/* Bookmarks button - only when logged in */}
              {username && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-white hover:text-yellow-400 hover:bg-yellow-950/30"
                >
                  <BookmarkIcon className="h-5 w-5" />
                </Button>
              )}

              {/* User profile or sign in */}
              {username ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full bg-gradient-to-br from-yellow-600 to-yellow-800 hover:from-yellow-500 hover:to-yellow-700 ring-1 ring-yellow-500/20 hover:ring-yellow-400/40 transition-all"
                    >
                      {userProfilePicture ? (
                        <div className="rounded-full overflow-hidden h-8 w-8 border-2 border-black">
                          <Image
                            src={userProfilePicture}
                            width={32}
                            height={32}
                            alt="profile picture"
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <User className="h-5 w-5 text-white" />
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-56 bg-black/95 backdrop-blur-xl border-yellow-900/30 rounded-xl shadow-xl shadow-black/50 p-1 mt-1"
                  >
                    <div className="px-3 py-2 mb-1">
                      <p className="text-sm font-medium text-white">{username.firstName}</p>
                      <p className="text-xs text-yellow-500/80">{username.role}</p>
                    </div>
                    <DropdownMenuSeparator className="bg-yellow-900/20" />
                    <DropdownMenuItem
                      onClick={() => router.push("/pages/Settings")}
                      className="text-white hover:text-yellow-400 hover:bg-yellow-950/40 py-2 rounded-lg cursor-pointer"
                    >
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        if (username.role === "Admin") {
                          router.push("/pages/Dashboard");
                        } else {
                          router.push("/pages/Settings");
                        }
                      }}
                      className="text-white hover:text-yellow-400 hover:bg-yellow-950/40 py-2 rounded-lg cursor-pointer"
                    >
                      {username.role === "Admin" ? "Dashboard" : "Settings"}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-yellow-900/20" />
                    <DropdownMenuItem
                      onClick={() => logout()}
                      className="text-white hover:text-red-400 hover:bg-red-950/30 py-2 rounded-lg cursor-pointer mt-1"
                    >
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  href={"/pages/Auth/Signin"}
                  prefetch
                  className="bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-500 hover:to-yellow-600 text-white px-5 py-2 rounded-lg font-medium transition-all hover:shadow-md hover:shadow-yellow-900/20 ring-1 ring-yellow-500/20 hover:ring-yellow-400/40"
                >
                  Sign in
                </Link>
              )}
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-yellow-400 hover:bg-yellow-950/30 rounded-full"
              onClick={() => setShowSearchBar(!showSearchBar)}
            >
              <Search className="h-5 w-5" />
            </Button>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-yellow-400 transition-colors p-1 rounded-lg hover:bg-yellow-950/30"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Search bar overlay */}
      <div
        className={`absolute w-full left-0 transition-all duration-300 ease-in-out ${
          showSearchBar ? "top-full opacity-100" : "-top-20 opacity-0 pointer-events-none"
        }`}
      >
        <div className="max-w-3xl mx-auto p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search content..."
              className="w-full bg-black/90 text-white border border-yellow-900/30 rounded-xl py-3 px-4 pl-12 focus:outline-none focus:ring-2 focus:ring-yellow-600/50 placeholder-gray-500"
            />
            <Search className="h-5 w-5 text-yellow-500 absolute left-4 top-1/2 transform -translate-y-1/2" />
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        } overflow-hidden bg-black/95 backdrop-blur-md border-t border-yellow-900/20`}
      >
        <div className="px-4 pt-2 pb-6 space-y-2">
          {pages.map((item) => (
            <div key={item.name} className="py-1">
              {item.categories ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="w-full text-left px-4 py-3 text-white hover:text-yellow-400 transition-colors rounded-lg hover:bg-yellow-950/30">
                    <div className="flex justify-between items-center">
                      {item.name}
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64 bg-black/95 backdrop-blur-xl border-yellow-900/30 rounded-xl shadow-xl shadow-black/50">
                    {item.categories.map((category) => (
                      <DropdownMenuItem key={category.name}>
                        <Link
                          href={`/pages/Category/${category.name}`}
                          className="w-full text-white hover:text-yellow-400 py-2"
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
                  className={`block px-4 py-3 text-white hover:text-yellow-400 transition-colors rounded-lg hover:bg-yellow-950/30 ${
                    path === item.path
                      ? "bg-yellow-950/40 text-yellow-400"
                      : ""
                  }`}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}

          {username && (
            <div className="py-1 flex space-x-2">
              <Link
                href="/pages/Notifications"
                className="flex-1 px-4 py-3 text-white hover:text-yellow-400 transition-colors rounded-lg hover:bg-yellow-950/30 flex items-center justify-center"
              >
                <Bell className="h-5 w-5" />
              </Link>
              <Link
                href="/pages/Bookmarks"
                className="flex-1 px-4 py-3 text-white hover:text-yellow-400 transition-colors rounded-lg hover:bg-yellow-950/30 flex items-center justify-center"
              >
                <BookmarkIcon className="h-5 w-5" />
              </Link>
            </div>
          )}

          {!username ? (
            <div className="pt-4">
              <Button
                onClick={() => router.push("/pages/Auth/Signin")}
                className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-500 hover:to-yellow-600 text-white py-6 rounded-xl font-medium transition-all hover:shadow-md hover:shadow-yellow-900/20"
              >
                Sign in
              </Button>
            </div>
          ) : (
            <div className="pt-4 gap-3 flex flex-col">
              <div className="flex items-center gap-3 px-4 py-2">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-yellow-600 to-yellow-800 flex items-center justify-center overflow-hidden">
                  {userProfilePicture ? (
                    <Image
                      src={userProfilePicture}
                      width={48}
                      height={48}
                      alt="profile picture"
                      className="object-cover"
                    />
                  ) : (
                    <User className="h-6 w-6 text-white" />
                  )}
                </div>
                <div>
                  <p className="text-white font-medium">{username.firstName}</p>
                  <p className="text-xs text-yellow-500/80">{username.role}</p>
                </div>
              </div>
              
              <Link
                href={"/pages/Settings"}
                className="text-center w-full bg-yellow-900/30 hover:bg-yellow-800/40 text-white py-3 rounded-lg transition-all border border-yellow-900/30"
              >
                Settings
              </Link>
              
              {username.role === "Admin" && (
                <Link
                  href={"/pages/Dashboard"}
                  className="text-center w-full bg-yellow-900/30 hover:bg-yellow-800/40 text-white py-3 rounded-lg transition-all border border-yellow-900/30"
                >
                  Dashboard
                </Link>
              )}
              
              <Button
                onClick={() => logout()}
                className="w-full bg-red-900/30 hover:bg-red-800/40 text-white py-6 rounded-lg transition-all border border-red-900/30"
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