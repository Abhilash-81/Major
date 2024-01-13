import React from "react";
import { useState, useEffect } from "react";
import Card from "./Card";
import Axios from "axios";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

const Body = () => {
  let [totalData, settotalData] = useState();
  let [filteredData, setfilteredData] = useState();
  let [searchText, setSearchText] = useState("");

  async function getData() {
    try {
      const response = await Axios.get("http://localhost:3000/users");
      settotalData(response.data);
      setfilteredData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  if (!filteredData) return <Shimmer />;

  {
    return (
      <>
        <div className="flex flex-wrap justify-between">
          <div className="m-4 p-2">
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
                    res?.username
                      ?.toLowerCase()
                      ?.includes(searchText.toLowerCase()) ||
                    res?.Skills?.some((skill) =>
                      skill?.toLowerCase()?.includes(searchText.toLowerCase())
                    )
                );
                setfilteredData(filteredList);
              }}
              className="px-4 py-2 bg-blue-200 m-0 rounded-lg shadow-md"
            >
              Search
            </button>
          </div>
          <div className="justify-end p-4">
            <Link to="/communities">
              <button className="bg-teal-300 text-white py-2 px-4 rounded-md hover:border-2 border-black focus:outline-none focus:shadow-outline-green align-middle">
                Communities
              </button>
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap grid-flow-row gap-2 align-middle justify-center">
          {filteredData.length === 0 ? (
            <div>
              <h1 className="m-4 p-4 font-bold text-2xl text-pretty">
                No Result Found 😔
              </h1>
            </div>
          ) : (
            filteredData?.map((user) => (
              <Link to={"/users/" + user?.username} key={user?.username}>
                <Card resData={user} />
              </Link>
            ))
          )}
        </div>
      </>
    );
  }
};

export default Body;
