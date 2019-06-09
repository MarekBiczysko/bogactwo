import React, {Component} from 'react';
import {connect} from "react-redux";
import {handleAuth, handleLogout} from "./utils";

const withAuth = Wrapped => {
  class Temp extends Component {
    render() {
      return <Wrapped {...this.props} />
    }
  }

  const mapStateToProps = state => ({
    authed: state.authenticated,
    username: state.username,
  });

  return connect(mapStateToProps, {
    handleAuth,
    handleLogout,
  })(Temp);
};

export default withAuth;
