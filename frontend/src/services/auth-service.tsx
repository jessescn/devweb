import axios from "axios";

const API_URL = "http://localhost:8080";

const api = axios.create({
  baseURL: API_URL,
});

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  name: string;
  password: string;
}

export const handleLoginRequest = async (data: LoginData) => {
  const response = await api.post("/login", data);
  if (response.status !== 200) {
    return null;
  }

  const { token } = response.data;

  if (token) {
    localStorage.setItem("user_token", token);
  }

  return response;
};

export const handleRegisterRequest = async (data: RegisterData) => {
  const response = await api.post("/register", data);

  if (response.status !== 200 && response.status !== 204) {
    return null;
  }

  return response;
};
