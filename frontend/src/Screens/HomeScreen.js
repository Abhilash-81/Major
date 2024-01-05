import React from "react";
import { Link } from "react-router-dom";

const HomeScreen = () => {
  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-blue-600">SkillShare</h1>
        <p className="text-gray-700 mb-8">Learn, Share, and Grow Together</p>
        <Link to="/users">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Explore
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomeScreen;
