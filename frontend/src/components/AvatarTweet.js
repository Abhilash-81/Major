import React from "react";
import { Avatar } from "flowbite-react";
import profilepic from "../assets/profilepic.png";

const AvatarTweet = () => {
  return (
    <Avatar
      img={profilepic}
      rounded
      bordered
      className="w-10 h-10 sm:w-12 sm:h-12"
    />
  );
};

export default AvatarTweet;
