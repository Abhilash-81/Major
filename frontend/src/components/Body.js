import React, { useState, useEffect } from "react";
import Card from "./Card";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { addUsers } from "../utils/usersSlice";

const Body = () => {
  const dispatch = useDispatch();
  const [totalData, setTotalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    async function getData() {
      try {
        const response = await Axios.get("http://localhost:3000/users");
        setTotalData(response.data);
        setFilteredData(response.data);
        dispatch(addUsers(response.data));
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
        <div className="flex-grow md:w-1/2 ml-2 pl-2 mb-4 md:mb-0">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="border border-solid border-gray-400 shadow-lg rounded-lg py-2 px-4 w-full"
            placeholder="Search..."
          />
        </div>
        <div className="flex-grow md:w-1/2 mr-2 pr-2">
          <button
            onClick={handleSearch}
            className="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300  font-bold py-2 px-4 rounded-lg shadow-md w-full md:w-auto text-white"
          >
            Search
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
        {filteredData.length === 0 ? (
          <div className="text-center col-span-4">
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
