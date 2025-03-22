const appState = {
  userData: { name: "said", role: "candidate" },
  // isMessaged: false,
  // isNotified: false,
  notifiedTimes : 0,
  theme:localStorage.getItem('theme'),
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
    
    
    case "UPDATE_NOTIFIED_TIMES":
      return {...state,notifiedTimes:action.payload}
    default:
      return state;
  }
};
