import React from "react";
import {
  ChevronsLeft,
  ChevronsRight,
  Home,
  Inbox,
  Radio,
  SquarePlay,
  Users,
  ChevronDown,
  LogOut,
} from "lucide-react";

const menuItems = [
  { title: "Home", icon: Home },
  { title: "Inbox", icon: Inbox },
  { title: "LiveStream", icon: Radio },
  { title: "Videos", icon: SquarePlay },
];

// Skeleton Component
function Skeleton({ className = "" }) {
  return <div className={`animate-pulse bg-zinc-700 rounded ${className}`} />;
}

// Sidebar Skeleton Loader
export default function SidebarSkeleton({
  isCollapsed,
}: {
  isCollapsed: boolean;
}) {
  return (
    <div
      className={`
        h-screen 
        bg-zinc-900 
        text-gray-300 
        transition-all 
        duration-300 
        ease-in-out 
        flex 
        flex-col 
        ${isCollapsed ? "w-20" : "w-64"}
        border-r 
        border-zinc-800
        shadow-2xl
      `}
    >
      {/* Header Skeleton */}
      <div className="p-4 flex items-center justify-between border-b border-zinc-800">
        {!isCollapsed && (
          <div className="flex items-center space-x-3">
            <Skeleton className="w-10 h-10" />
            <Skeleton className="h-6 w-20" />
          </div>
        )}
        <button className="hover:bg-zinc-800 p-2 rounded-full transition-all">
          {isCollapsed ? <ChevronsRight /> : <ChevronsLeft />}
        </button>
      </div>

      {/* Main Menu Skeleton */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`
                px-4 
                py-3 
                flex 
                items-center 
                ${isCollapsed ? "justify-center" : ""}
              `}
            >
              <item.icon className="w-5 h-5 text-zinc-600" />
              {!isCollapsed && <Skeleton className="ml-3 h-5 w-24" />}
            </div>
          ))}

          {/* Users Section Skeleton */}
          <div className="px-4">
            <div className="w-full flex items-center p-3 rounded-lg">
              <Users className="w-5 h-5 mr-3 text-zinc-600" />
              {!isCollapsed && (
                <div className="flex-1 flex justify-between items-center">
                  <Skeleton className="h-5 w-16" />
                  <ChevronDown className="w-4 h-4 text-zinc-600" />
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Footer / User Section Skeleton */}
      <div className="border-t border-zinc-800 p-4">
        <div
          className={`
            flex 
            items-center 
            ${isCollapsed ? "justify-center" : "justify-between"}
          `}
        >
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          )}

          <button className="hover:bg-zinc-800 p-2 rounded-full flex transition-all">
            <LogOut className="w-4 h-4 text-zinc-600" />
          </button>
        </div>
      </div>
    </div>
  );
}
