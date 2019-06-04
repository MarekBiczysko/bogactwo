export const setUserName = username => {
  return {
    type: SET_USERNAME,
    username
  }
};

export const SET_USERNAME = 'SET_USERNAME';

const auth = "[AUTH]";

export const AUTH_USER = `${auth} user success`;

export const AUTH_USER_FAILURE = `${auth} user failure`;

export const AUTH_LOGOUT = `${auth} user logout`;
