import React from 'react';
import {Container, Row, Spinner} from 'reactstrap';
import Websocket from "react-websocket";
import CurrencyListCarousel from "./CurrencyListCarousel";

export default class CurrencyList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleCurrencyListData = this.handleCurrencyListData.bind(this);

    this.state = {
      currencyList: null,
    };
  }

  handleCurrencyListData(data) {
    let parsedData = JSON.parse(data);
    this.setState({
      currencyList: parsedData.currency_list,
    });
  }

  render() {
    return (
      <Container>
        <Row className={'justify-content-center mt-2'}>
          {this.state.currencyList ?
            <CurrencyListCarousel
              updateGlobalSelected={this.props.updateGlobalSelected}
              currencyList={this.state.currencyList}
            /> :
            <Spinner/>
          }
        </Row>
        <Websocket
          ref={'socket'}
          url={'ws://localhost:8000/ws/currency_list'}
          onMessage={this.handleCurrencyListData}
        />
      </Container>
    )
  }
}
