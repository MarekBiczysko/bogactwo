import React from 'react';
import './App.css'

import {Button, Container, Row, Col} from 'reactstrap';

import DataList from './components/ListData';
import AddDataItemForm from './components/AddDataItemForm';
import UpdateDataItemForm from './components/UpdateDataItemForm';
import {fetchData, fetchDataItem, addDataItem, updateDataItem, addTaskFetch, LogoutUser, AuthUser} from './api';

import Websocket from 'react-websocket';
import NavBar from "./components/Navbar";
import CurrencyList from "./components/CurrencyList";
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

    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleAddData = this.handleAddData.bind(this);
    this.getData = this.getData.bind(this);
    this.handleDataItemSave = this.handleDataItemSave.bind(this);
    this.handleDataItemUpdate = this.handleDataItemUpdate.bind(this);
    this.handleData = this.handleData.bind(this);
    this.handleUpdateWS = this.handleUpdateWS.bind(this);
    this.addTask = this.addTask.bind(this);
    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  async handleItemClick(id) {
    const currentDataItem = await fetchDataItem(id);
    this.setState((prevState) => {
      return {creating: false, current_data_id: id, current_data_item: currentDataItem};
    })
  }

  handleAddData(id) {
    this.setState((prevState) => {
      return {creating: true};
    });
  }

  async getData() {
    const data = await fetchData();
    this.setState(() => {
        return {currency_data: data, fetching: false};
      }
    );
  }

  async handleDataItemSave(dataItem) {
    const result = await addDataItem(dataItem);
    this.getData();
  }

  async handleDataItemUpdate(id, dataItem) {
    const result = await updateDataItem(id, dataItem);
    this.getData();
  }

  handleData(data) {
    console.log('handleData', data);
    let parsedData = JSON.parse(data);
    console.log('parsedData', parsedData);
    let currentDataItem = this.state.current_data_item;
    if (parsedData.id === currentDataItem.id) {
      this.setState({
        current_data_item: parsedData,
      });
      this.getData();
    }
  }



  handleUpdateWS(id, content) {
    console.log('handleUpdateWS', content);
    let currentDataItem = this.state.current_data_item;
    currentDataItem.currency = content.currency;
    currentDataItem.value = content.value;

    this.setState({
      current_data_item: currentDataItem,
    });

    const socket = this.refs.socket;
    socket.state.ws.send(JSON.stringify(currentDataItem));
  }

  async addTask() {
    console.log('add task');
    await addTaskFetch();
  }


  componentDidMount() {
    this.getData();
    if (this.state.logged_in) {
      fetch('http://localhost:8000/auth/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          this.setState({username: json.username});
        });
    }
  }

  componentDidUpdate() {
    this.addTask()
  }

  async handleAuth(username, password, action) {
    const data = await AuthUser(username, password, action);
    if (data && data.token) {
      console.log("SUCCESS: ", data);
      localStorage.setItem('token', data.token);
      this.setState({
        logged_in: true,
        username: data.username
      });
    } else {
      console.log('LOGIN WAS  NOT SUCCESSFUL: ', data)
    }
  };

  async handleLogout(username) {
    // await LogoutUser(username);
    localStorage.removeItem('token');
    this.setState({logged_in: false, username: ''});
  };

  render() {
    console.log('this.state.username', this.state.username);
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
