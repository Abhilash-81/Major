import React from "react";

const LargeOutlineButtons = () => {
  return (
    <div className="p-4">
      {/* start snippet  */}
      <div className="flex flex-wrap justify-center">
        {/* Like button */}
        <button
          className="text-blue-500 bg-transparent border border-solid border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-600 font-bold uppercase px-8 py-3 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
        >
          <i className="fas fa-thumbs-up"></i> Like
        </button>
        {/* Comment button */}
        <button
          className="text-green-500 bg-transparent border border-solid border-green-500 hover:bg-green-500 hover:text-white active:bg-green-600 font-bold uppercase px-8 py-3 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
        >
          <i className="fas fa-comment"></i> Comment
        </button>
      </div>
    </div>
  );
};

export default LargeOutlineButtons;
