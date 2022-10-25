import React from "react";
import { Nav, NavLink, NavMenu, } 
from "./NavBarElements";

const Navbar = () => {
  return (
    <>
      <Nav>
      
        <NavMenu>
        <NavLink to="/" activeStyle>
            Home
          </NavLink>
          <NavLink to="/JobPosted" activeStyle>
            MarketPlace
          </NavLink>
          <NavLink to='/MyJobs' activeStyle>
            User: My Jobs
          </NavLink>
          <NavLink to="/JobPost" activeStyle>
            Company: Post Job
          </NavLink>
          <NavLink to="/CompanyJob" activeStyle>
            Company: CompanyDisplay
          </NavLink>
          <NavLink to="/Profile" activeStyle>
            Profile
          </NavLink>
        </NavMenu>
        
      </Nav>
      
    </>
    
  );
};
  
export default Navbar;