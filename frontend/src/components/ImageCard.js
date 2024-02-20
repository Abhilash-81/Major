import React from "react";
import profilepic from "../assets/profilepic.png";

const ImageCard = ({ name, image }) => {
  return (
    <div className="">
      <h1 className="font-semibold mt-8 mb-8 text-3xl" id="title">
        {name}
      </h1>
      <div className="flex flex-wrap justify-center">
        <div className="w-6/12 sm:w-4/12">
          <img
            src={image || profilepic}
            alt="Profile Picture"
            className="shadow-md rounded-full w-96 h-48"
          />
        </div>
      </div>
    </div>
  );
};
export default ImageCard;
