"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { 
  Bookmark, 
  MessageSquare, 
  Play, 
  Share2, 
  ThumbsUp, 
  ChevronRight, 
  Bell,
  Search,
  Flame,
  Trophy,
  TrendingUp,
  Calendar
} from "lucide-react";
import { handleGetSinglePost } from "@/app/api/PostApi/api";
// import { Post } from "./home.data";

// Dynamic imports for performance optimization
const HomeLayoutWrapper = dynamic(() => import("@/app/layouts/HomeLayoutWrapper"), { ssr: false });
const Modal = dynamic(() => import("@/app/components/Modal"), { ssr: false });

// Component sections with loading states
// const Landingpage = dynamic(() => 
//   import("../../components/HompageComponent/Landingpage"), 
//   { loading: () => <FeaturedContentSkeleton /> }
// );
const ChampionsLeague = dynamic(() => 
  import("@/app/components/HompageComponent/FootballSection"), 
  { loading: () => <SectionSkeleton /> }
);
const GenreSection = dynamic(() => 
  import("@/app/components/HompageComponent/genresCards"), 
  { loading: () => <SectionSkeleton /> }
);
const VodSection = dynamic(() => 
  import("@/app/components/HompageComponent/VodSections"), 
  { loading: () => <SectionSkeleton /> }
);
const ShowsSection = dynamic(() => 
  import("@/app/components/HompageComponent/TrensingShowsSections"), 
  { loading: () => <SectionSkeleton /> }
);
const TopShowsSection = dynamic(() => 
  import("@/app/components/HompageComponent/TopShowsSections"), 
  { loading: () => <SectionSkeleton /> }
);
const NewsSection = dynamic(() => 
  import("@/app/components/HompageComponent/NewsSection"), 
  { loading: () => <SectionSkeleton /> }
);

// Loading skeleton components
const FeaturedContentSkeleton = () => (
  <div className="w-full h-screen bg-gray-900 animate-pulse">
    <div className="w-full h-full flex flex-col justify-end p-8">
      <div className="h-12 w-2/3 bg-gray-800 rounded-lg mb-4"></div>
      <div className="h-6 w-1/3 bg-gray-800 rounded-lg mb-8"></div>
      <div className="h-10 w-48 bg-gray-800 rounded-lg"></div>
    </div>
  </div>
);

const SectionSkeleton = () => (
  <div className="w-full py-8 px-4">
    <div className="h-8 w-48 bg-gray-800 rounded-lg mb-6 animate-pulse"></div>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="aspect-video bg-gray-800 rounded-lg animate-pulse"></div>
      ))}
    </div>
  </div>
);



// Featured content hero component
interface Post {
  id: number;
  bannerUrl: string;
  tags?: string[];
  caption: string;
  content: string;
}

