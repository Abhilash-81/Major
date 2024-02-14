import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useSelector } from "react-redux";

const CommunityTweets = ({ id }) => {
  const navigate = useNavigate();
  const [tweet, setTweet] = useState(null);
  const [liked, setLiked] = useState();
  const [likeCount, setLikeCount] = useState(0);
  const user = useSelector((store) => store?.user);

  async function handleLike() {
    const userId = user.userId;
    const data = { userId };
    try {
      const likeData = await Axios.post(
        `http://localhost:3000/api/v1/likes/toggle?modelId=${id}&modelType=Tweet`,
        data
      );
      console.log("LikeData", likeData);
      setLiked(!liked);
      setLikeCount(likeData.data.data.likesCount);
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
      setLiked(response?.data?.data?.likes?.includes(user.userId));
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
      <div className="mb-4">
        <p className="text-lg font-semibold">{tweet?.user}</p>
        <p>{tweet?.content}</p>
      </div>
      <div className="flex justify-between items-center">
        <button
          onClick={handleLike}
          className={`flex items-center focus:outline-none ${
            liked
              ? "text-red-500 hover:text-red-700"
              : "text-white-500 hover:text-white-700"
          }`}
        >
          <i
            className={`far fa-thumbs-up mr-2 ${
              liked ? "text-green-500" : "text-blue-500"
            }`}
          ></i>
          Like ({likeCount})
        </button>
        <button className="flex items-center text-green-500 hover:text-green-700 focus:outline-none">
          <i className="far fa-comment mr-2"></i>
          Comment
        </button>
      </div>
    </div>
  );
};

export default CommunityTweets;
