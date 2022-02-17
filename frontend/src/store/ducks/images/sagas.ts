import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  handleSaveImage,
  listAllImages,
} from "../../../services/image-service";
import { actions, RemoteImage } from "./slice";

export const sagas = [
  takeLatest(actions.loadAll.type, loadImages),
  takeLatest(actions.save.type, saveImage),
];

function* loadImages() {
  try {
    const images: RemoteImage[] = yield call(() => listAllImages());
    yield put(actions.loadAllSuccess(images));
  } catch (error) {
    yield put(actions.loadAllFailed());
  }
}

function* saveImage(action: PayloadAction<string>) {
  try {
    const newImage: RemoteImage = yield call(() =>
      handleSaveImage(action.payload)
    );
    yield put(actions.saveSuccess(newImage));
  } catch (error) {
    yield put(actions.loadAllFailed());
  }
}
