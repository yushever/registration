import React from "react";
import ReactDOM from "react-dom/client";
import { legacy_createStore as createStore } from "redux";
import "./index.css";
import App from "./App/App";
import { Provider } from "react-redux";
import reducer from "./reducer";

const root = ReactDOM.createRoot(document.getElementById("root"));

const store = createStore(reducer);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
