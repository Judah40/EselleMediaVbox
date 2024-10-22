"use client";

import React from "react";
import {
  Calendar,
  Home,
  Inbox,
  LogOut,
  Search,
  Settings,
  Tv,
  Video,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/page/Dashboard/Home",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "/page/Dashboard/Inbox",
    icon: Inbox,
  },
  {
    title: "Video",
    url: "/page/Dashboard/Videos",
    icon: Video,
  },
  {
    title: "Live Stream",
    url: "/page/Dashboard/LiveStream",
    icon: Tv,
  },
];

const DashboardSideBar = () => {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <Image src={"/logo/vbox.png"} width={100} height={100} alt="logo" />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className="hover:text-gray-700 text-white"
                    >
                      <item.icon />
                      <span className=" ">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenuButton>
          <a className="text-white flex">
            <p>Logout</p>
            <LogOut />
          </a>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSideBar;
