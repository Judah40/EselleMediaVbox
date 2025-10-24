"use client";

import { StreamContextProvider } from "@/Provider/streamContext";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <StreamContextProvider>{children}</StreamContextProvider>;
}
