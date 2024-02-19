import React from "react";
import profilepic from "../assets/profilepic.png";
import { Link } from "react-router-dom";

const ImageCard = ({ name }) => {
  return (
    <div className="">
      <h1 className="font-semibold mt-8 mb-8 text-3xl" id="title">
        {name}
      </h1>
      <div className="flex flex-wrap justify-center">
        <div className="w-6/12 sm:w-4/12 px-4">
          <img
            src={profilepic}
            alt="Profile Picture"
            className="shadow-lg rounded-full max-w-full h-auto align-middle border-none"
          />
        </div>
        <Link to="/api/v1/profilePic">
          <span className="hover:bg-blue-500">Choose Image</span>
        </Link>
      </div>
    </div>
  );
};

export default ImageCard;
