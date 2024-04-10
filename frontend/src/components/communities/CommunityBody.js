import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link, Navigate } from "react-router-dom";
import useTimeAgo from "../../hooks/useTimeAgo";
import { useSelector } from "react-redux";

const communityBody = () => {
  const logInUser = useSelector((store) => store?.user?.username);
  let [searchText, setSearchText] = useState("");
  let [totalData, settotalData] = useState([]);
  let [filteredData, setfilteredData] = useState([]);

  async function getData() {
    try {
      const response = await Axios.get("http://localhost:3000/api/v1/hashtags");
      settotalData(response?.data?.data);
      setfilteredData(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  if (totalData?.length === 0) {
    <h1>loading...</h1>;
  }

  {
    return (
      <>
        <div className="m-2 p-2 flex flex-wrap justify-center">
          <input
            type="text"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            className="border border-solid border-black w-full lg:w-1/5 bg-blue-200 p-2 rounded-lg shadow-lg bg-transparent"
            placeholder=" Search for Communities.."
          />
          <button
            onClick={() => {
              const filteredList = totalData?.filter((res) =>
                res?.title.includes(searchText)
              );
              setfilteredData(filteredList);
            }}
            className="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300  font-bold py-2 px-4 rounded-lg shadow-md w-full md:w-auto text-white"
          >
            Search
          </button>
        </div>
        <div className="flex flex-wrap justify-center ">
          <div className="w-full lg:w-2/5 bg-blue-200 p-4 rounded-lg h-screen overflow-y-scroll hide-scrollbar tracking-wide">
            {filteredData?.length === 0 ? (
              <div>
                <h1 className="m-4 p-4 font-bold text-2xl text-pretty">
                  No Result Found 😔
                </h1>
              </div>
            ) : (
              filteredData
                ?.slice()
                .reverse()
                .map((item) => (
                  <div
                    key={item?._id}
                    className="m-4 p-4 bg-gray-100 relative "
                  >
                    <Link to={"/api/v1/hashtags/" + item?._id} key={item?._id}>
                      <h1 className="mb-2 text-center">{item.title}</h1>
                    </Link>
                    <h2 className="absolute bottom-0 right-0 p-2 text-xs text-gray-500">
                      Created {useTimeAgo(item.createdAt)}
                    </h2>
                  </div>
                ))
            )}
          </div>
        </div>
      </>
    );
  }
};

export default communityBody;
