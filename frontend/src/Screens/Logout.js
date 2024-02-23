import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(removeUser());
    navigate("/");
  };

  return (
    <div className="bg-gray-100 p-6 rounded-md shadow-md text-center h-screen">
      <h3 className="text-lg font-medium text-gray-800 mb-4">
        Are you sure you want to logout?
      </h3>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md"
      >
        Yes
      </button>
    </div>
  );
};

export default Logout;
