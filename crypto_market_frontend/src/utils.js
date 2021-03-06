import {AuthUser, LogoutUser, putSettings} from "./api";
import * as actions from "./actions.js"

const handleAuth =  (username, password, action) =>  async dispatch => {
  const data = await AuthUser(username, password, action);

    if (data && data.token) {
      localStorage.setItem('token', data.token);
      return dispatch({ type: actions.AUTH_USER, username })
    }

  return dispatch({ type: actions.AUTH_USER_FAILURE, errorMsg: 'User authentication failure' })
};

export { handleAuth }

const handleLogout = username => async dispatch => {
  await LogoutUser(username);
  localStorage.removeItem('token');
  dispatch({type: actions.AUTH_LOGOUT})
};

export { handleLogout }


const setSelectedSettings = selected => async dispatch => {
  await putSettings(selected);
  dispatch(actions.setSelected(selected))
};

export { setSelectedSettings }