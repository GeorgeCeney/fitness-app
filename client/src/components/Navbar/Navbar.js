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
                exact
                to="/home"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/calories"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                calories
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/workouts"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                workouts
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/routes"
                activeClassName="active"
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