import React from "react";

const communityBody = () => {
  return (
    <div className="flex flex-wrap justify-center">
      <div className="w-full lg:w-2/5 bg-blue-200 p-4 rounded-lg">
        {[1, 2, 3, 4, 5, 6].map((community) => (
          <div key={community} className="m-4 p-4 bg-gray-100 text-center">
            <h1>Community {community}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default communityBody;
