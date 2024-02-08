import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import "./Navbar.css"; 

function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                to="/home"
                className="nav-links"
                onClick={handleClick}
              >
                home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/calories"
                className="nav-links"
                onClick={handleClick}
              >
                calories
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/workouts"
                className="nav-links"
                onClick={handleClick}
              >
                workouts
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/routes"
                className="nav-links"
                onClick={handleClick}
              >
                routes
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;