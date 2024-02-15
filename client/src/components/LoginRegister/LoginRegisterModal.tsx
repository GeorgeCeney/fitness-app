import React, { useState } from 'react';
import { Modal, Button, Tab, Tabs, Form, Alert } from 'react-bootstrap';
import "./LoginRegisterModal.css";

interface LoginRegisterModalProps {
  show: boolean;
  handleClose: () => void;
}

interface FormValues {
  email: string;
  password: string;
  confirmPassword?: string; // Only for registration
}

const LoginRegisterModal: React.FC<LoginRegisterModalProps> = ({ show, handleClose }) => {
  const [key, setKey] = useState<string>('login');
  const [formValues, setFormValues] = useState<FormValues>({ email: '', password: '', confirmPassword: '' });
  const [validationMessage, setValidationMessage] = useState<string>('');

  // Basic email validation
  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  // Handle form field changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormValues({ ...formValues, [id]: value });
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidationMessage('');

    if (!formValues.email || !formValues.password || (key === 'register' && !formValues.confirmPassword)) {
      setValidationMessage('Please fill in all fields.');
      return;
    }

    if (!validateEmail(formValues.email)) {
      setValidationMessage('Please enter a valid email address.');
      return;
    }

    if (key === 'register' && formValues.password !== formValues.confirmPassword) {
      setValidationMessage('Passwords do not match.');
      return;
    }

    // Proceed with form submission logic here (e.g., API call)
    console.log('Form submitted:', formValues);
    handleClose();
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
        >
          <Tab eventKey="login" title="Sign In">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="loginEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control onChange={handleInputChange} type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="loginPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={handleInputChange} type="password" placeholder="Password" />
              </Form.Group>

              <Button variant="primary" type="submit">
                Sign In
              </Button>
            </Form>
          </Tab>
          <Tab eventKey="register" title="Register">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="registerEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control onChange={handleInputChange} type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="registerPassword">
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
