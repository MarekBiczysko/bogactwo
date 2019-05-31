import React from 'react';
import './App.css'

import NavBar from "./components/Navbar";
import MarketContainer from "./components/MarketContainer";
import {connect} from "react-redux";

class App extends React.Component {
  state = {
    isLogged: false, errorMsg: null
  };

  static getDerivedStateFromProps(pProps) {
    return {
      isLogged: pProps.authed,
      errorMsg: pProps.errorMsg
    }
  }

  render() {

    return (
      <React.Fragment>
        <NavBar />
        {
          this.state.isLogged
            ? <MarketContainer/>
            : (
              <p style={{textAlign: 'center', paddingTop: 50}}>
                Please Login
              </p>
            )
        }
        {!!this.props.errorMsg && <p>{this.props.errorMsg}</p>}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  authed: state.authenticated,
  errorMsg: state.errorMsg,
});

export default connect(mapStateToProps)(App);
