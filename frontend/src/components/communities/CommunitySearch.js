import React, { useState, useEffect } from "react";

const CommunitySearch = () => {
  let [searchText, setSearchText] = useState("");
  return (
    <>
      <div className="m-2 p-2 flex flex-wrap justify-center">
        <input
          type="text"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          className="border border-solid border-black w-full lg:w-1/5 bg-blue-200 p-2 rounded-lg shadow-lg bg-transparent "
          placeholder=" Search for Communities.."
        />
        <button
          onClick={() => {
            const filteredList = totalData?.filter(
              (res) =>
                res?.username
                  ?.toLowerCase()
                  ?.includes(searchText.toLowerCase()) ||
                res?.Skills?.some((skill) =>
                  skill?.toLowerCase()?.includes(searchText.toLowerCase())
                )
            );
            setfilteredData(filteredList);
          }}
          className="px-4 py-2 bg-blue-200 align-middle rounded-lg shadow-md"
        >
          Search
        </button>
      </div>
    </>
  );
};

export default CommunitySearch;
