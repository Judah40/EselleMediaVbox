/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import { Search, Eye, Users, Calendar, Plus, X } from "lucide-react";
import { createChannel, getAllChannel } from "@/app/api/ChannelApi/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// Skeleton Component
function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse bg-zinc-700 rounded ${className}`} />;
}

function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-12 h-12 border-4 border-t-transparent border-[#1ABC9C] rounded-full animate-spin"></div>
    </div>
  );
}
// Channel Card Skeleton
function ChannelCardSkeleton() {
  return (
    <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
      <div className="flex items-start gap-4">
        <Skeleton className="w-20 h-20 rounded-lg flex-shrink-0" />
        <div className="flex-1 space-y-3">
          <Skeleton className="h-6 w-48" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
        <Skeleton className="h-10 w-24 rounded-lg" />
      </div>
    </div>
  );
}

// Types
interface Channel {
  channelId: string;
  channelName: string;
  channelLogo: string;
  lastBroadcast: string;
  lastTotalViewers: number;
}

interface ChannelCardProps {
  channel: Channel;
}

// Channel Card Component
function ChannelCard({ channel }: ChannelCardProps) {
  const router = useRouter();
  return (
    <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700 hover:border-[#1ABC9C] transition-all duration-300 hover:shadow-lg hover:shadow-[#1ABC9C]/10">
      <div className="flex items-start gap-4">
        {/* Channel Logo */}
        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-zinc-700">
          <img
            src={channel.channelLogo ? channel.channelLogo : "/logo/vbox.png"}
            alt={channel.channelName && channel.channelName}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Channel Info */}
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white mb-3">
            {channel.channelName && channel.channelName}
          </h3>

          <div className="space-y-2">
            <div className="flex items-center text-gray-400 text-sm">
              <Calendar className="w-4 h-4 mr-2 text-[#1ABC9C]" />
              <span>
                Last Broadcast:{" "}
                {channel.lastBroadcast
                  ? channel.lastBroadcast
                  : "Channel Hasn't been used"}
              </span>
            </div>

            <div className="flex items-center text-gray-400 text-sm">
              <Users className="w-4 h-4 mr-2 text-[#1ABC9C]" />
              <span>
                Total Viewers:{" "}
                {channel.lastTotalViewers
                  ? channel.lastTotalViewers.toLocaleString()
                  : 0}
              </span>
            </div>
          </div>
        </div>

        {/* View Button */}
        <button
          onClick={() =>
            router.push(
              `/pages/Dashboard/LiveStream/Livedata/${channel.channelId}`
            )
          }
          className="bg-[#1ABC9C] hover:bg-[#16a085] text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-lg shadow-[#1ABC9C]/20 hover:shadow-[#1ABC9C]/40"
        >
          <Eye className="w-4 h-4" />
          View
        </button>
      </div>
    </div>
  );
}

interface AddChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (channelName: string, channelLogo: string) => void;
}

// Add Channel Modal Component
function AddChannelModal({
  isOpen,
  onClose,
  onSubmit,
}: AddChannelModalProps & { onSuccess?: () => void }) {
  const [channelName, setChannelName] = useState("");
  const [channelLogo, setChannelLogo] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [imageFile, setImageFile] = useState<File>();
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!channelName || !imageFile) {
      toast.error("Channel Name and Logo are required");
      return;
    }

    try {
      setIsLoading(true);
      await createChannel({
        channelName,
        channelLogo: imageFile!,
      });

      toast.success("Successfully added channel 🎉");
      setChannelName("");
      setImageFile(undefined);
      setPreviewUrl("");
      setChannelLogo("");
      onClose();
      window.dispatchEvent(new Event("refresh-channels"));
    } catch (error) {
      console.error(error);
      toast.error("Failed to add channel. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setChannelLogo(result);
        setPreviewUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-zinc-800 rounded-xl p-6 w-full max-w-md border border-zinc-700 shadow-2xl">
        {isLoading && <LoadingOverlay />}

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Add Channel</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-zinc-700 rounded-lg"
            disabled={isLoading}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <div>
          <div className="mb-6">
            <label
              htmlFor="channelName"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Channel Name
            </label>
            <input
              type="text"
              id="channelName"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter channel name..."
              disabled={isLoading}
              className="w-full bg-zinc-900 text-white px-4 py-3 rounded-lg border border-zinc-700 focus:border-[#1ABC9C] focus:outline-none focus:ring-2 focus:ring-[#1ABC9C]/20 transition-all disabled:opacity-60"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="channelLogo"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Channel Logo
            </label>
            <div className="flex items-center gap-4">
              {/* Preview */}
              <div className="w-20 h-20 rounded-lg overflow-hidden bg-zinc-900 border border-zinc-700 flex items-center justify-center flex-shrink-0">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Plus className="w-8 h-8 text-gray-600" />
                )}
              </div>

              {/* Upload Button */}
              <div className="flex-1">
                <input
                  type="file"
                  id="channelLogo"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={isLoading}
                />
                <label
                  htmlFor="channelLogo"
                  className={`block w-full text-gray-300 px-4 py-3 rounded-lg border border-zinc-700 hover:border-[#1ABC9C] cursor-pointer transition-all text-center ${
                    isLoading ? "opacity-60 cursor-not-allowed" : "bg-zinc-900"
                  }`}
                >
                  {previewUrl ? "Change Image" : "Upload Image"}
                </label>
                <p className="text-xs text-gray-500 mt-2">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex-1 bg-[#1ABC9C] hover:bg-[#16a085] text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg shadow-[#1ABC9C]/20 hover:shadow-[#1ABC9C]/40 disabled:opacity-60"
            >
              {isLoading ? "Adding..." : "Add Channel"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Channels Page Component
export default function ChannelsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getChannelsData = async () => {
    const response = await getAllChannel()
      .catch((error) => {})
      .finally(() => {
        setIsLoading(false);
      });
    // console.log(response.data);
    setChannels(response.data);
  };
  // Simulate data fetching
  useEffect(() => {
    getChannelsData();

    // ✅ Refetch when new channel is created
    const refreshListener = () => getChannelsData();
    window.addEventListener("refresh-channels", refreshListener);
    return () => {
      window.removeEventListener("refresh-channels", refreshListener);
    };
  }, []);

  // Filter channels based on search query
  const filteredChannels =
    channels.filter((channel) =>
      channel.channelName.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  const handleAddChannel = (channelName: string, channelLogo: string) => {
    const newChannel: Channel = {
      channelId: `CH${String(channels.length + 1).padStart(3, "0")}`,
      channelName: channelName,
      channelLogo: channelLogo,
      lastBroadcast: "Just now",
      lastTotalViewers: 0,
    };
    setChannels([...channels, newChannel]);
  };

  return (
    <div className="min-h-screen bg-zinc-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Channels</h1>
            <p className="text-gray-400">
              Browse and manage all your streaming channels
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#1ABC9C] hover:bg-[#16a085] text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-lg shadow-[#1ABC9C]/20 hover:shadow-[#1ABC9C]/40"
          >
            <Plus className="w-5 h-5" />
            Add Channel
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search channels..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-800 text-white pl-12 pr-4 py-4 rounded-lg border border-zinc-700 focus:border-[#1ABC9C] focus:outline-none focus:ring-2 focus:ring-[#1ABC9C]/20 transition-all"
            />
          </div>
        </div>

        {/* Channels List */}
        <div className="space-y-4">
          {isLoading ? (
            // Skeleton Loading State
            <>
              <ChannelCardSkeleton />
              <ChannelCardSkeleton />
              <ChannelCardSkeleton />
              <ChannelCardSkeleton />
            </>
          ) : filteredChannels.length > 0 ? (
            // Channels List
            filteredChannels.map((channel) => (
              <ChannelCard key={channel.channelId} channel={channel} />
            ))
          ) : (
            // No Results
            <div className="text-center py-16">
              <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">
                No channels found
              </h3>
              <p className="text-gray-500">Try adjusting your search query</p>
            </div>
          )}
        </div>

        {/* Results Count */}
        {!isLoading && filteredChannels.length > 0 && (
          <div className="mt-8 text-center text-gray-400">
            Showing {filteredChannels.length} of {channels.length} channels
          </div>
        )}
      </div>

      {/* Add Channel Modal */}
      <AddChannelModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddChannel}
      />
    </div>
  );
}
