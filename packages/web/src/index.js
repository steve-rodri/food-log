import React from "react";
import ReactDOM from "react-dom";
import Home from "./pages/Home";
import { Provider } from "react-redux";
import { redux } from "@fl/common";
import "./css/index.css";

const root = document.getElementById("root");

ReactDOM.render(
  <Provider store={redux.store}>
    <Home />
  </Provider>,
  root
);
