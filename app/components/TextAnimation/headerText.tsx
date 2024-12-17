import { FlipWords } from "@/components/ui/flip-words";
import React from "react";

export function FlipWord() {
  const words = [
    " Brain Jotter,",
    "Sabinus",
    " Kindo Armani",
    "Yemata",
    "and other",
  ];

  return (
    <div className=" space-y-2  flex flex-col items-start justify-center ">
      <div className="text-4xl w-full text-center md:text-left h-20 font-normal text-neutral-600 dark:text-neutral-400">
        Watch <br />
        <FlipWords words={words} />
      </div>
      <p className="lg:text-lg text-center lg:text-left">
        Discover exclusive events, stream the latest shows, and relive
        unforgettable moments – all in one place.
      </p>
    </div>
  );
}
