import React from "react";
import CommunityBody from "./CommunityBody";
import CommunitySearch from "./CommunitySearch";

const Communities = () => {
  return (
    <div className="m-2 p-2">
      <CommunitySearch />
      <CommunityBody />
    </div>
  );
};

export default Communities;
