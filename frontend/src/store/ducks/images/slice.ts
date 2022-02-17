import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../user/slice";

export type State = {
  loadingImageStatus: Status;
  images: RemoteImage[];
};

export type RemoteImage = {
  userId: number;
  image: string;
  $loki: number;
};

const initialState: State = {
  loadingImageStatus: "prismine",
  images: [],
};

const reducers = {
  loadAll: (state: State) => {
    state.loadingImageStatus = "loading";
  },
  loadAllSuccess: (state: State, action: PayloadAction<RemoteImage[]>) => {
    state.images = action.payload;
    state.loadingImageStatus = "success";
  },
  loadAllFailed: (state: State) => {
    state.loadingImageStatus = "failed";
  },
  save: (state: State, action: PayloadAction<string>) => {
    state.loadingImageStatus = "loading";
  },
  saveSuccess: (state: State, action: PayloadAction<RemoteImage>) => {
    state.loadingImageStatus = "success";
    state.images = [...state.images, action.payload];
  },
};

const images = createSlice({
  name: "images",
  initialState,
  reducers,
});

export const actions = images.actions;
export const reducer = images.reducer;
