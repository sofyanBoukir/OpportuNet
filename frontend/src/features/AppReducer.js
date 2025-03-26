const appState = {
  userData: {},
  // isMessaged: false,
  // isNotified: false,
  notifiedTimes: 0,
  theme: localStorage.getItem("theme"),
  resultSearch: { users: [], posts: [] },
};

export const AppReducer = (state = appState, action) => {
  switch (action.type) {
    case "UPDATE_USERDATA":
      return { ...state, userData: action.payload };

    case "UPDATE_SEARCH":
      return { ...state, querySearch: action.payload };

    case "UPDATE_RESULTSEARCH":
      return { ...state, resultSearch: action.payload };

    case "UPDATE_NOTIFIED_TIMES":
      return { ...state, notifiedTimes: action.payload };

    case "UPDATE_THEME":
      return { ...state, theme: action.payload };

    default:
      return state;
  }
};
