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

  // const [client, setClient] = useState<StreamVideoClient | null>(null);
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

  const handleGoLive = useCallback(async () => {
    if (call) {
      try {
        await call.goLive({ start_hls: true });
        setIsLive(true);
      } catch (e) {
        console.error("❌ Failed to go live:", e);
      }
    }
  }, [call]);

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
      // setClient(streamClient);
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
                  onClick={handleGoLive}
                  disabled={isLive}
                  className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 ${
                    isLive
                      ? "bg-white/10 cursor-not-allowed"
                      : "bg-gradient-to-r from-[#1ABC9C] to-[#16A085] hover:shadow-lg hover:shadow-[#1ABC9C]/50 hover:scale-105 active:scale-95"
                  }`}
                >
                  {isLive ? (
                    <span className="flex items-center justify-center gap-2">
                      <Wifi className="w-5 h-5" />
                      Broadcasting
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
