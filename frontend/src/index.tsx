import * as React from "react";
import * as ReactDOM from "react-dom";
import "./index.css";
import { store } from "./store";
import { Provider as ReduxProvider } from "react-redux";
import App from "./App";

import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
