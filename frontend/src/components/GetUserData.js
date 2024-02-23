import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const GetUserData = ({ id }) => {
  const users = useSelector((store) => store?.users?.data);
  if (!users || !Array.isArray(users) || users.length === 0) {
    return <div>No users found</div>;
  }

  const user = users.find((user) => user?._id === id);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="flex">
      Given By:<Link to={"/users/" + user.username}>{user?.username}</Link>
    </div>
  );
};

export default GetUserData;

//
