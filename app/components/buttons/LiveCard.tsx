'use client'

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";

const LiveCard = () => {
  const router = useRouter();
  return (
    <Card isFooterBlurred className="w-full h-[300px] ">
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        <div className="px-4 py-[0.2px] rounded bg-red-500 flex items-center gap-2">
          <h2 className="text-lg font-bold">Live</h2>

          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
          </span>
        </div>{" "}
        <h4 className="text-black font-medium text-2xl">Acme camera</h4>
      </CardHeader>
      <Image
        removeWrapper
        isZoomed
        alt="Card example background"
        className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
        src="https://nextui.org/images/card-example-6.jpeg"
      />
      <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
        <div>
          <p className="text-black text-tiny">Available soon.</p>
          <p className="text-black text-tiny">Get notified.</p>
        </div>
        <Button
          onPress={() => {
            router.push(`/page/Live/1`);
          }}
          className="text-tiny"
          color="primary"
          radius="full"
          size="sm"
        >
          Join Live
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LiveCard;
