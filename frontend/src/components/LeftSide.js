import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { Avatar } from "flowbite-react";
import profilepic from "../assets/profilepic.png";
import Loading from "../components/Loading";
import UserData from "./GetUserData";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const LeftSide = ({ tweetId }) => {
  const [data, setData] = useState(null);
  const [replies, setReplies] = useState([]);
  const [replyContent, setReplyContent] = useState("");
  const inputRef = useRef(null);
  const userId = useSelector((state) => state.user.userId);

  const handlePost = async (commentId) => {
    // Handle the post request here
    const response = await Axios.post(
      `http://localhost:3000/api/v1/comments?modelId=${commentId}&modelType=Comment`,
      {
        content: replyContent,
        userId,
      }
    );
    toast(response?.data?.message);
    setReplies(replies.filter((id) => id !== commentId));
    setReplyContent("");
  };

  const handleOutsideClick = (e, commentId) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setReplies(replies.filter((id) => id !== commentId));
      setReplyContent("");
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [replies]);

  const renderComments = (comments) => {
    return comments.map((comment) => (
      <div
        key={comment?._id}
        className="md:ml-2 sm:ml-1 border-l border-gray-200"
      >
        <div className="flex items-center text-xs">
          <UserData id={comment?.userId} />
          <p className="text-xs md:m-2 md:p-2 ">{comment?.content}</p>
        </div>
        <div>
          <button
            className="opacity-60"
            onClick={() => setReplies([...replies, comment._id])}
          >
            reply
          </button>
        </div>
        {comment?.comments?.length > 0 && (
          <div className="md:mt-2 sm:mt-1">
            <h2 className="text-xs font-bold">Replies</h2>
            {renderComments(comment?.comments)}
          </div>
        )}
        {replies.includes(comment._id) && (
          <div className="md:mt-2 sm:mt-1" ref={inputRef}>
            <input
              type="text"
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Write a reply"
            />
            <button onClick={() => handlePost(comment._id)}>Post</button>
            <div onClick={(e) => handleOutsideClick(e, comment._id)}></div>
          </div>
        )}
      </div>
    ));
  };

  async function getData(tweetId) {
    const response = await Axios.get(
      `http://localhost:3000/api/v1/tweets/${tweetId}`
    );
    setData(response?.data?.data);
  }

  useEffect(() => {
    getData(tweetId.id);
  }, []);

  if (!data) return <Loading />;

  return (
    <React.Fragment>
      <div className="m-2  max-w-md mx-auto border border-gray-200 bg-white shadow-md rounded-md p-4 mb-4">
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
        <div className="max-h-72 max-w-md mx-auto overflow-y-auto border border-gray-200 bg-white shadow-md rounded-md p-4 mb-4 items-center align-middle">
          <div className="flex flex-col items-center align-middle">
            <h1 className="text-md font-bold">Comments</h1>
            <div className="text-sm text-wrap">
              {data?.comments.length === 0 ? (
                <h1 className="m-2 p-2 text-2xl">No Comments...</h1>
              ) : (
                renderComments(data?.comments)
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LeftSide;
