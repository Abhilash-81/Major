import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { Avatar } from "flowbite-react";
import profilepic from "../assets/profilepic.png";
import Loading from "../components/Loading";
import GetUserData from "./GetUserData";

const LeftSide = ({ tweetId }) => {
  const [data, setData] = useState(null);
  const [visibleComments, setVisibleComments] = useState([]);

  const renderComments = (comments) => {
    return comments.map((comment) => (
      <div key={comment?._id} className="ml-4 border-l border-gray-200">
        <div className="flex items-center">
          <GetUserData id={comment?.userId} />
          <p className="text-sm m-2 p-2">{comment?.content}</p>
        </div>
        {comment?.comments?.length > 0 && (
          <div className="mt-2">
            <h2 className="text-xs font-bold">Replies</h2>
            {renderComments(comment?.comments)}
          </div>
        )}
      </div>
    ));
  };

  async function getData(tweetId) {
    const response = await Axios.get(
      `http://localhost:3000/api/v1/tweets/${tweetId}`
    );
    console.log(response?.data?.data);
    setData(response?.data?.data);
    console.log(data);
  }

  useEffect(() => {
    getData(tweetId.id);
  }, []);

  if (!data) return <Loading />;

  return (
    <React.Fragment>
      <div className="m-2 max-w-md mx-auto border border-gray-200 bg-white shadow-md rounded-md p-4 mb-4">
        <div className="flex ">
          <Link to={`/users/v1/${data?.user}`}>
            <Avatar img={profilepic} rounded bordered className="w-10 h-10 " />
          </Link>
          <p className="ml-2 items-center align-middle text-wrap">
            {data?.content}
          </p>
        </div>
      </div>
      <div className="m-2">
        <div className="max-h-60 max-w-md mx-auto overflow-y-auto border border-gray-200 bg-white shadow-md rounded-md p-4 mb-4 items-center align-middle">
          <div className="flex flex-col items-center align-middle">
            <h1 className="text-md font-bold">Comments</h1>
            <div className="text-sm text-wrap">
              {renderComments(data?.comments)}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LeftSide;
