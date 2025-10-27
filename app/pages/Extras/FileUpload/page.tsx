"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Spinner } from "@nextui-org/react";
import { Upload, X, User } from "lucide-react";
import { handleUploadProfilePicture } from "@/app/api/AuthApi/api";

const ImageUploader = ({
  onFileSelect,
}: {
  onFileSelect: (files: File[]) => void;
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File | null) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onFileSelect([file]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    onFileSelect([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full max-w-md">
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-300 ${
          isDragging
            ? "border-cyan-500 bg-cyan-500/10"
            : "border-slate-700 bg-slate-800/50 hover:border-slate-600 hover:bg-slate-800"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
          className="hidden"
        />

        {preview ? (
          <div className="relative p-8">
            <div className="relative w-48 h-48 mx-auto">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover rounded-full border-4 border-slate-700"
              />
              <button
                onClick={handleRemove}
                className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-center text-slate-400 mt-4 text-sm">
              Click to change image
            </p>
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="mx-auto w-20 h-20 rounded-full bg-slate-700/50 flex items-center justify-center mb-4">
              <User className="w-10 h-10 text-slate-400" />
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Upload className="w-5 h-5 text-cyan-500" />
              <h3 className="text-lg font-semibold text-slate-200">
                Upload Profile Picture
              </h3>
            </div>
            <p className="text-slate-400 text-sm mb-4">
              Drag and drop your image here, or click to browse
            </p>
            <div className="inline-block px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium rounded-lg transition-colors">
              Choose File
            </div>
            <p className="text-xs text-slate-500 mt-4">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const Page = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [profilePicUpload, setProfilePictureUpload] = useState<File[]>([]);

  const handleNext = async () => {
    setIsLoading(true);
    await handleUploadProfilePicture(profilePicUpload[0])
      .then(() => {
        router.push("/");
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSkip = () => {
    router.push("/");
  };

  const handleGetProfilePicture = (profilePicture: File[]) => {
    setProfilePictureUpload(profilePicture);
  };

  return (
    <div className="w-full h-screen bg-slate-950 flex flex-col">
      <Link href={"/"} className="absolute top-4 left-4 md:left-6 z-10">
        <Image src={"/logo/vbox.png"} width={100} height={100} alt="logo" />
      </Link>

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-100 mb-2">
              Complete Your Profile
            </h1>
            <p className="text-slate-400">
              Add a profile picture to personalize your account
            </p>
          </div>
          <ImageUploader onFileSelect={handleGetProfilePicture} />
        </div>
      </div>

      <div className="border-t border-slate-800 bg-slate-900/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-end items-center">
            <div className="flex gap-3 sm:gap-4">
              <Button
                variant="outline"
                onClick={handleSkip}
                className="px-4 sm:px-6 border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-slate-100"
              >
                Skip
              </Button>
              <Button
                onClick={handleNext}
                disabled={profilePicUpload.length === 0}
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 sm:px-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Spinner color="white" size="sm" />
                ) : (
                  <p>Upload</p>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
