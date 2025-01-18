import { FlipWords } from "@/components/ui/flip-words";
import React from "react";

export function FlipWord() {
  const words = [
    "Live Videos",
    "News",
    "Sports",
    "Enntertainment",
    "and others",
  ];

  return (
    <div className=" space-y-2  flex flex-col items-start justify-center ">
      <div className="text-4xl w-full text-center md:text-left font-normal text-neutral-600 dark:text-neutral-400">
        Watch
        <FlipWords words={words} />
      </div>
      <p className="lg:text-2xl font-bold text-center lg:text-left">
        Discover exclusive events, stream the latest shows,<br/> and relive
        unforgettable moments – all in one place.
      </p>
    </div>
  );
}
