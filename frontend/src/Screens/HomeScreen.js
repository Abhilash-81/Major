import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "flowbite-react";

const HomeScreen = () => {
  return (
    <Link to="/users">
      <div className="m-8 sm:h-64 md:h-72 xl:h-80 2xl:h-96">
        <Carousel>
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
            alt="Users"
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
            alt="Communities"
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
            alt="Tweets"
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
            alt="Chat"
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
            alt="Groups"
          />
        </Carousel>
      </div>
    </Link>
  );
};

export default HomeScreen;
