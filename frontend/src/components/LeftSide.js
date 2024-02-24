import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { Avatar } from "flowbite-react";
import profilepic from "../assets/profilepic.png";

const LeftSide = ({ tweetId }) => {
  const [data, setData] = useState(null);

  async function getData(tweetId) {
    const response = await Axios.get(
      `http://localhost:3000/api/v1/tweets/${tweetId}`
    );
    setData(response?.data?.data);
    console.log(data);
  }

  useEffect(() => {
    getData(tweetId.id);
  }, []);

  return (
    <React.Fragment>
      <div className="m-2 max-w-md mx-auto border border-gray-500 bg-white shadow-md rounded-md p-4 mb-4">
        <div className="flex ">
          <Link to={`/users/v1/${data?.user[0]}`}>
            <Avatar img={profilepic} rounded bordered className="w-10 h-10 " />
          </Link>
          <p className="ml-2 items-center align-middle">{data?.content}</p>
        </div>
      </div>
      <div>
        <h1 className="text-lg font-bold">Comments</h1>
        <div className="m-2 max-h-60 w-3/4 overflow-y-auto border border-gray-500 bg-white shadow-md rounded-md p-4 mb-4 items-center align-middle">
          <div className="flex flex-col items-center align-middle">
            {data?.comments?.map((comment) => (
              <span key={comment} className="mb-2">
                {comment}
              </span>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LeftSide;
