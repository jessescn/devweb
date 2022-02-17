import axios from "axios";
import { User } from "../store/ducks/user";

const API_URL = "http://localhost:8080";

const api = axios.create({
  baseURL: API_URL,
});

export type Credentials = {
  email: string;
  password: string;
};

export type LoginPayload = {
  token: string;
  user: User;
};

export type RegisterData = {
  email: string;
  name: string;
  password: string;
};

export const handleLoginRequest = async (
  data: Credentials
): Promise<LoginPayload> => {
  const response = await api.post("/users/login", data);

  if (response.status !== 200) {
    throw new Error("Login request error");
  }

  return response.data;
};

export const handleRegisterRequest = async (
  data: RegisterData
): Promise<User> => {
  const response = await api.post("/users/register", data);

  if (response.status !== 200 && response.status !== 204) {
    throw new Error("Register request error");
  }

  return response.data;
};
