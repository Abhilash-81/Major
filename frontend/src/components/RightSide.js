import React, { useState } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const RightSide = ({ modelId }) => {
  const [comment, setComment] = useState("");
  const userId = useSelector((state) => state.user.userId);

  const handleInputChange = (e) => {
    setComment(e.target.value);
  };
  const handlePost = async () => {
    try {
      const data = {
        content: comment,
        userId: userId,
      };
      const response = await Axios.post(
        `http://localhost:3000/api/v1/comments?modelId=${modelId.id}&modelType=Tweet`,
        data
      );
      toast(response?.data?.message);
    } catch (error) {
      toast("Failed!! Please try again");
    }
  };

  return (
    <React.Fragment>
      <div className="flex justify-around m-6 opacity-50 align-middle items-center">
        <input
          type="text"
          placeholder="Add a comment "
          onChange={handleInputChange}
          className="w-3/4 p-2 border rounded-md focus:outline-none focus:border-blue-500 "
        />
        <button
          onClick={handlePost}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Post
        </button>
      </div>
    </React.Fragment>
  );
};

export default RightSide;
