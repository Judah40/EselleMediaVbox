import { apiClient } from "../config";
import { FormValues } from "./api.types";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//INPUT LIVESTREAM DATA
export const handleInputLiveStreamData = async (values: FormValues) => {
  const formData = new FormData();
  formData.append("title", values.title);
  formData.append("description", values.description);
  formData.append("streamName", values.streamName);
  if (values.banner) {
    formData.append("images", values.banner as Blob);
  }
  const response = await apiClient.post("/live", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};
////////////////////////////////////////////////////////////////////////////////////////////////
//GET ALL LIVESTREAMS
export const handleGetAllLiveStreams = async () => {
  const response = await apiClient.get("/live");
  return response;
};

////////////////////////////////////////////////////////////////////////////////////////////////
//GET SINGLE LIVESTREAM
export const handleGetSingleLiveStream = async (id: string) => {
  const response = await apiClient.get(`/live/${id}`);
  return response;
};
