"use client";

import { FileUploadDemo } from "@/app/components/AuthComponents/FileUpload";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Spinner } from "@nextui-org/react";
import { handleUploadProfilePicture } from "@/app/api/AuthApi/api";

const Page = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleNext = async () => {
    // console.log("Selected items:", Array.from(selected));
    // Handle navigation logic here

    setIsLoading(true);

    await handleUploadProfilePicture(profilePicUpload[0])
      .then((response) => {
        console.log(response.data);
        router.push("/");
      })
      .catch((error) => {
        console.log(error.response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
    console.log("object");
  };

  const handleSkip = () => {
    // Handle skip logic here
    router.push("/");
  };
  const [profilePicUpload, setProfilePictureUpload] = useState<File[]>([]);
  const handleGetProfilePicture = (profilePicture: File[]) => {
    setProfilePictureUpload(profilePicture);
    // console.log(profilePicture);
  };

  useEffect(() => {
    console.log(profilePicUpload.length);
  });
  return (
    <div className="w-full h-screen items-center justify-center flex flex-col">
      <Link href={"/"} className="absolute top-4 md:left-4">
        <Image src={"/logo/vbox.png"} width={100} height={100} alt="logo" />
      </Link>
      <FileUploadDemo file={handleGetProfilePicture} />
      {/* Fixed navigation footer */}
      <div className="sticky bottom-0 border-t border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-end  items-center ">
            <div className="flex gap-3 sm:gap-4">
              <Button
                variant="outline"
                onClick={handleSkip}
                className="px-4 sm:px-6"
              >
                Skip
              </Button>
              <Button
                onClick={handleNext}
                disabled={profilePicUpload.length === 0 && true}
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 sm:px-6"
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
