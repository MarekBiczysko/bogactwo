import React, {useState} from 'react';
import {Button, Form, Input} from 'reactstrap';
import withAuth from "../withAuth.js";

function AuthForm(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (username && password) {
      props.handleAuth(username, password, props.action);
      setPassword('');
      setUsername('');
    }
  };

  const handleKeyPress = (target) => {
    if (target.charCode === 13) {
      handleSubmit();
    }
  };

  return (
    <Form inline>
      <Input
        className={'mr-1 my-1'}
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Username"
        type="text"
        name="username"
        required="required"
        onKeyPress={handleKeyPress}
      />
      <Input
        className={'mr-1 my-1'}
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        type="text"
        name="password"
        required="required"
        onKeyPress={handleKeyPress}
      />

      <Button className={'my-1'} onClick={handleSubmit}>
        {props.action}
      </Button>

    </Form>
  )
}

export default withAuth(AuthForm)
