const url = 'http://localhost:8000/';

const login_url = url + 'auth/token-auth/';
const try_login_url = url + 'auth/current_user/';
const logout_url = url + 'auth/logout_user/';
const register_url = url + 'auth/create_user/';

const settings_url = url + 'market/user_settings/';
const currency_list_task_url = url + 'market/start_curr_list/';
const currency_data_task_url = url + 'market/start_curr_data/';

export const fetchSettings = async () => {
  return fetch(settings_url, {
    headers: {"Authorization": 'JWT ' + localStorage.getItem('token')}
  })
    .then(res => res.json());
};

export const putSettings = async (selected) => {

  return fetch(settings_url, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      "Authorization": 'JWT ' + localStorage.getItem('token')
    },
    body: JSON.stringify({
      "settings": {
        "selected": selected,
      },
    }),
  })
    .then(res => res.json())
};

export const addCurrencyListFetchTask = async () => {
  return fetch(currency_list_task_url, {
    headers: {"Authorization": 'JWT ' + localStorage.getItem('token')}
  })
    .then(data => {
      return data
    });
};

export const addCurrencyDataFetchTask = async (currency) => {
  return fetch(`${currency_data_task_url}${currency}/`, {
    headers: {"Authorization": 'JWT ' + localStorage.getItem('token')}
  })
    .then(data => {
      return data
    });
};

export const TryAuthUser = async () => {
  return fetch(try_login_url, {
    headers: {
      Authorization: `JWT ${localStorage.getItem('token')}`
    },
  })
    .then(res => res.json())
};

export const AuthUser = async (username, password, action) => {

  const url = action === 'Login' ? login_url : register_url;

  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "username": username,
      "password": password,
    }),
  })
    .then(res => res.json())
};

export const LogoutUser = async (username) => {
  fetch(logout_url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(username),
  })
    .then(res => res.json());
};
