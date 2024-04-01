import React from "react";
import profilepic from "../assets/profilepic.png";

const Card = (props) => {
  const { resData } = props;
  const { username, Skills, image } = resData;
  return (
    <div className="m-4 p-4 max-w-xs container border-2 border-slate-900 bg-gray-100  w-64 h-80 rounded-md shadow-md">
      <img
        src={image || profilepic}
        alt="Profile Pic"
        className="w-full h-48 object-cover"
      />
      <div className="mt-4">
        <b className="block text-lg font-bold">{username}</b>
        <p className="mt-2 text-gray-600">
          <span className="font-semibold">Skills:</span> {Skills?.join(", ")}
        </p>
      </div>
    </div>
  );
};

export default Card;
