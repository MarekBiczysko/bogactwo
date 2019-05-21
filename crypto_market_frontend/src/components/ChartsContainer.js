import React, {useState} from 'react';
import {Button, Col, Container, Form, Input, Row, Spinner} from 'reactstrap';
import CurrencyListCarousel from "./CurrencyListCarousel";

export default class ChartsContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
       <h1>TU BEDA CHARTSY</h1>
        <Row className={'mt-2'}>
          {this.props.selectedCurrencies ?
            <div>
              Selected Currencues {this.props.selectedCurrencies}
            </div>:
            <div> NO CURRENCIES SELECTED</div>
          }
        </Row>
      </Container>
    )
  }
}
