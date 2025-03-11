import { configureStore } from "@reduxjs/toolkit";
import { Children } from "react";
import { Provider } from "react-redux";
import userSlice from "../features/userSlice";

export const AppStore = () => {
  const store = configureStore({ reducer: userSlice });

  return <Provider store={store}>{Children}</Provider>;
};

export const userSelector = (state) => console.log(state);
