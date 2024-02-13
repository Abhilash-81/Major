import React from "react";
import CommunityBody from "./CommunityBody";
import { Link } from "react-router-dom";

const Communities = () => {
  return (
    <div className="m-2 p-2 relative">
      <CommunityBody />
      <div className="fixed bottom-4 right-4">
        <Link to="/api/v1/tweets">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-8 rounded focus:outline-none focus:ring focus:border-blue-300">
            Create Tweet
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Communities;
