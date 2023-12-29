import React from "react";
import logo from "../assets/logo.jpg";
const Header = () => {
  return (
    <nav className="flex flex-wrap w-90 h-90 m-2 px-3 items-center border-2 justify-between  bg-slate-100 shadow-md">
      <div className="m-2">
        <a
          href="/"
          className="text-2xl font-semibold flex items-center space-x-3"
        >
          <img src={logo} alt="Skill Share logo" className="w-35 h-20 " />
          <span>Skill Share</span>
        </a>
      </div>
      <div className="m-2 p-2 text-2xl font-semibold flex items-center ">
        <ul className="flex flex-wrap px-4">
          <li className="p-4">Home</li>
          <li className="p-4">About</li>
          <li className="p-4">Contact Us</li>
        </ul>
        <button className="">Login</button>
      </div>
    </nav>
  );
};

export default Header;
