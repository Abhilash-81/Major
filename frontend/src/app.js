import React from "react";
import ReactDOM from "react-dom/client";

const Heading = () => {
  return (
    <>
      <h1 className="font-serif p-2 m-4">Hello abhilash</h1>
    </>
  );
};
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<Heading />);
