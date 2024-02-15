import React, { useState } from "react";
import logo from "../assets/logo.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import profilepic from "../assets/profilepic.png";
import { Avatar, Dropdown, DropdownHeader, DropdownItem } from "flowbite-react";
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store?.user?.username);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <Navbar fluid rounded>
      <NavbarBrand>
        <Link to="/">
          <div className="flex">
            <img src={logo} className="mr-3 h-6 sm:h-9" alt="SkillShare Logo" />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              SkillShare
            </span>
          </div>
        </Link>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink>
          <Link to="/">Home</Link>
        </NavbarLink>
        <NavbarLink>
          <Link to="/users">
            <span>Users</span>
          </Link>
        </NavbarLink>
        <NavbarLink>
          <Link to="/communities">Communities</Link>
        </NavbarLink>
        <NavbarLink>
          <Link to="/api/v1/signup">Signup</Link>
        </NavbarLink>
        {!user && (
          <NavbarLink>
            <Link to="/api/v1/login">
              <span>Login</span>
            </Link>
          </NavbarLink>
        )}
        {user && (
          <Dropdown
            label={<Avatar alt="User settings" img={profilepic} rounded />}
            arrowIcon={false}
            inline
          >
            <DropdownHeader>
              <Link to={`/users/${user}`}>
                <DropdownItem>{user}</DropdownItem>
              </Link>
            </DropdownHeader>
            <DropdownItem>
              <Link to="/api/v1/logout">Logout</Link>
            </DropdownItem>
          </Dropdown>
        )}
      </NavbarCollapse>
    </Navbar>
  );
};

export default Header;
