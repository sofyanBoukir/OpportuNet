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
      
    case "Add_SKILLS":
      return { ...state, skills: action.payload };

    case "Add_INTERESTS":
      return { ...state, interests: action.payload };
    
    case "UPDATE_NOTIFIED_TIMES":
      return {...state,notifiedTimes:action.payload}

    case "UPDATE_THEME":
      return {...state, theme:action.payload}

    default:
      return state;
  }
};
