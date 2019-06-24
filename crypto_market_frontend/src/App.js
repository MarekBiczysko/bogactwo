import React from 'react';
import './App.css'

import NavBar from "./components/Navbar";
import Market from "./components/Market";
import {connect} from "react-redux";

import {UncontrolledAlert, Container} from 'reactstrap';

class App extends React.Component {

  render() {

    const {authenticated, errorMsg} = this.props;

    return (
      <React.Fragment>
        <NavBar />
        {
          authenticated
            ? <Market/>
            : (
              <p style={{textAlign: 'center', paddingTop: 50}}>
                Please Login
              </p>
            )
        }
        {
          !!errorMsg &&
          <Container>
            <UncontrolledAlert color="danger">{errorMsg}</UncontrolledAlert>
          </Container>
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.authenticated,
  errorMsg: state.errorMsg,
});

export default connect(mapStateToProps)(App);
