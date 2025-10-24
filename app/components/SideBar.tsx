/* eslint-disable @typescript-eslint/no-unused-vars */
import { Tv, Film, Trophy, Flame, Clock, Home } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Category, SidebarType } from "../types/sideBar";

// Sidebar Component
const Sidebar = ({
  //   activeCategory,
  onCategoryChange,
  isOpen,
  onClose,
}: SidebarType) => {
  const router = useRouter();
  const path = usePathname().split("/")[2];
  const categories: Category[] = [
    { id: "Home", name: "Home", icon: Home },
    { id: "Sports", name: "Sports", icon: Trophy },
    { id: "Movies", name: "Movies", icon: Film },
    { id: "tv", name: "TV Shows", icon: Tv },
    // { id: "trending", name: "Trending", icon: Flame },
    { id: "watchlist", name: "My List", icon: Clock },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed left-0 top-16 lg:top-20 bottom-0 w-64 lg:w-72 bg-gradient-to-b from-gray-900 to-black border-r border-white/5 z-40
          transform transition-all duration-300 ease-out
          overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <nav className="p-4 lg:p-6 space-y-1.5">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = path === category.id;
            return (
              <button
                key={category.id}
                onClick={() => {
                  router.push(`/pages/${category.id}`);
                  onCategoryChange(category.id);
                  onClose();
                }}
                className={`
                  group w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${
                    isActive
                      ? "bg-gradient-to-r from-[#1ABC9C] to-[#087e66] text-white shadow-lg shadow-[#087e66]"
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                  }
                `}
              >
                <Icon
                  className={`h-5 w-5 transition-transform duration-200 ${
                    isActive ? "" : "group-hover:scale-110"
                  }`}
                />
                <span className="font-medium">{category.name}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-4 lg:p-6 border-t border-white/5 mt-4">
          <h3 className="text-gray-400 text-xs font-semibold mb-3 uppercase tracking-wider px-4">
            Quick Access
          </h3>
          <div className="space-y-1">
            {["Recently Watched", "Settings"].map((item) => (
              <button
                key={item}
                className="w-full text-left px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
