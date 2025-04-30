"use client";

import React, { useEffect, useState, useRef } from "react";
import { handleGetPostByGenre } from "@/app/api/PostApi/api";
import { Post } from "@/app/pages/Home/home.data";
import { UserAuth } from "@/useContext";
import { ChevronRight, Play, Info, Star, TrendingUp, Clock, Plus } from "lucide-react";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import { LazyLoadImage } from "react-lazy-load-image-component";

// Genre data with enhanced information
const genreData = [
  { name: "comedy", icon: "😄", color: "from-pink-500 to-rose-500" },
  { name: "action", icon: "💥", color: "from-amber-500 to-red-500" },
  { name: "drama", icon: "🎭", color: "from-indigo-500 to-purple-500" },
  { name: "horror", icon: "👻", color: "from-emerald-500 to-teal-500" },
  { name: "sci-fi", icon: "🚀", color: "from-blue-500 to-cyan-500" },
];

// Skeleton loader for content
const SkeletonLoader = () => (
  <>
    <div className="animate-pulse flex space-x-4 mb-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-8 w-24 bg-gray-800 rounded-full"></div>
      ))}
    </div>
    
    <div className="animate-pulse flex flex-col md:flex-row gap-6">
      <div className="flex-1 grid grid-cols-2 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-60 bg-gray-800 rounded-xl"></div>
        ))}
      </div>
      
      <div className="flex-1 space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-20 bg-gray-800 rounded-xl"></div>
        ))}
      </div>
    </div>
  </>
);

