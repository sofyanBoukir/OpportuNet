const appState = {
  userData: { name: "said", role: "condidate" },
  isMessaged: true,
  isNotified: false,
};

export const AppReducer = (state = appState, action) => {
  switch (action.type) {
    case "UPDATE_USERDATA":
      return { ...state, userData: action.payload };
    default:
      return state;
  }
};
