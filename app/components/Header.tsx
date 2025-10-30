"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  User,
  Search,
  Bell,
  LogOut,
  Settings,
  LayoutDashboard,
  ArrowRight,
} from "lucide-react";
import { UserAuth } from "@/useContext";
import { useRouter } from "next/navigation";
import { users } from "../types/context";
import Image from "next/image";
interface HeaderType {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

const DropDownSection = ({
  dropdownRef,
  isDropdownOpen,
  setIsDropdownOpen,
  userProfilePicture,
  username,
  logout,
}: {
  dropdownRef: React.RefObject<HTMLDivElement>;
  isDropdownOpen: boolean;
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userProfilePicture?: string;
  username: users;
  logout: () => void;
}) => {
  const router = useRouter();
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-2 p-1.5 lg:p-2 hover:bg-white/10 rounded-lg transition-all duration-200"
      >
        <div className="w-8 h-8 lg:w-9 lg:h-9 bg-gradient-to-br from-[#1ABC9C] to-[#087e66] rounded-full flex items-center justify-center ring-2 ring-white/10">
          {userProfilePicture ? (
            <Image
              src={userProfilePicture}
              className="rounded-full"
              alt="pp"
              width={32}
              height={32}
              objectFit="cover"
            />
          ) : (
            <User className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
          )}
        </div>
        <span className="hidden lg:block text-white text-sm font-medium">
          Profile
        </span>
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-gray-900/95 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl py-2 overflow-hidden">
          <div className="px-4 py-3 border-b border-white/10">
            <p className="text-white font-semibold text-sm">
              {username && username.firstName}
            </p>
            <p className="text-gray-400 text-xs mt-0.5">Premium Member</p>
          </div>

          <button
            onClick={() => router.push("/pages/Settings")}
            className="w-full flex items-center space-x-3 px-4 py-2.5 text-white hover:bg-white/10 transition-colors"
          >
            <User className="h-4 w-4" />
            <span className="text-sm">View Profile</span>
          </button>

          {username && username.role === "Admin" && (
            <button
              onClick={() => router.push("/pages/Dashboard")}
              className="w-full flex items-center space-x-3 px-4 py-2.5 text-white hover:bg-white/10 transition-colors"
            >
              <LayoutDashboard className="h-4 w-4" />{" "}
              <span className="text-sm">Dashboard</span>
            </button>
          )}
          <button
            onClick={() => router.push("/pages/Settings")}
            className="w-full flex items-center space-x-3 px-4 py-2.5 text-white hover:bg-white/10 transition-colors"
          >
            <Settings className="h-4 w-4" />
            <span className="text-sm">Settings</span>
          </button>

          <div className="border-t border-white/10 my-1"></div>

          <button
            onClick={() => {
              logout();
            }}
            className="w-full flex items-center space-x-3 px-4 py-2.5 text-[#1ABC9C] hover:bg-white/10 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span className="text-sm">Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
};
// Header Component
const Header = ({ onMenuToggle, isMenuOpen }: HeaderType) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated, userProfilePicture, username, logout } = UserAuth();
  const router = useRouter();
  const handleLogin = () => {
    router.push("/pages/Auth/Signin"); // Adjust the route as needed
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/pages/Search/${encodeURIComponent(searchQuery)}`);
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/95 backdrop-blur-lg shadow-lg"
          : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 lg:py-4">
        {/* Left section */}
        <div className="flex items-center space-x-4 lg:space-x-8">
          <button
            onClick={onMenuToggle}
            className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200 lg:hidden"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5 text-white" />
            ) : (
              <Menu className="h-5 w-5 text-white" />
            )}
          </button>

          <div className="flex items-center space-x-2 lg:space-x-3">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br  rounded-xl flex items-center justify-center shadow-lg shadow-torquoise-500/30">
              <Image
                src="/logo/vbox.png"
                alt="Logo"
                className="w-10 h-10 object-contain"
                width={40}
                height={40}
                priority
              />{" "}
            </div>
            <span className="text-xl lg:text-2xl font-bold text-white tracking-tight">
              VBox
            </span>
          </div>
        </div>

        {/* Center - Search */}
        <div className="hidden md:flex flex-1 max-w-xl lg:max-w-2xl mx-4 lg:mx-8">
          <div className="relative w-full">
            <div className="flex items-center bg-white/5 hover:bg-white/10 rounded-full border border-white/10 focus-within:border-[#087e66] focus-within:bg-white/10 transition-all duration-200">
              <Search className="h-5 w-5 text-gray-400 ml-4" />
              <input
                type="text"
                placeholder="Search movies, shows, sports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-white px-4 py-2.5 lg:py-3 focus:outline-none placeholder-gray-400 text-sm lg:text-base"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="p-2 hover:bg-white/10 rounded-full mr-2 transition-colors"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4 text-gray-400" />
                </button>
              )}
              {searchQuery && (
                <button
                  onClick={() => handleSearch()}
                  className="p-2 hover:bg-white/10 rounded-full mr-2 transition-colors"
                  aria-label="Clear search"
                >
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-2 lg:space-x-3">
          <button
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Search"
          >
            <Search className="h-5 w-5 text-white" />
          </button>

          {isAuthenticated && (
            <button
              className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200 relative group"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5 text-white" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#1ABC9C] rounded-full ring-2 ring-black"></span>
            </button>
          )}
          {isAuthenticated ? (
            <DropDownSection
              userProfilePicture={userProfilePicture!}
              dropdownRef={dropdownRef}
              isDropdownOpen={isDropdownOpen}
              setIsDropdownOpen={setIsDropdownOpen}
              username={username!}
              logout={logout}
            />
          ) : (
            <button
              onClick={handleLogin}
              className="flex items-center space-x-2 bg-[#1ABC9C] hover:bg-[#087e66] text-white px-4 py-2 rounded-lg transition-colors font-medium"
            >
              <User className="h-4 w-4" />
              <span>Login</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
