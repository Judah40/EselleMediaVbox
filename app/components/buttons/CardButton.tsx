"use client";

import { Card, CardHeader, CardFooter, Image, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

import React from "react";

type cardData = {
  isVideoLive: boolean;
};
function CardButton({ isVideoLive }: cardData) {
  const router = useRouter();
  return (
    <Card isFooterBlurred className="w-80 h-[250px] mr-4">
      <CardHeader className="absolute z-10 top-1 flex-col items-start ">
        {isVideoLive && (
          <div className="px-2 py-[0.2px] rounded bg-red-500 flex items-center gap-2">
            <h2 className="text-white text-sm">Live</h2>

            <span className="relative flex h-1 w-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1 w-1 bg-sky-500"></span>
            </span>
          </div>
        )}
        <p className="text-tiny text-white/60 uppercase font-bold">
          Your day your way
        </p>
        <h4 className="text-white/90 font-medium text-xl">
          Your checklist for better sleep
        </h4>
      </CardHeader>
      <Image
        removeWrapper
        isZoomed
        alt="Relaxing app background"
        className="z-0 w-full h-full object-cover"
        src="https://nextui.org/images/card-example-5.jpeg"
      />
      <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
        <div className="flex flex-grow gap-2 items-center">
          <Image
            alt="Breathing app icon"
            className="rounded-full w-10 h-11 bg-black"
            src="https://nextui.org/images/breathing-app-icon.jpeg"
          />
          <div className="flex flex-col">
            <p className="text-tiny text-white/60">Breathing App</p>
            <p className="text-tiny text-white/60">Get a good nights sleep.</p>
          </div>
        </div>
        <Button
          radius="full"
          size="sm"
          onPress={() => {
            if (isVideoLive) {
              router.push(`/pages/Live/1`);
            }
          }}
          className={`${isVideoLive && "bg-gray-500"}`}
        >
          {isVideoLive ? "Watch" : "Subscribe"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default CardButton;
