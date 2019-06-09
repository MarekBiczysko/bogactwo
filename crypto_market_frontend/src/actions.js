export const setUserName = username => {
  return {
    type: SET_USERNAME,
    username
  }
};

export const SET_USERNAME = 'SET_USERNAME';

export const setSelected = selected => {
  return {
    type: SET_SELECTED,
    selected
  }
};

export const SET_SELECTED = 'SET_SELECTED';

const auth = "[AUTH]";

export const AUTH_USER = `${auth} user success`;

export const AUTH_USER_FAILURE = `${auth} user failure`;

export const AUTH_LOGOUT = `${auth} user logout`;
