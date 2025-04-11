'use client'
import React from 'react';
import { 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Users, 
  DollarSign, 
  ShoppingCart, 
  Eye,
  TrendingUp
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  const revenueData = [
    { month: 'Jan', revenue: 2400 },
    { month: 'Feb', revenue: 3600 },
    { month: 'Mar', revenue: 3200 },
    { month: 'Apr', revenue: 4500 },
    { month: 'May', revenue: 4200 },
    { month: 'Jun', revenue: 5800 }
  ];

  const pieData = [
    { name: 'Desktop', value: 45 },
    { name: 'Mobile', value: 35 },
    { name: 'Tablet', value: 20 }
  ];

  const userActivityData = [
    { day: 'Mon', active: 1200, new: 400 },
    { day: 'Tue', active: 1400, new: 450 },
    { day: 'Wed', active: 1600, new: 550 },
    { day: 'Thu', active: 1400, new: 500 },
    { day: 'Fri', active: 1800, new: 600 }
  ];

  const COLORS = ['#818cf8', '#ec4899', '#a78bfa'];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomTooltip = ({ active, payload, label }: { active?: boolean, payload?: any[], label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <p className="text-gray-300">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-gray-300">
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-4 md:p-6 over w-full overflow-y-scroll bg-gray-900 min-h-screen">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="bg-indigo-900/50 p-3 rounded-lg">
                <Users className="h-6 w-6 text-indigo-400" />
              </div>
              <span className="flex items-center text-sm text-green-400">
                <ArrowUpRight className="h-4 w-4 mr-1" /> +12.5%
              </span>
            </div>
            <div className="mt-4">
              <CardTitle className="text-2xl font-bold text-gray-100">2,247</CardTitle>
              <p className="text-gray-400 text-sm">Total Users</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="bg-pink-900/50 p-3 rounded-lg">
                <DollarSign className="h-6 w-6 text-pink-400" />
              </div>
              <span className="flex items-center text-sm text-green-400">
                <ArrowUpRight className="h-4 w-4 mr-1" /> +8.2%
              </span>
            </div>
            <div className="mt-4">
              <CardTitle className="text-2xl font-bold text-gray-100">$84,325</CardTitle>
              <p className="text-gray-400 text-sm">Total Revenue</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="bg-purple-900/50 p-3 rounded-lg">
                <ShoppingCart className="h-6 w-6 text-purple-400" />
              </div>
              <span className="flex items-center text-sm text-red-400">
                <ArrowDownRight className="h-4 w-4 mr-1" /> -3.1%
              </span>
            </div>
            <div className="mt-4">
              <CardTitle className="text-2xl font-bold text-gray-100">1,423</CardTitle>
              <p className="text-gray-400 text-sm">Total Orders</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="bg-blue-900/50 p-3 rounded-lg">
                <Eye className="h-6 w-6 text-blue-400" />
              </div>
              <span className="flex items-center text-sm text-green-400">
                <ArrowUpRight className="h-4 w-4 mr-1" /> +14.2%
              </span>
            </div>
            <div className="mt-4">
              <CardTitle className="text-2xl font-bold text-gray-100">12,847</CardTitle>
              <p className="text-gray-400 text-sm">Total Views</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-100">Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] sm:h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#818cf8" 
                    strokeWidth={2}
                    dot={{ fill: '#818cf8' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-100">User Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] sm:h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userActivityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="day" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="active" fill="#818cf8" />
                  <Bar dataKey="new" fill="#ec4899" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-gray-800 border-gray-700 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-gray-100">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg border border-gray-600 hover:bg-gray-700 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-gray-300" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-200">Transaction #{1000 + i}</p>
                      <p className="text-sm text-gray-400">2 minutes ago</p>
                    </div>
                  </div>
                  <span className="font-medium text-green-400">+$250.00</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-100">Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] sm:h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;