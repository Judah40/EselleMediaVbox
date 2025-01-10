import React from 'react';

const CardSkeleton: React.FC = () => {
  return (
    <div className="min-w-[280px] w-[280px]">
      <div className="w-full rounded-md overflow-hidden shadow-lg bg-white">
        {/* Image Skeleton */}
        <div className="relative h-44 rounded-md">
          <div className="w-full h-full bg-gray-200 animate-pulse rounded-md" />
        </div>

        {/* Content Skeleton */}
        <div className="p-4 space-y-3">
          {/* Channel Name */}
          <div className="w-16 h-3 bg-gray-200 animate-pulse rounded" />
          
          {/* Caption - Two lines */}
          <div className="space-y-2">
            <div className="w-full h-4 bg-gray-200 animate-pulse rounded" />
            <div className="w-3/4 h-4 bg-gray-200 animate-pulse rounded" />
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4">
            <div className="w-20 h-3 bg-gray-200 animate-pulse rounded" />
            <div className="w-24 h-3 bg-gray-200 animate-pulse rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

const SkeletonPageWrapper: React.FC = () => {
  return (
    <div>
      {/* Header Banner Skeleton */}
      <div className="h-24 w-full bg-gray-200 animate-pulse" />
      
      {/* Title Skeleton */}
      <div className="p-4">
        <div className="w-48 h-8 bg-gray-200 animate-pulse rounded" />
      </div>

      {/* Horizontal Scroll Section */}
      <section className="py-10">
        <div className="relative">
          <div className="overflow-x-auto pb-6">
            <div className="flex gap-4 px-4">
              {/* Render 8 skeleton cards */}
              {[...Array(8)].map((_, index) => (
                <CardSkeleton key={index} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SkeletonPageWrapper;