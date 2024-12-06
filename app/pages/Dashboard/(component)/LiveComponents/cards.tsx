import React from "react";
import { ResponseCardProps } from "../../LiveStream/live.types";

const ResponseCard: React.FC<ResponseCardProps> = ({
  title,
  tags,
  location,
  likeCount,
  commentCount,
  description,
}) => {
  return (
    <div className="bg-white h-56 shadow-lg rounded-lg p-5 max-w-md mx-auto hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-gray-800">{title}</h2>
        <div className="flex gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-cyan-500 text-white text-xs font-semibold py-1 px-3 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      <div className="text-sm text-gray-500 mb-4">
        <span className="font-semibold">Location:</span> {location}
      </div>
      <div className="flex items-center justify-between text-gray-500 text-sm">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1">
            <i className="fas fa-thumbs-up text-gray-400"></i> {likeCount}
          </span>
          <span className="flex items-center gap-1">
            <i className="fas fa-comment text-gray-400"></i> {commentCount}
          </span>
        </div>
        <button className="bg-cyan-500 text-white py-1 px-3 rounded-lg text-xs font-semibold hover:bg-blue-600 transition">
          View Details
        </button>
      </div>
    </div>
  );
};

export default ResponseCard;
