export const setUserName = username => {
  console.log('username', username)

  return {
    type: 'set_username',
    username
  }
};

export const logout = () => ({
  type: 'logout'
});

const auth = "[AUTH]";

export const AUTH_USER = `${auth} user success`;
export const AUTH_USER_FAILURE = `${auth} user failer`;
