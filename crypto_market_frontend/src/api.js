const url ='http://localhost:8000/market/currency_data/';

const login_url = 'http://localhost:8000/auth/token-auth/';
const try_login_url = 'http://localhost:8000/auth/current_user/';
const logout_url ='http://localhost:8000/auth/logout/';
const register_url ='http://localhost:8000/auth/create_user/';

export const fetchData = async () => {
  return fetch(url, {})
    .then(res => res.json())
    .then(data => {
      return data
    });
};

export const addCurrencyListFetchTask = async () => {
  return fetch('http://localhost:8000/market/start_curr_list/', {
    headers: {"Authorization": 'JWT ' + localStorage.getItem('token')}
  })
    .then(data => {
      console.log('Added curr list fetch task:,', data);
      return data
    });
};

export const addCurrencyDataFetchTask = async (currency) => {
  return fetch(`http://localhost:8000/market/start_curr_data/${currency}/`, {
    headers: {"Authorization": 'JWT ' + localStorage.getItem('token')}
  })
    .then(data => {
      console.log(`Added curr data fetch task for ${currency}:`, data);
      return data
    });
};

export const fetchDataItem = async (id) => {
  return fetch(`${url}${id}/`, {})
    .then(res => res.json())
    .then(data => {
      return data
    });
};

export const updateDataItem = async (id, item) => {
  fetch(`${url}${id}/`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
    });

  return item;
};

export const addDataItem = async (item) => {
  fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
    });

  return item;
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

export const LogoutUser = async (user) => {
  fetch(logout_url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
    });
};
