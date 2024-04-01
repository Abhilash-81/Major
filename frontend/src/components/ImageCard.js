import React from "react";
import profilepic from "../assets/profilepic.png";
import AverageRating from "./AverageRating";

const ImageCard = ({ name, image, id, bio }) => {
  return (
    <div className="max-w-lg mx-auto px-4 py-8 text-white whitespace-nowrap bg-[#656565] shadow-md rounded-lg">
      <div>
        <h1 className="font-semibold text-3xl mb-2">{name}</h1>
        <h3 className="mb-4 font-semibold">{bio}</h3>
      </div>
      <AverageRating takinguserId={id} />
      <div className="flex justify-center">
        <div className="w-full sm:w-2/3">
          <img
            src={image || profilepic}
            alt="Profile Picture"
            className="shadow-md rounded-full w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
