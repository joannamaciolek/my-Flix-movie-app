import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './registration-view.scss'

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');

const handleRegister = (e) => {
  e.preventDefault();
  console.log(username, password, email, birthday);
  /* Send a request to the server for authentication */
  /* then call props.onLoggedIn(username) */
  };

  return (
    <Form className="registration-form">
      <Form.Group controlId="formNewUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Your username" value={username} onChange={e => setUsername(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Your Password" value={password} onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
      </Form.Group>
      <Form.Group controlId='formBirthday'>
          <Form.Label>Birthday</Form.Label>
          <Form.Control type='date' placeholder='MM/DD/YYYY' value={birthday} onChange={e => setBirthday(e.target.value)} />
      </Form.Group>

      <Button className="button-register" variant="info" type="submit" onClick={handleRegister} >
        Register
      </Button>
    </Form>
  );
}

RegistrationView.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  birthday: PropTypes.string.isRequired,
};
