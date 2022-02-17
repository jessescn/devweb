import { all } from "redux-saga/effects";
import * as userDuck from "./user";
import * as imagesDuck from "./images";

export type State = {
  user: userDuck.State;
  images: imagesDuck.State;
};

export const reducer = { user: userDuck.reducer, images: imagesDuck.reducer };
export const actions = Object.freeze({
  user: userDuck.actions,
  images: imagesDuck.actions,
});
export const selectors = Object.freeze({
  user: userDuck.selectors,
  images: imagesDuck.selectors,
});

export const sagas = function* () {
  yield all([...userDuck.sagas, ...imagesDuck.sagas]);
};
