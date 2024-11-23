"use client";

import { data } from "@/app/api/DummyData/data";
import Link from "next/link";
import React, { useState } from "react";
// import { Picture } from "./favorite.types";

const Page = () => {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  const [profile_picture, setProfilePicture] = useState<File>();
  const [preview, setPreview] = useState<string | null>(null); // Store the preview URL

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Get the first selected file
    if (file) {
      setProfilePicture(file); // Store the file
      setPreview(URL.createObjectURL(file)); // Create a preview URL
    }
  };

  const handleSubmit = () => {
    if (!profile_picture) {
      alert("Please select an image before submitting!");
      return;
    }

    // Here, you can handle the image upload (e.g., send it to a server)
    const formData = new FormData();
    formData.append("image", profile_picture);
  };

  const handleButtonClick = (index: number, name: string) => {
    console.log(`Clicked on item: ${name}, index: ${index}`);
    setCheckedItems((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle the checkbox state
    }));
  };

  return (
    <div className="flex-1 w-full items-center h-screen lg:justify-center flex flex-col gap-6">
      <div className="md:w-8/12 w-11/12 p-4 rounded border">
        {/* profile picture upload */}
        <div className="w-full py-4 border border-dotted bg-gray-800 rounded flex items-center justify-center">
          <div className="flex gap-2 flex-col items-center justify-center">
            <p className="text-2xl font-bold">Upload Profile Picture</p>

            <div className="md:h-60">
              {preview ? (
                <div className="w-full h-full">
                  <img
                    src={preview}
                    alt="Selected Preview"
                    className="w-48 h-auto"
                  />
                </div>
              ) : (
                <div>
                  <p>No image selected</p>
                </div>
              )}
            </div>
            <div className="flex flex-col md:flex-row justify-between w-full items-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mb-4 border w-11/12"
              />
              <button
                onClick={handleSubmit}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Upload Image
              </button>
            </div>
          </div>
        </div>
        {/* favorites */}
        <p className="text-2xl font-bold">Favorites</p>
        <p className="text-lg text-gray-400">
          Select Favorite from the following list
        </p>
        {/* multi select button */}
        {data.map((item, index) => (
          <button
            key={index}
            className={`bg-gray-500 px-4 py-1 rounded-full m-2 ${
              checkedItems[index] && "border-4 border-cyan-500"
            }`}
            onClick={() => handleButtonClick(index, item.name)}
          >
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                className="w-4 accent-cyan-500"
                checked={!!checkedItems[index]}
                onChange={() => handleButtonClick(index, item.name)}
              />
              <p>{item.name}</p>
            </div>
          </button>
        ))}
      </div>
      {/* separation */}
      <div className="w-11/12 md:w-8/12 flex justify-between">
        <Link
          href={"/"}
          className="px-4 py-2 rounded border border-cyan-500 text-cyan-500"
        >
          Skip
        </Link>
        <button className="px-4 py-2 rounded border border-cyan-500 text-cyan-500">
          Next
        </button>
      </div>
    </div>
  );
};

export default Page;
