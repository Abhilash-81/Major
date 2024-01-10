import React from "react";
import profilepic from "../assets/profilepic.png";

const Card = (props) => {
  const { resData } = props;
  const { username, Skills } = resData;
  return (
    <>
      <button className="m-4 p-4 max-w-xs container border-2 border-slate-900 bg-gray-100 overflow-y-auto w-64 h-80 rounded-md shadow-md">
        <img src={profilepic} alt="Profile Pic" />
        <b className="py-2">{username}</b>
        <h3>
          <b className="text-pretty">Skills</b>:{Skills?.join(", ")}
        </h3>
      </button>
    </>
  );
};

export default Card;
