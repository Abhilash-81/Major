import React from "react";
import { useRouteError } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 ">
      <div className="bg-white p-8 rounded-md shadow-md">
        <h1 className="text-4xl text-red-600 font-bold mb-4">Oops!</h1>
        <p className="text-gray-700 mb-4">
          Something went wrong. We apologize for the inconvenience.
        </p>
        <p className="text-gray-700">
          Please try again later or contact support.
        </p>
        <p className="my-4">
          {err.status}:{err.statusText}
        </p>
        <div className="mt-6">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
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
