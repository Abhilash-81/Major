import React, { useState } from "react";
import useAllTweets from "../hooks/useAllTweets";
import { useSelector } from "react-redux";
import useTimeAgo from "../hooks/useTimeAgo";

const Tweets = () => {
  const [showMore, setShowMore] = useState(false);
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

  if (allTweets === null) {
    return null;
  }

  return (
    <div className="m-2 p-4 w-3/4 mx-auto">
      <ul>
        {tweets.map((tweet) => (
          <li
            key={tweet.id}
            className="border rounded-md p-4 mb-4 relative flex items-start"
          >
            <div className="w-8 h-8 rounded-full bg-gray-500 mr-2"></div>
            <div className="flex-grow">
              <p className="text-gray-800 text-md">{tweet.content}</p>
            </div>
            <p className="text-sm text-gray-500">
              {useTimeAgo(tweet.createdAt)}
            </p>
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
