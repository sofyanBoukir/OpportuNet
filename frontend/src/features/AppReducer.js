const appState = {
  userData: { name: "said", role: "condidate" },
  isMessaged: true,
  isNotified: true,
  istheme: "light",
  skills: [],
  interests: [],
};

export const AppReducer = (state = appState, action) => {
  switch (action.type) {
    case "UPDATE_USERDATA":
      return { ...state, userData: action.payload };
    case "UPDATE_THEME":
      if (state.istheme === "light") {
        return { ...state, istheme: action.payload };
      } else {
        return { ...state, istheme: "light" };
      }
    case "Add_SKILLS":
      return { ...state, skills: action.payload };
    case "Add_INTERESTS":
      return { ...state, interests: action.payload };
    default:
      return state;
  }
};
