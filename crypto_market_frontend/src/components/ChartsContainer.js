import React, {useState} from 'react';
import {Button, Col, Container, Row} from 'reactstrap';
import ChartContainer from "./ChartContainer";

export default class ChartsContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  createChildren = () => {
    const currencies = this.props.selectedCurrencies;

    return Object.keys(currencies).map((key) => {
      return (
        <div key={currencies[key]} style={{border: '2px solid orange', flex: "1 1 40%"}}>
          <ChartContainer currency={currencies[key]}/>
        </div>
      )
    });
  };

  render() {
    return (
      <Container>
        <Row className={'mt-2 justify-content-center'}>
          {
            this.props.selectedCurrencies.length
              ? this.createChildren()
              : <div>Please select market</div>}
        </Row>
      </Container>
    )
  }
}
