/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState, useCallback } from "react";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import {
  StreamVideoClient,
  User,
  StreamCall,
  StreamVideo,
  Call,
  ParticipantView,
  useCallStateHooks,
  StreamVideoParticipant,
} from "@stream-io/video-react-sdk";
import { UserAuth } from "@/useContext";
import random from "random-string-generator";
import { motion, AnimatePresence } from "framer-motion";
import {
  Radio,
  Eye,
  Copy,
  Check,
  Settings,
  AlertCircle,
  Wifi,
  WifiOff,
  Video,
  Maximize2,
  Heart,
  TrendingUp,
  Clock,
  Server,
  Key,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useStreamContext } from "@/Provider/streamContext";
import {
  handleInputLiveStreamData,
  handleUpdateLiveStream,
} from "@/app/api/LiveApi/api";

const apiKey = process.env.NEXT_PUBLIC_STREAM_IO_ACCESS_KEY ?? "";

type obsCredentials = {
  streamKey: string;
  ingestUrl: string;
};

interface ChannelPageProps {
  params: {
    id: string;
  };
}

const Livestream = ({ params }: ChannelPageProps) => {
  const { username, userProfilePicture } = UserAuth();
  const { client } = useStreamContext();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [call, setCall] = useState<Call | null>(null);
  const [obsCredentials, setObsCredentials] = useState<obsCredentials>({
    ingestUrl: "",
    streamKey: "",
  });
  const [isLive, setIsLive] = useState(false);
  const [showCredentials, setShowCredentials] = useState(true);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [streamDuration, setStreamDuration] = useState(0);
  const [viewerCount, setViewerCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [streamData, setStreamData] = useState({
    title: "",
    description: "",
    banner: null as File | null,
  });
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setStreamData({ ...streamData, banner: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGoLive = useCallback(async () => {
    if (call) {
      try {
        const saveLiveStreamData = await handleInputLiveStreamData({
          streamName: params.id,
          ...streamData,
        });

        if (saveLiveStreamData.status !== 201) {
          console.error("❌ Failed to save livestream data");
          return;
        }
        await handleUpdateLiveStream(params.id).catch((error) => {
          console.error(error);
        });
        await call.goLive({ start_hls: true });
        setIsLive(true);
        setShowModal(false);
        // You can access streamData here to send to your backend
        // console.log("Stream Data:", streamData);
      } catch (e) {
        console.error("❌ Failed to go live:", e);
      }
    }
  }, [call, streamData]);

  const handleEndLive = useCallback(async () => {
    if (call) {
      try {
        await handleUpdateLiveStream(params.id).catch((error) => {
          console.error(error);
        });

        await call.endCall();
        setIsLive(false);
        setShowModal(true);
        // You can access streamData here to send to your backend
        // console.log("Stream Data:", streamData);
      } catch (e) {
        console.error("❌ Failed to go live:", e);
      }
    }
  }, [call, streamData]);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLive) {
      interval = setInterval(() => {
        setStreamDuration((prev) => prev + 1);
        setViewerCount(Math.floor(Math.random() * 50) + 10);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isLive]);

  const formatDuration = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const initClient = async () => {
      const token = Cookies.get("streamToken");

      if (!token || !username?.id || !username?.firstName || !apiKey) {
        console.error("❌ Missing required data to initialize client.");
        return;
      }

      const user: User = {
        id: username.id.toString(),
        name: username.firstName,
        image: userProfilePicture ?? undefined,
      };

      const streamClient = new StreamVideoClient({
        apiKey,
        token,
        user,
      });

      let callId = searchParams.get("callId");

      if (!callId) {
        callId = random(12, "scoped:ABCDE");
        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.set("callId", callId);
        router.replace(`?${newSearchParams.toString()}`);
      }

      const newCall = streamClient.call("livestream", params.id);
      await newCall.join({ create: true });
      await newCall.camera.disable();
      await newCall.microphone.disable();

      newCall.state.ingress$.subscribe((ingress) => {
        if (ingress?.rtmp.address) {
          const rtmpUrl = ingress.rtmp.address;
          const data = {
            ingestUrl: rtmpUrl,
            streamKey: token,
          };
          setObsCredentials(data);
        }
      });
      setCall(newCall);
    };

    initClient();

    return () => {
      if (client) client.disconnectUser();
      if (call) call.leave();
    };
  }, [username, userProfilePicture, router, searchParams]);

  if (!client)
    return (
      <div className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-[#1ABC9C] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-white/70 text-lg">Initializing Studio...</p>
        </div>
      </div>
    );

  if (!call)
    return (
      <div className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-[#1ABC9C] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-white/70 text-lg">Setting up livestream...</p>
        </div>
      </div>
    );

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <div className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col overflow-hidden">
          {/* Top Navigation Bar */}
          <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="bg-black/40 backdrop-blur-xl border-b border-white/10 px-6 py-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#1ABC9C] to-[#16A085] flex items-center justify-center">
                    <Video className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-white font-bold text-lg">
                      Livestream Studio
                    </h1>
                    <p className="text-white/50 text-xs">
                      Professional Control
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <AnimatePresence>
                  {isLive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 border border-red-500/30">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                        <span className="text-red-400 font-semibold text-sm">
                          LIVE
                        </span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                        <Clock className="w-4 h-4 text-[#1ABC9C]" />
                        <span className="text-white font-mono text-sm">
                          {formatDuration(streamDuration)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                        <Eye className="w-4 h-4 text-[#1ABC9C]" />
                        <span className="text-white font-semibold text-sm">
                          {viewerCount}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all">
                  <Settings className="w-5 h-5 text-white/70" />
                </button>
              </div>
            </div>
          </motion.nav>

          {/* Main Content Area */}
          <div className="flex-1 grid grid-cols-1 xl:grid-cols-3 gap-6 p-6 overflow-hidden">
            {/* Left Panel - Controls */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="xl:col-span-1 space-y-6 overflow-y-auto custom-scrollbar"
            >
              {/* Go Live Card */}
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-6 shadow-2xl">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-white font-bold text-xl mb-1">
                      Broadcast Control
                    </h2>
                    <p className="text-white/50 text-sm">
                      {isLive ? "Your stream is live" : "Ready to go live"}
                    </p>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      isLive
                        ? "bg-red-500/20 border border-red-500/30"
                        : "bg-[#1ABC9C]/20 border border-[#1ABC9C]/30"
                    }`}
                  >
                    <Radio
                      className={`w-6 h-6 ${
                        isLive ? "text-red-400" : "text-[#1ABC9C]"
                      }`}
                    />
                  </div>
                </div>

                <button
                  onClick={() =>
                    isLive ? handleEndLive() : setShowModal(true)
                  }
                  className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 ${
                    isLive
                      ? "bg-gradient-to-r from-red-600 to-red-700 hover:shadow-lg hover:shadow-red-500/50 hover:scale-105 active:scale-95"
                      : "bg-gradient-to-r from-[#1ABC9C] to-[#16A085] hover:shadow-lg hover:shadow-[#1ABC9C]/50 hover:scale-105 active:scale-95"
                  }`}
                >
                  {isLive ? (
                    <span className="flex items-center justify-center gap-2">
                      <WifiOff className="w-5 h-5" />
                      End Stream
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Radio className="w-5 h-5" />
                      Start Broadcast
                    </span>
                  )}
                </button>
              </div>

              {/* Stream Stats */}
              {isLive && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-xl border border-white/20 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-[#1ABC9C]" />
                      <span className="text-white/50 text-xs font-medium">
                        Peak Viewers
                      </span>
                    </div>
                    <p className="text-white text-2xl font-bold">
                      {Math.max(viewerCount, 42)}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-xl border border-white/20 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Heart className="w-4 h-4 text-[#1ABC9C]" />
                      <span className="text-white/50 text-xs font-medium">
                        Reactions
                      </span>
                    </div>
                    <p className="text-white text-2xl font-bold">
                      {Math.floor(Math.random() * 500) + 100}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* OBS Credentials */}
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
                <button
                  onClick={() => setShowCredentials(!showCredentials)}
                  className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center">
                      <Key className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-white font-bold text-lg">
                        OBS Credentials
                      </h3>
                      <p className="text-white/50 text-xs">
                        Private - Do not share
                      </p>
                    </div>
                  </div>
                  {showCredentials ? (
                    <ChevronUp className="w-5 h-5 text-white/50" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-white/50" />
                  )}
                </button>

                <AnimatePresence>
                  {showCredentials && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-6 space-y-4"
                    >
                      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <AlertCircle className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                        <p className="text-yellow-200 text-xs">
                          Keep these credentials secure
                        </p>
                      </div>

                      {/* Stream URL */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Server className="w-4 h-4 text-[#1ABC9C]" />
                          <label className="text-white/70 text-sm font-medium">
                            Server URL
                          </label>
                        </div>
                        <div className="relative group">
                          <div className="bg-black/40 rounded-lg border border-white/10 p-3 pr-12 overflow-x-auto custom-scrollbar">
                            <code className="text-white text-sm font-mono break-all">
                              {obsCredentials.ingestUrl || "Generating..."}
                            </code>
                          </div>
                          <button
                            onClick={() =>
                              handleCopy(obsCredentials.ingestUrl, "url")
                            }
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-[#1ABC9C]/20 hover:bg-[#1ABC9C]/30 border border-[#1ABC9C]/30 flex items-center justify-center transition-all"
                          >
                            {copiedField === "url" ? (
                              <Check className="w-4 h-4 text-[#1ABC9C]" />
                            ) : (
                              <Copy className="w-4 h-4 text-[#1ABC9C]" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Stream Key */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Key className="w-4 h-4 text-[#1ABC9C]" />
                          <label className="text-white/70 text-sm font-medium">
                            Stream Key
                          </label>
                        </div>
                        <div className="relative group">
                          <div className="bg-black/40 rounded-lg border border-white/10 p-3 pr-12 overflow-x-auto custom-scrollbar">
                            <code className="text-white text-sm font-mono break-all">
                              {obsCredentials.streamKey || "Generating..."}
                            </code>
                          </div>
                          <button
                            onClick={() =>
                              handleCopy(obsCredentials.streamKey, "key")
                            }
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-[#1ABC9C]/20 hover:bg-[#1ABC9C]/30 border border-[#1ABC9C]/30 flex items-center justify-center transition-all"
                          >
                            {copiedField === "key" ? (
                              <Check className="w-4 h-4 text-[#1ABC9C]" />
                            ) : (
                              <Copy className="w-4 h-4 text-[#1ABC9C]" />
                            )}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Right Panel - Video Preview */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="xl:col-span-2 flex flex-col"
            >
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden flex-1 flex flex-col">
                {/* Preview Header */}
                <div className="bg-black/40 border-b border-white/10 px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#1ABC9C]/20 border border-[#1ABC9C]/30 flex items-center justify-center">
                      <Video className="w-4 h-4 text-[#1ABC9C]" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg">
                        Stream Preview
                      </h3>
                      <p className="text-white/50 text-xs">
                        {isLive
                          ? "Live feed from OBS"
                          : "Waiting for OBS connection"}
                      </p>
                    </div>
                  </div>
                  <button className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all">
                    <Maximize2 className="w-4 h-4 text-white/70" />
                  </button>
                </div>

                {/* Video Container */}
                <div className="flex-1 bg-black relative">
                  <LiveStreamUi isLive={isLive} />

                  {/* Overlay indicators */}
                  {isLive && (
                    <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/90 backdrop-blur-sm">
                      <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                      <span className="text-white font-semibold text-sm">
                        LIVE
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stream Setup Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-white/20 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
              >
                {/* Modal Header */}
                <div className="bg-black/40 border-b border-white/10 px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#1ABC9C] to-[#16A085] flex items-center justify-center">
                      <Radio className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-white font-bold text-xl">
                        Setup Your Stream
                      </h2>
                      <p className="text-white/50 text-sm">
                        Configure your broadcast details
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all"
                  >
                    <span className="text-white text-xl">×</span>
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-140px)] custom-scrollbar">
                  {/* Title */}
                  <div className="space-y-2">
                    <label className="text-white font-medium text-sm flex items-center gap-2">
                      <Video className="w-4 h-4 text-[#1ABC9C]" />
                      Stream Title
                    </label>
                    <input
                      type="text"
                      value={streamData.title}
                      onChange={(e) =>
                        setStreamData({ ...streamData, title: e.target.value })
                      }
                      placeholder="What's your stream about?"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#1ABC9C] transition-all"
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <label className="text-white font-medium text-sm flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-[#1ABC9C]" />
                      Description
                    </label>
                    <textarea
                      value={streamData.description}
                      onChange={(e) =>
                        setStreamData({
                          ...streamData,
                          description: e.target.value,
                        })
                      }
                      placeholder="Tell viewers what to expect..."
                      rows={4}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#1ABC9C] transition-all resize-none"
                    />
                  </div>

                  {/* Banner Upload */}
                  <div className="space-y-2">
                    <label className="text-white font-medium text-sm flex items-center gap-2">
                      <Eye className="w-4 h-4 text-[#1ABC9C]" />
                      Stream Banner
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleBannerChange}
                        className="hidden"
                        id="banner-upload"
                      />
                      <label
                        htmlFor="banner-upload"
                        className="block w-full cursor-pointer"
                      >
                        {bannerPreview ? (
                          <div className="relative group">
                            <img
                              src={bannerPreview}
                              alt="Banner preview"
                              className="w-full h-48 object-cover rounded-lg border-2 border-white/10"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all rounded-lg flex items-center justify-center">
                              <span className="text-white font-medium">
                                Click to change
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="w-full h-48 bg-black/40 border-2 border-dashed border-white/20 rounded-lg flex flex-col items-center justify-center hover:border-[#1ABC9C] transition-all">
                            <Eye className="w-8 h-8 text-white/30 mb-2" />
                            <p className="text-white/50 text-sm">
                              Click to upload banner
                            </p>
                            <p className="text-white/30 text-xs mt-1">
                              Recommended: 1920x1080px
                            </p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="bg-black/40 border-t border-white/10 px-6 py-4 flex items-center justify-end gap-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleGoLive}
                    disabled={!streamData.description || !streamData.title}
                    className={`px-6 py-3 rounded-lg font-semibold text-white transition-all ${
                      !streamData.description || !streamData.title
                        ? "bg-white/10 cursor-not-allowed"
                        : "bg-gradient-to-r from-[#1ABC9C] to-[#16A085] hover:shadow-lg hover:shadow-[#1ABC9C]/50"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Radio className="w-4 h-4" />
                      Go Live
                    </span>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <style jsx global>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
            height: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #1abc9c;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #16a085;
          }
        `}</style>
      </StreamCall>
    </StreamVideo>
  );
};

export default Livestream;

const LiveStreamUi = ({ isLive }: { isLive: boolean }) => {
  const { useParticipants } = useCallStateHooks();
  const [firstParticipant] = useParticipants() as StreamVideoParticipant[];

  if (!firstParticipant) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-6 max-w-md px-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#1ABC9C]/20 to-[#16A085]/20 border-2 border-[#1ABC9C]/30 flex items-center justify-center mx-auto">
              <WifiOff className="w-12 h-12 text-[#1ABC9C]/50" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center animate-pulse">
              <AlertCircle className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-white text-xl font-bold">
              Waiting for OBS Stream
            </h3>
            <p className="text-white/50 text-sm leading-relaxed">
              Configure your OBS software with the credentials above and start
              streaming to see your feed here.
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 pt-4">
            <div className="w-2 h-2 rounded-full bg-[#1ABC9C] animate-pulse"></div>
            <div
              className="w-2 h-2 rounded-full bg-[#1ABC9C] animate-pulse"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-2 h-2 rounded-full bg-[#1ABC9C] animate-pulse"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <ParticipantView participant={firstParticipant} />
    </div>
  );
};
