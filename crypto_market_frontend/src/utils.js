import { AuthUser } from "./api";
import * as actions from "./actions.js"

const handleAuth =  (username, password, action) =>  async dispatch => {
  const data = await AuthUser(username, password, action);

    if (data && data.token) {
      localStorage.setItem('token', data.token);

      return dispatch({ type: actions.AUTH_USER, username })
    }

  return dispatch({ type: actions.AUTH_USER_FAILURE, errorMsg: 'auth failed!!' })
};

export { handleAuth }

 const handleLogout = username => dispatch => {
    // await LogoutUser(username);
    localStorage.removeItem('token');

    dispatch({ type: 'logout' })
  };

export { handleLogout }

