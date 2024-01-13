import React from "react";

const communityHeader = () => {
  return (
    <header className="bg-blue-500 p-4 text-white">
      <h1 className="text-2xl font-bold">Your Logo</h1>
      <nav className="flex items-center space-x-4">
        <a href="#" className="hover:underline">
          Home
        </a>
        <a href="#" className="hover:underline">
          About
        </a>
        <a href="#" className="hover:underline">
          Features
        </a>
        <a href="#" className="hover:underline">
          Contact
        </a>
      </nav>
    </header>
  );
};

export default communityHeader;
