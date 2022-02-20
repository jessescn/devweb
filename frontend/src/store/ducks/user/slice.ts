import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Credentials } from "../../../services/auth-service";

export type Status = "prismine" | "loading" | "success" | "failed";

export interface User {
  name: string;
  email: string;
}

export interface LoginPayload {
  user: User;
  token: string;
}

export type RemoteImage = {
  userId: number;
  image: string;
  $loki: number;
};

export type State = {
  user: User | null;
  token: string;
  loginStatus: Status;
  images: RemoteImage[];
};

const persistedUser = localStorage.getItem("user_info");
const persistedToken = localStorage.getItem("user_token");

export const initialState: State = {
  user: persistedUser ? JSON.parse(persistedUser) : null,
  token: persistedToken ?? "",
  loginStatus: "prismine",
  images: [],
};

const reducers = {
  login: (state: State, actions: PayloadAction<Credentials>) => {
    state.loginStatus = "loading";
  },
  loginSuccess: (state: State, action: PayloadAction<LoginPayload>) => {
    state.user = action.payload.user;
    state.token = action.payload.token;
    state.loginStatus = "success";
    localStorage.setItem("user_info", JSON.stringify(action.payload.user));
  },
  loginFailed: (state: State) => {
    state.loginStatus = "failed";
  },
  register: (state: State) => {},
  logout: (state: State) => {
    state.loginStatus = "prismine";
    state.user = null;
    state.token = "";
    localStorage.removeItem("user_token");
    localStorage.removeItem("user_info");
  },
  loadImages: (state: State) => {},
  loadImagesSuccess: (state: State, action: PayloadAction<RemoteImage[]>) => {
    state.images = action.payload;
  },
};

const user = createSlice({
  name: "user",
  initialState,
  reducers,
});

export const actions = user.actions;
export const reducer = user.reducer;
