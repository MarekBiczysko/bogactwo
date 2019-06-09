import React from 'react';
import {Container, Row, Spinner} from 'reactstrap';
import CurrencyListCarousel from "./CurrencyListCarousel";
import {addCurrencyListFetchTask} from "../api";

export default class CurrencyList extends React.PureComponent {
  state = {
    currencyList: [],
  };

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
    const { currencyList } = this.state;

    return (
      <Container>
        <Row className={'justify-content-center mt-2'}>
          {Object.keys(currencyList).length
            ? (
              <CurrencyListCarousel
                currencyList={currencyList}
              />)
            : <Spinner/>
          }
        </Row>
      </Container>
    )
  }
}
