/* eslint-disable @next/next/no-img-element */
"use client";

import {
  ChevronsUpDown,
  Home,
  Inbox,
  Radio,
  ShieldCheck,
  ShieldX,
  SquarePlay,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import DropdownUi from "./UserDropdownUi";

// Menu items.
const items = [
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
    title: "Live",
    url: "/pages/Dashboard/LiveStream",
    icon: Radio,
  },
  {
    title: "Videos",
    url: "/pages/Dashboard/Videos",
    icon: SquarePlay,
  },
];
// Menu items.
const item = [
  {
    title: "Users",
    url: "/pages/Dashboard/Users",

    metaData: [
      {
        title: "Active",
        params: {
          isActive: 1,
        },
        icon: ShieldCheck,
        color: "green",
      },
      {
        title: "Inactive",
        params: {
          isActive: 2,
        },
        icon: ShieldX,
        color: "red",
      },
    ],
    icon: Users,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="w-full bg-gray-500 bg-opacity-25 rounded justify-center flex">
          <img src={"/logo/vbox.png"} alt="logo" className="w-[100px]" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="text-white">
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <div className="w-full h-[0.2px]  bg-gray-700" />
              <div className="w-full text-white">
                {item.map((item, index) => (
                  <div key={index} className="w-full ">
                    <Collapsible>
                      <div className="w-full flex px-2 gap-1 py-2 rounded border-gray-700 items-center border">
                        <item.icon size={18} />
                        <span>{item.title}</span>
                        <div className="flex-1 flex justify-end ">
                          <CollapsibleTrigger>
                            <ChevronsUpDown className="h-4 w-4" />
                          </CollapsibleTrigger>
                        </div>
                      </div>
                      <CollapsibleContent>
                        <div className="border my-2 rounded border-gray-700">
                          {item.metaData.map((value) => (
                            <SidebarMenuItem key={item.title}>
                              <SidebarMenuButton asChild>
                                <a
                                  href={`${item.url}/${value.params.isActive}`}
                                  className="text-white"
                                >
                                  <value.icon color={value.color} />
                                  <span>{value.title}</span>
                                </a>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                ))}
              </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <DropdownUi />
      </SidebarFooter>
    </Sidebar>
  );
}
