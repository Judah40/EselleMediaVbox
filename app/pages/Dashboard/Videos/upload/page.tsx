"use client";

import React from "react";
import { motion } from "framer-motion";
import VideoForm from "../../(component)/Forms/videoForm/videoForm";

const UploadPage = () => {
  return (
    <div className="bg-zinc-950 text-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Upload Video</h1>
            <p className="text-gray-400">
              Fill in the details to upload your video
            </p>
          </div>
          
        </div>
        
        <div className="bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-800 p-6">
          <VideoForm isComplete={() => {}}  />
        </div>
      </motion.div>
    </div>
  );
};

export default UploadPage;