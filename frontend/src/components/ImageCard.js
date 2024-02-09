import React from "react";

const ImageCard = ({ name }) => {
  return (
    <div className="p-4">
      <h1 className="font-semibold mt-8 mb-8 text-3xl" id="title"></h1>
      <div className="flex flex-wrap justify-center">
        <div className="w-6/12 sm:w-4/12 px-4">
          <img
            src="https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-4-470x470.png"
            alt="Profile Picture"
            className="shadow-lg rounded-full max-w-full h-auto align-middle border-none"
          />
        </div>
      </div>
      <footer className="relative bg-gray-200 pt-8 pb-6 mt-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-6/12 px-4 mx-auto text-center">
              <div className="text-blueGray-500 font-semibold py-1">
                <h1>{name}</h1>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ImageCard;
