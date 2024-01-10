import React, { useState } from "react";
import logo from "../assets/logo.jpg";
import { Link } from "react-router-dom";

const Header = () => {
  let [searchText, setSearchText] = useState("login");
  return (
    <nav className="flex flex-wrap w-90 h-90 items-center border-2 justify-between  bg-slate-100 shadow-md">
      <div className="m-2 p-2">
        <Link
          to="/"
          className="text-2xl font-semibold flex items-center space-x-3"
        >
          <img src={logo} alt="Skill Share logo" className="w-35 h-20 " />
          <span>SkillShare</span>
        </Link>
      </div>
      <div className="m-2 p-2 text-xl font-semibold flex items-center ">
        <ul className="flex flex-wrap px-2">
          <li className="p-2">
            <Link to="/">Home</Link>
          </li>
          <li className="p-2">
            <Link to="/about">About</Link>
          </li>
          <li className="p-2">
            <Link to="/contact">ContactUs</Link>
          </li>
        </ul>
        <Link to="/users/auth">
          <button
            onClick={() => {
              searchText === "login"
                ? setSearchText("logout")
                : setSearchText("login");
            }}
            className=" p-1 border-2 bg-green-200 border-black rounded-lg"
          >
            {searchText}
          </button>
        </Link>
        <Link to="/users/register">
          <button className=" p-1 m-2 border-2 bg-green-200 border-black rounded-lg">
            Signup
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
