import { Children } from "react";
import { Provider } from "react-redux";
import { legacy_createStore } from "redux";
import { appReducer } from "../features/appReducer";

export const AppStore = () => {
  const store = legacy_createStore(appReducer);

  return <Provider store={store}>{Children}</Provider>;
};

// export const userSelector = (state) => console.log(state);
