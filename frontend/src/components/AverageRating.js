import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addRatings } from "../utils/ratingSlice";
import Loading from "../components/Loading";

const AverageRating = ({ takinguserId }) => {
  const dispatch = useDispatch();
  const [avg, setAvg] = useState(0);

  async function getData() {
    try {
      const response = await Axios.get(
        `http://localhost:3000/api/v1/ratings/${takinguserId}`
      );

      const ratingsAndReviews = response.data.map((ratingObj) => ({
        rating: parseInt(ratingObj.rating),
        review: ratingObj.review,
        givinguserId: ratingObj.givinguserId,
      }));

      const totalRatingSum = ratingsAndReviews.reduce(
        (sum, ratingObj) => sum + ratingObj.rating,
        0
      );

      const averageRating =
        ratingsAndReviews.length === 0
          ? 0
          : totalRatingSum / ratingsAndReviews.length;

      const obj = {};
      ratingsAndReviews.forEach((ratingObj) => {
        const rating = ratingObj.rating;
        const review = ratingObj.review;
        const givinguserId = ratingObj.givinguserId;
        if (!obj[rating]) {
          obj[rating] = [];
        }
        obj[rating].push({ review, givinguserId });
      });

      setAvg(averageRating.toFixed(2));
      dispatch(addRatings({ obj }));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, [avg]);

  if (!avg) {
    return null; //loading
  }

  return (
    <>
      <h3 className="font-bold text-sm">
        AverageRating: <span className="text-pretty text-sm">{avg}</span>
      </h3>
      <div className="fixed bottom-4 left-4 bg-[#cdd1ce] p-4 rounded-md shadow-md">
        <Link
          to="/api/v1/RatingWithReviews"
          className="block text-sm mt-2 underline hover:no-underline hover:text-blue-600"
        >
          See My Ratings and Reviews
        </Link>
      </div>
    </>
  );
};

export default AverageRating;
