import React, {useState} from 'react';
import {Button, Col, Container, ListGroupItem, Row} from 'reactstrap';
import ChartContainer from "./ChartContainer";

export default class ChartsContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  createChildren = () => {

    const currencies = this.props.selectedCurrencies;

    return Object.keys(currencies).map(function (key) {
      return (
        <ChartContainer key={key} currency={currencies[key]}/>
      )
    });
  };

  render() {
    return (
      <Container>
        <Row className={'mt-2 justify-content-center'}>
          {
            this.props.selectedCurrencies.length ?
              this.createChildren()
              :
              <div>Please select market</div>}
        </Row>
      </Container>
    )
  }
}
