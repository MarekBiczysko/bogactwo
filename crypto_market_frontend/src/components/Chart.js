import React from 'react';
import {Spinner} from 'reactstrap';
import Websocket from "react-websocket";
import {addCurrencyDataFetchTask} from "../api";

export default class Chart extends React.Component {
  constructor(props) {
    super(props);

    this.handleCurrencyData = this.handleCurrencyData.bind(this);
    this.startTaskCurrencyData = this.startTaskCurrencyData.bind(this);

    this.state = {
      data: null,
    };
  }

  handleCurrencyData(data) {
    let parsedData = JSON.parse(data);
    console.log('NEW CURR DATA FROM WS', parsedData);
    this.setState({
      data: parsedData,
    });
  }

  async startTaskCurrencyData() {
    await addCurrencyDataFetchTask(this.props.currency);
  }

  componentDidMount() {
    console.log('Chart componentDidMount');
    console.log('Chart startTaskCurrencyData');
    console.log('Chart this.props.currency', this.props.currency);
    this.startTaskCurrencyData(this.props.currency)
  }

  render() {
    return (
      <React.Fragment>
        {
          this.state.data ?
            <div>
              <ul>
                  {Object.keys(this.state.data).map((attr, index) => <li key={index}>{attr} : {this.state.data[attr]}</li>)}
              </ul>
            </div>
            : <Spinner/>}

        <Websocket
          ref={'socket'}
          url={`ws://localhost:8000/ws/currency_data/${this.props.currency}`}
          onMessage={this.handleCurrencyData}
        />
      </React.Fragment>
    )
  }
}
