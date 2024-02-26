import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const GetUserData = ({ id }) => {
  const users = useSelector((store) => store?.users?.data);

  if (!users || !Array.isArray(users) || users.length === 0) {
    return <div className="text-center text-gray-600">No users found</div>;
  }

  const user = users.find((user) => user?._id === id);

  if (!user) {
    return <div className="text-center text-gray-600">User not found</div>;
  }

  return (
    <div className="flex justify-center items-center font-bold text-md">
      <Link
        to={"/users/" + user.username}
        className="text-blue-600 hover:underline"
      >
        {user?.username}
      </Link>
    </div>
  );
};

export default GetUserData;
