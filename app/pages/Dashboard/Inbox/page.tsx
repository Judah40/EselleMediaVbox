import { data } from "@/app/api/DummyData/messageDummyData";
import { MailOpen, RefreshCcw, Search } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <div className="flex-1  p-4 gap-4 flex flex-col relative">
      {/* Search bar */}
      <div className="flex-row ">
        {/* search bar  */}
        <div className="flex  w-full ">
          <input placeholder="Search" className="flex-1 p-3 rounded-l" />
          <button className="bg-black rounded-r border border-gray-700 hover:bg-gray-800 px-6">
            <Search />
          </button>
        </div>
      </div>
      {/* messages */}
      <div className="flex-1 w-full bg-white p-2 overflow-y-auto rounded text-black ">
        <div className="p-2 flex items-center gap-4">
          {/* check all */}
          <input type="checkbox" className="w-4 h-4" />
          {/* refresh */}
          <button className="hover:bg-gray-300 hover:rounded-full hover:p-1">
            <RefreshCcw color="black" size={20} />
          </button>
          {/* mark as read */}
          <button className="flex items-center gap-2 bg-gray-300 p-2 rounded hover:bg-gray-500 hover:text-white">
            <MailOpen size={20} />
            <p className="text-sm">Mark as Read</p>
          </button>
        </div>

        {/* inboxs */}
        <div className="p-2">
          {data.map((data, index) => (
            <button
              key={index}
              className="w-full flex gap-2 hover:shadow-lg hover:rounded  hover:bg-gray-200 p-2 border-b"
            >
              <div>
                {/* check single */}
                <input type="checkbox" className="w-4 h-4" />
              </div>
              {/* sender */}
              <div className="flex-1  flex items-start w-80">
                <p>
                  <span className="text-gray-600 text-left font-bold text-sm">
                    {data.sender}
                  </span>
                </p>
              </div>
              {/* subject */}
              <div className="flex-1 hidden md:block items-start">
                <p className="text-left">
                  <span className="text-gray-600 text-sm font-light  text-left">
                    {data.subject}
                  </span>
                </p>
              </div>
              {/* timestamp */}
              <div className="flex-1 flex justify-end">
                <p>
                  <span className="text-gray-600">{data.timestamp}</span>
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
