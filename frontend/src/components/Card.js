import React from "react";
import profilepic from "../assets/profilepic.jpeg";

const Card = (props) => {
  const { resData } = props;
  const { first_name, last_name, skills } = resData;
  return (
    <div className="m-4 p-4 container bg-gray-100 border-2 border-slate-900 w-64 h-80 overflow-auto cursor-pointer">
      <img src={profilepic} alt="Profile Pic" />
      <b className="py-2">{first_name + " " + last_name}</b>
      <h3>
        <b className="text-pretty">Skills</b>:{skills?.join(", ")}
      </h3>
    </div>
  );
};

export default Card;
