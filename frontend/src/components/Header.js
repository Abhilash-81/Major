import React, { useState } from "react";
import logo from "../assets/logo.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import profilepic from "../assets/profilepic.png";
import { Avatar, Dropdown, DropdownHeader } from "flowbite-react";
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
} from "flowbite-react";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store?.user?.username);
  const image = useSelector((store) => store?.user?.image);

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
        <Link to="/">Home</Link>
        <Link to="/users">Users</Link>
        <Link to="/api/v1/AllTweets">Tweets</Link>
        <Link to="/communities">Communities</Link>
        <Link to="/api/v1/signup">Signup</Link>
        {!user && <Link to="/api/v1/login">Login</Link>}
        {user && (
          <Dropdown
            label={
              <Avatar alt="User settings" img={image || profilepic} rounded />
            }
            arrowIcon={true}
            inline
          >
            <DropdownHeader>
              <Link to={`/users/${user}`}>{user}</Link>
            </DropdownHeader>
            <DropdownHeader>
              <Link to="/api/v1/users/profile">Update Profile</Link>
            </DropdownHeader>
            <DropdownHeader>
              <Link to="/api/v1/tweets">Create Tweet</Link>
            </DropdownHeader>
            <DropdownHeader>
              <Link to="/api/v1/profilePic">Update Image</Link>
            </DropdownHeader>
            <DropdownHeader>
              <Link className="text-red-600" to="/api/v1/logout">
                Logout
              </Link>
            </DropdownHeader>
          </Dropdown>
        )}
      </NavbarCollapse>
    </Navbar>
  );
};

export default Header;
