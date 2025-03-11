const appState = {
  userData: {},
  isMessaged: false,
  isNotified: false,
};

export const appReducer = (state = appState, action) => {
  switch (action.type) {
    case "UPDATE_USERDATA":
      return { ...state, userData: action.payload };
    default:
      return state;
  }
};
