"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import {
  Camera,
  User,
  Upload,
  X,
  Star,
  Key,
  FileText,
  CreditCard as CardIcon,
  Shield,
  CheckCircle2,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserAuth } from "@/useContext";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { passwordSchema, userDetailsSchema } from "@/lib/utils/validation";
import {
  handleAddingFavorites,
  handleGetFavorite,
  handleUploadProfilePicture,
  resetPassword,
  updateUserProfile,
} from "@/app/api/AuthApi/api";
import { useRouter } from "next/navigation";

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

// Mock Header Component
interface HeaderProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
  profile_picture?: string | null;
}

const Header = ({ onMenuToggle, isMenuOpen, profile_picture }: HeaderProps) => {
  const router = useRouter();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 lg:h-20">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`w-full h-0.5 bg-white transition-all ${
                  isMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              ></span>
              <span
                className={`w-full h-0.5 bg-white transition-all ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`w-full h-0.5 bg-white transition-all ${
                  isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              ></span>
            </div>
          </button>
          <button
            onClick={() => router.push("/")}
            className="flex items-center space-x-2 lg:space-x-3"
          >
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br  rounded-xl flex items-center justify-center shadow-lg shadow-torquoise-500/30">
              <Image
                src="/logo/vbox.png"
                alt="Logo"
                className="w-10 h-10 object-contain"
                width={40}
                height={40}
                priority
              />{" "}
            </div>
            <span className="text-xl lg:text-2xl font-bold text-white tracking-tight">
              VBox
            </span>
          </button>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 bg-cyan-500/20 border border-cyan-500/30 rounded-full">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-medium text-cyan-400">Premium</span>
          </div>
          <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center cursor-pointer hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
            {profile_picture ? (
              <img
                src={profile_picture}
                className="w-full h-full rounded-full"
              />
            ) : (
              <User className="w-4 h-4 lg:w-5 lg:h-5 text-black" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

// Mock Sidebar Component
interface SidebarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({
  activeCategory,
  onCategoryChange,
  isOpen,
  onClose,
}: SidebarProps) => (
  <>
    {isOpen && (
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
        onClick={onClose}
      />
    )}
    <aside
      className={`fixed left-0 top-16 lg:top-20 bottom-0 w-64 lg:w-72 bg-black/95 backdrop-blur-xl border-r border-white/10 transform transition-transform duration-300 z-40 ${
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      <nav className="p-4 space-y-2 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
        <div className="space-y-1">
          {[
            // "Dashboard",
            "Profile",
            // "Settings", "Analytics", "Billing"
          ].map((item) => (
            <button
              key={item}
              onClick={() => {
                onCategoryChange(item);
                onClose();
              }}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${
                activeCategory === item
                  ? "bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 text-cyan-400 border border-cyan-500/30"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </nav>
    </aside>
  </>
);

const Dashboard: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Profile");
  const { username, userProfilePicture } = UserAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [fileUpload, setFileUpload] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      // Check file size (e.g., 5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      setFileUpload([file]);

      setSelectedImage(file.name);

      // Create preview URL
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);

      // Here you would typically upload the image to your server
      // console.log("Selected image:", file.name);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const saveCategory = async () => {
    setIsLoading(true);
    try {
      const response = await handleAddingFavorites(selectedCategories);
      alert("success");
      return response;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getFavorites = async () => {
    try {
      const response = await handleGetFavorite();
      setSelectedCategories(response.data.favorites.favorites);
    } catch (error) {
      console.error(error);
    }
  };

  const updateProfilePicture = async () => {
    setIsLoading(true);
    try {
      await handleUploadProfilePicture(fileUpload[0]);
      alert("SUCCESS");
      window.location.reload();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getFavorites();
  }, []);

  // Clean up preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Header
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        isMenuOpen={sidebarOpen}
        profile_picture={userProfilePicture}
      />

      <Sidebar
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="pt-16 lg:pt-20 lg:pl-72 min-h-screen">
        <div className="px-4 sm:px-6 lg:px-8 py-6 lg:py-10 max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8 lg:mb-12">
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
              Welcome back, {username && username.firstName}
            </h1>
            <p className="text-gray-400">Manage your account and preferences</p>
          </div>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="flex flex-wrap gap-2 bg-transparent mb-8">
              <TabsTrigger
                value="profile"
                className="flex-1 min-w-[140px] py-3 px-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-cyan-600 data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=active]:shadow-cyan-500/50 bg-white/5 text-gray-400 rounded-xl border border-white/10 hover:border-cyan-500/50 transition-all"
              >
                <User className="w-4 h-4 mr-2 inline-block" />
                Profile
              </TabsTrigger>
              <TabsTrigger
                value="password"
                className="flex-1 min-w-[140px] py-3 px-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-cyan-600 data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=active]:shadow-cyan-500/50 bg-white/5 text-gray-400 rounded-xl border border-white/10 hover:border-cyan-500/50 transition-all"
              >
                <Key className="w-4 h-4 mr-2 inline-block" />
                Password
              </TabsTrigger>
              <TabsTrigger
                value="details"
                className="flex-1 min-w-[140px] py-3 px-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-cyan-600 data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=active]:shadow-cyan-500/50 bg-white/5 text-gray-400 rounded-xl border border-white/10 hover:border-cyan-500/50 transition-all"
              >
                <FileText className="w-4 h-4 mr-2 inline-block" />
                Details
              </TabsTrigger>
              <TabsTrigger
                value="favorites"
                className="flex-1 min-w-[140px] py-3 px-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-cyan-600 data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=active]:shadow-cyan-500/50 bg-white/5 text-gray-400 rounded-xl border border-white/10 hover:border-cyan-500/50 transition-all"
              >
                <Star className="w-4 h-4 mr-2 inline-block" />
                Favorites
              </TabsTrigger>
              <TabsTrigger
                value="payment"
                className="flex-1 min-w-[140px] py-3 px-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-cyan-600 data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=active]:shadow-cyan-500/50 bg-white/5 text-gray-400 rounded-xl border border-white/10 hover:border-cyan-500/50 transition-all"
              >
                <CardIcon className="w-4 h-4 mr-2 inline-block" />
                Payment
              </TabsTrigger>
            </TabsList>

            {/* Profile Picture Section */}
            <TabsContent value="profile">
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl">
                <CardHeader className="border-b border-white/10 pb-6">
                  <CardTitle className="text-2xl text-white flex items-center">
                    <Camera className="w-6 h-6 mr-3 text-cyan-400" />
                    Profile Picture
                  </CardTitle>
                  <CardDescription className="text-gray-400 mt-2">
                    Update your profile picture to personalize your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="py-8 lg:py-12">
                  <div className="flex flex-col items-center space-y-8">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                      <div className="relative w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden border-4 border-white/20 bg-gray-800 flex items-center justify-center">
                        {previewImage ? (
                          <Image
                            src={previewImage}
                            alt="Profile preview"
                            className="w-full h-full object-cover"
                            width={160}
                            height={160}
                            priority
                          />
                        ) : userProfilePicture ? (
                          <Image
                            src={userProfilePicture}
                            alt="Profile"
                            className="w-full h-full object-cover"
                            width={160}
                            height={160}
                            priority
                          />
                        ) : (
                          <User className="w-16 h-16 lg:w-20 lg:h-20 text-gray-600" />
                        )}
                      </div>
                      <button
                        onClick={triggerFileInput}
                        className="absolute bottom-2 right-2 p-3 lg:p-4 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full text-black hover:shadow-lg hover:shadow-cyan-500/50 transition-all transform hover:scale-110"
                      >
                        <Camera className="w-5 h-5" />
                      </button>

                      {/* Hidden file input */}
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageSelect}
                        accept="image/*"
                        className="hidden"
                      />
                    </div>

                    {/* Selected image info */}
                    {selectedImage && (
                      <div className="text-center">
                        <p className="text-cyan-400 text-sm mb-2">
                          Selected: {selectedImage}
                        </p>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                      <button
                        onClick={triggerFileInput}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 text-black font-semibold transition-all transform hover:scale-105"
                      >
                        <Upload className="w-5 h-5" />
                        {selectedImage ? "Change Image" : "Select Image"}
                      </button>
                      <button
                        onClick={handleRemoveImage}
                        disabled={!previewImage && !userProfilePicture}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 text-gray-300 font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <X className="w-5 h-5" />
                        Remove
                      </button>
                    </div>

                    {/* Upload button when image is selected */}
                    {previewImage && (
                      <div className="w-full max-w-md">
                        <button
                          onClick={() => updateProfilePicture()}
                          className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl hover:shadow-lg hover:shadow-green-500/50 text-white font-semibold transition-all transform hover:scale-105"
                        >
                          {isLoading ? "Uploading" : "Upload Profile Picture"}
                        </button>
                        <p className="text-xs text-gray-400 text-center mt-2">
                          Click to save your new profile picture
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Password Section */}
            <TabsContent value="password">
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl">
                <CardHeader className="border-b border-white/10 pb-6">
                  <CardTitle className="text-2xl text-white flex items-center">
                    <Key className="w-6 h-6 mr-3 text-cyan-400" />
                    Password Settings
                  </CardTitle>
                  <CardDescription className="text-gray-400 mt-2">
                    Keep your account secure with a strong password
                  </CardDescription>
                </CardHeader>

                <CardContent className="py-8 lg:py-12">
                  <Formik
                    initialValues={{
                      currentPassword: "",
                      newPassword: "",
                      confirmPassword: "",
                    }}
                    validationSchema={passwordSchema}
                    onSubmit={async (values, { resetForm }) => {
                      const { newPassword, currentPassword: oldPassword } =
                        values;
                      try {
                        await resetPassword({ newPassword, oldPassword });
                        alert("SUCCESS");
                      } catch (error) {
                        console.error(error);
                      } finally {
                        resetForm();
                      }
                    }}
                  >
                    {({ isSubmitting }) => (
                      <Form className="max-w-2xl mx-auto space-y-6">
                        {[
                          "currentPassword",
                          "newPassword",
                          "confirmPassword",
                        ].map((field, i) => (
                          <div key={i}>
                            <label className="block text-sm font-medium mb-3 text-gray-300">
                              {field === "currentPassword"
                                ? "Current Password"
                                : field === "newPassword"
                                ? "New Password"
                                : "Confirm Password"}
                            </label>
                            <Field
                              type="password"
                              name={field}
                              className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                              placeholder={`Enter ${field.replace(
                                /([A-Z])/g,
                                " $1"
                              )}`}
                            />
                            <ErrorMessage
                              name={field}
                              component="div"
                              className="text-red-400 text-sm mt-2"
                            />
                          </div>
                        ))}
                        <div className="pt-6">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 text-black rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 font-semibold transition-all transform hover:scale-[1.02]"
                          >
                            {isSubmitting ? "Updating..." : "Update Password"}
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </CardContent>
              </Card>
            </TabsContent>

            {/* User Details Section */}
            <TabsContent value="details">
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl">
                <CardHeader className="border-b border-white/10 pb-6">
                  <CardTitle className="text-2xl text-white flex items-center">
                    <FileText className="w-6 h-6 mr-3 text-cyan-400" />
                    User Details
                  </CardTitle>
                  <CardDescription className="text-gray-400 mt-2">
                    Update your personal information
                  </CardDescription>
                </CardHeader>

                <CardContent className="py-8 lg:py-12">
                  <Formik
                    initialValues={{
                      firstName: username?.firstName,
                      lastName: username?.lastName,
                      email: username?.email,
                      phoneNumber: username?.phoneNumber,
                      username: username?.username,
                      dateOfBirth: username?.dateOfBirth,
                      gender: username?.gender,
                    }}
                    validationSchema={userDetailsSchema}
                    onSubmit={async (values) => {
                      try {
                        await updateUserProfile(values);
                        alert("SUCCESSFULLY UPDATED");
                      } catch (error) {
                        console.error(error);
                      }
                    }}
                  >
                    {({ isSubmitting }) => (
                      <Form className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {[
                            "firstName",
                            "lastName",
                            "email",
                            "phoneNumber",
                            "username",
                            "dateOfBirth",
                          ].map((field) => (
                            <div key={field}>
                              <label className="block text-sm font-medium mb-3 text-gray-300">
                                {field.replace(/([A-Z])/g, " $1")}
                              </label>
                              <Field
                                type={
                                  field === "email"
                                    ? "email"
                                    : field === "dateOfBirth"
                                    ? "date"
                                    : "text"
                                }
                                name={field}
                                className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-gray-100 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                              />
                              <ErrorMessage
                                name={field}
                                component="div"
                                className="text-red-400 text-sm mt-2"
                              />
                            </div>
                          ))}

                          {/* Gender Dropdown */}
                          <div>
                            <label className="block text-sm font-medium mb-3 text-gray-300">
                              Gender
                            </label>
                            <Field
                              as="select"
                              name="gender"
                              className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-gray-100 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                            >
                              <option value="">Select gender</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other</option>
                            </Field>
                            <ErrorMessage
                              name="gender"
                              component="div"
                              className="text-red-400 text-sm mt-2"
                            />
                          </div>
                        </div>

                        <div className="pt-6">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 text-black rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 font-semibold transition-all transform hover:scale-[1.02]"
                          >
                            {isSubmitting ? "Saving..." : "Save Changes"}
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Favorites Section */}
            <TabsContent value="favorites">
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl">
                <CardHeader className="border-b border-white/10 pb-6">
                  <CardTitle className="text-2xl text-white flex items-center">
                    <Star className="w-6 h-6 mr-3 text-cyan-400" />
                    Favorite Categories
                  </CardTitle>
                  <CardDescription className="text-gray-400 mt-2">
                    Select your favorite content categories
                  </CardDescription>
                </CardHeader>
                <CardContent className="py-8 lg:py-12">
                  <div className="space-y-8">
                    <div className="flex flex-wrap gap-3">
                      {categories.map((category) => (
                        <button
                          key={category.name}
                          onClick={() => handleCategoryToggle(category.name)}
                          className={`px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 transition-all transform hover:scale-105 ${
                            selectedCategories &&
                            selectedCategories.includes(category.name)
                              ? "bg-gradient-to-r from-cyan-500 to-cyan-600 text-black shadow-lg shadow-cyan-500/30"
                              : "bg-white/5 border border-white/10 text-gray-300 hover:border-cyan-500/50"
                          }`}
                        >
                          {category.name}
                          {selectedCategories &&
                            selectedCategories.includes(category.name) && (
                              <X className="w-4 h-4" />
                            )}
                        </button>
                      ))}
                    </div>

                    <div className="mt-8">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <CheckCircle2 className="w-5 h-5 mr-2 text-cyan-400" />
                        Selected Categories ({selectedCategories.length})
                      </h3>
                      <div className="bg-white/5 border border-white/10 p-6 rounded-xl min-h-[120px]">
                        {selectedCategories.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {selectedCategories.map((category) => (
                              <span
                                key={category}
                                className="bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 border border-cyan-500/30 text-cyan-400 px-4 py-2 rounded-full text-sm font-medium"
                              >
                                {category}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500 text-center py-8">
                            No categories selected yet. Choose your favorites
                            above!
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="pt-4">
                      <button
                        onClick={() => saveCategory()}
                        className="w-full py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 text-black rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 font-semibold transition-all transform hover:scale-[1.02]"
                      >
                        {isLoading ? "saving" : " Save Preferences"}
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Payment Section */}
            <TabsContent value="payment">
              {/* Payment content remains the same */}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
