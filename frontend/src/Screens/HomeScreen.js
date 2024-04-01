import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "flowbite-react";
import skill from "../assets/skillimages.png";
import design from "../assets/design-concept-word-skill-website-260nw-1192358542.webp";
import image from "../assets/images.jpg";

const HomeScreen = () => {
  return (
    // <Link to="/users">
    <div className="m-8 sm:h-64 md:h-72 xl:h-80 2xl:h-96">
      <Carousel>
        <img src={skill} alt="Skill Image" />
        <img src={design} alt="Design" />
        <img src={image} alt="Images" />
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
    // </Link>
  );
};

export default HomeScreen;
