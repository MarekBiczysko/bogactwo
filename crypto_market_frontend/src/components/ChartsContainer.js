import React, {useState} from 'react';
import {Button, Col, Container, Form, Input, Row, Spinner} from 'reactstrap';
import Chart from "./Chart";

export default class ChartsContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  createChildren = () => {

    const currencies = this.props.selectedCurrencies;

    return Object.keys(currencies).map(function (key) {
      return (
        <Chart key={key} currency={currencies[key]}/>
      )
    });
  };

  render() {
    return (
      <Container>
        <Row className={'mt-2'}>
          {this.props.selectedCurrencies ?
            <div>
              Selected Currencues {this.props.selectedCurrencies}
            </div> :
            <div> NO CURRENCIES SELECTED</div>
          }
        </Row>
        <Row className={'mt-2'}>
          {this.props.selectedCurrencies && this.createChildren()}
        </Row>
      </Container>
    )
  }
}
