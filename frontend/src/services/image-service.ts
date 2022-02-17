import axios from "axios";
import { RemoteImage } from "../store/ducks/user";

const API_URL = "http://localhost:8080";

const api = axios.create({
  baseURL: API_URL,
});

export const handleSaveImage = async (image: string): Promise<RemoteImage> => {
  const token = localStorage.getItem("user_token") || "";

  if (!token) {
    throw new Error("token not found");
  }

  const response = await api.post(
    "/images",
    { data: image },
    {
      headers: {
        authorization: token,
      },
    }
  );

  if (response.status !== 200) {
    throw new Error("Error saving image");
  }

  return response.data;
};

export const listAllImages = async (): Promise<RemoteImage[]> => {
  const token = localStorage.getItem("user_token") || "";
  if (!token) {
    throw new Error("missing token");
  }
  const response = await api.get("/images", {
    headers: {
      authorization: token,
    },
  });

  if (response.status !== 200) {
    throw new Error("list all images error");
  }

  return response.data;
};

export const deleteImage = async (id: number): Promise<void> => {
  const token = localStorage.getItem("user_token") || "";
  if (!token) return;

  const response = await api.delete(`images/${id}`, {
    headers: {
      authorization: token,
    },
  });

  if (response.status !== 200) {
    return;
  }

  return response.data;
};
