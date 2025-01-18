import React from 'react';

const VideoPlayerSkeleton = () => {
  // Create arrays for skeleton items
  const suggestedVideoSkeletons = Array(4).fill(null);
  const commentSkeletons = Array(2).fill(null);

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <div className="w-full p-8" />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Video Section Skeleton */}
          <div className="lg:col-span-2">
            {/* Video Player Skeleton */}
            <div className="aspect-video bg-gray-800 rounded-lg mb-4 animate-pulse" />

            {/* Video Info Skeleton */}
            <div className="mb-4 space-y-4">
              {/* Title Skeleton */}
              <div className="h-8 bg-gray-800 rounded-lg w-3/4 animate-pulse" />
              
              {/* Video Stats Skeleton */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-5 w-20 bg-gray-800 rounded animate-pulse" />
                  <div className="h-5 w-24 bg-gray-800 rounded animate-pulse" />
                </div>
                <div className="flex items-center space-x-6">
                  <div className="h-5 w-16 bg-gray-800 rounded animate-pulse" />
                  <div className="h-5 w-16 bg-gray-800 rounded animate-pulse" />
                  <div className="h-5 w-16 bg-gray-800 rounded animate-pulse" />
                </div>
              </div>
            </div>

            {/* Comments Section Skeleton */}
            <div className="mt-6">
              <div className="h-7 w-32 bg-gray-800 rounded-lg mb-4 animate-pulse" />
              
              {/* Comment Input Skeleton */}
              <div className="flex items-center space-x-2 mb-6">
                <div className="flex-1 h-10 bg-gray-800 rounded-lg animate-pulse" />
                <div className="h-10 w-24 bg-gray-800 rounded-lg animate-pulse" />
              </div>

              {/* Comments List Skeleton */}
              <div className="space-y-4">
                {commentSkeletons.map((_, index) => (
                  <div key={index} className="flex space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gray-800 animate-pulse" />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="h-5 w-24 bg-gray-800 rounded animate-pulse" />
                        <div className="h-4 w-20 bg-gray-800 rounded animate-pulse" />
                      </div>
                      <div className="h-4 w-3/4 bg-gray-800 rounded animate-pulse" />
                      <div className="flex items-center space-x-2">
                        <div className="h-4 w-16 bg-gray-800 rounded animate-pulse" />
                        <div className="h-4 w-8 bg-gray-800 rounded animate-pulse" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Suggested Videos Section Skeleton */}
          <div className="space-y-4">
            <div className="h-7 w-20 bg-gray-800 rounded-lg animate-pulse" />
            
            {suggestedVideoSkeletons.map((_, index) => (
              <div key={index} className="flex space-x-2">
                <div className="w-40 h-24 bg-gray-800 rounded-lg animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-5 bg-gray-800 rounded w-3/4 animate-pulse" />
                  <div className="h-4 bg-gray-800 rounded w-1/4 animate-pulse" />
                  <div className="h-4 bg-gray-800 rounded w-1/3 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerSkeleton;