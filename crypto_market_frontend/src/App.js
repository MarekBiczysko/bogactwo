import React from 'react';
import './App.css'

import {
  addCurrencyListFetchTask,
  LogoutUser,
  AuthUser,
  TryAuthUser
} from './api';

import NavBar from "./components/Navbar";
import MarketContainer from "./components/MarketContainer";

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currency_data: [],
      currency_list: {},
      current_data_id: 0,
      current_data_item: {},
      creating: true,
      fetching: true,
      logged_in: !!localStorage.getItem('token'),
      username: ''
    };

    this.startTaskCurrencyList = this.startTaskCurrencyList.bind(this);
    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.tryLogin = this.tryLogin.bind(this);
  }

  async startTaskCurrencyList() {
    await addCurrencyListFetchTask();
  }

  async tryLogin() {
    const userData = await TryAuthUser(this.props.currency);
    userData && this.setState({username: userData.username});
  }

  componentDidMount() {
    this.state.logged_in && this.tryLogin();
  }

  componentDidUpdate() {
    this.startTaskCurrencyList()
  }

  async handleAuth(username, password, action) {
    const data = await AuthUser(username, password, action);
    if (data && data.token) {
      localStorage.setItem('token', data.token);
      this.setState({
        logged_in: true,
        username: data.username
      });
    } else {
      console.log('LOGIN WAS NOT SUCCESSFUL: ', data)
    }
  };

  async handleLogout(username) {
    // await LogoutUser(username);
    localStorage.removeItem('token');
    this.setState({logged_in: false, username: ''});
  };

  render() {
    console.log('this.state', this.state);
    return (
      <React.Fragment>
        <NavBar
          handleAuth={this.handleAuth}
          handleLogout={this.handleLogout}
          username={this.state.username}
        />
        {
          this.state.username ?
            <MarketContainer /> :
            <p>Please Login</p>
        }
      </React.Fragment>
    );
  }
}

export default App;
