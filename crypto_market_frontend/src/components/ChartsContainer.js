import React, {useState} from 'react';
import {Container, Row} from 'reactstrap';
import ChartContainer from "./ChartContainer";

export default class ChartsContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  createChildren = () => {
    const currencies = this.props.selectedCurrencies;

    return Object.keys(currencies).map((key) => {
      return (
        <div
          key={currencies[key]}
          className={'my-2 mx-2 px-2 py-2 border rounded border-info flex-chart-item'}
        >
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
              ? <div className={'flex-chart-container'}>{this.createChildren()}</div>
              : <div className={'my-5'}>Please select market</div>}
        </Row>
      </Container>
    )
  }
}
