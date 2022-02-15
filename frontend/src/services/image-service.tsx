import axios from "axios";

const API_URL = "http://localhost:8080";

const api = axios.create({
  baseURL: API_URL,
});

export const handleSaveImage = async (image: string) => {
  const token = localStorage.getItem("user_token") || "";
  if (!token) return;
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
  const token = localStorage.getItem("user_token") || "";
  if (!token) return [];
  const response = await api.get("/images", {
    headers: {
      authorization: token,
    },
  });
  if (response.status !== 200) {
    return [];
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
