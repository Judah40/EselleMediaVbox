import React, { useState } from "react";
import { Play, Heart, MessageCircle, Share2,  MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

type ContentType = {
  contentypeCard?: ContentCardProps[];
}

const ContentCard: React.FC<ContentCardProps> = ({
  thumbnailUrl,
  caption,
  content,
  // createdAt,
  likeCount,
  commentCount,
  location,
  tags,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative group w-64 bg-gray-900 rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:z-10 flex-shrink-0 mx-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <img
          src={thumbnailUrl}
          alt={caption}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent" />
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="bg-white rounded-full p-2 transform hover:scale-110 transition-transform">
              <Play className="w-4 h-4 text-black fill-current" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-3">
        <h3 className="text-lg font-bold text-white truncate">{caption}</h3>
        <p className="text-gray-300 text-xs line-clamp-2 mb-2">{content}</p>
        
        <div className="flex items-center text-gray-400 text-xs mb-2">
          <MapPin className="w-3 h-3 mr-1" />
          <span className="truncate">{location}</span>
        </div>

        <div className="flex flex-wrap gap-1 mb-2">
          {JSON.parse(tags[0]).map((tag: string) => (
            <span
              key={tag}
              className="px-1.5 py-0.5 text-xs font-medium text-blue-400 bg-blue-400/10 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-800">
          <button className="flex items-center text-gray-400 hover:text-red-500 transition-colors">
            <Heart className="w-4 h-4 mr-1" />
            <span className="text-xs">{likeCount}</span>
          </button>
          <button className="flex items-center text-gray-400 hover:text-blue-400 transition-colors">
            <MessageCircle className="w-4 h-4 mr-1" />
            <span className="text-xs">{commentCount}</span>
          </button>
          <button className="flex items-center text-gray-400 hover:text-green-400 transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const ContentList: React.FC<ContentType> = ({ contentypeCard = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Group content by date
  const groupedContent = contentypeCard.reduce((acc: { [key: string]: ContentCardProps[] }, item) => {
    const date = new Date(item.createdAt).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  // Get sorted dates
  const dates = Object.keys(groupedContent).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );

  // Pagination
  const totalPages = Math.ceil(dates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleDates = dates.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-black p-4 space-y-6">
      {visibleDates.map((date) => (
        <div key={date} className="space-y-2">
          <h2 className="text-white text-lg font-semibold">{date}</h2>
          <div className="relative">
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex space-x-4 pb-4">
                {groupedContent[date].map((item, index) => (
                  <ContentCard key={index} {...item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-white">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ContentList;