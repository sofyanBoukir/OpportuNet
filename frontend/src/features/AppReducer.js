const appState = {
  userData: {},
  // isMessaged: false,
  // isNotified: false,
  notifiedTimes: 0,
  messagedTimes: [],
  theme: localStorage.getItem("theme"),
  // resultSearch: { users: [], posts: [] },
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

    case "UPDATE_MESSAGED_TIMES":
      if(state.messagedTimes.some((message) => message?.conversation === action.payload.newMessage.conversation)){
        return {...state}
      }
      return { ...state, messagedTimes:[...state.messagedTimes,action.payload.newMessage]};
    
    case "MESSAGE_SEEN":
      return {...state, messagedTimes: state.messagedTimes.filter((message) => message.conversation !== action.payload)}

    case "UPDATE_THEME":
      return { ...state, theme: action.payload };

    default:
      return state;
  }
};
