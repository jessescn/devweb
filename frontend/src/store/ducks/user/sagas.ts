import {
  Credentials,
  handleLoginRequest,
  handleRegisterRequest,
  LoginPayload,
  RegisterData,
} from "../../../services/auth-service";
import { put, takeLatest, call } from "redux-saga/effects";
import { actions } from "./slice";
import { PayloadAction } from "@reduxjs/toolkit";

export const sagas = [
  takeLatest(actions.login.type, login),
  takeLatest(actions.register.type, register),
];

function* login(action: PayloadAction<Credentials>) {
  try {
    const { token, user }: LoginPayload = yield call(() =>
      handleLoginRequest(action.payload)
    );
    localStorage.setItem("user_token", token);
    yield put(actions.loginSuccess({ token, user }));
  } catch (error) {
    yield put(actions.loginFailed());
  }
}

function* register(action: PayloadAction<RegisterData>) {
  try {
    yield call(() => handleRegisterRequest(action.payload));
  } catch (error) {
    console.warn(error);
  }
}