const FeaturedContent = ({ post, onPlay }: { post: Post | null; onPlay: () => void }) => {
  if (!post) return <FeaturedContentSkeleton />;
  
  return (
    <div 
      className="w-full h-screen bg-cover bg-center relative overflow-hidden"
      style={{ backgroundImage: `url(${post.bannerUrl})` }}
    >
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90"></div>
      
      {/* Animated pattern overlay for texture */}
      <div 
        className="absolute inset-0 bg-[url('/noise-pattern.png')] opacity-5 mix-blend-overlay"
        style={{ backgroundSize: '200px' }}
      ></div>
      
      {/* Content with motion effects */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-16 lg:p-24">
        <div className="max-w-3xl animate-fade-in-up">
          {/* Tags row */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags?.map((tag, index) => (
              <span key={index} className="text-xs font-medium bg-white/10 backdrop-blur-sm text-white px-3 py-1 rounded-full border border-white/10">
                {tag}
              </span>
            ))}
            <span className="text-xs font-medium bg-indigo-600/80 text-white px-3 py-1 rounded-full">Trending</span>
          </div>
          
          {/* Title with animation */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
            {post.caption}
          </h1>
          
          {/* Description with truncation */}
          <p className="text-white/80 text-lg mb-8 line-clamp-3 max-w-2xl">
            {post.content}
          </p>
          
          {/* Call to action buttons */}
          <div className="flex flex-wrap gap-4 items-center">
            <button 
              onClick={onPlay}
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/30 flex items-center gap-2 group"
            >
              <Play className="h-5 w-5 transform transition-transform duration-300 group-hover:scale-110" />
              <span>Watch Now</span>
            </button>
            
            <button className="px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 text-white rounded-xl font-medium transition-all duration-300 flex items-center gap-2">
              <Bookmark className="h-5 w-5" />
              <span>Add To Watchlist</span>
            </button>
            
            <button className="p-4 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 text-white rounded-xl font-medium transition-all duration-300 md:flex items-center hidden">
              <Bell className="h-5 w-5" />
            </button>
          </div>
          
          {/* Progress indicator */}
          <div className="mt-10 flex items-center gap-2">
            <div className="h-1 bg-white/10 rounded-full w-48">
              <div className="h-full bg-indigo-600 rounded-full" style={{ width: '65%' }}></div>
            </div>
            <span className="text-white/60 text-sm">65% watched</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Section header component for consistent styling
const SectionHeader = ({ title, icon, actionLabel }: { title: string; icon: React.ReactNode; actionLabel: string }) => (
  <div className="flex justify-between items-center mb-6">
    <div className="flex items-center gap-2">
      {icon}
      <h2 className="text-xl md:text-2xl font-bold text-white">{title}</h2>
    </div>
    
    <button className="text-white/70 hover:text-white text-sm font-medium flex items-center gap-1 transition-colors">
      {actionLabel} <ChevronRight className="h-4 w-4" />
    </button>
  </div>
);

// Main component
function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [singlePost, setSinglePost] = useState<Post | null>(null);
  const [modalPost, setModalPost] = useState<ModalPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setModalPost(null);
  }, []);

  interface ModalPost {
    id: number;
    bannerUrl: string;
    caption: string;
    content: string;
    tags: string[];
    likeCount: number;
    commentCount: number;
  }

  const openModal = useCallback((postId: number): void => {
    setIsLoading(true);
    setIsModalOpen(true);
    
    handleGetSinglePost(postId)
      .then((post) => {
        setModalPost(post.data.post as ModalPost);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  const handlePlayFeatured = useCallback(() => {
    if (singlePost) {
      openModal(singlePost.id);
    }
  }, [singlePost, openModal]);

  useEffect(() => {
    setIsLoading(true);
    handleGetSinglePost(4)
      .then((post) => {
        setSinglePost(post.data.post);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);



  return (
    <HomeLayoutWrapper>
      {/* Enhanced modal with loading state */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {isLoading ? (
          <div className="w-full h-screen bg-black/90 flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : modalPost && (
          <div
            style={{
              backgroundImage: `url(${modalPost.bannerUrl})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className="w-full h-screen rounded-lg overflow-hidden relative group"
          >
            {/* Enhanced cinematic overlay with animated gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-80"></div>
            
            {/* Animated spotlight effect on hover */}
            <div className="absolute inset-0 bg-radial-gradient opacity-0 group-hover:opacity-20 transition-opacity duration-700"></div>
            
            {/* Content area with animated reveal */}
            <div className="w-full h-full relative flex flex-col justify-end">
              {/* Centered play button with animations */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <button 
                  onClick={() => router.push(`/pages/Player/${modalPost.id}`)}
                  className="w-24 h-24 rounded-full bg-indigo-600/40 backdrop-blur-md flex items-center justify-center border-2 border-white hover:bg-indigo-500/60 transition-all duration-500 hover:scale-110 group"
                >
                  <Play className="h-12 w-12 text-white fill-white ml-2" />
                  <span className="absolute mt-28 bg-black/80 backdrop-blur-sm px-4 py-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">Play Now</span>
                </button>
              </div>
              
              {/* Enhanced title section with animated entrance */}
              <div className="px-6 sm:px-10 md:px-16 pt-16 pb-6 animate-fade-in-up">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 leading-tight tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                  {modalPost.caption}
                </h1>
                
                {/* Enhanced tags with hover effects */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {modalPost.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="bg-white/10 backdrop-blur-md text-white/90 px-4 py-1.5 rounded-full text-sm font-medium border border-white/10 hover:bg-white/20 hover:border-white/30 transition-all cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
          
              {/* Enhanced bottom content area with glass morphism */}
              <div className="w-full bg-black/30 backdrop-blur-md border-t border-white/10 animate-fade-in">
                <div className="max-w-6xl mx-auto p-6 sm:p-8 md:p-10">
                  {/* Content layout with responsive columns */}
                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left column: Rich description */}
                    <div className="flex-1">
                      <p className="text-indigo-400 text-sm uppercase tracking-wider mb-3 font-medium">Overview</p>
                      <p className="text-white/90 leading-relaxed text-lg">
                        {modalPost.content}
                      </p>
                      
                      {/* Meta information with icons */}
                      <div className="flex flex-wrap gap-6 mt-6 text-white/70">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>2023</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4" />
                          <span>#5 in Trending</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{modalPost.likeCount} likes</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Right column: Enhanced action buttons and metrics */}
                    <div className="lg:w-80 flex flex-col gap-4">
                      {/* Primary action buttons */}
                      <button
                        onClick={() => router.push(`/pages/Player/${modalPost.id}`)}
                        className="w-full py-4 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/30 group"
                      >
                        <Play className="h-5 w-5 transform group-hover:scale-110 transition-transform" />
                        <span>Watch Now</span>
                      </button>
                      
                      <button className="w-full py-3.5 flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 text-white rounded-xl font-medium transition-all duration-300">
                        <Bookmark className="h-5 w-5" />
                        <span>Add To Watchlist</span>
                      </button>
                      
                      {/* Enhanced engagement metrics with animations */}
                      <div className="flex justify-between items-center mt-4 bg-white/5 rounded-xl p-2">
                        <button className="group flex-1 flex items-center justify-center gap-2 py-3 rounded-lg hover:bg-white/10 transition-colors">
                          <div className="relative">
                            <ThumbsUp className="h-5 w-5 text-white/80 group-hover:text-indigo-400 transition-colors" />
                            <span className="absolute -top-3 -right-3 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center bg-indigo-600 text-white text-xs w-5 h-5 rounded-full">+1</span>
                          </div>
                          <span className="text-white/80 group-hover:text-white">{modalPost.likeCount}</span>
                        </button>
                        
                        <div className="h-10 w-px bg-white/10"></div>
                        
                        <button className="group flex-1 flex items-center justify-center gap-2 py-3 rounded-lg hover:bg-white/10 transition-colors">
                          <MessageSquare className="h-5 w-5 text-white/80 group-hover:text-indigo-400 transition-colors" />
                          <span className="text-white/80 group-hover:text-white">{modalPost.commentCount}</span>
                        </button>
                        
                        <div className="h-10 w-px bg-white/10"></div>
                        
                        <button className="group flex-1 flex items-center justify-center gap-2 py-3 rounded-lg hover:bg-white/10 transition-colors">
                          <Share2 className="h-5 w-5 text-white/80 group-hover:text-indigo-400 transition-colors" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Enhanced progress bar with animations */}
            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-white/10">
              <div className="h-full bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full" style={{ width: '35%' }}>
                <div className="absolute h-3 w-3 rounded-full bg-white -top-1 -right-1.5 shadow-glow"></div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Enhanced Main Content */}
      {isLoading ? (
        <FeaturedContentSkeleton />
      ) : (
        <FeaturedContent 
          post={singlePost} 
          onPlay={handlePlayFeatured} 
        />
      )}

      {/* Quick access navigation */}
      <div className="bg-black/40 backdrop-blur-md sticky top-0 z-10 px-4 py-2 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Navigation tabs */}
          <div className="flex space-x-1 md:space-x-6 overflow-x-auto hide-scroll">
            {["Home", "Sports", "Movies", "TV Shows", "News", "Live", "Premium"].map((tab, index) => (
              <button 
                key={index}
                className={`px-3 py-2 whitespace-nowrap text-sm font-medium ${index === 0 ? 'text-indigo-400 border-b-2 border-indigo-500' : 'text-white/70 hover:text-white transition-colors'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
            <input 
              type="text" 
              placeholder="Search for content..." 
              className="bg-white/5 border border-white/10 rounded-full py-1.5 pl-10 pr-4 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Content sections with enhanced spacing and headers */}
      <div className="bg-gradient-to-b from-black/90 to-black py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Enhanced sections with proper headers */}
          <div className="space-y-12">
            {/* Continue watching section */}
            <section>
              <SectionHeader 
                title="Continue Watching" 
                icon={<Play className="h-5 w-5 text-indigo-500" />}
                actionLabel="See All"
              />
              <ChampionsLeague />
            </section>
            
            {/* Genre section */}
            <section>
              <SectionHeader 
                title="Browse by Genre" 
                icon={<Search className="h-5 w-5 text-green-500" />}
                actionLabel="All Genres"
              />
              <GenreSection onClose={() => setIsModalOpen(true)} postId={openModal} />
            </section>
            
            {/* Trending shows section */}
            <section>
              <SectionHeader 
                title="Trending Now" 
                icon={<Flame className="h-5 w-5 text-red-500" />}
                actionLabel="Explore"
              />
              <ShowsSection onClose={() => setIsModalOpen(true)} postId={openModal} />
            </section>
            
            {/* VOD section */}
            <section>
              <SectionHeader 
                title="New Releases" 
                icon={<Calendar className="h-5 w-5 text-amber-500" />}
                actionLabel="View All"
              />
              <VodSection onClose={() => setIsModalOpen(true)} />
            </section>
            
            {/* News section */}
            <section>
              <SectionHeader 
                title="Latest News" 
                icon={<MessageSquare className="h-5 w-5 text-blue-500" />}
                actionLabel="More News"
              />
              <NewsSection />
            </section>
            
            {/* Top shows section */}
            <section>
              <SectionHeader 
                title="Top Rated" 
                icon={<Trophy className="h-5 w-5 text-purple-500" />}
                actionLabel="View All"
              />
              <TopShowsSection onClose={() => setIsModalOpen(true)} />
            </section>
          </div>
        </div>
      </div>
      
      {/* Global styling for animations */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .shadow-glow {
          box-shadow: 0 0 10px 2px rgba(99, 102, 241, 0.8);
        }
        
        .bg-radial-gradient {
          background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 80%);
        }
        
        .hide-scroll::-webkit-scrollbar {
          display: none;
        }
        
        .hide-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </HomeLayoutWrapper>
  );
}

export default Page;