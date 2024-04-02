import React from "react";
import CommunityTweets from "./CommunityTweets";

const CommunityCard = (resData) => {
  const data = resData?.resData?.tweets;
  return (
    <div className="m-2 bg-gray-100 p-4 rounded-md shadow-md ">
      {data?.map((tweet) => (
        <h3 key={tweet} className="mb-2 ">
          <CommunityTweets id={tweet} />
        </h3>
      ))}
    </div>
  );
};

export default CommunityCard;
