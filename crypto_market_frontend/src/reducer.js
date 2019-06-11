import * as actions from "./actions.js"

const initialstate = {
  authenticated: false,
  username: null,
  selected: [],
};

const reducer = (state = initialstate, action) => {

  if (action.type === actions.AUTH_USER) {
    return {
      ...state,
      authenticated: true,
      username: action.username,
      errorMsg: null
    }
  }

  if (action.type === actions.AUTH_USER_FAILURE) {
    return {
      ...state,
      errorMsg: action.errorMsg,
    }
  }

  if (action.type === actions.AUTH_LOGOUT) {
    return {
      ...initialstate,
    }
  }

  if (action.type === actions.SET_USERNAME) {
    return {
      ...state,
      username: action.username,
      authenticated: true
    }
  }

  if (action.type === actions.SET_SELECTED) {
    return {
      ...state,
      selected: action.selected
    }
  }

  return state;
};

export default reducer;
