import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'; // Make sure the path is correct
import { FaBars, FaTimes } from 'react-icons/fa'; // Ensure you have react-icons installed

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="nav">
      <NavLink to="/" className="logo-link">
        <img className='navbar-logo' src={require('../../assets/logo192.png')} alt="logo" />
      </NavLink>
      <div className="bars" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>
      {/* Corrected className assignment by merging class names conditionally using template literals */}
      <div className={`nav-menu ${isOpen ? 'open' : ''}`}>
        <NavLink to="/calories" className="nav-link" onClick={() => setIsOpen(false)}>
          calories
        </NavLink>
        <NavLink to="/workouts" className="nav-link" onClick={() => setIsOpen(false)}>
          workouts
        </NavLink>
        <NavLink to="/routes" className="nav-link" onClick={() => setIsOpen(false)}>
          routes
        </NavLink>
        <NavLink to="/sign-up" className="nav-link" onClick={() => setIsOpen(false)}>
          Sign Up
        </NavLink>
      </div>
      <div className="nav-btn">
        <NavLink to="/signin" className="nav-btn-link" onClick={() => setIsOpen(false)}>
          sign in
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
