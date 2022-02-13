import axios from "axios";

const API_URL = "http://localhost:8080";

const token = localStorage.getItem("user_token") || "";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    authorization: token,
  },
});

export const handleSaveImage = async (image: string) => {
  if (!token) return;
  const response = await api.post("/images", { data: image });
  if (response.status !== 200) {
    return null;
  }

  return response.data;
};

export type RemoteImage = {
  userId: number;
  image: string;
  $loki: number;
};

export const listAllImages = async (): Promise<RemoteImage[]> => {
  if (!token) return [];
  const response = await api.get("/images");
  if (response.status !== 200) {
    return [];
  }

  return response.data;
};
