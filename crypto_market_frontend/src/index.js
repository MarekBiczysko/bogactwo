import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import App from './App';

import {Provider} from 'react-redux';

import reduxThunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import reducer from './reducer.js';
import {composeWithDevTools} from 'redux-devtools-extension';

import { TryAuthUser } from './api';
import {setUserName} from "./actions";

const storeWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = storeWithMiddleware(reducer,composeWithDevTools() );
// const store = createStore(reducer, composeWithDevTools());
const token = localStorage.getItem('token');

const tryLogin = async () => {
  const {username} = await TryAuthUser();

  username && store.dispatch(setUserName(username));
};

if (token) {
  tryLogin()
}

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