// Featured content component
const FeaturedContent = ({ post }: { post: Post }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  if (!post) return null;
  
  return (
    <div 
      className="relative h-full w-full rounded-xl overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
      
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out"
        style={{ 
          backgroundImage: `url(${post.thumbnailUrl})`,
          transform: isHovered ? 'scale(1.05)' : 'scale(1)'
        }}
      ></div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 z-20 transform transition-transform duration-500 ease-out">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-xs font-medium bg-red-600 px-2 py-0.5 rounded">#1 Trending</span>
          <span className="text-xs text-gray-300 flex items-center">
            <Star className="w-3 h-3 text-yellow-400 mr-1" fill="currentColor" />
            {(Math.random() * 2 + 3).toFixed(1)}/5
          </span>
        </div>
        
        <h3 className="text-xl font-bold truncate">{post.caption}</h3>
        
        <div className="flex items-center space-x-2 mt-1 text-sm text-gray-300">
          <span className="flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {Math.floor(Math.random() * 120 + 30)} min
          </span>
          <span>•</span>
          <span>{new Date().getFullYear()}</span>
        </div>
        
        <div className="flex space-x-2 mt-3 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button className="bg-white text-black font-medium py-2 px-4 rounded-lg flex items-center hover:bg-opacity-90 transition-all">
            <Play className="w-4 h-4 mr-2" fill="currentColor" /> Watch Now
          </button>
          <button className="bg-gray-800/80 backdrop-blur-sm text-white py-2 px-4 rounded-lg flex items-center hover:bg-gray-700/80 transition-all">
            <Info className="w-4 h-4 mr-2" /> Details
          </button>
          <button className="bg-gray-800/80 backdrop-blur-sm text-white p-2 rounded-lg flex items-center hover:bg-gray-700/80 transition-all">
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const TopShowsSection = () => {
  const { posts } = UserAuth();
  const [selectedGenre, setSelectedGenre] = useState("comedy");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [genrePosts, setGenrePosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredPost, setHoveredPost] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Enhanced fetch function with error handling and state management
  const fetchPostsByGenre = async (genre: string) => {
    if (genre === selectedGenre && genrePosts.length > 0) return;
    
    setIsLoading(true);
    setIsAnimating(true);
    
    try {
      const response = await handleGetPostByGenre(genre);
      
      // Add short delay for smoother transition
      setTimeout(() => {
        setGenrePosts(response.data.post || []);
        setSelectedGenre(genre);
        setSelectedIndex(0);
        setIsLoading(false);
        
        setTimeout(() => {
          setIsAnimating(false);
        }, 300);
      }, 300);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      setGenrePosts([]);
      setIsLoading(false);
      setIsAnimating(false);
    }
  };
  
  useEffect(() => {
    if (posts && posts.length > 0 && genrePosts.length === 0) {
      setGenrePosts(posts);
    }
  }, [posts]);
  
  // Get either selected posts or fallback to default posts
  const displayPosts = genrePosts.length > 0 ? genrePosts : posts || [];
  // const selectedPost = displayPosts[selectedIndex];
  
  return (
    <section className="relative bg-gradient-to-b from-black to-gray-900 text-white py-16 px-4 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-20"></div>
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-700 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-700 rounded-full filter blur-3xl opacity-20"></div>
      </div>
      
      <div className="container mx-auto relative z-10 max-w-6xl">
        {/* Header with enhanced design */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <TrendingUp className="w-5 h-5 text-red-500" />
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                This Week&apos;s Top Shows
              </h2>
            </div>
            <p className="text-gray-400 text-sm">
              The most watched content by our community this week
            </p>
          </div>
          
          <button className="hidden md:flex items-center text-sm font-medium text-gray-400 hover:text-white transition-colors">
            View All <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        
        {/* Genre selection with enhanced UI */}
        <div className="mb-8 genre-scroller overflow-x-auto hide-scrollbar">
          <div className="flex gap-3 min-w-max">
            {genreData.map((genre) => (
              <button
                key={genre.name}
                onClick={() => fetchPostsByGenre(genre.name)}
                className={`
                  px-5 py-2.5 rounded-full transition-all duration-300 flex items-center
                  ${selectedGenre === genre.name 
                    ? `bg-gradient-to-r ${genre.color} text-white shadow-lg` 
                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 backdrop-blur-sm'}
                `}
              >
                <span className="mr-2">{genre.icon}</span>
                <span className="capitalize">{genre.name}</span>
              </button>
            ))}
          </div>
        </div>
        
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <div className={`
            flex flex-col lg:flex-row gap-6 transition-opacity duration-300
            ${isAnimating ? 'opacity-0' : 'opacity-100'}
          `}>
            {/* Main featured section */}
            <div className="flex-1 grid grid-cols-2 gap-3" ref={containerRef}>
              {displayPosts.slice(0, 4).map((post, index) => (
                <div key={post.id || index} className="aspect-[3/4] md:aspect-auto">
                  <FeaturedContent post={post} />
                </div>
              ))}
            </div>
            
            {/* Top rankings list with enhanced UI */}
            <div className="flex-1 space-y-3 lg:max-w-xs">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg">Top 5 Rankings</h3>
                <div className="text-xs font-medium px-2 py-1 rounded bg-gray-800/70 backdrop-blur-sm text-gray-300">
                  {selectedGenre.toUpperCase()}
                </div>
              </div>
              
              {displayPosts.slice(0, 5).map((post, index) => (
                <div
                  key={post.id || index}
                  className={`
                    relative p-4 rounded-xl cursor-pointer overflow-hidden transition-all duration-300
                    ${selectedIndex === index
                      ? 'bg-gradient-to-r from-gray-800 to-gray-900 shadow-xl' 
                      : 'bg-gray-800/50 hover:bg-gray-800/80'}
                  `}
                  onClick={() => setSelectedIndex(index)}
                  onMouseEnter={() => setHoveredPost(index)}
                  onMouseLeave={() => setHoveredPost(null)}
                >
                  {/* Accent line */}
                  <div className={`
                    absolute left-0 top-0 h-full w-1 rounded
                    ${selectedIndex === index ? 'bg-red-500' : 'bg-transparent'}
                  `}></div>
                  
                  <div className="flex items-center">
                    <div className="mr-4 opacity-60">
                      <span className="text-xl font-bold text-white">{index + 1}</span>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-medium line-clamp-1">{post.caption}</h3>
                      
                      <div className="flex items-center mt-1 text-xs text-gray-400">
                        <span className="flex items-center">
                          <Star className="w-3 h-3 text-yellow-500 mr-1" fill="currentColor" />
                          {(Math.random() * 2 + 3).toFixed(1)}
                        </span>
                        <span className="mx-2">•</span>
                        <span>{Math.floor(Math.random() * 10000).toLocaleString()} views</span>
                      </div>
                    </div>
                    
                    <div className={`
                      ml-2 flex items-center justify-center w-8 h-8 rounded-full bg-red-600
                      transition-all duration-300
                      ${hoveredPost === index ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}
                    `}>
                      <Play className="w-4 h-4" fill="currentColor" />
                    </div>
                  </div>
                </div>
              ))}
              
              <button className="w-full flex justify-center items-center py-3 mt-2 text-sm text-gray-400 hover:text-white transition-colors bg-gray-800/50 hover:bg-gray-800 rounded-xl backdrop-blur-sm">
                See All Rankings <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TopShowsSection;