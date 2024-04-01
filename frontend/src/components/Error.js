import React from "react";

const Error = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-[#cdd1ce] p-8 rounded-md shadow-md text-center">
        <h1 className="text-4xl text-red-600 font-bold mb-4">Oops!</h1>
        <p className="text-gray-700 mb-4">
          Something went wrong. We apologize for the inconvenience.
        </p>
        <p className="text-gray-700 mb-4">
          Please try again later or contact support.
        </p>
        <p>Move to Console for more details about Error</p>
        <div className="mt-6">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;
