import React, { useEffect, useState } from "react";
import { MdPerson, MdSend } from "react-icons/md";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const CreateTweet = () => {
  const user = useSelector((store) => store?.user);
  const [tweetText, setTweetText] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setTweetText(event.target.value);
  };

  const handleTweetSubmit = async (event) => {
    event.preventDefault();
    try {
      const tweetData = {
        tweetText,
        username: user.username,
      };
      const response = await Axios.post(
        "http://localhost:3000/api/v1/tweets",
        tweetData
      );
      toast("Successfully Created a Tweet");
      navigate("/communities");
    } catch (error) {
      console.error("error:", error);
      toast.error("Creating a tweet failed");
    }
  };

  useEffect(() => {
    if (user.username === undefined) {
      toast("Please Login to continue");
      navigate("/api/v1/login");
    }
  }, []);

  return (
    <div className="max-w-md mx-auto mt-8 bg-white shadow-md rounded px-8 py-6">
      <h2 className="text-xl font-bold mb-4">Compose a Tweet</h2>
      <form onSubmit={handleTweetSubmit}>
        <div className="flex items-center border-b border-gray-300 pb-2 mb-4">
          <MdPerson className="text-gray-600 text-2xl mr-2" />
          <textarea
            className="w-full h-32 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 resize-none"
            placeholder="Create a Tweet with some communities starting with #"
            value={tweetText}
            onChange={handleInputChange}
            maxLength={250}
            required
          ></textarea>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm">{tweetText.length}/250</span>
          <button
            type="submit"
            className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300"
          >
            <MdSend className="text-xl mr-2" />
            Tweet
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTweet;
