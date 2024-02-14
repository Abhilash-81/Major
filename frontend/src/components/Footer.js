import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className=" bg-gray-800 text-white py-8">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <div className="mb-4 lg:mb-0">
          <p className="text-lg font-bold text-white">Skill Share</p>
          <p className="text-sm text-gray-300">
            &copy; 2024. All rights reserved.
          </p>
          <div className="flex flex-col">
            <Link to="/about">AboutUs</Link>
            <Link to="/contact">ContactUs</Link>
          </div>
        </div>
        <div className="mb-4 lg:mb-0">
          <p className="text-lg font-bold text-white">Contact Us</p>
          <ul className="text-sm text-gray-300">
            <li>Email: jampaniabhilash81@gmail.com</li>
            <li>Phone: 9191919191</li>
          </ul>
        </div>
        <div>
          <p className="text-lg font-bold text-white mb-4">Follow Us</p>
          <div className="flex space-x-4">
            <a
              href="https://twitter.com/JampaniAbhi81"
              className="text-gray-300 hover:text-white transition duration-300"
            >
              Twitter <i className="fab fa-twitter"></i>
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition duration-300"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
