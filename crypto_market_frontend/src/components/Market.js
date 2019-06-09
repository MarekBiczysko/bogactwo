import React from 'react';
import {Col, Container, Row} from 'reactstrap';
import CurrencyList from "./CurrencyList";
import ChartsContainer from "./ChartsContainer";

const Market = () => {

  return (
    <Container>
      <Row>
        <Col lg="12">
          <Row className={"justify-content-center my-3 py-1 border rounded"} style={{height: 150}}>
            <CurrencyList/>
          </Row>
          <Row className={"justify-content-center border rounded"}>
            <ChartsContainer/>
          </Row>
        </Col>
      </Row>
    </Container>
  )
};

export default Market;
