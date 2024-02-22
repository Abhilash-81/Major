import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { useSelector } from "react-redux";
import { Avatar } from "flowbite-react";
import profilepic from "../../assets/profilepic.png";

const CommunityTweets = ({ id }) => {
  const navigate = useNavigate();
  const [tweet, setTweet] = useState(null);
  const [liked, setLiked] = useState();
  const [likeCount, setLikeCount] = useState(0);
  const user = useSelector((store) => store?.user);

  async function handleLike() {
    const userId = user?.userId;
    const data = { userId };
    try {
      const likeData = await Axios.post(
        `http://localhost:3000/api/v1/likes/toggle?modelId=${id}&modelType=Tweet`,
        data
      );
      setLiked(!liked);
      setLikeCount(likeData?.data?.data?.likesCount);
    } catch (err) {
      console.log("Error while liking a tweet", err);
    }
  }

  async function fetchData() {
    try {
      const response = await Axios.get(
        `http://localhost:3000/api/v1/tweets/${id}`
      );
      setTweet(response?.data?.data);
      setLiked(response?.data?.data?.likes?.includes(user?.userId));
      setLikeCount(response?.data?.data?.likes?.length);
    } catch (error) {
      console.error("Error fetching tweet:", error);
    }
  }

  useEffect(() => {
    if (user?.userId === undefined) {
      navigate("/api/v1/login");
    } else {
      fetchData();
    }
  }, [user?.userId, handleLike]);

  if (!tweet) return null;

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-4 mb-4">
      <div className="mr-2 flex flex-wrap ">
        <Link to={`/users/v1/${tweet.user}`}>
          <Avatar
            img={profilepic}
            rounded
            bordered
            className="w-10 h-10 sm:w-12 sm:h-12"
          />
        </Link>
        <p className=" ml-2 mt-3 items-center align-middle">{tweet?.content}</p>
      </div>
      <div className="flex justify-between items-center">
        {liked === true ? (
          <button
            onClick={handleLike}
            className="flex items-center focus:outline-none text-red-500 hover:text-red-700"
          >
            Like ({likeCount})
          </button>
        ) : (
          <button
            onClick={handleLike}
            className="flex items-center focus:outline-none text-white-500 "
          >
            Like ({likeCount})
          </button>
        )}

        <Link to="/api/v1/comments">
          <button className="flex items-center text-green-500 hover:text-green-700 focus:outline-none">
            <i className="far fa-comment mr-2"></i>
            Comment
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CommunityTweets;
