"use client";

import Header from "@/app/components/Header";
import Sidebar from "@/app/components/SideBar";
import { UserAuth } from "@/useContext";
import { Call } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { checkIfChannelExist } from "@/app/api/ChannelApi/api";
import { User, Loader2 } from "lucide-react";
import { useStreamContext } from "@/Provider/streamContext";
import StreamBroadcast from "@/app/components/StreamBroadcast";
import VideoPlayer from "@/app/components/VideoPlayer";

interface ChannelPageProps {
  params: {
    id: string;
  };
}

type AppState =
  | "loading"
  | "auth_required"
  | "initializing"
  | "setting_up_stream"
  | "broadcast"
  | "viewer"
  | "error";

const Player = ({ params }: ChannelPageProps) => {
  const [activeCategory, setActiveCategory] = useState("Home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [channelExist, setChannelExist] = useState<boolean | null>(null);
  const [appState, setAppState] = useState<AppState>("loading");
  const { username } = UserAuth();
  const { client } = useStreamContext();
  const [call, setCall] = useState<Call | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Check channel existence and initialize
  useEffect(() => {
    const initializeApp = async () => {
      try {
        setAppState("loading");
        setError(null);

        // First, check if channel exists
        const channelResponse = await checkIfChannelExist(params.id);
        const doesChannelExist = channelResponse.data.channelExists;
        setChannelExist(doesChannelExist);

        // If channel doesn't exist, go directly to viewer mode
        if (!doesChannelExist) {
          setAppState("viewer");
          return;
        }

        // Channel exists, check authentication
        if (!username) {
          setAppState("auth_required");
          return;
        }

        // Check client availability
        if (!client) {
          setAppState("initializing");
          return;
        }

        // Initialize stream call
        setAppState("setting_up_stream");
        const newCall = client.call("livestream", params.id);
        await newCall.camera.disable();
        await newCall.microphone.disable();
        setCall(newCall);

        setAppState("broadcast");
      } catch (err) {
        console.error("❌ Initialization error:", err);
        setError(err instanceof Error ? err.message : "Failed to initialize");
        setAppState("viewer");
      }
    };

    if (params.id) {
      initializeApp();
    }

    return () => {
      if (call) {
        call.leave().catch(console.error);
      }
    };
  }, [params.id, username, client]);

  // Effect to handle client initialization when channel exists
  useEffect(() => {
    if (channelExist && username && client && !call) {
      const initializeCall = async () => {
        try {
          setAppState("setting_up_stream");
          const newCall = client.call("livestream", params.id);
          await newCall.camera.disable();
          await newCall.microphone.disable();
          setCall(newCall);
          setAppState("broadcast");
        } catch (err) {
          console.error("❌ Call initialization error:", err);
          setError(
            err instanceof Error ? err.message : "Failed to setup stream"
          );
          setAppState("viewer");
        }
      };
      initializeCall();
    }
  }, [channelExist, username, client, params.id, call]);

  const handleLogin = () => {
    router.push("/pages/Auth/Signin");
  };

  const handleRetry = () => {
    setChannelExist(null);
    setCall(null);
    setError(null);
    setAppState("loading");

    // Re-check channel existence
    const reinitialize = async () => {
      try {
        const channelResponse = await checkIfChannelExist(params.id);
        setChannelExist(channelResponse.data.channelExists);

        if (!channelResponse.data.channelExists) {
          setAppState("viewer");
          return;
        }

        if (!username) {
          setAppState("auth_required");
          return;
        }

        if (!client) {
          setAppState("initializing");
          return;
        }

        // Client exists, proceed to setup stream
        const newCall = client.call("livestream", params.id);
        await newCall.camera.disable();
        await newCall.microphone.disable();
        setCall(newCall);
        setAppState("broadcast");
      } catch (err) {
        setAppState("error");
        setError(err instanceof Error ? err.message : "Failed to initialize");
      }
    };

    reinitialize();
  };

  // Loading component
  const LoadingSpinner = ({ message }: { message: string }) => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <Loader2 className="h-12 w-12 text-[#1ABC9C] animate-spin" />
        </div>
        <p className="text-white/80 text-lg font-medium">{message}</p>
        <div className="flex justify-center space-x-2">
          <div
            className="w-2 h-2 bg-[#1ABC9C] rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          />
          <div
            className="w-2 h-2 bg-[#1ABC9C] rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          />
          <div
            className="w-2 h-2 bg-[#1ABC9C] rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    </div>
  );

  // Error component
  const ErrorState = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md mx-4">
        <div className="w-16 h-16 bg-[#087e66] rounded-full flex items-center justify-center mx-auto">
          <span className="text-2xl">⚠️</span>
        </div>
        <div>
          <h2 className="text-white text-xl font-semibold mb-2">
            Something went wrong
          </h2>
          <p className="text-white/70">
            {error || "Failed to load the stream"}
          </p>
        </div>
        <button
          onClick={handleRetry}
          className="bg-[#1ABC9C] hover:bg-[#16A085] text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  // Show loading while checking initial state
  if (appState === "loading") {
    return <LoadingSpinner message="Checking channel..." />;
  }

  // Show error state if something failed
  if (appState === "error") {
    return <ErrorState />;
  }

  // If channel exists but user is not authenticated
  if (channelExist && !username) {
    return (
      <div className="min-h-screen bg-black">
        <Header
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          isMenuOpen={sidebarOpen}
        />
        <div className="flex-1">
          <Sidebar
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
          <main className="flex-1 gap-2 min-h-screen transition-all duration-300 lg:pl-72 overflow-x-hidden h-screen flex items-center justify-center flex-col">
            <div className="text-center space-y-4">
              <p className="text-white text-lg">
                Please login to access the broadcast studio
              </p>
              <button
                onClick={handleLogin}
                className="flex items-center space-x-2 bg-[#1ABC9C] hover:bg-[#087e66] text-white px-6 py-3 rounded-lg transition-colors font-medium"
              >
                <User className="h-5 w-5" />
                <span>Login to Broadcast</span>
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // If channel exists but client is still initializing
  if (channelExist && !client) {
    return <LoadingSpinner message="Initializing broadcast studio..." />;
  }

  // If channel exists, user is authenticated, but call is being set up
  if (channelExist && client && !call) {
    return <LoadingSpinner message="Setting up livestream..." />;
  }

  // If channel exists and everything is ready for broadcast
  if (channelExist && client && call) {
    return (
      <StreamBroadcast
        activeCategory={activeCategory}
        client={client}
        call={call}
        setSidebarOpen={setSidebarOpen}
        setActiveCategory={setActiveCategory}
        sidebarOpen={sidebarOpen}
      />
    );
  }

  // Default case: channel doesn't exist or user is a viewer
  // This will show the normal video player for regular videos
  return (
    <VideoPlayer
      activeCategory={activeCategory}
      setSidebarOpen={setSidebarOpen}
      setActiveCategory={setActiveCategory}
      sidebarOpen={sidebarOpen}
      videoId={params.id}
    />
  );
};

export default Player;
