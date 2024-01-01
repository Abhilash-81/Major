import React from "react";
import { useState, useEffect } from "react";
import Card from "./Card";
import mockData from "../assets/mock_data";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

const Body = () => {
  let [totalData] = useState(mockData);
  let [filteredData, setfilteredData] = useState(mockData);
  let [searchText, setSearchText] = useState("");
  return (
    <>
      <div className="m-4 px-4">
        <input
          type="text"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          className="border border-solid border-black  shadow-lg bg-transparent "
          placeholder=" Search..."
        />
        <button
          onClick={() => {
            const filteredList = totalData?.filter(
              (res) =>
                res?.first_name
                  ?.toLowerCase()
                  ?.includes(searchText.toLowerCase()) ||
                res?.last_name
                  ?.toLowerCase()
                  ?.includes(searchText.toLowerCase())
            );
            setfilteredData(filteredList);
          }}
          className="px-4 py-2 bg-blue-200 m-0 rounded-lg shadow-md"
        >
          Search
        </button>
        <Link to="/users">
          <button className="px-4 py-2 bg-blue-200 m-4 border border-solid rounded-lg shadow-md ">
            See All Users
          </button>
        </Link>
        {/* <button
          onClick={() => {
            const filteredList = totalData?.filter((res) => res?.Rating > 40);
            setfilteredData(filteredList);
            setSearchText("");
          }}
          className="px-4 py-2 bg-blue-200 m-4 border border-solid rounded-lg shadow-md"
        >
          Top Rated Users
        </button> */}
      </div>
      <div className="flex flex-wrap justify-center align-middle">
        {filteredData.length === 0 ? (
          <div>
            <h1 className=" font-bold text-2xl">No Result Found 😔</h1>
          </div>
        ) : (
          filteredData?.map((user) => (
            <Link to={"/users/" + user.id} key={user?.id}>
              <Card resData={user} />
            </Link>
          ))
        )}
      </div>
    </>
  );
};

export default Body;
