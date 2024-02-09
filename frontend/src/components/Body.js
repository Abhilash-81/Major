import React, { useState, useEffect } from "react";
import Card from "./Card";
import Axios from "axios";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

const Body = () => {
  const [totalData, setTotalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    async function getData() {
      try {
        const response = await Axios.get("http://localhost:3000/users");
        setTotalData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  const handleSearch = () => {
    const filteredList = totalData.filter(
      (res) =>
        res.username.toLowerCase().includes(searchText.toLowerCase()) ||
        res.Skills.some((skill) =>
          skill.toLowerCase().includes(searchText.toLowerCase())
        )
    );
    setFilteredData(filteredList);
  };

  if (!filteredData.length) return <Shimmer />;

  return (
    <div className="px-4 md:px-8">
      <div className="flex flex-col md:flex-row justify-between items-center my-4">
        <div className="flex-grow md:w-1/2 m-2 p-2">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="border border-solid border-gray-400 shadow-lg rounded-lg py-2 px-4 w-full"
            placeholder="Search..."
          />
        </div>
        <div className="flex-grow md:w-1/2 m-2 p-2">
          <button
            onClick={handleSearch}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md"
          >
            Search
          </button>
        </div>
        <div className="flex-grow md:w-1/2 m-2 p-2">
          <Link to="/communities">
            <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg shadow-md">
              Communities
            </button>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
        {filteredData.length === 0 ? (
          <div className="text-center">
            <h1 className="font-bold text-xl text-gray-800">
              No Result Found 😔
            </h1>
          </div>
        ) : (
          filteredData.map((user) => (
            <Link to={"/users/" + user.username} key={user.username}>
              <Card resData={user} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Body;
