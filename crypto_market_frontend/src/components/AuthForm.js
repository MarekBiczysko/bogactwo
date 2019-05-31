import React, {useState} from 'react';
import {Button, Form, Input} from 'reactstrap';
import withAuth from "../withAuth.js";

function AuthForm(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Form inline>
      <Input
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Username"
        type="text"
        name="username"
        required="required"
      />
      <Input
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        type="text"
        name="password"
        required="required"
      />

      <Button
        onClick={() => {
          if (username && password) {
            props.handleAuth(username, password, props.action);
            setPassword('');
            setUsername('');
          }
        }}>
        {props.action}
      </Button>

    </Form>
  )
}

export default withAuth(AuthForm)
