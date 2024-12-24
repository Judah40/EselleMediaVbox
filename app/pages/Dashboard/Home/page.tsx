"use client";

import { AlertTriangle, Play, Server, Users } from "lucide-react";
import React from "react";
import StatCard from "../(component)/DashboardComponents/StatCard";
import ViewerChart from "../(component)/DashboardComponents/ViewerChart";
import AlertFeed from "../(component)/DashboardComponents/AlertFeed";

const page = () => {
  const viewerData = [
    { time: "00:00", viewers: 15000 },
    { time: "04:00", viewers: 12000 },
    { time: "08:00", viewers: 18000 },
    { time: "12:00", viewers: 25000 },
    { time: "16:00", viewers: 30000 },
    { time: "20:00", viewers: 28000 },
  ];

  const alerts = [
    {
      id: 1,
      message: "High memory usage detected",
      level: "critical" as const,
      time: "2m ago",
      isRead: false,
    },
    {
      id: 2,
      message: "CDN latency spike",
      level: "warning" as const,
      time: "15m ago",
      isRead: true,
    },
    {
      id: 3,
      message: "System update available",
      level: "info" as const,
      time: "1h ago",
      isRead: true,
    },
  ];

  const handleAlertClick = (alert: AlertItem) => {};

  return (
    <div className="flex-1 w-full h-full  flex items-center flex-col">
      {/* header */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Users"
          value="24,892"
          trend="up"
          trendValue="12% from last hour"
          icon={Users}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Active Streams"
          value="8,245"
          trend="down"
          trendValue="3% from last hour"
          icon={Play}
          iconBgColor="bg-purple-100"
          iconColor="text-purple-600"
        />
        <StatCard
          title="Server Load"
          value="72%"
          trend="up"
          trendValue="Normal Range"
          icon={Server}
          iconBgColor="bg-yellow-100"
          iconColor="text-yellow-600"
        />
        <StatCard
          title="System Alerts"
          value="7"
          trend="up"
          trendValue="2 Critical"
          icon={AlertTriangle}
          iconBgColor="bg-red-100"
          iconColor="text-red-600"
        />
        {/* Add more StatCards as needed */}
      </div>

      <ViewerChart
        data={viewerData}
        title="Live Viewer Count"
        className="col-span-1 lg:col-span-2"
      />
      <AlertFeed
        alerts={alerts}
        onAlertClick={handleAlertClick}
        className="col-span-1"
      />
    </div>
  );
};

export default page;
