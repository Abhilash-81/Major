import React from "react";

const Card = (props) => {
  const { resData } = props;
  const { first_name, last_name, id, Job, Address, Rating, skills } = resData;
  return (
    <div className="m-4 p-4 bg-gray-100 border-2 border-slate-900 w-64 h-48 overflow-auto">
      <h2>{first_name + " " + last_name}</h2>
      <h3>Skills:{skills?.join(", ")}</h3>
      <h5>Rating: {Rating / 10} ⭐</h5>
    </div>
  );
};

export default Card;
