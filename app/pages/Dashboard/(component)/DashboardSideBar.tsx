import React, {  useState } from "react";
import Image from "next/image";
import {
  ChevronsLeft,
  ChevronsRight,
  Home,
  Inbox,
  Radio,
  ShieldCheck,
  ShieldX,
  SquarePlay,
  Users,
  ChevronDown,
  LogOut,
} from "lucide-react";
import { UserAuth } from "@/useContext";
import { usePathname, useRouter } from "next/navigation";

const menuItems = [
  {
    title: "Home",
    url: "/pages/Dashboard",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "/pages/Dashboard/Inbox",
    icon: Inbox,
  },
  {
    title: "LiveStream",
    url: "/pages/Dashboard/LiveStream",
    icon: Radio,
  },
  {
    title: "Videos",
    url: "/pages/Dashboard/Videos",
    icon: SquarePlay,
  },
];

const userManagementItems = {
  title: "Users",
  url: "/pages/Dashboard/Users",
  icon: Users,
  subItems: [
    {
      title: "Active",
      url: "/pages/Dashboard/Users/1",
      icon: ShieldCheck,
      color: "text-green-500",
    },
    {
      title: "Inactive",
      url: "/pages/Dashboard/Users/2",
      icon: ShieldX,
      color: "text-red-500",
    },
  ],
};

export function AppSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const { logout, username, userProfilePicture } = UserAuth();
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  const path = usePathname();
  const currentPath = path.split("/")[3];

  const router = useRouter();

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
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-zinc-800">
        {!isCollapsed && (
          <button
            onClick={() => {
              router.push("/");
            }}
            className="flex items-center space-x-3"
          >
            <img
              src="/logo/vbox.png"
              alt="Logo"
              className="w-10 h-10 object-contain"
            />
            <span className="font-bold text-xl text-white">VBox</span>
          </button>
        )}
        <button
          onClick={toggleSidebar}
          className="hover:bg-zinc-800 p-2 rounded-full transition-all"
        >
          {isCollapsed ? <ChevronsRight /> : <ChevronsLeft />}
        </button>
      </div>

      {/* Main Menu */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.title}
              item={item}
              isCollapsed={isCollapsed}
              currentPath={currentPath}
            />
          ))}

          {/* User Management Section */}
          <div className="px-4">
            <button
              onClick={() =>
                setActiveSection(activeSection === "users" ? null : "users")
              }
              className={`
                w-full 
                flex 
                items-center 
                p-3 
                rounded-lg 
                transition-all 
                ${
                  activeSection === "users"
                    ? "bg-zinc-800"
                    : "hover:bg-zinc-800"
                }
              `}
            >
              <Users className="w-5 h-5 mr-3" />
              {!isCollapsed && (
                <div className="flex-1 flex justify-between items-center">
                  <span>Users</span>
                  <ChevronDown
                    className={`
                      w-4 h-4 
                      transition-transform 
                      ${activeSection === "users" ? "rotate-180" : ""}
                    `}
                  />
                </div>
              )}
            </button>

            {!isCollapsed && activeSection === "users" && (
              <div className="mt-2 space-y-1 pl-3">
                {userManagementItems.subItems.map((subItem) => (
                  <a
                    key={subItem.title}
                    href={subItem.url}
                    className={`
                      flex 
                      items-center 
                      p-2 
                      rounded-lg 
                      hover:bg-zinc-800 
                      ${subItem.color}
                    `}
                  >
                    <subItem.icon className="w-4 h-4 mr-2" />
                    {subItem.title}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Footer / User Section */}
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
              <div>
                <Image
                  src={userProfilePicture || "/default-profile.png"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  width={40}
                  height={40}
                />
              </div>
              <div>
                <div className="text-white font-semibold">
                  {username?.firstName} {username?.lastName}
                </div>
                <div className="text-xs text-gray-400">{username?.role}</div>
              </div>
            </div>
          )}

          <div className="relative">
            <button
              onClick={() => logout()}
              className="hover:bg-zinc-800 p-2 rounded-full flex transition-all"
            >
              <LogOut className="w-4 h-4 text-red-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Individual Sidebar Item Component
interface SidebarItemProps {
  item: {
    title: string;
    url: string;
    icon: React.ComponentType<{ className?: string }>;
  };
  isCollapsed: boolean;
  currentPath: string;
}

function SidebarItem({ item, isCollapsed, currentPath }: SidebarItemProps) {
  return (
    <a
      href={item.url}
      className={`
        px-4 
        py-3 
        flex 
        items-center 
        transition-all 
        hover:bg-zinc-800
        ${isCollapsed ? "justify-center" : ""}
        ${currentPath === item.title ? "bg-zinc-800" : ""}
      `}
    >
      <item.icon className="w-5 h-5" />
      {!isCollapsed && <span className="ml-3">{item.title}</span>}
    </a>
  );
}

export default AppSidebar;
