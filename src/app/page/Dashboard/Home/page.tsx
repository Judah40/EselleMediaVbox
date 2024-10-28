import { CircleAlert, Earth, ThumbsUp, Users } from "lucide-react";
import React from "react";

type headerData = {
  name: string;
  icon: React.ReactNode;
  value: number;
  description: string;
};
const page = () => {
  const headerData: headerData[] = [
    {
      name: "Video Reach",
      icon: <Earth size={16} />,
      value: 12,
      description:
        "The number of people who saw any of your video at least once. Reach is different from impressions, which may include multiple views of your posts by the same people. This metric is estimated.",
    },
    {
      name: "Video Engagement",
      icon: <Users size={16} />,
      value: 12,
      description:
        "The number of reactions, comments, shares and clicks on your posts.",
    },
    {
      name: "Video Reach",
      icon: <ThumbsUp size={16} />,
      value: 12,
      description: "The number of new likes on a video.",
    },
  ];
  return (
    <div className="flex-1 w-full h-full flex items-center flex-col">
      {/* header */}
      <div className="bg-gray-500 text-gray-200 w-11/12 p-4 rounded-lg gap-2">
        <p className="text-lg font-bold">Video Overview</p>
        <div className="w-full    grid grid-cols-1 md:grid-cols-3  gap-4">
          {headerData.map((data, index) => (
            <div key={index} className="bg-gray-700 p-4 rounded-lg gap-2">
              {/* header of card */}
              <div className="flex flex-row items-center gap-2">
                <div>{data.icon}</div>
                <div>{data.name}</div>
                <button>
                  <CircleAlert size={16} />
                </button>
              </div>

              {/* Values */}
              <div>
                <p className="text-xl font-bold">{data.value.toString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
