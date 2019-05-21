import React from 'react';

import {Button, Container, Row, Col} from 'reactstrap';

import DataList from './components/ListData';
import AddDataItemForm from './components/AddDataItemForm';
import UpdateDataItemForm from './components/UpdateDataItemForm';
import {fetchData, fetchDataItem, addDataItem, updateDataItem, addTaskFetch} from './api';

import Websocket from 'react-websocket';

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
    };

    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleAddData = this.handleAddData.bind(this);
    this.getData = this.getData.bind(this);
    this.handleDataItemSave = this.handleDataItemSave.bind(this);
    this.handleDataItemUpdate = this.handleDataItemUpdate.bind(this);
    this.handleData = this.handleData.bind(this);
    this.handleUpdateWS = this.handleUpdateWS.bind(this);
    this.addTask = this.addTask.bind(this);
    this.handleCurrencyListData = this.handleCurrencyListData.bind(this);
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

  handleCurrencyListData(data) {
    console.log('New currency list');
    let parsedData = JSON.parse(data);
    let currentCurrencyList = this.state.currency_list;
    if (currentCurrencyList !== parsedData.currency_list) {
      console.log('Updating currency list');
      this.setState({
        currency_list: parsedData.currency_list,
      });
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
  }

  render() {
    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col xs={2}>
              <h2>Currency List</h2>

            </Col>
            <Col xs={10}>
              {Object.keys(this.state.currency_list).map(key => <span key={key}>{key} </span>)}
            </Col>
            <Websocket
                ref={'socket'}
                url={'ws://localhost:8000/ws/currency_list'}
                onMessage={this.handleCurrencyListData}
              />

          </Row>
          <Row>
            <Col xs={10}>
              <h2>Currency Data</h2>

            </Col>
            <Col xs={2}>
              <Button color={'primary'} onClick={this.handleAddData}>Create new</Button>

            </Col>

          </Row>
          <Row>
            <Col xs={4}>
              {
                this.state.fetching ?
                  <p>Fetching data...</p> :
                  <DataList data={this.state.currency_data} handleItemClick={this.handleItemClick}/>
              }

            </Col>
            <Col xs={8}>
              {
                this.state.creating ?
                  <AddDataItemForm handleSave={this.handleDataItemSave}/> :
                  <UpdateDataItemForm item={this.state.current_data_item} handleSave={this.handleUpdateWS}/>
              }
              <Websocket
                ref={'socket'}
                url={'ws://localhost:8000/ws/currency_data'}
                onMessage={this.handleData}
              />

            </Col>

          </Row>

          <Row>
            <a href={'#'} onClick={this.addTask}>ADD TASK</a>
          </Row>

        </Container>


      </React.Fragment>
    );
  }


}

export default App;
