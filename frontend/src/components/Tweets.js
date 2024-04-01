import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { useSelector } from "react-redux";
import AvatarTweet from "./AvatarTweet";
import Loading from "./Loading";
import useTimeAgo from "../hooks/useTimeAgo";
import useAllTweets from "../hooks/useAllTweets";

const Tweets = () => {
  const [showMore, setShowMore] = useState(false);
  const [likes, setLikes] = useState({});
  const user = useSelector((store) => store.user);
  useAllTweets();
  const allTweets = useSelector((store) => store.tweets.allTweets);

  const initialTweetCount = 5;

  const tweets = showMore ? allTweets : allTweets?.slice(0, initialTweetCount);

  const handleShowMore = () => {
    setShowMore(true);
  };

  const handleShowLess = () => {
    setShowMore(false);
  };

  async function handleLike(id) {
    const userId = user?.userId;
    const data = { userId };
    try {
      const likeData = await Axios.post(
        `http://localhost:3000/api/v1/likes/toggle?modelId=${id}&modelType=Tweet`,
        data
      );
      setLikes({ ...likes, [id]: likeData?.data?.data?.likesCount });
    } catch (err) {
      console.log("Error while liking a tweet", err);
    }
  }

  if (allTweets === null) {
    return <Loading />;
  }

  return (
    <div className="m-2 p-4 w-3/5 mx-auto overflow-y-auto h-screen">
      <ul>
        {tweets?.map((tweet) => (
          <li
            key={tweet?._id}
            className="border rounded-md p-4 mb-4 relative flex flex-col"
          >
            <div className="flex items-start">
              <div className="mr-2 flex flex-wrap ">
                <Link to={`/users/v1/${tweet?.user}`}>
                  <AvatarTweet />
                </Link>
              </div>
              <div className="align-middle flex-grow">
                <p className="mr-4 text-gray-800 text-md font-sans leading-tight tracking-tight ">
                  {tweet?.content}
                </p>
              </div>
            </div>
            <div className="mt-auto flex justify-between items-center">
              <div>
                <button
                  onClick={() => handleLike(tweet._id)}
                  className="flex items-center focus:outline-none text-white-500 "
                >
                  Like ({likes[tweet._id] || tweet.likes.length})
                </button>
              </div>
              <div>
                <Link to={"/api/v1/comments/" + tweet._id}>
                  <button className="flex items-center text-green-500 hover:text-green-700 focus:outline-none">
                    <i className="far fa-comment mr-2"></i>
                    Comment
                  </button>
                  <p className="absolute top-0 right-0 text-xs text-gray-500 p-1 opacity-50 ">
                    {useTimeAgo(tweet?.createdAt)}
                  </p>
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {!showMore && (
        <span
          className="text-blue-500 px-4 py-2 rounded-md mt-4 cursor-pointer"
          onClick={handleShowMore}
        >
          Show More . . . .
        </span>
      )}
      {showMore && (
        <span
          className="text-blue-500 px-4 py-2 rounded-md mt-4 cursor-pointer"
          onClick={handleShowLess}
        >
          Show Less . . . .
        </span>
      )}
    </div>
  );
};

export default Tweets;
