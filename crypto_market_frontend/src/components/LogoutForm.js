import React from 'react';
import {Button} from 'reactstrap';
import withAuth from "../withAuth.js";

const LogoutForm = (props) =>{
  return (
    <Button onClick={() => props.handleLogout(props.username)}>
      Logout {props.username}
    </Button>
  )
};

export default withAuth(LogoutForm);
