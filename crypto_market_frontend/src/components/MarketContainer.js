import React, {useState} from 'react';
import {Button, Col, Container, Form, Input, Row} from 'reactstrap';
import CurrencyList from "./CurrencyList";
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
          <Col lg="12">
            <Row className={"justify-content-center my-3 py-1 border rounded"} style={{height: 150}}>
              <CurrencyList updateGlobalSelected={this.updateGlobalSelected}/>
            </Row>
            <Row className={"justify-content-center border rounded"}>
              <ChartsContainer selectedCurrencies={this.state.selected}/>
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
}
