import React, { useState } from "react";
import {
  Play,
  Heart,
  MessageCircle,
  Share2,
  Clock,
  MapPin,
} from "lucide-react";

interface ContentCardProps {
  bannerUrl: string;
  thumbnailUrl: string;
  caption: string;
  content: string;
  createdAt: string;
  likeCount: number;
  commentCount: number;
  location: string;
  tags: string[];
}

const ContentCard: React.FC<ContentCardProps> = ({
  bannerUrl,
  thumbnailUrl,
  caption,
  content,
  createdAt,
  likeCount,
  commentCount,
  location,
  tags,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div
      className="relative group w-full max-w-sm bg-gray-900 rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:z-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Banner Image */}
      <div className="relative aspect-video w-full overflow-hidden">
        <img
          src={bannerUrl}
          alt={caption}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent" />

        {/* Hover Overlay */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="bg-white rounded-full p-4 transform hover:scale-110 transition-transform">
              <Play className="w-6 h-6 text-black fill-current" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title and Date */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-white">{caption}</h3>
          <div className="flex items-center text-gray-400 text-sm">
            <Clock className="w-4 h-4 mr-1" />
            {formatDate(createdAt)}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm line-clamp-2 mb-4">{content}</p>

        {/* Location */}
        <div className="flex items-center text-gray-400 text-sm mb-4">
          <MapPin className="w-4 h-4 mr-1" />
          {location}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {JSON.parse(tags[0]).map((tag: string) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-medium text-blue-400 bg-blue-400/10 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Interaction Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-800">
          <button className="flex items-center text-gray-400 hover:text-red-500 transition-colors">
            <Heart className="w-5 h-5 mr-1" />
            <span className="text-sm">{likeCount}</span>
          </button>
          <button className="flex items-center text-gray-400 hover:text-blue-400 transition-colors">
            <MessageCircle className="w-5 h-5 mr-1" />
            <span className="text-sm">{commentCount}</span>
          </button>
          <button className="flex items-center text-gray-400 hover:text-green-400 transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Example usage with sample data
export default function Fashion() {
  const sampleData = {
    bannerUrl:
      "https://vbox-esselle-media-new-bucket.s3.eu-north-1.amazonaws.com/927477d7090315374ef8295878e389fb7915e565b0c1dbc54f4e263e10432fb9",
    caption: "Nea",
    commentCount: 0,
    content:
      "The National Entertainment Award (NEA) is Sierra Leone's biggest annual entertainment event. The NEA is modeled after prestigious global awards like the BET, the Grammys, and the Oscars. The event celebrates excellence and glamour, and brings together prominent figures and luminaries from the entertainment industry.",
    createdAt: "2024-12-11T15:10:02.225Z",
    likeCount: 0,
    location: "Radisson Blu Hotel in Aberdeen, Freetown.",
    tags: ['["comedy", "Music", "fashion"]'],
    thumbnailUrl:
      "https://vbox-esselle-media-new-bucket.s3.eu-north-1.amazonaws.com/89fd4d9da10aba6437c6e0c286b0ce3ea6f17235d2000f0f7ac929b6e4ec2fa2",
  };

  return (
    <div className="min-h-screen bg-black p-8 flex items-center justify-center">
      <ContentCard {...sampleData} />
    </div>
  );
}
