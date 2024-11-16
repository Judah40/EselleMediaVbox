import React from "react";
import CardButton from "../buttons/CardButton";

interface liveDummyData {
  id: number;
  name: string;
}
const LiveCards = () => {
  const Data: liveDummyData[] = [
    {
      id: 1,
      name: "Card 1",
    },
    {
      id: 2,
      name: "Card 1",
    },
    {
      id: 3,
      name: "Card 1",
    },
    {
      id: 4,
      name: "Card 1",
    },
    {
      id: 5,
      name: "Card 1",
    },
    {
      id: 6,
      name: "Card 1",
    },
    {
      id: 7,
      name: "Card 1",
    },
  ];
  return (
    <div className="flex overflow-x-scroll scrollbar-hide pb-10 gap-4 hide-scroll-bar">
      <div className="flex flex-nowrap  ">
        {Data.map((values) => (
          <CardButton key={values.id} isVideoLive={true} />
        ))}
      </div>
    </div>
  );
};

export default LiveCards;
