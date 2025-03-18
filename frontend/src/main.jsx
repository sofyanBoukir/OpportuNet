import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { legacy_createStore } from "redux";
import { Provider } from "react-redux";
import { AppReducer } from "./features/AppReducer.js";
import React from "react"

const store = legacy_createStore(AppReducer);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
