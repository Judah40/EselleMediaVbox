"use client";

import React, { useState } from "react";
import {
  Camera,
  User,
  CreditCard,
  ChevronRight,
  Upload,
  X,
  Star,
  Key,
  FileText,
  CreditCard as CardIcon,
  Menu,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HomeLayoutWrapper from "@/app/layouts/HomeLayoutWrapper";

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
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails>({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phoneNumber: "+1 (555) 123-4567",
    username: "johndoe",
    dateOfBirth: "1990-01-01",
    gender: "male",
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
    <HomeLayoutWrapper>
      <div className="flex flex-col min-h-screen pt-20 bg-gray-900 text-gray-100">
        {/* Mobile Menu Button */}
        <div className="md:hidden mx-4 mb-4">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center justify-center p-2 rounded-lg bg-gray-800 text-gray-200"
          >
            <Menu className="w-6 h-6" />
            <span className="ml-2">Menu</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto bg-gray-900 px-4 sm:px-6 lg:px-8 ">
          <main className="max-w-7xl mx-auto py-4 md:py-6">
            <Tabs defaultValue="profile" className="w-full">
              {/* Mobile tablist and desktop tablist */}
              <TabsList className={`flex flex-wrap bg-gray-800 p-1 rounded-lg shadow-sm mb-6 ${menuOpen ? 'flex-col' : 'hidden md:flex md:flex-row'}`}>
                <TabsTrigger
                  value="profile"
                  className="flex-1 py-2 md:py-3 data-[state=active]:bg-amber-500 data-[state=active]:text-gray-900 rounded-md px-4 text-sm md:text-base mb-1 md:mb-0"
                  onClick={() => setMenuOpen(false)}
                >
                  <User className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2 inline-block" />
                  Profile
                </TabsTrigger>
                <TabsTrigger
                  value="password"
                  className="flex-1 py-2 md:py-3 data-[state=active]:bg-amber-500 data-[state=active]:text-gray-900 rounded-md px-4 text-sm md:text-base mb-1 md:mb-0"
                  onClick={() => setMenuOpen(false)}
                >
                  <Key className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2 inline-block" />
                  Password
                </TabsTrigger>
                <TabsTrigger
                  value="details"
                  className="flex-1 py-2 md:py-3 data-[state=active]:bg-amber-500 data-[state=active]:text-gray-900 rounded-md px-4 text-sm md:text-base mb-1 md:mb-0"
                  onClick={() => setMenuOpen(false)}
                >
                  <FileText className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2 inline-block" />
                  Details
                </TabsTrigger>
                <TabsTrigger
                  value="favorites"
                  className="flex-1 py-2 md:py-3 data-[state=active]:bg-amber-500 data-[state=active]:text-gray-900 rounded-md px-4 text-sm md:text-base mb-1 md:mb-0"
                  onClick={() => setMenuOpen(false)}
                >
                  <Star className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2 inline-block" />
                  Favorites
                </TabsTrigger>
                <TabsTrigger
                  value="payment"
                  className="flex-1 py-2 md:py-3 data-[state=active]:bg-amber-500 data-[state=active]:text-gray-900 rounded-md px-4 text-sm md:text-base"
                  onClick={() => setMenuOpen(false)}
                >
                  <CardIcon className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2 inline-block" />
                  Payment
                </TabsTrigger>
              </TabsList>

              {/* Profile Picture Section */}
              <TabsContent value="profile">
                <Card className="bg-gray-800 border-0 shadow-md">
                  <CardHeader className="border-b border-gray-700 pb-4">
                    <CardTitle className="text-lg md:text-xl text-amber-400">
                      Profile Picture
                    </CardTitle>
                    <CardDescription className="text-sm md:text-base text-gray-400">
                      Update your profile picture
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 md:space-y-6 py-4 md:py-6">
                    <div className="flex items-center justify-center">
                      <div className="relative">
                        <div className="w-28 h-28 md:w-40 md:h-40 rounded-full bg-gray-700 border-4 border-amber-400 flex items-center justify-center shadow-md">
                          {userDetails.profile_picture ? (
                            <img
                              src={userDetails.profile_picture}
                              alt="Profile"
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <User className="w-12 h-12 md:w-20 md:h-20 text-gray-400" />
                          )}
                        </div>
                        <button className="absolute bottom-0 right-0 p-2 md:p-3 bg-amber-500 rounded-full text-gray-900 hover:bg-amber-600 shadow-lg transition-colors duration-200">
                          <Camera className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-center mt-4 md:mt-8 space-y-3 sm:space-y-0 sm:space-x-4">
                      <button className="flex items-center justify-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-amber-500 rounded-lg hover:bg-amber-600 text-gray-900 font-medium transition-colors duration-200 shadow-md">
                        <Upload className="w-4 h-4 md:w-5 md:h-5" />
                        Upload New Picture
                      </button>
                      <button className="flex items-center justify-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-gray-700 rounded-lg hover:bg-gray-600 text-gray-200 font-medium transition-colors duration-200">
                        <X className="w-4 h-4 md:w-5 md:h-5" />
                        Remove Picture
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Password Section */}
              <TabsContent value="password">
                <Card className="bg-gray-800 border-0 shadow-md">
                  <CardHeader className="border-b border-gray-700 pb-4">
                    <CardTitle className="text-lg md:text-xl text-amber-400">
                      Password Settings
                    </CardTitle>
                    <CardDescription className="text-sm md:text-base text-gray-400">
                      Update your password
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 md:space-y-6 py-4 md:py-6">
                    <div className="max-w-lg mx-auto space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">
                          Current Password
                        </label>
                        <input
                          type="password"
                          className="w-full p-2 md:p-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                          placeholder="Enter current password"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">
                          New Password
                        </label>
                        <input
                          type="password"
                          className="w-full p-2 md:p-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                          placeholder="Enter new password"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          className="w-full p-2 md:p-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                          placeholder="Confirm new password"
                        />
                      </div>
                      <div className="pt-4">
                        <button className="w-full py-2 md:py-3 bg-amber-500 text-gray-900 rounded-lg hover:bg-amber-600 font-medium transition-colors duration-200 shadow-md">
                          Update Password
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* User Details Section */}
              <TabsContent value="details">
                <Card className="bg-gray-800 border-0 shadow-md">
                  <CardHeader className="border-b border-gray-700 pb-4">
                    <CardTitle className="text-lg md:text-xl text-amber-400">
                      User Details
                    </CardTitle>
                    <CardDescription className="text-sm md:text-base text-gray-400">
                      Update your personal information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="py-4 md:py-6">
                    <form className="space-y-4 md:space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-300">
                            First Name
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={userDetails.firstName}
                            onChange={handleUserDetailsUpdate}
                            className="w-full p-2 md:p-3 border rounded-lg bg-gray-700 border-gray-600 text-gray-100 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-300">
                            Last Name
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={userDetails.lastName}
                            onChange={handleUserDetailsUpdate}
                            className="w-full p-2 md:p-3 border rounded-lg bg-gray-700 border-gray-600 text-gray-100 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-300">
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={userDetails.email}
                            onChange={handleUserDetailsUpdate}
                            className="w-full p-2 md:p-3 border rounded-lg bg-gray-700 border-gray-600 text-gray-100 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-300">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            name="phoneNumber"
                            value={userDetails.phoneNumber}
                            onChange={handleUserDetailsUpdate}
                            className="w-full p-2 md:p-3 border rounded-lg bg-gray-700 border-gray-600 text-gray-100 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-300">
                            Username
                          </label>
                          <input
                            type="text"
                            name="username"
                            value={userDetails.username}
                            onChange={handleUserDetailsUpdate}
                            className="w-full p-2 md:p-3 border rounded-lg bg-gray-700 border-gray-600 text-gray-100 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-300">
                            Date of Birth
                          </label>
                          <input
                            type="date"
                            name="dateOfBirth"
                            value={userDetails.dateOfBirth}
                            onChange={handleUserDetailsUpdate}
                            className="w-full p-2 md:p-3 border rounded-lg bg-gray-700 border-gray-600 text-gray-100 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-300">
                            Gender
                          </label>
                          <select
                            name="gender"
                            value={userDetails.gender}
                            onChange={handleUserDetailsUpdate}
                            className="w-full p-2 md:p-3 border rounded-lg bg-gray-700 border-gray-600 text-gray-100 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                          >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-300">
                            Account Status
                          </label>
                          <div className="flex items-center mt-2 md:mt-4">
                            <input
                              type="checkbox"
                              id="isActive"
                              name="isActive"
                              checked={userDetails.isActive}
                              onChange={(e) =>
                                setUserDetails((prev) => ({
                                  ...prev,
                                  isActive: e.target.checked,
                                }))
                              }
                              className="w-4 h-4 md:w-5 md:h-5 text-amber-500 bg-gray-700 border-gray-600 rounded focus:ring-amber-500"
                            />
                            <label
                              htmlFor="isActive"
                              className="ml-2 text-gray-300"
                            >
                              Active
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="pt-4">
                        <button className="w-full py-2 md:py-3 bg-amber-500 text-gray-900 rounded-lg hover:bg-amber-600 font-medium transition-colors duration-200 shadow-md">
                          Save Changes
                        </button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Favorites Section */}
              <TabsContent value="favorites">
                <Card className="bg-gray-800 border-0 shadow-md">
                  <CardHeader className="border-b border-gray-700 pb-4">
                    <CardTitle className="text-lg md:text-xl text-amber-400">
                      Favorites
                    </CardTitle>
                    <CardDescription className="text-sm md:text-base text-gray-400">
                      Select your favorite categories
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="py-4 md:py-6">
                    <div className="space-y-4 md:space-y-6">
                      <div className="flex flex-wrap gap-2 md:gap-3">
                        {categories.map((category) => (
                          <button
                            key={category.name}
                            onClick={() => handleCategoryToggle(category.name)}
                            className={`px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm flex items-center gap-1 md:gap-2 transition-colors duration-200 ${
                              selectedCategories.includes(category.name)
                                ? "bg-amber-500 text-gray-900 shadow-md"
                                : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                            }`}
                          >
                            {category.name}
                            {selectedCategories.includes(category.name) && (
                              <X className="w-3 h-3 md:w-4 md:h-4" />
                            )}
                          </button>
                        ))}
                      </div>
                      <div className="mt-4 md:mt-8">
                        <h3 className="text-base md:text-lg font-medium text-amber-400 mb-2 md:mb-4">
                          Selected Categories
                        </h3>
                        <div className="bg-gray-700 p-3 md:p-6 rounded-lg border border-gray-600">
                          {selectedCategories.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {selectedCategories.map((category) => (
                                <span
                                  key={category}
                                  className="bg-amber-500 text-gray-900 px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm shadow-sm"
                                >
                                  {category}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <p className="text-gray-400 text-sm md:text-base">
                              No categories selected
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="pt-4">
                        <button className="w-full py-2 md:py-3 bg-amber-500 text-gray-900 rounded-lg hover:bg-amber-600 font-medium transition-colors duration-200 shadow-md">
                          Save Preferences
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Payment Section */}
              <TabsContent value="payment">
                <Card className="bg-gray-800 border-0 shadow-md">
                  <CardHeader className="border-b border-gray-700 pb-4">
                    <CardTitle className="text-lg md:text-xl text-amber-400">
                      Payment Methods
                    </CardTitle>
                    <CardDescription className="text-sm md:text-base text-gray-400">
                      Manage your payment information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="py-4 md:py-6">
                    <div className="space-y-4 md:space-y-6">
                      <div className="border border-gray-700 rounded-lg p-3 md:p-4 flex items-center justify-between bg-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                        <div className="flex items-center gap-2 md:gap-4">
                          <div className="p-2 md:p-3 bg-amber-500/20 rounded-full">
                            <CreditCard className="w-4 h-4 md:w-6 md:h-6 text-amber-400" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-100 text-sm md:text-base">
                              Visa ending in 4242
                            </p>
                            <p className="text-xs md:text-sm text-gray-400">
                              Expires 12/24
                            </p>
                          </div>
                        </div>
                        <button className="text-amber-400 hover:text-amber-300 p-1 md:p-2 rounded-full hover:bg-gray-600 transition-colors duration-200">
                          <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                      </div>

                      <div className="border border-gray-700 rounded-lg p-3 md:p-4 flex items-center justify-between bg-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                        <div className="flex items-center gap-2 md:gap-4">
                          <div className="p-2 md:p-3 bg-amber-500/20 rounded-full">
                            <CreditCard className="w-4 h-4 md:w-6 md:h-6 text-amber-400" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-100 text-sm md:text-base">
                              Mastercard ending in 5678
                            </p>
                            <p className="text-xs md:text-sm text-gray-400">
                              Expires 03/26
                            </p>
                          </div>
                        </div>
                        <button className="text-amber-400 hover:text-amber-300 p-1 md:p-2 rounded-full hover:bg-gray-600 transition-colors duration-200">
                          <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                      </div>

                      <button className="w-full py-2 md:py-3 border-2 border-dashed border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-amber-400 hover:border-amber-400 transition-all duration-200 font-medium flex items-center justify-center text-sm md:text-base">
                        <CreditCard className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                        Add New Payment Method
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </HomeLayoutWrapper>
  );
};

export default Dashboard;