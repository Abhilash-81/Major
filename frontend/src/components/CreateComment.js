import React from "react";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import { useParams } from "react-router-dom";
import RightSide from "./RightSide";

const CreateComment = () => {
  const id = useParams();
  return (
    <div className="grid md:grid-cols-2 sm:grid-cols-1 ">
      <div className="m-2 p-2 md:border-r md:border-gray-200">
        {<LeftSide tweetId={id} />}
      </div>
      <div>{<RightSide modelId={id} />}</div>
    </div>
  );
};

export default CreateComment;
