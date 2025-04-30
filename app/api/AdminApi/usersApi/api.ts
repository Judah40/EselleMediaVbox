import { apiClient } from "../../config";

////////////////////////////////////////////////////////////////////////////////////////////////
//GET ALL USERS
export const handleGetAllUsers = async (id: number) => {
  const response = await apiClient.get(`admin/user/${id}`);
  return response;
};
////////////////////////////////////////////////////////////////////////////////////////////////
//ACTIVATE USER
export const handleActivateUser = async (id: number) => {
  const response = await apiClient.put(`admin/user/activate/${id}`);
  return response;
};
////////////////////////////////////////////////////////////////////////////////////////////////
//DEACTIVATE USER
export const handleDeActivateUser = async (id: number) => {
  const response = await apiClient.put(`admin/user/deactivate/${id}`);
  return response;
};
////////////////////////////////////////////////////////////////////////////////////////////////
//GET SINGLE USER
export const handleGetSingleUser = async (id: string) => {
  const response = await apiClient.get(`admin/user/${id}`);
  return response;
};

////////////////////////////////////////////////////////////////////////////////////////////////
//START CHANNEL
export const handleStartChannel = async (channelName: string) => {
  const data = {
    channelName,
  };
  const response = await apiClient.post(`live/start-channel`, data);
  return response;
};
////////////////////////////////////////////////////////////////////////////////////////////////
//STOP CHANNEL
export const handleStopChannel = async (channelName: string) => {
  const data = {
    channelName,
  };
  const response = await apiClient.post(`live/stop-channel`, data);
  return response;
};
////////////////////////////////////////////////////////////////////////////////////////////////
//CREATE CHANNEL
export const handleCreateChannel = async ({
  inputName,
  ChannelName,
}: {
  inputName: string;
  ChannelName: string;
}) => {
  const data = {
    inputName,
    ChannelName,
  };
  const response = await apiClient.post(`live/create-channel`, data);
  return response;
};
////////////////////////////////////////////////////////////////////////////////////////////////
//CREATE INPUT

export const handleCreateInput = async (name: string) => {
  const data = {
    name,
  };
  const response = await apiClient.post(`live/create-input`, data);
  return response;
};
////////////////////////////////////////////////////////////////////////////////////////////////
//GET STREAM KEY
export const handleGetStreamKey = async (channelName: string) => {
  const response = await apiClient.get(`live/get-stream-key/${channelName}`);
  return response;
};

////////////////////////////////////////////////////////////////////////////////////////////////
//GET SINGLE CHANNEL STATUS

type ChannelStatus = {
  channelName: string;
  date: Date;
};
export const handleLiveMatch = async (data: ChannelStatus) => {
  const response = await apiClient.get(
    `match/${data.channelName}/${data.date.toDateString()}`
  );
  return response;
};

////////////////////////////////////////////////////////////////////////////////////////////////
//GET SINGLE CHANNEL
export const handleGetAllChannels = async () => {
  const response = await apiClient.get(`live/channel`);
  return response;
};

////////////////////////////////////////////////////////////////////////////////////////////////
//GET SINGLE LIVE STREAM URL
export const handleGetLiveStreamUrl = async (channelName: string) => {
  const response = await apiClient.get(`live/get-live/${channelName}`);
  return response;
};

////////////////////////////////////////////////////////////////////////////////////////////////
//GET SINGLE URL
export const handleGetSingleChannel = async (channelName: string) => {
  const response = await apiClient.get(`live/channel/${channelName}`);
  return response;
};
