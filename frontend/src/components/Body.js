import React from "react";
import Card from "./Card";
import mockData from "../assets/mock_data";

const Filter = () => {
  return (
    <div className="m-4 px-4">
      <input
        type="text"
        className="border border-solid border-black shadow-lg"
      ></input>
      <button className="px-4 py-2 bg-blue-200 m-4 rounded-lg shadow-md">
        Search
      </button>
      <button className="px-4 py-2 bg-blue-200 m-4 border border-solid rounded-lg shadow-md">
        Top Rated Users
      </button>
    </div>
  );
};

const Body = () => {
  return (
    <>
      <Filter />
      <div className="flex flex-wrap justify-center align-middle">
        {mockData.map((user) => (
          <Card resData={user} key={user.id} />
        ))}
      </div>
    </>
  );
};

export default Body;
