import { NavLink } from 'react-router-dom';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavigationBar.css'
import { useState } from 'react';
import LoginRegisterModal from '../LoginRegister/LoginRegisterModal';

const NavigationBar = () => {

  const [modalShow, setModalShow] = useState<boolean>(false);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className='sticky-top'>
      <Container>
        <Navbar.Brand as={NavLink} to="/">Your Brand</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/calories">Calories</Nav.Link>
            <Nav.Link as={NavLink} to="/workouts">Workouts</Nav.Link>
            <Nav.Link as={NavLink} to="/routes">Routes</Nav.Link>
          </Nav>
          <Button variant="secondary" onClick={() => setModalShow(true)}>Sign In / Register</Button>
          <LoginRegisterModal show={modalShow} handleClose={() => setModalShow(false)} />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
