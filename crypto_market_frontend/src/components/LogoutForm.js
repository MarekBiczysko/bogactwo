import React from 'react';
import {Button} from 'reactstrap';

function LogoutForm(props) {
  console.log('LogoutForm props', props);
  return (
    <Button onClick={() => props.handleLogout(props.username)}>Logout {props.username}</Button>
  )
}

export default LogoutForm;
