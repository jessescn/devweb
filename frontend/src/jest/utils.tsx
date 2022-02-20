/* eslint-disable @typescript-eslint/no-explicit-any */
import "@testing-library/jest-dom/extend-expect";

import React from "react";
import { Provider } from "react-redux";
import { render, RenderOptions } from "@testing-library/react";

import { State } from "../store/ducks";
import { StoreMockBuilder } from "../store/__mock__";
import { StateMockBuilder } from "../store/__mock__/state-mock-builder";

interface CustomRenderOptions extends RenderOptions {
  initialState: State;
}

const wrapperProvider = (initialState: State) => {
  const store = new StoreMockBuilder().withState(initialState).build();

  const wrapper = ({ children }: any) => {
    return <Provider store={store}>{children}</Provider>;
  };

  return wrapper;
};

const customRender = (
  component: React.ReactElement,
  options: CustomRenderOptions = {
    initialState: new StateMockBuilder().build(),
  }
) => {
  const wrapper = wrapperProvider(options.initialState);

  return render(component, { wrapper, ...options });
};

export * from "@testing-library/react";
export { customRender as render };
