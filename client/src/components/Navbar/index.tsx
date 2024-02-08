import { NavLink } from "react-router-dom";
import { Bars, Nav, NavBtn, NavBtnLink, NavMenu } from "./NavbarStyled";

const Navbar = () => {
  return (
    <>
    <Nav>
        <NavLink to='/'>
          <img src={require('../../assets/logo192.png')} alt='logo' />
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to='/calories'>
            calories
          </NavLink>
          <NavLink to='/workouts'>
            workouts
          </NavLink>
          <NavLink to='/routes'>
            routes
          </NavLink>
          <NavLink to='/sign-up'>
            Sign Up
          </NavLink>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        <NavBtn>
          <NavBtnLink to='/signin'>sign in</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  )
}

export default Navbar;