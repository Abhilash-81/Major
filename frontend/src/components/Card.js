import React from "react";

const Card = (props) => {
  const { resData } = props;
  const { first_name, last_name, id, Job, Address, Rating, Skills } = resData;
  return (
    <div className="m-4 p-4 bg-gray-300 border-2 border-slate-900 w-[250px] h-[150px]">
      <h2>{first_name + " " + last_name}</h2>
      <h5>Rating: {Rating / 10} stars</h5>
    </div>
  );
};

export default Card;
