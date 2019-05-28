import React from 'react';
import {Container, Row, Spinner} from 'reactstrap';
import CurrencyListCarousel from "./CurrencyListCarousel";
import {addCurrencyListFetchTask} from "../api";

export default class CurrencyList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currencyList: [],
    };
  }

  async startTaskCurrencyList() {
    await addCurrencyListFetchTask();
  }

  componentDidMount() {
    this.startTaskCurrencyList();

    this.ws = new WebSocket('ws://localhost:8000/ws/currency_list');

    this.ws.onmessage = e => {
      const parsedData = JSON.parse(e.data);
      this.setState({
        currencyList: parsedData.currency_list,
      });
    };
  }

  componentWillUnmount() {
    this.ws.close();
  }

  render() {
    return (
      <Container>
        <Row className={'justify-content-center mt-2'}>
          {Object.keys(this.state.currencyList).length ?
            <CurrencyListCarousel
              updateGlobalSelected={this.props.updateGlobalSelected}
              currencyList={this.state.currencyList}
            /> :
            <Spinner/>
          }
        </Row>
      </Container>
    )
  }
}
