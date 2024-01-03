import React from "react";
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 flex">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <p className="text-lg font-bold">Skill Share</p>
          <p>&copy; 2023. All rights reserved.</p>
        </div>
        <div>
          <p className="text-lg font-bold">Contact Us</p>
          <ul>
            <li>Email: jampaniabhilash81@gmail.com</li>
            <li>Phone: 9191919191</li>
          </ul>
        </div>
        <div>
          <p className="text-lg font-bold">Follow Us</p>
          <div className="flex space-x-4">
            <a
              href="https://twitter.com/JampaniAbhi81"
              className="text-gray-300 hover:text-white"
            >
              Twitter X<i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
