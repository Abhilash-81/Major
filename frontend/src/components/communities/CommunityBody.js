import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

function timeAgo(timestamp) {
  const now = new Date();
  const createdAt = new Date(timestamp);

  const timeDifference = now - createdAt;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  } else if (hours > 0) {
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else if (minutes > 0) {
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else {
    return "Just now";
  }
}

const timestamp = "2024-01-23T09:22:58.154Z";
const formattedTime = timeAgo(timestamp);

const communityBody = () => {
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
            className="border border-solid border-black w-full lg:w-1/5 bg-blue-200 p-2 rounded-lg shadow-lg bg-transparent "
            placeholder=" Search for Communities.."
          />
          <button
            onClick={() => {
              const filteredList = totalData?.filter((res) =>
                res?.title.includes(searchText)
              );
              setfilteredData(filteredList);
            }}
            className="px-4 py-2 bg-blue-200 align-middle rounded-lg shadow-md"
          >
            Search
          </button>
        </div>
        <div className="flex flex-wrap justify-center">
          <div className="w-full lg:w-2/5 bg-blue-200 p-4 rounded-lg">
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
                  <div key={item?._id} className="m-4 p-4 bg-gray-100 relative">
                    <Link to={"/api/v1/hashtags/" + item?._id} key={item?._id}>
                      <h1 className="mb-2 text-center">{item.title}</h1>
                    </Link>
                    <h2 className="absolute bottom-0 right-0 p-2 text-xs text-gray-500">
                      Created {timeAgo(item.createdAt)}
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
