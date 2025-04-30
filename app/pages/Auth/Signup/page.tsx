"use client";

import React, { memo, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, Star, ChevronRight, Play, Film, Tv, Calendar } from "lucide-react";

const SignupForm = dynamic(() => import("@/app/components/forms/SignupForm"), {
  ssr: false,
});

// Animated background component with gold color scheme
const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute w-full h-full bg-gradient-to-br from-amber-900 via-yellow-800 to-amber-700">
        {/* Animated particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 md:w-2 md:h-2 rounded-full bg-yellow-200 opacity-70"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              scale: [1, 1.5, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
        
        {/* Accent circles */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-yellow-500 filter blur-3xl opacity-20" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-amber-400 filter blur-3xl opacity-20" />
      </div>
    </div>
  );
};

// Streaming highlights component
const StreamingHighlights = () => {
  const items = [
    "Live sports matches from around the world",
    "Exclusive live events and concerts",
    "Premium shows and series on demand",
    "4K Ultra HD streaming quality"
  ];

  return (
    <div className="space-y-5 mb-12">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center">
        <Star className="mr-2 w-5 h-5 text-yellow-300" />
        Unlimited Entertainment
      </h3>
      
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.2 + 0.5 }}
          className="flex items-center text-white/90"
        >
          <ChevronRight className="mr-2 w-5 h-5 text-yellow-400" />
          <span>{item}</span>
        </motion.div>
      ))}
    </div>
  );
};

// Featured content component
const FeaturedContent = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2 }}
      className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/30"
    >
      <div className="flex items-center mb-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 bg-amber-800 flex items-center justify-center">
          <Play className="w-6 h-6 text-yellow-300" />
        </div>
        <div>
          <h4 className="font-semibold text-white">Featured This Week</h4>
          <p className="text-yellow-300 text-sm">Champions League Final</p>
        </div>
      </div>
      <p className="text-white/80">
        &quot;Watch the biggest match of the year live in stunning 4K quality with exclusive commentary and multi-angle views!&quot;
      </p>
    </motion.div>
  );
};

// Featured content cards
const ContentPreview = () => {
  const contents = [
    { icon: <Film className="w-6 h-6" />, title: "Blockbuster Movies" },
    { icon: <Tv className="w-6 h-6" />, title: "Premium Series" },
    { icon: <Calendar className="w-6 h-6" />, title: "Live Events" }
  ];
  
  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      {contents.map((content, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 + index * 0.2 }}
          className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-yellow-500/20 flex flex-col items-center"
        >
          <div className="text-yellow-400 mb-2">
            {content.icon}
          </div>
          <h5 className="text-white text-sm font-medium">{content.title}</h5>
        </motion.div>
      ))}
    </div>
  );
};

// eslint-disable-next-line react/display-name
const Logo = memo(() => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="md:absolute md:top-8 md:left-8 z-10"
  >
    <Link href="/pages/Home">
      <div className="relative w-16 h-16 md:w-20 md:h-20">
        <Image
          src="/logo/vbox.png"
          fill
          alt="logo"
          className="hover:opacity-90 transition-opacity"
          priority
        />
      </div>
    </Link>
  </motion.div>
));

// Counter animation component
interface AnimatedCounterProps {
  label: string;
  value: number;
  duration?: number;
}

const AnimatedCounter = ({ label, value, duration = 2000 }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime: number | undefined;
    let animationFrame: number;
    
    const updateCount = (timestamp: number): void => {
      if (!startTime) startTime = timestamp;
      const progress: number = timestamp - startTime;
      const percentage: number = Math.min(progress / duration, 1);
      
      setCount(Math.floor(percentage * value));
      
      if (percentage < 1) {
      animationFrame = requestAnimationFrame(updateCount);
      }
    };
    
    animationFrame = requestAnimationFrame(updateCount);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);
  
  return (
    <div className="text-center">
      <p className="text-3xl font-bold text-white">{count}+</p>
      <p className="text-yellow-300 text-sm mt-1">{label}</p>
    </div>
  );
};

const SignupPage = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row text-white overflow-hidden">
      {/* Left Panel - Form */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full bg-black lg:w-1/2 px-8  flex flex-col items-center justify-center relative"
      >
        {/* Logo */}
        <Logo />

        {/* Signup Form */}
        <div className="w-full max-w-xl space-y-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center space-y-2 mb-8"
          >
            <h1 className="text-4xl font-bold text-gray-900">
              Join The Experience
            </h1>
            <p className="text-gray-500">
              Create your account and start streaming today
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <SignupForm />
          </motion.div>

          {/* Sign-in Link */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-center pt-4"
          >
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                href="/pages/Auth/Signin"
                className="text-amber-600 hover:text-amber-700 font-medium"
              >
                Sign In
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Panel - Streaming Content Promotional */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full lg:w-1/2 hidden lg:flex flex-col justify-between p-12 relative overflow-hidden"
      >
        <AnimatedBackground />
        
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Watch <span className="text-yellow-400">Live</span> & On Demand</h2>
            <p className="text-lg text-white/80 max-w-md">
              Stream your favorite sports matches, shows, and exclusive content anytime, anywhere with our premium streaming service.
            </p>
          </motion.div>
          
          <ContentPreview />
          <StreamingHighlights />
        </div>
        
        <div className="relative z-10 space-y-10">
          <div className="grid grid-cols-3 gap-6 mb-12">
            <AnimatedCounter label="Live Channels" value={200} />
            <AnimatedCounter label="On-Demand Shows" value={5000} />
            <AnimatedCounter label="Sports Events" value={350} />
          </div>
          
          <FeaturedContent />
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="text-center"
          >
            <Link 
              href="/pages/Channels" 
              className="inline-flex items-center px-6 py-3 rounded-full bg-yellow-600 text-white font-medium hover:bg-yellow-700 transition-colors"
            >
              Explore Channels
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </motion.div>
        </div>
        
        {/* Floating elements */}
        <motion.div 
          className="absolute top-32 right-12 w-12 h-12 rounded-full bg-yellow-400 opacity-70"
          animate={{
            y: [0, -20, 0],
            opacity: [0.7, 0.4, 0.7],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.div 
          className="absolute bottom-40 left-12 w-8 h-8 rounded-full bg-amber-400 opacity-70"
          animate={{
            y: [0, 20, 0],
            opacity: [0.7, 0.3, 0.7],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </motion.div>
    </div>
  );
};

export default SignupPage;