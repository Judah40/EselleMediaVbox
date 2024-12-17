"use client";

import React, { useState } from "react";
import {
  Camera,
  Lock,
  User,
  Heart,
  CreditCard,
  ChevronRight,
  Upload,
  X,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import Image from "next/image";

interface UserDetails {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  username: string;
  dateOfBirth: string;
  gender: string;
  isActive: boolean;
  profile_picture: string;
}

interface Category {
  name: string;
}

const categories: Category[] = [
  { name: "sports" },
  { name: "lifestyle" },
  { name: "documentaries" },
  { name: "tech" },
  { name: "news" },
  { name: "films" },
  { name: "fashion" },
  { name: "tv shows" },
  { name: "podcasts" },
  { name: "personal development" },
  { name: "adult education" },
  { name: "health & fitness" },
  { name: "comedy" },
  { name: "tv series" },
  { name: "kids entertainment" },
  { name: "kids education" },
  { name: "culture and tradition" },
  { name: "international" },
];

const Dashboard: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [userDetails, setUserDetails] = useState<UserDetails>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    username: "",
    dateOfBirth: "",
    gender: "",
    isActive: true,
    profile_picture: "",
  });

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleUserDetailsUpdate = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4  min-h-screen text-white">
      <Link
        href={"/"}
        className="lg:absolute items-center flex flex-col  lg:top-4 lg:left-4"
      >
        <Image src={"/logo/vbox.png"} width={100} height={100} alt="logo" />
      </Link>
      <h1 className="text-3xl font-bold mb-6 text-cyan-400 text-center">
        Account Settings
      </h1>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-gray-800">
          <TabsTrigger
            value="profile"
            className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white"
          >
            Profile
          </TabsTrigger>
          <TabsTrigger
            value="password"
            className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white"
          >
            Password
          </TabsTrigger>
          <TabsTrigger
            value="details"
            className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white"
          >
            Details
          </TabsTrigger>
          <TabsTrigger
            value="favorites"
            className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white"
          >
            Favorites
          </TabsTrigger>
          <TabsTrigger
            value="payment"
            className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white"
          >
            Payment
          </TabsTrigger>
        </TabsList>

        {/* Profile Picture Section */}
        <TabsContent value="profile">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-cyan-400">Profile Picture</CardTitle>
              <CardDescription className="text-gray-400">
                Update your profile picture
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center">
                    {userDetails.profile_picture ? (
                      <img
                        src={userDetails.profile_picture}
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-16 h-16 text-gray-400" />
                    )}
                  </div>
                  <button className="absolute bottom-0 right-0 p-2 bg-cyan-500 rounded-full text-white hover:bg-cyan-600">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex justify-center mt-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600">
                  <Upload className="w-4 h-4" />
                  Upload New Picture
                </button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Password Section */}
        <TabsContent value="password">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-cyan-400">Password Settings</CardTitle>
              <CardDescription className="text-gray-400">
                Update your password
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-300">
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="w-full p-2 rounded-lg bg-gray-700 border-gray-600 text-white"
                    placeholder="Enter current password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-300">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="w-full p-2 rounded-lg bg-gray-700 border-gray-600 text-white"
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-300">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="w-full p-2 rounded-lg bg-gray-700 border-gray-600 text-white"
                    placeholder="Confirm new password"
                  />
                </div>
                <button className="w-full py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600">
                  Update Password
                </button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* User Details Section */}
        <TabsContent value="details">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-cyan-400">User Details</CardTitle>
              <CardDescription className="text-gray-400">
                Update your personal information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-300">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={userDetails.firstName}
                      onChange={handleUserDetailsUpdate}
                      className="w-full p-2 border rounded-lg bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-300">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={userDetails.lastName}
                      onChange={handleUserDetailsUpdate}
                      className="w-full p-2 border rounded-lg bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-300">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={userDetails.email}
                      onChange={handleUserDetailsUpdate}
                      className="w-full p-2 border rounded-lg bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-300">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={userDetails.phoneNumber}
                      onChange={handleUserDetailsUpdate}
                      className="w-full p-2 border rounded-lg bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-300">
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={userDetails.username}
                      onChange={handleUserDetailsUpdate}
                      className="w-full p-2 border rounded-lg bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-300">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={userDetails.dateOfBirth}
                      onChange={handleUserDetailsUpdate}
                      className="w-full p-2 border rounded-lg bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-300">
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={userDetails.gender}
                      onChange={handleUserDetailsUpdate}
                      className="w-full p-2 border rounded-lg bg-gray-700 border-gray-600 text-white"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-300">
                      Account Status
                    </label>
                    <div className="flex items-center mt-2">
                      <input
                        type="checkbox"
                        name="isActive"
                        checked={userDetails.isActive}
                        onChange={(e) =>
                          setUserDetails((prev) => ({
                            ...prev,
                            isActive: e.target.checked,
                          }))
                        }
                        className="mr-2"
                      />
                      <span className="text-gray-300">Active</span>
                    </div>
                  </div>
                </div>
                <button className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  Save Changes
                </button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Favorites Section */}
        <TabsContent value="favorites">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-cyan-400">Favorites</CardTitle>
              <CardDescription className="text-gray-400">
                Select your favorite categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      onClick={() => handleCategoryToggle(category.name)}
                      className={`px-4 py-2 rounded-full flex items-center gap-2 ${
                        selectedCategories.includes(category.name)
                          ? "bg-cyan-500 text-white"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      }`}
                    >
                      {category.name}
                      {selectedCategories.includes(category.name) && (
                        <X className="w-4 h-4" />
                      )}
                    </button>
                  ))}
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-cyan-400 mb-2">
                    Selected Categories
                  </h3>
                  <div className="bg-gray-700 p-4 rounded-lg">
                    {selectedCategories.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {selectedCategories.map((category) => (
                          <span
                            key={category}
                            className="bg-cyan-600 text-white px-3 py-1 rounded-full text-sm"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-400">No categories selected</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Section */}
        <TabsContent value="payment">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-cyan-400">Payment Methods</CardTitle>
              <CardDescription className="text-gray-400">
                Manage your payment information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border border-gray-700 rounded-lg p-4 flex items-center justify-between bg-gray-700">
                  <div className="flex items-center gap-4">
                    <CreditCard className="w-6 h-6 text-cyan-400" />
                    <div>
                      <p className="font-medium text-white">
                        •••• •••• •••• 4242
                      </p>
                      <p className="text-sm text-gray-400">Expires 12/24</p>
                    </div>
                  </div>
                  <button className="text-cyan-400 hover:text-cyan-300">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                <button className="w-full py-2 border-2 border-dashed border-gray-600 rounded-lg text-gray-400 hover:bg-gray-700">
                  Add New Payment Method
                </button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
