import React from "react";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import { useParams } from "react-router-dom";

const CreateComment = () => {
  const id = useParams();
  return (
    <div className="m-2 p-2 grid grid-cols-2 bg-gray-200 h-screen">
      <div className="m-2 p-2 border-r border-gray-400">
        {<LeftSide tweetId={id} />}
      </div>
      <div className="m-2 p-2">{<RightSide />}</div>
    </div>
  );
};

export default CreateComment;
