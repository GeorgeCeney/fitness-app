import { render, screen, fireEvent } from '@testing-library/react';
import LoginRegisterModal from './LoginRegisterModal';
import { AuthProvider } from '../AuthContext/AuthContext';
import { Router } from 'react-router-dom';

test('renders login modal with correct title', () => {
  render(
    <AuthProvider>
      <LoginRegisterModal show={true} handleClose={() => {}} />
    </AuthProvider>
  );

  const titleElement = screen.getByText('Sign In');
  expect(titleElement).toBeInTheDocument();
});

test('renders register modal with correct title', () => {
  render(
    <AuthProvider>
      <Router>
        <LoginRegisterModal show={true} handleClose={() => {}} />
      </Router>
    </AuthProvider>
  );

  fireEvent.click(screen.getByText('Register'));

  const titleElement = screen.getByText('Register');
  expect(titleElement).toBeInTheDocument();
});

test('displays validation message when form is submitted with empty fields', () => {
  render(
    <AuthProvider>
      <LoginRegisterModal show={true} handleClose={() => {}} />
    </AuthProvider>
  );

  fireEvent.click(screen.getByText('Sign In'));
  fireEvent.click(screen.getByText('Sign In'));

  const validationMessageElement = screen.getByText('Please fill in all fields.');
  expect(validationMessageElement).toBeInTheDocument();
});

