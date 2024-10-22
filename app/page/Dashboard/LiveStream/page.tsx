import { Divider, Switch } from "@nextui-org/react";
import {
  BellDot,
  Calendar,
  CalendarClock,
  CalendarDays,
  Settings,
  Users,
  UsersRound,
  Video,
} from "lucide-react";
import React from "react";

type liveStreamCardDataType = {};
const page = () => {
  const liveStreamCardData = [];
  return (
    <div className="flex-1 w-full h-full flex items-center flex-col ">
      {/* live stream buttons */}
      <div className="w-11/12 grid grid-cols-1 md:grid-cols-2 gap-4 ">
        {/* card 1 ie: to go live  */}
        <div className=" w-full p-4 bg-gray-200 rounded-lg gap-6 flex flex-col">
          <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
            <Video />
          </div>
          <p className="text-lg">Go live</p>
          {/* desctiption of the proposed card event */}

          <div className="gap-4 flex-col flex">
            <div className="flex w-full gap-4">
              <Users />
              <p className="text-lg"> Go live by yourself or with others</p>
            </div>
            <div className="flex w-full gap-4">
              <Calendar />
              <p className="text-lg">
                {" "}
                Choose where to publish your live video
              </p>
            </div>
            <div className="flex w-full gap-4">
              <Settings />{" "}
              <p className="text-lg">
                {" "}
                Explore additional tools to engage your viewers
              </p>
            </div>
          </div>

          <Divider />

          <div className="flex w-full items-center gap-4">
            <p>Create a test broadcast before going live</p>
            <Switch defaultSelected aria-label="Automatic updates" />
          </div>
          {/* btn */}
          <button className="w-full p-3 rounded bg-gray-500 text-white">
            Go live
          </button>
        </div>
        {/* card 2 ie: to schedule live live  */}
        <div className=" w-full p-4 bg-gray-200 rounded-lg gap-6 flex flex-col">
          <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
            <CalendarClock />{" "}
          </div>
          <p className="text-lg">Schedule live Event</p>
          {/* desctiption of the proposed card event */}

          <div className="gap-4 flex-col flex">
            <div className="flex w-full gap-4">
              <CalendarDays />{" "}
              <p className="text-lg">
                {" "}
                Create an event ahead of time to share with your audience
              </p>
            </div>
            <div className="flex w-full gap-4">
              <UsersRound />{" "}
              <p className="text-lg"> Viewers can RSVP to your event </p>
            </div>
            <div className="flex w-full gap-4">
              <BellDot />{" "}
              <p className="text-lg">
                {" "}
                You and your viewers will get a reminder before you go live{" "}
              </p>
            </div>
          </div>

         <div className="flex-1 flex items-end">

          {/* btn */}
          <button className="w-full p-3 rounded bg-gray-500 text-white">
            Go live
          </button>
         </div>
        </div>
      </div>
    </div>
  );
};

export default page;
