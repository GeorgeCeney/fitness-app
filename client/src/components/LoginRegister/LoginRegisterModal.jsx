import React, { useState } from 'react';
import { Modal, Button, Tab, Tabs, Form, Alert } from 'react-bootstrap';
import "./LoginRegisterModal.css";
import { useAuth } from '../AuthContext/AuthContext';
import axios from 'axios';

const backendUrl = "http://localhost:3001/auth";

const LoginRegisterModal = ({ show, handleClose }) => {
  const { login } = useAuth();
  const [key, setKey] = useState('login');
  const [formValues, setFormValues] = useState({ email: '', password: '', confirmPassword: '' });
  const [validationMessage, setValidationMessage] = useState('');

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormValues({ ...formValues, [id]: value });
  };

  const validateForm = () => { 
    if (!formValues.email || !formValues.password || (key === 'register' && !formValues.confirmPassword)) {
      setValidationMessage('Please fill in all fields.');
      return false;
    }

    if (!validateEmail(formValues.email)) {
      setValidationMessage('Please enter a valid email address.');
      return false;
    }

    if (key === 'register' && formValues.password !== formValues.confirmPassword) {
      setValidationMessage('Passwords do not match.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setValidationMessage('');
  
    if (!validateForm()) {
      return;
    }

    const endpoint = `${backendUrl}/${key}`;

    const formData = {
      email: formValues.email,
      password: formValues.password,
      ...(key === 'register' ? { confirmPassword: formValues.confirmPassword } : {}),
    };

    try {
      const response = await axios.post(endpoint, formData);
      const data = response.data;
      if (data.token) {
        login(data.token);
        handleClose();
      } else {
        setValidationMessage(data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Login/Register Error:', error);
      setValidationMessage('Server error, please try again later.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{key === 'login' ? 'Sign In' : 'Register'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {validationMessage && <Alert variant="danger">{validationMessage}</Alert>}
        <Tabs
          id="login-register-tabs"
          activeKey={key}
          onSelect={(k) => setKey(k ?? 'login')}
          variant="pills"
          className='mb-3'
        >
          <Tab eventKey="login" title="Sign In">
            <Form id='login-form' onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control onChange={handleInputChange} type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={handleInputChange} type="password" placeholder="Password" />
              </Form.Group>

              <Button id='sign-in-button' variant="primary" type="submit">
                Sign In
              </Button>
            </Form>
          </Tab>
          <Tab eventKey="register" title="Register">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control onChange={handleInputChange} type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={handleInputChange} type="password" placeholder="Password" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control onChange={handleInputChange} type="password" placeholder="Confirm Password" />
              </Form.Group>

              <Button variant="primary" type="submit">
                Register
              </Button>
            </Form>
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
};

export default LoginRegisterModal;
