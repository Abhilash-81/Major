import React from "react";
import profilepic from "../assets/profilepic.png";

const ImageCard = ({ name }) => {
  return (
    <div className="p-4">
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
      </div>
    </div>
  );
};

export default ImageCard;
