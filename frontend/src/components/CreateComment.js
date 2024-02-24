import React from "react";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import { useParams } from "react-router-dom";

const CreateComment = () => {
  const id = useParams();
  return (
    <div className="m-2 p-2 border-r border-gray-400">
      {<LeftSide tweetId={id} />}
    </div>
  );
};

export default CreateComment;
