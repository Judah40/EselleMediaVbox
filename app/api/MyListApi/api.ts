import { apiClient } from "../config";

export const handleAddToList = async (id: string) => {
  const response = await apiClient.post("/mylist", { id });
  return response.data;
};

export const handleGetAllList = async () => {
  const response = await apiClient.get("/mylist");
  return response.data;
};

export const handleRemoveFromList = async (id: string) => {
  const response = await apiClient.delete(`/mylist/${id}`);
  return response.data;
};
