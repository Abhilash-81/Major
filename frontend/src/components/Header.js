import React, { useState } from "react";
import logo from "../assets/logo.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import appStore from "../utils/appStore";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store?.user?.username);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="flex flex-wrap w-full items-center justify-between bg-slate-100 shadow-md px-6 py-4">
      <div>
        <Link
          to="/"
          className="text-xl sm:text-2xl font-semibold flex items-center space-x-3"
        >
          <img src={logo} alt="Skill Share logo" className="w-35 h-20 " />
          <span>SkillShare</span>
        </Link>
      </div>
      <div className="text-lg sm:text-xl">
        <button
          className="sm:hidden px-2 py-1 bg-teal-200 border border-black rounded-lg"
          onClick={toggleMenu}
        >
          {showMenu ? "Close" : "Menu"}
        </button>
        <ul
          className={`sm:flex flex-col sm:flex-row ${
            showMenu ? "flex" : "hidden"
          } items-center space-y-2 sm:space-y-0 sm:space-x-4 mt-4 sm:mt-0`}
        >
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">ContactUs</Link>
          </li>
          {!user && (
            <li>
              <Link to="/api/v1/login">Login</Link>
            </li>
          )}
          {user && (
            <li>
              <Link to="/api/v1/logout">Logout</Link>
            </li>
          )}
          <li>
            <Link to="/api/v1/signup">Signup</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
