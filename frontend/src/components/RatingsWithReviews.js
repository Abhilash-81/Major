import React from "react";
import { useSelector } from "react-redux";
import {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle,
} from "flowbite-react";

const RatingsWithReviews = () => {
  const data = useSelector((store) => store?.ratings?.data?.obj);

  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="w-2/3 mx-auto align-middle items-center">
        No ratings and reviews available
      </div>
    );
  }

  return (
    <div className="w-2/3 mx-auto align-middle items-center">
      <Accordion
        collapseAll
        className="w-full divide-y divide-gray-200 rounded-lg shadow-md"
      >
        {Object.keys(data).map((rating) => (
          <AccordionPanel key={rating}>
            <AccordionTitle className="text-xl font-bold text-gray-800">
              Rating: {rating}
            </AccordionTitle>
            <AccordionContent className="text-gray-700 leading-relaxed mb-4">
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
                  <div key={index} className="mb-2">
                    <p>{item.review}</p>
                    <p className="text-gray-500">
                      Given by: {item.givinguserId}
                    </p>
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
