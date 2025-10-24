import { apiClient } from "../config";

type channel = {
  channelName: string;
  channelLogo: File;
};
export const createChannel = async ({ channelName, channelLogo }: channel) => {
  const formData = new FormData();

  formData.append("channelName", channelName);
  formData.append("image", channelLogo);

  const response = await apiClient.post("/channel", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

export const getAllChannel = async () => {
  const response = await apiClient.get("/channel");
  return response.data;
};

export const deleteChannel = async (channelId: string) => {
  const response = await apiClient.delete(`/channel/${channelId}`);
  return response;
};

export const checkIfChannelExist = async (channelId: string) => {
  const response = await apiClient.get(`/channel/${channelId}`);
  return response;
};
