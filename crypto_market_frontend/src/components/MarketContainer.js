import React, {useState} from 'react';
import {Button, Col, Container, Form, Input, Row} from 'reactstrap';
import CurrencyList from "./CurrencyList";
import ChatContainer from "./ChatContainer";
import ChartsContainer from "./ChartsContainer";

export default class MarketContainer extends React.Component {
  constructor(props) {
    super(props);

    this.updateGlobalSelected = this.updateGlobalSelected.bind(this);

    this.state = {
      selected: [],
    };
  }

  updateGlobalSelected(selected) {
    this.setState({
      selected: selected
    })
  }

  render() {
    return (
      <Container>
        <Row>
          <Col lg="8" className={"border"}>
            <Row className={"justify-content-center border mt-2"} style={{height: 150}}>
              <CurrencyList updateGlobalSelected={this.updateGlobalSelected}/>
            </Row>
            <Row className={"justify-content-center h-80 border"}>
              <ChartsContainer selectedCurrencies={this.state.selected}/>
            </Row>
          </Col>
          <Col lg="4" className={"border"}>
            <ChatContainer/>
          </Col>
        </Row>
      </Container>
    )
  }
}
