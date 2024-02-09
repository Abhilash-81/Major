import React, { useState, useEffect } from "react";
import Axios from "axios";

const CommunityTweets = ({ id }) => {
  const [tweet, setTweet] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await Axios.get(
          `http://localhost:3000/api/v1/tweets/${id}`
        );
        setTweet(response.data.data);
      } catch (error) {
        console.error("Error fetching tweet:", error);
      }
    }

    fetchData();
  }, []);

  if (!tweet) return null;

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-4 mb-4">
      {/* Tweet content */}
      <div className="mb-4">
        <p className="text-lg font-semibold">{tweet.user}</p>
        <p>{tweet.content}</p>
      </div>

      {/* Like and Comment buttons */}
      <div className="flex justify-between">
        <button className="text-blue-500 hover:text-blue-700 focus:outline-none">
          <i className="far fa-thumbs-up"></i> Like
        </button>
        <button className="text-green-500 hover:text-green-700 focus:outline-none">
          <i className="far fa-comment"></i> Comment
        </button>
      </div>
    </div>
  );
};

export default CommunityTweets;
