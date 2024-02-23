import React, { useState } from "react";
import useAllTweets from "../hooks/useAllTweets";
import { useSelector } from "react-redux";
import useTimeAgo from "../hooks/useTimeAgo";
import { Link } from "react-router-dom";
import AvatarTweet from "./AvatarTweet";
import Loading from "./Loading";

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
    return <Loading />;
  }

  return (
    <div className="m-2 p-4 w-3/5 mx-auto overflow-y-auto h-screen">
      <ul>
        {tweets?.map((tweet) => (
          <li
            key={tweet?._id}
            className="border rounded-md p-4 mb-4 relative flex items-start"
          >
            <div className="mr-2 flex flex-wrap ">
              <Link to={`/users/v1/${tweet?.user}`}>
                <AvatarTweet />
              </Link>
            </div>
            <div className="align-middle flex-grow">
              <p className="mr-4 text-gray-800 text-md">{tweet?.content}</p>
            </div>
            <p className="p-1 absolute bottom-0 right-0 text-sm text-gray-500">
              {useTimeAgo(tweet?.createdAt)}
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
