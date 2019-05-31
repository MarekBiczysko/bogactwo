import * as actions from "./actions.js"

const initialstate = {
  authenticated: false,
  username: null,
  selected: null,
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
      errorMsg: 'AUTH FAUILRE',

    }
  }

  if (action.type === 'logout') {
    return {
      ...state,
      authenticated: false,
      username: null
    }
  }


  if (action.type === 'set_username') {
    return {
      ...state,
      username: action.username,
      authenticated: true
    }
  }

  return state;
};

export default reducer;