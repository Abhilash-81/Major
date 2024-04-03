import React from "react";
import { useSelector } from "react-redux";
import {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle,
} from "flowbite-react";
import GetUserData from "./getUserData";

const RatingsWithReviews = () => {
  const data = useSelector((store) => store?.ratings?.data?.obj);

  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="m-8 text-center text-gray-600">
        No ratings and reviews available
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg md:max-w-3xl my-8 max-h-screen min-h-fit">
      <Accordion
        collapseAll
        className="divide-y divide-gray-200 rounded-lg shadow-md"
      >
        {Object.keys(data).map((rating) => (
          <AccordionPanel key={rating}>
            <AccordionTitle className="text-xl font-bold text-gray-800">
              Rating: {rating}
            </AccordionTitle>
            <AccordionContent className="text-gray-700 leading-relaxed">
              {data[rating]
                .reduce((uniqueReviews, item) => {
                  const existingReview = uniqueReviews.find(
                    (review) => review.review === item.review
                  );
                  if (!existingReview) {
                    uniqueReviews.push(item);
                  }
                  return uniqueReviews;
                }, [])
                .map((item, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <GetUserData id={item.givinguserId} />
                    <span className="ml-2">{item.review}</span>
                  </div>
                ))}
            </AccordionContent>
          </AccordionPanel>
        ))}
      </Accordion>
    </div>
  );
};

export default RatingsWithReviews;
