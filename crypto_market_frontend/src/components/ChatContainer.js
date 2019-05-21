import React, {useState} from 'react';
import {Button, Col, Container, Form, Input, Row} from 'reactstrap';

export default class ChatContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Row>
          <Col xs={2}>
            <h2>Users:</h2>
            <p>User1</p>
            <p>User2</p>
            <p>User3</p>
          </Col>
        </Row>
        <Row>
          <Col xs={2}>
            <h2>Chat</h2>
            <p>msg1</p>
            <p>msg2</p>
            <p>msg3</p>
          </Col>
        </Row>
      </Container>
    )
  }
}
