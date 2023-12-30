import React from "react";
import { useState, useEffect } from "react";
import Card from "./Card";
import mockData from "../assets/mock_data";

const Body = () => {
  let [totalData, settotalData] = useState(mockData);
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
          className="border border-solid border-black shadow-lg"
        ></input>
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
            setSearchText("");
          }}
          className="px-4 py-2 bg-blue-200 m-4 rounded-lg shadow-md"
        >
          Search
        </button>
        <button
          onClick={() => {
            const filteredList = totalData?.filter((res) => res?.Rating > 40);
            console.log(filteredList);
            setfilteredData(filteredList);
            setSearchText("");
          }}
          className="px-4 py-2 bg-blue-200 m-4 border border-solid rounded-lg shadow-md"
        >
          Top Rated Users
        </button>
      </div>
      <div className="flex flex-wrap justify-center align-middle">
        {filteredData?.map((user) => (
          <Card resData={user} key={user?.id} />
        ))}
      </div>
    </>
  );
};

export default Body;
