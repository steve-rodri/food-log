import React from "react";
import { Provider } from "react-redux";
import App from "./App";
import { registerRootComponent } from "expo";
import { redux } from "@fl/common";

const Root = () => (
  <Provider store={redux.store}>
    <App />
  </Provider>
);

registerRootComponent(Root);
