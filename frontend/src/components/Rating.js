import React, { useState } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";

const RatingComponent = (props) => {
  const takinguserid = props.props;
  const [userRating, setUserRating] = useState(null);
  const [rating, setRating] = useState(null);
  const [reason, setReason] = useState("");
  const logInUserId = useSelector((store) => store?.user?.userId);

  const handleRate = (value) => {
    setUserRating(value);
  };

  const handleSubmitRating = async () => {
    setRating(userRating);
    setReason(reason);
    const response = await Axios.post("http://localhost:3000/api/v1/ratings", {
      rating: userRating,
      review: reason,
      givinguserId: logInUserId,
      takinguserId: takinguserid,
    });
  };

  const isSubmitDisabled = userRating === null || reason.trim() === "";

  return (
    <div className="mx-auto max-w-md md:max-w-lg lg:max-w-xl mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-center">Rate Me</h2>
      <div className="flex items-center justify-center mb-4">
        {[...Array(5)].map((_, index) => (
          <button
            key={index}
            onClick={() => handleRate(index + 1)}
            className={`${
              userRating !== null && index < userRating
                ? "text-yellow-400"
                : "text-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-yellow-400`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 cursor-pointer"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 1l2.747 5.627 6.238.91-4.514 4.396 1.07 6.219-5.541-2.91L5.52 17.15l1.07-6.218L1 7.538l6.238-.911L10 1zm0 2.441l-1.31 2.68H3.37l2 1.947-.472 2.75 2.278-1.2 2.272 1.2-.462-2.748 2-1.947h-5.32l-1.31-2.68z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        ))}
      </div>
      <div className="flex flex-col items-center">
        <p className="text-lg mb-2">Your Rating: {userRating}</p>
        <input
          type="text"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Why are you giving this rating?"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSubmitRating}
          disabled={isSubmitDisabled}
          className={`mt-2 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
            isSubmitDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Submit Rating
        </button>
      </div>
      {rating !== null && (
        <p className="mt-4 text-center">
          Thank you for rating! Your rating: {rating}
        </p>
      )}
    </div>
  );
};

export default RatingComponent;
