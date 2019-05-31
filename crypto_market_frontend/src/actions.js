export const setUserName = username => {
  return {
    type: 'SET_USERNAME',
    username
  }
};

export const logout = () => ({
  type: 'LOGOUT'
});

const auth = "[AUTH]";

export const AUTH_USER = `${auth} user success`;

export const AUTH_USER_FAILURE = `${auth} user failure`;
