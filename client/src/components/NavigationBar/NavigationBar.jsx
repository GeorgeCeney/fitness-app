import { NavLink } from 'react-router-dom';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavigationBar.css';
import { useState } from 'react';
import LoginRegisterModal from '../LoginRegister/LoginRegisterModal';
import { useAuth } from '../AuthContext/AuthContext';

const NavigationBar = () => {
  const [modalShow, setModalShow] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className='sticky-top'>
      <Container>
        <Navbar.Brand as={NavLink} to="/">BAG Fitness</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/calories">Calories</Nav.Link>
            <Nav.Link as={NavLink} to="/routes">Routes</Nav.Link>
            <Nav.Link as={NavLink} to="/workouts">Workouts</Nav.Link>
          </Nav>
          {isAuthenticated ? (
            <Button id='logout-button' variant="secondary" onClick={handleLogout}>Logout</Button>
          ) : (
            <Button id='login-register-button' variant="secondary" onClick={() => setModalShow(true)}>Sign In / Register</Button>
          )}
          <LoginRegisterModal show={modalShow} handleClose={() => setModalShow(false)} />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
