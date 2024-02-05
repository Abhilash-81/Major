import React, { useState, useEffect } from "react";
import Axios from "axios";

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
console.log(formattedTime);
const communityBody = () => {
  let [totalData, settotalData] = useState();
  let [filteredData, setfilteredData] = useState();
  async function getData() {
    try {
      const response = await Axios.get(
        "http://localhost:3000/api/v1/communities"
      );
      settotalData(response);
      setfilteredData(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="flex flex-wrap justify-center">
      <div className="w-full lg:w-2/5 bg-blue-200 p-4 rounded-lg">
        {filteredData?.data?.data
          ?.slice()
          .reverse()
          .map((item) => (
            <div key={item?._id} className="m-4 p-4 bg-gray-100 relative">
              <h1 className="mb-2">{item.content}</h1>
              <h2 className="absolute bottom-0 right-0 p-2 text-xs text-gray-500">
                Created {timeAgo(item.createdAt)}
              </h2>
            </div>
          ))}
      </div>
    </div>
  );
};

export default communityBody;
